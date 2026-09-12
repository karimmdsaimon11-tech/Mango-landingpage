export const MANGO_CATEGORIES = [
  { id: 'all', name: 'সকল আম' },
  { id: 'himsagar', name: 'হিমসাগর আম' },
  { id: 'haribhanga', name: 'হাঁড়িভাঙা আম' },
  { id: 'langra', name: 'ল্যাংড়া আম' },
  { id: 'amrupali', name: 'আম্রপালি আম' },
  { id: 'fazli', name: 'ফজলি আম' },
  { id: 'gopalbhog', name: 'গোপালভোগ আম' },
];

export const MANGO_PRODUCTS = [
  // Himsagar section
  {
    id: 1,
    category: 'himsagar',
    name: 'হিমসাগর প্রিমিয়াম আম',
    nameEn: 'Premium Himsagar Mango - Fresh Research Variety',
    description: 'মিষ্টি ও চমৎকার সুগন্ধযুক্ত রাজশাহী ও চাঁপাইনবাবগঞ্জের বিখ্যাত হিমসাগর আম।',
    rating: 5.0,
    reviewsCount: 62,
    priceMin: 235,
    priceMax: 645,
    pricePerKg: 120,
    unit: 'কেজি',
    minOrder: '৫ কেজি',
    isOrganic: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    tag: 'বেস্টসেলার',
    origin: 'রাজশাহী'
  },
  {
    id: 2,
    category: 'himsagar',
    name: 'বাগান তাজা হিমসাগর আম',
    nameEn: 'Fresh Garden Himsagar Mango - Sweet Pack',
    description: 'গাছপাকা প্রাকৃতিক সুবাস ও মিষ্টতা সমৃদ্ধ বাছাইকৃত সেরা হিমসাগর।',
    rating: 5.0,
    reviewsCount: 78,
    priceMin: 220,
    priceMax: 785,
    pricePerKg: 130,
    unit: 'কেজি',
    minOrder: '৫ কেজি',
    isOrganic: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=600&q=80',
    tag: '১০০% ফ্রেশ',
    origin: 'চাঁপাইনবাবগঞ্জ'
  },
  {
    id: 3,
    category: 'himsagar',
    name: 'হিমসাগর ভ্যালু প্যাক আম',
    nameEn: 'Himsagar Value Pack Mango - Fresh Deal',
    description: 'পারিবারিক ব্যবহারের জন্য সাশ্রয়ী মূল্যে ফ্রেশ হিমসাগর আম।',
    rating: 5.0,
    reviewsCount: 36,
    priceMin: 155,
    priceMax: 525,
    pricePerKg: 110,
    unit: 'কেজি',
    minOrder: '৫ কেজি',
    isOrganic: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=600&q=80',
    tag: 'ভ্যালু ডিল',
    origin: 'সাতক্ষীরা'
  },
  {
    id: 4,
    category: 'himsagar',
    name: 'হিমসাগর স্পেশাল আম',
    nameEn: 'Himsagar Season Mango - Budget Fresh',
    description: 'মিষ্টি, আঁশহীন ও পাতলা খোসার সুস্বাদু ফ্রেশ হিমসাগর আম।',
    rating: 5.0,
    reviewsCount: 57,
    priceMin: 160,
    priceMax: 545,
    pricePerKg: 125,
    unit: 'কেজি',
    minOrder: '৫ কেজি',
    isOrganic: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&q=80',
    tag: 'স্পেশাল',
    origin: 'মেহেরপুর'
  },
  {
    id: 5,
    category: 'himsagar',
    name: 'হিমসাগর গোল্ডেন আম',
    nameEn: 'Daily Fresh Himsagar - Value Pack',
    description: 'সম্পূর্ণ ফরমালিন মুক্ত প্রাকৃতিক উপায়ে পাকা সোনালী হিমসাগর আম।',
    rating: 5.0,
    reviewsCount: 29,
    priceMin: 195,
    priceMax: 685,
    pricePerKg: 135,
    unit: 'কেজি',
    minOrder: '৫ কেজি',
    isOrganic: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=600&q=80',
    tag: 'প্রিমিয়াম',
    origin: 'রাজশাহী'
  },

  // Haribhanga section
  {
    id: 6,
    category: 'haribhanga',
    name: 'হাঁড়িভাঙা রাজকীয় আম',
    nameEn: 'Haribhanga Royal Mango - Sweet Local Pack',
    description: 'রংপুরের বিখ্যাত মাংসল ও সুস্বাদু আঁশবিহীন হাঁড়িভাঙা আম।',
    rating: 5.0,
    reviewsCount: 34,
    priceMin: 185,
    priceMax: 645,
    pricePerKg: 115,
    unit: 'কেজি',
    minOrder: '৫ কেজি',
    isOrganic: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1605027990121-cbae9e0642df?auto=format&fit=crop&w=600&q=80',
    tag: 'জনপ্রিয়',
    origin: 'রংপুর'
  },
  {
    id: 7,
    category: 'haribhanga',
    name: 'হাঁড়িভাঙা বাগান তাজা আম',
    nameEn: 'Haribhanga Farm Fresh Mango - Premium Pack',
    description: 'সরাসরি পদাগঞ্জের ঐতিহ্যবাহী বাগান থেকে সংগৃহীত সেরা হাঁড়িভাঙা।',
    rating: 5.0,
    reviewsCount: 49,
    priceMin: 215,
    priceMax: 765,
    pricePerKg: 125,
    unit: 'কেজি',
    minOrder: '৫ কেজি',
    isOrganic: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80',
    tag: 'বাগান ফ্রেশ',
    origin: 'রংপুর'
  },
  {
    id: 8,
    category: 'haribhanga',
    name: 'রংপুর হাঁড়িভাঙা স্পেশাল',
    nameEn: 'Rangpur Haribhanga Mango - Fresh Special',
    description: 'উচ্চ পুষ্টিগুণ ও অনন্য মিষ্টি স্বাদের বিশেষ হাঁড়িভাঙা আম।',
    rating: 5.0,
    reviewsCount: 26,
    priceMin: 200,
    priceMax: 705,
    pricePerKg: 120,
    unit: 'কেজি',
    minOrder: '৫ কেজি',
    isOrganic: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1622921491193-4a1f68748d5d?auto=format&fit=crop&w=600&q=80',
    tag: 'স্পেশাল',
    origin: 'মিঠাপুকুর'
  },
  {
    id: 9,
    category: 'haribhanga',
    name: 'হাঁড়িভাঙা সিলেক্ট আম',
    nameEn: 'Haribhanga Select Mango - Smooth Sweet',
    description: 'প্রতিটি আম হাত দিয়ে বাছাইকৃত, নিখুঁত সাইজ ও অসাধারণ মিষ্টতা।',
    rating: 5.0,
    reviewsCount: 25,
    priceMin: 255,
    priceMax: 925,
    pricePerKg: 140,
    unit: 'কেজি',
    minOrder: '৫ কেজি',
    isOrganic: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    tag: 'টপ গ্রেড',
    origin: 'রংপুর'
  },
  {
    id: 10,
    category: 'haribhanga',
    name: 'হাঁড়িভাঙা হানি সুইট আম',
    nameEn: 'Haribhanga Honey Sweet Mango - Premium',
    description: 'মৌমাছির মধুর মতো মিষ্টি ও ঘন শাঁসযুক্ত স্পেশাল হাঁড়িভাঙা।',
    rating: 5.0,
    reviewsCount: 39,
    priceMin: 240,
    priceMax: 865,
    pricePerKg: 135,
    unit: 'কেজি',
    minOrder: '৫ কেজি',
    isOrganic: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=600&q=80',
    tag: 'হানি সুইট',
    origin: 'রংপুর'
  },

  // Langra, Amrupali, Fazli, Gopalbhog
  {
    id: 11,
    category: 'langra',
    name: 'চাঁপাই ল্যাংড়া প্রিমিয়াম আম',
    nameEn: 'Chapainawabganj Langra Mango - Traditional Taste',
    description: 'ঐতিহ্যবাহী তীব্র মিষ্টি ও অসাধারণ সুবাসের সেরা ল্যাংড়া আম।',
    rating: 5.0,
    reviewsCount: 45,
    priceMin: 210,
    priceMax: 720,
    pricePerKg: 125,
    unit: 'কেজি',
    minOrder: '৫ কেজি',
    isOrganic: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=600&q=80',
    tag: 'ঐতিহ্যবাহী স্বাদ',
    origin: 'চাঁপাইনবাবগঞ্জ'
  },
  {
    id: 12,
    category: 'amrupali',
    name: 'মিষ্টি আম্রপালি আম',
    nameEn: 'Sweet Amrupali Mango - Compact & Juicy',
    description: 'ঘন লালচে হলুদ শাঁসযুক্ত ও তীব্র মিষ্টি স্বাদের গাছপাকা আম্রপালি।',
    rating: 5.0,
    reviewsCount: 82,
    priceMin: 210,
    priceMax: 745,
    pricePerKg: 130,
    unit: 'কেজি',
    minOrder: '৫ কেজি',
    isOrganic: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=600&q=80',
    tag: 'রসালো মিষ্টি',
    origin: 'মেহেরপুর'
  },
  {
    id: 13,
    category: 'gopalbhog',
    name: 'গোপালভোগ আর্লি সিজন আম',
    nameEn: 'Gopalbhog Early Season Mango - Premium Box',
    description: 'মৌসুমের শুরুর প্রথম মিষ্টি ও রাজকীয় স্বাদের গোপালভোগ আম।',
    rating: 5.0,
    reviewsCount: 38,
    priceMin: 260,
    priceMax: 945,
    pricePerKg: 145,
    unit: 'কেজি',
    minOrder: '৫ কেজি',
    isOrganic: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&q=80',
    tag: 'রাজকীয় স্বাদ',
    origin: 'রাজশাহী'
  },
  {
    id: 14,
    category: 'fazli',
    name: 'ফজলি ফ্যামিলি প্যাক আম',
    nameEn: 'Fazli Giant Mango - Value Family Deal',
    description: 'বিশাল সাইজের প্রচুর শাঁসযুক্ত ঐতিহ্যবাহী মিষ্টি ফজলি আম।',
    rating: 5.0,
    reviewsCount: 34,
    priceMin: 165,
    priceMax: 565,
    pricePerKg: 95,
    unit: 'কেজি',
    minOrder: '১০ কেজি',
    isOrganic: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1605027990121-cbae9e0642df?auto=format&fit=crop&w=600&q=80',
    tag: 'বড় ও মজাদার',
    origin: 'বাঘা, রাজশাহী'
  }
];

