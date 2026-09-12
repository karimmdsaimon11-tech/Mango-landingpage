import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Tags } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function TabProducts({
  products,
  categories = [],
  onAdd,
  onEdit,
  onDelete,
  onAddCategory,
  onDeleteCategory,
  onNotify
}) {
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCatManagerModal, setShowCatManagerModal] = useState(false);

  // Inline category add state
  const [showInlineAddCat, setShowInlineAddCat] = useState(false);
  const [showInlineEditCat, setShowInlineEditCat] = useState(false);
  const [inlineCategoryName, setInlineCategoryName] = useState('');

  // Manager modal category name
  const [managerCategoryName, setManagerCategoryName] = useState('');

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

  const handleCreateInlineCategory = (isAddModal = true) => {
    const trimmed = inlineCategoryName.trim();
    if (!trimmed) return;

    if (onAddCategory) {
      const added = onAddCategory(trimmed);
      if (added) {
        if (isAddModal) {
          setNewProduct(prev => ({ ...prev, category: added.id }));
          setShowInlineAddCat(false);
        } else {
          setEditingProduct(prev => ({ ...prev, category: added.id }));
          setShowInlineEditCat(false);
        }
        setInlineCategoryName('');
        onNotify(`"${added.name}" ক্যাটাগরি সফলভাবে তৈরি করা হয়েছে!`);
      }
    }
  };

  const handleManagerAddCategory = (e) => {
    e.preventDefault();
    const trimmed = managerCategoryName.trim();
    if (!trimmed) return;

    if (onAddCategory) {
      const added = onAddCategory(trimmed);
      if (added) {
        setManagerCategoryName('');
        onNotify(`"${added.name}" ক্যাটাগরি সফলভাবে যোগ করা হয়েছে!`);
      }
    }
  };

  const handleManagerDeleteCategory = (cat) => {
    const productsInCat = products.filter(p => p.category === cat.id);
    if (productsInCat.length > 0) {
      const confirmDelete = window.confirm(
        `"${cat.name}" ক্যাটাগরির অধীনে বর্তমানে ${productsInCat.length}টি আম রয়েছে। আপনি কি নিশ্চিত যে এই ক্যাটাগরি মুছে ফেলতে চান?`
      );
      if (!confirmDelete) return;
    } else {
      const confirmDelete = window.confirm(`আপনি কি "${cat.name}" ক্যাটাগরি মুছে ফেলতে চান?`);
      if (!confirmDelete) return;
    }

    if (onDeleteCategory) {
      onDeleteCategory(cat.id);
      onNotify(`"${cat.name}" ক্যাটাগরি মুছে ফেলা হয়েছে!`);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name) return;
    onAdd(newProduct);
    setShowAddModal(false);
    setShowInlineAddCat(false);
    setNewProduct({
      category: categories.length > 0 ? categories[0].id : 'himsagar',
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
    setShowInlineEditCat(false);
    onNotify('পণ্যের বিবরণ আপডেট করা হয়েছে!');
  };

  const getCategoryName = (catId) => {
    const found = categories.find(c => c.id === catId);
    return found ? found.name : catId;
  };

  return (
    <div className="space-y-4 text-left animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="font-bold text-lg text-gray-900">আম পণ্যসমূহ তালিকা ({products.length})</h2>
          <p className="text-xs text-gray-500">
            যেকোনো আমের তথ্য, দাম বা ছবি পরিবর্তন করুন, নতুন ক্যাটাগরি যুক্ত করুন অথবা নতুন আম যোগ করুন
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowCatManagerModal(true)}
            className="bg-emerald-50 hover:bg-emerald-100 text-[#087F23] border border-emerald-300 font-bold text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            title="ক্যাটাগরি সমূহ পরিচালনা করুন"
          >
            <Tags size={14} />
            <span>ক্যাটাগরি সমূহ ({categories.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="bg-[#087F23] hover:bg-[#006B18] text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-xs"
          >
            <Plus size={15} />
            <span>নতুন আম যোগ করুন</span>
          </button>
        </div>
      </div>

      {/* Product List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs flex items-center gap-3 justify-between hover:border-[#087F23]/30 transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-14 h-14 rounded-lg object-cover bg-gray-100 shrink-0 border border-gray-200"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                    {product.name}
                  </h4>
                  <span className="shrink-0 bg-emerald-50 text-[#087F23] text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                    {getCategoryName(product.category)}
                  </span>
                </div>
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
                type="button"
                onClick={() => setEditingProduct({ ...product })}
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
                  <div className="flex items-center justify-between mb-0.5">
                    <label className="block text-xs font-bold text-gray-700">ক্যাটাগরি</label>
                    <button
                      type="button"
                      onClick={() => setShowInlineAddCat(!showInlineAddCat)}
                      className="text-[11px] font-bold text-[#087F23] hover:underline flex items-center gap-0.5"
                      title="নতুন ক্যাটাগরি যোগ করুন"
                    >
                      <Plus size={12} />
                      <span>নতুন</span>
                    </button>
                  </div>

                  {showInlineAddCat && (
                    <div className="flex items-center gap-1.5 p-1.5 bg-emerald-50 rounded-lg border border-emerald-200 mb-1.5 animate-fadeIn">
                      <input
                        type="text"
                        value={inlineCategoryName}
                        onChange={e => setInlineCategoryName(e.target.value)}
                        placeholder="ক্যাটাগরির নাম"
                        className="flex-1 border bg-white rounded p-1 text-xs focus:ring-1 focus:ring-[#087F23] outline-none"
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleCreateInlineCategory(true);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleCreateInlineCategory(true)}
                        className="bg-[#087F23] text-white px-2 py-1 rounded text-xs font-bold hover:bg-[#006B18]"
                      >
                        যোগ
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowInlineAddCat(false);
                          setInlineCategoryName('');
                        }}
                        className="text-gray-400 hover:text-gray-600 px-1 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <select
                    value={newProduct.category}
                    onChange={e => {
                      if (e.target.value === '__add_new__') {
                        setShowInlineAddCat(true);
                      } else {
                        setNewProduct({ ...newProduct, category: e.target.value });
                      }
                    }}
                    className="w-full border rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#087F23] focus:outline-none bg-white font-medium"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                    <option value="__add_new__" className="text-[#087F23] font-bold">
                      + নতুন ক্যাটাগরি তৈরি করুন...
                    </option>
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

              {/* Category & Origin with dynamic Custom Category Support in Edit */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <label className="block text-xs font-bold text-gray-700">ক্যাটাগরি</label>
                    <button
                      type="button"
                      onClick={() => setShowInlineEditCat(!showInlineEditCat)}
                      className="text-[11px] font-bold text-[#087F23] hover:underline flex items-center gap-0.5"
                      title="নতুন ক্যাটাগরি যোগ করুন"
                    >
                      <Plus size={12} />
                      <span>নতুন</span>
                    </button>
                  </div>

                  {/* Inline quick category input for edit */}
                  {showInlineEditCat && (
                    <div className="flex items-center gap-1.5 p-1.5 bg-emerald-50 rounded-lg border border-emerald-200 mb-1.5 animate-fadeIn">
                      <input
                        type="text"
                        value={inlineCategoryName}
                        onChange={e => setInlineCategoryName(e.target.value)}
                        placeholder="ক্যাটাগরির নাম"
                        className="flex-1 border bg-white rounded p-1 text-xs focus:ring-1 focus:ring-[#087F23] outline-none"
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleCreateInlineCategory(false);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleCreateInlineCategory(false)}
                        className="bg-[#087F23] text-white px-2 py-1 rounded text-xs font-bold hover:bg-[#006B18]"
                      >
                        যোগ
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowInlineEditCat(false);
                          setInlineCategoryName('');
                        }}
                        className="text-gray-400 hover:text-gray-600 px-1 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <select
                    value={editingProduct.category || (categories[0]?.id || 'himsagar')}
                    onChange={e => {
                      if (e.target.value === '__add_new__') {
                        setShowInlineEditCat(true);
                      } else {
                        setEditingProduct({ ...editingProduct, category: e.target.value });
                      }
                    }}
                    className="w-full border rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#087F23] focus:outline-none bg-white font-medium"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                    <option value="__add_new__" className="text-[#087F23] font-bold">
                      + নতুন ক্যাটাগরি তৈরি করুন...
                    </option>
                  </select>
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

              <div className="grid grid-cols-3 gap-2">
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

      {/* ======================================================== */}
      {/* CATEGORY MANAGER MODAL                                  */}
      {/* ======================================================== */}
      {showCatManagerModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 animate-fadeIn text-left">
            
            <div className="bg-[#087F23] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tags size={18} className="text-[#F6C928]" />
                <h3 className="font-bold text-base">ক্যাটাগরি সমূহ পরিচালনা ({categories.length})</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCatManagerModal(false)}
                className="text-white/80 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              
              {/* Add New Category Form */}
              <form onSubmit={handleManagerAddCategory} className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl space-y-2">
                <label className="block text-xs font-bold text-gray-800">
                  নতুন ক্যাটাগরি তৈরি করুন
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={managerCategoryName}
                    onChange={e => setManagerCategoryName(e.target.value)}
                    placeholder="যেমন: বারি-৪, সূর্যডিম, মল্লিকা..."
                    className="flex-1 bg-white border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] outline-none font-medium"
                  />
                  <button
                    type="submit"
                    className="bg-[#087F23] hover:bg-[#006B18] text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-1 shrink-0"
                  >
                    <Plus size={14} />
                    <span>যোগ করুন</span>
                  </button>
                </div>
                <p className="text-[11px] text-gray-500">
                  নতুন ক্যাটাগরি যোগ করলে তা ড্রপডাউন এবং হোমপেজের ফিল্টারে প্রদর্শিত হবে।
                </p>
              </form>

              {/* Category List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  বর্তমান ক্যাটাগরি তালিকা ({categories.length})
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {categories.map((cat) => {
                    const count = products.filter(p => p.category === cat.id).length;
                    return (
                      <div
                        key={cat.id}
                        className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-200 rounded-xl hover:border-emerald-300 transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="font-bold text-xs sm:text-sm text-gray-800 truncate">
                            {cat.name}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {count} টি পণ্য সংযুক্ত
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleManagerDeleteCategory(cat)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                          title={`"${cat.name}" মুছে ফেলুন`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 text-center">
                <button
                  type="button"
                  onClick={() => setShowCatManagerModal(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs px-5 py-2 rounded-lg transition-colors"
                >
                  বন্ধ করুন
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
