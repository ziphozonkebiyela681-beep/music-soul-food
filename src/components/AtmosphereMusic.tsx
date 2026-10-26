import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Disc, Sparkles, Flame, Mic2, ArrowRight, Eye, Maximize2 } from 'lucide-react';
import { ambientPlayer } from '../utils/ambientAudio';
import { INTERIOR_PHOTOS, InteriorLightboxModal } from './InteriorLightboxModal';

interface AtmosphereMusicProps {
  onOpenReservation: () => void;
}

export const AtmosphereMusic: React.FC<AtmosphereMusicProps> = ({ onOpenReservation }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      ambientPlayer.stop();
    };
  }, []);

  const handleToggleAudio = () => {
    const active = ambientPlayer.toggle();
    setIsPlayingAudio(active);
  };

  const handleNextPhoto = () => {
    setSelectedPhotoIndex((prev) =>
      prev !== null ? (prev + 1) % INTERIOR_PHOTOS.length : 0
    );
  };

  const handlePrevPhoto = () => {
    setSelectedPhotoIndex((prev) =>
      prev !== null
        ? (prev - 1 + INTERIOR_PHOTOS.length) % INTERIOR_PHOTOS.length
        : 0
    );
  };

  return (
    <section id="atmosphere" className="py-16 lg:py-24 bg-[#090706] border-b border-[#292524]/70 relative overflow-hidden">
      {/* Warm Ambient Glow Effects */}
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-[#d99120]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#e5a93c]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#221c17]">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#d99120] uppercase tracking-widest mb-2">
              <span>The Interior &amp; Rhythm</span>
              <span aria-hidden="true">·</span>
              <span>Fox Street Sanctum</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium text-[#fce8bd]">
              Where Soul Resonates in Every Flame &amp; Chord
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#a8a29e] leading-relaxed">
              We built SOUL as a refuge from the rush of the city. A place of deep shadows, warm amber incandescent glows, the scent of flame-seared ribeye, and the warm crackle of vinyl spinning late into the Johannesburg night.
            </p>
          </div>

          {/* Interactive Vinyl Audio Simulator */}
          <div className="bg-[#14100d] border border-[#2e2621] rounded-2xl p-4 flex items-center gap-4 shrink-0 shadow-xl">
            <div className="relative">
              <div
                className={`w-12 h-12 rounded-full bg-[#1e1915] border-2 border-[#d99120]/40 flex items-center justify-center transition-transform ${
                  isPlayingAudio ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '6s' }}
              >
                <Disc className="w-6 h-6 text-[#f5c768]" />
              </div>
              {isPlayingAudio && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#25D366] rounded-full border-2 border-black animate-ping" />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#f5f5f4]">
                  Ambient Soul Soundscape
                </span>
              </div>
              <p className="text-[11px] text-[#78716c]">
                {isPlayingAudio ? 'Playing vinyl crackle & soul chords' : 'Simulate lounge soundscape'}
              </p>
            </div>

            <button
              onClick={handleToggleAudio}
              className={`p-2.5 rounded-lg border transition-all ${
                isPlayingAudio
                  ? 'bg-[#d99120] text-black border-[#d99120]'
                  : 'bg-[#1e1915] text-[#d6d3d1] border-[#3f352e] hover:border-[#d99120]'
              }`}
              title={isPlayingAudio ? 'Mute ambient sound' : 'Play ambient sound'}
              aria-label={isPlayingAudio ? 'Mute ambient sound' : 'Play ambient sound'}
            >
              {isPlayingAudio ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#a8a29e]" />
              )}
            </button>
          </div>
        </div>

        {/* Authentic Interior & Entrance Showcase: 3 High-End Photography Cards */}
        <div className="mt-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#d99120] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Venue Atmosphere</span>
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#fce8bd]">
                From the Red Carpet Entrance to the Skyline Bar
              </h3>
            </div>
            <span className="text-xs text-[#78716c] hidden sm:inline">
              Click any photograph to view full-screen
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INTERIOR_PHOTOS.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhotoIndex(idx)}
                className="group relative bg-[#120f0d] border border-[#2e2621] hover:border-[#d99120]/50 rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Photo frame with subtle zoom on hover */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle dark gradient scrim for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Expand button on hover */}
                  <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 backdrop-blur-md text-[#fce8bd] opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#0c0a09]/80 backdrop-blur-md border border-[#d99120]/40 text-[10px] font-semibold text-[#fce8bd]">
                      {photo.tag}
                    </span>
                  </div>

                  {/* Bottom Text in overlay */}
                  <div className="absolute bottom-3 left-3 right-3 space-y-0.5">
                    <h4 className="font-serif-display text-lg font-semibold text-white drop-shadow-md">
                      {photo.title}
                    </h4>
                    <p className="text-[11px] text-[#d6d3d1] line-clamp-2 leading-relaxed">
                      {photo.description}
                    </p>
                  </div>
                </div>

                {/* Card footer strip */}
                <div className="p-3 bg-[#16120e] border-t border-[#241e1b] flex items-center justify-between text-xs text-[#a8a29e]">
                  <span className="flex items-center gap-1.5 text-[#f5c768] text-[11px]">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Enlarge photo</span>
                  </span>
                  <span className="text-[11px] text-[#78716c]">289 Fox Street</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Editorial Cards showcasing the elements */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: The Skyline Bar & Sound */}
          <div className="bg-[#120f0d] border border-[#241e1b] rounded-2xl p-6 flex flex-col justify-between hover:border-[#d99120]/40 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#201914] border border-[#3f3227] flex items-center justify-center text-[#d99120]">
                <Mic2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-2xl font-semibold text-[#fce8bd]">
                The Skyline Bar &amp; Sound
              </h3>
              <p className="text-xs text-[#a8a29e] leading-relaxed">
                Take a seat at our illuminated skyline silhouette cocktail bar. Enjoy crafted signature cocktails, fine wines, and the backdrop of vinyl rotations and weekend acoustic soul artists.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1e1915] text-[11px] text-[#78716c]">
              <span>Sessions: Fri &amp; Sat from 19:30 · Sunday Brunch 11:00</span>
            </div>
          </div>

          {/* Card 2: The Hearth */}
          <div className="bg-[#120f0d] border border-[#241e1b] rounded-2xl p-6 flex flex-col justify-between hover:border-[#d99120]/40 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#201914] border border-[#3f3227] flex items-center justify-center text-[#d99120]">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-2xl font-semibold text-[#fce8bd]">
                The Hearth &amp; Flame
              </h3>
              <p className="text-xs text-[#a8a29e] leading-relaxed">
                Charcoal-kissed steaks basted in garlic and rosemary, slow-simmered lamb shanks falling from the bone, and seafood platters made for sharing at long tables.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1e1915] text-[11px] text-[#78716c]">
              <span>Kitchen open until 22:30 weekdays · Midnight weekends</span>
            </div>
          </div>

          {/* Card 3: The Maboneng Spirit */}
          <div className="bg-[#120f0d] border border-[#241e1b] rounded-2xl p-6 flex flex-col justify-between hover:border-[#d99120]/40 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#201914] border border-[#3f3227] flex items-center justify-center text-[#d99120]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-2xl font-semibold text-[#fce8bd]">
                Maboneng Lifestyle Centre
              </h3>
              <p className="text-xs text-[#a8a29e] leading-relaxed">
                Located on the ground floor of 289 Fox Street. Immerse yourself in the creative energy of the precinct with patio seating, green marble wall lounge, and an opulent indoor sanctum.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1e1915] text-[11px] text-[#78716c]">
              <span>Secure parking · Lifestyle Centre concierges</span>
            </div>
          </div>
        </div>

        {/* Claim to Proof: Verified Guest Sentiments */}
        <div className="mt-12 p-6 bg-[#14110e] border border-[#2a221c] rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#221c17]">
            <div className="space-y-1.5 md:pr-6">
              <p className="font-serif-display italic text-[#e7e5e4] text-sm">
                &ldquo;The illuminated skyline bar and the velvet seating make it feel like a world-class jazz club right in Maboneng.&rdquo;
              </p>
              <div className="text-xs text-[#d99120]">
                <span>Tebogo Khumalo</span>
                <span className="text-[#57534e]"> · </span>
                <span className="text-[#78716c]">Dinner Guest</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-4 md:pt-0 md:px-6">
              <p className="font-serif-display italic text-[#e7e5e4] text-sm">
                &ldquo;Booking directly took seconds and our table beside the cherry blossom was ready when we arrived.&rdquo;
              </p>
              <div className="text-xs text-[#d99120]">
                <span>Amanda Botha</span>
                <span className="text-[#57534e]"> · </span>
                <span className="text-[#78716c]">Anniversary Booking</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-4 md:pt-0 md:pl-6">
              <p className="font-serif-display italic text-[#e7e5e4] text-sm">
                &ldquo;The lamb shank and oxtail are perfection. Slow cooked, rich and comforting with a cold craft beverage.&rdquo;
              </p>
              <div className="text-xs text-[#d99120]">
                <span>Siphesihle Radebe</span>
                <span className="text-[#57534e]"> · </span>
                <span className="text-[#78716c]">Maboneng Regular</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#221c17] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#a8a29e]">
              Planning an event, birthday, or private dinner?
            </span>
            <button
              onClick={onOpenReservation}
              className="flex items-center gap-2 text-xs font-semibold text-[#fce8bd] hover:text-[#e5a93c] transition-colors"
            >
              <span>Reserve Table for This Weekend</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <InteriorLightboxModal
        photoIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
      />
    </section>
  );
};
