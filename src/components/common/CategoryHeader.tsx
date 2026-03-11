'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

interface CategoryHeaderProps {
  title: string;
  totalProducts: number;
  onFilterToggle: () => void;
}

const SORT_OPTIONS = [
  { label: 'Recently Added', value: 'newest' },
  { label: 'Price: Low to High', value: 'priceLowHigh' },
  { label: 'Price: High to Low', value: 'priceHighLow' },
];

export default function CategoryHeader({ title, totalProducts, onFilterToggle }: CategoryHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-8 mb-12">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 tracking-tight">{title}</h1>
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
          <span>{totalProducts} Masterpieces</span>
          <div className="w-8 h-px bg-gray-200" />
          <span>Catalog Collection</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 py-4 border-y border-gray-100">
        <button 
          onClick={onFilterToggle}
          className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-900 hover:text-pink-600 transition-colors"
        >
          <SlidersHorizontal size={16} />
          Refine Selection
        </button>

        <div className="flex items-center gap-6">
          <div className="relative group">
            <select
              id="sort"
              value={searchParams.get('sort') || 'newest'}
              onChange={(e) => handleSortChange(e.target.value)}
              className="appearance-none bg-transparent pr-8 py-2 text-xs font-bold uppercase tracking-widest text-gray-900 focus:outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  Sort: {option.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
