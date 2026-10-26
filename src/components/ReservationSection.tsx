import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  Copy,
  Check,
  Phone,
  Sparkles,
  MapPin,
  AlertCircle,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { ReservationDetails, formatBookingSummary } from '../utils/whatsapp';
import { WishlistItem } from './TableWishlistDrawer';

interface ReservationSectionProps {
  wishlistItems: WishlistItem[];
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ wishlistItems }) => {
  const [copied, setCopied] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('19:30');
  const [seatingArea, setSeatingArea] = useState('Skyline Bar & Dining Hall (Near illuminated skyline)');
  const [occasion, setOccasion] = useState('Casual Dining');
  const [notes, setNotes] = useState('');

  // Prepare pre-selected dishes if any
  const preSelectedDishes = wishlistItems.map((wi) => ({
    name: wi.item.name,
    price: wi.item.price,
    quantity: wi.quantity,
  }));

  const reservationDetails: ReservationDetails = {
    name,
    phone,
    guests,
    date,
    time,
    seatingArea,
    occasion,
    notes,
    preSelectedDishes,
  };

  const formattedSummary = formatBookingSummary(reservationDetails);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const seatingOptions = [
    { id: 'skyline', label: 'Skyline Bar & Dining Hall (Near illuminated skyline)', desc: 'Glowing bar view & ambient energy' },
    { id: 'booth', label: 'Soul Velvet Booths (Beside green marble wall)', desc: 'Spacious leather banquette curve' },
    { id: 'blossom', label: 'Blossom Lounge & Intimate Tables', desc: 'Candlelit setting beside cherry blossom' },
    { id: 'terrace', label: 'Maboneng Street Patio', desc: 'Fox Street ground-floor buzz' },
  ];

  const popularTimes = [
    { time: '10:30', label: '10:30 (Brunch)' },
    { time: '13:00', label: '13:00 (Lunch)' },
    { time: '18:00', label: '18:00 (Sunset)' },
    { time: '19:30', label: '19:30 (Prime Soul)' },
    { time: '20:30', label: '20:30 (Dinner & Sound)' },
    { time: '22:00', label: '22:00 (Late Night)' },
  ];

  return (
    <section id="reservation" className="py-16 lg:py-24 bg-[#14100d] relative overflow-hidden border-b border-[#36271c]/70">
      {/* Warm ambient radial glows */}
      <div className="absolute top-1/2 right-10 w-[550px] h-[550px] bg-[#d99120]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#f5c768]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#f5c768] uppercase tracking-widest mb-2">
            <span>Direct Desk Hotline</span>
            <span aria-hidden="true">·</span>
            <span>All Bookings via Phone</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium text-[#fff2d1]">
            Table Bookings &amp; Reservations
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#ded7ce] leading-relaxed">
            All reservations are handled directly by calling our host desk. Plan your table details below, then tap to call <strong className="text-[#f5c768] font-mono">{RESTAURANT_INFO.bookingPhone}</strong>.
          </p>

          {/* Highlighted Direct Call Banner */}
          <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5 bg-[#201813] border border-[#d99120]/60 rounded-2xl shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#2e2016] border border-[#d99120] flex items-center justify-center text-[#f5c768]">
                <PhoneCall className="w-6 h-6 animate-pulse" />
              </div>
              <div className="text-left">
                <span className="text-[11px] uppercase tracking-wider text-[#d99120] font-semibold block">
                  Official Bookings Line of the Place
                </span>
                <span className="font-mono text-2xl sm:text-3xl font-bold text-[#fff2d1]">
                  {RESTAURANT_INFO.bookingPhone}
                </span>
              </div>
            </div>

            <a
              href={`tel:${RESTAURANT_INFO.bookingPhoneRaw}`}
              className="px-6 py-3 bg-[#d99120] hover:bg-[#e5a93c] text-black font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-[#d99120]/30 flex items-center gap-2 active:scale-95"
            >
              <Phone className="w-4 h-4 fill-black/20" />
              <span>Call 068 888 666 Now</span>
            </a>
          </div>
        </div>

        {/* 2-Column Grid: Booking Planner Left, Live Telephone Summary Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Table Planner Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#1c1611] border border-[#3b2a1f] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#2b1e15]">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#d99120]" />
                <h3 className="text-base font-semibold text-[#f5f5f4]">
                  Plan Your Table Details
                </h3>
              </div>
              <span className="text-xs font-mono text-[#f5c768]">
                Hotline: {RESTAURANT_INFO.bookingPhone}
              </span>
            </div>

            {/* Party Size Selector */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-[#ded7ce]">
                <Users className="w-4 h-4 text-[#d99120]" />
                <span>Number of Guests: <strong className="text-[#fff2d1]">{guests} {guests === 1 ? 'Guest' : 'Guests'}</strong></span>
              </label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuests(num)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                      guests === num
                        ? 'bg-[#d99120] text-black shadow-md shadow-[#d99120]/30'
                        : 'bg-[#271d16] text-[#ded7ce] border border-[#3d2c1f] hover:border-[#d99120]/60'
                    }`}
                  >
                    {num === 12 ? '12+' : num}
                  </button>
                ))}
              </div>
            </div>

            {/* Date and Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-medium text-[#ded7ce]">
                  <Calendar className="w-4 h-4 text-[#d99120]" />
                  <span>Reservation Date</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#241a13] border border-[#3d2c1f] rounded-lg px-3.5 py-2.5 text-xs text-[#fff2d1] focus:outline-none focus:border-[#d99120] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-medium text-[#ded7ce]">
                  <Clock className="w-4 h-4 text-[#d99120]" />
                  <span>Time of Arrival</span>
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#241a13] border border-[#3d2c1f] rounded-lg px-3.5 py-2.5 text-xs text-[#fff2d1] focus:outline-none focus:border-[#d99120] transition-colors"
                />
              </div>
            </div>

            {/* Quick Time Slots */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-[#baa998]">Popular Dining Times:</span>
              <div className="flex flex-wrap gap-1.5">
                {popularTimes.map((pt) => (
                  <button
                    key={pt.time}
                    type="button"
                    onClick={() => setTime(pt.time)}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded-md border transition-colors ${
                      time === pt.time
                        ? 'border-[#d99120] text-[#fff2d1] bg-[#d99120]/20'
                        : 'border-[#3d2c1f] text-[#baa998] hover:border-[#4d3727]'
                    }`}
                  >
                    {pt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Seating Experience Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-[#ded7ce]">
                Preferred Seating Area (From Authentic Interior)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {seatingOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSeatingArea(opt.label)}
                    className={`p-3 text-left rounded-lg border transition-all ${
                      seatingArea === opt.label
                        ? 'bg-[#2b1e15] border-[#d99120] shadow-sm shadow-[#d99120]/25'
                        : 'bg-[#221912] border-[#38281d] hover:border-[#4a3628]'
                    }`}
                  >
                    <div className="text-xs font-medium text-[#fff2d1]">
                      {opt.label}
                    </div>
                    <div className="text-[11px] text-[#baa998] mt-0.5">
                      {opt.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Name & Guest Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#ded7ce]">
                  Your Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sipho Ndlovu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#241a13] border border-[#3d2c1f] rounded-lg px-3.5 py-2.5 text-xs text-[#fff2d1] placeholder-[#7d6857] focus:outline-none focus:border-[#d99120] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#ded7ce]">
                  Your Contact Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 082 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#241a13] border border-[#3d2c1f] rounded-lg px-3.5 py-2.5 text-xs text-[#fff2d1] placeholder-[#7d6857] focus:outline-none focus:border-[#d99120] transition-colors"
                />
              </div>
            </div>

            {/* Occasion & Special Requests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#ded7ce]">
                  Occasion / Celebration
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-[#241a13] border border-[#3d2c1f] rounded-lg px-3.5 py-2.5 text-xs text-[#fff2d1] focus:outline-none focus:border-[#d99120] transition-colors"
                >
                  <option value="Casual Dining">Casual Dining &amp; Soul Sound</option>
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Romantic Date Night">Romantic Date Night</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Friends Gathering">Friends Gathering</option>
                  <option value="Business Dinner">Business Dinner</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#ded7ce]">
                  Special Requests / Dietary
                </label>
                <input
                  type="text"
                  placeholder="e.g. Window booth, birthday sparkler"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#241a13] border border-[#3d2c1f] rounded-lg px-3.5 py-2.5 text-xs text-[#fff2d1] placeholder-[#7d6857] focus:outline-none focus:border-[#d99120] transition-colors"
                />
              </div>
            </div>

            {/* Attached Menu Items Notification */}
            {wishlistItems.length > 0 && (
              <div className="p-3.5 bg-[#251a13] border border-[#d99120]/40 rounded-xl flex items-center justify-between text-xs text-[#fce8bd]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#d99120]" />
                  <span>
                    <strong>{wishlistItems.length} menu items</strong> saved for your table call.
                  </span>
                </div>
                <span className="font-mono text-[#f5c768]">
                  R {wishlistItems.reduce((acc, curr) => acc + curr.item.priceNum * curr.quantity, 0)}
                </span>
              </div>
            )}

            {/* Direct Calling Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${RESTAURANT_INFO.bookingPhoneRaw}`}
                className="flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-[#d99120] hover:bg-[#e5a93c] text-black font-semibold text-sm transition-all shadow-xl shadow-[#d99120]/25 active:scale-95"
              >
                <Phone className="w-4 h-4 fill-black/20" />
                <span>Call {RESTAURANT_INFO.bookingPhone} to Book</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl border border-[#4a3628] bg-[#241a13] hover:bg-[#2e2017] text-[#fff2d1] font-medium text-xs transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#25D366]" />
                    <span>Summary Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#d99120]" />
                    <span>Copy Summary for Call</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-[#baa998] text-center">
              Direct telephone reservations: <strong className="text-[#fff2d1] font-mono">{RESTAURANT_INFO.bookingPhone}</strong> · Tables held for 15 minutes.
            </p>
          </div>

          {/* Right Column: Live Booking Summary & Direct Desk Card (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-[#1c1611] border border-[#3b2a1f] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#2b1e15]">
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-4 h-4 text-[#d99120]" />
                  <span className="text-xs font-semibold text-[#fff2d1]">
                    Your Call Ready Summary
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#291e16] hover:bg-[#382a1f] text-[11px] text-[#ded7ce] transition-colors border border-[#4a3628]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#25D366]" />
                      <span className="text-[#25D366]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Formatted Summary Card */}
              <div className="bg-[#120d0a] rounded-xl p-4 border border-[#2e2118] font-mono text-xs space-y-2">
                <div className="text-[10px] text-center text-[#9c8978] tracking-widest uppercase">
                  DIRECT PHONE RESERVATION SHEET
                </div>

                <div className="bg-[#1c140e] text-[#ded7ce] rounded-lg p-3.5 shadow-md relative space-y-1.5 leading-relaxed whitespace-pre-wrap text-xs border border-white/5">
                  {formattedSummary}
                </div>
              </div>

              {/* Prominent Call Desk Action */}
              <div className="p-4 bg-[#231811] border border-[#d99120]/50 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#d99120] font-semibold">
                    Booking Desk Telephone
                  </div>
                  <div className="text-xl font-mono font-bold text-[#fff2d1]">
                    {RESTAURANT_INFO.bookingPhone}
                  </div>
                </div>

                <a
                  href={`tel:${RESTAURANT_INFO.bookingPhoneRaw}`}
                  className="px-4 py-2.5 bg-[#d99120] hover:bg-[#e5a93c] text-black text-xs font-bold rounded-lg transition-all shadow-md shadow-[#d99120]/25 flex items-center gap-1.5 active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 fill-black/20" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Quick Location & Arrival Guarantee */}
            <div className="p-5 bg-[#1c1611]/80 border border-[#3b2a1f] rounded-2xl text-xs space-y-2.5 text-[#baa998]">
              <div className="flex items-start gap-2.5 text-[#ded7ce]">
                <MapPin className="w-4 h-4 text-[#d99120] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#fff2d1]">{RESTAURANT_INFO.address}</p>
                  <p className="text-[11px] text-[#9c8978]">{RESTAURANT_INFO.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-[#9c8978]">
                <AlertCircle className="w-3.5 h-3.5 text-[#d99120] shrink-0" />
                <span>Large group bookings (&gt; 12 people) confirmed directly via telephone call.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
