"use client";

import { BlinkAction } from "@/components/BlinkAction";

interface CampaignClientProps {
  blinkUrl: string;
  dialUrl: string;
}

export function CampaignClient({ blinkUrl, dialUrl }: CampaignClientProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(blinkUrl);
  };

  return (
    <div className="space-y-4">
      {/* Official Blink Donation Widget */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#14f195]" />
            <span className="text-xs font-medium text-zinc-400">Direct Donation</span>
          </div>
          <span className="text-[10px] text-zinc-600 uppercase tracking-wider">Powered by Dialect</span>
        </div>
        <div className="p-4">
          <BlinkAction actionUrl={blinkUrl} />
        </div>
      </div>
    </div>
  );
}
