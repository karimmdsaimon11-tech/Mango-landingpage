import React, { useState } from 'react';
import { X, CheckCircle2, ShoppingCart } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';

export default function QuickOrderModal({ isOpen, onClose, initialProduct, onOrderSuccess }) {
  const { products, addOrder } = useWebsite();

  const [selectedProduct, setSelectedProduct] = useState(
    initialProduct || products[0]
  );
  const [weightKg, setWeightKg] = useState(10);
  const [deliveryArea, setDeliveryArea] = useState('inside_dhaka');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const currentProduct = selectedProduct || products[0];
  const pricePerKg = currentProduct.pricePerKg || 125;
  const mangoTotal = pricePerKg * weightKg;
  const deliveryCharge = deliveryArea === 'inside_dhaka' ? 80 : 130;
  const grandTotal = mangoTotal + deliveryCharge;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('অনুগ্রহ করে নাম, ফোন নম্বর এবং সম্পূর্ণ ঠিকানা প্রদান করুন।');
      return;
    }
    const generatedId = 'MB-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setIsSubmitted(true);

    const orderPayload = {
      orderId: generatedId,
      product: currentProduct.name,
      weightKg,
      grandTotal,
      customer: formData
    };

    // Save to context & admin orders!
    addOrder(orderPayload);

    if (onOrderSuccess) {
      onOrderSuccess(orderPayload);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 animate-fadeIn my-6">
        
        {/* Modal Header */}
        <div className="bg-[#087F23] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥭</span>
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight">
                {isSubmitted ? 'অর্ডার সফল হয়েছে!' : 'সহজ অর্ডারিং ফর্ম (ক্যাশ অন ডেলিভারি)'}
              </h3>
              <p className="text-xs text-emerald-100">
                {isSubmitted ? 'ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে।' : 'আম হাতে পেয়ে মূল্য পরিশোধ করুন'}
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        {isSubmitted ? (
          /* Success Screen */
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-[#EAF8E5] text-[#087F23] rounded-full flex items-center justify-center mx-auto ring-8 ring-[#EAF8E5]/50">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-bold text-gray-900">অভিনন্দন, {formData.name}!</h4>
              <p className="text-sm text-gray-600">
                আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে। আমাদের প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবে।
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">অর্ডার আইডি:</span>
                <span className="font-bold text-[#087F23]">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">আমের ধরণ:</span>
                <span className="font-semibold text-gray-800">{currentProduct.name} ({weightKg} কেজি)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">মোট মূল্য:</span>
                <span className="font-bold text-gray-900">{grandTotal} ৳ (ক্যাশ অন ডেলিভারি)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">ডেলিভারি ঠিকানা:</span>
                <span className="text-gray-800">{formData.address}</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full bg-[#087F23] hover:bg-[#006B18] text-white py-2.5 rounded-lg font-bold text-sm shadow-xs transition-colors"
            >
              ঠিক আছে
            </button>
          </div>
        ) : (
          /* Order Form */
          <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 text-left max-h-[78vh] overflow-y-auto">
            
            {/* Product Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                আমের ধরণ নির্বাচন করুন:
              </label>
              <select
                value={currentProduct.id}
                onChange={(e) => {
                  const p = products.find(item => item.id === parseInt(e.target.value));
                  if (p) setSelectedProduct(p);
                }}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#087F23] focus:outline-none"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.pricePerKg} ৳/কেজি ({p.origin})
                  </option>
                ))}
              </select>
            </div>

            {/* Weight Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                পরিমাণ (কেজি):
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 20].map((kg) => (
                  <button
                    type="button"
                    key={kg}
                    onClick={() => setWeightKg(kg)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      weightKg === kg
                        ? 'bg-[#087F23] text-white border-[#087F23]'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#087F23]'
                    }`}
                  >
                    {kg} কেজি
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Area */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                ডেলিভারি এলাকা:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer ${
                  deliveryArea === 'inside_dhaka' ? 'border-[#087F23] bg-[#EAF8E5]/50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="delivery"
                    value="inside_dhaka"
                    checked={deliveryArea === 'inside_dhaka'}
                    onChange={() => setDeliveryArea('inside_dhaka')}
                    className="text-[#087F23] focus:ring-[#087F23]"
                  />
                  <span>ঢাকার ভিতরে (৮০৳)</span>
                </label>
                <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer ${
                  deliveryArea === 'outside_dhaka' ? 'border-[#087F23] bg-[#EAF8E5]/50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="delivery"
                    value="outside_dhaka"
                    checked={deliveryArea === 'outside_dhaka'}
                    onChange={() => setDeliveryArea('outside_dhaka')}
                    className="text-[#087F23] focus:ring-[#087F23]"
                  />
                  <span>ঢাকার বাইরে (১৩০৳)</span>
                </label>
              </div>
            </div>

            {/* Customer Details Form */}
            <div className="space-y-2.5 pt-1">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-0.5">
                  আপনার নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: তানভীর আহমেদ"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-0.5">
                  মোবাইল নম্বর <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="যেমন: 017XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-0.5">
                  সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="বাড়ি/ফ্ল্যাট নং, রোড নং, এলাকা, থানা ও জেলা"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
                />
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-[#F4FBF2] rounded-xl p-3 border border-[#087F23]/20 space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>আমের মূল্য ({weightKg} কেজি × {pricePerKg}৳):</span>
                <span>{mangoTotal} ৳</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>ডেলিভারি চার্জ:</span>
                <span>{deliveryCharge} ৳</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-gray-900 pt-1 border-t border-[#087F23]/20">
                <span>সর্বমোট পরিশোধযোগ্য:</span>
                <span className="text-[#087F23]">{grandTotal} ৳</span>
              </div>
              <p className="text-[10px] text-gray-500 pt-0.5">
                * কোনো অগ্রিম পেমেন্ট লাগবে না। পণ্য হাতে পেয়ে চেক করে টাকা দিন।
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#087F23] hover:bg-[#006B18] text-white py-3 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              <span>অর্ডার কনফার্ম করুন — {grandTotal} ৳</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
