import { NextRequest } from "next/server";
export const runtime = "nodejs";

import * as anchor from "@coral-xyz/anchor";
import scholrIdl from "@/idl/scholr_program.json" assert { type: "json" };
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  VersionedTransaction,
  Keypair,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { z } from "zod";
import { tryGetAdminSupabase } from "@/lib/supabase";
import { optionalEnv } from "@/lib/env";

const bodySchema = z.object({
  title: z.string().min(3).max(50),
  goal: z.number().positive().max(10_000), // in SOL
  metadataUri: z.string().url().max(200),
  signer: z.string().min(32).max(64),
  category: z.string().max(32).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const parsed = bodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid payload", details: parsed.error.format() }), {
        status: 400,
      });
    }

    const { title, goal, metadataUri, signer, category } = parsed.data;

    const rpcUrl = optionalEnv("SOLANA_RPC_URL", clusterApiUrl("devnet")) || clusterApiUrl("devnet");
    const connection = new Connection(rpcUrl, "confirmed");

    const programId = new PublicKey((scholrIdl as any).address);
    const signerPk = new PublicKey(signer);

    const [campaignPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("campaign"),
        signerPk.toBuffer(),
        Buffer.from(title),
      ],
      programId
    );

    // Dummy wallet that satisfies the Anchor Interface
    const dummy = Keypair.generate();
    const wallet = {
      payer: dummy,
      publicKey: dummy.publicKey,
      signTransaction: async <T extends Transaction | VersionedTransaction>(tx: T): Promise<T> => {
        return tx;
      },
      signAllTransactions: async <T extends Transaction | VersionedTransaction>(txs: T[]): Promise<T[]> => {
        return txs;
      },
    };

    const provider = new anchor.AnchorProvider(connection, wallet, {
      preflightCommitment: "confirmed",
    });

    // Anchor v0.32: Program(idl, provider) - programId from idl.address
    const program = new anchor.Program(
      scholrIdl as anchor.Idl,
      provider
    );

    console.log("Backend: Program ID:", programId.toBase58());
    console.log("Backend: Campaign PDA:", campaignPda.toBase58());
    console.log("Backend: Signer:", signerPk.toBase58());

    const goalLamports = Math.round(goal * LAMPORTS_PER_SOL);

    const ix = await program.methods
      .initializeCampaign(title, new anchor.BN(goalLamports), metadataUri)
      .accounts({
        campaign: campaignPda,
        signer: signerPk,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    const tx = new Transaction().add(ix);
    tx.feePayer = signerPk;

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    tx.recentBlockhash = blockhash;
    tx.lastValidBlockHeight = lastValidBlockHeight;

    // Serialize with verifySignatures: false to allow wallet adapter to handle signing
    const serialized = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    console.log("Backend: Transaction built successfully for campaign:", campaignPda.toBase58());

    // Best-effort metadata persistence
    const supabase = tryGetAdminSupabase();
    if (supabase) {
      try {
        await supabase
          .from("campaigns")
          .upsert({
            pda: campaignPda.toBase58(),
            creator: signerPk.toBase58(),
            title,
            metadata_uri: metadataUri,
            goal_lamports: goalLamports,
            category: category ?? "general",
            status: "pending",
          })
          .select()
          .single();
      } catch (persistErr) {
        console.warn("Supabase upsert failed (non-blocking)", persistErr);
      }
    }

    return new Response(
      JSON.stringify({
        transaction: Buffer.from(serialized).toString("base64"),
        campaignPda: campaignPda.toBase58(),
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (e: any) {
    console.error("create-campaign error", e);

    return new Response(
      JSON.stringify({
        error: "Failed to build transaction",
        details: String(e?.message ?? e),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function OPTIONS() {
  return new Response(null);
}