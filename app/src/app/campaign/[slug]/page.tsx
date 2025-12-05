import Link from "next/link";
import * as anchor from "@coral-xyz/anchor";
import scholrIdl from "@/idl/scholr_program.json" assert { type: "json" };
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

async function fetchCampaignByPda(pdaStr: string) {
  // Validate PDA
  let pda: PublicKey;
  try {
    pda = new PublicKey(pdaStr);
  } catch {
    return null;
  }

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const programId = new PublicKey((scholrIdl as any).address);
  const provider = new anchor.AnchorProvider(
    connection,
    {
      publicKey: PublicKey.default,
      signTransaction: async (tx: any) => tx,
      signAllTransactions: async (txs: any[]) => txs,
    } as any,
    { preflightCommitment: "confirmed" }
  );
  const program = new anchor.Program(
    scholrIdl as anchor.Idl,
    programId,
    provider
  );

  try {
    const account = await (program.account as any)["campaign"].fetch(pda);
    return {
      pda: pdaStr,
      title: account.title as string,
      description: (account.metadataUri as string) ?? "",
      goal: Number(account.goal),
      raised: Number(account.raised),
      creator: (account.authority as anchor.web3.PublicKey).toBase58(),
      category: "Research",
    };
  } catch {
    return null;
  }
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = await fetchCampaignByPda(slug);
  if (!campaign) return notFound();

  const percentRaised = Math.round((campaign.raised / campaign.goal) * 100);
  const blinkUrl = `https://scholr.link/api/actions/${slug}`;
  const dialUrl = `https://dial.to/?action=solana-action:${encodeURIComponent(blinkUrl)}`;
  const daysLeft = 0;

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 lg:pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Back link */}
        <Link 
          href="/explore" 
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-6 sm:mb-8 min-h-[44px]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to projects
        </Link>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-1 text-xs font-medium bg-zinc-800 border border-zinc-700 rounded-full text-zinc-400">
                  {campaign.category}
                </span>
                <span className="text-xs text-zinc-600">•</span>
                <span className="text-xs text-zinc-500">{daysLeft} days left</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-100 mb-2 sm:mb-3">
                {campaign.title}
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                <span className="text-sm text-zinc-500 font-mono">
                  {campaign.creator.slice(0, 4)}...{campaign.creator.slice(-4)}
                </span>
              </div>
            </div>

            {/* Progress Card (Mobile) */}
            <div className="lg:hidden p-5 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="mb-4">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-2xl font-bold text-zinc-100">{campaign.raised} SOL</span>
                  <span className="text-sm text-zinc-500">of {campaign.goal} SOL</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style={{ width: `${Math.min(percentRaised, 100)}%` }}
                  />
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <button className="flex-1 py-3 sm:py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl min-h-[48px]">
                  Donate
                </button>
                <button className="px-4 py-3 sm:py-2.5 text-sm font-medium text-zinc-400 bg-zinc-800 border border-zinc-700 rounded-xl min-h-[48px]">
                  Share
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-invert prose-zinc max-w-none">
              <h2 className="text-lg font-semibold text-zinc-100 mb-4">About this project</h2>
              <div className="text-zinc-400 leading-relaxed whitespace-pre-line text-sm">
                {campaign.description}
              </div>
            </div>

            {/* Updates placeholder */}
            <div className="pt-8 border-t border-zinc-800">
              <h2 className="text-lg font-semibold text-zinc-100 mb-4">Updates</h2>
              <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl text-center">
                <p className="text-sm text-zinc-500">No updates yet</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-5">
              {/* Progress Card (Desktop) */}
              <div className="hidden lg:block p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <div className="mb-5">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-zinc-100">{campaign.raised} SOL</span>
                    <span className="text-sm text-zinc-500">raised</span>
                  </div>
                  <p className="text-sm text-zinc-500 mb-4">{percentRaised}% of {campaign.goal} SOL goal</p>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${Math.min(percentRaised, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5 p-4 bg-zinc-800/50 rounded-xl">
                  <div>
                    <p className="text-lg font-semibold text-zinc-100">12</p>
                    <p className="text-xs text-zinc-500">Patrons</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-zinc-100">{daysLeft}</p>
                    <p className="text-xs text-zinc-500">Days left</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl transition-all hover:shadow-lg hover:shadow-purple-500/25">
                    Donate 0.25 SOL
                  </button>
                  <button className="w-full py-3 text-sm font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl transition-colors">
                    Donate 1 SOL
                  </button>
                  <button className="w-full py-3 text-sm font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl transition-colors">
                    Custom amount
                  </button>
                </div>

                <p className="mt-4 text-xs text-zinc-600 text-center">
                  You&apos;ll receive a soulbound Patron Badge
                </p>
              </div>

              {/* Share Card */}
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <h3 className="text-sm font-medium text-zinc-300 mb-4">Share this campaign</h3>
                
                <div className="p-3 bg-zinc-800/50 border border-zinc-700 rounded-xl mb-4">
                  <p className="text-xs text-zinc-600 mb-1">Blink URL</p>
                  <code className="text-xs text-purple-400 font-mono break-all">
                    {blinkUrl}
                  </code>
                </div>

                <div className="space-y-2">
                  <a
                    href={dialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview on Dial.to
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20project!%20${encodeURIComponent(blinkUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Share on X
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
