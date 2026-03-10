'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Star, TrendingUp, Zap } from 'lucide-react';
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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=2000"
          alt="Hero Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg">
              Elegance Reimagined
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 font-medium drop-shadow-md">
              Discover the finest collection of handcrafted Sarees and contemporary Kurtis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/saree" 
                className="w-full sm:w-auto px-10 py-4 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full transition-all hover:scale-105 shadow-xl shadow-pink-500/20"
              >
                Shop Sarees
              </Link>
              <Link 
                href="/kurti" 
                className="w-full sm:w-auto px-10 py-4 bg-white hover:bg-gray-100 text-pink-600 font-bold rounded-full transition-all hover:scale-105 shadow-xl shadow-black/10"
              >
                Shop Kurtis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop By Category</h2>
            <div className="w-20 h-1 bg-pink-600 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Link href="/saree" className="group relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800"
                alt="Sarees"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
                <h3 className="text-4xl font-bold text-white mb-4">Timeless Sarees</h3>
                <p className="text-white/80 mb-6 text-lg">From traditional silk to modern organza.</p>
                <div className="flex items-center gap-2 text-pink-400 font-bold group-hover:translate-x-2 transition-transform">
                  Explore Now <ArrowRight size={20} />
                </div>
              </div>
            </Link>
            <Link href="/kurti" className="group relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1595776613215-fe04b78de7d0?auto=format&fit=crop&q=80&w=800"
                alt="Kurtis"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
                <h3 className="text-4xl font-bold text-white mb-4">Chic Kurtis</h3>
                <p className="text-white/80 mb-6 text-lg">Trendy designs for everyday elegance.</p>
                <div className="flex items-center gap-2 text-pink-400 font-bold group-hover:translate-x-2 transition-transform">
                  Explore Now <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Sarees */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Sarees</h2>
              <p className="text-gray-500 mt-2 font-medium">Handpicked collection of our best sarees.</p>
            </div>
            <Link href="/saree" className="flex items-center gap-2 text-pink-600 font-bold hover:gap-3 transition-all">
              View All <ArrowRight size={20} />
            </Link>
          </div>
          
          {loading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
                {[1,2,3,4].map(i => (
                  <div key={i} className="aspect-[3/4] bg-gray-100 rounded-xl" />
                ))}
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredSarees.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto rounded-[3rem] bg-pink-600 overflow-hidden relative min-h-[400px] flex items-center shadow-2xl shadow-pink-200">
           <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
              <Image 
                src="https://images.unsplash.com/photo-1610030469668-935102a9017d?auto=format&fit=crop&q=80&w=800"
                alt="Discount Banner"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-transparent" />
           </div>
           <div className="relative z-10 p-12 lg:p-20 text-white max-w-2xl">
              <span className="inline-block px-4 py-1 bg-white/20 rounded-full font-bold text-sm mb-6 backdrop-blur-sm">Limited Time Offer</span>
              <h2 className="text-5xl font-extrabold mb-6 leading-tight">Upto 50% Off On Festive Collection</h2>
              <p className="text-xl mb-10 text-pink-50 font-medium">Celebrate the season with styles that make you shine. Free shipping on orders over ₹1999.</p>
              <Link href="/saree" className="inline-block px-10 py-4 bg-white text-pink-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-xl">
                Shop The Sale
              </Link>
           </div>
        </div>
      </section>

      {/* Featured Kurtis */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Kurtis</h2>
              <p className="text-gray-500 mt-2 font-medium">Stylish kurtis for every occasion.</p>
            </div>
            <Link href="/kurti" className="flex items-center gap-2 text-pink-600 font-bold hover:gap-3 transition-all">
              View All <ArrowRight size={20} />
            </Link>
          </div>
          
          {loading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
                {[1,2,3,4].map(i => (
                  <div key={i} className="aspect-[3/4] bg-gray-100 rounded-xl" />
                ))}
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredKurtis.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust Features */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:bg-pink-600 group-hover:text-white transition-colors duration-500 shadow-sm">
                <ShoppingBag size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Quality Assured</h4>
              <p className="text-gray-500 font-medium">Every product is hand-checked for perfection.</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:bg-pink-600 group-hover:text-white transition-colors duration-500 shadow-sm">
                <Zap size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Fast Shipping</h4>
              <p className="text-gray-500 font-medium">Delivered to your doorstep in 3-5 days.</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:bg-pink-600 group-hover:text-white transition-colors duration-500 shadow-sm">
                <TrendingUp size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Trendy Styles</h4>
              <p className="text-gray-500 font-medium">Always stay ahead with the latest designs.</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:bg-pink-600 group-hover:text-white transition-colors duration-500 shadow-sm">
                <Star size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Top Rated</h4>
              <p className="text-gray-500 font-medium">Loved by thousands of happy customers.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
