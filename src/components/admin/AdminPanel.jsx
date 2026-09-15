import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import AdminHeader from './AdminHeader';
import AdminLogin from './AdminLogin';
import TabDashboard from './TabDashboard';
import TabProducts from './TabProducts';
import TabHero from './TabHero';
import TabSite from './TabSite';
import TabOffers from './TabOffers';
import TabReviews from './TabReviews';
import TabOrders from './TabOrders';
import TabFooter from './TabFooter';
import {
  LayoutDashboard,
  ShoppingBag,
  Image as ImageIcon,
  Megaphone,
  Sparkles,
  MessageSquare,
  PackageCheck,
  Settings,
  CheckCircle2
} from 'lucide-react';

export default function AdminPanel({ onClose }) {
  const {
    siteConfig,
    heroConfig,
    products,
    categories,
    offerBanner,
    testimonials,
    finalCta,
    footerConfig,
    orders,
    addCategory,
    deleteCategory,
    updateSiteConfig,
    updateHeroConfig,
    addProduct,
    editProduct,
    deleteProduct,
    updateOfferBanner,
    addTestimonial,
    deleteTestimonial,
    updateFinalCta,
    updateFooterConfig,
    updateOrderStatus,
    resetToDefaults,
    cloudConfig,
    updateCloudConfig,
    syncWithCloud,
    isCloudSyncing,
    exportWebsiteData
  } = useWebsite();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('admin_auth_session') === 'true';
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [saveAlert, setSaveAlert] = useState(false);

  const triggerNotification = (msg) => {
    setSaveAlert(msg);
    setTimeout(() => setSaveAlert(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth_session');
    setIsAuthenticated(false);
    onClose();
  };

  // If not authenticated, require Gmail & Password login
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => setIsAuthenticated(true)}
        onClose={onClose}
      />
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
    { id: 'products', label: 'আম পণ্যসমূহ', icon: ShoppingBag, count: products.length },
    { id: 'hero', label: 'হিরো ব্যানার ও ব্যাজ', icon: ImageIcon },
    { id: 'header_site', label: 'হেডার ও ঘোষণা', icon: Megaphone },
    { id: 'offers', label: 'অফার ও ফিচার', icon: Sparkles },
    { id: 'reviews', label: 'গ্রাহক রিভিউ', icon: MessageSquare, count: testimonials.length },
    { id: 'orders', label: 'কাস্টমার অর্ডারসমূহ', icon: PackageCheck, count: orders.length, alert: orders.filter(o => o.status === 'অপেক্ষমান').length },
    { id: 'footer', label: 'ফুটার ও সেটিংস', icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gray-100 flex flex-col font-bengali text-gray-800 overflow-hidden">
      
      {/* Top Navbar */}
      <AdminHeader
        siteConfig={siteConfig}
        onClose={onClose}
        onReset={resetToDefaults}
        onLogout={handleLogout}
      />

      {/* Save Notification Banner */}
      {saveAlert && (
        <div className="bg-[#087F23] text-white px-4 py-2 text-center text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 animate-fadeIn shrink-0">
          <CheckCircle2 size={16} className="text-[#F6C928]" />
          <span>{saveAlert} — লাইভ ওয়েবসাইটে স্বয়ংক্রিয়ভাবে আপডেট হয়ে গেছে!</span>
        </div>
      )}

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Tabs */}
        <aside className="w-56 sm:w-64 bg-white border-r border-gray-200 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="p-3 space-y-1">
            <div className="text-[11px] font-bold text-gray-400 px-3 py-1 uppercase tracking-wider">
              মেনু অপশন
            </div>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#087F23] text-white shadow-xs'
                      : 'text-gray-700 hover:bg-[#EAF8E5] hover:text-[#087F23]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={17} className={isActive ? 'text-[#F6C928]' : 'text-gray-500'} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                  {tab.alert > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                      {tab.alert}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-3 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-500 text-center">
            <p className="font-semibold text-gray-700">স্বয়ংক্রিয় সেভ চালু আছে</p>
            <p className="text-[10px] text-gray-400 mt-0.5">সব পরিবর্তন ব্রাউজারে সংরক্ষিত থাকে</p>
          </div>
        </aside>

        {/* Tab Content Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-100">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {activeTab === 'dashboard' && (
              <TabDashboard
                products={products}
                orders={orders}
                testimonials={testimonials}
                siteConfig={siteConfig}
                onNavigate={(tabId) => setActiveTab(tabId)}
                onClose={onClose}
              />
            )}

            {activeTab === 'products' && (
              <TabProducts
                products={products}
                categories={categories}
                onAdd={addProduct}
                onEdit={editProduct}
                onDelete={deleteProduct}
                onAddCategory={addCategory}
                onDeleteCategory={deleteCategory}
                onNotify={triggerNotification}
              />
            )}

            {activeTab === 'hero' && (
              <TabHero
                heroConfig={heroConfig}
                onSave={updateHeroConfig}
                onNotify={triggerNotification}
              />
            )}

            {activeTab === 'header_site' && (
              <TabSite
                siteConfig={siteConfig}
                onSave={updateSiteConfig}
                onNotify={triggerNotification}
                cloudConfig={cloudConfig}
                updateCloudConfig={updateCloudConfig}
                syncWithCloud={syncWithCloud}
                isCloudSyncing={isCloudSyncing}
                exportWebsiteData={exportWebsiteData}
              />
            )}

            {activeTab === 'offers' && (
              <TabOffers
                offerBanner={offerBanner}
                finalCta={finalCta}
                onSaveOffer={updateOfferBanner}
                onSaveFinalCta={updateFinalCta}
                onNotify={triggerNotification}
              />
            )}

            {activeTab === 'reviews' && (
              <TabReviews
                testimonials={testimonials}
                onAdd={addTestimonial}
                onDelete={deleteTestimonial}
                onNotify={triggerNotification}
              />
            )}

            {activeTab === 'orders' && (
              <TabOrders
                orders={orders}
                onUpdateStatus={updateOrderStatus}
                onNotify={triggerNotification}
              />
            )}

            {activeTab === 'footer' && (
              <TabFooter
                footerConfig={footerConfig}
                onSave={updateFooterConfig}
                onNotify={triggerNotification}
              />
            )}

          </div>
        </main>
      </div>

    </div>
  );
}
