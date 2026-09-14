import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function TabSite({ siteConfig, onSave, onNotify }) {
  const [form, setForm] = useState({ ...siteConfig });

  useEffect(() => {
    setForm({ ...siteConfig });
  }, [siteConfig]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onNotify('সাইট ও হেডার তথ্য সেভ হয়েছে!');
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-left animate-fadeIn space-y-4">
      <div>
        <h2 className="font-bold text-lg text-gray-900">ঘোষণা বার ও সাইট তথ্য</h2>
        <p className="text-xs text-gray-500">উপরের সবুজ ঘোষণা বার ও হটলাইন নম্বর পরিবর্তন করুন</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">টপ অ্যানাউন্সমেন্ট টেক্সট (বাম পাশের লেখা)</label>
          <input
            type="text"
            value={form.announcementText}
            onChange={e => setForm({ ...form, announcementText: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">অর্ডার হটলাইন নম্বর</label>
            <input
              type="text"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp নম্বর</label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={e => setForm({ ...form, whatsapp: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">ব্র্যান্ড নাম (Brand Name)</label>
            <input
              type="text"
              value={form.brandName}
              onChange={e => setForm({ ...form, brandName: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none font-bold"
              placeholder="Mango Bazar"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">ব্র্যান্ড স্লোগান (Brand Subtitle)</label>
            <input
              type="text"
              value={form.brandSubtitle}
              onChange={e => setForm({ ...form, brandSubtitle: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
              placeholder="100% natural and fresh"
            />
          </div>
        </div>

        {/* Website Mango Logo Uploader */}
        <div className="pt-1">
          <ImageUploader
            label="ম্যাঙ্গো লোগো ছবি (Website Mango Logo Upload)"
            value={form.logoImage}
            onChange={(newLogo) => {
              const updated = { ...form, logoImage: newLogo };
              setForm(updated);
              onSave(updated);
              if (onNotify) onNotify('নতুন লোগো সফলভাবে সেভ হয়েছে!');
            }}
            helperText="আপনার ম্যাঙ্গো লোগো ছবি (PNG, JPG, WebP) আপলোড করুন। কোনো ছবি না দিলে ডিফল্ট ম্যাঙ্গো আইকন প্রদর্শিত হবে।"
          />
        </div>

        <button
          type="submit"
          className="bg-[#087F23] hover:bg-[#006B18] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg flex items-center gap-1.5 shadow-md transition-colors"
        >
          <Save size={15} />
          <span>সাইট তথ্য সেভ করুন</span>
        </button>
      </form>
    </div>
  );
}
