"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AuthButton } from "@/components/AuthButton";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
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
      <button className="wallet-adapter-button" disabled>
        Connect
      </button>
    )
  }
);

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { 
      name: "Home", 
      link: "/",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    },
    { 
      name: "Explore", 
      link: "/explore",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      )
    },
    { 
      name: "Dashboard", 
      link: "/dashboard",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      )
    },
  ];

  return (
    <ResizableNavbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-3">
          <AuthButton />
          {mounted && <WalletMultiButton />}
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle 
            isOpen={mobileMenuOpen} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          />
        </MobileNavHeader>

        <MobileNavMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
          {navItems.map((item, idx) => (
            <Link
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setMobileMenuOpen(false)}
              className={`group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                pathname === item.link
                  ? "bg-[#14f195]/10 border border-[#14f195]/20"
                  : "bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.08]"
              }`}
            >
              {/* Icon container */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                pathname === item.link 
                  ? "bg-[#14f195]/20 text-[#14f195]" 
                  : "bg-white/[0.05] text-zinc-400 group-hover:text-white group-hover:bg-white/[0.08]"
              }`}>
                {item.icon}
              </div>
              
              {/* Text */}
              <div className="flex-1">
                <span className={`text-[18px] font-semibold tracking-[-0.01em] ${
                  pathname === item.link ? "text-[#14f195]" : "text-white"
                }`}>
                  {item.name}
                </span>
              </div>
              
              {/* Arrow */}
              <svg className={`w-5 h-5 transition-all duration-300 ${
                pathname === item.link ? "text-[#14f195]" : "text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-1"
              }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          ))}
          
          {/* Divider */}
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          {/* Wallet Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[12px] text-zinc-500 uppercase tracking-wider font-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
              </svg>
              Wallet
            </div>
            {mounted && <WalletMultiButton />}
          </div>
          
          {/* Create Campaign CTA */}
          <div className="mt-auto pt-6">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full p-4 text-[15px] font-semibold text-[#0a0a0f] bg-gradient-to-r from-[#14f195] to-[#00d4aa] rounded-2xl shadow-lg shadow-[#14f195]/20 hover:shadow-xl hover:shadow-[#14f195]/30 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Start Your Campaign
            </Link>
            
            {/* Footer info */}
            <div className="flex items-center justify-center gap-2 mt-6 text-[12px] text-zinc-600">
              <span>Powered by</span>
              <span className="text-[#14f195] font-medium">Solana</span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="text-zinc-400">Blinks</span>
            </div>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}
