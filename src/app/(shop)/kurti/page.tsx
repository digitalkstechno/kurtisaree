'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';
import FilterSidebar from '@/components/filters/FilterSidebar';
import Pagination from '@/components/common/Pagination';
import CategoryHeader from '@/components/common/CategoryHeader';
import { Loader2 } from 'lucide-react';

function KurtiContent() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(searchParams.toString());
        params.set('category', 'kurti');
        const response = await api.get(`/products?${params.toString()}`);
        setProducts(response.data.products);
        setTotalProducts(response.data.totalProducts);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  return (
    <div className="flex flex-col lg:flex-row gap-16">
      {/* Mobile filter overlay backdrop */}
      {isFilterOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      <div className="lg:w-72 flex-shrink-0">
        <FilterSidebar 
          category="kurti" 
          isOpen={isFilterOpen} 
          onClose={() => setIsFilterOpen(false)} 
        />
      </div>

      <main className="flex-1">
        <CategoryHeader 
          title="Kurti Gallery" 
          totalProducts={totalProducts} 
          onFilterToggle={() => setIsFilterOpen(true)}
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-20 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-6">
                <div className="aspect-[3/4] bg-gray-50 rounded-lg" />
                <div className="h-4 bg-gray-50 w-3/4 rounded" />
                <div className="h-4 bg-gray-50 w-1/4 rounded" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-20">
              {products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <Pagination 
              totalPages={totalPages} 
              currentPage={Number(searchParams.get('page')) || 1} 
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 bg-gray-50 rounded-2xl">
            <p className="text-2xl font-serif text-gray-900 mb-4">No results found</p>
            <p className="text-gray-500 text-center px-4 max-w-sm font-light">
              We couldn't find any masterpieces matching your current criteria. Please refine your selection.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function KurtiPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-20">
        <Suspense fallback={
          <div className="flex items-center justify-center py-40">
            <Loader2 className="animate-spin text-pink-600" size={40} />
          </div>
        }>
          <KurtiContent />
        </Suspense>
      </div>
    </div>
  );
}
