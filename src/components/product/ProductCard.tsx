'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  discountPrice?: number;
  images: string[];
  rating: number;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {discount}% OFF
            </div>
          )}
          
          {/* Quick actions overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-1 mb-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600 font-medium">{product.rating || 4.5}</span>
          </div>
          
          <h3 className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-pink-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.discountPrice || product.price)}
            </span>
            {product.discountPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>
      
      <div className="px-4 pb-4">
      </div>
    </div>
  );
}
