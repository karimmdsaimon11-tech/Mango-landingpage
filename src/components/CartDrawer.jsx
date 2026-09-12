import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.pricePerKg || 120) * (item.weightKg || 5),
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slideLeft">
        
        {/* Cart Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#087F23]" />
            <h3 className="font-bold text-gray-900 text-base">আপনার শপিং ব্যাগ</h3>
            <span className="bg-[#EAF8E5] text-[#087F23] text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-3xl">
                🥭
              </div>
              <h4 className="font-bold text-gray-800 text-base">আপনার কার্ট খালি আছে</h4>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                আমাদের বাগান থেকে বাছাইকৃত তাজা আমের কালেকশন দেখে আপনার পছন্দের আম যোগ করুন।
              </p>
              <button
                onClick={onClose}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#087F23] bg-[#EAF8E5] px-4 py-2 rounded-full hover:bg-[#d5eed0] transition-colors"
              >
                <span>আম কালেকশন দেখুন</span>
                <ArrowRight size={13} />
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#087F23]/30 transition-colors bg-white text-left"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover bg-gray-100 shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    {item.pricePerKg} ৳/কেজি • {item.weightKg} কেজি
                  </p>
                  <p className="text-xs font-bold text-[#087F23] mt-0.5">
                    {(item.pricePerKg || 120) * (item.weightKg || 5)} ৳
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => onUpdateQuantity(item.id, Math.max(5, (item.weightKg || 5) - 5))}
                    className="w-6 h-6 rounded bg-white text-gray-700 flex items-center justify-center hover:bg-gray-200"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-xs font-bold px-1">{item.weightKg || 5}kg</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, (item.weightKg || 5) + 5)}
                    className="w-6 h-6 rounded bg-white text-gray-700 flex items-center justify-center hover:bg-gray-200"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-3">
            <div className="flex justify-between text-xs text-gray-600">
              <span>উপমোট (Subtotal):</span>
              <span className="font-bold text-gray-800">{subtotal} ৳</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>ডেলিভারি চার্জ:</span>
              <span className="text-[#087F23] font-semibold">চেকআউটে নির্ধারিত হবে</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-2 border-t border-gray-200">
              <span>মোট আনুমানিক:</span>
              <span className="text-[#087F23] text-base">{subtotal} ৳</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full bg-[#087F23] hover:bg-[#006B18] text-white py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>অর্ডার সম্পন্ন করুন</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
