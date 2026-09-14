import React, { createContext, useContext, useState, useEffect } from 'react';
import { MANGO_CATEGORIES, MANGO_PRODUCTS, TRUST_FEATURES, HOW_IT_WORKS_STEPS, TESTIMONIALS } from '../data/mangoData';
import { savePersistentData, loadPersistentData, clearPersistentData } from '../utils/storage';

const WebsiteContext = createContext(null);

const STORAGE_KEY = 'bengali_mango_cms_v2';

const DEFAULT_CATEGORIES = MANGO_CATEGORIES.filter(c => c.id !== 'all');

const DEFAULT_STATE = {
  siteConfig: {
    announcementText: 'রাসায়নিক ও ফরমালিন মুক্ত ১০০% খাঁটি গাছপাকা আম',
    phone: '018112345678',
    whatsapp: '018112345678',
    brandName: 'Mango Bazar',
    brandSubtitle: '100% natural and fresh',
    logoImage: '',
  },
  heroConfig: {
    badge: 'রাজশাহী ও চাঁপাইনবাবগঞ্জের আসল আম',
    title: 'ফ্রেশ ও মিষ্টি আম',
    subtitle: 'সরাসরি বাগান থেকে আপনার ঘরে',
    description: 'হিমসাগর, ল্যাংড়া, আম্রপালি সহ সেরা মানের আম এখন অনলাইনে অর্ডার করুন। কোনোরকম ফরমালিন বা ক্ষতিকর কেমিক্যাল ছাড়া গাছপাকা ফ্রেশ স্বাদের নিশ্চয়তা।',
    ctaText: 'এখনই অর্ডার করুন',
    secondaryCtaText: 'আম দেখুন',
    trustBadges: ['১০০% ফ্রেশ', 'সরাসরি বাগান থেকে', 'নিরাপদ ডেলিভারি'],
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=85',
  },
  categories: DEFAULT_CATEGORIES,
  trustFeatures: TRUST_FEATURES,
  products: MANGO_PRODUCTS,
  offerBanner: {
    tag: 'সীমিত সময়ের স্পেশাল অফার',
    title: 'এই মৌসুমের সেরা আম এখন আপনার দরজায়!',
    subtitle: 'আজই অর্ডার করুন এবং উপভোগ করুন বাগানের তাজা স্বাদ। যেকোনো ১০ কেজি বা তার বেশি অর্ডারে বিশেষ ছাড় ও ফ্রি ডেলিভারি উপহার!',
    ctaText: 'এখনই অর্ডার করুন',
    cashbackText: '১০% অতিরিক্ত ক্যাশব্যাক',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80',
  },
  howItWorks: HOW_IT_WORKS_STEPS,
  testimonials: TESTIMONIALS,
  finalCta: {
    badge: 'ফ্রেশ আমের সেরা ঠিকানা',
    title: 'বাগানের তাজা আম পৌঁছে যাক আপনার ঘরে',
    description: 'আজই আপনার পছন্দের আম অর্ডার করুন। সরাসরি বাগান থেকে বাছাইকৃত শতভাগ ভেজালমুক্ত আম ঘরে বসে উপভোগ করুন।',
    buttonText: 'অর্ডার করুন',
    guaranteeText: '✓ ক্যাশ অন ডেলিভারি সুবিধা | ✓ দেশব্যাপী হোম ডেলিভারি | ✓ গ্যারান্টিযুক্ত মিষ্টতা'
  },
  footerConfig: {
    about: 'Mango Bazar হচ্ছে তাজা ও রাসায়নিক মুক্ত আমের একটি অনলাইন প্ল্যাটফর্ম। আমরা সরাসরি বাগান থেকে সেরা মানের আম সংগ্রহ করে অত্যন্ত যত্ন সহকারে পৌঁছে দিই আপনার ঠিকানায়।',
    phone: '018112345678',
    whatsapp: '018112345678',
    email: 'info@mangobazar.com',
    address: 'বাগান হাব: কানসাট, শিবগঞ্জ, চাঁপাইনবাবগঞ্জ',
    copyright: 'Copyright All Reserved 2026 | Made for Bengali Mango Lovers',
  },
  orders: [
    {
      id: 'MB-784210',
      customerName: 'তানভীর আহমেদ',
      phone: '01712345678',
      address: 'বাড়ি ১২, রোড ৭, ধানমন্ডি, ঢাকা',
      productName: 'হিমসাগর প্রিমিয়াম আম',
      weightKg: 10,
      totalAmount: 1280,
      date: '১২ সেপ্টেম্বর, ২০২৬',
      status: 'পথে আছে', // অপেক্ষমান, নিশ্চিত, পথে আছে, সম্পন্ন, বাতিল
    },
    {
      id: 'MB-651920',
      customerName: 'সাবরিনা ইসলাম',
      phone: '01898765432',
      address: 'পাঁচলাইশ আবাসিক এলাকা, চট্টগ্রাম',
      productName: 'হাঁড়িভাঙা রাজকীয় আম',
      weightKg: 5,
      totalAmount: 705,
      date: '১১ সেপ্টেম্বর, ২০২৬',
      status: 'সম্পন্ন',
    }
  ]
};

