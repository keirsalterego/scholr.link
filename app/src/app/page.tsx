import Link from "next/link";
import { CampaignCard } from "@/components/CampaignCard";
import { BlinkPreview } from "@/components/BlinkPreview";

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
        <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-[#14f195]/[0.08] rounded-full blur-[150px] animate-pulse-subtle" />
        <div className="absolute top-40 right-1/4 w-[600px] h-[600px] bg-[#9945ff]/[0.06] rounded-full blur-[130px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#14f195]/20 to-transparent" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,241,149,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,241,149,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]" />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-28 lg:pt-28 lg:pb-36">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="max-w-xl lg:max-w-lg animate-fade-in">
              {/* Headline */}
              <h1 className="text-[42px] sm:text-[52px] lg:text-[60px] font-bold tracking-[-0.03em] leading-[1.08] mb-7">
                <span className="text-white">Fund research,</span>
                <br />
                <span className="text-gradient">directly from Twitter.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-[17px] text-zinc-400 leading-[1.7] mb-10 max-w-md animate-slide-up-delayed">
                ScholrLink transforms social posts into instant funding portals. 
                No forms, no friction—just tap, sign, and support the next breakthrough.
              </p>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-4 animate-slide-up-delayed-2">
                <Link
                  href="/dashboard"
                  className="glass-button-primary px-7 py-3.5 text-[15px] font-semibold rounded-xl transition-all duration-300"
                >
                  Start a Campaign
                </Link>
                <Link
                  href="/explore"
                  className="glass-button-secondary px-7 py-3.5 text-[15px] rounded-xl transition-all duration-300"
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
      <section className="py-10 border-y border-[#1a1f2e]/50 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#14f195]/[0.02] to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-600 font-medium">Powered by</span>
            <div className="flex items-center gap-10">
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
      <section className="py-24 lg:py-32 section-bg-mesh relative">
        {/* Background glows */}
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-[#14f195]/[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-[#9945ff]/[0.03] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-[32px] sm:text-[38px] font-bold tracking-[-0.02em] text-white mb-5">
              How it works
            </h2>
            <p className="text-zinc-400 max-w-lg mx-auto text-[16px] leading-relaxed">
              Three simple steps to start funding your project through social media.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 scroll-reveal-stagger">
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
                className="glass-card p-7 rounded-2xl hover-lift group relative overflow-hidden"
              >
                {/* Card glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#14f195]/5 to-[#9945ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#14f195]/20 to-[#9945ff]/20 border border-[#14f195]/25 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-[14px] font-bold text-[#14f195]">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="text-[17px] font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-[15px] text-zinc-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-24 lg:py-32 section-bg-gradient relative overflow-hidden">
        {/* Enhanced background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#14f195]/5 via-[#9945ff]/3 to-transparent rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#9945ff]/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-[#14f195]/[0.03] rounded-full blur-[100px] pointer-events-none" />
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,241,149,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,241,149,0.02)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 scroll-reveal">
            <div>
              <h2 className="text-[32px] sm:text-[38px] font-bold tracking-[-0.02em] text-white mb-4">
                Active campaigns
              </h2>
              <p className="text-zinc-400 text-[16px] leading-relaxed">Fund the next generation of student innovation</p>
            </div>
            <Link
              href="/explore"
              className="glass-button-secondary px-6 py-3 text-[14px] font-medium rounded-xl transition-all duration-300 whitespace-nowrap"
            >
              View all projects
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 scroll-reveal-stagger">
            {FEATURED_CAMPAIGNS.map((campaign) => (
              <CampaignCard key={campaign.slug} {...campaign} />
            ))}
          </div>
        </div>
      </section>

      {/* Patron Badge Section */}
      <section className="py-24 lg:py-32 section-bg-glow relative overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0f15] to-[#0a0a0f]" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#14f195]/6 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[450px] h-[450px] bg-[#9945ff]/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#14f195]/15 to-transparent" />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(20,241,149,0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(153,69,255,0.03)_0%,transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left content */}
            <div className="scroll-reveal-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-[11px] font-medium tracking-wide text-[#14f195] bg-[#14f195]/10 border border-[#14f195]/25 rounded-full">
                <span className="w-1.5 h-1.5 bg-[#14f195] rounded-full animate-pulse" />
                Token-2022 Powered
              </div>
              <h2 className="text-[32px] sm:text-[38px] font-bold tracking-[-0.02em] text-white mb-6 leading-[1.15]">
                Build your on-chain
                <span className="text-gradient"> reputation</span>
              </h2>
              <p className="text-[16px] text-zinc-400 leading-[1.7] mb-10">
                Every donation mints a Soulbound NFT to your wallet—permanent, 
                non-transferable proof that you believed in innovation before it happened.
              </p>
              
              {/* Feature grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {[
                  { title: "Soulbound", desc: "Non-transferable & permanent" },
                  { title: "Visible", desc: "Public on-chain portfolio" },
                  { title: "Rewards", desc: "Unlock future project perks" },
                  { title: "Community", desc: "Join patron-only groups" },
                ].map((item, i) => (
                  <div key={i} className="glass-card flex items-start gap-4 p-5 rounded-xl hover:border-[#14f195]/20 transition-colors group">
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#14f195] to-[#9945ff] mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                    <div>
                      <p className="text-[15px] font-medium text-zinc-200 mb-1">{item.title}</p>
                      <p className="text-[13px] text-zinc-500">{item.desc}</p>
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
            
            {/* Right - Badge showcase */}
            <div className="relative scroll-reveal-right">
              {/* Decorative ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full border border-[#14f195]/10 opacity-60 animate-pulse-subtle" />
                <div className="absolute w-64 h-64 rounded-full border border-[#9945ff]/10" />
              </div>
              
              {/* Main badge card */}
              <div className="relative max-w-sm mx-auto">
                <div className="glass-card rounded-2xl p-7 shadow-2xl gradient-border">
                  {/* Badge visual */}
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-[#14f195]/15 via-[#0f1117] to-[#9945ff]/15 border border-zinc-700/30 p-6 mb-6 relative overflow-hidden">
                    {/* Animated glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#14f195]/8 to-[#9945ff]/8 animate-pulse" />
                    
                    <div className="relative h-full flex flex-col items-center justify-center">
                      <div className="w-18 h-18 rounded-xl bg-gradient-to-br from-[#14f195] to-[#9945ff] flex items-center justify-center mb-4 shadow-lg shadow-[#14f195]/25 p-4">
                        <span className="text-2xl font-bold text-[#0a0a0f]">SB</span>
                      </div>
                      <span className="text-[10px] font-medium text-[#14f195] uppercase tracking-[0.15em] mb-2">Patron Badge</span>
                      <span className="text-xl font-semibold text-white tracking-tight">#0142</span>
                    </div>
                  </div>
                  
                  {/* Badge info */}
                  <div className="text-center mb-5">
                    <h4 className="font-semibold text-white text-[16px] mb-1.5 tracking-[-0.01em]">Climate ML Research</h4>
                    <p className="text-[13px] text-zinc-500">Supported by sarahchen.sol</p>
                  </div>
                  
                  {/* Badge metadata */}
                  {/* Badge metadata */}
                  <div className="flex items-center justify-between p-4 bg-zinc-800/40 rounded-xl">
                    <div className="text-center">
                      <p className="text-[10px] text-zinc-500 mb-1">Tier</p>
                      <p className="text-[14px] font-medium text-[#14f195]">Early Believer</p>
                    </div>
                    <div className="w-px h-10 bg-zinc-700/50" />
                    <div className="text-center">
                      <p className="text-[10px] text-zinc-500 mb-1">Amount</p>
                      <p className="text-[14px] font-medium text-white">25 USDC</p>
                    </div>
                    <div className="w-px h-10 bg-zinc-700/50" />
                    <div className="text-center">
                      <p className="text-[10px] text-zinc-500 mb-1">Date</p>
                      <p className="text-[14px] font-medium text-white">Nov 24</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating soulbound indicator */}
                <div className="absolute -top-3 -right-3 px-4 py-2 bg-gradient-to-r from-[#14f195] to-[#00d4aa] text-[#0a0a0f] text-[11px] font-bold rounded-full shadow-lg shadow-[#14f195]/30 animate-float-delayed">
                  SOULBOUND
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donor Leaderboard Section */}
      <section className="py-24 lg:py-32 section-bg-mesh relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#14f195]/[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#9945ff]/[0.03] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Leaderboard */}
            <div className="scroll-reveal-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-[11px] font-medium tracking-wide text-[#14f195] bg-[#14f195]/10 border border-[#14f195]/25 rounded-full">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Top Patrons
              </div>
              <h2 className="text-[32px] sm:text-[38px] font-bold tracking-[-0.02em] text-white mb-5 leading-[1.15]">
                Donor <span className="text-gradient">Leaderboard</span>
              </h2>
              <p className="text-[16px] text-zinc-400 leading-[1.7] mb-10">
                Compete for the top spot. The most generous patrons earn recognition, 
                exclusive badges, and bragging rights on-chain.
              </p>

              {/* Leaderboard Table */}
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1a1f2e] flex items-center justify-between">
                  <span className="text-[13px] font-medium text-zinc-400">This Month</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#14f195] rounded-full animate-pulse" />
                    <span className="text-[12px] text-zinc-500">Live</span>
                  </div>
                </div>
                <div className="divide-y divide-[#1a1f2e]">
                  {TOP_DONORS.map((donor, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors">
                      {/* Rank */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-bold ${
                        donor.rank === 1 ? "bg-gradient-to-br from-yellow-500 to-amber-500 text-[#0a0a0f]" :
                        donor.rank === 2 ? "bg-gradient-to-br from-zinc-400 to-zinc-300 text-[#0a0a0f]" :
                        donor.rank === 3 ? "bg-gradient-to-br from-amber-700 to-amber-500 text-white" :
                        "bg-zinc-800 text-zinc-400"
                      }`}>
                        {donor.rank}
                      </div>
                      
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#14f195] to-[#9945ff] flex items-center justify-center text-[#0a0a0f] font-bold text-[14px]">
                        {donor.avatar}
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-medium text-white truncate">{donor.address}</span>
                          <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                            donor.badge === "Platinum" ? "bg-cyan-500/20 text-cyan-400" :
                            donor.badge === "Gold" ? "bg-yellow-500/20 text-yellow-400" :
                            "bg-zinc-500/20 text-zinc-400"
                          }`}>
                            {donor.badge}
                          </span>
                        </div>
                        <span className="text-[12px] text-zinc-500">{donor.projects} projects supported</span>
                      </div>
                      
                      {/* Amount */}
                      <div className="text-right">
                        <span className="text-[16px] font-semibold text-[#14f195]">${donor.amount}</span>
                        <p className="text-[11px] text-zinc-500">USDC</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-[#1a1f2e]">
                  <Link href="/leaderboard" className="text-[13px] font-medium text-[#14f195] hover:text-[#2fff9f] transition-colors">
                    View full leaderboard →
                  </Link>
                </div>
              </div>
            </div>

            {/* Right - Patron Tiers */}
            <div className="scroll-reveal-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-[11px] font-medium tracking-wide text-[#9945ff] bg-[#9945ff]/10 border border-[#9945ff]/25 rounded-full">
                Soulbound Tiers
              </div>
              <h2 className="text-[32px] sm:text-[38px] font-bold tracking-[-0.02em] text-white mb-5 leading-[1.15]">
                Level up your <span className="text-gradient">reputation</span>
              </h2>
              <p className="text-[16px] text-zinc-400 leading-[1.7] mb-10">
                Earn non-transferable badges based on your lifetime contributions. 
                Higher tiers unlock exclusive perks and voting power.
              </p>

              {/* Tier Cards */}
              <div className="grid grid-cols-2 gap-4">
                {PATRON_TIERS.map((tier, i) => (
                  <div key={i} className="glass-card p-5 rounded-xl hover-lift group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4 shadow-lg`}>
                        <span className="text-[16px] font-bold text-white drop-shadow">{tier.name[0]}</span>
                      </div>
                      <h4 className="text-[15px] font-semibold text-white mb-1">{tier.name}</h4>
                      <p className="text-[12px] text-zinc-500 mb-3">${tier.minAmount}+ lifetime</p>
                      <div className="space-y-1.5">
                        {tier.perks.slice(0, 2).map((perk, j) => (
                          <div key={j} className="flex items-center gap-2 text-[11px] text-zinc-400">
                            <span className="w-1 h-1 rounded-full bg-[#14f195]" />
                            {perk}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Projects Section */}
      <section className="py-24 lg:py-32 section-bg-gradient relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#14f195]/4 to-transparent rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="text-center mb-14 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-[11px] font-medium tracking-wide text-orange-400 bg-orange-500/10 border border-orange-500/25 rounded-full">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              Trending Now
            </div>
            <h2 className="text-[32px] sm:text-[38px] font-bold tracking-[-0.02em] text-white mb-5">
              Projects going <span className="text-gradient">viral</span>
            </h2>
            <p className="text-zinc-400 max-w-lg mx-auto text-[16px] leading-relaxed">
              Discover the hottest student projects gaining traction right now. 
              Ranked by views, donations, and community engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 scroll-reveal-stagger">
            {TRENDING_PROJECTS.map((project, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-[#14f195]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  {/* Trend badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className={`px-2.5 py-1 text-[10px] font-medium rounded-full ${
                      project.category === "Research" ? "bg-indigo-500/20 text-indigo-400" :
                      project.category === "Engineering" ? "bg-sky-500/20 text-sky-400" :
                      "bg-emerald-500/20 text-emerald-400"
                    }`}>
                      {project.category}
                    </span>
                    <span className="px-2.5 py-1 text-[11px] font-bold text-orange-400 bg-orange-500/15 rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      {project.trend}
                    </span>
                  </div>

                  <h3 className="text-[17px] font-semibold text-white mb-4 group-hover:text-[#14f195] transition-colors">
                    {project.title}
                  </h3>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-zinc-800/30 rounded-xl">
                    <div className="text-center">
                      <p className="text-[11px] text-zinc-500 mb-1">Views</p>
                      <p className="text-[14px] font-semibold text-white">{(project.views / 1000).toFixed(1)}K</p>
                    </div>
                    <div className="text-center border-x border-zinc-700/50">
                      <p className="text-[11px] text-zinc-500 mb-1">Donors</p>
                      <p className="text-[14px] font-semibold text-white">{project.donations}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[11px] text-zinc-500 mb-1">Raised</p>
                      <p className="text-[14px] font-semibold text-[#14f195]">${project.raised}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 scroll-reveal">
            <Link href="/explore?sort=trending" className="glass-button-secondary inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium rounded-xl">
              Explore trending projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Milestone Updates Section */}
      <section className="py-24 lg:py-32 section-bg-glow relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0f15] to-[#0a0a0f]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#14f195]/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left - Content */}
            <div className="scroll-reveal-left">
              <div className="inline-flex items-center px-4 py-2 mb-6 text-[11px] font-medium tracking-wide text-[#14f195] bg-[#14f195]/10 border border-[#14f195]/25 rounded-full">
                Real-Time Updates
              </div>
              <h2 className="text-[32px] sm:text-[42px] font-bold tracking-[-0.02em] text-white mb-6 leading-[1.1]">
                Milestone updates,<br />
                <span className="text-gradient">delivered instantly</span>
              </h2>
              <p className="text-[16px] text-zinc-400 leading-[1.8] mb-10">
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
                  <div key={i} className="group flex items-start gap-5 py-4 border-b border-[#1a1f2e] last:border-b-0 hover:border-[#14f195]/20 transition-colors cursor-default">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-zinc-800/50 flex items-center justify-center text-[13px] font-semibold text-zinc-500 group-hover:bg-[#14f195]/10 group-hover:text-[#14f195] transition-all">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[15px] font-medium text-white mb-0.5 group-hover:text-[#14f195] transition-colors">{item.title}</h4>
                      <p className="text-[14px] text-zinc-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Mock Updates Feed */}
            <div className="scroll-reveal-right">
              <div className="glass-card rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                {/* Header */}
                <div className="px-6 py-5 border-b border-[#1a1f2e] flex items-center justify-between bg-zinc-900/30">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#14f195] to-[#9945ff] flex items-center justify-center text-[#0a0a0f] font-bold text-[13px]">
                      X
                    </div>
                    <div>
                      <span className="text-[15px] font-semibold text-white block">Project Updates</span>
                      <span className="text-[12px] text-zinc-500">via Solana Blinks</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-zinc-600 uppercase tracking-wider">Your Feed</span>
                </div>

                {/* Updates List */}
                <div className="divide-y divide-[#1a1f2e]/70">
                  {MILESTONE_UPDATES.map((update, i) => (
                    <div key={i} className="p-6 hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#14f195] to-[#00d4aa] flex items-center justify-center text-[#0a0a0f] font-bold text-[13px] flex-shrink-0 shadow-lg shadow-[#14f195]/20">
                          {update.author.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[15px] font-semibold text-white">{update.project}</span>
                            <span className="text-[12px] text-zinc-600">{update.time}</span>
                          </div>
                          <p className="text-[13px] text-zinc-500 mb-3">@{update.author}</p>
                          
                          {/* Milestone Card */}
                          <div className="p-4 bg-gradient-to-br from-[#14f195]/10 to-[#14f195]/5 border border-[#14f195]/15 rounded-xl">
                            <p className="text-[15px] font-semibold text-[#14f195] mb-1.5">{update.milestone}</p>
                            <p className="text-[13px] text-zinc-400 leading-relaxed">{update.description}</p>
                          </div>

                          {update.hasMedia && (
                            <p className="mt-3 text-[12px] text-zinc-500">
                              Includes 3 images
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-[#1a1f2e] bg-zinc-900/20">
                  <p className="text-[13px] text-zinc-500 text-center">
                    Updates appear as Blinks in your Twitter feed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#1a1f2e] relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#14f195]/[0.02] to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
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
