"use client";

import { useState, useRef } from "react";

export function BlinkPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const amounts = [5, 10, 25, 50];

  return (
    <div
      ref={containerRef}
      className="hidden lg:block relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Dynamic gradient background */}
      <div
        className="absolute -inset-8 rounded-3xl blur-3xl transition-all duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(20, 241, 149, ${isHovering ? 0.08 : 0.04}) 0%, rgba(153, 69, 255, ${isHovering ? 0.05 : 0.02}) 40%, transparent 70%)`,
          transform: isHovering ? 'scale(1.02)' : 'scale(1)',
        }}
      />

      {/* Main X Post */}
      <div className="relative animate-float">
        <div
          className="bg-black rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 w-[400px] border border-[#2f3336]"
          style={{
            boxShadow: isHovering
              ? '0 32px 64px -16px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)'
              : '0 24px 48px -12px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Post Header */}
          <div className="p-4">
            <div className="flex gap-3">
              {/* Avatar with online indicator */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#14f195] via-[#00d4aa] to-[#9945ff]" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#00ba7c] rounded-full border-2 border-black" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="font-bold text-[15px] text-white hover:underline cursor-pointer">Sarah Chen</span>
                    <svg className="w-[18px] h-[18px] text-[#1d9bf0] flex-shrink-0" viewBox="0 0 22 22" fill="currentColor">
                      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
                    </svg>
                    <span className="text-[15px] text-[#71767b]">@sarahchen</span>
                    <span className="text-[#71767b]">·</span>
                    <span className="text-[15px] text-[#71767b] hover:underline cursor-pointer">2h</span>
                  </div>
                  {/* More button */}
                  <button className="p-1.5 -mr-1.5 rounded-full hover:bg-[#1d9bf0]/10 text-[#71767b] hover:text-[#1d9bf0] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="5" cy="12" r="2"/>
                      <circle cx="12" cy="12" r="2"/>
                      <circle cx="19" cy="12" r="2"/>
                    </svg>
                  </button>
                </div>
                
                {/* Tweet content */}
                <p className="mt-1 text-[15px] text-white leading-[20px]">
                  Excited to share my climate prediction research! 🌍🔬 Building ML models to forecast local weather patterns. Support my work through <span className="text-[#1d9bf0] hover:underline cursor-pointer">@ScholrLink</span>
                </p>
              </div>
            </div>
          </div>

          {/* Blink Action Card */}
          <div className="mx-4 mb-3">
            <div className="border border-[#2f3336] rounded-2xl overflow-hidden hover:bg-[#080808] transition-colors">
              {/* Blink Banner */}
              <div className="relative h-[120px] bg-gradient-to-br from-[#14f195]/10 via-[#0a0a0b] to-[#9945ff]/10 overflow-hidden">
                {/* Animated gradient orbs */}
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#14f195]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-[#9945ff]/10 rounded-full blur-3xl" />
                
                {/* Content */}
                <div className="relative h-full flex items-center justify-between px-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#14f195] to-[#9945ff] flex items-center justify-center">
                        <span className="text-xs font-semibold text-[#0a0a0f]">SC</span>
                      </div>
                      <span className="text-[10px] font-medium text-white/50 uppercase tracking-[0.1em]">Research Fund</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white tracking-[-0.01em]">Climate ML Research</h3>
                    <p className="text-sm text-white/40">by Sarah Chen</p>
                  </div>
                  
                  {/* Progress circle */}
                  <div className="text-center">
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#1f1f23" strokeWidth="3"/>
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="url(#progress-gradient)" strokeWidth="3" strokeLinecap="round" strokeDasharray="97.4" strokeDashoffset="73"/>
                        <defs>
                          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#14f195"/>
                            <stop offset="100%" stopColor="#9945ff"/>
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">25%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Blink Body */}
              <div className="bg-black p-4">
                {/* Stats row */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-semibold text-white tracking-tight">125</span>
                      <span className="text-sm text-[#71767b]">USDC</span>
                    </div>
                    <p className="text-xs text-[#71767b]">of 500 USDC goal</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">12</p>
                    <p className="text-xs text-[#71767b]">supporters</p>
                  </div>
                </div>
                
                {/* Amount selection */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {amounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                        selectedAmount === amount
                          ? 'bg-white text-black scale-[1.02]'
                          : 'bg-[#1f1f23] text-white hover:bg-[#2a2a2f]'
                      }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
                
                {/* Donate button */}
                <button className="glass-button-primary w-full py-3.5 text-white font-semibold rounded-xl transition-all duration-300">
                  <span>Donate {selectedAmount || '...'} USDC</span>
                </button>
                
                {/* Footer */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#2f3336]">
                  <span className="text-xs text-[#71767b]">Secured by Solana</span>
                  <span className="text-xs text-[#71767b]">scholr.link</span>
                </div>
              </div>
            </div>
          </div>

          {/* Post Actions */}
          <div className="px-2 pb-2 flex items-center justify-around text-[#71767b] border-t border-[#2f3336] pt-1">
            <button className="flex items-center gap-1.5 py-2 px-3 hover:text-[#1d9bf0] transition-colors group rounded-full hover:bg-[#1d9bf0]/10">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
              </svg>
              <span className="text-[13px]">24</span>
            </button>
            <button className="flex items-center gap-1.5 py-2 px-3 hover:text-[#00ba7c] transition-colors group rounded-full hover:bg-[#00ba7c]/10">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
              </svg>
              <span className="text-[13px]">89</span>
            </button>
            <button className="flex items-center gap-1.5 py-2 px-3 hover:text-[#f91880] transition-colors group rounded-full hover:bg-[#f91880]/10">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              <span className="text-[13px]">1.2K</span>
            </button>
            <button className="flex items-center gap-1.5 py-2 px-3 hover:text-[#1d9bf0] transition-colors group rounded-full hover:bg-[#1d9bf0]/10">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
              </svg>
            </button>
            <button className="flex items-center gap-1.5 py-2 px-3 hover:text-[#1d9bf0] transition-colors group rounded-full hover:bg-[#1d9bf0]/10">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Soulbound Badge - Simplified */}
      <div className="absolute -top-4 -right-8 animate-float-delayed">
        <div className="glass-card rounded-xl p-3.5 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#14f195] to-[#00d4aa] flex items-center justify-center">
              <span className="text-sm font-semibold text-[#0a0a0f]">SB</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-white tracking-[-0.01em]">Patron #142</span>
                <span className="px-1.5 py-0.5 text-[8px] font-semibold text-[#14f195] bg-[#14f195]/10 rounded">SBT</span>
              </div>
              <p className="text-[11px] text-zinc-500">Soulbound · Non-transferable</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Transaction - Simplified */}
      <div className="absolute -bottom-2 -left-6 animate-float" style={{ animationDelay: '2s' }}>
        <div className="glass-card rounded-xl p-3.5 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#14f195] to-[#9945ff] flex items-center justify-center">
              <span className="text-xs font-semibold text-[#0a0a0f]">+5</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white tracking-[-0.01em]">+5 USDC</p>
              <p className="text-[11px] text-zinc-500">Confirmed · Just now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
