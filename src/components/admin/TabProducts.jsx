import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function TabProducts({ products, onAdd, onEdit, onDelete, onNotify }) {
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    category: 'himsagar',
    name: '',
    nameEn: '',
    description: '',
    priceMin: 220,
    priceMax: 650,
    pricePerKg: 120,
    minOrder: '৫ কেজি',
    origin: 'রাজশাহী',
    tag: 'নতুন',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80'
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name) return;
    onAdd(newProduct);
    setShowAddModal(false);
    setNewProduct({
      category: 'himsagar',
      name: '',
      nameEn: '',
      description: '',
      priceMin: 220,
      priceMax: 650,
      pricePerKg: 120,
      minOrder: '৫ কেজি',
      origin: 'রাজশাহী',
      tag: 'নতুন',
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80'
    });
    onNotify('নতুন আম সফলভাবে যোগ করা হয়েছে!');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    onEdit(editingProduct.id, editingProduct);
    setEditingProduct(null);
    onNotify('পণ্যের বিবরণ আপডেট করা হয়েছে!');
  };

  return (
    <div className="space-y-4 text-left animate-fadeIn">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="font-bold text-lg text-gray-900">আম পণ্যসমূহ তালিকা ({products.length})</h2>
          <p className="text-xs text-gray-500">যেকোনো আমের তথ্য, দাম বা ছবি পরিবর্তন করুন অথবা নতুন আম যোগ করুন</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#087F23] hover:bg-[#006B18] text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-xs"
        >
          <Plus size={15} />
          <span>নতুন আম যোগ করুন</span>
        </button>
      </div>

      {/* Product List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs flex items-center gap-3 justify-between"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-14 h-14 rounded-lg object-cover bg-gray-100 shrink-0 border border-gray-200"
              />
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                  {product.name}
                </h4>
                <p className="text-[11px] text-gray-500 truncate">
                  {product.origin} • {product.pricePerKg} ৳/কেজি
                </p>
                <p className="text-xs font-semibold text-[#087F23]">
                  রেঞ্জ: {product.priceMin}৳ – {product.priceMax}৳
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setEditingProduct(product)}
                className="p-1.5 rounded-lg bg-gray-100 hover:bg-[#EAF8E5] text-gray-700 hover:text-[#087F23] transition-colors"
                title="এডিট করুন"
              >
                <Edit2 size={15} />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`আপনি কি "${product.name}" মুছে ফেলতে চান?`)) {
                    onDelete(product.id);
                    onNotify('আমটি মুছে ফেলা হয়েছে!');
                  }
                }}
                className="p-1.5 rounded-lg bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                title="মুছে ফেলুন"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD PRODUCT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 animate-fadeIn text-left">
            <div className="bg-[#087F23] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-base">নতুন আমের জাত যোগ করুন</h3>
              <button onClick={() => setShowAddModal(false)} className="text-white/80 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-4 space-y-3 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-0.5">আমের নাম (বাংলা) *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: রাজকীয় ফজলি আম"
                  value={newProduct.name}
                  onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full border rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#087F23] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-0.5">ইংরেজি নাম / সাবটাইটেল</label>
                <input
                  type="text"
                  placeholder="e.g. Royal Sweet Fazli Variety"
                  value={newProduct.nameEn}
                  onChange={e => setNewProduct({ ...newProduct, nameEn: e.target.value })}
                  className="w-full border rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#087F23] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-0.5">ক্যাটাগরি</label>
                  <select
                    value={newProduct.category}
                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full border rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#087F23] focus:outline-none"
                  >
                    <option value="himsagar">হিমসাগর</option>
                    <option value="haribhanga">হাঁড়িভাঙা</option>
                    <option value="langra">ল্যাংড়া</option>
                    <option value="amrupali">আম্রপালি</option>
                    <option value="fazli">ফজলি</option>
                    <option value="gopalbhog">গোপালভোগ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-0.5">আমের উৎস (জেলা)</label>
                  <input
                    type="text"
                    value={newProduct.origin}
                    onChange={e => setNewProduct({ ...newProduct, origin: e.target.value })}
                    className="w-full border rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#087F23] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-0.5">কেজি প্রতি মূল্য (৳)</label>
                  <input
                    type="number"
                    value={newProduct.pricePerKg}
                    onChange={e => setNewProduct({ ...newProduct, pricePerKg: Number(e.target.value) })}
                    className="w-full border rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#087F23] focus:outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-0.5">সর্বনিম্ন মূল্য (৳)</label>
                  <input
                    type="number"
                    value={newProduct.priceMin}
                    onChange={e => setNewProduct({ ...newProduct, priceMin: Number(e.target.value) })}
                    className="w-full border rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#087F23] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-0.5">সর্বোচ্চ মূল্য (৳)</label>
                  <input
                    type="number"
                    value={newProduct.priceMax}
                    onChange={e => setNewProduct({ ...newProduct, priceMax: Number(e.target.value) })}
                    className="w-full border rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#087F23] focus:outline-none"
                  />
                </div>
              </div>
              <ImageUploader
                label="আমের ছবি (Photo Upload)"
                value={newProduct.image}
                onChange={(img) => setNewProduct({ ...newProduct, image: img })}
                helperText="ডিভাইস থেকে আমের ছবি আপলোড করুন।"
              />
              <button
                type="submit"
                className="w-full bg-[#087F23] hover:bg-[#006B18] text-white py-2.5 rounded-lg font-bold text-xs shadow-md transition-colors"
              >
                আম যোগ করুন
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 animate-fadeIn text-left">
            <div className="bg-[#087F23] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-base">আম এডিট করুন: {editingProduct.name}</h3>
              <button onClick={() => setEditingProduct(null)} className="text-white/80 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-4 space-y-3 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-0.5">আমের নাম (বাংলা)</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full border rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#087F23] focus:outline-none font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-0.5">কেজি প্রতি মূল্য (৳)</label>
                  <input
                    type="number"
                    value={editingProduct.pricePerKg}
                    onChange={e => setEditingProduct({ ...editingProduct, pricePerKg: Number(e.target.value) })}
                    className="w-full border rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#087F23] focus:outline-none font-bold text-[#087F23]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-0.5">উৎপাদন জেলা</label>
                  <input
                    type="text"
                    value={editingProduct.origin}
                    onChange={e => setEditingProduct({ ...editingProduct, origin: e.target.value })}
                    className="w-full border rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#087F23] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-0.5">সর্বনিম্ন মূল্য (৳)</label>
                  <input
                    type="number"
                    value={editingProduct.priceMin}
                    onChange={e => setEditingProduct({ ...editingProduct, priceMin: Number(e.target.value) })}
                    className="w-full border rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#087F23] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-0.5">সর্বোচ্চ মূল্য (৳)</label>
                  <input
                    type="number"
                    value={editingProduct.priceMax}
                    onChange={e => setEditingProduct({ ...editingProduct, priceMax: Number(e.target.value) })}
                    className="w-full border rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#087F23] focus:outline-none"
                  />
                </div>
              </div>
              <ImageUploader
                label="আমের ছবি (Photo Upload)"
                value={editingProduct.image}
                onChange={(img) => setEditingProduct({ ...editingProduct, image: img })}
                helperText="ডিভাইস থেকে সরাসরি নতুন ছবি আপলোড করুন।"
              />
              <button
                type="submit"
                className="w-full bg-[#087F23] hover:bg-[#006B18] text-white py-2.5 rounded-lg font-bold text-xs shadow-md transition-colors"
              >
                আপডেট সম্পন্ন করুন
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
