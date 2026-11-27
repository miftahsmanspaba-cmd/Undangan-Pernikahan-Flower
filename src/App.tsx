import { useEffect, useState } from 'react';
import { Disc3, Pause, Play, UserPlus, Check, Copy, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { COUPLE_INFO, WEDDING_PHOTOS } from './data/weddingData';
import { weddingAudio } from './utils/audioPlayer';
import { CoverOverlay } from './components/CoverOverlay';
import { HeroAndGreeting } from './components/HeroAndGreeting';
import { BrideGroomSection } from './components/BrideGroomSection';
import { EventsAndCountdown } from './components/EventsAndCountdown';
import { InfoCardsSection } from './components/InfoCardsSection';
import { GalleryAndStorySection } from './components/GalleryAndStorySection';
import { RsvpAndFooterSection } from './components/RsvpAndFooterSection';
import { ResilientImage } from './components/ResilientImage';

function readGuestNameFromUrl(): string {
  if (typeof window === 'undefined') return 'Nama Tamu';
  const params = new URLSearchParams(window.location.search);
  const to = params.get('to');
  return to && to.trim().length > 0 ? to.trim() : 'Nama Tamu';
}

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [guestName, setGuestName] = useState<string>(() => readGuestNameFromUrl());
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const [customGuestInput, setCustomGuestInput] = useState('');
  const [copiedGuestUrl, setCopiedGuestUrl] = useState(false);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      weddingAudio.pause();
    };
  }, []);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    const started = weddingAudio.start();
    setIsMusicPlaying(started);
  };

  const handleToggleMusic = () => {
    const playing = weddingAudio.toggle();
    setIsMusicPlaying(playing);
  };

  const jumpToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const generatedInviteUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}${
          customGuestInput.trim()
            ? `?to=${encodeURIComponent(customGuestInput.trim())}`
            : ''
        }`
      : '';

  const handleCopyGuestUrl = async () => {
    if (!generatedInviteUrl) return;
    try {
      await navigator.clipboard.writeText(generatedInviteUrl);
      setCopiedGuestUrl(true);
      window.setTimeout(() => setCopiedGuestUrl(false), 2000);
    } catch {
      setCopiedGuestUrl(true);
      window.setTimeout(() => setCopiedGuestUrl(false), 2000);
    }
  };

  const handlePreviewGuestName = () => {
    const trimmed = customGuestInput.trim();
    if (trimmed) {
      setGuestName(trimmed);
      const url = new URL(window.location.href);
      url.searchParams.set('to', trimmed);
      window.history.replaceState({}, '', url.toString());
    }
    setGuestModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#3E5674] text-slate-900">
      {/* Full-viewport Cover Screen */}
      <CoverOverlay
        isOpen={isOpened}
        guestName={guestName}
        onOpenInvitation={handleOpenInvitation}
      />

      {/* Responsive Editorial Split on Desktop, Full-bleed Mobile Flow on <lg */}
      <div className="lg:flex lg:min-h-screen">
        {/* Desktop Left Sticky Showcase Panel */}
        <aside className="hidden lg:flex lg:w-[46%] xl:w-[48%] lg:sticky lg:top-0 lg:h-screen relative overflow-hidden bg-[#3B526E] text-white flex-col justify-between p-10 xl:p-12">
          <div className="absolute inset-0">
            <ResilientImage
              src={WEDDING_PHOTOS.cover}
              alt="Alesha & Rafi"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2F435C] via-[#3B526E]/65 to-[#3B526E]/45" />
          </div>

          {/* Top Monogram & Date */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/75">
                The Wedding Of
              </p>
              <h2 className="font-serif text-3xl font-semibold tracking-wide mt-0.5">
                Alesha &amp; Rafi
              </h2>
            </div>
            <div className="text-right">
              <p className="text-xs tracking-[0.22em] tabular-nums text-white/90">
                {COUPLE_INFO.dateDisplay}
              </p>
              <p className="text-xs italic text-white/75 mt-0.5">
                {COUPLE_INFO.hashtag}
              </p>
            </div>
          </div>

          {/* Middle Navigation Links */}
          <nav
            aria-label="Navigasi bagian undangan"
            className="relative z-10 my-auto py-8 space-y-3"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/65 mb-4">
              Daftar Bagian
            </p>
            {[
              { id: 'couple-section', label: 'Bride & Groom' },
              { id: 'event-section', label: 'Wedding Event' },
              { id: 'gallery-section', label: 'Best Gallery' },
              { id: 'story-section', label: 'Love Story' },
              { id: 'rsvp-section', label: 'RSVP & Wishes' },
            ].map((navItem) => (
              <button
                key={navItem.id}
                type="button"
                onClick={() => jumpToSection(navItem.id)}
                className="block text-left font-serif text-2xl xl:text-3xl text-white/85 hover:text-white hover:translate-x-1.5 transition-all cursor-pointer"
              >
                {navItem.label}
              </button>
            ))}
          </nav>

          {/* Bottom Music & Guest Link Controls */}
          <div className="relative z-10 border-t border-white/20 pt-5 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleToggleMusic}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm text-xs font-medium transition-colors cursor-pointer min-h-[40px]"
            >
              {isMusicPlaying ? (
                <Pause className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <Play className="w-3.5 h-3.5 shrink-0" />
              )}
              <span>{COUPLE_INFO.songTitle}</span>
            </button>

            <button
              type="button"
              onClick={() => setGuestModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 hover:bg-white/15 text-xs font-medium transition-colors cursor-pointer min-h-[40px] whitespace-nowrap"
            >
              <UserPlus className="w-3.5 h-3.5 shrink-0" />
              <span>Kirim ke Tamu</span>
            </button>
          </div>
        </aside>

        {/* Main Scrollable Invitation Column */}
        <main className="w-full lg:w-[54%] xl:w-[52%] bg-[#3E5674] lg:py-0">
          <div className="w-full max-w-[520px] mx-auto bg-[#4D688A] shadow-2xl overflow-hidden">
            <HeroAndGreeting />
            <BrideGroomSection />
            <EventsAndCountdown />
            <InfoCardsSection />
            <GalleryAndStorySection />
            <RsvpAndFooterSection guestName={guestName} />
          </div>
        </main>
      </div>

      {/* Compact Floating Audio Control (visible after opening) */}
      {isOpened && (
        <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setGuestModalOpen(true)}
            aria-label="Buat tautan nama tamu"
            className="lg:hidden w-11 h-11 rounded-full bg-white/90 text-[#4D688A] shadow-lg backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleToggleMusic}
            aria-label={isMusicPlaying ? 'Jeda musik latar' : 'Putar musik latar'}
            title={COUPLE_INFO.songTitle}
            className="w-11 h-11 rounded-full bg-[#3B526E]/90 border border-white/40 text-white shadow-lg backdrop-blur-sm flex items-center justify-center hover:bg-[#3B526E] transition-colors cursor-pointer"
          >
            <Disc3
              className={`w-5 h-5 ${isMusicPlaying ? 'animate-spin-slow' : ''}`}
            />
          </button>
        </div>
      )}

      {/* Personalize Guest Invite Link Modal */}
      <AnimatePresence>
        {guestModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setGuestModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-2xl bg-white text-slate-900 p-6 shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h4 className="font-serif text-2xl font-semibold text-[#4D688A]">
                    Personalisasi Nama Tamu
                  </h4>
                  <p className="text-xs text-slate-500">
                    Buat tautan undangan khusus untuk setiap tamu
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setGuestModalOpen(false)}
                  aria-label="Tutup"
                  className="p-2 rounded-full text-slate-400 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="custom-guest-name"
                  className="block text-xs font-medium text-slate-700"
                >
                  Nama Tamu Undangan
                </label>
                <input
                  id="custom-guest-name"
                  type="text"
                  value={customGuestInput}
                  onChange={(e) => setCustomGuestInput(e.target.value)}
                  placeholder="Contoh: Bapak Budi & Keluarga"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#4D688A]"
                />
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600 break-all">
                {generatedInviteUrl}
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleCopyGuestUrl}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#4D688A] hover:bg-[#3F5878] text-white text-xs font-semibold cursor-pointer min-h-[42px]"
                >
                  {copiedGuestUrl ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Link Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Salin Link Tamu</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handlePreviewGuestName}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer min-h-[42px] whitespace-nowrap"
                >
                  Terapkan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
