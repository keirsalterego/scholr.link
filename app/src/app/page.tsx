import Link from "next/link";
import { CampaignCard } from "@/components/CampaignCard";
import { BlinkPreview } from "@/components/BlinkPreview";
import { SoulboundBadge3D } from "@/components/SoulboundBadge3D";

// Mock featured campaigns
const FEATURED_CAMPAIGNS = [
  {
    slug: "rust-os",
    title: "Rust OS Kernel Project",
    description: "Building a minimal OS kernel in Rust for my final year project. Need funds for a Raspberry Pi cluster!",
    goal: 200,
    raised: 50,
    creator: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    category: "Engineering",
  },
  {
    slug: "ml-research",
    title: "ML Research: Climate Prediction",
    description: "Training neural networks to predict local weather patterns using historical data. Need GPU cloud credits!",
    goal: 500,
    raised: 125,
    creator: "8yLLtg3DX98e08UKSEqcE6kCljfmU8nfQc84qTJosgBtV",
    category: "Research",
  },
  {
    slug: "robotics-arm",
    title: "3D Printed Robotic Arm",
    description: "Building a low-cost prosthetic arm prototype using 3D printing and Arduino for accessibility research.",
    goal: 350,
    raised: 280,
    creator: "9zMMug4EY09f19VLTFrdF7lDkmgnV9ogRd95rUKptgCuW",
    category: "Hardware",
  },
];

// Mock leaderboard data
const TOP_DONORS = [
  { rank: 1, address: "vitalik.sol", amount: 2450, badge: "Platinum", avatar: "V", projects: 12 },
  { rank: 2, address: "satoshi.sol", amount: 1890, badge: "Platinum", avatar: "S", projects: 8 },
  { rank: 3, address: "gavin.sol", amount: 1250, badge: "Gold", avatar: "G", projects: 15 },
  { rank: 4, address: "anatoly.sol", amount: 980, badge: "Gold", avatar: "A", projects: 6 },
  { rank: 5, address: "raj.sol", amount: 720, badge: "Silver", avatar: "R", projects: 9 },
];

// Mock trending projects
const TRENDING_PROJECTS = [
  { title: "Quantum Computing Simulator", views: 12400, donations: 89, raised: 2100, trend: "+127%", category: "Research" },
  { title: "AI-Powered Study Assistant", views: 9800, donations: 67, raised: 1450, trend: "+89%", category: "Engineering" },
  { title: "Biodegradable Packaging Lab", views: 7200, donations: 45, raised: 890, trend: "+64%", category: "Science" },
];

// Mock milestone updates
const MILESTONE_UPDATES = [
  {
    project: "Climate ML Research",
    author: "sarahchen.sol",
    milestone: "Model accuracy reached 94%!",
    description: "Successfully trained the neural network on 5 years of weather data.",
    time: "2 hours ago",
    hasMedia: true,
  },
  {
    project: "Rust OS Kernel",
    author: "alexdev.sol",
    milestone: "Memory management complete",
    description: "Implemented virtual memory and page tables. Demo video coming soon!",
    time: "5 hours ago",
    hasMedia: false,
  },
];

// Patron tier configuration
const PATRON_TIERS = [
  { name: "Bronze", minAmount: 10, color: "from-amber-700 to-amber-500", perks: ["Patron Badge", "Project Updates"] },
  { name: "Silver", minAmount: 100, color: "from-zinc-400 to-zinc-300", perks: ["Bronze Perks", "Early Access", "Discord Role"] },
  { name: "Gold", minAmount: 500, color: "from-yellow-500 to-amber-400", perks: ["Silver Perks", "Voting Rights", "Exclusive AMAs"] },
  { name: "Platinum", minAmount: 1000, color: "from-cyan-400 to-blue-400", perks: ["Gold Perks", "Advisory Board", "Revenue Share"] },
];



