import React, { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X, Truck, Settings } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';

export default function Header({ 
  cartCount, 
  onOpenCart, 
  onOpenTrackOrder, 
  onOpenSearch,
  onOpenAdmin
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { siteConfig } = useWebsite();

  const navLinks = [
    { label: 'হোম', href: '#home' },
    { label: 'আমাদের সম্পর্কে', href: '#about' },
    { label: 'আম কালেকশন', href: '#collection' },
    { label: 'আমাদের সেবা', href: '#services' },
    { label: 'যোগাযোগ', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo (Matching Reference Screenshot: "আম") */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-[#EAF8E5] flex items-center justify-center border border-[#087F23]/20 group-hover:scale-105 transition-transform shadow-xs">
              <span className="text-2xl font-black text-[#087F23] tracking-tight">আম</span>
            </div>
            <span className="absolute -top-1 -right-1 text-xs">🍃</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl font-bold text-[#087F23] leading-none tracking-tight">
              {siteConfig.brandName || 'আমবাজার'}
            </span>
            <span className="text-[10px] text-gray-500 font-medium tracking-wide">
              {siteConfig.brandSubtitle || '১০০% প্রাকৃতিক ও ফ্রেশ'}
            </span>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-7 text-[15px] font-medium text-[#333333]">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="hover:text-[#087F23] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#087F23] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Search Button */}
          <button 
            onClick={onOpenSearch}
            className="p-2 text-gray-600 hover:text-[#087F23] hover:bg-[#EAF8E5] rounded-full transition-colors"
            title="আম খুঁজুন"
          >
            <Search size={18} />
          </button>

          {/* User / Admin Icon */}
          <button 
            onClick={onOpenAdmin}
            className="p-2 text-gray-600 hover:text-[#087F23] hover:bg-[#EAF8E5] rounded-full transition-colors hidden sm:inline-flex"
            title="অ্যাডমিন প্যানেল"
          >
            <User size={18} />
          </button>

          {/* Cart Icon with Live Counter */}
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-gray-600 hover:text-[#087F23] hover:bg-[#EAF8E5] rounded-full transition-colors"
            title="শপিং ব্যাগ"
          >
            <ShoppingBag size={19} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#087F23] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* Green Track Order Button (Exactly matching reference screenshot) */}
          <button
            onClick={onOpenTrackOrder}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#087F23] hover:bg-[#006B18] text-white text-xs font-semibold px-3 py-2 rounded shadow-xs hover:shadow transition-all"
          >
            <Truck size={14} className="text-[#F6C928]" />
            <span>Track Order</span>
          </button>

          {/* Admin Switcher Pill */}
          <button
            onClick={onOpenAdmin}
            className="hidden lg:inline-flex items-center gap-1 bg-[#EAF8E5] hover:bg-[#d5eed0] text-[#087F23] text-[11px] font-bold px-2.5 py-1.5 rounded-full border border-[#087F23]/20 transition-colors"
            title="অ্যাডমিন ড্যাশবোর্ড"
          >
            <Settings size={12} />
            <span>অ্যাডমিন</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-[#087F23] rounded-lg"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 shadow-lg animate-fadeIn">
          <div className="flex flex-col space-y-2 py-2">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#087F23] hover:bg-[#EAF8E5] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrackOrder();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#087F23] text-white py-2.5 rounded text-sm font-semibold shadow-xs"
              >
                <Truck size={16} className="text-[#F6C928]" />
                <span>Track Order (অর্ডার ট্র্যাকিং)</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-[#EAF8E5] text-gray-800 text-sm font-semibold py-2.5 rounded transition-colors"
              >
                <Settings size={16} className="text-[#087F23]" />
                <span>অ্যাডমিন কন্ট্রোল প্যানেল</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
