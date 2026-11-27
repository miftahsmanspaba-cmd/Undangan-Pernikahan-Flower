import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS, LOVE_STORY } from '../data/weddingData';
import { ResilientImage } from './ResilientImage';
import { FloralCornerCluster } from './FloralDecor';

function RedPushpin() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="w-7 h-7 -mb-3 relative z-10 mx-auto drop-shadow-sm"
    >
      <circle cx="16" cy="9" r="6" fill="#E11D48" />
      <circle cx="14" cy="7" r="2" fill="#FDA4AF" />
      <path d="M16 14 L16 26" stroke="#94A3B8" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function GalleryAndStorySection() {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeLightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % GALLERY_ITEMS.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeLightboxIndex]);

  const activePhoto =
    activeLightboxIndex !== null ? GALLERY_ITEMS[activeLightboxIndex] : null;

  return (
    <>
      {/* Best Gallery Section */}
      <section
        id="gallery-section"
        className="relative bg-floral-slate px-5 pt-10 pb-14 text-white space-y-8 overflow-hidden"
      >
        <FloralCornerCluster position="top-left" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="flex-1 h-px bg-white/50" />
          <div className="text-right leading-none">
            <span className="block font-serif text-3xl sm:text-4xl text-white/95 tracking-tight">
              Best
            </span>
            <span className="block font-script text-5xl sm:text-6xl text-white -mt-3 pr-1">
              Gallery
            </span>
          </div>
        </div>

        {/* Asymmetric Gallery Grid matching reference video */}
        <div className="relative z-10 grid grid-cols-2 gap-2.5 sm:gap-3">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setActiveLightboxIndex(idx)}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.06 }}
              className={`group relative overflow-hidden rounded-lg bg-white/10 shadow-md focus-visible:outline-2 focus-visible:outline-white cursor-pointer ${
                item.span === 'full' ? 'col-span-2 aspect-[16/10]' : 'col-span-1 aspect-[4/5]'
              }`}
              aria-label={`Lihat foto ${item.caption}`}
            >
              <ResilientImage
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </motion.button>
          ))}
        </div>
      </section>

      {/* Love Story Section */}
      <section
        id="story-section"
        className="relative bg-floral-pastel px-5 py-12 text-slate-900 space-y-10 overflow-hidden"
      >
        <FloralCornerCluster position="top-right" />
        <FloralCornerCluster position="bottom-left" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#4D688A]/45" />
          <div className="text-right leading-none">
            <span className="block font-serif text-3xl sm:text-4xl text-[#3A5476] tracking-tight">
              Love
            </span>
            <span className="block font-script text-5xl sm:text-6xl text-[#4D688A] -mt-3 pr-1">
              Story
            </span>
          </div>
        </div>

        <div className="relative z-10 space-y-10">
          {LOVE_STORY.map((chapter, idx) => (
            <motion.article
              key={chapter.id}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
              className="space-y-4"
            >
              {/* Polaroid Card with Red Pushpin */}
              <div className="pt-2">
                <RedPushpin />
                <div className="bg-[#FAF0F4] p-2.5 pb-4 rounded-sm shadow-md border border-[#E5C6D2]">
                  <div className="aspect-[16/10] w-full overflow-hidden bg-rose-50">
                    <ResilientImage
                      src={chapter.image}
                      alt={chapter.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Date Pill & Chapter Title */}
              <div className="space-y-2.5 px-1">
                <div className="inline-block bg-[#4D688A] text-white text-[11px] font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded">
                  {chapter.date}
                </div>
                <h3 className="font-serif text-2xl sm:text-[26px] font-semibold text-[#4D688A] tracking-wide uppercase">
                  {chapter.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {chapter.narrative}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setActiveLightboxIndex(null)}
          >
            <button
              type="button"
              onClick={() => setActiveLightboxIndex(null)}
              aria-label="Tutup galeri"
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex((prev) =>
                  prev === null
                    ? null
                    : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
                );
              }}
              aria-label="Foto sebelumnya"
              className="absolute left-3 sm:left-6 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div
              className="max-w-2xl w-full flex flex-col items-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[78vh] w-full overflow-hidden rounded-xl shadow-2xl">
                <ResilientImage
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  className="w-full h-full max-h-[78vh] object-contain mx-auto"
                />
              </div>
              <p className="text-sm text-white/90 font-serif tracking-wide">
                {activePhoto.caption} ({(activeLightboxIndex ?? 0) + 1} /{' '}
                {GALLERY_ITEMS.length})
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex((prev) =>
                  prev === null ? null : (prev + 1) % GALLERY_ITEMS.length
                );
              }}
              aria-label="Foto berikutnya"
              className="absolute right-3 sm:right-6 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
