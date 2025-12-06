import Link from "next/link";
import { notFound } from "next/navigation";
import * as anchor from "@coral-xyz/anchor";
import scholrIdl from "@/idl/scholr_program.json" assert { type: "json" };
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { CampaignClient } from "./CampaignClient";

async function fetchCampaignByPda(pdaStr: string) {
  let pda: PublicKey;
  try {
    pda = new PublicKey(pdaStr);
  } catch {
    return null;
  }

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
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
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const blinkUrl = `${baseUrl}/api/actions/${slug}`;
  const dialUrl = `https://dial.to/?action=solana-action:${encodeURIComponent(blinkUrl)}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Support "${campaign.title}" on @ScholrLink! 🎓\n\nDonate directly from this tweet using Solana Blinks 👇`)}&url=${encodeURIComponent(blinkUrl)}`;
  const daysLeft = 14; // TODO: Calculate from on-chain data

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#14f195]/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#9945ff]/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative pt-20 sm:pt-24 pb-16 lg:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link href="/explore" className="text-zinc-500 hover:text-zinc-300 transition-colors">
              Projects
            </Link>
            <svg className="w-4 h-4 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-zinc-400 truncate max-w-[200px]">{campaign.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header Section */}
              <header>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#14f195]" />
                    {campaign.category}
                  </span>
                  {daysLeft > 0 && (
                    <span className="px-3 py-1.5 text-xs font-medium bg-[#14f195]/10 text-[#14f195] rounded-lg">
                      {daysLeft} days left
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
                  {campaign.title}
                </h1>

                {/* Creator Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#14f195]/20 to-[#9945ff]/20 border border-zinc-800 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-300">Created by</p>
                    <p className="text-xs font-mono text-zinc-500">
                      {campaign.creator.slice(0, 6)}...{campaign.creator.slice(-4)}
                    </p>
                  </div>
                </div>
              </header>

              {/* Mobile Progress & CTA */}
              <div className="lg:hidden space-y-4">
                <MobileProgressCard 
                  raised={campaign.raised} 
                  goal={campaign.goal} 
                  percentRaised={percentRaised}
                  tweetUrl={tweetUrl}
                />
              </div>

              {/* About Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-white">About this project</h2>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6">
                  <p className="text-zinc-400 leading-relaxed whitespace-pre-line">
                    {campaign.description || "No description provided yet. Check back soon for more details about this project."}
                  </p>
                </div>
              </section>

              {/* How it Works Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-white">How to donate</h2>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { step: "1", title: "Share on X", desc: "Post the campaign link to your timeline" },
                    { step: "2", title: "Blink appears", desc: "Followers see an interactive donation card" },
                    { step: "3", title: "One-click donate", desc: "They donate directly from the tweet" },
                  ].map((item) => (
                    <div key={item.step} className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 text-center">
                      <div className="w-8 h-8 mx-auto mb-3 rounded-full bg-[#14f195]/10 border border-[#14f195]/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-[#14f195]">{item.step}</span>
                      </div>
                      <h3 className="text-sm font-medium text-white mb-1">{item.title}</h3>
                      <p className="text-xs text-zinc-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Updates Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                      <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-white">Updates</h2>
                  </div>
                  <span className="text-xs text-zinc-600">0 updates</span>
                </div>
                <div className="bg-zinc-900/30 border border-zinc-800/30 rounded-xl p-8 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-zinc-800/50 flex items-center justify-center">
                    <svg className="w-6 h-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-zinc-500">No updates yet</p>
                  <p className="text-xs text-zinc-600 mt-1">The creator hasn&apos;t posted any updates</p>
                </div>
              </section>
            </div>

            {/* Sidebar - Right Side */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-5">
                {/* Primary CTA Card */}
                <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden">
                  {/* Progress Header */}
                  <div className="p-6 border-b border-zinc-800/50">
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-3xl font-bold text-white">{campaign.raised}</span>
                      <span className="text-lg font-medium text-zinc-500 mb-1">SOL</span>
                    </div>
                    <p className="text-sm text-zinc-500 mb-4">
                      {percentRaised}% of {campaign.goal} SOL goal
                    </p>
                    {/* Progress Bar */}
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#14f195] to-[#9945ff] transition-all duration-500"
                        style={{ width: `${Math.min(percentRaised, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 divide-x divide-zinc-800/50 border-b border-zinc-800/50">
                    <div className="p-4 text-center">
                      <p className="text-xl font-bold text-white">12</p>
                      <p className="text-xs text-zinc-500">Patrons</p>
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-xl font-bold text-white">{daysLeft}</p>
                      <p className="text-xs text-zinc-500">Days left</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-[#14f195] animate-pulse" />
                      <span className="text-[10px] font-semibold text-[#14f195] uppercase tracking-wider">Best way to support</span>
                    </div>
                    <a
                      href={tweetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 w-full py-3.5 text-sm font-semibold text-black bg-white hover:bg-zinc-100 rounded-xl transition-all shadow-lg shadow-white/5"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      Share on X
                    </a>
                    <p className="text-[11px] text-zinc-500 text-center mt-3">
                      Supporters can donate directly from the tweet
                    </p>
                  </div>
                </div>

                {/* Direct Donation Widget */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-zinc-500">Or donate directly</span>
                    <div className="flex-1 h-px bg-zinc-800" />
                  </div>
                  <CampaignClient blinkUrl={blinkUrl} dialUrl={dialUrl} />
                </div>

                {/* Blink URL */}
                <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Blink URL</span>
                    <button className="text-[10px] text-[#14f195] hover:text-[#14f195]/80 transition-colors">
                      Copy
                    </button>
                  </div>
                  <code className="block text-xs text-zinc-400 font-mono break-all bg-zinc-800/50 px-3 py-2 rounded-lg">
                    {blinkUrl}
                  </code>
                  <a
                    href={dialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full mt-3 py-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Preview on Dial.to
                  </a>
                </div>

                {/* Badge Info */}
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#14f195]/5 to-[#9945ff]/5 border border-[#14f195]/10 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#14f195]/20 to-[#9945ff]/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#14f195]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Patron Badge</p>
                    <p className="text-xs text-zinc-500">Donors receive a soulbound NFT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile Progress Card Component
function MobileProgressCard({ 
  raised, 
  goal, 
  percentRaised,
  tweetUrl 
}: { 
  raised: number; 
  goal: number; 
  percentRaised: number;
  tweetUrl: string;
}) {
  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden">
      <div className="p-5">
        <div className="flex items-end gap-2 mb-2">
          <span className="text-2xl font-bold text-white">{raised}</span>
          <span className="text-base font-medium text-zinc-500 mb-0.5">SOL raised</span>
        </div>
        <p className="text-sm text-zinc-500 mb-3">{percentRaised}% of {goal} SOL goal</p>
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mb-4">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#14f195] to-[#9945ff]"
            style={{ width: `${Math.min(percentRaised, 100)}%` }}
          />
        </div>
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full py-3.5 text-sm font-semibold text-black bg-white hover:bg-zinc-100 rounded-xl transition-all"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Share on X to help fund
        </a>
      </div>
    </div>
  );
}
