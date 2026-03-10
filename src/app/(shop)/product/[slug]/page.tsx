'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, Share2, ShieldCheck, Truck, RotateCcw, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import ProductCard from '@/components/product/ProductCard';

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');

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
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
            <Image
              src={product.images[activeImage] || '/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                  activeImage === idx ? 'border-pink-600' : 'border-transparent'
                }`}
              >
                <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-green-100 px-2 py-0.5 rounded text-green-700 font-bold text-sm">
                <span>{product.rating || 4.5}</span>
                <Star size={14} className="fill-green-700" />
              </div>
              <span className="text-gray-500 text-sm font-medium">{product.numReviews || 120} Ratings</span>
            </div>
          </div>

          <div className="border-t border-b border-gray-100 py-6 mb-6">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl font-bold text-gray-900">
                {formatPrice(product.discountPrice || product.price)}
              </span>
              {product.discountPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xl font-bold text-orange-500">
                    ({Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF)
                  </span>
                </>
              )}
            </div>
            <p className="text-green-600 font-bold text-sm">Inclusive of all taxes</p>
          </div>

          {/* Saree/Kurti specific details */}
          <div className="mb-8 grid grid-cols-2 gap-y-4 text-sm">
            <div><span className="text-gray-500 font-medium">Fabric:</span> <span className="text-gray-900 font-semibold">{product.fabric}</span></div>
            <div><span className="text-gray-500 font-medium">Color:</span> <span className="text-gray-900 font-semibold capitalize">{product.color}</span></div>
            {product.category === 'saree' && (
              <>
                <div><span className="text-gray-500 font-medium">Work:</span> <span className="text-gray-900 font-semibold">{product.work}</span></div>
                <div><span className="text-gray-500 font-medium">Occasion:</span> <span className="text-gray-900 font-semibold">{product.occasion}</span></div>
                <div><span className="text-gray-500 font-medium">Blouse Included:</span> <span className="text-gray-900 font-semibold">{product.blouseIncluded}</span></div>
              </>
            )}
            {product.category === 'kurti' && (
              <>
                <div><span className="text-gray-500 font-medium">Type:</span> <span className="text-gray-900 font-semibold">{product.kurtiType}</span></div>
                <div><span className="text-gray-500 font-medium">Sleeve:</span> <span className="text-gray-900 font-semibold">{product.sleeveType}</span></div>
                <div><span className="text-gray-500 font-medium">Neck:</span> <span className="text-gray-900 font-semibold">{product.neckType}</span></div>
              </>
            )}
          </div>

          {/* Size Selection for Kurti */}
          {product.category === 'kurti' && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Select Size</h3>
              <div className="flex flex-wrap gap-4">
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    disabled={!product.size.includes(size)}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all ${
                      !product.size.includes(size) 
                        ? 'border-gray-100 text-gray-300 cursor-not-allowed' 
                        : selectedSize === size 
                          ? 'border-pink-600 bg-pink-50 text-pink-600' 
                          : 'border-gray-200 text-gray-700 hover:border-gray-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 mb-8">
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-8">
            <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
              <Truck size={20} className="text-pink-600" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
              <RotateCcw size={20} className="text-pink-600" />
              <span>10 Day Return</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
              <ShieldCheck size={20} className="text-pink-600" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
              <Share2 size={20} className="text-pink-600" />
              <span>Easy Share</span>
            </div>
          </div>
          
          <div className="mt-10">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Product Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p: any) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
