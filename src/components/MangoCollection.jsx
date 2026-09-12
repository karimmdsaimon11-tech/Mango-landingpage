import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { useWebsite } from '../context/WebsiteContext';
import { Sparkles } from 'lucide-react';

export default function MangoCollection({ onOrderClick, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const { products, categories = [] } = useWebsite();

  const categoryPills = [
    { id: 'all', name: 'সকল আম' },
    ...categories
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="collection" className="py-8 px-3 sm:px-6 bg-white">
      <div className="max-w-[1120px] mx-auto">
        
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-[#087F23] bg-[#EAF8E5] px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Sparkles size={13} />
            <span>সিজনের সেরা ফল</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#222222]">
            আমের সেরা কালেকশন
          </h2>
          <p className="text-sm text-gray-600 mt-1.5">
            আপনার পছন্দের তাজা ও মিষ্টি আম বেছে নিন সরাসরি রাজশাহী ও চাঁপাইনবাবগঞ্জের বাগান থেকে
          </p>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 mb-6 gap-2 no-scrollbar">
          {categoryPills.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#087F23] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-[#EAF8E5] hover:text-[#087F23]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Single Unified Grid Layer */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 animate-fadeIn">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOrderClick={onOrderClick}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-600 text-sm font-semibold">
              এই ক্যাটাগরিতে বর্তমানে কোনো আম তালিকাভুক্ত নেই।
            </p>
            <p className="text-xs text-gray-400 mt-1 mb-4">
              অন্যান্য ক্যাটাগরি দেখতে পারেন অথবা সব আম দেখুন।
            </p>
            <button
              onClick={() => setActiveCategory('all')}
              className="bg-[#087F23] hover:bg-[#006B18] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
            >
              সকল আম দেখুন
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
