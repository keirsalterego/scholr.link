import Link from "next/link";
import { notFound } from "next/navigation";

// Mock campaigns data
const CAMPAIGNS: Record<string, {
  title: string;
  description: string;
  goal: number;
  raised: number;
  creator: string;
  deadline: string;
  category: string;
}> = {
  "rust-os": {
    title: "Rust OS Kernel Project",
    description: "Building a minimal OS kernel in Rust for my final year project. This project aims to create a lightweight, memory-safe operating system kernel that can run on Raspberry Pi devices.\n\nThe funds will be used to purchase a cluster of 4 Raspberry Pi 5 units for testing concurrent process handling and memory management implementations.\n\nKey milestones:\n• Basic bootloader implementation\n• Memory management system\n• Process scheduler\n• Basic filesystem support",
    goal: 200,
    raised: 50,
    creator: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    deadline: "2024-03-15",
    category: "Engineering",
  },
  "ml-research": {
    title: "ML Research: Climate Prediction",
    description: "Training neural networks to predict local weather patterns using historical data from the past 50 years. This research could help local farmers and communities prepare for extreme weather events.\n\nThe funds will be used for GPU cloud computing credits on AWS/GCP to train large-scale transformer models on climate data.\n\nExpected outcomes:\n• Trained model with 85%+ accuracy on 7-day forecasts\n• Published research paper\n• Open-source codebase",
    goal: 500,
    raised: 125,
    creator: "8yLLtg3DX98e08UKSEqcE6kCljfmU8nfQc84qTJosgBtV",
    deadline: "2024-04-01",
    category: "Research",
  },
  "robotics-arm": {
    title: "3D Printed Robotic Arm",
    description: "Building a low-cost prosthetic arm prototype using 3D printing and Arduino for accessibility research. The goal is to create an affordable alternative to expensive prosthetics.\n\nFunds will cover:\n• 3D printing materials (PLA, TPU)\n• Arduino components and servos\n• Sensors and haptic feedback modules\n• Testing and iteration costs",
    goal: 350,
    raised: 280,
    creator: "9zMMug4EY09f19VLTFrdF7lDkmgnV9ogRd95rUKptgCuW",
    deadline: "2024-02-28",
    category: "Hardware",
  },
};

export default async function CampaignPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const campaign = CAMPAIGNS[slug];

  if (!campaign) {
    notFound();
  }

  const percentRaised = Math.round((campaign.raised / campaign.goal) * 100);
  const blinkUrl = `https://scholr.link/api/actions/${slug}`;
  const dialUrl = `https://dial.to/?action=solana-action:${encodeURIComponent(blinkUrl)}`;
  const daysLeft = Math.max(0, Math.ceil((new Date(campaign.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back link */}
        <Link 
          href="/explore" 
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to projects
        </Link>

        <div className="grid lg:grid-cols-5 gap-8">
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
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-3">
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
                  <span className="text-2xl font-bold text-zinc-100">${campaign.raised}</span>
                  <span className="text-sm text-zinc-500">of ${campaign.goal}</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style={{ width: `${Math.min(percentRaised, 100)}%` }}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                  Donate
                </button>
                <button className="px-4 py-2.5 text-sm font-medium text-zinc-400 bg-zinc-800 border border-zinc-700 rounded-xl">
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
                    <span className="text-3xl font-bold text-zinc-100">${campaign.raised}</span>
                    <span className="text-sm text-zinc-500">raised</span>
                  </div>
                  <p className="text-sm text-zinc-500 mb-4">{percentRaised}% of ${campaign.goal} goal</p>
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
                    Donate 5 USDC
                  </button>
                  <button className="w-full py-3 text-sm font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl transition-colors">
                    Donate 20 USDC
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
