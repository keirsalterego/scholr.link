"use client";

import { CreateCampaignForm } from "@/components/CreateCampaignForm";
import { useWallet } from "@solana/wallet-adapter-react";

export default function DashboardPage() {
  const { connected, publicKey } = useWallet();

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="max-w-xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-3">
            Create a campaign
          </h1>
          <p className="text-zinc-500">
            Set up your funding campaign and share it on social media to start receiving donations.
          </p>
        </div>

        {/* Connection Status */}
        {connected && publicKey ? (
          <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <div>
                <p className="text-sm font-medium text-emerald-400">Wallet connected</p>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">
                  {publicKey.toBase58().slice(0, 8)}...{publicKey.toBase58().slice(-8)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-amber-400">Connect your wallet</p>
                <p className="text-xs text-zinc-500 mt-1">
                  Use the connect button in the navigation bar to link your Solana wallet.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
          <CreateCampaignForm />
        </div>

        {/* Tips */}
        <div className="mt-8 p-5 bg-zinc-900/50 border border-zinc-800/50 rounded-xl">
          <h3 className="text-sm font-medium text-zinc-300 mb-4">Tips for success</h3>
          <ul className="space-y-3">
            {[
              "Keep your title concise—it's displayed in the Blink preview",
              "Be specific about how funds will be used",
              "Set a realistic goal that's achievable within your deadline",
              "Share in relevant communities where people care about your topic",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-500">
                <span className="text-zinc-600 mt-1">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
