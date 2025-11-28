"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/dashboard", label: "Create" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "py-2"
            : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div 
            className={`flex justify-between items-center px-6 transition-all duration-500 ease-out ${
              scrolled
                ? "h-[56px] bg-[#0a0a0f]/70 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-xl shadow-black/20"
                : "h-[64px] bg-transparent border border-transparent rounded-2xl"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className={`absolute inset-0 bg-[#14f195] rounded-lg blur-lg transition-opacity duration-300 ${
                  scrolled ? "opacity-30" : "opacity-40"
                } group-hover:opacity-60`} />
                <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#14f195] to-[#9945ff] flex items-center justify-center text-[#0a0a0f] font-bold text-[13px]">
                  S
                </div>
              </div>
              <span className="text-[15px] font-semibold text-white tracking-[-0.01em]">
                ScholrLink
              </span>
            </Link>

            {/* Desktop Navigation Links - Center */}
            <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-[13px] font-medium transition-all duration-300 rounded-lg ${
                      isActive(link.href)
                        ? "text-[#14f195]"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#14f195] rounded-full" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* CTA Button - Desktop */}
              <Link
                href="/dashboard"
                className="hidden lg:flex items-center px-4 py-2 text-[12px] font-semibold text-[#0a0a0f] bg-[#14f195] rounded-lg hover:bg-[#2fff9f] transition-all duration-300 hover:shadow-lg hover:shadow-[#14f195]/25"
              >
                Start Campaign
              </Link>

              {/* Wallet Button */}
              <div className="hidden sm:block">
                <WalletMultiButton />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex flex-col items-center justify-center w-9 h-9 rounded-lg bg-white/[0.05] gap-1.5 group"
              >
                <span className={`w-4 h-[1.5px] bg-zinc-400 group-hover:bg-white transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-[4px]" : ""
                }`} />
                <span className={`w-4 h-[1.5px] bg-zinc-400 group-hover:bg-white transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-[2px]" : ""
                }`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-[#0a0a0f]/98 backdrop-blur-2xl transition-all duration-500 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{ paddingTop: "100px" }}
      >
        <div className="px-8 py-8 flex flex-col h-full">
          <div className="space-y-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-4 text-[28px] font-semibold tracking-[-0.02em] transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-[#14f195]"
                    : "text-zinc-400 hover:text-white hover:translate-x-2"
                }`}
                style={{
                  transitionDelay: mobileMenuOpen ? `${i * 50}ms` : "0ms",
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)"
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pb-8 pt-8 border-t border-white/[0.08]">
            <p className="text-[12px] text-zinc-600 uppercase tracking-wider mb-4">Connect Wallet</p>
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </>
  );
}
