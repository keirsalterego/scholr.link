"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("twitter", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#14f195] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-[72px] flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#14f195]/5 via-transparent to-[#9945ff]/5" />
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#14f195]/[0.08] rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[#9945ff]/[0.06] rounded-full blur-[130px]" />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="glass-card p-8 rounded-2xl border border-zinc-800/50">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#14f195] to-[#9945ff] flex items-center justify-center text-[#0a0a0f] font-bold text-xl shadow-lg shadow-[#14f195]/20">
                S
              </div>
              <span className="text-2xl font-bold text-white tracking-[-0.02em]">ScholrLink</span>
            </Link>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-zinc-400 text-sm">Sign in with X to continue to ScholrLink</p>
          </div>

          {/* Sign in button */}
          <button
            onClick={handleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white text-black font-semibold text-base hover:bg-zinc-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {isLoading ? (
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            )}
            {isLoading ? "Signing in..." : "Continue with X"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-xs text-zinc-500 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Features */}
          <div className="space-y-3">
            {[
              { icon: "🔗", text: "Link your Solana wallet" },
              { icon: "🚀", text: "Create & fund campaigns" },
              { icon: "🏆", text: "Earn soulbound badges" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-zinc-400">
                <span className="text-base">{feature.icon}</span>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Terms */}
          <p className="text-xs text-zinc-600 text-center mt-8">
            By signing in, you agree to our{" "}
            <a href="/terms" className="text-zinc-400 hover:text-white transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-zinc-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
