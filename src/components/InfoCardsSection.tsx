import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Video,
  Gift,
  Instagram,
  Youtube,
  X,
  Copy,
  Check,
  MapPin,
} from 'lucide-react';
import {
  DRESS_CODE_COLORS,
  GIFT_ACCOUNTS,
  GIFT_SHIPPING,
} from '../data/weddingData';
import { FloralCornerCluster } from './FloralDecor';

function TuxedoIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className="w-11 h-11 text-white mx-auto"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 9 L24 20 L33 9" />
      <path d="M15 9 L8 14 L12 37 L24 39 L36 37 L40 14 L33 9" />
      <path d="M24 20 L24 39" />
      <path d="M20 12 L24 14 L28 12 L28 16 L24 14 L20 16 Z" fill="currentColor" />
    </svg>
  );
}

export function InfoCardsSection() {
  const [selectedSwatch, setSelectedSwatch] = useState<string | null>(null);
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [streamModalOpen, setStreamModalOpen] = useState<'Instagram' | 'YouTube' | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback if clipboard blocked
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section className="relative bg-floral-slate px-5 py-12 text-white space-y-6 overflow-hidden">
      <FloralCornerCluster position="top-left" />
      <FloralCornerCluster position="bottom-right" />
      {/* Dress Code Card */}
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-white/50 p-1.5"
      >
        <div className="rounded-xl border border-white/35 px-6 py-8 text-center space-y-4">
          <TuxedoIcon />
          <h3 className="font-serif text-3xl sm:text-4xl font-medium tracking-wide">
            Dress Code
          </h3>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-xs mx-auto">
            Dengan hormat, kami mengundang Anda untuk mengenakan warna pilihan
            ini di hari pernikahan kami.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3 sm:gap-3.5">
            {DRESS_CODE_COLORS.map((swatch) => {
              const isSelected = selectedSwatch === swatch.name;
              return (
                <button
                  key={swatch.name}
                  type="button"
                  onClick={() =>
                    setSelectedSwatch(isSelected ? null : swatch.name)
                  }
                  aria-label={`Warna dress code ${swatch.name}`}
                  title={swatch.name}
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 transition-transform cursor-pointer ${
                    isSelected
                      ? 'border-white scale-110 ring-2 ring-white/50'
                      : 'border-white/40 hover:scale-105'
                  }`}
                  style={{ backgroundColor: swatch.hex }}
                />
              );
            })}
          </div>

          <p className="text-xs text-white/85 min-h-[18px]">
            {selectedSwatch ? `Nuansa warna: ${selectedSwatch}` : 'Ketuk warna untuk melihat nama nuansa'}
          </p>
        </div>
      </motion.div>

      {/* Live Streaming Card */}
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, delay: 0.06 }}
        className="rounded-2xl border border-white/50 p-1.5"
      >
        <div className="rounded-xl border border-white/35 px-6 py-8 text-center space-y-4">
          <Video className="w-10 h-10 mx-auto text-white" strokeWidth={1.6} />
          <h3 className="font-serif text-3xl sm:text-4xl font-medium tracking-wide">
            Live Streaming
          </h3>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-xs mx-auto">
            Temui kami secara virtual untuk menyaksikan acara pernikahan kami
            melalui tautan di bawah ini:
          </p>

          <div className="pt-2 flex flex-col items-center gap-2.5 max-w-[230px] mx-auto">
            <button
              type="button"
              onClick={() => setStreamModalOpen('Instagram')}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/75 bg-white/5 hover:bg-white hover:text-[#4D688A] text-xs font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer min-h-[42px] whitespace-nowrap"
            >
              <Instagram className="w-4 h-4 shrink-0" />
              <span>INSTAGRAM</span>
            </button>
            <button
              type="button"
              onClick={() => setStreamModalOpen('YouTube')}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/75 bg-white/5 hover:bg-white hover:text-[#4D688A] text-xs font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer min-h-[42px] whitespace-nowrap"
            >
              <Youtube className="w-4 h-4 shrink-0" />
              <span>YOUTUBE</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Wedding Gift Card */}
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className="rounded-2xl border border-white/50 p-1.5"
      >
        <div className="rounded-xl border border-white/35 px-6 py-8 text-center space-y-4">
          <Gift className="w-10 h-10 mx-auto text-white" strokeWidth={1.6} />
          <h3 className="font-serif text-3xl sm:text-4xl font-medium tracking-wide">
            Wedding Gift
          </h3>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-xs mx-auto">
            Tanpa mengurangi rasa hormat, bagi Bapak/Ibu/Saudara/i yang ingin
            memberikan tanda kasih untuk kami, dapat melalui:
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setGiftModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-7 py-2.5 rounded-full border border-white/75 bg-white/10 hover:bg-white hover:text-[#4D688A] text-xs font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer min-h-[44px] whitespace-nowrap"
            >
              <Gift className="w-4 h-4 shrink-0" />
              <span>KLIK DI SINI</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Wedding Gift Modal */}
      <AnimatePresence>
        {giftModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setGiftModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-2xl bg-white text-slate-900 p-6 shadow-2xl space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h4 className="font-serif text-2xl font-semibold text-[#4D688A]">
                    Amplop Digital &amp; Kado
                  </h4>
                  <p className="text-xs text-slate-500">
                    Terima kasih atas doa dan tanda kasih Anda
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setGiftModalOpen(false)}
                  aria-label="Tutup modal kado"
                  className="p-2 rounded-full text-slate-500 hover:bg-slate-100 cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {GIFT_ACCOUNTS.map((acc) => {
                  const cleanNumber = acc.accountNumber.replace(/\s+/g, '');
                  const isCopied = copiedId === acc.bank;
                  return (
                    <div
                      key={acc.bank}
                      className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 flex items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-[#4D688A] uppercase tracking-wider">
                          Bank {acc.bank}
                        </p>
                        <p className="text-base font-semibold tracking-wide text-slate-900">
                          No. Rekening: {acc.accountNumber}
                        </p>
                        <p className="text-xs text-slate-600">
                          a.n. {acc.accountHolder}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(cleanNumber, acc.bank)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#4D688A] hover:bg-[#3F5878] text-white text-xs font-medium transition-colors cursor-pointer min-h-[40px] whitespace-nowrap shrink-0"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-[#4D688A] uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Alamat Pengiriman Kado</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopy(GIFT_SHIPPING.address, 'address')}
                    className="text-xs font-medium text-[#4D688A] hover:underline cursor-pointer"
                  >
                    {copiedId === 'address' ? 'Tersalin' : 'Salin Alamat'}
                  </button>
                </div>
                <p className="text-xs font-medium text-slate-800">
                  {GIFT_SHIPPING.phone
                    ? `${GIFT_SHIPPING.recipient} (${GIFT_SHIPPING.phone})`
                    : GIFT_SHIPPING.recipient}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {GIFT_SHIPPING.address}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Streaming Modal */}
      <AnimatePresence>
        {streamModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setStreamModalOpen(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-sm rounded-2xl bg-white text-slate-900 p-6 shadow-2xl space-y-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStreamModalOpen(null)}
                  aria-label="Tutup modal live streaming"
                  className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Video className="w-10 h-10 mx-auto text-[#4D688A]" />
              <h4 className="font-serif text-2xl font-semibold text-slate-900">
                Live Streaming {streamModalOpen}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Siaran langsung Akad Nikah &amp; Resepsi Alesha &amp; Rafi akan
                dimulai pada{' '}
                <strong className="text-slate-900">
                  Rabu, 30 Desember 2026 pukul 08.00 WIB
                </strong>
                .
              </p>
              <a
                href={
                  streamModalOpen === 'Instagram'
                    ? 'https://instagram.com'
                    : 'https://youtube.com'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-full bg-[#4D688A] hover:bg-[#3F5878] text-white text-xs font-semibold tracking-wider uppercase transition-colors min-h-[44px]"
              >
                <span>Buka {streamModalOpen}</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
