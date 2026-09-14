import React from 'react';

export default function DefaultMangoLogo({ className = 'w-10 h-10' }) {
  return (
    <div className={`relative flex items-center justify-center rounded-full bg-[#EAF8E5] border border-[#087F23]/25 shadow-xs shrink-0 overflow-hidden ${className}`}>
      <svg viewBox='0 0 48 48' fill='none' className='w-7 h-7' xmlns='http://www.w3.org/2000/svg'>
        {/* Green Leaf */}
        <path d='M26 12C26 12 32 9 36 13C40 17 35 22 35 22C35 22 30 21 27 17C25 15 26 12 26 12Z' fill='#15803D' />
        <path d='M26 12C28 15 31 18 35 22' stroke='#166534' strokeWidth='1.2' strokeLinecap='round' />
        
        {/* Brown Stem */}
        <path d='M23 15C23 12 24 9 26 7' stroke='#78350F' strokeWidth='2' strokeLinecap='round' />
        
        {/* Mango body with delicious gradient */}
        <defs>
          <linearGradient id='mangoLogoGrad' x1='12' y1='14' x2='36' y2='40' gradientUnits='userSpaceOnUse'>
            <stop offset='0%' stopColor='#FBBF24' />
            <stop offset='40%' stopColor='#F59E0B' />
            <stop offset='85%' stopColor='#EA580C' />
            <stop offset='100%' stopColor='#16A34A' />
          </linearGradient>
        </defs>
        <path d='M25 15C17 15 12 21 12 28C12 36 17 41 24 41C31 41 36 36 36 29C36 21 31 15 25 15Z' fill='url(#mangoLogoGrad)' />
        
        {/* Gentle highlight */}
        <ellipse cx='19' cy='23' rx='3.5' ry='5.5' transform='rotate(-25 19 23)' fill='white' fillOpacity='0.45' />
      </svg>
    </div>
  );
}