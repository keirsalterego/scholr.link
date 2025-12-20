"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { AuthButton } from "@/components/AuthButton";
import {
  Navbar as ResizableNavbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";

// Dynamically import WalletMultiButton to prevent SSR hydration issues
const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { 
    ssr: false,
    loading: () => (
      <div className="h-10 w-[140px] rounded-xl bg-zinc-800/50 animate-pulse" />
    )
  }
);

// Helper to check if mounted (avoids hydration mismatch)
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { 
      name: "Home", 
      link: "/",
      description: "Back to start"
    },
    { 
      name: "Explore", 
      link: "/explore",
      description: "Discover campaigns"
    },
    { 
      name: "Dashboard", 
      link: "/dashboard",
      description: "Manage your campaigns"
    },
  ];

  const isActive = (link: string) => pathname === link;

  return (
    <ResizableNavbar>
      {/* Desktop Navigation - Dynamic Island Style */}
      <NavBody className="w-full px-0">
        {/* Left: Logo */}
        <div className="flex-1 flex items-center min-w-[120px]">
          <NavbarLogo />
        </div>

        {/* Center: Dynamic Island Nav */}
        <div className="flex-1 flex justify-center">
          <motion.nav
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative flex items-center px-2 py-1 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/10"
            style={{ minWidth: 320, maxWidth: 480 }}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative px-6 py-2 text-sm font-medium transition-colors duration-150"
              >
                {/* Active pill background */}
                {isActive(item.link) && (
                  <motion.div
                    layoutId="nav-active-pill"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#14f195]/20 via-white/10 to-[#9945ff]/20 border border-white/20 shadow-md shadow-[#14f195]/10"
                  />
                )}
                {/* Hover underline */}
                {hoveredItem === item.name && !isActive(item.link) && (
                  <motion.div
                    layoutId="nav-hover-underline"
                    initial={{ opacity: 0, scaleX: 0.8 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0.8 }}
                    className="absolute left-4 right-4 bottom-1 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#14f195] to-transparent"
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                  />
                )}
                <span className={`relative z-10 ${
                  isActive(item.link)
                    ? "text-white font-semibold"
                    : hoveredItem === item.name
                      ? "text-[#14f195]"
                      : "text-zinc-300"
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </motion.nav>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex items-center justify-end gap-3 min-w-[120px]">
          <AuthButton />
          {mounted && (
            <div className="wallet-wrapper">
              <WalletMultiButton />
            </div>
          )}
        </div>
      </NavBody>

      {/* Mobile Navigation (unchanged) */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <div className="flex items-center gap-2">
            {mounted && (
              <div className="wallet-wrapper-mobile">
                <WalletMultiButton />
              </div>
            )}
            <MobileNavToggle 
              isOpen={mobileMenuOpen} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
          {/* Navigation Section */}
          <div className="space-y-1">
            <p className="px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
              Navigation
            </p>
            {navItems.map((item, idx) => (
              <motion.div
                key={`mobile-link-${idx}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={item.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                    isActive(item.link)
                      ? "bg-gradient-to-r from-[#14f195]/10 to-[#9945ff]/5 border-l-2 border-[#14f195]"
                      : "hover:bg-zinc-800/50"
                  }`}
                >
                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-[15px] font-semibold ${
                      isActive(item.link) ? "text-[#14f195]" : "text-white"
                    }`}>
                      {item.name}
                    </p>
                    <p className="text-[12px] text-zinc-500 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Indicator */}
                  {isActive(item.link) ? (
                    <div className="w-2 h-2 rounded-full bg-[#14f195] shadow-lg shadow-[#14f195]/50" />
                  ) : (
                    <svg className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Divider */}
          <div className="my-4 mx-4 h-px bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800" />
          
          {/* Account Section */}
          <div className="space-y-3">
            <p className="px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
              Account
            </p>
            <div className="px-4">
              <AuthButton />
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-auto pt-6 px-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#14f195]/5 to-[#9945ff]/5 border border-zinc-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#14f195] to-[#9945ff] flex items-center justify-center">
                  <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Powered by Solana</p>
                  <p className="text-[10px] text-zinc-500">Fast, secure, decentralized</p>
                </div>
              </div>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-black bg-gradient-to-r from-[#14f195] to-[#00d4aa] rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Create Campaign
              </Link>
            </div>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}
