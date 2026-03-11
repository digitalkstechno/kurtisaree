'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import api from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';

export default function HomePage() {
  const [featuredSarees, setFeaturedSarees] = useState([]);
  const [featuredKurtis, setFeaturedKurtis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const sareeRes = await api.get('/products?category=saree&limit=4');
        const kurtiRes = await api.get('/products?category=kurti&limit=4');
        setFeaturedSarees(sareeRes.data.products);
        setFeaturedKurtis(kurtiRes.data.products);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section - Luxury Feel */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=2000"
          alt="Premium Collection"
          fill
          className="object-cover scale-105 animate-subtle-zoom"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-4xl space-y-8">
            <span className="inline-block text-white text-sm font-bold tracking-[0.4em] uppercase opacity-0 animate-fade-in-down">
              Established 2026
            </span>
            <h1 className="text-5xl md:text-8xl font-serif text-white leading-tight opacity-0 animate-fade-in-up delay-300">
              The Art of <br /> <span className="italic">Traditional Elegance</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-500">
              Curating a legacy of fine fabrics and timeless silhouettes. <br /> Explore our exclusive collections of handcrafted Sarees and Kurtis.
            </p>
            <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-fade-in-up delay-700">
              <Link 
                href="/saree" 
                className="group relative px-12 py-5 bg-white text-gray-900 font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:text-white"
              >
                <span className="relative z-10">Saree Collection</span>
                <div className="absolute inset-0 bg-pink-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </Link>
              <Link 
                href="/kurti" 
                className="group relative px-12 py-5 border border-white text-white font-bold uppercase tracking-widest overflow-hidden transition-all duration-300"
              >
                <span className="relative z-10">Kurti Gallery</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="absolute inset-0 flex items-center justify-center text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">Kurti Gallery</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/60 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest font-bold">Discover More</span>
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white animate-scroll-down" />
          </div>
        </div>
      </section>

      {/* Featured Saree Gallery */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="space-y-4">
              <span className="text-pink-600 text-sm font-bold tracking-[0.3em] uppercase">Exquisite Collection</span>
              <h2 className="text-4xl md:text-6xl font-serif text-gray-900">Featured Sarees</h2>
            </div>
            <Link href="/saree" className="group flex items-center gap-3 text-gray-900 font-bold uppercase tracking-widest text-sm hover:text-pink-600 transition-colors">
              View Entire Collection <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          {loading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {[1,2,3,4].map(i => (
                  <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse rounded-lg" />
                ))}
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {featuredSarees.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Split Hero - Categorical Showcase */}
      <section className="flex flex-col lg:flex-row h-screen min-h-[600px]">
        <Link href="/saree" className="flex-1 relative group overflow-hidden border-b lg:border-b-0 lg:border-r border-white">
          <Image
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200"
            alt="Sarees"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
            <span className="text-white/80 text-xs font-bold tracking-[0.3em] uppercase mb-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">Discover Heritage</span>
            <h3 className="text-4xl md:text-6xl font-serif text-white mb-8">Timeless Sarees</h3>
            <div className="w-12 h-px bg-white group-hover:w-32 transition-all duration-700" />
          </div>
        </Link>
        <Link href="/kurti" className="flex-1 relative group overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1595776613215-fe04b78de7d0?auto=format&fit=crop&q=80&w=1200"
            alt="Kurtis"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
            <span className="text-white/80 text-xs font-bold tracking-[0.3em] uppercase mb-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">Modern Grace</span>
            <h3 className="text-4xl md:text-6xl font-serif text-white mb-8">Chic Kurtis</h3>
            <div className="w-12 h-px bg-white group-hover:w-32 transition-all duration-700" />
          </div>
        </Link>
      </section>

      {/* Featured Kurti Gallery */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="space-y-4">
              <span className="text-pink-600 text-sm font-bold tracking-[0.3em] uppercase">Daily Elegance</span>
              <h2 className="text-4xl md:text-6xl font-serif text-gray-900">Featured Kurtis</h2>
            </div>
            <Link href="/kurti" className="group flex items-center gap-3 text-gray-900 font-bold uppercase tracking-widest text-sm hover:text-pink-600 transition-colors">
              View Entire Collection <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          {loading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {[1,2,3,4].map(i => (
                  <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse rounded-lg" />
                ))}
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {featuredKurtis.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
