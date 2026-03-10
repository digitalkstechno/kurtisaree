import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { ShoppingBag, Search, User, Heart, Menu } from 'lucide-react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kurti & Saree - Premium Women's Wear",
  description: "Shop the best collection of sarees and kurtis online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-900`}>
        <Toaster position="top-center" />
        
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-pink-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink-200 group-hover:rotate-12 transition-transform">
                  <ShoppingBag size={24} />
                </div>
                <span className="text-2xl font-black tracking-tighter text-gray-900">
                  KURTI<span className="text-pink-600">SAREE</span>
                </span>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-10">
                <Link href="/saree" className="text-sm font-bold uppercase tracking-widest hover:text-pink-600 transition-colors">Sarees</Link>
                <Link href="/kurti" className="text-sm font-bold uppercase tracking-widest hover:text-pink-600 transition-colors">Kurtis</Link>
                <Link href="/#new-arrivals" className="text-sm font-bold uppercase tracking-widest hover:text-pink-600 transition-colors">New Arrivals</Link>
              </div>

              {/* Icons */}
              <div className="flex items-center gap-6">
                <button className="p-2 hover:bg-gray-50 rounded-full transition-colors hidden sm:block">
                  <Search size={22} />
                </button>
                <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                  <User size={22} />
                </button>
                <button className="md:hidden p-2 hover:bg-gray-50 rounded-full transition-colors">
                  <Menu size={22} />
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div className="space-y-6">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-pink-600 rounded-xl flex items-center justify-center text-white">
                    <ShoppingBag size={24} />
                  </div>
                  <span className="text-2xl font-black tracking-tighter">
                    KURTI<span className="text-pink-600">SAREE</span>
                  </span>
                </Link>
                <p className="text-gray-400 leading-relaxed">
                  The ultimate destination for premium ethnic wear. Handpicked designs that celebrate your elegance.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                <ul className="space-y-4 text-gray-400">
                  <li><Link href="/saree" className="hover:text-pink-500 transition-colors">Shop Sarees</Link></li>
                  <li><Link href="/kurti" className="hover:text-pink-500 transition-colors">Shop Kurtis</Link></li>
                  <li><Link href="/about" className="hover:text-pink-500 transition-colors">Our Story</Link></li>
                  <li><Link href="/contact" className="hover:text-pink-500 transition-colors">Contact Us</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-6">Customer Service</h4>
                <ul className="space-y-4 text-gray-400">
                  <li><Link href="/shipping" className="hover:text-pink-500 transition-colors">Shipping Policy</Link></li>
                  <li><Link href="/returns" className="hover:text-pink-500 transition-colors">Return & Refund</Link></li>
                  <li><Link href="/privacy" className="hover:text-pink-500 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/faq" className="hover:text-pink-500 transition-colors">FAQs</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-6">Newsletter</h4>
                <p className="text-gray-400 mb-6">Subscribe to get special offers and style updates.</p>
                <form className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <button className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg font-bold transition-colors">Join</button>
                </form>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-10 text-center text-gray-500 text-sm">
              <p>© 2026 KURTISAREE. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
