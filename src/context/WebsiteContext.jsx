import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultWebsiteData from '../data/defaultWebsiteData.json';
import { savePersistentData, loadPersistentData, clearPersistentData } from '../utils/storage';
import { getStoredCloudConfig, saveStoredCloudConfig, fetchFromCloud, saveToCloud } from '../utils/cloudSync';

const WebsiteContext = createContext(null);

const STORAGE_KEY = 'bengali_mango_cms_v3';

const DEFAULT_CATEGORIES = defaultWebsiteData.categories || [];

const DEFAULT_STATE = defaultWebsiteData;

export function WebsiteProvider({ children }) {
  const [cloudConfig, setCloudConfig] = useState(() => getStoredCloudConfig() || { projectId: '' });
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [cloudSyncStatus, setCloudSyncStatus] = useState(null);
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
        };
        const existingHero = parsed.heroConfig || {};
        const mergedHero = {
          ...DEFAULT_STATE.heroConfig,
          ...existingHero,
        };
        return {
          ...DEFAULT_STATE,
          ...parsed,
          siteConfig: mergedSite,
          heroConfig: mergedHero,
          categories: mergedCategories
        };
      }
    } catch (err) {
      console.error('Failed to parse saved website data:', err);
    }
    return DEFAULT_STATE;
  });

    // On mount: Load from Cloud Firestore first (if configured), then fallback to IndexedDB
  useEffect(() => {
    let isMounted = true;

    async function initData() {
      // If cloud configured, attempt to fetch latest live data
      if (cloudConfig?.projectId) {
        setIsCloudSyncing(true);
        const cloudData = await fetchFromCloud(cloudConfig.projectId);
        setIsCloudSyncing(false);
        if (isMounted && cloudData && typeof cloudData === 'object') {
          setData(prev => ({
            ...DEFAULT_STATE,
            ...prev,
            ...cloudData
          }));
          setCloudSyncStatus('synced');
          return;
        }
      }

      // Fallback to IndexedDB
      const saved = await loadPersistentData(STORAGE_KEY, null);
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
        };
        const existingHero = saved.heroConfig || {};
        const mergedHero = {
          ...DEFAULT_STATE.heroConfig,
          ...(prev.heroConfig || {}),
          ...existingHero,
        };
        setData(prev => ({
          ...DEFAULT_STATE,
          ...prev,
          ...saved,
          siteConfig: mergedSite,
          heroConfig: mergedHero,
          categories: mergedCategories.length > 0 ? mergedCategories : DEFAULT_CATEGORIES
        }));
      }
    }

    initData();
    return () => {
      isMounted = false;
    };
  }, [cloudConfig?.projectId]);

  const updateCloudConfig = async (newConfig) => {
    setCloudConfig(newConfig);
    saveStoredCloudConfig(newConfig);
    if (newConfig?.projectId) {
      setIsCloudSyncing(true);
      const ok = await saveToCloud(newConfig.projectId, data);
      setIsCloudSyncing(false);
      setCloudSyncStatus(ok ? 'synced' : 'error');
      return ok;
    }
    return false;
  };

  const syncWithCloud = async () => {
    if (!cloudConfig?.projectId) return false;
    setIsCloudSyncing(true);
    const remote = await fetchFromCloud(cloudConfig.projectId);
    setIsCloudSyncing(false);
    if (remote) {
      setData(prev => ({ ...DEFAULT_STATE, ...prev, ...remote }));
      setCloudSyncStatus('synced');
      return true;
    }
    return false;
  };

  const exportWebsiteData = () => {
    return JSON.stringify(data, null, 2);
  };

  // Save to both IndexedDB and localStorage, and sync to Cloud
  useEffect(() => {
    savePersistentData(STORAGE_KEY, data);

    if (cloudConfig?.projectId) {
      saveToCloud(cloudConfig.projectId, data).then(success => {
        if (success) setCloudSyncStatus('synced');
      });
    }
  }, [data, cloudConfig?.projectId]);

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
      resetToDefaults,
      cloudConfig,
      isCloudSyncing,
      cloudSyncStatus,
      updateCloudConfig,
      syncWithCloud,
      exportWebsiteData
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
