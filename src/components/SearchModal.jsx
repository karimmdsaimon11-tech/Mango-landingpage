import React, { useState } from 'react';
import { X, Search, ShoppingCart, ShoppingBag, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import DefaultMangoLogo from './DefaultMangoLogo';

export default function SearchModal({ isOpen, onClose, onOrderClick, onAddToCart }) {
  const { products = [], categories = [] } = useWebsite();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [addedProductId, setAddedProductId] = useState(null);

  if (!isOpen) return null;

  // Filter products based on selectedCategory and query
  const filteredProducts = products.filter((product) => {
    // Category match
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // Query match
    if (!query.trim()) return true;

    const q = query.toLowerCase().trim();
    const nameMatch = product.name?.toLowerCase().includes(q);
    const nameEnMatch = product.nameEn?.toLowerCase().includes(q);
    const originMatch = product.origin?.toLowerCase().includes(q);
    const tagMatch = product.tag?.toLowerCase().includes(q);
    const descMatch = product.description?.toLowerCase().includes(q);

    const catObj = categories.find((c) => c.id === product.category);
    const catNameMatch = catObj ? catObj.name.toLowerCase().includes(q) : false;

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

  const handleGoToCollection = () => {
    onClose();
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-4 pt-12 sm:pt-20 animate-fadeIn">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[88vh] text-left">
        
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
            placeholder="আমের নাম, জাত বা জেলা দিয়ে খুঁজুন (যেমন: হিমসাগর, ল্যাংড়া, রাজশাহী)..."
            className="flex-1 text-sm sm:text-base outline-none text-gray-800 placeholder-gray-400 bg-transparent font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 text-xs transition-colors"
              title="মুছে ফেলুন"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            title="বন্ধ করুন"
          >
            <X size={20} />
          </button>
        </div>

        {/* Category Pills Bar */}
        <div className="px-3.5 py-2.5 bg-gray-50/80 border-b border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#087F23] text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-200/70 border border-gray-200/60'
            }`}
          >
            সকল আম ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter(p => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#087F23] text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:bg-gray-200/70 border border-gray-200/60'
                }`}
              >
                {cat.name} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>

        {/* Results Info Subheader */}
        <div className="px-4 pt-3 pb-1.5 flex items-center justify-between text-xs shrink-0">
          <div className="font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#087F23]" />
            <span>
              {query.trim() === ''
                ? selectedCategory === 'all'
                  ? `আমের সেরা কালেকশন (${filteredProducts.length}টি পণ্য)`
                  : `${categories.find(c => c.id === selectedCategory)?.name || ''} কালেকশন (${filteredProducts.length}টি পণ্য)`
                : `খোঁজার ফলাফল (${filteredProducts.length}টি পণ্য)`}
            </span>
          </div>
          {(query.trim() !== '' || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setQuery('');
                setSelectedCategory('all');
              }}
              className="text-[#087F23] hover:underline font-semibold cursor-pointer"
            >
              সব আম রিসেট করুন
            </button>
          )}
        </div>

        {/* Search / Collection Results List */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-2.5 flex-1 divide-y divide-gray-50">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <Search size={26} />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-gray-800">
                দুঃখিত, কোনো আম পাওয়া যায়নি!
              </h4>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                {query.trim() ? `"${query}" নামে কোনো আম খুঁজে পাওয়া যায়নি। বানান ঠিক আছে কিনা যাচাই করুন।` : 'এই ক্যাটাগরিতে বর্তমানে কোনো আম নেই।'}
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 inline-flex items-center gap-1.5 bg-[#087F23] hover:bg-[#006B18] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                <span>সকল কালেকশন দেখুন</span>
              </button>
            </div>
          ) : (
            filteredProducts.map((product) => {
              const isJustAdded = addedProductId === product.id;
              const catName = categories.find(c => c.id === product.category)?.name || product.category;
              return (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-xl border border-gray-100 hover:border-[#087F23]/40 hover:bg-[#F4FBF2]/60 transition-all group pt-3"
                >
                  {/* Thumbnail & Meta */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200/70 shadow-2xs">
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

                      {product.nameEn && (
                        <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                          {product.nameEn}
                        </p>
                      )}

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500 flex-wrap">
                        {product.origin && (
                          <span className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] text-gray-600 font-medium">
                            📍 {product.origin}
                          </span>
                        )}
                        {catName && (
                          <span className="text-gray-400">
                            জাত: {catName}
                          </span>
                        )}
                        <span className="font-bold text-[#087F23] text-xs sm:text-[13px]">
                          {product.pricePerKg ? `${product.pricePerKg} ৳/কেজি` : `${product.priceMin}৳ - ${product.priceMax}৳`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
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
                        <span className="hidden md:inline">{isJustAdded ? 'যোগ হয়েছে' : '+ ব্যাগ'}</span>
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

        {/* Bottom Strip: Jump to Main Page Collection */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600 shrink-0">
          <span className="hidden sm:inline">ওয়েবসাইটে সব আম একসাথে দেখতে চান?</span>
          <button
            onClick={handleGoToCollection}
            className="inline-flex items-center gap-1.5 font-bold text-[#087F23] hover:text-[#006B18] hover:underline ml-auto cursor-pointer"
          >
            <span>আম কালেকশনে যান</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </div>
  );
}
