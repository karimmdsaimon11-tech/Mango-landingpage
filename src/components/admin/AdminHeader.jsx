import React from 'react';
import { ArrowLeft, RotateCcw, LogOut } from 'lucide-react';
import DefaultMangoLogo from '../DefaultMangoLogo';

export default function AdminHeader({ siteConfig, onClose, onReset, onLogout }) {
  return (
    <header className="bg-[#006B18] text-white h-16 px-4 sm:px-6 flex items-center justify-between shadow-md shrink-0">
      <div className="flex items-center gap-3">
        {siteConfig?.logoImage ? (
          <img
            src={siteConfig.logoImage}
            alt={siteConfig.brandName || "Mango Bazar"}
            className="w-10 h-10 object-contain rounded-full bg-white p-0.5 border border-white/20 shrink-0 shadow-xs"
          />
        ) : (
          <DefaultMangoLogo className="w-10 h-10 bg-white/10 border-white/20" />
        )}
        <div>
          <h1 className="font-black text-base sm:text-lg leading-tight flex items-center gap-2">
            <span>{siteConfig?.brandName || 'Mango Bazar'} — অ্যাডমিন কন্ট্রোল প্যানেল</span>
            <span className="bg-[#F6C928] text-gray-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              সিকিউর মোড
            </span>
          </h1>
          <p className="text-xs text-emerald-200 hidden sm:block">
            এখান থেকে ওয়েবসাইট এর সমস্ত লেখা, ছবি, দাম ও তথ্য পরিবর্তন করতে পারবেন
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onReset}
          className="hidden sm:inline-flex items-center gap-1.5 bg-red-600/80 hover:bg-red-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shadow-xs"
          title="সব ডেটা ডিফল্ট ফিরিয়ে আনুন"
        >
          <RotateCcw size={13} />
          <span>রিসেট</span>
        </button>

        <button
          onClick={onClose}
          className="bg-[#F6C928] hover:bg-[#eab915] text-gray-950 font-bold text-xs sm:text-sm px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeft size={16} />
          <span>ওয়েবসাইট দেখুন</span>
        </button>

        <button
          onClick={onLogout}
          className="bg-white/15 hover:bg-red-600 text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors border border-white/20"
          title="অ্যাডমিন থেকে লগআউট করুন"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">লগআউট</span>
        </button>
      </div>
    </header>
  );
}

