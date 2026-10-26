import React from 'react';
import { Phone, BookOpen, Clock, Music, Flame, Sparkles, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeroProps {
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#36271c]/70 bg-[#15110e]">
      {/* Background featuring the authentic glowing skyline silhouette from the venue */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Real Illuminated Skyline Silhouette Bar backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-center lg:bg-[center_30%] opacity-55 sm:opacity-65 scale-105"
          style={{
            backgroundImage: `url('/assets/aistudio/glowing_skyline_hero.jpg')`,
          }}
        />

        {/* Rich Warm Amber & Dark Walnut Scrim for Contrast & Elegance */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#140f0c]/95 via-[#1a130e]/85 to-[#140f0c]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#15110e] via-transparent to-[#18120e]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#18120e]/80 via-transparent to-[#15110e]" />

        {/* Ambient golden skyline backlight radiance */}
        <div className="absolute top-1/4 right-1/4 w-[550px] h-[350px] bg-[#d99120]/30 rounded-full blur-[130px]" />
        <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-[#f5c768]/18 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#e5a93c]/15 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Hero: Typography & Story Left, Pure Isolated Glowing Neon Sign & Skyline Highlight Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Brand Story & Direct Phone Booking (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Location & Atmosphere Kicker linked to Google Maps */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f5c768] hover:text-[#fff2d1] tracking-widest uppercase transition-colors group"
                title={`View ${RESTAURANT_INFO.googleMapsName} on Google Maps`}
              >
                <MapPin className="w-3.5 h-3.5 text-[#d99120]" />
                <span className="group-hover:underline">Google Maps: {RESTAURANT_INFO.googleMapsName}</span>
                <span aria-hidden="true" className="text-[#8c7460]">·</span>
                <span>289 Fox Street</span>
              </a>
              <span className="text-[11px] font-mono text-[#f5c768] bg-[#2e2016]/80 border border-[#d99120]/40 px-2.5 py-0.5 rounded-md backdrop-blur-sm">
                Glowing Skyline Bar
              </span>
            </div>

            {/* Display Headline */}
            <div className="space-y-2">
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#fff2d1] leading-[1.08] text-balance">
                Good Food. <br />
                <span className="text-[#f5c768] italic font-normal">Good Music.</span> <br />
                Good Soul.
              </h1>
            </div>

            {/* Subtitle / Prose */}
            <p className="text-base sm:text-lg text-[#ded7ce] max-w-xl font-light leading-relaxed">
              Step into Maboneng&rsquo;s most intimate warm glow. Where slow-braised lamb shanks, flame-grilled steaks, and artisan soul food meet the acoustic pulse of live rhythms, candlelit tables, and our illuminated skyline bar.
            </p>

            {/* Direct Booking Callout Bar featuring 068 888 666 */}
            <div className="p-4 sm:p-5 bg-[#201813]/90 border border-[#d99120]/50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-xl shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#2e2016] border border-[#d99120] flex items-center justify-center text-[#f5c768] shrink-0 shadow-inner">
                  <Phone className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#f5c768] font-semibold">
                    Direct Table Booking Hotline
                  </div>
                  <a
                    href={`tel:${RESTAURANT_INFO.bookingPhoneRaw}`}
                    className="font-mono text-2xl sm:text-3xl font-bold text-[#fff2d1] tracking-wide hover:text-[#f5c768] transition-colors"
                  >
                    {RESTAURANT_INFO.bookingPhone}
                  </a>
                </div>
              </div>

              <a
                href={`tel:${RESTAURANT_INFO.bookingPhoneRaw}`}
                className="w-full sm:w-auto text-center px-5 py-3 bg-[#d99120] hover:bg-[#e5a93c] text-black font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-[#d99120]/30 whitespace-nowrap active:scale-95"
              >
                Call Place Directly
              </a>
            </div>

            {/* Action Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenReservation}
                className="flex items-center gap-2 px-5 py-3 bg-[#2a1e16] hover:bg-[#36271c] border border-[#d99120]/60 text-[#fce8bd] font-semibold text-xs rounded-lg transition-all hover:border-[#d99120] active:scale-95 shadow-md"
              >
                <span>Plan Table Reservation</span>
              </button>

              <a
                href="#menu"
                className="flex items-center gap-2 px-4 py-3 border border-[#4a3628] hover:border-[#d99120]/60 bg-[#1e1610]/80 hover:bg-[#281d14] text-[#ded7ce] hover:text-[#fff2d1] font-medium text-xs rounded-lg transition-colors"
              >
                <BookOpen className="w-4 h-4 text-[#d99120]" />
                <span>Explore Full Menu</span>
              </a>

              <a
                href="#atmosphere"
                className="flex items-center gap-1.5 px-3.5 py-3 text-xs text-[#d99120] hover:text-[#fce8bd] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tour the Interior &amp; Skyline Bar</span>
              </a>
            </div>

            {/* Quick operating badge */}
            <div className="pt-2 flex items-center gap-4 text-xs text-[#baa998]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#d99120]" />
                <span>Open Daily from 08:00 AM</span>
              </div>
              <span aria-hidden="true" className="text-[#634e3e]">·</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d99120]" />
                <span>Midnight Soul Sessions Fri &amp; Sat</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pure Isolated Glowing Writing & Skyline Bar Feature (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group w-full flex flex-col items-center">
              {/* Outer Golden Aura Glow behind the isolated text */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#d99120]/35 via-[#f5c768]/30 to-[#92400e]/35 rounded-full blur-3xl opacity-90 group-hover:opacity-100 transition duration-700 pointer-events-none" />

              {/* The Isolated Glowing Text Logo floating on warm glow */}
              <div className="relative z-10 w-full max-w-md p-4 flex flex-col items-center justify-center">
                <img
                  src="/assets/aistudio/soul_logo_isolated.png"
                  alt="SOUL MUSIC FOOD Isolated Logo"
                  className="w-full h-auto max-h-[190px] object-contain filter drop-shadow-[0_0_35px_rgba(229,169,60,0.75)] transform group-hover:scale-105 transition-transform duration-500"
                />

                <div className="mt-4 text-center">
                  <span className="text-sm font-serif-display italic text-[#fff2d1]">
                    &ldquo;Come for the food, stay for the soul.&rdquo;
                  </span>
                </div>

                {/* Venue Previews: Entrance & Skyline Bar */}
                <div className="mt-5 w-full grid grid-cols-2 gap-2.5">
                  <a
                    href="#atmosphere"
                    className="bg-[#1e1611]/90 hover:bg-[#271d16] border border-[#d99120]/50 rounded-xl p-2.5 flex flex-col gap-2 shadow-xl transition-all duration-300 group/card backdrop-blur-md"
                  >
                    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#d99120]/30 relative bg-black">
                      <img
                        src="/assets/aistudio/WhatsApp_Image_2026-10-26_at_2.01.43_PM__2__4f860fc8.jpeg"
                        alt="Grand Fox Street Entrance at Soul Food and Music"
                        className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[9px] font-semibold text-[#fce8bd]">
                        As You Enter
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[11px] font-semibold text-[#fff2d1] truncate">
                        Fox Street Entrance
                      </h3>
                      <p className="text-[10px] text-[#baa998] truncate">
                        Red carpet arrival step
                      </p>
                    </div>
                  </a>

                  <a
                    href="#atmosphere"
                    className="bg-[#1e1611]/90 hover:bg-[#271d16] border border-[#d99120]/50 rounded-xl p-2.5 flex flex-col gap-2 shadow-xl transition-all duration-300 group/card backdrop-blur-md"
                  >
                    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#d99120]/30 relative bg-black">
                      <img
                        src="/assets/aistudio/glowing_skyline_bar.jpg"
                        alt="Glowing Johannesburg Skyline Bar at Soul"
                        className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[9px] font-semibold text-[#fce8bd]">
                        Inside
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[11px] font-semibold text-[#fff2d1] truncate">
                        Skyline Silhouette Bar
                      </h3>
                      <p className="text-[10px] text-[#baa998] truncate">
                        Glowing amber ambiance
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Feature Strip below Hero */}
        <div className="mt-14 pt-8 border-t border-[#36271c]/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#d99120]">
              <Phone className="w-4 h-4" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#f5c768]">
                Desk Bookings: {RESTAURANT_INFO.bookingPhone}
              </h2>
            </div>
            <p className="text-xs text-[#baa998] leading-relaxed">
              All reservations handled directly by our front-of-house host team.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#d99120]">
              <Flame className="w-4 h-4" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#f5c768]">
                Flame Grills &amp; Braise
              </h2>
            </div>
            <p className="text-xs text-[#baa998] leading-relaxed">
              Slow-cooked lamb shank, oxtail stews, 500g prime T-bones &amp; ribs.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#d99120]">
              <Music className="w-4 h-4" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#f5c768]">
                Live Soul &amp; Neo-Jazz
              </h2>
            </div>
            <p className="text-xs text-[#baa998] leading-relaxed">
              Curated vinyl rotations and weekend acoustic soul artists.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#d99120]">
              <Clock className="w-4 h-4" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#f5c768]">
                All-Day Comfort
              </h2>
            </div>
            <p className="text-xs text-[#baa998] leading-relaxed">
              Hearty breakfast from 08:00 to late night lounge platters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
