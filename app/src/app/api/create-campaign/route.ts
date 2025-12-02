import { NextRequest } from "next/server";
export const runtime = "nodejs";

import * as anchor from "@coral-xyz/anchor";
import scholrIdl from "@/idl/scholr_program.json" assert { type: "json" };
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  Keypair,
  clusterApiUrl,
} from "@solana/web3.js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, goal, metadataUri, signer } = body as {
      title: string;
      goal: number;
      metadataUri: string;
      signer: string;
    };

    if (!title || !goal || !metadataUri || !signer) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

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

    // --------------------------------------
    // FIX: Build a minimal Anchor wallet
    // --------------------------------------
    const dummy = Keypair.generate();

    const wallet = {
      payer: dummy,
      publicKey: dummy.publicKey,
      signTransaction: async (tx: Transaction) => tx,
      signAllTransactions: async (txs: Transaction[]) => txs,
    };

    const provider = new anchor.AnchorProvider(connection, wallet, {
      preflightCommitment: "confirmed",
    });

    const program = new anchor.Program(
      scholrIdl as anchor.Idl,
      programId,
      provider
    );

    const ix = await program.methods
      .initializeCampaign(title, new anchor.BN(goal), metadataUri)
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

    const serialized = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

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
