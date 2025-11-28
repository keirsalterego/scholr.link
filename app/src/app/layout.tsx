import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "@/contexts/WalletContextProvider";
import { Navbar } from "@/components/Navbar";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ScholrLink – Fund Student Innovation",
  description: "Decentralized crowdfunding for student projects. Donate directly from Twitter using Solana Blinks.",
  openGraph: {
    title: "ScholrLink – Fund Student Innovation",
    description: "Decentralized crowdfunding for student projects. Donate directly from Twitter using Solana Blinks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${dmSans.variable} ${ibmPlexMono.variable} font-sans antialiased bg-[#050506]`}
      >
        <WalletContextProvider>
          <Navbar />
          <main>{children}</main>
        </WalletContextProvider>
      </body>
    </html>
  );
}
