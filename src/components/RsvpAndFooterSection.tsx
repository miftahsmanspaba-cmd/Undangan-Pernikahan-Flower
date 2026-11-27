import { FormEvent, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Check,
  X,
  HelpCircle,
  Heart,
  Smile,
  Send,
  Share2,
  Instagram,
  Facebook,
  Youtube,
  Link as LinkIcon,
  Music2,
  MessageCircle,
} from 'lucide-react';
import {
  COUPLE_INFO,
  INITIAL_WISHES,
  TURUT_MENGUNDANG,
  WEDDING_PHOTOS,
  WEDDING_STICKERS,
  WishEntry,
} from '../data/weddingData';
import { ResilientImage } from './ResilientImage';
import { FloralCornerCluster } from './FloralDecor';

const STORAGE_KEY = 'alesha_rafi_wedding_wishes_v2';

interface RsvpAndFooterSectionProps {
  guestName: string;
}

export function RsvpAndFooterSection({ guestName }: RsvpAndFooterSectionProps) {
  const [wishes, setWishes] = useState<WishEntry[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as WishEntry[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback to defaults
    }
    return INITIAL_WISHES;
  });

  const [name, setName] = useState(guestName === 'Nama Tamu' ? '' : guestName);
  const [status, setStatus] = useState<'Hadir' | 'Masih Ragu' | 'Tidak Hadir'>('Hadir');
  const [message, setMessage] = useState('');
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const [showStickers, setShowStickers] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);

  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);
  const [replyAuthor, setReplyAuthor] = useState('');
  const [replyText, setReplyText] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    try {
      localStorage.removeItem('alesha_rafi_wedding_wishes_v1');
      localStorage.removeItem('anita_olga_wedding_wishes_v1');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch {
      // Ignore storage quota issues
    }
  }, [wishes]);

  const handleSubmitWish = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMsg = message.trim();

    if (!trimmedName) {
      setFormError('Mohon isi nama Anda terlebih dahulu.');
      return;
    }
    if (!trimmedMsg && !selectedSticker) {
      setFormError('Mohon tulis ucapan atau pilih stiker terlebih dahulu.');
      return;
    }

    const newWish: WishEntry = {
      id: `wish-${Date.now()}`,
      name: trimmedName,
      status,
      message: trimmedMsg || 'Mengirimkan doa terbaik untuk kedua mempelai.',
      sticker: selectedSticker ?? undefined,
      dateLabel: 'Hari ini',
      relativeLabel: 'Baru saja',
      likes: 1,
      likedByMe: true,
      replies: [],
    };

    setWishes((prev) => [newWish, ...prev]);
    setMessage('');
    setSelectedSticker(null);
    setShowStickers(false);
    setFormError(null);
    setSubmitFeedback('Terima kasih! Ucapan dan konfirmasi Anda telah tercatat.');
    window.setTimeout(() => setSubmitFeedback(null), 3500);
  };

  const handleToggleLike = (id: string) => {
    setWishes((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextLiked = !item.likedByMe;
        return {
          ...item,
          likedByMe: nextLiked,
          likes: nextLiked ? item.likes + 1 : Math.max(0, item.likes - 1),
        };
      })
    );
  };

  const handleSendReply = (wishId: string) => {
    const text = replyText.trim();
    if (!text) return;
    const author = replyAuthor.trim() || 'Tamu Undangan';

    setWishes((prev) =>
      prev.map((item) => {
        if (item.id !== wishId) return item;
        return {
          ...item,
          replies: [
            ...item.replies,
            {
              id: `rep-${Date.now()}`,
              author,
              text,
              timestamp: 'Baru saja',
            },
          ],
        };
      })
    );
    setReplyText('');
    setReplyAuthor('');
    setReplyTargetId(null);
  };

  const handleCopyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2200);
    } catch {
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2200);
    }
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `Dengan penuh syukur, kami mengundang Bapak/Ibu/Saudara/i ke acara pernikahan Alesha & Rafi pada 31 Desember 2026: ${
      typeof window !== 'undefined' ? window.location.href : ''
    }`
  )}`;

  return (
    <>
      {/* Doa Untuk Pengantin & Turut Mengundang */}
      <section className="relative bg-floral-slate px-5 pt-10 pb-8 text-white space-y-6 overflow-hidden">
        <FloralCornerCluster position="top-right" />
        {/* Doa Card */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 rounded-2xl border border-white/50 p-1.5"
        >
          <div className="rounded-xl border border-white/35 px-5 py-8 text-center space-y-4">
            <h3 className="font-serif text-3xl sm:text-4xl font-medium">
              Doa Untuk Pengantin
            </h3>
            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-xl sm:text-2xl leading-loose text-white"
            >
              بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
            </p>
            <p className="text-xs sm:text-sm font-medium text-white/95 leading-relaxed">
              Barakallahu laka wa baraka &apos;alaika wa jama&apos;a bainakuma
              fii khoir
            </p>
            <p className="text-xs italic text-white/90 leading-relaxed max-w-sm mx-auto">
              &ldquo;Mudah-mudahan Allah memberkahi engkau dalam segala hal
              (yang baik) dan mempersatukan kamu berdua dalam kebaikan&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Turut Mengundang Card */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="relative z-10 rounded-2xl border border-white/50 p-1.5"
        >
          <div className="rounded-xl border border-white/35 px-6 py-8 text-center space-y-5">
            <h3 className="font-serif text-3xl sm:text-4xl font-medium">
              Turut Mengundang
            </h3>
            <ul className="text-xs sm:text-[13px] text-white/90 space-y-1.5 text-left max-w-xs mx-auto leading-relaxed">
              {TURUT_MENGUNDANG.map((person) => (
                <li key={person} className="flex items-start gap-2">
                  <span aria-hidden="true">-</span>
                  <span>{person}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* RSVP & Wishes Section */}
      <section
        id="rsvp-section"
        className="relative bg-floral-slate px-5 pt-6 pb-12 text-white space-y-6 overflow-hidden"
      >
        <FloralCornerCluster position="bottom-left" />
        <div className="text-center space-y-2">
          <h3 className="font-serif text-4xl font-medium tracking-wide">
            RSVP &amp; Wishes
          </h3>
          <p className="text-xs sm:text-sm text-white/90">
            Ucapan Selamat, Doa &amp; Konfirmasi Kehadiran
          </p>
          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-white/85">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-white/60 tabular-nums font-semibold">
              {wishes.length}
            </span>
            <span>Ucapan</span>
          </div>
        </div>

        {/* RSVP Form */}
        <form onSubmit={handleSubmitWish} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="rsvp-name"
              className="block text-xs font-medium text-white/90"
            >
              Nama Anda
            </label>
            <input
              id="rsvp-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama lengkap"
              className="w-full rounded-lg border border-white/50 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/55 focus:outline-none focus:border-white min-h-[44px]"
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-white/90">
              Konfirmasi Kehadiran
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setStatus('Hadir')}
                className={`col-span-2 py-2.5 px-4 rounded-lg border text-sm font-medium transition-colors cursor-pointer min-h-[44px] ${
                  status === 'Hadir'
                    ? 'bg-white text-[#4D688A] border-white font-semibold'
                    : 'bg-white/5 text-white border-white/45 hover:bg-white/15'
                }`}
              >
                Hadir
              </button>
              <button
                type="button"
                onClick={() => setStatus('Masih Ragu')}
                className={`py-2.5 px-4 rounded-lg border text-sm font-medium transition-colors cursor-pointer min-h-[44px] ${
                  status === 'Masih Ragu'
                    ? 'bg-white text-[#4D688A] border-white font-semibold'
                    : 'bg-white/5 text-white border-white/45 hover:bg-white/15'
                }`}
              >
                Masih Ragu
              </button>
              <button
                type="button"
                onClick={() => setStatus('Tidak Hadir')}
                className={`py-2.5 px-4 rounded-lg border text-sm font-medium transition-colors cursor-pointer min-h-[44px] ${
                  status === 'Tidak Hadir'
                    ? 'bg-white text-[#4D688A] border-white font-semibold'
                    : 'bg-white/5 text-white border-white/45 hover:bg-white/15'
                }`}
              >
                Tidak Hadir
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="rsvp-message"
              className="block text-xs font-medium text-white/90"
            >
              Tulis Ucapan
            </label>
            <textarea
              id="rsvp-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis Ucapan & Doa Terbaikmu"
              className="w-full rounded-lg border border-white/50 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/55 focus:outline-none focus:border-white resize-y"
            />
          </div>

          {/* Sticker Picker */}
          <div className="relative space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setShowStickers((prev) => !prev)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-[#4D688A] text-xs font-semibold hover:bg-white/90 transition-colors cursor-pointer min-h-[40px] whitespace-nowrap"
              >
                <Smile className="w-4 h-4 shrink-0" />
                <span>Pilih Stiker</span>
              </button>
              {selectedSticker && (
                <span className="inline-flex items-center gap-2 text-xs text-white/95 bg-white/15 px-3 py-1.5 rounded-lg">
                  <span>{selectedSticker}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedSticker(null)}
                    aria-label="Hapus stiker"
                    className="hover:text-white/70 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
            </div>

            {showStickers && (
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-white text-slate-800 shadow-lg">
                {WEDDING_STICKERS.map((sticker) => (
                  <button
                    key={sticker.id}
                    type="button"
                    onClick={() => {
                      setSelectedSticker(`${sticker.icon} ${sticker.label}`);
                      setShowStickers(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 text-xs font-medium text-left cursor-pointer min-h-[40px]"
                  >
                    <span className="text-base">{sticker.icon}</span>
                    <span>{sticker.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {formError && (
            <p className="text-xs text-rose-200 bg-rose-950/40 border border-rose-300/30 rounded-lg px-3 py-2">
              {formError}
            </p>
          )}

          {submitFeedback && (
            <p className="text-xs text-emerald-100 bg-emerald-950/40 border border-emerald-300/30 rounded-lg px-3 py-2">
              {submitFeedback}
            </p>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white text-[#4D688A] hover:bg-slate-100 text-sm font-semibold transition-colors cursor-pointer min-h-[46px] shadow-sm"
          >
            <Send className="w-4 h-4 shrink-0" />
            <span>Kirim</span>
          </button>
        </form>

        {/* Wishes Feed */}
        <div className="space-y-3.5 pt-2">
          {wishes.length === 0 ? (
            <div className="rounded-xl bg-white/10 border border-white/25 p-6 text-center text-xs sm:text-sm text-white/90">
              Belum ada ucapan. Jadilah yang pertama mengirimkan doa &amp; konfirmasi kehadiran!
            </div>
          ) : (
            wishes.map((wish) => {
            const isAttending = wish.status === 'Hadir';
            const isDeclined = wish.status === 'Tidak Hadir';
            return (
              <article
                key={wish.id}
                className="rounded-xl bg-[#F8F1F6] text-slate-800 p-4 shadow-sm border border-white/60 space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-sm text-[#3E5879]">
                    {wish.name}
                  </h4>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold shrink-0 ${
                      isAttending
                        ? 'bg-emerald-50 text-emerald-700'
                        : isDeclined
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {isAttending && <Check className="w-3 h-3" />}
                    {isDeclined && <X className="w-3 h-3" />}
                    {!isAttending && !isDeclined && (
                      <HelpCircle className="w-3 h-3" />
                    )}
                    <span>{wish.status}</span>
                  </span>
                </div>

                {wish.sticker && (
                  <div className="text-xs font-medium text-[#4D688A]">
                    {wish.sticker}
                  </div>
                )}

                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                  {wish.message}
                </p>

                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                  <div>
                    <p>{wish.dateLabel}</p>
                    <p>{wish.relativeLabel}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setReplyTargetId(
                          replyTargetId === wish.id ? null : wish.id
                        )
                      }
                      className="text-xs font-medium text-slate-500 hover:text-[#4D688A] cursor-pointer py-1 px-1.5"
                    >
                      Balas
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleLike(wish.id)}
                      aria-label={`Sukai ucapan dari ${wish.name}`}
                      className={`inline-flex items-center gap-1 text-xs font-medium cursor-pointer py-1 px-1.5 transition-colors ${
                        wish.likedByMe
                          ? 'text-rose-500'
                          : 'text-slate-500 hover:text-rose-500'
                      }`}
                    >
                      <Heart
                        className="w-3.5 h-3.5"
                        fill={wish.likedByMe ? 'currentColor' : 'none'}
                      />
                      <span className="tabular-nums">{wish.likes}</span>
                    </button>
                  </div>
                </div>

                {/* Replies List */}
                {wish.replies.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-100 space-y-2 pl-3">
                    {wish.replies.map((reply) => (
                      <div key={reply.id} className="text-xs space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#3E5879]">
                            {reply.author}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {reply.timestamp}
                          </span>
                        </div>
                        <p className="text-slate-600">{reply.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Inline Reply Form */}
                {replyTargetId === wish.id && (
                  <div className="mt-2 pt-2 border-t border-slate-100 space-y-2">
                    <input
                      type="text"
                      value={replyAuthor}
                      onChange={(e) => setReplyAuthor(e.target.value)}
                      placeholder="Nama Anda (opsional)"
                      className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#4D688A]"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Tulis balasan..."
                        className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#4D688A]"
                      />
                      <button
                        type="button"
                        onClick={() => handleSendReply(wish.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#4D688A] text-white text-xs font-medium hover:bg-[#3F5878] cursor-pointer whitespace-nowrap"
                      >
                        Kirim
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })
          )}
        </div>
      </section>

      {/* Closing Portrait & Footer */}
      <footer className="relative bg-floral-slate text-white overflow-hidden">
        <div className="relative h-[460px] sm:h-[520px] w-full">
          <div className="absolute inset-0">
            <ResilientImage
              src={WEDDING_PHOTOS.windowPampas}
              alt="Alesha & Rafi"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#4D688A] via-[#4D688A]/65 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 px-6 pb-8 text-center space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-wide">
              Alesha &amp; Rafi
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-sm mx-auto">
              Suatu kebahagiaan &amp; kehormatan bagi kami, apabila
              Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do&apos;a restu
              kepada kami
            </p>
          </div>
        </div>

        {/* Crest Badge & Share Controls */}
        <div className="px-6 pt-6 pb-16 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#FAF0F4] text-[#4D688A] mx-auto flex flex-col items-center justify-center shadow-lg border-4 border-white/30">
            <span className="font-serif text-xl italic font-semibold leading-none">
              A&amp;R
            </span>
            <span className="text-[8px] tracking-[0.2em] uppercase mt-1 text-[#4D688A]/80">
              31.12.26
            </span>
          </div>

          <p className="text-xs text-white/80">
            Bagikan kabar bahagia pernikahan kami
          </p>

          <div className="flex items-center justify-center gap-3">
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bagikan via WhatsApp"
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={handleCopyInviteLink}
              aria-label="Salin tautan undangan"
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer"
            >
              {linkCopied ? (
                <Check className="w-4 h-4 text-emerald-200" />
              ) : (
                <LinkIcon className="w-4 h-4" />
              )}
            </button>
          </div>

          {linkCopied && (
            <p className="text-xs text-emerald-100">
              Tautan undangan berhasil disalin!
            </p>
          )}

          <div className="pt-1 flex items-center justify-center gap-2 text-xs text-white/85">
            <Music2 className="w-3.5 h-3.5" />
            <span>{COUPLE_INFO.songTitle}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
