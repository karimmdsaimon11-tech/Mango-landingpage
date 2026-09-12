import React from 'react';
import { Leaf, Sparkles, Truck, Award } from 'lucide-react';

export default function TrustSection() {
  const features = [
    {
      icon: <Leaf className="w-6 h-6 text-[#087F23]" />,
      emoji: '🍃',
      title: 'সরাসরি বাগান থেকে',
      desc: 'রাজশাহী ও চাঁপাইনবাবগঞ্জের নির্দিষ্ট বাগান থেকে সরাসরি গাছপাকা আম সংগ্রহ করা হয়।',
      enDesc: 'Fresh mango collected directly from selected farms.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#087F23]" />,
      emoji: '🥭',
      title: '১০০% ফ্রেশ ও ফরমালিন মুক্ত',
      desc: 'কোনোরকম বিষাক্ত কেমিক্যাল ছাড়াই সম্পূর্ণ প্রাকৃতিক উপায়ে সংরক্ষিত ও পরিপক্ক।',
      enDesc: 'Freshly harvested and carefully selected.'
    },
    {
      icon: <Truck className="w-6 h-6 text-[#087F23]" />,
      emoji: '🚚',
      title: 'দ্রুত হোম ডেলিভারি',
      desc: 'সারা বাংলাদেশে দ্রুত ও নিরাপদ ডেলিভারির মাধ্যমে পৌঁছে দেওয়া হয় একদম তাজা।',
      enDesc: 'Fast and safe delivery across Bangladesh.'
    },
    {
      icon: <Award className="w-6 h-6 text-[#087F23]" />,
      emoji: '⭐',
      title: 'প্রিমিয়াম কোয়ালিটি',
      desc: 'শুধুমাত্র গ্রেড-১ মানের বড়, মিষ্টি ও নিখুঁত সাইজের আম প্যাকিং করা হয়।',
      enDesc: 'Only selected quality mangoes.'
    }
  ];

  return (
    <section id="about" className="py-8 px-4 sm:px-6 bg-white">
      <div className="max-w-[1120px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block text-xs font-bold text-[#087F23] bg-[#EAF8E5] px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            আমাদের বিশেষত্ব
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#222222]">
            কেন আমাদের আম?
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            আমরা নিশ্চিত করি সরাসরি বাগান থেকে ফ্রেশ, মিষ্টি এবং শতভাগ ক্ষতিকর কেমিক্যালমুক্ত আম আপনার খাবার টেবিলে।
          </p>
        </div>

        {/* 4 Feature Cards with Light Green Background (#EAF8E5) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#EAF8E5] hover:bg-[#d8f2d0] rounded-xl p-5 border border-[#087F23]/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-md text-left flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-xs border border-[#087F23]/10 mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">{item.emoji}</span>
                </div>
                <h3 className="text-lg font-bold text-[#006B18] mb-1.5 group-hover:text-[#087F23] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#087F23]/10 text-[11px] text-[#087F23] font-medium">
                {item.enDesc}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
