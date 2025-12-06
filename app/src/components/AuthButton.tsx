"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AuthButton() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/50 animate-pulse">
        <div className="w-7 h-7 rounded-full bg-zinc-800" />
        <div className="w-16 h-3.5 rounded-md bg-zinc-800" />
      </div>
    );
  }

  if (session?.user) {
    return <UserMenu user={session.user} onSignOut={handleSignOut} isLoading={isLoading} />;
  }

  return (
    <motion.button
      onClick={handleSignIn}
      disabled={isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/5 to-transparent" />
      
      {isLoading ? (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <svg className="w-4 h-4 relative" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )}
      <span className="relative">Sign in</span>
    </motion.button>
  );
}

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    twitterUsername?: string;
  };
  onSignOut: () => void;
  isLoading: boolean;
}

function UserMenu({ user, onSignOut, isLoading }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border transition-all duration-300 ${
          isOpen 
            ? "bg-zinc-800/80 border-zinc-700" 
            : "bg-zinc-900/50 border-zinc-800/50 hover:bg-zinc-800/50 hover:border-zinc-700/50"
        }`}
      >
        {/* Avatar with status ring */}
        <div className="relative">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={30}
              height={30}
              className="rounded-full ring-2 ring-zinc-700"
            />
          ) : (
            <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-[#14f195] to-[#9945ff] flex items-center justify-center text-xs font-bold text-black ring-2 ring-zinc-700">
              {user.name?.[0]?.toUpperCase() || "U"}
            </div>
          )}
          {/* Online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#14f195] border-2 border-zinc-900" />
        </div>
        
        {/* Name - hidden on mobile */}
        <span className="text-sm font-medium text-zinc-200 hidden sm:block max-w-[100px] truncate">
          {user.twitterUsername ? `@${user.twitterUsername}` : user.name}
        </span>
        
        {/* Chevron */}
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 text-zinc-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            
            {/* Dropdown */}
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 mt-2 w-64 rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-zinc-800/80 shadow-2xl shadow-black/50 z-50 overflow-hidden"
            >
              {/* User Info Header */}
              <div className="p-4 bg-gradient-to-br from-zinc-800/50 to-transparent border-b border-zinc-800/50">
                <div className="flex items-center gap-3">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={44}
                      height={44}
                      className="rounded-xl ring-2 ring-zinc-700"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#14f195] to-[#9945ff] flex items-center justify-center text-sm font-bold text-black">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                    <p className="text-xs text-zinc-500 truncate">@{user.twitterUsername}</p>
                  </div>
                </div>
              </div>
              
              {/* Menu Items */}
              <div className="p-2">
                <a
                  href="/dashboard"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-[#14f195]/10 transition-colors">
                    <svg className="w-4 h-4 group-hover:text-[#14f195] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25z" />
                    </svg>
                  </div>
                  <span>Dashboard</span>
                </a>
                
                <a
                  href="/profile"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-[#14f195]/10 transition-colors">
                    <svg className="w-4 h-4 group-hover:text-[#14f195] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <span>Profile</span>
                </a>
                
                <a
                  href="/explore"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-[#14f195]/10 transition-colors">
                    <svg className="w-4 h-4 group-hover:text-[#14f195] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <span>Explore Campaigns</span>
                </a>
              </div>
              
              {/* Sign Out */}
              <div className="p-2 border-t border-zinc-800/50">
                <button
                  onClick={onSignOut}
                  disabled={isLoading}
                  className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 disabled:opacity-50 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                  </div>
                  {isLoading ? "Signing out..." : "Sign out"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