export const TRUST_FEATURES = [
  {
    id: 1,
    icon: 'Leaf',
    title: 'সরাসরি বাগান থেকে',
    desc: 'বাছাইকৃত নিজস্ব আমবাগান থেকে সরাসরি আম সংগ্রহ করা হয়।'
  },
  {
    id: 2,
    icon: 'Sparkles',
    title: '১০০% ফ্রেশ ও অর্গানিক',
    desc: 'কোনোরকম ক্ষতিকর রাসায়নিক বা ফরমালিন মুক্ত খাঁটি ফল।'
  },
  {
    id: 3,
    icon: 'Truck',
    title: 'দ্রুত হোম ডেলিভারি',
    desc: 'সারা বাংলাদেশে ৪৮ থেকে ৭২ ঘণ্টার মধ্যে নিরাপদ ডেলিভারি।'
  },
  {
    id: 4,
    icon: 'ShieldCheck',
    title: 'প্রিমিয়াম কোয়ালিটি',
    desc: 'প্রতিটি আম সতর্কতার সাথে গ্রেডিং ও প্যাকিং করা হয়।'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '০১',
    title: 'আম বেছে নিন',
    description: 'আমাদের কালেকশন থেকে আপনার পছন্দের ফ্রেশ আমের জাত ও পরিমাণ নির্বাচন করুন।'
  },
  {
    step: '০২',
    title: 'অর্ডার কনফার্ম করুন',
    description: 'আপনার নাম, ঠিকানা ও ফোন নম্বর দিয়ে ক্যাশ অন ডেলিভারিতে অর্ডার করুন।'
  },
  {
    step: '০৩',
    title: 'ঘরে বসে আম গ্রহণ করুন',
    description: 'সরাসরি বাগান থেকে বাছাইকৃত তাজা আম আপনার ঘরে পৌঁছে দেওয়া হবে।'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'তানভীর আহমেদ',
    location: 'ধানমন্ডি, ঢাকা',
    rating: 5,
    verified: true,
    text: 'আমগুলো সত্যিই অনেক ফ্রেশ ছিল। কোনো ফরমালিনের গন্ধ নেই, একদম আসল গাছপাকা হিমসাগরের মিষ্টি স্বাদ। পরিবারের সবাই খুব খুশি হয়েছে। আবার অর্ডার করব।'
  },
  {
    id: 2,
    name: 'সাবরিনা ইসলাম',
    location: 'পাঁচলাইশ, চট্টগ্রাম',
    rating: 5,
    verified: true,
    text: 'অনলাইনে আম কেনার ব্যাপারে প্রথমে একটু দ্বিধায় ছিলাম, কিন্তু আম পাওয়ার পর সব দ্বিধা দূর হয়ে গেল। কোনো দাগ নেই, প্রতিটা আম একদম অক্ষত ও সুস্বাদু।'
  },
  {
    id: 3,
    name: 'মো: রফিকুল ইসলাম',
    location: 'উত্তরা, ঢাকা',
    rating: 5,
    verified: true,
    text: 'হাঁড়িভাঙা আমের সাইজ এবং মিষ্টি স্বাদ সত্যিই অতুলনীয়। সময়মতো ডেলিভারি পেয়েছি। কাস্টমার সার্ভিসের ব্যবহারও খুব ভালো ছিল। ধন্যবাদ আম বাজার টিম।'
  }
];

export const BOTTOM_FEATURE_STRIP = [
  {
    title: 'খাঁটি অর্গানিক আম',
    desc: '১০০% ফরমালিন ও কেমিক্যাল মুক্ত',
    icon: 'Leaf'
  },
  {
    title: 'দ্রুত ডেলিভারি',
    desc: 'সরাসরি বাগান থেকে দ্রুত ডেলিভারি',
    icon: 'Truck'
  },
  {
    title: 'নিরাপদ পেমেন্ট',
    desc: '১০০% সুরক্ষিত ক্যাশ অন ডেলিভারি',
    icon: 'ShieldCheck'
  },
  {
    title: 'সহজ সাপোর্ট',
    desc: '২৪/৭ যেকোনো সহায়তায় প্রস্তুত',
    icon: 'Headphones'
  }
];
