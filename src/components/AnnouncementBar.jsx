import React from 'react';
import { Phone } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';

export default function AnnouncementBar() {
  const { siteConfig } = useWebsite();

  return (
    <div className="bg-[#006B18] text-white py-1.5 px-4 text-xs font-medium tracking-wide">
      <div className="max-w-[1120px] mx-auto flex items-center justify-between">
        <div className="hidden sm:flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#F6C928] animate-pulse"></span>
          <span>{siteConfig.announcementText}</span>
        </div>
        
        <div className="w-full sm:w-auto text-center sm:text-right flex items-center justify-center sm:justify-end gap-2 sm:gap-3">
          <span className="text-white/90">আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন:</span>
          <a 
            href={`tel:${siteConfig.phone}`} 
            className="font-bold hover:text-[#F6C928] transition-colors flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-white"
          >
            <Phone size={12} className="text-[#F6C928]" />
            <span>{siteConfig.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
