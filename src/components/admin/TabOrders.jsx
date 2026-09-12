import React from 'react';

export default function TabOrders({ orders, onUpdateStatus, onNotify }) {
  return (
    <div className="space-y-4 text-left animate-fadeIn">
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg text-gray-900">কাস্টমার অর্ডারসমূহ ({orders.length})</h2>
          <p className="text-xs text-gray-500">গ্রাহকদের পাঠানো সমস্ত অর্ডারের বিবরণ ও স্ট্যাটাস পরিবর্তন করুন</p>
        </div>
        <div className="text-xs font-semibold bg-[#EAF8E5] text-[#087F23] px-3 py-1.5 rounded-full border border-[#087F23]/20">
          ক্যাশ অন ডেলিভারি
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
          <p className="text-gray-500 text-sm">এখনো কোনো নতুন অর্ডার আসেনি।</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs hover:border-[#087F23]/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-800">
                    {order.id}
                  </span>
                  <h4 className="font-bold text-sm text-gray-900">{order.customerName}</h4>
                  <span className="text-xs text-gray-400">({order.date})</span>
                </div>
                <p className="text-xs text-gray-600">
                  📞 <strong>{order.phone}</strong> • 📍 {order.address}
                </p>
                <p className="text-xs font-semibold text-[#087F23]">
                  আম: {order.productName} ({order.weightKg} কেজি) — মোট: {order.totalAmount} ৳
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-gray-500">স্ট্যাটাস:</span>
                <select
                  value={order.status}
                  onChange={(e) => {
                    onUpdateStatus(order.id, e.target.value);
                    onNotify(`অর্ডার ${order.id} এর স্ট্যাটাস পরিবর্তন করা হয়েছে!`);
                  }}
                  className={`text-xs font-bold rounded-lg px-3 py-1.5 border focus:outline-none cursor-pointer ${
                    order.status === 'সম্পন্ন'
                      ? 'bg-[#EAF8E5] text-[#087F23] border-[#087F23]'
                      : order.status === 'বাতিল'
                      ? 'bg-red-50 text-red-600 border-red-200'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}
                >
                  <option value="অপেক্ষমান">⏳ অপেক্ষমান</option>
                  <option value="নিশ্চিত">✅ নিশ্চিত</option>
                  <option value="পথে আছে">🚚 পথে আছে</option>
                  <option value="সম্পন্ন">🎉 সম্পন্ন</option>
                  <option value="বাতিল">❌ বাতিল</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
