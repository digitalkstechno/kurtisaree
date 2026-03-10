'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';

interface CategoryHeaderProps {
  title: string;
  totalProducts: number;
  onFilterToggle: () => void;
}

const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-gray-100 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 capitalize">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{totalProducts} products found</p>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onFilterToggle}
          className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-semibold hover:bg-gray-50"
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="hidden sm:block text-sm text-gray-600 font-medium">Sort By:</label>
          <select
            id="sort"
            value={searchParams.get('sort') || 'newest'}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-2 border rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
