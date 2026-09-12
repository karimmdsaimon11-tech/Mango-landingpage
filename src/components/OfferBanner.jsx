import React from 'react';
import { ShoppingCart, Flame, Clock } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';

export default function OfferBanner({ onOrderClick }) {
  const { offerBanner } = useWebsite();

  return (
    <section className="py-6 px-3 sm:px-6">
      <div className="max-w-[1120px] mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#006B18] via-[#087F23] to-[#F59E0B] text-white p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#F6C928]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text */}
          <div className="text-left max-w-xl z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-[#F6C928] text-gray-900 text-xs font-black px-3 py-1 rounded-full shadow-xs uppercase tracking-wider">
              <Flame size={14} className="text-red-600 fill-current" />
              <span>{offerBanner.tag}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              {offerBanner.title}
            </h2>

            <p className="text-sm sm:text-base text-emerald-50 leading-relaxed">
              {offerBanner.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOrderClick(null)}
                className="bg-[#F6C928] hover:bg-[#eab915] text-gray-950 font-bold px-7 py-3 rounded-full text-sm sm:text-base flex items-center gap-2 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <ShoppingCart size={18} className="text-gray-950" />
                <span>{offerBanner.ctaText}</span>
              </button>
              
              <div className="flex items-center gap-1.5 text-xs text-emerald-100 font-medium bg-black/20 px-3 py-2 rounded-full backdrop-blur-xs">
                <Clock size={14} className="text-[#F6C928]" />
                <span>আজকের জন্য প্রযোজ্য</span>
              </div>
            </div>
          </div>

          {/* Right Mango Visual */}
          <div className="relative z-10 w-full md:w-auto flex justify-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src={offerBanner.image}
                alt={offerBanner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="bg-[#087F23] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  {offerBanner.cashbackText || '১০% অতিরিক্ত ক্যাশব্যাক'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
