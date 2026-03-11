'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Share2, Info, Loader2, ChevronRight } from 'lucide-react';
import api from '@/lib/api';
import { formatPrice, getImageUrl } from '@/lib/utils';
import ProductCard from '@/components/product/ProductCard';

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/products/slug/${slug}`);
        setProduct(response.data);
        
        // Fetch related products
        const relatedResponse = await api.get(`/products?category=${response.data.category}&limit=4`);
        setRelatedProducts(relatedResponse.data.products.filter((p: any) => p._id !== response.data._id));
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-pink-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-serif">Masterpiece not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-12">
          <a href="/" className="hover:text-pink-600 transition-colors">Home</a>
          <ChevronRight size={10} />
          <a href={`/${product.category}`} className="hover:text-pink-600 transition-colors">{product.category}</a>
          <ChevronRight size={10} />
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Image Gallery - Left Side (7/12) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
              <Image
                  src={getImageUrl(product.images[activeImage])}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-700"
                  priority
                  unoptimized={true}
                />
              </div>
              <div className="grid grid-cols-4 gap-6">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-[3/4] overflow-hidden transition-all duration-300 ${
                      activeImage === idx ? 'ring-2 ring-pink-600 ring-offset-4' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={getImageUrl(img)} alt={`${product.name} ${idx + 1}`} fill className="object-cover" unoptimized={true} />
                  </button>
                ))}
              </div>
          </div>

          {/* Product Details - Right Side (5/12) */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="space-y-6 mb-12 border-b border-gray-100 pb-12">
              <span className="text-pink-600 text-xs font-bold tracking-[0.3em] uppercase">{product.category} Collection</span>
              <h1 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight tracking-tight">{product.name}</h1>
              <div className="flex items-center gap-6">
                <span className="text-3xl font-light text-gray-900">
                  {formatPrice(product.discountPrice || product.price)}
                </span>
                {product.discountPrice && (
                  <span className="text-xl text-gray-400 line-through font-light">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-12">
              {/* Core Details Grid */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Fabric</span>
                  <p className="text-sm font-medium text-gray-900">{product.fabric}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Color Palette</span>
                  <p className="text-sm font-medium text-gray-900 capitalize">{product.color}</p>
                </div>
                {product.category === 'saree' && (
                  <>
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Artisan Work</span>
                      <p className="text-sm font-medium text-gray-900">{product.work}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Occasion</span>
                      <p className="text-sm font-medium text-gray-900">{product.occasion}</p>
                    </div>
                  </>
                )}
                {product.category === 'kurti' && (
                  <>
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Silhoutte</span>
                      <p className="text-sm font-medium text-gray-900">{product.kurtiType}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Neckline</span>
                      <p className="text-sm font-medium text-gray-900">{product.neckType}</p>
                    </div>
                  </>
                )}
              </div>

              {/* Sizes for Kurti */}
              {product.category === 'kurti' && (
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Available Sizes</span>
                  <div className="flex flex-wrap gap-3">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <span
                        key={size}
                        className={`w-10 h-10 flex items-center justify-center text-[10px] font-bold border rounded-full transition-all ${
                          product.size.includes(size)
                            ? 'border-gray-900 text-gray-900'
                            : 'border-gray-100 text-gray-200'
                        }`}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-4 pt-12 border-t border-gray-100">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-900">
                  <Info size={14} />
                  <span>The Story & Craft</span>
                </div>
                <p className="text-gray-500 font-light leading-relaxed text-sm">
                  {product.description}
                </p>
              </div>

              {/* Minimal Share */}
              <div className="pt-8">
                <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-pink-600 transition-colors">
                  <Share2 size={16} />
                  Share Masterpiece
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Collections */}
        {relatedProducts.length > 0 && (
          <div className="mt-40 pt-24 border-t border-gray-100">
            <div className="flex items-center justify-between mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 italic">Similar Pieces</h2>
              <a href={`/${product.category}`} className="text-xs font-bold uppercase tracking-widest text-pink-600 border-b border-pink-600 pb-1">View Full Collection</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {relatedProducts.map((p: any) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
