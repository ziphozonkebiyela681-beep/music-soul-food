import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  return (
    <footer className="bg-[#120e0b] border-t border-[#312319] text-[#baa998] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[#241a13]">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-serif-display text-2xl font-bold tracking-wider text-[#fff2d1]">
                SOUL <span className="text-[#d99120] text-lg font-sans font-normal">Food &amp; Music</span>
              </span>
            </div>
            <p className="text-xs text-[#9c8978] max-w-sm">
              Good Food. Good Music. Good Soul. Come for the food, stay for the soul.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#ded7ce]">
            <a href="#menu" className="hover:text-[#fff2d1] transition-colors">
              The Menu
            </a>
            <a href="#atmosphere" className="hover:text-[#fff2d1] transition-colors">
              Atmosphere &amp; Interior
            </a>
            <a href="#reservation" className="hover:text-[#fff2d1] transition-colors">
              Table Reservations
            </a>
            <a href="#location" className="hover:text-[#fff2d1] transition-colors">
              Location &amp; Hours
            </a>
            <a
              href={`tel:${RESTAURANT_INFO.bookingPhoneRaw}`}
              className="hover:text-[#fff2d1] text-[#f5c768] transition-colors font-semibold"
            >
              Call Desk: {RESTAURANT_INFO.bookingPhone}
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#9c8978]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#fff2d1] transition-colors"
              title={`View ${RESTAURANT_INFO.googleMapsName} on Google Maps`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#d99120]" />
              <span>{RESTAURANT_INFO.address}</span>
            </a>
            <a
              href={`tel:${RESTAURANT_INFO.bookingPhoneRaw}`}
              className="flex items-center gap-1.5 hover:text-[#fff2d1] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d99120]" />
              <span>{RESTAURANT_INFO.bookingPhone}</span>
            </a>
          </div>

          <div>
            &copy; {new Date().getFullYear()} SOUL Food &amp; Music. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
