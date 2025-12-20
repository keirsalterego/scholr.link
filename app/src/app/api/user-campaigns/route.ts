import { NextRequest } from "next/server";
import * as anchor from "@coral-xyz/anchor";
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import scholrIdl from "@/idl/scholr_program.json" assert { type: "json" };
import { z } from "zod";
import { tryGetAdminSupabase } from "@/lib/supabase";
import { optionalEnv } from "@/lib/env";

export const runtime = "nodejs";

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com";

const upsertSchema = z.object({
  slug: z.string().min(32).max(64), // PDA
  title: z.string().min(3).max(50),
  description: z.string().max(500).optional().default(""),
  goalLamports: z.number().positive(),
  category: z.string().max(32).optional().default("general"),
  creator: z.string().min(32).max(64),
  metadataUri: z.string().url().max(200).optional(),
  status: z.enum(["pending", "active", "completed"]).optional().default("active"),
});

export async function GET(req: NextRequest) {
  try {
    const userAddress = req.nextUrl.searchParams.get("user");
    if (!userAddress) {
      return new Response(JSON.stringify({ error: "Missing user parameter" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabase = tryGetAdminSupabase();
    if (!supabase) {
      return new Response(JSON.stringify({ error: "Supabase not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data, error } = await supabase
      .from("campaigns")
      .select("pda, title, metadata_uri, goal_lamports, category, status, created_at")
      .eq("creator", userAddress)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    const connection = new Connection(rpcUrl, "confirmed");
    const program = new anchor.Program(scholrIdl as anchor.Idl, new anchor.AnchorProvider(
      connection,
      {
        publicKey: PublicKey.default,
        signTransaction: async (tx: any) => tx,
        signAllTransactions: async (txs: any[]) => txs,
      } as any,
      { preflightCommitment: "confirmed" }
    ));

    const withOnchain = await Promise.all(
      (data || []).map(async (row) => {
        try {
          const account = await (program.account as any)["campaign"].fetch(new PublicKey(row.pda));
          const goalLamports = Number(account.goal ?? row.goal_lamports ?? 0);
          const raisedLamports = Number(account.raised ?? 0);
          return {
            slug: row.pda,
            title: row.title,
            description: row.metadata_uri ?? "",
            goal: goalLamports / LAMPORTS_PER_SOL,
            raised: raisedLamports / LAMPORTS_PER_SOL,
            donors: 0,
            status: row.status ?? "active",
            daysLeft: 0,
            category: row.category ?? "general",
            createdAt: row.created_at,
          };
        } catch {
          return {
            slug: row.pda,
            title: row.title,
            description: row.metadata_uri ?? "",
            goal: (row.goal_lamports ?? 0) / LAMPORTS_PER_SOL,
            raised: 0,
            donors: 0,
            status: row.status ?? "pending",
            daysLeft: 0,
            category: row.category ?? "general",
            createdAt: row.created_at,
          };
        }
      })
    );

    return new Response(JSON.stringify({ campaigns: withOnchain }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("user-campaigns error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch campaigns",
        details: error?.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const parsed = upsertSchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid payload", details: parsed.error.format() }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabase = tryGetAdminSupabase();
    if (!supabase) {
      return new Response(JSON.stringify({ error: "Supabase not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const payload = parsed.data;

    const { data, error } = await supabase
      .from("campaigns")
      .upsert({
        pda: payload.slug,
        creator: payload.creator,
        title: payload.title,
        metadata_uri: payload.metadataUri ?? payload.description ?? "",
        goal_lamports: payload.goalLamports,
        category: payload.category,
        status: payload.status,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ campaign: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("user-campaigns POST error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to save campaign", details: error?.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
