import { useEffect, useState } from 'react';
import { MailOpen } from 'lucide-react';
import { COUPLE_INFO, WEDDING_PHOTOS } from '../data/weddingData';
import { ResilientImage } from './ResilientImage';

interface CoverOverlayProps {
  isOpen: boolean;
  guestName: string;
  onOpenInvitation: () => void;
}

export function CoverOverlay({
  isOpen,
  guestName,
  onOpenInvitation,
}: CoverOverlayProps) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setHidden(false);
      return;
    }
    const timer = window.setTimeout(() => setHidden(true), 700);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-50 w-full h-full flex items-center justify-center bg-[#4D688A] overflow-hidden transition-all duration-700 ease-out ${
        isOpen
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Full-bleed atmospheric backdrop on desktop, direct full-screen on mobile */}
      <div className="relative w-full h-full max-w-[520px] lg:max-w-[560px] mx-auto overflow-hidden shadow-2xl">
        <div className="absolute inset-0">
          <ResilientImage
            src={WEDDING_PHOTOS.cover}
            alt="Ilustrasi Alesha dan Rafi"
            className="w-full h-full object-cover object-top"
            fallbackTitle="Alesha & Rafi"
          />
        </div>

        {/* Measured slate-blue bottom contrast scrim matching video */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#4D688A] via-[#4D688A]/65 to-black/15" />

        {/* Subtle top frame border */}
        <div className="absolute inset-4 border border-white/25 rounded-2xl pointer-events-none" />

        {/* Cover content */}
        <div className="relative z-10 h-full flex flex-col justify-end px-7 pb-10 sm:px-10 sm:pb-14 text-white">
          <div className="space-y-4">
            <p className="text-xs sm:text-sm tracking-[0.22em] font-medium uppercase text-white/90">
              THE WEDDING OF
            </p>

            <h1 className="font-serif text-5xl sm:text-6xl font-semibold leading-[1.02] tracking-tight text-white text-balance">
              Alesha
              <span className="block mt-1">&amp; Rafi</span>
            </h1>

            <p className="text-sm sm:text-base font-semibold italic tracking-wide text-white/95 pt-1">
              {COUPLE_INFO.hashtag}
            </p>

            <div className="pt-2 space-y-1.5">
              <p className="text-xs sm:text-sm text-white/85">
                Kepada Yth. Bapak/Ibu/Saudara/i
              </p>
              <p className="text-xl sm:text-2xl font-medium tracking-tight text-white">
                {guestName}
              </p>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={onOpenInvitation}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/80 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase hover:bg-white hover:text-[#4D688A] active:scale-[0.98] transition-all duration-200 cursor-pointer min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap"
              >
                <MailOpen className="w-4 h-4 shrink-0" />
                <span>BUKA UNDANGAN</span>
              </button>
            </div>

            <p className="text-[11px] italic text-white/75 pt-2">
              *Mohon maaf apabila ada kesalahan penulisan nama/gelar
            </p>
          </div>
        </div>
      </div>

      {/* Desktop subtle blurred background image outside frame */}
      <div className="hidden lg:block fixed inset-0 -z-10 opacity-30 blur-2xl scale-110 pointer-events-none">
        <img
          src={WEDDING_PHOTOS.cover}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
