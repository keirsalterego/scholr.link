"use client";

import { memo } from "react";
import Link from "next/link";

interface CampaignCardProps {
  slug: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  creator: string;
  image?: string;
  category?: string;
}

// Category color mapping
const categoryColors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  Engineering: { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20", gradient: "from-sky-500/12 to-cyan-500/12" },
  Research: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20", gradient: "from-indigo-500/12 to-violet-500/12" },
  Hardware: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", gradient: "from-amber-500/12 to-orange-500/12" },
  Design: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20", gradient: "from-rose-500/12 to-pink-500/12" },
  Science: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", gradient: "from-emerald-500/12 to-teal-500/12" },
};

// Category abbreviations for visual element
const categoryAbbrev: Record<string, string> = {
  Engineering: "EN",
  Research: "RS",
  Hardware: "HW",
  Design: "DS",
  Science: "SC",
};

export function CampaignCard({
  slug,
  title,
  description,
  goal,
  raised,
  creator,
  category = "Research",
}: CampaignCardProps) {
  const percentRaised = Math.round((raised / goal) * 100);
  const truncatedCreator = `${creator.slice(0, 4)}...${creator.slice(-4)}`;
  const colors = categoryColors[category] || categoryColors.Research;
  const abbrev = categoryAbbrev[category] || "RS";

  return (
    <Link href={`/campaign/${slug}`} className="group block">
      <article className="relative h-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-xl shadow-black/20 backdrop-blur-xl transition-transform duration-300 hover:scale-[1.025] hover:shadow-2xl">
        {/* Premium badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-[#14f195]/80 to-[#9945ff]/80 text-white rounded-full shadow-md shadow-[#14f195]/10 border border-white/20">Premium</span>
        </div>

        {/* Image/Thumbnail */}
        <div className="relative h-28 sm:h-32 md:h-36 bg-gradient-to-br from-[#111113] via-[#141416] to-[#111113] overflow-hidden">
          {/* Animated background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} group-hover:opacity-100 opacity-60 transition-all duration-500`} />
          {/* Glass grid overlay */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:16px_16px]" />
          </div>
          {/* Center abbreviation, more premium look */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-14 h-14 rounded-xl ${colors.bg} border-2 ${colors.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/10`}>
              <span className={`text-[18px] font-bold ${colors.text}`}>{abbrev}</span>
            </div>
          </div>
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 text-[11px] font-semibold ${colors.bg} ${colors.text} border ${colors.border} rounded-full backdrop-blur-sm shadow-sm`}>{category}</span>
          </div>
          {/* Progress percentage badge */}
          <div className="absolute bottom-3 right-3">
            <span className="px-2.5 py-1 text-[11px] font-bold bg-[#0a0a0b]/90 backdrop-blur-sm border border-zinc-700/40 rounded-full text-white shadow-sm">{percentRaised}%</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 pb-4">
          <h3 className="text-[15px] font-bold text-white mb-1 line-clamp-1 group-hover:text-[#14f195] transition-colors tracking-[-0.01em]">{title}</h3>
          <p className="text-[13.5px] text-zinc-400 mb-4 line-clamp-2 leading-relaxed">{description}</p>

          {/* Progress */}
          <div className="mb-4">
            <div className="h-1.5 bg-zinc-800/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#14f195] via-[#00d4aa] to-[#9945ff] rounded-full shadow-md shadow-[#14f195]/10 transition-all duration-500"
                style={{ width: `${Math.min(percentRaised, 100)}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 sm:mt-2.5">
              <div className="flex items-baseline gap-1">
                <span className="text-[15px] font-bold text-white tracking-tight">{raised} SOL</span>
                <span className="text-[12px] text-zinc-500">raised</span>
              </div>
              <span className="text-[12px] text-zinc-500">of {goal} SOL</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#14f195] to-[#9945ff] flex items-center justify-center shadow-md shadow-[#14f195]/10">
                <span className="text-[10px] font-bold text-[#0a0a0f]">{creator.slice(0, 2).toUpperCase()}</span>
              </div>
              <span className="text-[12px] text-zinc-400 font-mono">{truncatedCreator}</span>
            </div>
            <span className="text-[12px] font-bold text-[#14f195] group-hover:text-[#2fff9f] transition-colors cursor-pointer">Support</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// Memoize to prevent unnecessary re-renders
export const MemoizedCampaignCard = memo(CampaignCard);
