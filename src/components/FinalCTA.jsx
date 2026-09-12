import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';

export default function FinalCTA({ onOrderClick }) {
  const { finalCta } = useWebsite();

  return (
    <section className="py-14 px-4 sm:px-6 bg-gradient-to-b from-white to-[#EAF8E5]/50">
      <div className="max-w-[1120px] mx-auto">
        <div className="bg-[#087F23] rounded-2xl text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F6C928]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#006B18]/60 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-white/20 text-[#F6C928] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
              <Sparkles size={14} />
              <span>{finalCta.badge || 'ফ্রেশ আমের সেরা ঠিকানা'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {finalCta.title}
            </h2>

            <p className="text-sm sm:text-base text-emerald-100 max-w-lg mx-auto">
              {finalCta.description}
            </p>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => onOrderClick(null)}
                className="bg-[#F6C928] hover:bg-[#eab915] text-gray-950 font-extrabold text-base sm:text-lg px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 group"
              >
                <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                <span>{finalCta.buttonText || 'অর্ডার করুন'}</span>
              </button>
            </div>

            <p className="text-xs text-emerald-200/90 pt-2">
              {finalCta.guaranteeText || '✓ ক্যাশ অন ডেলিভারি সুবিধা | ✓ দেশব্যাপী হোম ডেলিভারি | ✓ গ্যারান্টিযুক্ত মিষ্টতা'}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
