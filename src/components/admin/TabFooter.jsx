import React, { useState } from 'react';
import { Save } from 'lucide-react';

export default function TabFooter({ footerConfig, onSave, onNotify }) {
  const [form, setForm] = useState({ ...footerConfig });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onNotify('ফুটার তথ্য সফলভাবে সেভ হয়েছে!');
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-left animate-fadeIn space-y-4">
      <div>
        <h2 className="font-bold text-lg text-gray-900">ফুটার ও যোগাযোগ তথ্য</h2>
        <p className="text-xs text-gray-500">ফুটারের বিবরণ, ইমেইল, ঠিকানা এবং কপিরাইট লেখা পরিবর্তন করুন</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">আমাদের সম্পর্কে বিবরণ</label>
          <textarea
            rows={3}
            value={form.about}
            onChange={e => setForm({ ...form, about: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">অফিসিয়াল ইমেইল</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">বাগান হাব / অফিসের ঠিকানা</label>
            <input
              type="text"
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">কপিরাইট টেক্সট</label>
          <input
            type="text"
            value={form.copyright}
            onChange={e => setForm({ ...form, copyright: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-[#087F23] hover:bg-[#006B18] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg flex items-center gap-1.5 shadow-md transition-colors"
        >
          <Save size={15} />
          <span>ফুটার তথ্য সেভ করুন</span>
        </button>
      </form>
    </div>
  );
}
