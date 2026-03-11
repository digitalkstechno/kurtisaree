'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, ChevronUp, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import api from '@/lib/api';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSection {
  id: string;
  name: string;
  options: FilterOption[];
}

interface FilterSidebarProps {
  category: 'saree' | 'kurti';
  isOpen?: boolean;
  onClose?: () => void;
}

export default function FilterSidebar({ category, isOpen, onClose }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [sections, setSections] = useState<FilterSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDynamicFilters = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/filters/${category}`);
        
        const dynamicSections: FilterSection[] = [];

        if (data.colors && data.colors.length > 0) {
          dynamicSections.push({
            id: 'color',
            name: 'Color Name',
            options: data.colors.map((c: string) => ({ label: c, value: c }))
          });
        }

        if (data.fabrics && data.fabrics.length > 0) {
          dynamicSections.push({
            id: 'fabric',
            name: 'Fabric',
            options: data.fabrics.map((f: string) => ({ label: f, value: f }))
          });
        }

        if (data.occasions && data.occasions.length > 0) {
          dynamicSections.push({
            id: 'occasion',
            name: 'Occasion',
            options: data.occasions.map((o: string) => ({ label: o, value: o }))
          });
        }

        if (category === 'kurti' && data.kurtiTypes && data.kurtiTypes.length > 0) {
          dynamicSections.push({
            id: 'kurtiType',
            name: 'Style/Type',
            options: data.kurtiTypes.map((t: string) => ({ label: t, value: t }))
          });
        }

        const finalSections = [
          ...dynamicSections,
          {
            id: 'priceRange',
            name: 'Price Range',
            options: [
              { label: 'Under ₹2000', value: '0-2000' },
              { label: '₹2000 - ₹5000', value: '2000-5000' },
              { label: 'Over ₹5000', value: '5000-100000' },
            ],
          }
        ];

        setSections(finalSections);
        setExpandedSections(finalSections.map(s => s.id));
      } catch (error) {
        console.error('Error fetching filters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicFilters();
  }, [category]);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (sectionId: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (sectionId === 'priceRange') {
      const currentMin = params.get('minPrice');
      const currentMax = params.get('maxPrice');
      const [min, max] = value.split('-');
      
      if (currentMin === min && currentMax === max) {
        params.delete('minPrice');
        params.delete('maxPrice');
      } else {
        params.set('minPrice', min);
        params.set('maxPrice', max);
      }
    } else {
      const currentValues = params.get(sectionId)?.split(',') || [];
      if (currentValues.includes(value)) {
        const newValues = currentValues.filter(v => v !== value);
        if (newValues.length === 0) params.delete(sectionId);
        else params.set(sectionId, newValues.join(','));
      } else {
        params.set(sectionId, [...currentValues, value].join(','));
      }
    }
    
    params.set('page', '1');
    router.push(`/${category}?${params.toString()}`);
  };

  const isSelected = (sectionId: string, value: string) => {
    if (sectionId === 'priceRange') {
      const [min, max] = value.split('-');
      return searchParams.get('minPrice') === min && searchParams.get('maxPrice') === max;
    }
    return searchParams.get(sectionId)?.split(',').includes(value);
  };

  return (
    <aside className={cn(
      "fixed inset-0 z-40 bg-white lg:static lg:block lg:w-64 lg:z-auto transition-transform duration-300 transform",
      isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      <div className="h-full overflow-y-auto px-4 py-6 lg:py-0 border-r border-gray-200">
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={onClose} className="p-2">
            <X size={24} />
          </button>
        </div>

        <div className="hidden lg:block mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b pb-4">Filters</h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-pink-600" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Loading Filters...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.id} className="border-b border-gray-100 pb-6 last:border-0">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center justify-between py-2 text-sm font-semibold text-gray-900 hover:text-pink-600 transition-colors"
                >
                  <span className="uppercase tracking-widest text-xs">{section.name}</span>
                  {expandedSections.includes(section.id) ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                
                {expandedSections.includes(section.id) && (
                  <div className="mt-4 space-y-3">
                    {section.options.map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={isSelected(section.id, option.value) || false}
                          onChange={() => handleFilterChange(section.id, option.value)}
                          className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors uppercase tracking-tight">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8 lg:hidden">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-gray-900 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl shadow-xl active:scale-[0.98] transition-all"
          >
            Apply Selection
          </button>
        </div>
      </div>
    </aside>
  );
}
