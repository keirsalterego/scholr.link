"use client";

import { useState, useRef } from "react";

export function BlinkPreview() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1);
  const [customAmount, setCustomAmount] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const presetAmounts = [0.25, 1, 2.5, 5];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <>
      {/* Mobile Blink Preview */}
      <div className="lg:hidden relative max-w-sm mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 bg-[#0a0a0f]">
          {/* Beautiful Blink Card */}
          <div className="relative">
            {/* Header Image/Banner */}
            <div className="relative h-32 bg-linear-to-br from-[#14f195]/20 via-[#0a0a0f] to-[#9945ff]/20 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(20,241,149,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(20,241,149,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
              <div className="absolute top-4 left-4">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#14f195] to-[#9945ff] flex items-center justify-center shadow-lg shadow-[#14f195]/20">
                  <span className="text-lg font-bold text-[#0a0a0f]">🔬</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 bg-[#0a0a0f]">
              <h3 className="text-lg font-bold text-white mb-1">Climate ML Research</h3>
              <p className="text-sm text-zinc-400 mb-4">Support Sarah's climate prediction models</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <span className="text-2xl font-bold text-white">6.25</span>
                    <span className="text-sm text-zinc-500 ml-1">SOL</span>
                  </div>
                  <span className="text-sm text-zinc-500">of 25 SOL</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full w-[25%] bg-linear-to-r from-[#14f195] to-[#9945ff] rounded-full" />
                </div>
              </div>

              {/* Amount Selection */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                    className={`py-2 text-sm font-medium rounded-lg transition-all ${
                      selectedAmount === amount
                        ? 'bg-white text-black'
                        : 'bg-zinc-800 text-white hover:bg-zinc-700'
                    }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>

              {/* Donate Button */}
              <button className="w-full py-3 bg-linear-to-r from-[#14f195] to-[#00d4aa] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#14f195]/25 transition-all">
                Donate {selectedAmount || '...'} SOL
              </button>

              {/* Footer */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800">
                <span className="text-xs text-zinc-600">Secured by Solana</span>
                <span className="text-xs text-zinc-600">scholr.link</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Blink Preview with Twitter Post Context */}
      <div className="hidden lg:block relative">
        {/* Animated gradient background */}
        <div className="absolute -inset-8 rounded-3xl blur-3xl bg-linear-to-br from-[#14f195]/5 via-[#9945ff]/3 to-transparent animate-pulse-subtle" />

        {/* Twitter Post Wrapper */}
        <div className="relative animate-float">
          <div className="bg-[#0a0a0f] rounded-2xl overflow-hidden shadow-2xl w-[420px] border border-zinc-800 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] transition-all duration-300">
            {/* Post Header */}
            <div className="p-4">
              <div className="flex gap-3">
                {/* Avatar with online indicator */}
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#14f195] via-[#00d4aa] to-[#9945ff]" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#00ba7c] rounded-full border-2 border-black" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="font-bold text-[15px] text-white hover:underline cursor-pointer">Sarah Chen</span>
                      <svg className="w-[18px] h-[18px] text-[#1d9bf0] shrink-0" viewBox="0 0 22 22" fill="currentColor">
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
                  <p className="mt-1 text-[15px] text-white leading-5">
                    Excited to share my climate prediction research! 🌍🔬 Building ML models to forecast local weather patterns. Support my work through <span className="text-[#1d9bf0] hover:underline cursor-pointer">@ScholrLink</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Beautiful Blink Card */}
            <div className="mx-4 mb-3">
              <div 
                ref={cardRef}
                onMouseMove={handleMouseMove}
                className="relative border border-zinc-800 rounded-2xl overflow-hidden bg-[#0a0a0f] hover:border-[#14f195]/30 transition-colors group"
              >
                {/* Dynamic spotlight effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(20, 241, 149, 0.08), transparent 40%)`
                  }}
                />
                
                {/* Card glow effect */}
                <div 
                  className="absolute -inset-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(400px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(20, 241, 149, 0.15), transparent 60%)`
                  }}
                />
                {/* Header Banner with Gradient */}
                <div className="relative h-28 bg-linear-to-br from-[#14f195]/20 via-[#0a0a0f] to-[#9945ff]/20 overflow-hidden z-10">
                  {/* Grid Pattern Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(20,241,149,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(20,241,149,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30" />
                  
                  {/* Animated Gradient Orbs */}
                  <div className="absolute top-0 left-1/4 w-24 h-24 bg-[#14f195]/20 rounded-full blur-2xl animate-pulse-subtle" />
                  <div className="absolute bottom-0 right-1/4 w-20 h-20 bg-[#9945ff]/20 rounded-full blur-2xl" style={{ animationDelay: '1s' }} />
                  
                  {/* Content */}
                  <div className="relative h-full flex items-center justify-between px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#14f195] to-[#9945ff] flex items-center justify-center shadow-xl shadow-[#14f195]/30">
                        <span className="text-xl">🔬</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Research Fund</span>
                        </div>
                        <h3 className="text-base font-bold text-white tracking-tight">Climate ML Research</h3>
                        <p className="text-xs text-zinc-400">by Sarah Chen</p>
                      </div>
                    </div>
                    
                    {/* Progress Circle */}
                    <div className="text-center">
                      <div className="relative w-14 h-14">
                        <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5"/>
                          <circle 
                            cx="18" cy="18" r="15.5" 
                            fill="none" 
                            stroke="url(#blinkGradient)" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeDasharray="97.4" 
                            strokeDashoffset="73"
                            className="transition-all duration-500"
                          />
                          <defs>
                            <linearGradient id="blinkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#14f195"/>
                              <stop offset="100%" stopColor="#9945ff"/>
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">25%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Card Body */}
                <div className="relative p-4 bg-[#0a0a0f] z-10">
                  {/* Stats Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-bold text-white tracking-tight">6.25</span>
                        <span className="text-sm text-zinc-500">SOL</span>
                      </div>
                      <p className="text-xs text-zinc-600">of 25 SOL goal</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">12</p>
                      <p className="text-xs text-zinc-600">supporters</p>
                    </div>
                  </div>
                  
                  {/* Amount Selection Buttons */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {presetAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                        className={`py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                          selectedAmount === amount
                            ? 'bg-white text-black scale-[1.02] shadow-lg'
                            : 'bg-zinc-800 text-white hover:bg-zinc-700'
                        }`}
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                  
                  {/* Custom Amount Input */}
                  <div className="mb-3">
                    <input
                      type="number"
                      placeholder="Or enter custom amount..."
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                      className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-[#14f195]/50 focus:bg-zinc-800 transition-colors"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  
                  {/* Donate Button */}
                  <button className="w-full py-3.5 bg-linear-to-r from-[#14f195] to-[#00d4aa] text-black text-sm font-bold rounded-xl hover:shadow-xl hover:shadow-[#14f195]/30 transition-all duration-300 hover:scale-[1.02] active:scale-100">
                    <span>Donate {customAmount || selectedAmount || '...'} SOL</span>
                  </button>
                  
                  {/* Footer Info */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800/50">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded bg-linear-to-br from-[#14f195] to-[#9945ff]" />
                      <span className="text-xs text-zinc-500">Secured by Solana</span>
                    </div>
                    <span className="text-xs text-zinc-500 font-medium">scholr.link</span>
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

        {/* Floating Soulbound Badge */}
        <div className="absolute -top-4 -right-8 animate-float-delayed">
          <div className="glass-card rounded-xl p-3.5 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#14f195] to-[#00d4aa] flex items-center justify-center">
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

        {/* Floating Transaction */}
        <div className="absolute -bottom-2 -left-6 animate-float" style={{ animationDelay: '2s' }}>
          <div className="glass-card rounded-xl p-3.5 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-linear-to-br from-[#14f195] to-[#9945ff] flex items-center justify-center">
                <span className="text-xs font-semibold text-[#0a0a0f]">+</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white tracking-[-0.01em]">+0.25 SOL</p>
                <p className="text-[11px] text-zinc-500">Confirmed · Just now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
