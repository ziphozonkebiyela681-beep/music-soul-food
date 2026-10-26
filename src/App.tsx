/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { AtmosphereMusic } from './components/AtmosphereMusic';
import { ReservationSection } from './components/ReservationSection';
import { LocationHours } from './components/LocationHours';
import { Footer } from './components/Footer';
import { TableWishlistDrawer, WishlistItem } from './components/TableWishlistDrawer';
import { MenuItem, RESTAURANT_INFO } from './data/menuData';
import { Phone, Calendar, Utensils } from 'lucide-react';

export default function App() {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Add item to wishlist
  const handleAddToWishlist = (item: MenuItem) => {
    setWishlistItems((prev) => {
      const existing = prev.find((entry) => entry.item.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.item.id === item.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  // Update item quantity
  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setWishlistItems((prev) => {
      return prev
        .map((entry) => {
          if (entry.item.id === itemId) {
            const nextQty = entry.quantity + delta;
            return nextQty > 0 ? { ...entry, quantity: nextQty } : null;
          }
          return entry;
        })
        .filter((entry): entry is WishlistItem => entry !== null);
    });
  };

  // Clear wishlist
  const handleClearWishlist = () => {
    setWishlistItems([]);
  };

  // Scroll to reservation section
  const handleScrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsWishlistOpen(false);
  };

  const totalWishlistCount = wishlistItems.reduce(
    (sum, entry) => sum + entry.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#15110e] text-[#ede9e3] flex flex-col font-sans selection:bg-[#d99120] selection:text-black">
      {/* Top Bar adhering to 3-zone contract */}
      <Navbar
        onOpenReservation={handleScrollToReservation}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={totalWishlistCount}
      />

      <main className="flex-1">
        {/* Hero with warm golden table atmosphere background & phone 068 888 666 */}
        <Hero onOpenReservation={handleScrollToReservation} />

        {/* Full Interactive Menu with Dish Categories and Wishlist */}
        <MenuSection
          onAddToWishlist={handleAddToWishlist}
          wishlistItems={wishlistItems}
          onOpenWishlist={() => setIsWishlistOpen(true)}
        />

        {/* Warm Atmosphere & Ambient Soul Music Synthesizer & Interior Photography */}
        <AtmosphereMusic onOpenReservation={handleScrollToReservation} />

        {/* Integrated Direct Phone Booking & Table Planner */}
        <ReservationSection wishlistItems={wishlistItems} />

        {/* Location, Operating Hours & Map Route */}
        <LocationHours onOpenReservation={handleScrollToReservation} />
      </main>

      {/* Quiet Footer */}
      <Footer onOpenReservation={handleScrollToReservation} />

      {/* Slim Mobile Bottom Action Bar (<= 48px to respect 15% mobile sticky cap) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#19130f]/95 backdrop-blur-md border-t border-[#3d2b1f] px-3 py-2 flex items-center justify-between gap-2.5 h-14">
        {totalWishlistCount > 0 && (
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#4a3628] bg-[#221a14] text-[#fce8bd] text-xs shrink-0"
            aria-label="View selected dishes"
          >
            <Utensils className="w-3.5 h-3.5" />
            <span className="font-mono">{totalWishlistCount}</span>
          </button>
        )}

        <a
          href={`tel:${RESTAURANT_INFO.bookingPhoneRaw}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#d99120] text-black font-semibold rounded-lg text-xs shadow-md shadow-[#d99120]/30 active:scale-95"
        >
          <Phone className="w-3.5 h-3.5 fill-black/20" />
          <span>Call Desk: {RESTAURANT_INFO.bookingPhone}</span>
        </a>

        <button
          onClick={handleScrollToReservation}
          className="flex items-center gap-1 px-3 py-2 bg-[#271d16] border border-[#4a3628] text-[#fce8bd] font-medium rounded-lg text-xs shrink-0"
        >
          <Calendar className="w-3.5 h-3.5 text-[#d99120]" />
          <span>Book</span>
        </button>
      </div>

      {/* Table Wishlist Drawer */}
      <TableWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClear={handleClearWishlist}
        onProceedToReservation={handleScrollToReservation}
      />
    </div>
  );
}
