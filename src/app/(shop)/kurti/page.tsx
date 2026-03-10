'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';
import FilterSidebar from '@/components/filters/FilterSidebar';
import Pagination from '@/components/common/Pagination';
import CategoryHeader from '@/components/common/CategoryHeader';
import { Loader2 } from 'lucide-react';

export default function KurtiPage() {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile filter overlay backdrop */}
        {isFilterOpen && (
          <div 
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setIsFilterOpen(false)}
          />
        )}

        <FilterSidebar 
          category="kurti" 
          isOpen={isFilterOpen} 
          onClose={() => setIsFilterOpen(false)} 
        />

        <main className="flex-1">
          <CategoryHeader 
            title="Trendy Kurtis" 
            totalProducts={totalProducts} 
            onFilterToggle={() => setIsFilterOpen(true)}
          />

          {loading ? (
            <div className="flex flex-col items-center justify-center h-96">
              <Loader2 className="h-10 w-10 animate-spin text-pink-600 mb-4" />
              <p className="text-gray-500 font-medium">Fetching the latest styles...</p>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg">
              <p className="text-xl font-bold text-gray-900 mb-2">No products found</p>
              <p className="text-gray-500 text-center px-4 max-w-sm">
                We couldn't find any products matching your current filters. Try adjusting them to see more options.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
