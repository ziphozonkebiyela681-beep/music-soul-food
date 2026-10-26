import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Car,
  ShieldCheck,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface LocationHoursProps {
  onOpenReservation: () => void;
}

export const LocationHours: React.FC<LocationHoursProps> = ({ onOpenReservation }) => {
  return (
    <section id="location" className="py-16 lg:py-24 bg-[#0a0807] border-b border-[#292524]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Hours & Contact Information (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#d99120] uppercase tracking-widest">
                <MapPin className="w-3.5 h-3.5" />
                <span>Google Maps: {RESTAURANT_INFO.googleMapsName}</span>
                <span aria-hidden="true">·</span>
                <span>Ground Floor</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium text-[#fce8bd]">
                Location &amp; Operating Hours
              </h2>
              <p className="text-sm text-[#a8a29e] leading-relaxed">
                Find us on Google Maps as <strong className="text-[#fce8bd]">&ldquo;{RESTAURANT_INFO.googleMapsName}&rdquo;</strong>. Located right at 289 Fox Street, Maboneng Lifestyle Centre ground floor.
              </p>
            </div>

            {/* Google Maps Verified Notice Card */}
            <div className="p-4 bg-[#14100d] border border-[#d99120]/40 rounded-xl flex items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#241a12] border border-[#d99120] flex items-center justify-center text-[#d99120] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#a8a29e]">
                    <span>Official Google Maps Place:</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                  </div>
                  <div className="font-serif-display text-lg font-semibold text-[#fce8bd]">
                    {RESTAURANT_INFO.googleMapsName}
                  </div>
                </div>
              </div>

              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#d99120] hover:bg-[#e5a93c] text-black text-xs font-semibold rounded-lg transition-colors shrink-0 shadow-sm"
              >
                <span>Open Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Hours Table */}
            <div className="bg-[#14100d] border border-[#2a221c] rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#f5f5f4] pb-2 border-b border-[#221c17]">
                <Clock className="w-4 h-4 text-[#d99120]" />
                <span>Weekly Hours of Service</span>
              </div>

              <div className="space-y-3">
                {RESTAURANT_INFO.hours.map((schedule, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between text-xs py-1.5 border-b border-[#1c1714] last:border-b-0"
                  >
                    <span className="font-medium text-[#d6d3d1]">{schedule.days}</span>
                    <span className="font-mono text-[#f5c768] tabular-nums mt-0.5 sm:mt-0">
                      {schedule.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#3f352e] bg-[#181512] hover:bg-[#221c17] text-[#fce8bd] text-xs font-medium transition-colors"
              >
                <Navigation className="w-4 h-4 text-[#d99120]" />
                <span>Navigate to &ldquo;{RESTAURANT_INFO.googleMapsName}&rdquo;</span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.bookingPhoneRaw}`}
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#d99120] hover:bg-[#e5a93c] text-black text-xs font-semibold transition-all shadow-md shadow-[#d99120]/25"
              >
                <Phone className="w-4 h-4" />
                <span>Call {RESTAURANT_INFO.bookingPhone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Embedded Interactive Map + Venue Information Card (6 cols) */}
          <div className="lg:col-span-6 bg-[#14100d] border border-[#2a221c] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#1e1712] border border-[#d99120]/30 flex items-center justify-center text-[#d99120]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif-display text-2xl font-semibold text-[#fce8bd]">
                      {RESTAURANT_INFO.googleMapsName}
                    </h3>
                    <p className="text-xs text-[#a8a29e]">
                      289 Fox Street, Maboneng Lifestyle Centre
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/20 px-2.5 py-1 rounded-md shrink-0">
                  Open Today
                </span>
              </div>

              {/* Embedded Interactive Google Map */}
              <div className="relative rounded-xl overflow-hidden border border-[#2e2621] h-[220px] sm:h-[260px] bg-[#0c0a09]">
                <iframe
                  title="Google Maps Location - Soul Food and Music"
                  src={RESTAURANT_INFO.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(95%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full object-cover"
                />

                {/* Overlay link button to open directly in Google Maps app */}
                <div className="absolute top-3 right-3">
                  <a
                    href={RESTAURANT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0c0a09]/90 hover:bg-black text-[#fce8bd] text-xs font-medium rounded-lg border border-[#d99120]/40 backdrop-blur-md shadow-lg transition-colors"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-[#d99120]" />
                  </a>
                </div>
              </div>

              {/* Address details */}
              <div className="p-3.5 bg-[#0d0b09] border border-[#241e1b] rounded-xl space-y-1.5">
                <div className="text-xs font-medium text-[#f5f5f4]">
                  {RESTAURANT_INFO.address}
                </div>
                <div className="text-xs text-[#78716c]">
                  City of Johannesburg, Gauteng 2094, South Africa
                </div>
                <div className="pt-2 flex items-center gap-4 text-[11px] text-[#a8a29e]">
                  <span className="flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-[#d99120]" /> Secure precinct parking
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#d99120]" /> Lifestyle security
                  </span>
                </div>
              </div>

              {/* Contact Direct Strip */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between text-xs text-[#a8a29e]">
                  <span>Arrival &amp; Entry:</span>
                  <span className="text-[#fce8bd]">289 Fox St red carpet street entrance</span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#baa998]">
                  <span>Direct Reservations Desk:</span>
                  <a
                    href={`tel:${RESTAURANT_INFO.bookingPhoneRaw}`}
                    className="font-mono text-sm font-bold text-[#f5c768] hover:underline"
                  >
                    {RESTAURANT_INFO.bookingPhone}
                  </a>
                </div>

                <div className="flex items-center justify-between text-xs text-[#baa998]">
                  <span>Table Inquiries:</span>
                  <span className="text-[#ded7ce]">Direct phone calls only (Open daily from 08:00)</span>
                </div>
              </div>
            </div>

            {/* Bottom Callout */}
            <div className="pt-3 border-t border-[#2b1e15] flex items-center justify-between text-xs text-[#baa998]">
              <span className="font-serif-display italic text-[#fff2d1]">
                &ldquo;Come for the food, stay for the soul.&rdquo;
              </span>
              <span>Ground Floor Patio &amp; Lounge</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
