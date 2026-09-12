import React from 'react';
import { Leaf, Truck, ShieldCheck, Headphones } from 'lucide-react';

export default function TrustStrip() {
  const items = [
    {
      title: 'খাঁটি অর্গানিক আম',
      subtitle: '১০০% রাসায়নিক ও ফরমালিন মুক্ত',
      icon: <Leaf className="w-5 h-5 text-[#F6C928]" />
    },
    {
      title: 'দ্রুত ডেলিভারি',
      subtitle: 'সরাসরি বাগান থেকে দ্রুত হোম ডেলিভারি',
      icon: <Truck className="w-5 h-5 text-[#F6C928]" />
    },
    {
      title: 'নিরাপদ পেমেন্ট',
      subtitle: '১০০% ক্যাশ অন ডেলিভারি ব্যবস্থা',
      icon: <ShieldCheck className="w-5 h-5 text-[#F6C928]" />
    },
    {
      title: 'সহজ সাপোর্ট',
      subtitle: 'যেকোনো সহায়তায় ২৪/৭ আমরা প্রস্তুত',
      icon: <Headphones className="w-5 h-5 text-[#F6C928]" />
    }
  ];

  return (
    <div className="bg-[#006B18] text-white py-6 px-4 sm:px-6 border-b border-white/10">
      <div className="max-w-[1120px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0 border border-white/20">
              {item.icon}
            </div>
            <div className="text-left">
              <h4 className="font-bold text-sm text-white leading-snug">
                {item.title}
              </h4>
              <p className="text-[11px] text-emerald-100/80 leading-tight mt-0.5">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
