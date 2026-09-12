import React, { useRef } from 'react';
import { Upload, Image as ImageIcon, CheckCircle, RefreshCw } from 'lucide-react';

export default function ImageUploader({ label, value, onChange, helperText }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate if it's an image
    if (!file.type.startsWith('image/')) {
      alert('অনুগ্রহ করে শুধুমাত্র ছবি ফাইল (JPG, PNG, WebP) সিলেক্ট করুন।');
      return;
    }

    // Read as Base64 Data URL so it saves directly in state and localStorage
    const reader = new FileReader();
    reader.onload = (event) => {
      onChange(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-1.5 text-left">
      {label && (
        <label className="block text-xs font-bold text-gray-700">
          {label}
        </label>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-gray-50 border-2 border-dashed border-gray-300 hover:border-[#087F23] rounded-xl transition-colors group">
        
        {/* Current Image Preview */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-gray-200 bg-white shrink-0 shadow-xs">
          {value ? (
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              <ImageIcon size={24} />
              <span className="text-[9px] mt-1">ছবি নেই</span>
            </div>
          )}
          {value && (
            <div className="absolute top-1 right-1 bg-[#087F23] text-white rounded-full p-0.5 shadow">
              <CheckCircle size={12} />
            </div>
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex-1 text-center sm:text-left space-y-1.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#087F23] hover:bg-[#006B18] text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Upload size={14} />
              <span>{value ? 'ছবি পরিবর্তন করুন' : 'ছবি আপলোড করুন'}</span>
            </button>

            {value && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1 transition-colors"
              >
                <RefreshCw size={13} />
                <span>নতুন ছবি বাছুন</span>
              </button>
            )}
          </div>

          <p className="text-[11px] text-gray-500">
            {helperText || 'আপনার ডিভাইস (কম্পিউটার/মোবাইল) থেকে সরাসরি যেকোনো ছবি আপলোড করুন।'}
          </p>
        </div>

      </div>
    </div>
  );
}