export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-[72px]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Enhanced gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#14f195]/8 via-[#9945ff]/3 to-transparent" />
        <div className="absolute top-0 left-1/3 w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] bg-[#14f195]/[0.08] rounded-full blur-[100px] sm:blur-[150px] animate-pulse-subtle" />
        <div className="absolute top-40 right-1/4 w-[250px] sm:w-[400px] lg:w-[600px] h-[250px] sm:h-[400px] lg:h-[600px] bg-[#9945ff]/[0.06] rounded-full blur-[100px] sm:blur-[130px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#14f195]/20 to-transparent" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,241,149,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,241,149,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-20 pb-10 sm:pb-28 lg:pt-28 lg:pb-36">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="max-w-xl lg:max-w-lg animate-fade-in">
              {/* Headline */}
              <h1 className="text-[28px] sm:text-[42px] md:text-[52px] lg:text-[60px] font-bold tracking-[-0.03em] leading-[1.08] mb-3 sm:mb-7">
                <span className="text-white">Fund research,</span>
                <br />
                <span className="text-gradient">directly from Twitter.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-[14px] sm:text-[17px] text-zinc-400 leading-[1.6] mb-5 sm:mb-10 max-w-md animate-slide-up-delayed">
                ScholrLink transforms social posts into instant funding portals. 
                No forms, no friction—just tap, sign, and support the next breakthrough.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 animate-slide-up-delayed-2">
                <Link
                  href="/dashboard"
                  className="glass-button-primary px-6 sm:px-7 py-3 sm:py-3.5 text-[14px] sm:text-[15px] font-semibold rounded-xl transition-all duration-300 text-center"
                >
                  Start a Campaign
                </Link>
                <Link
                  href="/explore"
                  className="glass-button-secondary px-6 sm:px-7 py-3 sm:py-3.5 text-[14px] sm:text-[15px] rounded-xl transition-all duration-300 text-center"
                >
                  Browse Projects
                </Link>
              </div>
            </div>

            {/* Right Visual - Blink Preview Mock */}
            <div className="animate-slide-up-delayed-3">
              <BlinkPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By / Social Proof */}
      <section className="py-5 sm:py-10 border-y border-[#1a1f2e]/50 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#14f195]/[0.02] to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-16 scroll-reveal-subtle">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-zinc-600 font-medium">Powered by</span>
            <div className="flex items-center gap-6 sm:gap-10">
              <span className="text-[14px] font-medium text-zinc-500 hover:text-[#14f195] transition-colors cursor-default">Solana</span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="text-[14px] font-medium text-zinc-500 hover:text-[#14f195] transition-colors cursor-default">Blinks</span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="text-[14px] font-medium text-zinc-500 hover:text-[#14f195] transition-colors cursor-default">Anchor</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-24 lg:py-32 section-bg-mesh relative">
        {/* Background glows */}
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-[#14f195]/[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-[#9945ff]/[0.03] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
          <div className="text-center mb-6 sm:mb-16 scroll-reveal">
            <h2 className="text-[22px] sm:text-[32px] md:text-[38px] font-bold tracking-[-0.02em] text-white mb-2 sm:mb-5">
              How it works
            </h2>
            <p className="text-zinc-400 max-w-lg mx-auto text-[13px] sm:text-[16px] leading-relaxed px-4 sm:px-0">
              Three simple steps to start funding your project through social media.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 scroll-wave">
            {[
              {
                step: "01",
                title: "Create your campaign",
                description: "Connect wallet, set your funding goal and deadline. Get a unique link in seconds.",
              },
              {
                step: "02",
                title: "Share on social",
                description: "Post your link on Twitter/X. It unfurls into an interactive widget with donation buttons.",
              },
              {
                step: "03",
                title: "Receive funding",
                description: "Supporters donate with one tap using their Solana wallet. You get funds instantly.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-card p-4 sm:p-7 rounded-xl sm:rounded-2xl hover-lift group relative overflow-hidden"
              >
                {/* Card glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#14f195]/5 to-[#9945ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="mb-3 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#14f195]/20 to-[#9945ff]/20 border border-[#14f195]/25 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-[12px] sm:text-[14px] font-bold text-[#14f195]">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="text-[15px] sm:text-[17px] font-semibold text-white mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-[13px] sm:text-[15px] text-zinc-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-12 sm:py-24 lg:py-32 section-bg-gradient relative overflow-hidden">
        {/* Enhanced background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#14f195]/5 via-[#9945ff]/3 to-transparent rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#9945ff]/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-[#14f195]/[0.03] rounded-full blur-[100px] pointer-events-none" />
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,241,149,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,241,149,0.02)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6 mb-6 sm:mb-14 scroll-reveal">
            <div>
              <h2 className="text-[20px] sm:text-[32px] md:text-[38px] font-bold tracking-[-0.02em] text-white mb-1 sm:mb-4">
                Active campaigns
              </h2>
              <p className="text-zinc-400 text-[13px] sm:text-[16px] leading-relaxed">Fund the next generation of student innovation</p>
            </div>
            <Link
              href="/explore"
              className="glass-button-secondary px-6 py-3 text-[14px] font-medium rounded-xl transition-all duration-300 whitespace-nowrap"
            >
              View all projects
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 scroll-cascade">
            {FEATURED_CAMPAIGNS.map((campaign) => (
              <CampaignCard key={campaign.slug} {...campaign} />
            ))}
          </div>
        </div>
      </section>

      {/* Patron Badge Section */}
      <section className="py-12 sm:py-24 lg:py-32 section-bg-glow relative overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0f15] to-[#0a0a0f]" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#14f195]/6 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[450px] h-[450px] bg-[#9945ff]/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#14f195]/15 to-transparent" />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(20,241,149,0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(153,69,255,0.03)_0%,transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 lg:gap-20 items-center">
            {/* Left content */}
            <div className="scroll-reveal-elegant">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 mb-3 sm:mb-6 text-[10px] sm:text-[11px] font-medium tracking-wide text-[#14f195] bg-[#14f195]/10 border border-[#14f195]/25 rounded-full">
                <span className="w-1.5 h-1.5 bg-[#14f195] rounded-full animate-pulse" />
                Token-2022 Powered
              </div>
              <h2 className="text-[22px] sm:text-[32px] md:text-[38px] font-bold tracking-[-0.02em] text-white mb-3 sm:mb-6 leading-[1.15]">
                Build your on-chain
                <span className="text-gradient"> reputation</span>
              </h2>
              <p className="text-[13px] sm:text-[16px] text-zinc-400 leading-[1.6] mb-5 sm:mb-10">
                Every donation mints a Soulbound NFT to your wallet—permanent, 
                non-transferable proof that you believed in innovation before it happened.
              </p>
              
              {/* Feature grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-5 sm:mb-10">
                {[
                  { title: "Soulbound", desc: "Non-transferable & permanent" },
                  { title: "Visible", desc: "Public on-chain portfolio" },
                  { title: "Rewards", desc: "Unlock future project perks" },
                  { title: "Community", desc: "Join patron-only groups" },
                ].map((item, i) => (
                  <div key={i} className="glass-card flex items-start gap-2 sm:gap-4 p-3 sm:p-5 rounded-lg sm:rounded-xl hover:border-[#14f195]/20 transition-colors group">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-[#14f195] to-[#9945ff] mt-1 sm:mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                    <div>
                      <p className="text-[13px] sm:text-[15px] font-medium text-zinc-200 mb-0.5 sm:mb-1">{item.title}</p>
                      <p className="text-[11px] sm:text-[13px] text-zinc-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/explore"
                className="glass-button-secondary inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium rounded-xl transition-all duration-300"
              >
                Start collecting badges
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            
            {/* Right - 3D Badge showcase */}
            <SoulboundBadge3D />
          </div>
        </div>
      </section>

      {/* Donor Leaderboard & Patron Tiers Section */}
      <section className="py-12 sm:py-28 lg:py-36 relative overflow-hidden">
        {/* Sophisticated background */}
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_70%_0%,rgba(20,241,149,0.04),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_20%_100%,rgba(153,69,255,0.03),transparent_50%)]" />
        
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 lg:gap-28">
            
            {/* Left - Leaderboard */}
            <div className="scroll-reveal-left">
              {/* Section header */}
              <div className="mb-6 sm:mb-10">
                <div className="flex items-center gap-3 mb-3 sm:mb-5">
                  <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-[#14f195] to-transparent" />
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#14f195]">
                    Top Contributors
                  </span>
                </div>
                <h2 className="text-[24px] sm:text-[36px] md:text-[44px] font-bold tracking-[-0.03em] text-white leading-[1.1] mb-2 sm:mb-4">
                  Donor <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14f195] to-[#9945ff]">Leaderboard</span>
                </h2>
                <p className="text-[14px] sm:text-[15px] text-zinc-500 leading-relaxed max-w-md">
                  Compete for the top spot. The most generous patrons earn recognition, 
                  exclusive badges, and bragging rights on-chain.
                </p>
              </div>

              {/* Leaderboard Card */}
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-px bg-gradient-to-b from-white/[0.08] to-transparent rounded-2xl blur-sm" />
                
                <div className="relative bg-[#0d0d12] border border-white/[0.06] rounded-2xl overflow-hidden">
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-white/[0.04] flex items-center justify-between">
                    <span className="text-[13px] font-medium text-zinc-400">This Month</span>
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14f195] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#14f195]"></span>
                      </span>
                      <span className="text-[11px] font-medium text-zinc-500">Live</span>
                    </div>
                  </div>
                  
                  {/* Donor rows */}
                  <div className="divide-y divide-white/[0.03]">
                    {TOP_DONORS.slice(0, 3).map((donor, i) => (
                      <div 
                        key={i} 
                        className={`group flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-2.5 sm:py-4 transition-all duration-300 hover:bg-white/[0.02] ${
                          i === 0 ? "bg-gradient-to-r from-[#14f195]/[0.04] to-transparent" : ""
                        }`}
                      >
                        {/* Rank indicator */}
                        <div className={`flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center text-[11px] sm:text-[13px] font-bold transition-transform duration-300 group-hover:scale-110 ${
                          donor.rank === 1 
                            ? "bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 text-[#0a0a0f] shadow-lg shadow-amber-500/20" 
                            : donor.rank === 2 
                              ? "bg-gradient-to-br from-zinc-300 via-zinc-200 to-zinc-400 text-[#0a0a0f]" 
                              : donor.rank === 3 
                                ? "bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-amber-100" 
                                : "bg-zinc-800/80 text-zinc-500"
                        }`}>
                          {donor.rank}
                        </div>
                        
                        {/* Avatar - hidden on mobile to save space */}
                        <div className={`hidden sm:flex flex-shrink-0 w-11 h-11 rounded-full items-center justify-center text-[14px] font-semibold transition-transform duration-300 group-hover:scale-105 ${
                          donor.rank === 1 
                            ? "bg-gradient-to-br from-[#14f195] to-[#00d4aa] text-[#0a0a0f]" 
                            : "bg-gradient-to-br from-zinc-700 to-zinc-800 text-zinc-300"
                        }`}>
                          {donor.avatar}
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 sm:gap-2.5 mb-0.5 flex-wrap">
                            <span className="text-[13px] sm:text-[14px] font-semibold text-white truncate max-w-[100px] sm:max-w-none">{donor.address}</span>
                            <span className={`px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider rounded-md ${
                              donor.badge === "Platinum" 
                                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/20" 
                                : donor.badge === "Gold" 
                                  ? "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-400 border border-yellow-500/20" 
                                  : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                            }`}>
                              {donor.badge}
                            </span>
                          </div>
                          <span className="text-[11px] sm:text-[12px] text-zinc-600 hidden sm:block">{donor.projects} projects supported</span>
                        </div>
                        
                        {/* Amount */}
                        <div className="text-right flex-shrink-0">
                          <span className={`text-[14px] sm:text-[18px] font-bold tracking-tight ${
                            donor.rank === 1 ? "text-[#14f195]" : "text-white"
                          }`}>${donor.amount.toLocaleString()}</span>
                          <p className="text-[9px] sm:text-[10px] font-medium text-zinc-600 uppercase tracking-wider">USDC</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Footer */}
                  <div className="px-6 py-4 border-t border-white/[0.04] bg-white/[0.01]">
                    <Link 
                      href="/leaderboard" 
                      className="inline-flex items-center gap-2 text-[13px] font-medium text-zinc-400 hover:text-[#14f195] transition-colors group"
                    >
                      View full leaderboard
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Patron Tiers - Hidden on mobile for compact layout */}
            <div className="hidden lg:block scroll-reveal-right">
              {/* Section header */}
              <div className="mb-6 sm:mb-10">
                <div className="flex items-center gap-3 mb-3 sm:mb-5">
                  <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-[#9945ff] to-transparent" />
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9945ff]">
                    Soulbound Badges
                  </span>
                </div>
                <h2 className="text-[24px] sm:text-[36px] md:text-[44px] font-bold tracking-[-0.03em] text-white leading-[1.1] mb-2 sm:mb-4">
                  Level up your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945ff] to-[#14f195]">reputation</span>
                </h2>
                <p className="text-[14px] sm:text-[15px] text-zinc-500 leading-relaxed max-w-md">
                  Earn non-transferable badges based on your lifetime contributions. 
                  Higher tiers unlock exclusive perks and voting power.
                </p>
              </div>

              {/* Tier Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                {PATRON_TIERS.map((tier, i) => (
                  <div 
                    key={i} 
                    className="group relative p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0d0d12] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-500 hover:-translate-y-1"
                  >
                    {/* Hover glow */}
                    <div className={`absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${tier.color} blur-xl -z-10`} style={{ opacity: 0 }} />
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 bg-gradient-to-br from-white to-transparent" />
                    
                    {/* Tier badge */}
                    <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-3 sm:mb-5 shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <span className="text-[14px] sm:text-[18px] font-bold text-white drop-shadow-lg">{tier.name[0]}</span>
                    </div>
                    
                    {/* Tier info */}
                    <h4 className="text-[14px] sm:text-[17px] font-semibold text-white mb-0.5 sm:mb-1 tracking-tight">{tier.name}</h4>
                    <p className="text-[10px] sm:text-[12px] text-zinc-600 mb-2 sm:mb-4 font-medium">${tier.minAmount}+ lifetime</p>
                    
                    {/* Perks - hidden on mobile for space */}
                    <div className="hidden sm:block space-y-2">
                      {tier.perks.slice(0, 2).map((perk, j) => (
                        <div key={j} className="flex items-center gap-2.5">
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tier.color}`} />
                          <span className="text-[12px] text-zinc-400">{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Bottom CTA */}
              <div className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#14f195]/[0.05] to-[#9945ff]/[0.05] border border-white/[0.04]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-[14px] font-medium text-white mb-1">Ready to level up?</p>
                    <p className="text-[12px] text-zinc-500">Support a project and earn your first badge</p>
                  </div>
                  <Link 
                    href="/explore" 
                    className="w-full sm:w-auto flex-shrink-0 px-5 py-2.5 bg-white text-[#0a0a0f] text-[12px] font-semibold rounded-xl hover:bg-zinc-100 transition-colors text-center"
                  >
                    Explore Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Projects Section - Hidden on mobile for compact layout */}
      <section className="hidden sm:block py-12 sm:py-24 lg:py-32 section-bg-gradient relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#14f195]/4 to-transparent rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
          <div className="text-center mb-6 sm:mb-14 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 mb-3 sm:mb-6 text-[10px] sm:text-[11px] font-medium tracking-wide text-orange-400 bg-orange-500/10 border border-orange-500/25 rounded-full">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              Trending Now
            </div>
            <h2 className="text-[20px] sm:text-[32px] md:text-[38px] font-bold tracking-[-0.02em] text-white mb-2 sm:mb-5">
              Projects going <span className="text-gradient">viral</span>
            </h2>
            <p className="text-zinc-400 max-w-lg mx-auto text-[13px] sm:text-[16px] leading-relaxed px-4 sm:px-0">
              Discover the hottest student projects gaining traction right now. 
              Ranked by views, donations, and community engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 scroll-wave">
            {TRENDING_PROJECTS.map((project, i) => (
              <div key={i} className="glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-[#14f195]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  {/* Trend badge */}
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <span className={`px-2 sm:px-2.5 py-1 text-[10px] font-medium rounded-full ${
                      project.category === "Research" ? "bg-indigo-500/20 text-indigo-400" :
                      project.category === "Engineering" ? "bg-sky-500/20 text-sky-400" :
                      "bg-emerald-500/20 text-emerald-400"
                    }`}>
                      {project.category}
                    </span>
                    <span className="px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-orange-400 bg-orange-500/15 rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      {project.trend}
                    </span>
                  </div>

                  <h3 className="text-[15px] sm:text-[17px] font-semibold text-white mb-3 sm:mb-4 group-hover:text-[#14f195] transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 bg-zinc-800/30 rounded-lg sm:rounded-xl">
                    <div className="text-center">
                      <p className="text-[10px] sm:text-[11px] text-zinc-500 mb-1">Views</p>
                      <p className="text-[13px] sm:text-[14px] font-semibold text-white">{(project.views / 1000).toFixed(1)}K</p>
                    </div>
                    <div className="text-center border-x border-zinc-700/50">
                      <p className="text-[10px] sm:text-[11px] text-zinc-500 mb-1">Donors</p>
                      <p className="text-[13px] sm:text-[14px] font-semibold text-white">{project.donations}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] sm:text-[11px] text-zinc-500 mb-1">Raised</p>
                      <p className="text-[13px] sm:text-[14px] font-semibold text-[#14f195]">${project.raised}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-10 scroll-reveal">
            <Link href="/explore?sort=trending" className="glass-button-secondary inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-[13px] sm:text-[14px] font-medium rounded-xl">
              Explore trending projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Milestone Updates Section - Hidden on mobile for compact layout */}
      <section className="hidden sm:block py-12 sm:py-24 lg:py-32 section-bg-glow relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0f15] to-[#0a0a0f]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#14f195]/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            {/* Left - Content */}
            <div className="scroll-reveal-flip">
              <div className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 mb-3 sm:mb-6 text-[10px] sm:text-[11px] font-medium tracking-wide text-[#14f195] bg-[#14f195]/10 border border-[#14f195]/25 rounded-full">
                Real-Time Updates
              </div>
              <h2 className="text-[20px] sm:text-[32px] md:text-[42px] font-bold tracking-[-0.02em] text-white mb-3 sm:mb-6 leading-[1.1]">
                Milestone updates,<br />
                <span className="text-gradient">delivered instantly</span>
              </h2>
              <p className="text-[13px] sm:text-[16px] text-zinc-400 leading-[1.6] sm:leading-[1.8] mb-5 sm:mb-10">
                Stay connected to the projects you support. Students share progress updates, 
                and you receive them as Blinks right in your Twitter feed.
              </p>

              {/* Feature List - Clean design without icons */}
              <div className="space-y-0">
                {[
                  { title: "Lab Demos", desc: "Photos & video demos from the lab" },
                  { title: "Code Milestones", desc: "GitHub commits & code milestones" },
                  { title: "Goal Celebrations", desc: "Goal completion celebrations" },
                  { title: "Direct Access", desc: "Direct messages from creators" },
                ].map((item, i) => (
                  <div key={i} className="group flex items-start gap-3 sm:gap-5 py-3 sm:py-4 border-b border-[#1a1f2e] last:border-b-0 hover:border-[#14f195]/20 transition-colors cursor-default">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-zinc-800/50 flex items-center justify-center text-[11px] sm:text-[13px] font-semibold text-zinc-500 group-hover:bg-[#14f195]/10 group-hover:text-[#14f195] transition-all">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] sm:text-[15px] font-medium text-white mb-0.5 group-hover:text-[#14f195] transition-colors">{item.title}</h4>
                      <p className="text-[13px] sm:text-[14px] text-zinc-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Mock Updates Feed */}
            <div className="scroll-reveal-glow">
              <div className="glass-card rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                {/* Header */}
                <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-[#1a1f2e] flex items-center justify-between bg-zinc-900/30">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#14f195] to-[#9945ff] flex items-center justify-center text-[#0a0a0f] font-bold text-[12px] sm:text-[13px]">
                      X
                    </div>
                    <div>
                      <span className="text-[14px] sm:text-[15px] font-semibold text-white block">Project Updates</span>
                      <span className="text-[11px] sm:text-[12px] text-zinc-500">via Solana Blinks</span>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-zinc-600 uppercase tracking-wider hidden sm:block">Your Feed</span>
                </div>

                {/* Updates List - Mobile: show 1, Desktop: show all */}
                {/* Mobile version */}
                <div className="sm:hidden divide-y divide-[#1a1f2e]/70">
                  {MILESTONE_UPDATES.slice(0, 1).map((update, i) => (
                    <div key={i} className="p-4 hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#14f195] to-[#00d4aa] flex items-center justify-center text-[#0a0a0f] font-bold text-[11px] flex-shrink-0 shadow-lg shadow-[#14f195]/20">
                          {update.author.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1 gap-2">
                            <span className="text-[14px] font-semibold text-white truncate">{update.project}</span>
                            <span className="text-[11px] text-zinc-600 flex-shrink-0">{update.time}</span>
                          </div>
                          <p className="text-[12px] text-zinc-500 mb-2">@{update.author}</p>
                          <div className="p-3 bg-gradient-to-br from-[#14f195]/10 to-[#14f195]/5 border border-[#14f195]/15 rounded-lg">
                            <p className="text-[13px] font-semibold text-[#14f195] mb-1">{update.milestone}</p>
                            <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">{update.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Desktop version */}
                <div className="hidden sm:block divide-y divide-[#1a1f2e]/70">
                  {MILESTONE_UPDATES.map((update, i) => (
                    <div key={i} className="p-6 hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#14f195] to-[#00d4aa] flex items-center justify-center text-[#0a0a0f] font-bold text-[13px] flex-shrink-0 shadow-lg shadow-[#14f195]/20">
                          {update.author.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1 gap-2">
                            <span className="text-[15px] font-semibold text-white truncate">{update.project}</span>
                            <span className="text-[12px] text-zinc-600 flex-shrink-0">{update.time}</span>
                          </div>
                          <p className="text-[13px] text-zinc-500 mb-3">@{update.author}</p>
                          <div className="p-4 bg-gradient-to-br from-[#14f195]/10 to-[#14f195]/5 border border-[#14f195]/15 rounded-xl">
                            <p className="text-[15px] font-semibold text-[#14f195] mb-1.5">{update.milestone}</p>
                            <p className="text-[13px] text-zinc-400 leading-relaxed">{update.description}</p>
                          </div>
                          {update.hasMedia && (
                            <p className="mt-3 text-[12px] text-zinc-500">Includes 3 images</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-[#1a1f2e] bg-zinc-900/20">
                  <p className="text-[12px] sm:text-[13px] text-zinc-500 text-center">
                    Updates appear as Blinks in your Twitter feed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 border-t border-[#1a1f2e] relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#14f195]/[0.02] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
          <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 text-center scroll-reveal-subtle">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#14f195] to-[#9945ff] flex items-center justify-center text-[#0a0a0f] font-bold text-[14px] shadow-lg shadow-[#14f195]/20">
                S
              </div>
              <span className="text-[16px] font-semibold text-zinc-200 tracking-[-0.01em]">ScholrLink</span>
            </div>
            <div className="flex items-center gap-8 text-[14px] text-zinc-500">
              <a href="#" className="hover:text-[#14f195] transition-colors duration-300">Twitter</a>
              <a href="#" className="hover:text-[#14f195] transition-colors duration-300">GitHub</a>
              <a href="#" className="hover:text-[#14f195] transition-colors duration-300">Docs</a>
            </div>
            <p className="text-[13px] text-zinc-600">
              Built on Solana
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
