'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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

const SAREE_FILTERS: FilterSection[] = [
  {
    id: 'fabric',
    name: 'Fabric',
    options: [
      { label: 'Cotton', value: 'cotton' },
      { label: 'Silk', value: 'silk' },
      { label: 'Georgette', value: 'georgette' },
      { label: 'Chiffon', value: 'chiffon' },
      { label: 'Linen', value: 'linen' },
      { label: 'Organza', value: 'organza' },
    ],
  },
  {
    id: 'work',
    name: 'Work',
    options: [
      { label: 'Zari', value: 'zari' },
      { label: 'Embroidery', value: 'embroidery' },
      { label: 'Printed', value: 'printed' },
      { label: 'Stone Work', value: 'stone-work' },
    ],
  },
  {
    id: 'occasion',
    name: 'Occasion',
    options: [
      { label: 'Wedding', value: 'wedding' },
      { label: 'Party', value: 'party' },
      { label: 'Casual', value: 'casual' },
      { label: 'Festive', value: 'festive' },
    ],
  },
  {
    id: 'blouseIncluded',
    name: 'Blouse Included',
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
  },
];

const KURTI_FILTERS: FilterSection[] = [
  {
    id: 'fabric',
    name: 'Fabric',
    options: [
      { label: 'Cotton', value: 'cotton' },
      { label: 'Rayon', value: 'rayon' },
      { label: 'Silk', value: 'silk' },
      { label: 'Linen', value: 'linen' },
    ],
  },
  {
    id: 'kurtiType',
    name: 'Type',
    options: [
      { label: 'A Line', value: 'a-line' },
      { label: 'Straight', value: 'straight' },
      { label: 'Anarkali', value: 'anarkali' },
      { label: 'Short', value: 'short' },
      { label: 'Long', value: 'long' },
    ],
  },
  {
    id: 'sleeveType',
    name: 'Sleeve Type',
    options: [
      { label: 'Half', value: 'half' },
      { label: 'Full', value: 'full' },
      { label: 'Sleeveless', value: 'sleeveless' },
    ],
  },
  {
    id: 'neckType',
    name: 'Neck Type',
    options: [
      { label: 'Round', value: 'round' },
      { label: 'V Neck', value: 'v-neck' },
      { label: 'Collar', value: 'collar' },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { label: 'S', value: 'S' },
      { label: 'M', value: 'M' },
      { label: 'L', value: 'L' },
      { label: 'XL', value: 'XL' },
      { label: 'XXL', value: 'XXL' },
    ],
  },
];

const COMMON_FILTERS: FilterSection[] = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'Pink', value: 'pink' },
      { label: 'Black', value: 'black' },
      { label: 'White', value: 'white' },
    ],
  },
  {
    id: 'priceRange',
    name: 'Price Range',
    options: [
      { label: 'Under ₹1000', value: '0-1000' },
      { label: '₹1000 - ₹2000', value: '1000-2000' },
      { label: '₹2000 - ₹5000', value: '2000-5000' },
      { label: 'Over ₹5000', value: '5000-100000' },
    ],
  },
];

export default function FilterSidebar({ category, isOpen, onClose }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const sections = category === 'saree' 
    ? [...SAREE_FILTERS, ...COMMON_FILTERS] 
    : [...KURTI_FILTERS, ...COMMON_FILTERS];

  useEffect(() => {
    // Expand all sections by default on desktop
    setExpandedSections(sections.map(s => s.id));
  }, [category]);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (sectionId: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (sectionId === 'priceRange') {
      const [min, max] = value.split('-');
      params.set('minPrice', min);
      params.set('maxPrice', max);
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

        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="border-b border-gray-100 pb-6 last:border-0">
              <button
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center justify-between py-2 text-sm font-semibold text-gray-900 hover:text-pink-600 transition-colors"
              >
                <span>{section.name}</span>
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
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 lg:hidden">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-pink-600 text-white font-bold rounded-lg"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </aside>
  );
}
