"use client";

import "@dialectlabs/blinks/index.css";
import { Blink, useBlink } from "@dialectlabs/blinks";
import { useBlinkSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import { useConnection } from "@solana/wallet-adapter-react";
import { useMemo } from "react";

interface BlinkActionProps {
  actionUrl: string;
  className?: string;
}

export function BlinkAction({ actionUrl, className }: BlinkActionProps) {
  const { connection } = useConnection();
  
  // Check if running on localhost (only runs on client)
  const isLocalhost = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  }, []);
  
  // Initialize wallet adapter for Blinks
  const { adapter } = useBlinkSolanaWalletAdapter(connection);
  
  // Fetch the blink data from your API
  const { blink, isLoading } = useBlink({ url: actionUrl });

  // Show development notice for localhost
  if (isLocalhost) {
    return (
      <div className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-6 ${className}`}>
        <div className="text-center py-4">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-yellow-500/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-zinc-300 text-sm font-medium mb-1">Development Mode</p>
          <p className="text-zinc-500 text-xs mb-4">Blink widget requires a public URL.<br/>Use the Share on X button or deploy to test donations.</p>
          <a
            href={actionUrl.replace('http://localhost:3000', 'https://dial.to/?action=solana-action:http://localhost:3000')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Test via Dial.to
          </a>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`animate-pulse rounded-2xl ${className}`}>
        <div className="bg-zinc-800/50 rounded-2xl p-6 space-y-4">
          <div className="h-32 bg-zinc-700/50 rounded-xl" />
          <div className="h-4 bg-zinc-700/50 rounded w-3/4" />
          <div className="h-4 bg-zinc-700/50 rounded w-1/2" />
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="h-10 bg-zinc-700/50 rounded-lg" />
            <div className="h-10 bg-zinc-700/50 rounded-lg" />
            <div className="h-10 bg-zinc-700/50 rounded-lg" />
          </div>
          <div className="h-12 bg-zinc-700/50 rounded-xl mt-2" />
        </div>
      </div>
    );
  }

  if (!blink) {
    return (
      <div className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-zinc-400 text-sm">Failed to load donation widget</p>
          <p className="text-zinc-600 text-xs mt-1">Try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`blink-container ${className}`}>
      <Blink 
        blink={blink} 
        adapter={adapter}
        stylePreset="x-dark"
      />
    </div>
  );
}
