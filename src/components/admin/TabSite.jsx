import React, { useState, useEffect } from 'react';
import { Save, Cloud, CheckCircle2, AlertCircle, RefreshCw, Download, Copy, ExternalLink, Sparkles } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function TabSite({ 
  siteConfig, 
  onSave, 
  onNotify,
  cloudConfig,
  updateCloudConfig,
  syncWithCloud,
  isCloudSyncing,
  exportWebsiteData
}) {
  const [form, setForm] = useState({ ...siteConfig });
  const [projectIdInput, setProjectIdInput] = useState(cloudConfig?.projectId || '');
  const [copied, setCopied] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    setForm({ ...siteConfig });
  }, [siteConfig]);

  useEffect(() => {
    if (cloudConfig?.projectId) {
      setProjectIdInput(cloudConfig.projectId);
    }
  }, [cloudConfig?.projectId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onNotify('সাইট ও হেডার তথ্য সেভ হয়েছে!');
  };

  const handleConnectCloud = async () => {
    if (!projectIdInput.trim()) {
      if (updateCloudConfig) {
        await updateCloudConfig({ projectId: '' });
        onNotify('ক্লাউড ডাটাবেজ সংযোগ বিচ্ছিন্ন করা হয়েছে।');
      }
      return;
    }
    setIsConnecting(true);
    if (updateCloudConfig) {
      const ok = await updateCloudConfig({ projectId: projectIdInput.trim() });
      setIsConnecting(false);
      if (ok) {
        onNotify('🔥 ক্লাউড ডাটাবেজ সফলভাবে সংযুক্ত হয়েছে! এখন সবার মোবাইলে লাইভ দেখাবে।');
      } else {
        onNotify('ক্লাউড ডাটাবেজ সেভ হয়েছে। ফায়ারস্টোরে রুলস ও পারমিশন নিশ্চিত করুন।');
      }
    }
  };

  const handleCopyData = () => {
    if (exportWebsiteData) {
      const json = exportWebsiteData();
      navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      onNotify('বর্তমান সমস্ত প্রোডাক্ট ও ছবির ডেটা কপি করা হয়েছে!');
    }
  };

  const isCloudConnected = Boolean(cloudConfig?.projectId);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-left animate-fadeIn space-y-6">
      
      {/* ------------------------------------------------------------- */}
      {/* CLOUD DATABASE SECTION (FOR REAL-TIME SYNC ACROSS ALL PHONES) */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border-2 border-[#087F23]/30 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-100">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#087F23] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1.5 shadow-xs">
              <Cloud size={13} />
              <span>রিয়েল-টাইম ক্লাউড সিঙ্ক (সবার মোবাইলে লাইভ)</span>
            </div>
            <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
              <span>🔥 ক্লাউড ডাটাবেজ কানেকশন</span>
              {isCloudConnected ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <CheckCircle2 size={12} />
                  <span>সক্রিয় (Active)</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  <AlertCircle size={12} />
                  <span>লোকাল মোড (শুধু আপনার ডিভাইসে)</span>
                </span>
              )}
            </h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              আপনি ল্যাপটপে ছবি বা লেখা পরিবর্তন করলে যেন **সবার মোবাইলে সাথে সাথে পরিবর্তিত রূপটি লাইভ দেখা যায়** এবং একবার পরিবর্তন করলেই সারাজীবন স্থায়ী থাকে, সেজন্য এই ক্লাউড ডাটাবেজ কাজ করে।
            </p>
          </div>
        </div>

        {/* Project ID Input & Actions */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Google Firebase Project ID (বা ক্লাউড আইডি):
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={projectIdInput}
                onChange={(e) => setProjectIdInput(e.target.value)}
                placeholder="যেমন: mangobazar-8742"
                className="flex-1 border border-gray-300 rounded-lg p-2.5 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-[#087F23] focus:outline-none bg-white font-mono"
              />
              <button
                type="button"
                onClick={handleConnectCloud}
                disabled={isConnecting || isCloudSyncing}
                className="bg-[#087F23] hover:bg-[#006B18] text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer shrink-0 disabled:opacity-50"
              >
                <Cloud size={14} />
                <span>{isConnecting ? 'কানেক্ট হচ্ছে...' : 'কানেক্ট ও সিঙ্ক করুন'}</span>
              </button>

              {isCloudConnected && (
                <button
                  type="button"
                  onClick={syncWithCloud}
                  disabled={isCloudSyncing}
                  className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 text-xs font-bold px-3 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  title="ক্লাউড থেকে রিফ্রেশ করুন"
                >
                  <RefreshCw size={13} className={isCloudSyncing ? 'animate-spin text-[#087F23]' : ''} />
                  <span>রিফ্রেশ</span>
                </button>
              )}
            </div>
          </div>

          {/* Simple 3-Step Guide */}
          <div className="bg-white/80 border border-emerald-200/70 rounded-xl p-3.5 text-xs text-gray-700 space-y-1.5">
            <p className="font-bold text-[#087F23] flex items-center gap-1">
              <Sparkles size={13} />
              <span>১ মিনিটে ফ্রি ক্লাউড আইডি যেভাবে পাবেন:</span>
            </p>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-gray-600 pl-1">
              <li>
                <a 
                  href="https://console.firebase.google.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-blue-600 hover:underline font-bold inline-flex items-center gap-0.5"
                >
                  console.firebase.google.com <ExternalLink size={10} />
                </a> তে যান (আপনার জিমেইল <code className="bg-gray-100 px-1 py-0.2 rounded font-semibold text-gray-800">Karimmdsaimon11@gmail.com</code> দিয়ে লগইন করুন)।
              </li>
              <li><strong>"Create a project"</strong> এ ক্লিক করে নাম দিন (যেমন: <code className="bg-gray-100 px-1 py-0.2 rounded font-semibold text-gray-800">mangobazar</code>) এবং সেখানে থাকা Project ID টি কপি করে ওপরের বক্সে পেস্ট করুন।</li>
              <li>বামে <strong>"Firestore Database"</strong> এ ক্লিক করে <strong>"Create Database"</strong> দিন এবং <strong>"Start in test mode"</strong> সিলেক্ট করুন।</li>
            </ol>
          </div>

          {/* Quick Export / Backup Button */}
          <div className="pt-2 flex items-center justify-between flex-wrap gap-2 border-t border-emerald-100">
            <span className="text-[11px] text-gray-500">
              আপনার ল্যাপটপে করা পরিবর্তনগুলো কোডে সেভ করে পার্মানেন্ট করতে চান?
            </span>
            <button
              type="button"
              onClick={handleCopyData}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087F23] bg-white hover:bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              {copied ? <CheckCircle2 size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{copied ? 'কপি হয়েছে! চ্যাটে পেস্ট করতে পারেন' : '📥 বর্তমান ডেটা কপি করুন'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* STANDARD SITE & HEADER CONFIG FORM                            */}
      {/* ------------------------------------------------------------- */}
      <div>
        <h2 className="font-bold text-lg text-gray-900">ঘোষণা বার ও সাইট তথ্য</h2>
        <p className="text-xs text-gray-500">উপরের সবুজ ঘোষণা বার, ব্র্যান্ডিং ও হটলাইন নম্বর পরিবর্তন করুন</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">টপ অ্যানাউন্সমেন্ট টেক্সট (বাম পাশের লেখা)</label>
          <input
            type="text"
            value={form.announcementText}
            onChange={e => setForm({ ...form, announcementText: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">অর্ডার হটলাইন নম্বর</label>
            <input
              type="text"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp নম্বর</label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={e => setForm({ ...form, whatsapp: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">ব্র্যান্ড নাম (Brand Name)</label>
            <input
              type="text"
              value={form.brandName}
              onChange={e => setForm({ ...form, brandName: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none font-bold"
              placeholder="Mango Bazar"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">ব্র্যান্ড স্লোগান (Brand Subtitle)</label>
            <input
              type="text"
              value={form.brandSubtitle}
              onChange={e => setForm({ ...form, brandSubtitle: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#087F23] focus:outline-none"
              placeholder="100% natural and fresh"
            />
          </div>
        </div>

        {/* Website Mango Logo Uploader */}
        <div className="pt-1">
          <ImageUploader
            label="ম্যাঙ্গো লোগো ছবি (Website Mango Logo Upload)"
            value={form.logoImage}
            onChange={(newLogo) => {
              const updated = { ...form, logoImage: newLogo };
              setForm(updated);
              onSave(updated);
              if (onNotify) onNotify('নতুন লোগো সফলভাবে সেভ হয়েছে!');
            }}
            helperText="আপনার ম্যাঙ্গো লোগো ছবি (PNG, JPG, WebP) আপলোড করুন। কোনো ছবি না দিলে ডিফল্ট ম্যাঙ্গো আইকন প্রদর্শিত হবে।"
          />
        </div>

        <button
          type="submit"
          className="bg-[#087F23] hover:bg-[#006B18] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
        >
          <Save size={15} />
          <span>সাইট তথ্য সেভ করুন</span>
        </button>
      </form>
    </div>
  );
}
