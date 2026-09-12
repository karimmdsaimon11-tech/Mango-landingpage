import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function TabDashboard({ products, orders, testimonials, siteConfig, onNavigate, onClose }) {
  return (
    <div className="space-y-6 text-left animate-fadeIn">
      <div className="bg-gradient-to-r from-[#006B18] to-[#087F23] text-white p-6 rounded-2xl shadow-md flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">স্বাগতম, অ্যাডমিন! 👋</h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            আপনার ওয়েবসাইটের সমস্ত কন্টেন্ট এখান থেকে পরিচালনা ও এডিট করুন।
          </p>
        </div>
        <button
          onClick={onClose}
          className="bg-white text-[#006B18] font-bold text-xs px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-1.5"
        >
          <span>ওয়েবসাইট ভিজিট করুন</span>
          <ExternalLink size={13} />
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="text-gray-400 text-xs font-semibold">মোট আমের জাত</div>
          <div className="text-2xl font-black text-gray-900 mt-1">{products.length} টি</div>
          <div className="text-[11px] text-[#087F23] font-medium mt-0.5">সবগুলো স্টকে আছে</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="text-gray-400 text-xs font-semibold">নতুন অর্ডার</div>
          <div className="text-2xl font-black text-[#087F23] mt-1">{orders.length} টি</div>
          <div className="text-[11px] text-orange-600 font-medium mt-0.5">
            {orders.filter(o => o.status === 'অপেক্ষমান').length} টি অপেক্ষমান
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="text-gray-400 text-xs font-semibold">গ্রাহক রিভিউ</div>
          <div className="text-2xl font-black text-[#F59E0B] mt-1">{testimonials.length} টি</div>
          <div className="text-[11px] text-gray-500 font-medium mt-0.5">গড় রেটিং ৫.০ ★</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="text-gray-400 text-xs font-semibold">হটলাইন সাপোর্ট</div>
          <div className="text-sm font-bold text-gray-800 mt-2 truncate">{siteConfig.phone}</div>
          <div className="text-[11px] text-[#087F23] font-medium mt-0.5">WhatsApp সক্রিয়</div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
        <h3 className="font-bold text-base text-gray-900">দ্রুত পরিবর্তনসমূহ:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => onNavigate('hero')}
            className="p-3 rounded-xl border border-gray-200 hover:border-[#087F23] bg-gray-50 hover:bg-[#EAF8E5] text-left transition-colors"
          >
            <h4 className="font-bold text-xs sm:text-sm text-[#087F23]">হিরো ব্যানার পরিবর্তন</h4>
            <p className="text-[11px] text-gray-500">মূল শিরোনাম, সাবটাইটেল ও ছবির লিংক এডিট করুন</p>
          </button>
          <button
            onClick={() => onNavigate('products')}
            className="p-3 rounded-xl border border-gray-200 hover:border-[#087F23] bg-gray-50 hover:bg-[#EAF8E5] text-left transition-colors"
          >
            <h4 className="font-bold text-xs sm:text-sm text-[#087F23]">আমের দাম ও স্টক আপডেট</h4>
            <p className="text-[11px] text-gray-500">নতুন আম যোগ করুন বা দাম পরিবর্তন করুন</p>
          </button>
          <button
            onClick={() => onNavigate('orders')}
            className="p-3 rounded-xl border border-gray-200 hover:border-[#087F23] bg-gray-50 hover:bg-[#EAF8E5] text-left transition-colors"
          >
            <h4 className="font-bold text-xs sm:text-sm text-[#087F23]">কাস্টমার অর্ডারসমূহ দেখুন</h4>
            <p className="text-[11px] text-gray-500">অর্ডারের স্ট্যাটাস পরিবর্তন করুন</p>
          </button>
        </div>
      </div>
    </div>
  );
}
