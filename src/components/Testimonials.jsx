import React from 'react';
import { useWebsite } from '../context/WebsiteContext';
import { Star, CheckCircle, Quote } from 'lucide-react';

export default function Testimonials() {
  const { testimonials } = useWebsite();

  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
  ];

  return (
    <section className="py-12 px-4 sm:px-6 bg-white">
      <div className="max-w-[1120px] mx-auto text-center">
        
        {/* Header */}
        <span className="inline-block text-xs font-bold text-[#087F23] bg-[#EAF8E5] px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          সন্তুষ্ট গ্রাহক
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#222222] mb-2">
          আমাদের গ্রাহকদের মতামত
        </h2>
        <p className="text-sm text-gray-600 max-w-lg mx-auto mb-10">
          গত মৌসুমে ১০,০০০+ এর বেশি সন্তুষ্ট গ্রাহক আমাদের আম গ্রহণ করেছেন।
        </p>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {testimonials.map((review, idx) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-6 border border-gray-150 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                <Quote size={28} className="text-[#087F23]/20 mb-3" />
                
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-[#F59E0B] mb-3">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                  "{review.text}"
                </p>
              </div>

              {/* Reviewer Info */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <img
                  src={avatars[idx % avatars.length]}
                  alt={review.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#087F23]/20"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                    {review.verified !== false && (
                      <CheckCircle size={13} className="text-[#087F23] fill-[#EAF8E5]" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{review.location}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
