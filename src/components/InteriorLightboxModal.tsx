import React from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

export interface InteriorPhoto {
  url: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
}

export const INTERIOR_PHOTOS: InteriorPhoto[] = [
  {
    url: '/assets/aistudio/WhatsApp_Image_2026-10-26_at_2.01.43_PM__2__4f860fc8.jpeg',
    title: 'The Grand Fox Street Entrance',
    subtitle: 'Ground Floor Street-Level Arrival · Red Carpet Welcome',
    description:
      'What you see as you enter: The towering glowing golden SOUL sign above sliding glass doors, red carpet arrival step, custom branded entry mat, wooden host podium, and a breathtaking direct sightline straight into our illuminated skyline bar.',
    tag: 'Street-Level Arrival & Host Desk',
  },
  {
    url: '/assets/aistudio/WhatsApp_Image_2026-10-26_at_2.01.43_PM_42ea7262.jpeg',
    title: 'The Main Dining Room & Skyline Bar',
    subtitle: 'Maboneng Lifestyle Centre · Ground Floor',
    description:
      'Featuring our iconic illuminated Johannesburg skyline cocktail bar, dark emerald marble feature wall with glowing golden SOUL lettering, plush leather booth seating, and warm amber glass pendant lighting.',
    tag: 'Main Dining Floor & Skyline Bar',
  },
  {
    url: '/assets/aistudio/WhatsApp_Image_2026-10-26_at_2.01.43_PM__1__9ad8c8ce.jpeg',
    title: 'Intimate Table Setting & Blossom Lounge',
    subtitle: 'Fine Dining & Cocktail Lounge',
    description:
      'Candlelit dinner tables dressed for evening service, bespoke woven cord dining chairs, and a stunning cherry blossom floral installation glowing beside the illuminated skyline counter.',
    tag: 'Intimate Table Setting & Lounge',
  },
];

interface InteriorLightboxModalProps {
  photoIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const InteriorLightboxModal: React.FC<InteriorLightboxModalProps> = ({
  photoIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  if (photoIndex === null) return null;
  const current = INTERIOR_PHOTOS[photoIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Interior Photography Lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-[#12100e] border border-[#d99120]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#292524] bg-[#181512]">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-[#d99120] font-semibold">
              {current.tag}
            </span>
            <span aria-hidden="true" className="text-[#57534e]">·</span>
            <span className="text-xs text-[#a8a29e]">
              Photo {photoIndex + 1} of {INTERIOR_PHOTOS.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              className="p-1.5 rounded-lg text-[#a8a29e] hover:text-[#fce8bd] hover:bg-[#292524] transition-colors"
              title="Previous photo"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={onNext}
              className="p-1.5 rounded-lg text-[#a8a29e] hover:text-[#fce8bd] hover:bg-[#292524] transition-colors"
              title="Next photo"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 ml-2 rounded-lg text-[#a8a29e] hover:text-white hover:bg-[#292524] transition-colors"
              title="Close modal"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Full Image Display */}
        <div className="relative flex-1 overflow-auto p-4 flex items-center justify-center bg-[#080706] min-h-[420px] max-h-[68vh]">
          <img
            src={current.url}
            alt={current.title}
            className="max-h-[64vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/5"
            referrerPolicy="no-referrer"
          />

          {/* Quick arrow overlays */}
          <button
            onClick={onPrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-[#fce8bd] border border-[#d99120]/40 backdrop-blur-md transition-all shadow-xl"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-[#fce8bd] border border-[#d99120]/40 backdrop-blur-md transition-all shadow-xl"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Footer info */}
        <div className="px-6 py-4 bg-[#181512] border-t border-[#292524] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <h4 className="font-serif-display text-base font-semibold text-[#fce8bd]">
              {current.title}
            </h4>
            <p className="text-[#a8a29e] text-xs mt-0.5 max-w-2xl leading-relaxed">
              {current.description}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[#d99120] font-medium shrink-0">
            <MapPin className="w-3.5 h-3.5" />
            <span>289 Fox Street, Maboneng</span>
          </div>
        </div>
      </div>
    </div>
  );
};
