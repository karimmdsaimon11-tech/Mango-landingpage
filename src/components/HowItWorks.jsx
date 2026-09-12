import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/mangoData';
import { CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section id="services" className="py-12 px-4 sm:px-6 bg-[#F4FBF2]">
      <div className="max-w-[1120px] mx-auto text-center">
        
        {/* Header */}
        <span className="inline-block text-xs font-bold text-[#087F23] bg-[#EAF8E5] px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          সহজ প্রক্রিয়া
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#222222] mb-2">
          কীভাবে অর্ডার করবেন?
        </h2>
        <p className="text-sm text-gray-600 max-w-lg mx-auto mb-10">
          মাত্র ৩টি সহজ ধাপে ঘরে বসেই রাজশাহী ও চাঁপাইনবাবগঞ্জের সেরা ফ্রেশ আম অর্ডার করুন।
        </p>

        {/* 3 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-[#087F23]/20 z-0" />

          {HOW_IT_WORKS_STEPS.map((item, idx) => (
            <div
              key={idx}
              className="relative z-10 bg-white rounded-xl p-6 shadow-xs border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow group"
            >
              {/* Numbered Green Circle */}
              <div className="w-16 h-16 rounded-full bg-[#087F23] text-white flex items-center justify-center font-black text-xl mb-4 shadow-md group-hover:scale-110 transition-transform ring-4 ring-[#EAF8E5]">
                {item.step}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
