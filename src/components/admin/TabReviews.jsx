import React, { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';

export default function TabReviews({ testimonials, onAdd, onDelete, onNotify }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    location: 'ঢাকা',
    rating: 5,
    text: ''
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;
    onAdd(newReview);
    setShowAddModal(false);
    setNewReview({ name: '', location: 'ঢাকা', rating: 5, text: '' });
    onNotify('নতুন কাস্টমার রিভিউ যোগ হয়েছে!');
  };

  return (
    <div className="space-y-4 text-left animate-fadeIn">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="font-bold text-lg text-gray-900">গ্রাহকদের রিভিউ ({testimonials.length})</h2>
          <p className="text-xs text-gray-500">গ্রাহকদের ইতিবাচক রিভিউ যোগ করুন বা মুছে ফেলুন</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#087F23] hover:bg-[#006B18] text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-xs"
        >
          <Plus size={15} />
          <span>নতুন রিভিউ যোগ করুন</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {testimonials.map((review) => (
          <div
            key={review.id}
            className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-2 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{review.name}</h4>
                  <p className="text-[11px] text-gray-500">{review.location}</p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm(`আপনি কি "${review.name}" এর রিভিউটি মুছে ফেলতে চান?`)) {
                      onDelete(review.id);
                      onNotify('রিভিউ মুছে ফেলা হয়েছে!');
                    }
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-700 italic mt-2">
                "{review.text}"
              </p>
            </div>
            <div className="text-[#F59E0B] text-xs font-bold pt-2 border-t border-gray-100">
              ★★★★★ (৫/৫ রেটিং)
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 animate-fadeIn text-left">
            <div className="bg-[#087F23] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-base">নতুন গ্রাহক মতামত যোগ করুন</h3>
              <button onClick={() => setShowAddModal(false)} className="text-white/80 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-0.5">গ্রাহকের নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মো: আরিফুল হক"
                  value={newReview.name}
                  onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full border rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#087F23] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-0.5">এলাকা / জেলা</label>
                <input
                  type="text"
                  placeholder="যেমন: মিরপুর, ঢাকা"
                  value={newReview.location}
                  onChange={e => setNewReview({ ...newReview, location: e.target.value })}
                  className="w-full border rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#087F23] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-0.5">রিভিউ মন্তব্য *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="আমের স্বাদ, ফ্রেশনেস ও সার্ভিস কেমন ছিল..."
                  value={newReview.text}
                  onChange={e => setNewReview({ ...newReview, text: e.target.value })}
                  className="w-full border rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#087F23] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#087F23] hover:bg-[#006B18] text-white py-2.5 rounded-lg font-bold text-xs shadow-md transition-colors"
              >
                রিভিউ যোগ করুন
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
