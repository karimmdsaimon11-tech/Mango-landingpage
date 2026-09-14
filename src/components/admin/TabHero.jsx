import React, { useState, useEffect } from 'react';
import { Save, Check, Sparkles, Eye, Image as ImageIcon } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function TabHero({ heroConfig, onSave, onNotify }) {
  const [form, setForm] = useState({ ...heroConfig });

  useEffect(() => {
    setForm({ ...heroConfig });
  }, [heroConfig]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    if (onNotify) onNotify('হিরো ব্যানার ও ব্যাজের সমস্ত তথ্য সফলভাবে সেভ হয়েছে!');
  };

  const handleSaveFloatingBadge = () => {
    onSave(form);
    if (onNotify) onNotify('ভাসমান ব্যাজের তথ্য ("' + (form.floatingBadgeTitle || 'রসালো ও মিষ্টি') + '") স্থায়ীভাবে সেভ হয়েছে!');
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-left animate-fadeIn space-y-5">
      <div>
        <h2 className="font-bold text-lg text-gray-900">হিরো ব্যানার ও ব্যাজ এডিটর</h2>
        <p className="text-xs text-gray-500">ওয়েবসাইটের প্রধান ব্যানার, লেখা, ছবি এবং ভাসমান ব্যাজসমূহ পরিবর্তন করুন</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Main Hero Texts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">টপ ব্যাজ টেক্সট</label>
            <input
              type="text"
              value={form.badge}
              onChange={e => setForm({ ...form, badge: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">মূল শিরোনাম (Headline)</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#087F23] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">সাবটাইটেল (হলুদ রঙের সাব-হেডিং)</label>
          <input
            type="text"
            value={form.subtitle}
            onChange={e => setForm({ ...form, subtitle: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm font-semibold text-[#087F23] focus:ring-2 focus:ring-[#087F23] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">বিস্তারিত বিবরণ (Description)</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">মূল বাটন টেক্সট</label>
            <input
              type="text"
              value={form.ctaText}
              onChange={e => setForm({ ...form, ctaText: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">সেকেন্ডারি বাটন টেক্সট</label>
            <input
              type="text"
              value={form.secondaryCtaText}
              onChange={e => setForm({ ...form, secondaryCtaText: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
            />
          </div>
        </div>

        {/* Direct Main Photo Upload */}
        <div className="pt-2 border-t border-gray-100">
          <ImageUploader
            label="হিরো ব্যানার প্রধান আমের ছবি (Main Hero Photo)"
            value={form.image}
            onChange={(newImage) => {
              const updated = { ...form, image: newImage };
              setForm(updated);
              onSave(updated);
              if (onNotify) onNotify('হিরো ব্যানারের প্রধান ছবি স্থায়ীভাবে সেভ হয়েছে!');
            }}
            helperText="আপনার কম্পিউটার বা মোবাইল থেকে সরাসরি ছবি আপলোড করুন (স্বয়ংক্রিয়ভাবে কম্প্রেস ও পার্মানেন্ট সেভ হবে)।"
          />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* PROMINENT FLOATING BADGE EDITOR ("রসালো ও মিষ্টি / ১০০% অর্গানিক") */}
        {/* ------------------------------------------------------------- */}
        <div className="pt-4 border-t-2 border-emerald-200">
          <div className="bg-gradient-to-br from-[#F4FBF2] to-white border-2 border-emerald-300 rounded-2xl p-5 shadow-xs space-y-4">
            
            {/* Header with Icon and Live Preview Card */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-emerald-100">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-[#087F23] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1.5 shadow-xs">
                  <Sparkles size={12} />
                  <span>ভাসমান ব্যাজ কার্ড সেটিংস</span>
                </div>
                <h3 className="font-bold text-base text-gray-900">
                  🏷️ "রসালো ও মিষ্টি / ১০০% অর্গানিক" কার্ড এডিটর
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  হিরো ছবির ওপর থাকা এই ছোট ভাসমান ব্যাজটির ছবি, শিরোনাম ও সাব-শিরোনাম এখান থেকে পরিবর্তন করুন
                </p>
              </div>

              {/* Exact 1-to-1 Live Preview Card */}
              <div className="bg-white/90 backdrop-blur-md p-2.5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3 shrink-0 self-start md:self-auto">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider pl-1">লাইভ লুক:</span>
                <div className="flex items-center gap-2.5 bg-white p-2 rounded-xl border border-gray-100 shadow-xs">
                  <img
                    src={form.floatingBadgeImage || 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=150&q=80'}
                    alt="Preview"
                    className="w-11 h-11 rounded-lg object-cover bg-gray-100 shrink-0 border border-gray-100"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=150&q=80';
                    }}
                  />
                  <div className="text-left pr-1">
                    <p className="text-xs font-black text-gray-800 leading-tight">
                      {form.floatingBadgeTitle || 'রসালো ও মিষ্টি'}
                    </p>
                    <p className="text-[10px] text-[#087F23] font-bold leading-tight mt-1">
                      {form.floatingBadgeSubtitle || '১০০% অর্গানিক'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Toggle show/hide */}
            <div className="flex items-center gap-2 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200/60">
              <input
                type="checkbox"
                id="showFloatingBadgeToggle"
                checked={form.showFloatingBadge !== false}
                onChange={(e) => {
                  const updated = { ...form, showFloatingBadge: e.target.checked };
                  setForm(updated);
                  onSave(updated);
                  if (onNotify) onNotify(e.target.checked ? 'ভাসমান ব্যাজ প্রদর্শন চালু করা হয়েছে!' : 'ভাসমান ব্যাজ প্রদর্শন বন্ধ করা হয়েছে!');
                }}
                className="w-4 h-4 text-[#087F23] rounded focus:ring-[#087F23] cursor-pointer"
              />
              <label htmlFor="showFloatingBadgeToggle" className="text-xs font-bold text-gray-700 cursor-pointer select-none">
                ওয়েবসাইটে এই ভাসমান কার্ডটি সক্রিয় রাখুন (Show Badge)
              </label>
            </div>

            {/* Badge Photo Uploader */}
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <ImageUploader
                label="কার্ডের ভেতরের ছবি (Badge Photo Upload)"
                value={form.floatingBadgeImage || 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=150&q=80'}
                onChange={(newImage) => {
                  const updated = { ...form, floatingBadgeImage: newImage };
                  setForm(updated);
                  onSave(updated);
                  if (onNotify) onNotify('ভাসমান ব্যাজের নতুন ছবি স্থায়ীভাবে সেভ হয়েছে!');
                }}
                helperText="ছোট কার্ডটিতে দেখানোর জন্য আপনার পছন্দের ফল বা আমের টুকরো ছবি আপলোড করুন।"
              />
            </div>

            {/* Badge Text Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  কার্ডের মূল শিরোনাম (Top Text)
                </label>
                <input
                  type="text"
                  value={form.floatingBadgeTitle ?? 'রসালো ও মিষ্টি'}
                  onChange={e => setForm({ ...form, floatingBadgeTitle: e.target.value })}
                  onBlur={() => onSave(form)}
                  placeholder="যেমন: রসালো ও মিষ্টি"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs sm:text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#087F23] focus:outline-none bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  কার্ডের সাব-শিরোনাম (Green Subtitle)
                </label>
                <input
                  type="text"
                  value={form.floatingBadgeSubtitle ?? '১০০% অর্গানিক'}
                  onChange={e => setForm({ ...form, floatingBadgeSubtitle: e.target.value })}
                  onBlur={() => onSave(form)}
                  placeholder="যেমন: ১০০% অর্গানিক"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs sm:text-sm font-bold text-[#087F23] focus:ring-2 focus:ring-[#087F23] focus:outline-none bg-white"
                />
              </div>
            </div>

            {/* Dedicated Quick Save Button for this badge */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleSaveFloatingBadge}
                className="bg-[#087F23] hover:bg-[#006B18] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Check size={14} />
                <span>এই ব্যাজ কার্ডের তথ্য সেভ করুন</span>
              </button>
            </div>

          </div>
        </div>

        {/* Quality Badge on Image Bottom */}
        <div className="pt-2 border-t border-gray-100 space-y-3">
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
            <h3 className="font-bold text-sm text-gray-800 mb-1 flex items-center gap-1.5">
              <span>🥭</span> ছবির নিচের সাদা বারের কোয়ালিটি ব্যাজ (Bottom Quality Badge)
            </h3>
            <p className="text-xs text-gray-500 mb-3">
              হিরো ছবির নিচে সাদা বারে থাকা কোয়ালিটি ব্যাজের লেখা ও রেটিং পরিবর্তন করুন
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">আইকন / ইমোজি</label>
                <input
                  type="text"
                  value={form.bottomBadgeIcon ?? '🥭'}
                  onChange={e => setForm({ ...form, bottomBadgeIcon: e.target.value })}
                  placeholder="🥭"
                  className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm text-center focus:ring-2 focus:ring-[#087F23] focus:outline-none bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">কোয়ালিটি টাইটেল</label>
                <input
                  type="text"
                  value={form.bottomBadgeTitle ?? 'গাছপাকা প্রিমিয়াম আম'}
                  onChange={e => setForm({ ...form, bottomBadgeTitle: e.target.value })}
                  placeholder="গাছপাকা প্রিমিয়াম আম"
                  className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-[#087F23] focus:outline-none bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">রেটিং / ব্যাজ</label>
                <input
                  type="text"
                  value={form.bottomBadgeRating ?? '★ ৫.০'}
                  onChange={e => setForm({ ...form, bottomBadgeRating: e.target.value })}
                  placeholder="★ ৫.০"
                  className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm font-bold text-[#087F23] focus:ring-2 focus:ring-[#087F23] focus:outline-none bg-white"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-xs font-bold text-gray-700 mb-1">কোয়ালিটি সাবটাইটেল</label>
              <input
                type="text"
                value={form.bottomBadgeSubtitle ?? 'মিষ্টি, সুগন্ধি ও ফরমালিন মুক্ত'}
                onChange={e => setForm({ ...form, bottomBadgeSubtitle: e.target.value })}
                placeholder="মিষ্টি, সুগন্ধি ও ফরমালিন মুক্ত"
                className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm text-gray-600 focus:ring-2 focus:ring-[#087F23] focus:outline-none bg-white"
              />
            </div>
          </div>
        </div>

        {/* Global Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="bg-[#087F23] hover:bg-[#006B18] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
          >
            <Save size={15} />
            <span>হিরো ব্যানার ও ব্যাজের সমস্ত পরিবর্তন সেভ করুন</span>
          </button>
        </div>

      </form>
    </div>
  );
}
