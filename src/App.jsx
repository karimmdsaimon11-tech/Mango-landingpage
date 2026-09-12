import React, { useState, useEffect } from 'react';
import { WebsiteProvider, useWebsite } from './context/WebsiteContext';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import MangoCollection from './components/MangoCollection';
import OfferBanner from './components/OfferBanner';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import TrustStrip from './components/TrustStrip';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import QuickOrderModal from './components/QuickOrderModal';
import CartDrawer from './components/CartDrawer';
import TrackOrderModal from './components/TrackOrderModal';
import SearchModal from './components/SearchModal';
import AdminPanel from './components/admin/AdminPanel';
import { MessageCircle, ShoppingBag, Settings } from 'lucide-react';

function LandingPageContent() {
  const { products } = useWebsite();

  const [selectedProductForOrder, setSelectedProductForOrder] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Check URL hash for #admin
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Cart state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'হিমসাগর প্রিমিয়াম আম',
      pricePerKg: 120,
      weightKg: 5,
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=300&q=80'
    }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleOpenOrderModal = (product = null) => {
    setSelectedProductForOrder(product || products[0]);
    setIsOrderModalOpen(true);
  };

  const handleAddToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, weightKg: (item.weightKg || 5) + 5 } 
          : item
      ));
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          pricePerKg: product.pricePerKg || 120,
          weightKg: 5,
          image: product.image
        }
      ]);
    }
    showToast(`"${product.name}" কার্টে যোগ করা হয়েছে!`);
  };

  const handleUpdateCartQuantity = (id, newWeight) => {
    if (newWeight <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, weightKg: newWeight } : item
    ));
  };

  const handleRemoveCartItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    showToast('পণ্যটি কার্ট থেকে সরানো হয়েছে।');
  };

  const handleOrderSuccess = (orderData) => {
    showToast(`অর্ডার আইডি ${orderData.orderId} সফলভাবে গৃহীত হয়েছে!`);
  };

  return (
    <div className="min-h-screen bg-white text-mango-text font-bengali flex flex-col selection:bg-[#EAF8E5] selection:text-[#087F23]">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <AnnouncementBar />

      {/* 2. HEADER / NAVBAR */}
      <Header
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTrackOrder={() => setIsTrackModalOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-grow">
        {/* 3. HERO SECTION */}
        <Hero onOrderClick={handleOpenOrderModal} />

        {/* 4. ABOUT / TRUST SECTION */}
        <TrustSection />

        {/* 5. MANGO COLLECTION */}
        <MangoCollection
          onOrderClick={handleOpenOrderModal}
          onAddToCart={handleAddToCart}
        />

        {/* 6. SPECIAL OFFER / CTA BANNER */}
        <OfferBanner onOrderClick={handleOpenOrderModal} />

        {/* 7. HOW IT WORKS */}
        <HowItWorks />

        {/* 8. CUSTOMER REVIEWS */}
        <Testimonials />

        {/* 9. FINAL CTA */}
        <FinalCTA onOrderClick={handleOpenOrderModal} />

        {/* 10. BOTTOM TRUST FEATURE STRIP */}
        <TrustStrip />
      </main>

      {/* 11. FOOTER */}
      <Footer
        onOpenTrackOrder={() => setIsTrackModalOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/88018112345678"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center group ring-4 ring-white"
        title="WhatsApp-এ যোগাযোগ করুন"
      >
        <MessageCircle size={24} className="fill-white text-[#25D366]" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pl-2">
          WhatsApp অর্ডার
        </span>
      </a>

      {/* FLOATING ADMIN QUICK ACCESS BUTTON */}
      <button
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-5 left-5 z-40 bg-[#006B18] hover:bg-[#087F23] text-white px-3.5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold ring-4 ring-white transition-all transform hover:scale-105 border border-white/20"
        title="অ্যাডমিন কন্ট্রোল প্যানেল খুলুন"
      >
        <Settings size={15} className="text-[#F6C928] animate-spin" style={{ animationDuration: '8s' }} />
        <span>অ্যাডমিন প্যানেল</span>
      </button>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#006B18] text-white px-4 py-2.5 rounded-xl shadow-xl border border-white/20 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
          <span>🥭</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MODALS */}
      <QuickOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        initialProduct={selectedProductForOrder}
        onOrderSuccess={handleOrderSuccess}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setSelectedProductForOrder(cartItems[0] || products[0]);
          setIsOrderModalOpen(true);
        }}
      />

      <TrackOrderModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOrderClick={handleOpenOrderModal}
      />

      {/* ADMIN PANEL FULLSCREEN MODAL */}
      {isAdminOpen && (
        <AdminPanel onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash === '#admin') {
            window.history.pushState('', document.title, window.location.pathname);
          }
        }} />
      )}

    </div>
  );
}

export default function App() {
  return (
    <WebsiteProvider>
      <LandingPageContent />
    </WebsiteProvider>
  );
}
