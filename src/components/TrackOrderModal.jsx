import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, Package, MapPin } from 'lucide-react';

export default function TrackOrderModal({ isOpen, onClose }) {
  const [orderQuery, setOrderQuery] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  if (!isOpen) return null;

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderQuery) return;

    // Simulated authentic tracking data
    setTrackingResult({
      orderId: orderQuery.toUpperCase(),
      product: 'হিমসাগর স্পেশাল প্রিমিয়াম আম (১০ কেজি)',
      date: '১২ সেপ্টেম্বর, ২০২৬',
      origin: 'বাঘা, রাজশাহী বাগান নং-৪',
      destination: 'ঢাকা মহানগর',
      currentStatus: 'পথে আছে (In Transit)',
      steps: [
        { title: 'অর্ডার কনফার্ম হয়েছে', time: 'সকাল ০৯:৩০', done: true },
        { title: 'বাগান থেকে গাছপাকা আম সংগ্রহ', time: 'দুপুর ০১:১৫', done: true },
        { title: 'গ্রেডিং ও বিশেষ কার্টনে প্যাকিং', time: 'বিকাল ০৪:৪০', done: true },
        { title: 'কুরিয়ার হাব থেকে ডেলিভারির পথে', time: 'রাত ০৮:০০', done: true, current: true },
        { title: 'গ্রাহকের হাতে হস্তান্তর', time: 'আনুমানিক আগামীকাল সকাল', done: false }
      ]
    });
  };

  const handleSampleTrack = () => {
    setOrderQuery('MB-784210');
    setTrackingResult({
      orderId: 'MB-784210',
      product: 'রাজশাহী হিমসাগর আম (১০ কেজি)',
      date: '১২ সেপ্টেম্বর, ২০২৬',
      origin: 'চাঁপাইনবাবগঞ্জ বাগান',
      destination: 'ধানমন্ডি, ঢাকা',
      currentStatus: 'পথে আছে (In Transit)',
      steps: [
        { title: 'অর্ডার কনফার্ম হয়েছে', time: '১০ সেপ্টেম্বর', done: true },
        { title: 'বাগান থেকে আম সংগ্রহ', time: '১১ সেপ্টেম্বর', done: true },
        { title: 'ফরমালিন টেস্ট ও প্যাকিং', time: '১১ সেপ্টেম্বর', done: true },
        { title: 'ডেলিভারি রাইডারের পথে', time: 'আজ সকাল ১০:০০', done: true, current: true },
        { title: 'আপনার ঠিকানায় ডেলিভারি', time: 'আজ বিকাল ৪:০০', done: false }
      ]
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 animate-fadeIn my-6">
        
        {/* Header */}
        <div className="bg-[#087F23] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck size={22} className="text-[#F6C928]" />
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight">
                অর্ডার ট্র্যাক করুন (Track Order)
              </h3>
              <p className="text-xs text-emerald-100">
                আপনার আম এখন কোথায় আছে তা সরাসরি জানুন
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 text-left space-y-4">
          <form onSubmit={handleTrack} className="space-y-2">
            <label className="block text-xs font-bold text-gray-700">
              অর্ডার নম্বর বা মোবাইল নম্বর দিন:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="যেমন: MB-784210 অথবা 017XXXXXXXX"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#087F23] hover:bg-[#006B18] text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
              >
                <Search size={15} />
                <span>খুঁজুন</span>
              </button>
            </div>
          </form>

          {/* Sample quick button */}
          {!trackingResult && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleSampleTrack}
                className="text-xs text-[#087F23] hover:underline bg-[#EAF8E5] px-3 py-1.5 rounded-full font-medium"
              >
                💡 টেস্ট করতে ডেমো ট্র্যাকিং দেখুন (MB-784210)
              </button>
            </div>
          )}

          {/* Tracking Result View */}
          {trackingResult && (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
              <div className="bg-[#EAF8E5] p-3.5 rounded-xl border border-[#087F23]/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-600 block">বর্তমান অবস্থা</span>
                  <h4 className="font-bold text-[#087F23] text-sm sm:text-base flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#087F23] animate-ping" />
                    {trackingResult.currentStatus}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 block">অর্ডার আইডি</span>
                  <span className="font-mono text-xs font-bold text-gray-800">{trackingResult.orderId}</span>
                </div>
              </div>

              {/* Order Metadata */}
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div>
                  <span className="text-gray-400 block text-[10px]">পণ্য:</span>
                  <span className="font-semibold">{trackingResult.product}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">বাগান উৎস:</span>
                  <span className="font-semibold">{trackingResult.origin}</span>
                </div>
              </div>

              {/* Timeline Steps */}
              <div className="space-y-3 pl-2 pt-2">
                {trackingResult.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 relative">
                    {idx < trackingResult.steps.length - 1 && (
                      <div
                        className={`absolute left-2.5 top-5 bottom-0 w-0.5 ${
                          step.done ? 'bg-[#087F23]' : 'bg-gray-200'
                        }`}
                      />
                    )}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        step.done
                          ? 'bg-[#087F23] text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {step.done ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-bold ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.title}
                      </p>
                      <span className="text-[10px] text-gray-400">{step.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
