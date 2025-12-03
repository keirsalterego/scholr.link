"use client";

import { useState } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { CreateCampaignForm } from "@/components/CreateCampaignForm";

// Mock user stats
const USER_STATS = {
  totalRaised: 125,
  totalDonated: 45,
  activeCampaigns: 2,
  badgesEarned: 7,
  patronTier: "Gold",
};

// Mock user campaigns (seed)
const SEED_CAMPAIGNS = [
  {
    slug: "rust-os",
    title: "Rust OS Kernel Project",
    description: "Building a minimal OS kernel in Rust for my final year project.",
    goal: 10,
    raised: 7.5,
    donors: 12,
    status: "active",
    daysLeft: 14,
    category: "Engineering",
    createdAt: "2024-01-15",
  },
  {
    slug: "quantum-sim",
    title: "Quantum Computing Simulator",
    description: "Educational quantum circuit simulator for students.",
    goal: 22.5,
    raised: 22.5,
    donors: 28,
    status: "completed",
    daysLeft: 0,
    category: "Research",
    createdAt: "2023-11-20",
  },
];

// Mock donation history with badges
const MY_DONATIONS = [
  {
    id: 1,
    project: "Climate ML Research",
    amount: 12.5,
    badge: "Gold",
    date: "2024-01-18",
    creator: "sarahchen.sol",
  },
  {
    id: 2,
    project: "Biodegradable Packaging Lab",
    amount: 5,
    badge: "Silver",
    date: "2024-01-10",
    creator: "greenlab.sol",
  },
  {
    id: 3,
    project: "AI Study Assistant",
    amount: 2.5,
    badge: "Bronze",
    date: "2024-01-05",
    creator: "alexdev.sol",
  },
];

// Mock activity feed
const ACTIVITY_FEED = [
  { type: "donation", message: "vitalik.sol donated 2.5 SOL to your Rust OS project", time: "2 hours ago" },
  { type: "milestone", message: "Your campaign reached 75% of its goal!", time: "5 hours ago" },
  { type: "badge", message: "You earned a Gold Patron badge", time: "1 day ago" },
  { type: "donation", message: "satoshi.sol donated 5 SOL to your Rust OS project", time: "2 days ago" },
];

type TabType = "overview" | "campaigns" | "donations" | "create";

