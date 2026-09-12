import React from 'react';
import { ShoppingCart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';

export default function Hero({ onOrderClick }) {
  const { heroConfig } = useWebsite();

  return (
    <section id="home" className="pt-3 pb-8 px-3 sm:px-6">
      <div className="max-w-[1120px] mx-auto">
        {/* Main Hero Container with Green-Yellow Orchard Theme */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#035315] via-[#087F23] to-[#2E8B3D] text-white shadow-xl min-h-[460px] md:min-h-[500px] flex items-center">
          
          {/* Subtle decorative background circles and leaf pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(246,201,40,0.18),transparent_60%)] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#006B18]/40 blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#F6C928]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-10 lg:p-12">
            
            {/* Left Content (Matches Screenshot Typography & Structure) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-4 sm:space-y-5">
              
              {/* Mango Brand Logo inside Hero */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs border border-white/20">
                <span className="text-sm">🍃</span>
                <span className="text-xs font-semibold tracking-wide text-[#F6C928]">{heroConfig.badge}</span>
              </div>

              {/* Main Heading in Bold White Bengali font */}
              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-white leading-[1.18] tracking-tight drop-shadow-md">
                {heroConfig.title}
              </h1>

              {/* Subtitle in Warm Mango Golden Yellow */}
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F6C928] tracking-normal drop-shadow-xs">
                {heroConfig.subtitle}
              </div>

              {/* Supporting Bengali Paragraph */}
              <p className="text-sm sm:text-base text-emerald-50/95 max-w-xl leading-relaxed font-normal">
                {heroConfig.description}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <button
                  onClick={() => onOrderClick(null)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#006B18] hover:bg-[#044c12] text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-lg border-2 border-[#F6C928]/40 hover:border-[#F6C928] transition-all transform hover:-translate-y-0.5 active:translate-y-0 group animate-soft-pulse"
                >
                  <ShoppingCart size={20} className="text-[#F6C928] group-hover:scale-110 transition-transform" />
                  <span>{heroConfig.ctaText}</span>
                </button>

                <a
                  href="#collection"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 border border-white/30 backdrop-blur-xs transition-all"
                >
                  <span>{heroConfig.secondaryCtaText}</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* 3 Small Trust Indicators */}
              <div className="pt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-white/95">
                {(heroConfig.trustBadges || ['১০০% ফ্রেশ', 'সরাসরি বাগান থেকে', 'নিরাপদ ডেলিভারি']).map((badge, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/10">
                    <CheckCircle2 size={14} className="text-[#F6C928]" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Side: Realistic Juicy Mangoes Display */}
            <div className="lg:col-span-5 relative flex justify-center items-center mt-4 lg:mt-0">
              <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
                
                {/* Radiant Glow */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#F6C928]/40 via-[#F59E0B]/30 to-emerald-400/20 blur-2xl transform scale-95 pointer-events-none" />

                {/* Main Mango Composition Image */}
                <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl group">
                  <img
                    src={heroConfig.image}
                    alt={heroConfig.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Mango Quality Badge */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md text-[#222222] p-2.5 rounded-xl flex items-center justify-between shadow-lg border border-white">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🥭</span>
                      <div className="text-left">
                        <p className="text-xs font-bold text-[#087F23] leading-tight">গাছপাকা প্রিমিয়াম আম</p>
                        <p className="text-[10px] text-gray-500">মিষ্টি, সুগন্ধি ও ফরমালিন মুক্ত</p>
                      </div>
                    </div>
                    <div className="bg-[#EAF8E5] text-[#087F23] font-bold text-xs px-2.5 py-1 rounded-full border border-[#087F23]/20">
                      ★ ৫.০
                    </div>
                  </div>
                </div>

                {/* Secondary Floating Accent */}
                <div className="hidden sm:flex absolute -bottom-4 -left-6 z-20 bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-xl border border-gray-100 items-center gap-2 animate-bounce" style={{ animationDuration: '4s' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=150&q=80" 
                    alt="কাটা আম" 
                    className="w-10 h-10 rounded-lg object-cover" 
                  />
                  <div className="text-left pr-1">
                    <p className="text-[11px] font-bold text-gray-800">রসালো ও মিষ্টি</p>
                    <p className="text-[9px] text-[#087F23] font-semibold">১০০% অর্গানিক</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
