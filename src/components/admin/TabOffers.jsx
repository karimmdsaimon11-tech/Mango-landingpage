import React, { useState } from 'react';
import { Save } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function TabOffers({ offerBanner, finalCta, onSaveOffer, onSaveFinalCta, onNotify }) {
  const [offerForm, setOfferForm] = useState({ ...offerBanner });
  const [ctaForm, setCtaForm] = useState({ ...finalCta });

  const handleOfferSubmit = (e) => {
    e.preventDefault();
    onSaveOffer(offerForm);
    onNotify('স্পেশাল অফার ব্যানার সেভ হয়েছে!');
  };

  const handleCtaSubmit = (e) => {
    e.preventDefault();
    onSaveFinalCta(ctaForm);
    onNotify('ফাইনাল ব্যানার সেভ হয়েছে!');
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Offer Banner Form */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <div>
          <h2 className="font-bold text-lg text-gray-900">স্পেশাল অফার ব্যানার এডিটর</h2>
          <p className="text-xs text-gray-500">আমের অফার ব্যানারটির লেখা ও ছবি পরিবর্তন করুন</p>
        </div>

        <form onSubmit={handleOfferSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">অফার ব্যাজ ট্যাগ</label>
              <input
                type="text"
                value={offerForm.tag}
                onChange={e => setOfferForm({ ...offerForm, tag: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">অতিরিক্ত ক্যাশব্যাক ব্যাজ</label>
              <input
                type="text"
                value={offerForm.cashbackText}
                onChange={e => setOfferForm({ ...offerForm, cashbackText: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">অফার মূল শিরোনাম</label>
            <input
              type="text"
              value={offerForm.title}
              onChange={e => setOfferForm({ ...offerForm, title: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#087F23] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">অফার বিবরণ</label>
            <textarea
              rows={2}
              value={offerForm.subtitle}
              onChange={e => setOfferForm({ ...offerForm, subtitle: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">বাটন টেক্সট</label>
            <input
              type="text"
              value={offerForm.ctaText}
              onChange={e => setOfferForm({ ...offerForm, ctaText: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
            />
          </div>

          <ImageUploader
            label="অফার ব্যানার ছবি (Photo Upload)"
            value={offerForm.image}
            onChange={(img) => setOfferForm({ ...offerForm, image: img })}
            helperText="ডিভাইস থেকে অফার ব্যানারের ছবি আপলোড করুন।"
          />

          <button
            type="submit"
            className="bg-[#087F23] hover:bg-[#006B18] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg flex items-center gap-1.5 shadow-md transition-colors"
          >
            <Save size={15} />
            <span>অফার ব্যানার সেভ করুন</span>
          </button>
        </form>
      </div>

      {/* Final CTA Edit */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-gray-900">ফাইনাল কনভার্সন ব্যানার (Final CTA)</h3>
        <form onSubmit={handleCtaSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">শিরোনাম</label>
            <input
              type="text"
              value={ctaForm.title}
              onChange={e => setCtaForm({ ...ctaForm, title: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">বিবরণ</label>
            <input
              type="text"
              value={ctaForm.description}
              onChange={e => setCtaForm({ ...ctaForm, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">বাটন টেক্সট</label>
            <input
              type="text"
              value={ctaForm.buttonText}
              onChange={e => setCtaForm({ ...ctaForm, buttonText: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-[#087F23] hover:bg-[#006B18] text-white font-bold text-xs px-5 py-2 rounded-lg flex items-center gap-1.5"
          >
            <Save size={14} />
            <span>ফাইনাল ব্যানার সেভ করুন</span>
          </button>
        </form>
      </div>
    </div>
  );
}
