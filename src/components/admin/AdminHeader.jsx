import React from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';

export default function AdminHeader({ onClose, onReset }) {
  return (
    <header className="bg-[#006B18] text-white h-16 px-4 sm:px-6 flex items-center justify-between shadow-md shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
          <span className="text-xl font-bold text-[#F6C928]">আম</span>
        </div>
        <div>
          <h1 className="font-black text-base sm:text-lg leading-tight flex items-center gap-2">
            <span>আমবাজার — অ্যাডমিন কন্ট্রোল প্যানেল</span>
            <span className="bg-[#F6C928] text-gray-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              লাইভ এডিটর
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
          <span>রিসেট করুন</span>
        </button>

        <button
          onClick={onClose}
          className="bg-[#F6C928] hover:bg-[#eab915] text-gray-950 font-bold text-xs sm:text-sm px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeft size={16} />
          <span>ওয়েবসাইট দেখুন</span>
        </button>
      </div>
    </header>
  );
}
