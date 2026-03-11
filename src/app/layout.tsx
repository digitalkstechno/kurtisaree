import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { Menu, Sparkles } from 'lucide-react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KURTISAREE | Premium Ethnic Catalog",
  description: "Discover a curated collection of handcrafted Sarees and Kurtis. A legacy of traditional elegance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-900 bg-white selection:bg-pink-100 selection:text-pink-600`}>
        <Toaster position="top-center" />
        
        {/* Navigation - Minimal & Luxury */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-50 sticky top-0 z-50">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <div className="flex justify-between items-center h-24">
              {/* Logo */}
              <Link href="/saree" className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-2xl transition-transform duration-500 group-hover:rotate-[360deg]">
                  <Sparkles size={20} />
                </div>
                <span className="text-2xl font-serif tracking-tighter text-gray-900">
                  KURTI<span className="text-pink-600 italic">SAREE</span>
                </span>
              </Link>
 
              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-12">
                <Link href="/saree" className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-pink-600 transition-colors">Sarees</Link>
                <Link href="/kurti" className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-pink-600 transition-colors">Kurtis</Link>
              </div>

              {/* Icons */}
              <div className="flex items-center gap-4">
                <button className="lg:hidden p-3 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-gray-900">
                  <Menu size={20} />
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}
