import React from 'react';
import { ShoppingCart, Star, MapPin } from 'lucide-react';

export default function ProductCard({ product, onOrderClick, onAddToCart }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group text-left">
      
      {/* Product Image */}
      <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Origin / Quality Badge */}
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-[#087F23] font-semibold text-[10px] px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
          <MapPin size={10} />
          <span>{product.origin}</span>
        </div>

        {/* Tag badge */}
        {product.tag && (
          <div className="absolute top-2 right-2 bg-[#F6C928] text-gray-900 font-bold text-[10px] px-1.5 py-0.5 rounded shadow-xs">
            {product.tag}
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-grow justify-between">
        
        <div>
          {/* Title */}
          <h3 className="font-bold text-gray-900 text-sm sm:text-[15px] leading-snug line-clamp-1 group-hover:text-[#087F23] transition-colors">
            {product.name}
          </h3>
          
          {/* English Subtitle / Variety */}
          <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
            {product.nameEn}
          </p>

          {/* Star Rating and Review Count */}
          <div className="flex items-center justify-between mt-2 mb-2">
            <div className="flex items-center gap-0.5 text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-current" />
              ))}
            </div>
            <span className="text-[10px] text-gray-400 font-medium">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Price and CTA Button */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-baseline justify-between mb-2">
            <div className="text-sm sm:text-base font-bold text-gray-900">
              {product.priceMin}৳ – {product.priceMax}৳
            </div>
            <span className="text-[10px] text-gray-500">
              {product.minOrder}
            </span>
          </div>

          {/* Screenshot-Matched Button: "অর্ডার করুন" + Right Cart Icon */}
          <button
            onClick={() => onOrderClick(product)}
            className="w-full bg-[#087F23] hover:bg-[#006B18] text-white text-xs font-semibold py-2 px-3 rounded flex items-center justify-between transition-colors shadow-xs group-hover:shadow"
          >
            <span className="font-bold">অর্ডার করুন</span>
            <div className="bg-[#006B18] group-hover:bg-[#044c12] p-1 rounded transition-colors">
              <ShoppingCart size={13} className="text-white" />
            </div>
          </button>
        </div>

      </div>
    </div>
  );
}
