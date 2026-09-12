import React, { useState } from 'react';
import { X, Search, ShoppingCart, ArrowRight } from 'lucide-react';
import { MANGO_PRODUCTS } from '../data/mangoData';

export default function SearchModal({ isOpen, onClose, onOrderClick }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim() === ''
    ? MANGO_PRODUCTS.slice(0, 4)
    : MANGO_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.nameEn.toLowerCase().includes(query.toLowerCase()) ||
        p.origin.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div className="relative bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-100 animate-fadeIn text-left">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Search size={20} className="text-[#087F23]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="আমের নাম খুঁজুন (যেমন: হিমসাগর, হাঁড়িভাঙা, ল্যাংড়া)..."
            className="flex-1 text-sm sm:text-base outline-none text-gray-800 placeholder-gray-400"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Results */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-3">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            {query.trim() === '' ? 'জনপ্রিয় আমের জাতসমূহ' : `খোঁজার ফলাফল (${results.length})`}
          </div>

          {results.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-xs">
              দুঃখিত, এই নামে কোনো আম খুঁজে পাওয়া যায়নি।
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 hover:border-[#087F23]/30 hover:bg-[#F4FBF2] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                  />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      {product.origin} • {product.pricePerKg} ৳/কেজি
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOrderClick(product);
                  }}
                  className="bg-[#087F23] hover:bg-[#006B18] text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-xs"
                >
                  <span>অর্ডার</span>
                  <ShoppingCart size={12} />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