export function WebsiteProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const existingCats = Array.isArray(parsed.categories) ? parsed.categories : [];
        const mergedCategories = [...existingCats];
        DEFAULT_CATEGORIES.forEach(def => {
          if (!mergedCategories.some(c => c.id === def.id || c.name.trim().toLowerCase() === def.name.trim().toLowerCase())) {
            mergedCategories.push(def);
          }
        });
        const existingSite = parsed.siteConfig || {};
        const mergedSite = {
          ...DEFAULT_STATE.siteConfig,
          ...existingSite,
          brandName: (existingSite.brandName && existingSite.brandName !== 'আমবাজার') ? existingSite.brandName : 'Mango Bazar',
          brandSubtitle: (existingSite.brandSubtitle && existingSite.brandSubtitle !== '১০০% প্রাকৃতিক ও ফ্রেশ') ? existingSite.brandSubtitle : '100% natural and fresh',
          logoImage: existingSite.logoImage || '',
        };
        return {
          ...DEFAULT_STATE,
          ...parsed,
          siteConfig: mergedSite,
          categories: mergedCategories
        };
      }
    } catch (err) {
      console.error('Failed to parse saved website data:', err);
    }
    return DEFAULT_STATE;
  });

  // On mount: Load from IndexedDB (preserves all photos & CMS changes permanently)
  useEffect(() => {
    let isMounted = true;
    loadPersistentData(STORAGE_KEY, null).then((saved) => {
      if (isMounted && saved && typeof saved === 'object') {
        const existingCats = Array.isArray(saved.categories) ? saved.categories : [];
        const mergedCategories = [...existingCats];
        DEFAULT_CATEGORIES.forEach(def => {
          if (!mergedCategories.some(c => c.id === def.id || c.name.trim().toLowerCase() === def.name.trim().toLowerCase())) {
            mergedCategories.push(def);
          }
        });
        const existingSite = saved.siteConfig || {};
        const mergedSite = {
          ...DEFAULT_STATE.siteConfig,
          ...existingSite,
          brandName: (existingSite.brandName && existingSite.brandName !== 'আমবাজার') ? existingSite.brandName : 'Mango Bazar',
          brandSubtitle: (existingSite.brandSubtitle && existingSite.brandSubtitle !== '১০০% প্রাকৃতিক ও ফ্রেশ') ? existingSite.brandSubtitle : '100% natural and fresh',
          logoImage: existingSite.logoImage || '',
        };
        setData(prev => ({
          ...DEFAULT_STATE,
          ...prev,
          ...saved,
          siteConfig: mergedSite,
          categories: mergedCategories
        }));
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Save to both IndexedDB and localStorage whenever data changes
  useEffect(() => {
    savePersistentData(STORAGE_KEY, data);
  }, [data]);

  // Update Methods
  const updateSiteConfig = (updated) => {
    setData(prev => ({ ...prev, siteConfig: { ...prev.siteConfig, ...updated } }));
  };

  const updateHeroConfig = (updated) => {
    setData(prev => ({ ...prev, heroConfig: { ...prev.heroConfig, ...updated } }));
  };

  const updateTrustFeatures = (newFeatures) => {
    setData(prev => ({ ...prev, trustFeatures: newFeatures }));
  };

  const updateProducts = (newProducts) => {
    setData(prev => ({ ...prev, products: newProducts }));
  };

  const addProduct = (product) => {
    const newId = Date.now();
    const newProd = {
      ...product,
      id: newId,
      rating: 5.0,
      reviewsCount: product.reviewsCount || 1,
      inStock: true
    };
    setData(prev => ({ ...prev, products: [newProd, ...prev.products] }));
    return newProd;
  };

  const editProduct = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? { ...p, ...updatedFields } : p)
    }));
  };

  const deleteProduct = (id) => {
    setData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  };

  const updateOfferBanner = (updated) => {
    setData(prev => ({ ...prev, offerBanner: { ...prev.offerBanner, ...updated } }));
  };

  const updateHowItWorks = (newSteps) => {
    setData(prev => ({ ...prev, howItWorks: newSteps }));
  };

  const updateTestimonials = (newReviews) => {
    setData(prev => ({ ...prev, testimonials: newReviews }));
  };

  const addTestimonial = (testimonial) => {
    const newReview = {
      ...testimonial,
      id: Date.now(),
      verified: true
    };
    setData(prev => ({ ...prev, testimonials: [newReview, ...prev.testimonials] }));
  };

  const deleteTestimonial = (id) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id)
    }));
  };

  const updateFinalCta = (updated) => {
    setData(prev => ({ ...prev, finalCta: { ...prev.finalCta, ...updated } }));
  };

  const updateFooterConfig = (updated) => {
    setData(prev => ({ ...prev, footerConfig: { ...prev.footerConfig, ...updated } }));
  };

  const addOrder = (order) => {
    const newOrder = {
      id: order.orderId || ('MB-' + Math.floor(100000 + Math.random() * 900000)),
      customerName: order.customer.name,
      phone: order.customer.phone,
      address: order.customer.address,
      productName: order.product,
      weightKg: order.weightKg,
      totalAmount: order.grandTotal,
      date: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
      status: 'অপেক্ষমান'
    };
    setData(prev => ({ ...prev, orders: [newOrder, ...prev.orders] }));
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setData(prev => ({
      ...prev,
      orders: prev.orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
    }));
  };

  const addCategory = (categoryName) => {
    const trimmed = (categoryName || '').trim();
    if (!trimmed) return null;

    const currentCategories = data.categories || DEFAULT_CATEGORIES;
    const existing = currentCategories.find(
      c => c.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (existing) {
      return existing;
    }

    const newCategory = {
      id: 'cat_' + Date.now(),
      name: trimmed
    };

    setData(prev => ({
      ...prev,
      categories: [...(prev.categories || DEFAULT_CATEGORIES), newCategory]
    }));

    return newCategory;
  };

  const deleteCategory = (id) => {
    setData(prev => ({
      ...prev,
      categories: (prev.categories || DEFAULT_CATEGORIES).filter(c => c.id !== id)
    }));
  };

  const resetToDefaults = async () => {
    if (window.confirm('আপনি কি নিশ্চিত যে সমস্ত কন্টেন্ট ডিফল্ট অবস্থায় ফিরিয়ে নিতে চান? আপনার সমস্ত পরিবর্তন মুছে যাবে।')) {
      setData(DEFAULT_STATE);
      await clearPersistentData(STORAGE_KEY);
    }
  };

  return (
    <WebsiteContext.Provider value={{
      ...data,
      categories: data.categories || DEFAULT_CATEGORIES,
      addCategory,
      deleteCategory,
      updateSiteConfig,
      updateHeroConfig,
      updateTrustFeatures,
      updateProducts,
      addProduct,
      editProduct,
      deleteProduct,
      updateOfferBanner,
      updateHowItWorks,
      updateTestimonials,
      addTestimonial,
      deleteTestimonial,
      updateFinalCta,
      updateFooterConfig,
      addOrder,
      updateOrderStatus,
      resetToDefaults
    }}>
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsite() {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
}
