import React, { useState } from 'react';
import { X, Search, ShoppingCart, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import DefaultMangoLogo from './DefaultMangoLogo';

export default function SearchModal({ isOpen, onClose, onOrderClick, onAddToCart }) {
  const { products = [], categories = [] } = useWebsite();
  const [query, setQuery] = useState('');
  const [addedProductId, setAddedProductId] = useState(null);

  if (!isOpen) return null;

  const trimmedQuery = query.trim().toLowerCase();

  // Filter products ONLY when query is entered
  const filteredProducts = trimmedQuery === ''
    ? []
    : products.filter((product) => {
        const nameMatch = product.name?.toLowerCase().includes(trimmedQuery);
        const nameEnMatch = product.nameEn?.toLowerCase().includes(trimmedQuery);
        const originMatch = product.origin?.toLowerCase().includes(trimmedQuery);
        const tagMatch = product.tag?.toLowerCase().includes(trimmedQuery);
        const descMatch = product.description?.toLowerCase().includes(trimmedQuery);

        const catObj = categories.find((c) => c.id === product.category);
        const catNameMatch = catObj ? catObj.name.toLowerCase().includes(trimmedQuery) : false;

        return nameMatch || nameEnMatch || originMatch || tagMatch || descMatch || catNameMatch;
      });

  const handleAddToCartClick = (e, product) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
      setAddedProductId(product.id);
      setTimeout(() => setAddedProductId(null), 1500);
    }
  };

  const handleOrderNowClick = (e, product) => {
    e.stopPropagation();
    onClose();
    if (onOrderClick) {
      onOrderClick(product);
    }
  };

  const quickKeywords = [
    ...categories.map(c => c.name),
    'রাজশাহী',
    'চাঁপাইনবাবগঞ্জ'
  ].filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-4 pt-12 sm:pt-20 animate-fadeIn">
      <div className="relative bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[85vh] text-left">
        
        {/* Search Input Bar */}
        <div className="p-3.5 sm:p-4 border-b border-gray-100 flex items-center gap-3 bg-white sticky top-0 z-10">
          <div className="w-9 h-9 rounded-full bg-[#EAF8E5] flex items-center justify-center shrink-0">
            <Search size={18} className="text-[#087F23]" />
          </div>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="আমের নাম খুঁজুন (যেমন: হিমসাগর, ল্যাংড়া, খিরসাপাত)..."
            className="flex-1 text-sm sm:text-base outline-none text-gray-800 placeholder-gray-400 bg-transparent font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 text-xs transition-colors cursor-pointer"
              title="মুছে ফেলুন"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={() => {
              setQuery('');
              onClose();
            }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            title="বন্ধ করুন"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto flex-1">
          {/* STATE 1: Before searching (query is empty) -> NO product shapes! */}
          {trimmedQuery === '' ? (
            <div className="py-6 px-2 text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#EAF8E5] flex items-center justify-center text-[#087F23]">
                <Search size={24} />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-gray-800">
                আমের নাম বা জাত লিখে সার্চ করুন
              </h4>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                সার্চ বক্সে যেকোনো আমের নাম বা জেলা লিখলে কালেকশন থেকে ফলাফল দেখাবে।
              </p>

              {/* Quick Keywords for 1-Click Search */}
              {quickKeywords.length > 0 && (
                <div className="mt-6 text-left max-w-md mx-auto border-t border-gray-100 pt-4">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-[#087F23]" />
                    <span>জনপ্রিয় আমের নামসমূহ (ক্লিক করে সার্চ করুন):</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {quickKeywords.slice(0, 10).map((kw, i) => (
                      <button
                        key={i}
                        onClick={() => setQuery(kw)}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 hover:bg-[#EAF8E5] hover:text-[#087F23] text-gray-700 transition-colors cursor-pointer"
                      >
                        {kw}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* STATE 2: After user searches (query entered) -> Matching product shapes appear! */
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs pb-1">
                <span className="font-bold text-gray-500 uppercase tracking-wider">
                  খোঁজার ফলাফল ({filteredProducts.length}টি আম পাওয়া গেছে)
                </span>
                <button
                  onClick={() => setQuery('')}
                  className="text-[#087F23] hover:underline font-semibold cursor-pointer"
                >
                  সার্চ মুছুন
                </button>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-10 px-4 bg-gray-50/70 rounded-xl border border-dashed border-gray-200">
                  <p className="text-sm font-semibold text-gray-700">
                    দুঃখিত, "${query}" নামে কোনো আম খুঁজে পাওয়া যায়নি।
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    বানানটি যাচাই করুন অথবা অন্যান্য জনপ্রিয় জাত লিখে চেষ্টা করুন।
                  </p>
                </div>
              ) : (
                filteredProducts.map((product) => {
                  const isJustAdded = addedProductId === product.id;
                  return (
                    <div
                      key={product.id}
                      className="flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-xl border border-gray-100 hover:border-[#087F23]/40 hover:bg-[#F4FBF2] transition-all group"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200/70 shadow-2xs">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-emerald-50">
                              <DefaultMangoLogo className="w-8 h-8" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-[#087F23] transition-colors truncate">
                              {product.name}
                            </h4>
                            {product.tag && (
                              <span className="bg-[#F6C928] text-gray-900 font-bold text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded shrink-0">
                                {product.tag}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500 flex-wrap">
                            {product.origin && (
                              <span className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] text-gray-600 font-medium">
                                📍 {product.origin}
                              </span>
                            )}
                            <span className="font-bold text-[#087F23] text-xs sm:text-[13px]">
                              {product.pricePerKg ? `${product.pricePerKg} ৳/কেজি` : `${product.priceMin}৳ - ${product.priceMax}৳`}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons: Add to Bag and Order */}
                      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                        {onAddToCart && (
                          <button
                            onClick={(e) => handleAddToCartClick(e, product)}
                            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                              isJustAdded
                                ? 'bg-emerald-100 text-[#087F23]'
                                : 'bg-gray-100 hover:bg-[#EAF8E5] text-gray-700 hover:text-[#087F23]'
                            }`}
                            title="শপিং ব্যাগে যোগ করুন"
                          >
                            {isJustAdded ? <Check size={14} className="text-[#087F23]" /> : <ShoppingBag size={14} />}
                            <span className="hidden sm:inline">{isJustAdded ? 'যোগ হয়েছে' : '+ ব্যাগ'}</span>
                          </button>
                        )}

                        <button
                          onClick={(e) => handleOrderNowClick(e, product)}
                          className="bg-[#087F23] hover:bg-[#006B18] text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow transition-all group-hover:scale-[1.02] cursor-pointer"
                        >
                          <span>অর্ডার</span>
                          <ShoppingCart size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
