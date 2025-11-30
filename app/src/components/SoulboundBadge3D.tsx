"use client";

import { CometCard } from "@/components/ui/comet-card";

export function SoulboundBadge3D() {
  return (
    <div className="relative scroll-reveal-right">
      {/* Decorative rings with premium gold accent - hidden on mobile */}
      <div className="absolute inset-0 hidden sm:flex items-center justify-center pointer-events-none">
        <div className="w-[280px] sm:w-[350px] lg:w-[420px] h-[280px] sm:h-[350px] lg:h-[420px] rounded-full border border-[#14f195]/10 opacity-30 animate-spin-slow" />
        <div className="absolute w-[220px] sm:w-[280px] lg:w-[340px] h-[220px] sm:h-[280px] lg:h-[340px] rounded-full border border-amber-400/10 animate-reverse-spin-slow" />
        <div className="absolute w-[160px] sm:w-[210px] lg:w-[260px] h-[160px] sm:h-[210px] lg:h-[260px] rounded-full border border-[#9945ff]/10 animate-spin-slow" style={{ animationDuration: '60s' }} />
        {/* Orbiting particles */}
        <div className="absolute w-2 h-2 rounded-full bg-[#14f195]/60 blur-[2px] animate-orbit" style={{ animationDelay: '0s' }} />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-400/50 blur-[1px] animate-orbit" style={{ animationDelay: '-4s' }} />
        <div className="absolute w-2 h-2 rounded-full bg-[#9945ff]/50 blur-[2px] animate-orbit" style={{ animationDelay: '-8s' }} />
      </div>
      
      {/* 3D Tilted Badge Card with CometCard */}
      <div className="relative max-w-sm mx-auto">
        <CometCard rotateIntensity={14} scaleOnHover={1.04}>
          <div className="relative group">
            {/* Premium holographic foil effect */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-10">
              <div className="absolute inset-0 bg-[conic-gradient(from_var(--shimmer-angle,0deg)_at_50%_50%,transparent,rgba(20,241,149,0.15),rgba(255,215,0,0.1),rgba(153,69,255,0.15),transparent)] animate-shimmer-rotate opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.03]" />
            </div>
            
            {/* Animated border glow - premium gold + teal */}
            <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-[#14f195]/50 via-amber-400/30 to-[#9945ff]/50 blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#14f195]/40 via-amber-300/20 to-[#9945ff]/40" />
            
            <div 
              className="relative rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl overflow-hidden border border-white/[0.12]"
              style={{ 
                background: 'linear-gradient(135deg, rgba(15, 17, 23, 0.95) 0%, rgba(20, 22, 30, 0.98) 50%, rgba(15, 17, 23, 0.95) 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 60px rgba(20, 241, 149, 0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              {/* Premium inner highlight */}
              <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent pointer-events-none rounded-t-3xl" />
              
              {/* Noise texture for premium feel */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
              
              {/* Badge visual - enhanced premium design */}
              <div className="aspect-square rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#14f195]/10 via-[#0a0c10] to-[#9945ff]/10 border border-white/[0.08] p-3 sm:p-5 md:p-6 mb-4 sm:mb-7 relative overflow-hidden">
                {/* Luxury ambient glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(20,241,149,0.2),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(153,69,255,0.15),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.08),transparent_40%)]" />
                
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50" />
                
                <div className="relative h-full flex flex-col items-center justify-center">
                  {/* Premium 3D emblem */}
                  <div 
                    className="w-[72px] h-[72px] sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl relative mb-4 sm:mb-5 group/emblem"
                    style={{ 
                      transform: 'translateZ(50px)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Emblem glow */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-[#14f195]/40 via-amber-400/20 to-[#9945ff]/40 rounded-3xl blur-xl opacity-70 animate-pulse-subtle" />
                    
                    {/* Main emblem body */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#14f195] via-[#00d4aa] to-[#9945ff] shadow-2xl" 
                      style={{ boxShadow: '0 20px 40px rgba(20, 241, 149, 0.4), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.2)' }} 
                    />
                    
                    {/* Metallic sheen overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-transparent to-black/20" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/10 to-white/30" />
                    
                    {/* Diamond/gem accent */}
                    <div className="absolute top-1 right-1 w-3 h-3 bg-gradient-to-br from-white via-amber-200 to-amber-400 rounded-full shadow-lg" style={{ boxShadow: '0 0 10px rgba(255,215,0,0.8)' }} />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-black text-[#0a0a0f] drop-shadow-sm" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.3)' }}>SB</span>
                    </div>
                  </div>
                  
                  {/* Premium badge text */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                    <div className="w-5 sm:w-8 h-px bg-gradient-to-r from-transparent via-[#14f195]/50 to-transparent" />
                    <span className="text-[8px] sm:text-[10px] font-semibold text-[#14f195] uppercase tracking-[0.15em] sm:tracking-[0.2em]">Patron Badge</span>
                    <div className="w-5 sm:w-8 h-px bg-gradient-to-r from-transparent via-[#14f195]/50 to-transparent" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">#0142</span>
                </div>
              </div>
              
              {/* Badge info with premium styling */}
              <div className="text-center mb-4 sm:mb-6 relative">
                <h4 className="font-semibold text-white text-[15px] sm:text-[17px] mb-1 sm:mb-1.5 tracking-[-0.01em]">Climate ML Research</h4>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#14f195] animate-pulse" />
                  <p className="text-[12px] sm:text-[13px] text-zinc-400">Supported by <span className="text-zinc-300">sarahchen.sol</span></p>
                </div>
              </div>
              
              {/* Premium metadata section */}
              <div className="relative p-3 sm:p-5 rounded-xl sm:rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)' }}>
                {/* Glass effect */}
                <div className="absolute inset-0 border border-white/[0.06] rounded-xl sm:rounded-2xl" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <div className="flex items-center justify-between relative">
                  <div className="text-center flex-1">
                    <p className="text-[9px] sm:text-[10px] text-zinc-500 mb-1 sm:mb-1.5 uppercase tracking-wider">Tier</p>
                    <p className="text-[12px] sm:text-[14px] font-semibold bg-gradient-to-r from-[#14f195] to-[#00d4aa] bg-clip-text text-transparent">Early Believer</p>
                  </div>
                  <div className="w-px h-10 sm:h-12 bg-gradient-to-b from-transparent via-zinc-600/50 to-transparent" />
                  <div className="text-center flex-1">
                    <p className="text-[9px] sm:text-[10px] text-zinc-500 mb-1 sm:mb-1.5 uppercase tracking-wider">Amount</p>
                    <p className="text-[12px] sm:text-[14px] font-semibold text-white">25 <span className="text-zinc-400">USDC</span></p>
                  </div>
                  <div className="w-px h-10 sm:h-12 bg-gradient-to-b from-transparent via-zinc-600/50 to-transparent" />
                  <div className="text-center flex-1">
                    <p className="text-[9px] sm:text-[10px] text-zinc-500 mb-1 sm:mb-1.5 uppercase tracking-wider">Date</p>
                    <p className="text-[12px] sm:text-[14px] font-semibold text-white">Nov 24</p>
                  </div>
                </div>
              </div>
              
              {/* Verified authenticity seal */}
              <div className="mt-3 sm:mt-5 flex items-center justify-center gap-2 text-[10px] sm:text-[11px] text-zinc-500">
                <svg className="w-3.5 h-3.5 text-[#14f195]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Verified on Solana</span>
              </div>
            </div>
          </div>
        </CometCard>
        
        {/* Premium floating soulbound indicator */}
        <div 
          className="absolute -top-3 sm:-top-5 -right-1 sm:-right-3 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full shadow-2xl animate-float-delayed z-20"
          style={{
            background: 'linear-gradient(135deg, #14f195 0%, #00d4aa 50%, #0ea5e9 100%)',
            boxShadow: '0 10px 40px rgba(20, 241, 149, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)'
          }}
        >
          <span className="text-[11px] font-bold text-[#0a0a0f] tracking-wide">✦ SOULBOUND</span>
        </div>
        
        {/* Enhanced reflection effect - hidden on mobile */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full h-24 hidden sm:block">
          <div className="w-4/5 mx-auto h-full bg-gradient-to-b from-[#14f195]/15 via-[#9945ff]/10 to-transparent blur-3xl opacity-50 animate-pulse-subtle" />
        </div>
      </div>
    </div>
  );
}
