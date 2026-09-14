import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function TabHero({ heroConfig, onSave, onNotify }) {
  const [form, setForm] = useState({ ...heroConfig });

  useEffect(() => {
    setForm({ ...heroConfig });
  }, [heroConfig]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onNotify('হিরো ব্যানার পরিবর্তন সেভ হয়েছে!');
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-left animate-fadeIn space-y-4">
      <div>
        <h2 className="font-bold text-lg text-gray-900">হিরো ব্যানার এডিটর</h2>
        <p className="text-xs text-gray-500">ওয়েবসাইটের প্রধান ব্যানারটির লেখা, বাটন এবং ছবি পরিবর্তন করুন</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* Direct File Photo Upload instead of URL input */}
        <ImageUploader
          label="হিরো ব্যানার আমের ছবি (Photo Upload)"
          value={form.image}
          onChange={(newImage) => {
            const updated = { ...form, image: newImage };
            setForm(updated);
            onSave(updated);
            if (onNotify) onNotify('হিরো ব্যানারের নতুন ছবি স্থায়ীভাবে সেভ হয়েছে!');
          }}
          helperText="আপনার কম্পিউটার বা মোবাইল থেকে সরাসরি আমের ছবি নির্বাচন করুন (স্বয়ংক্রিয়ভাবে পার্মানেন্ট সেভ হবে)।"
        />

        <button
          type="submit"
          className="bg-[#087F23] hover:bg-[#006B18] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg flex items-center gap-1.5 shadow-md transition-colors"
        >
          <Save size={15} />
          <span>হিরো ব্যানার পরিবর্তন সেভ করুন</span>
        </button>
      </form>
    </div>
  );
}
