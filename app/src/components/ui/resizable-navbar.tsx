"use client";

import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Context for navbar state
interface NavbarContextType {
  scrolled: boolean;
}

const NavbarContext = createContext<NavbarContextType>({ scrolled: false });

// Main Navbar wrapper
interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

export function Navbar({ children, className = "" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavbarContext.Provider value={{ scrolled }}>
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      >
        <div 
          className={`mx-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled 
              ? "max-w-4xl mt-3 px-2" 
              : "max-w-7xl mt-0 px-4 sm:px-6 lg:px-8"
          }`}
        >
          <div
            className={`relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              scrolled
                ? "bg-[#0a0a0f]/90 backdrop-blur-2xl border border-white/[0.1] rounded-2xl shadow-2xl shadow-black/50 px-4 py-2"
                : "bg-transparent border border-transparent rounded-2xl px-4 py-4"
            }`}
          >
            {/* Gradient border glow when scrolled */}
            {scrolled && (
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#14f195]/30 via-transparent to-[#9945ff]/30 opacity-60 blur-sm pointer-events-none" />
            )}
            
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </div>
      </motion.nav>
    </NavbarContext.Provider>
  );
}

// NavBody - Desktop navigation container
interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function NavBody({ children, className = "" }: NavBodyProps) {
  return (
    <div className={`hidden md:flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
}

// NavItems - Navigation links container
interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

interface NavItemsProps {
  items: NavItem[];
  className?: string;
  onItemClick?: () => void;
}

export function NavItems({ items, className = "", onItemClick }: NavItemsProps) {
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const { scrolled } = useContext(NavbarContext);

  return (
    <div 
      className={`flex items-center gap-1 p-1.5 rounded-xl transition-all duration-300 ${
        scrolled ? "bg-white/[0.04]" : "bg-white/[0.02]"
      } ${className}`}
    >
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.link}
          onClick={onItemClick}
          onMouseEnter={() => setActiveHover(item.name)}
          onMouseLeave={() => setActiveHover(null)}
          className="relative flex items-center gap-2 px-4 py-2 text-[13px] font-medium transition-all duration-300 rounded-lg text-zinc-400 hover:text-white"
        >
          {/* Hover background */}
          <AnimatePresence>
            {activeHover === item.name && (
              <motion.span
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 rounded-lg bg-white/[0.06]"
              />
            )}
          </AnimatePresence>
          
          {/* Icon */}
          {item.icon && (
            <span className="relative">{item.icon}</span>
          )}
          
          {/* Label */}
          <span className="relative">{item.name}</span>
        </Link>
      ))}
    </div>
  );
}

// NavbarLogo
interface NavbarLogoProps {
  className?: string;
}

export function NavbarLogo({ className = "" }: NavbarLogoProps) {
  const { scrolled } = useContext(NavbarContext);
  
  return (
    <Link href="/" className={`relative flex items-center gap-2.5 group ${className}`}>
      {/* Logo Icon */}
      <div className="relative">
        {/* Glow effect */}
        <div className={`absolute -inset-1 bg-gradient-to-br from-[#14f195] to-[#9945ff] rounded-lg blur-md transition-all duration-500 ${
          scrolled ? "opacity-30 group-hover:opacity-60" : "opacity-40 group-hover:opacity-70"
        }`} />
        
        {/* Logo container */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className={`relative rounded-lg bg-[#0a0a0f] border border-[#14f195]/20 flex items-center justify-center shadow-lg transition-all duration-300 ${
            scrolled ? "w-8 h-8" : "w-9 h-9"
          }`}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#14f195]/10 to-[#9945ff]/10" />
          
          {/* Custom S Logo */}
          <svg 
            className={`relative transition-all duration-300 ${scrolled ? "w-4 h-4" : "w-5 h-5"}`}
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Academic cap/mortarboard design integrated with S */}
            <path 
              d="M12 3L2 8L12 13L22 8L12 3Z" 
              fill="url(#logo-gradient-1)"
              stroke="url(#logo-gradient-2)"
              strokeWidth="0.5"
            />
            <path 
              d="M2 8V14C2 14 4 17 12 17C20 17 22 14 22 14V8" 
              stroke="url(#logo-gradient-2)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* S letter formed by the design */}
            <path 
              d="M12 10C12 10 14 10.5 14 12C14 13.5 12 14 12 14C12 14 10 14 10 15.5C10 17 12 17.5 12 17.5" 
              stroke="#14f195"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
            
            {/* Gradients */}
            <defs>
              <linearGradient id="logo-gradient-1" x1="2" y1="3" x2="22" y2="13" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#14f195" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#9945ff" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="logo-gradient-2" x1="2" y1="8" x2="22" y2="17" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#14f195" />
                <stop offset="100%" stopColor="#00d4aa" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
      
      {/* Logo text */}
      <motion.div 
        className="flex flex-col"
        animate={{ opacity: scrolled ? 0 : 1, width: scrolled ? 0 : "auto" }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-[16px] font-bold text-white tracking-[-0.03em] leading-tight whitespace-nowrap">
          Scholr<span className="text-[#14f195]">Link</span>
        </span>
        <span className="text-[10px] text-zinc-500 font-medium tracking-wide hidden sm:block whitespace-nowrap">
          Student Funding Protocol
        </span>
      </motion.div>
    </Link>
  );
}

// NavbarButton
interface NavbarButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "wallet";
  onClick?: () => void;
  className?: string;
  href?: string;
}

export function NavbarButton({ 
  children, 
  variant = "primary", 
  onClick, 
  className = "",
  href 
}: NavbarButtonProps) {
  const baseStyles = "relative flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] font-semibold rounded-xl transition-all duration-300 overflow-hidden";
  
  const variants = {
    primary: "text-[#0a0a0f] bg-gradient-to-r from-[#14f195] to-[#00d4aa] hover:shadow-lg hover:shadow-[#14f195]/30 hover:scale-[1.02] active:scale-[0.98]",
    secondary: "text-zinc-300 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white hover:border-white/[0.12]",
    wallet: "text-zinc-300 bg-white/[0.04] border border-white/[0.08] hover:bg-gradient-to-r hover:from-[#14f195]/10 hover:to-[#9945ff]/10 hover:border-[#14f195]/30",
  };

  const content = (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: variant === "primary" ? 1.02 : 1 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

// MobileNav - Mobile navigation container
interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileNav({ children, className = "" }: MobileNavProps) {
  return (
    <div className={`md:hidden ${className}`}>
      {children}
    </div>
  );
}

// MobileNavHeader
interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileNavHeader({ children, className = "" }: MobileNavHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
}

// MobileNavToggle
interface MobileNavToggleProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export function MobileNavToggle({ isOpen, onClick, className = "" }: MobileNavToggleProps) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`relative flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
        isOpen 
          ? "bg-[#14f195]/10 border border-[#14f195]/20" 
          : "bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08]"
      } ${className}`}
      aria-label="Toggle menu"
    >
      <motion.span
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 3 : 0,
        }}
        transition={{ duration: 0.2 }}
        className={`w-5 h-[2px] rounded-full ${isOpen ? "bg-[#14f195]" : "bg-zinc-400"}`}
      />
      <motion.span
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -3 : 0,
        }}
        transition={{ duration: 0.2 }}
        className={`w-5 h-[2px] rounded-full mt-1.5 ${isOpen ? "bg-[#14f195]" : "bg-zinc-400"}`}
      />
    </motion.button>
  );
}

// MobileNavMenu
interface MobileNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function MobileNavMenu({ isOpen, onClose, children, className = "" }: MobileNavMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed inset-x-0 top-[72px] z-40 ${className}`}
        >
          <div className="mx-4 mt-2">
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="bg-[#0a0a0f]/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-4 shadow-2xl shadow-black/50"
            >
              {/* Gradient glow */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#14f195]/20 via-transparent to-[#9945ff]/20 opacity-50 blur-sm pointer-events-none" />
              
              <div className="relative space-y-2">
                {children}
              </div>
            </motion.div>
          </div>
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 -z-10 bg-black/50 backdrop-blur-sm"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// MobileNavItem - For mobile menu items
interface MobileNavItemProps {
  href: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

export function MobileNavItem({ 
  href, 
  icon, 
  children, 
  onClick, 
  isActive = false,
  className = "" 
}: MobileNavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-[#14f195]/10 border border-[#14f195]/20"
          : "bg-white/[0.02] border border-transparent hover:bg-white/[0.05] hover:border-white/[0.05]"
      } ${className}`}
    >
      {/* Icon container */}
      {icon && (
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
          isActive 
            ? "bg-[#14f195]/20 text-[#14f195]" 
            : "bg-white/[0.05] text-zinc-400 group-hover:text-white group-hover:bg-white/[0.08]"
        }`}>
          {icon}
        </div>
      )}
      
      {/* Text */}
      <span className={`flex-1 text-[15px] font-medium ${
        isActive ? "text-[#14f195]" : "text-white"
      }`}>
        {children}
      </span>
      
      {/* Arrow */}
      <svg className={`w-4 h-4 transition-all duration-300 ${
        isActive ? "text-[#14f195]" : "text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-1"
      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </Link>
  );
}
