import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { MANGO_CATEGORIES } from '../data/mangoData';
import { useWebsite } from '../context/WebsiteContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function MangoCollection({ onOrderClick, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const { products } = useWebsite();

  const himsagarProducts = products.filter(p => p.category === 'himsagar');
  const haribhangaProducts = products.filter(p => p.category === 'haribhanga');
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
          {MANGO_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#087F23] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-[#EAF8E5] hover:text-[#087F23]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* View Mode */}
        {activeCategory === 'all' ? (
          <div className="space-y-10">
            
            {/* 1. HIMSAGAR CATEGORY BLOCK */}
            {himsagarProducts.length > 0 && (
              <div>
                <div className="flex items-center justify-between bg-white border-b-2 border-[#087F23] pb-2 mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#087F23] flex items-center gap-2">
                    <span>হিমসাগর আম</span>
                    <span className="text-xs font-normal text-gray-500 hidden sm:inline">(মিষ্টি ও সুগন্ধি)</span>
                  </h3>
                  <button
                    onClick={() => setActiveCategory('himsagar')}
                    className="bg-[#087F23] hover:bg-[#006B18] text-white text-[11px] font-bold px-3 py-1 rounded tracking-wider uppercase transition-colors"
                  >
                    VIEW ALL
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {himsagarProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOrderClick={onOrderClick}
                      onAddToCart={onAddToCart}
                    />
                  ))}
                </div>

                <div className="text-center mt-6">
                  <button
                    onClick={() => setActiveCategory('himsagar')}
                    className="bg-[#087F23] hover:bg-[#006B18] text-white text-xs font-semibold px-6 py-2 rounded shadow-xs hover:shadow transition-all inline-flex items-center gap-1.5"
                  >
                    <span>View Product</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}

            {/* 2. HARIBHANGA CATEGORY BLOCK */}
            {haribhangaProducts.length > 0 && (
              <div>
                <div className="flex items-center justify-between bg-white border-b-2 border-[#087F23] pb-2 mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#087F23] flex items-center gap-2">
                    <span>হাঁড়িভাঙা আম</span>
                    <span className="text-xs font-normal text-gray-500 hidden sm:inline">(রসালো ও সুস্বাদু)</span>
                  </h3>
                  <button
                    onClick={() => setActiveCategory('haribhanga')}
                    className="bg-[#087F23] hover:bg-[#006B18] text-white text-[11px] font-bold px-3 py-1 rounded tracking-wider uppercase transition-colors"
                  >
                    VIEW ALL
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {haribhangaProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOrderClick={onOrderClick}
                      onAddToCart={onAddToCart}
                    />
                  ))}
                </div>

                <div className="text-center mt-6">
                  <button
                    onClick={() => setActiveCategory('haribhanga')}
                    className="bg-[#087F23] hover:bg-[#006B18] text-white text-xs font-semibold px-6 py-2 rounded shadow-xs hover:shadow transition-all inline-flex items-center gap-1.5"
                  >
                    <span>View Product</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* Filtered View */
          <div>
            <div className="flex items-center justify-between border-b-2 border-[#087F23] pb-2 mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-[#087F23]">
                {MANGO_CATEGORIES.find(c => c.id === activeCategory)?.name || 'আম কালেকশন'}
              </h3>
              <button
                onClick={() => setActiveCategory('all')}
                className="text-xs font-semibold text-[#087F23] hover:underline"
              >
                ← সব আম দেখুন
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOrderClick={onOrderClick}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
