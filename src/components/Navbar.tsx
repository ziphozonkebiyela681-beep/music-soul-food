import React, { useState } from 'react';
import { Menu, X, Utensils, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenWishlist: () => void;
  wishlistCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onOpenWishlist,
  wishlistCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#18130f]/95 backdrop-blur-md border-b border-[#36271c]/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand title with Isolated Logo Writing */}
          <a
            href="#"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus:outline-none"
            aria-label="SOUL Food & Music Homepage"
          >
            {/* Pure isolated glowing writing */}
            <img
              src="/assets/aistudio/soul_logo_isolated.png"
              alt="SOUL MUSIC FOOD Logo"
              className="h-10 sm:h-11 w-auto object-contain filter drop-shadow-[0_0_14px_rgba(229,169,60,0.55)] group-hover:scale-105 transition-transform duration-300"
            />
          </a>

          {/* Zone 2: Concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#d9d2c9]">
            <a
              href="#menu"
              className="hover:text-[#fce8bd] transition-colors whitespace-nowrap shrink-0"
            >
              The Menu
            </a>
            <a
              href="#atmosphere"
              className="hover:text-[#fce8bd] transition-colors whitespace-nowrap shrink-0"
            >
              Atmosphere &amp; Interior
            </a>
            <a
              href="#reservation"
              className="hover:text-[#fce8bd] transition-colors whitespace-nowrap shrink-0"
            >
              Table Reservations
            </a>
            <a
              href="#location"
              className="hover:text-[#fce8bd] transition-colors whitespace-nowrap shrink-0"
            >
              Location &amp; Hours
            </a>
          </nav>

          {/* Zone 3: 1 primary action (Call Desk) + table selection trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {wishlistCount > 0 && (
              <button
                onClick={onOpenWishlist}
                className="relative p-2.5 rounded-lg border border-[#4a3628] bg-[#221a14] text-[#fce8bd] hover:border-[#d99120] transition-colors"
                title="View Selected Dishes"
                aria-label={`View Selected Dishes (${wishlistCount})`}
              >
                <Utensils className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#d99120] text-black text-[11px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              </button>
            )}

            <a
              href={`tel:${RESTAURANT_INFO.bookingPhoneRaw}`}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-black bg-[#d99120] hover:bg-[#e5a93c] rounded-lg transition-all shadow-[0_0_20px_rgba(217,145,32,0.35)] hover:shadow-[0_0_25px_rgba(229,169,60,0.5)] whitespace-nowrap shrink-0 active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 fill-black/20" />
              <span>Call Desk: {RESTAURANT_INFO.bookingPhone}</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-[#d9d2c9] hover:text-[#fce8bd] hover:bg-[#251b14] rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#36271c] bg-[#1a140f] px-4 pt-4 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#d9d2c9]">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#fce8bd] py-1 border-b border-[#291f17]"
            >
              The Menu
            </a>
            <a
              href="#atmosphere"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#fce8bd] py-1 border-b border-[#291f17]"
            >
              Atmosphere &amp; Interior
            </a>
            <a
              href="#reservation"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#fce8bd] py-1 border-b border-[#291f17]"
            >
              Table Reservations
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#fce8bd] py-1 border-b border-[#291f17]"
            >
              Location &amp; Hours
            </a>
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={`tel:${RESTAURANT_INFO.bookingPhoneRaw}`}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#d99120] text-black font-semibold rounded-lg text-sm shadow-lg shadow-[#d99120]/25"
            >
              <Phone className="w-4 h-4 fill-black/20" />
              <span>Call to Book ({RESTAURANT_INFO.bookingPhone})</span>
            </a>

            {wishlistCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWishlist();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-[#4a3628] bg-[#221a14] text-[#fce8bd] font-medium rounded-lg text-sm"
              >
                <Utensils className="w-4 h-4" />
                <span>View Selected Table Dishes ({wishlistCount})</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
