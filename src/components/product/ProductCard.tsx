'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatPrice, getImageUrl } from '@/lib/utils';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  discountPrice?: number;
  images: string[];
  rating: number;
  category: string;
  fabric?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col bg-white overflow-hidden transition-all duration-500">
      <Link href={`/product/${product.slug}`} className="relative aspect-[3/4] overflow-hidden bg-gray-100 block">
        <Image
          src={getImageUrl(product.images[0])}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          unoptimized={true}
        />
        
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        
        {/* Collection Label */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full text-gray-900 shadow-sm">
            {product.category}
          </span>
        </div>

        {/* View Details Hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 w-[80%]">
          <div className="bg-white/95 backdrop-blur-md text-gray-900 text-xs font-bold uppercase tracking-widest py-3 text-center rounded-lg shadow-xl flex items-center justify-center gap-2">
            Explore Details <ArrowRight size={14} />
          </div>
        </div>
      </Link>

      <div className="pt-6 pb-2 space-y-2">
        <div className="flex flex-col gap-1">
          {product.fabric && (
            <span className="text-[10px] text-pink-600 font-bold uppercase tracking-widest">{product.fabric}</span>
          )}
          <h3 className="text-base font-medium text-gray-900 tracking-tight group-hover:text-pink-600 transition-colors duration-300">
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-gray-900">
            {formatPrice(product.discountPrice || product.price)}
          </span>
          {product.discountPrice && (
            <span className="text-sm text-gray-400 line-through font-light">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