export default function DashboardPage() {
  const { connected, publicKey } = useWallet();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [myCampaigns, setMyCampaigns] = useState(SEED_CAMPAIGNS);

  const tabs = [
    { id: "overview" as TabType, label: "Overview", icon: "grid" },
    { id: "campaigns" as TabType, label: "My Campaigns", icon: "folder" },
    { id: "donations" as TabType, label: "My Badges", icon: "badge" },
    { id: "create" as TabType, label: "Create", icon: "plus" },
  ];

  const getTabIcon = (icon: string) => {
    switch (icon) {
      case "grid":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        );
      case "folder":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        );
      case "badge":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      case "plus":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Platinum":
        return "from-cyan-400 to-blue-400";
      case "Gold":
        return "from-yellow-500 to-amber-400";
      case "Silver":
        return "from-zinc-400 to-zinc-300";
      default:
        return "from-amber-700 to-amber-500";
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-[72px]">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#14f195]/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#9945ff]/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Header */}
        <div className="mb-6 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-[22px] sm:text-[28px] md:text-[32px] font-bold tracking-[-0.02em] text-white mb-1 sm:mb-2">
                Dashboard
              </h1>
              {connected && publicKey ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="w-2 h-2 bg-[#14f195] rounded-full animate-pulse" />
                  <span className="text-[13px] sm:text-[14px] text-zinc-500 font-mono">
                    {publicKey.toBase58().slice(0, 6)}...{publicKey.toBase58().slice(-4)}
                  </span>
                  <span className={`ml-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-gradient-to-r ${getBadgeColor(USER_STATS.patronTier)} text-white`}>
                    {USER_STATS.patronTier} Patron
                  </span>
                </div>
              ) : (
                <p className="text-[13px] sm:text-[14px] text-zinc-500">
                  Connect your wallet to access your dashboard
                </p>
              )}
            </div>

            {connected && (
              <button
                onClick={() => setActiveTab("create")}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#14f195] to-[#00d4aa] text-[#0a0a0f] text-[14px] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#14f195]/25 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                New Campaign
              </button>
            )}
          </div>
        </div>

        {/* Not Connected State */}
        {!connected && (
          <div className="glass-card rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#14f195]/20 to-[#9945ff]/20 border border-[#14f195]/25 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#14f195]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
              </svg>
            </div>
            <h2 className="text-[18px] sm:text-[20px] font-semibold text-white mb-3">
              Connect Your Wallet
            </h2>
            <p className="text-[14px] text-zinc-500 mb-6 leading-relaxed">
              Link your Solana wallet to create campaigns, track donations, and manage your soulbound badges.
            </p>
            <p className="text-[13px] text-zinc-600">
              Use the connect button in the navigation bar
            </p>
          </div>
        )}

        {/* Connected Dashboard */}
        {connected && (
          <>
            {/* Tab Navigation */}
            <div className="flex items-center gap-1 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-[13px] sm:text-[14px] font-medium rounded-xl whitespace-nowrap transition-all min-h-[44px] ${
                    activeTab === tab.id
                      ? "bg-white text-[#0a0a0f]"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {getTabIcon(tab.icon)}
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6 sm:space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { label: "Total Raised", value: `${USER_STATS.totalRaised} SOL`, icon: "trending-up", color: "from-[#14f195] to-[#00d4aa]" },
                    { label: "Total Donated", value: `${USER_STATS.totalDonated} SOL`, icon: "heart", color: "from-[#9945ff] to-[#7c3aed]" },
                    { label: "Active Campaigns", value: USER_STATS.activeCampaigns.toString(), icon: "folder", color: "from-sky-500 to-blue-500" },
                    { label: "Badges Earned", value: USER_STATS.badgesEarned.toString(), icon: "badge", color: "from-amber-500 to-orange-500" },
                  ].map((stat, i) => (
                    <div key={i} className="glass-card p-4 sm:p-5 rounded-xl sm:rounded-2xl group hover:border-white/10 transition-all">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                        {stat.icon === "trending-up" && (
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        )}
                        {stat.icon === "heart" && (
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        )}
                        {stat.icon === "folder" && (
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                          </svg>
                        )}
                        {stat.icon === "badge" && (
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        )}
                      </div>
                      <p className="text-[11px] sm:text-[12px] text-zinc-500 uppercase tracking-wider mb-1">{stat.label}</p>
                      <p className="text-[20px] sm:text-[24px] font-bold text-white tracking-tight">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Recent Campaigns */}
                  <div className="glass-card rounded-xl sm:rounded-2xl overflow-hidden">
                    <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-white/[0.04] flex items-center justify-between">
                      <h3 className="text-[15px] sm:text-[16px] font-semibold text-white">My Campaigns</h3>
                      <button
                        onClick={() => setActiveTab("campaigns")}
                        className="text-[12px] sm:text-[13px] text-zinc-500 hover:text-[#14f195] transition-colors"
                      >
                        View all →
                      </button>
                    </div>
                    <div className="divide-y divide-white/[0.04]">
                      {myCampaigns.slice(0, 2).map((campaign) => (
                        <div key={campaign.slug} className="p-4 sm:p-5 hover:bg-white/[0.02] transition-colors">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-[14px] sm:text-[15px] font-medium text-white truncate">{campaign.title}</h4>
                              <p className="text-[12px] sm:text-[13px] text-zinc-500 mt-0.5">{campaign.donors} donors</p>
                            </div>
                            <span className={`px-2 py-1 text-[10px] font-medium rounded-full ${
                              campaign.status === "active" 
                                ? "bg-[#14f195]/15 text-[#14f195]" 
                                : "bg-zinc-800 text-zinc-400"
                            }`}>
                              {campaign.status === "active" ? `${campaign.daysLeft}d left` : "Completed"}
                            </span>
                          </div>
                          {/* Progress bar */}
                          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#14f195] to-[#9945ff] rounded-full transition-all"
                              style={{ width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[12px] text-zinc-500">{campaign.raised} SOL raised</span>
                            <span className="text-[12px] text-zinc-600">{campaign.goal} SOL goal</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activity Feed */}
                  <div className="glass-card rounded-xl sm:rounded-2xl overflow-hidden">
                    <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-white/[0.04]">
                      <h3 className="text-[15px] sm:text-[16px] font-semibold text-white">Recent Activity</h3>
                    </div>
                    <div className="divide-y divide-white/[0.04]">
                      {ACTIVITY_FEED.map((activity, i) => (
                        <div key={i} className="p-4 sm:p-5 hover:bg-white/[0.02] transition-colors">
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              activity.type === "donation" ? "bg-[#14f195]/15" :
                              activity.type === "milestone" ? "bg-[#9945ff]/15" :
                              "bg-amber-500/15"
                            }`}>
                              {activity.type === "donation" && (
                                <svg className="w-4 h-4 text-[#14f195]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              )}
                              {activity.type === "milestone" && (
                                <svg className="w-4 h-4 text-[#9945ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                              )}
                              {activity.type === "badge" && (
                                <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] sm:text-[14px] text-zinc-300 leading-relaxed">{activity.message}</p>
                              <p className="text-[11px] sm:text-[12px] text-zinc-600 mt-1">{activity.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { label: "Share Campaign", icon: "share", action: () => {} },
                    { label: "View Analytics", icon: "chart", action: () => {} },
                    { label: "Manage Updates", icon: "edit", action: () => {} },
                    { label: "Withdraw Funds", icon: "download", action: () => {} },
                  ].map((action, i) => (
                    <button
                      key={i}
                      onClick={action.action}
                      className="glass-card p-4 rounded-xl flex flex-col items-center gap-2 hover:border-[#14f195]/30 hover:bg-[#14f195]/5 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center group-hover:bg-[#14f195]/20 transition-colors">
                        {action.icon === "share" && (
                          <svg className="w-5 h-5 text-zinc-400 group-hover:text-[#14f195] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                        )}
                        {action.icon === "chart" && (
                          <svg className="w-5 h-5 text-zinc-400 group-hover:text-[#14f195] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        )}
                        {action.icon === "edit" && (
                          <svg className="w-5 h-5 text-zinc-400 group-hover:text-[#14f195] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        )}
                        {action.icon === "download" && (
                          <svg className="w-5 h-5 text-zinc-400 group-hover:text-[#14f195] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[12px] sm:text-[13px] text-zinc-400 group-hover:text-white transition-colors text-center">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Campaigns Tab */}
            {activeTab === "campaigns" && (
              <div className="space-y-6">
                {/* Campaign Stats */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="glass-card p-4 sm:p-5 rounded-xl text-center">
                    <p className="text-[20px] sm:text-[28px] font-bold text-white">{myCampaigns.length}</p>
                    <p className="text-[11px] sm:text-[12px] text-zinc-500 uppercase tracking-wider mt-1">Total</p>
                  </div>
                  <div className="glass-card p-4 sm:p-5 rounded-xl text-center">
                    <p className="text-[20px] sm:text-[28px] font-bold text-[#14f195]">{myCampaigns.filter(c => c.status === "active").length}</p>
                    <p className="text-[11px] sm:text-[12px] text-zinc-500 uppercase tracking-wider mt-1">Active</p>
                  </div>
                  <div className="glass-card p-4 sm:p-5 rounded-xl text-center">
                    <p className="text-[20px] sm:text-[28px] font-bold text-zinc-400">{myCampaigns.filter(c => c.status === "completed").length}</p>
                    <p className="text-[11px] sm:text-[12px] text-zinc-500 uppercase tracking-wider mt-1">Completed</p>
                  </div>
                </div>

                {/* Campaign List */}
                <div className="space-y-4">
                  {myCampaigns.map((campaign) => (
                    <div key={campaign.slug} className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:border-white/10 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-[16px] sm:text-[18px] font-semibold text-white">{campaign.title}</h3>
                            <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                              campaign.status === "active" 
                                ? "bg-[#14f195]/15 text-[#14f195]" 
                                : "bg-zinc-800 text-zinc-400"
                            }`}>
                              {campaign.status}
                            </span>
                          </div>
                          <p className="text-[13px] sm:text-[14px] text-zinc-500 line-clamp-2">{campaign.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/campaign/${campaign.slug}`}
                            className="px-4 py-2 text-[13px] font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                          >
                            View
                          </Link>
                          <button className="p-2 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#14f195] to-[#9945ff] rounded-full transition-all"
                            style={{ width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[13px] font-medium text-white">{campaign.raised} SOL <span className="text-zinc-500">of {campaign.goal} SOL</span></span>
                          <span className="text-[13px] text-zinc-500">{Math.round((campaign.raised / campaign.goal) * 100)}%</span>
                        </div>
                      </div>

                      {/* Stats Row */}
                      <div className="flex items-center gap-4 sm:gap-6 pt-4 border-t border-white/[0.04] flex-wrap">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="text-[13px] text-zinc-400">{campaign.donors} donors</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          <span className="text-[13px] text-zinc-400">{campaign.category}</span>
                        </div>
                        {campaign.status === "active" && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-[13px] text-zinc-400">{campaign.daysLeft} days left</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Create CTA */}
                <div className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-[#14f195]/5 to-[#9945ff]/5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-[15px] sm:text-[16px] font-semibold text-white mb-1">Ready to start a new project?</h3>
                      <p className="text-[13px] text-zinc-500">Create a campaign and share it on social media</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("create")}
                      className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#14f195] to-[#00d4aa] text-[#0a0a0f] text-[13px] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#14f195]/25 transition-all text-center"
                    >
                      Create Campaign
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Donations/Badges Tab */}
            {activeTab === "donations" && (
              <div className="space-y-6">
                {/* Badge Summary */}
                <div className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                    <h3 className="text-[16px] sm:text-[18px] font-semibold text-white">Your Patron Status</h3>
                    <span className={`px-3 py-1.5 text-[12px] font-bold uppercase tracking-wider rounded-lg bg-gradient-to-r ${getBadgeColor(USER_STATS.patronTier)} text-white`}>
                      {USER_STATS.patronTier} Tier
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="text-center p-3 bg-zinc-800/50 rounded-xl">
                      <p className="text-[20px] sm:text-[28px] font-bold text-white">{USER_STATS.badgesEarned}</p>
                      <p className="text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-wider mt-1">Total Badges</p>
                    </div>
                    <div className="text-center p-3 bg-zinc-800/50 rounded-xl">
                      <p className="text-[20px] sm:text-[28px] font-bold text-[#14f195]">{USER_STATS.totalDonated} SOL</p>
                      <p className="text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-wider mt-1">Total Donated</p>
                    </div>
                    <div className="text-center p-3 bg-zinc-800/50 rounded-xl">
                      <p className="text-[20px] sm:text-[28px] font-bold text-white">{MY_DONATIONS.length}</p>
                      <p className="text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-wider mt-1">Projects</p>
                    </div>
                    <div className="text-center p-3 bg-zinc-800/50 rounded-xl">
                      <p className="text-[20px] sm:text-[28px] font-bold text-[#9945ff]">5.5 SOL</p>
                      <p className="text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-wider mt-1">To Platinum</p>
                    </div>
                  </div>
                </div>

                {/* Badge Collection */}
                <div>
                  <h3 className="text-[15px] sm:text-[16px] font-semibold text-white mb-4">Your Soulbound Badges</h3>
                  <div className="grid gap-3 sm:gap-4">
                    {MY_DONATIONS.map((donation) => (
                      <div key={donation.id} className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-white/10 transition-all">
                        <div className="flex items-center gap-4">
                          {/* Badge Icon */}
                          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${getBadgeColor(donation.badge)} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <span className="text-[16px] sm:text-[18px] font-bold text-white">{donation.badge[0]}</span>
                          </div>
                          
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h4 className="text-[14px] sm:text-[15px] font-medium text-white truncate">{donation.project}</h4>
                              <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md bg-gradient-to-r ${getBadgeColor(donation.badge)} text-white`}>
                                {donation.badge}
                              </span>
                            </div>
                            <p className="text-[12px] sm:text-[13px] text-zinc-500">by @{donation.creator}</p>
                          </div>
                          
                          {/* Amount & Date */}
                          <div className="text-right flex-shrink-0">
                            <p className="text-[16px] sm:text-[18px] font-bold text-[#14f195]">{donation.amount} SOL</p>
                            <p className="text-[11px] sm:text-[12px] text-zinc-600">{donation.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-[#14f195]/5 to-[#9945ff]/5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-[15px] sm:text-[16px] font-semibold text-white mb-1">Keep building your reputation</h3>
                      <p className="text-[13px] text-zinc-500">Support more projects to earn higher tier badges</p>
                    </div>
                    <Link
                      href="/explore"
                      className="w-full sm:w-auto px-5 py-2.5 bg-white text-[#0a0a0f] text-[13px] font-semibold rounded-xl hover:bg-zinc-100 transition-colors text-center"
                    >
                      Explore Projects
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Create Tab */}
            {activeTab === "create" && (
              <div className="max-w-xl mx-auto">
                {/* Form Card */}
                <div className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-8">
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-[18px] sm:text-[20px] font-semibold text-white mb-2">Create a Campaign</h2>
                    <p className="text-[13px] sm:text-[14px] text-zinc-500">Set up your funding campaign and share it on social media.</p>
                  </div>
                  <CreateCampaignForm onCreated={(c) => {
                    setMyCampaigns((prev) => [c, ...prev]);
                    setActiveTab("campaigns");
                  }} />
                </div>

                {/* Tips */}
                <div className="mt-6 glass-card rounded-xl p-5">
                  <h3 className="text-[14px] font-medium text-zinc-300 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#14f195]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Tips for success
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Keep your title concise—it's displayed in the Blink preview",
                      "Be specific about how funds will be used",
                      "Set a realistic goal that's achievable within your deadline",
                      "Share in relevant communities where people care about your topic",
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13px] text-zinc-500">
                        <span className="text-[#14f195] mt-0.5">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
