import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const normalizedInputEmail = email.trim().toLowerCase();
      const targetEmail = 'karimmdsaimon11@gmail.com';
      const targetPassword = 'karim123456';

      if (normalizedInputEmail === targetEmail && password === targetPassword) {
        localStorage.setItem('admin_auth_session', 'true');
        onLoginSuccess();
      } else {
        setErrorMessage('ভুল জিমেইল অ্যাকাউন্ট অথবা পাসওয়ার্ড! অনুগ্রহ করে সঠিক তথ্য দিন।');
        setIsLoading(false);
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn font-bengali">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 text-left">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#006B18] to-[#087F23] text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1 text-xs"
            title="ওয়েবসাইটে ফিরে যান"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">ওয়েবসাইট</span>
          </button>

          <div className="w-14 h-14 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-3 border border-white/20 shadow-inner">
            <Lock size={26} className="text-[#F6C928]" />
          </div>

          <h2 className="text-xl font-extrabold text-white">অ্যাডমিন সিকিউর লগইন</h2>
          <p className="text-xs text-emerald-100 mt-1">
            আমবাজার কন্ট্রোল প্যানেলে প্রবেশ করতে আপনার অনুমোদিত অ্যাকাউন্ট তথ্য দিন
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-start gap-2">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              জিমেইল অ্যাকাউন্ট (Gmail Account)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail size={16} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Password Field (Masked / Hidden with toggle) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              পাসওয়ার্ড (Password)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock size={16} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none focus:bg-white transition-all tracking-wider"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
                title={showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#087F23] hover:bg-[#006B18] text-white py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
          >
            <ShieldCheck size={18} className="text-[#F6C928]" />
            <span>{isLoading ? 'যাচাই করা হচ্ছে...' : 'লগইন করুন'}</span>
          </button>

          <p className="text-[11px] text-gray-400 text-center pt-2">
            শুধুমাত্র অনুমোদিত অ্যাডমিন এখানে প্রবেশ করতে পারবেন।
          </p>
        </form>

      </div>
    </div>
  );
}

