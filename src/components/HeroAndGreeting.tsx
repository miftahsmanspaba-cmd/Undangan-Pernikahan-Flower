import { motion } from 'motion/react';
import { ChevronsDown } from 'lucide-react';
import { COUPLE_INFO, WEDDING_PHOTOS } from '../data/weddingData';
import { ResilientImage } from './ResilientImage';
import { FloralCornerCluster } from './FloralDecor';

export function HeroAndGreeting() {
  const scrollToGreeting = () => {
    const el = document.getElementById('greeting-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Main Motion Hero */}
      <section
        id="hero-section"
        className="relative h-[88vh] min-h-[580px] max-h-[820px] w-full overflow-hidden bg-[#4D688A]"
      >
        <div className="absolute inset-0 overflow-hidden">
          <ResilientImage
            src={WEDDING_PHOTOS.heroDance}
            alt="Ilustrasi Alesha dan Rafi berdansa di taman bunga"
            className="w-full h-full object-cover object-center animate-ken-burns"
            fallbackTitle="Alesha & Rafi"
          />
        </div>

        {/* Soft bottom slate gradient scrim for crisp white typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#4D688A] via-[#4D688A]/45 to-black/10" />

        <div className="relative z-10 h-full flex flex-col items-center justify-end pb-12 px-6 text-center text-white">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md space-y-3"
          >
            <p className="text-xs sm:text-sm tracking-[0.26em] uppercase font-medium text-white/95">
              THE WEDDING OF
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-[0.06em] uppercase text-white">
              ALESHA &amp; RAFI
            </h2>

            <div className="w-full h-px bg-white/75 my-3" />

            <p className="text-base sm:text-lg tracking-[0.34em] font-light tabular-nums text-white/95 pt-1">
              {COUPLE_INFO.dateDisplay}
            </p>

            <div className="pt-4 flex justify-center">
              <button
                type="button"
                onClick={scrollToGreeting}
                aria-label="Gulir ke sambutan"
                className="p-2.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-white"
              >
                <ChevronsDown className="w-6 h-6 animate-bounce" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Monogram A|O, 3-Photo Strip & Salam Pembuka */}
      <section
        id="greeting-section"
        className="relative bg-floral-slate text-white px-5 pt-10 pb-14 overflow-hidden"
      >
        <FloralCornerCluster position="top-left" />
        <FloralCornerCluster position="top-right" />
        {/* Subtle decorative botanical silhouette */}
        <svg
          aria-hidden="true"
          viewBox="0 0 200 200"
          className="absolute -right-10 top-6 w-52 h-52 text-white/[0.06] pointer-events-none"
          fill="currentColor"
        >
          <path d="M160 10 C120 40, 110 90, 120 150 C95 120, 70 110, 40 120 C70 90, 95 75, 115 70 C90 50, 75 30, 75 10 C100 30, 118 48, 125 65 C135 40, 145 20, 160 10 Z" />
        </svg>

        {/* Monogram A | R */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-5 mb-9"
        >
          <span className="font-serif text-6xl sm:text-7xl font-light tracking-tight leading-none">
            A
          </span>
          <span className="w-[1.5px] h-16 bg-white/80" aria-hidden="true" />
          <span className="font-serif text-6xl sm:text-7xl font-light tracking-tight leading-none">
            R
          </span>
        </motion.div>

        {/* 3-Photo Strip */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-9">
          {[
            {
              src: WEDDING_PHOTOS.floralStudio,
              alt: 'Alesha dan Rafi di taman floral',
            },
            {
              src: WEDDING_PHOTOS.cover,
              alt: 'Ilustrasi resmi Alesha dan Rafi',
            },
            {
              src: WEDDING_PHOTOS.windowPampas,
              alt: 'Alesha dan Rafi berpegangan tangan di taman kaca',
            },
          ].map((photo, idx) => (
            <motion.div
              key={photo.alt}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="aspect-[3/4] rounded-xl overflow-hidden bg-white/10 shadow-md ring-1 ring-white/20"
            >
              <ResilientImage
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>

        {/* Arabic Salam & Intro */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto space-y-4"
        >
          <p
            dir="rtl"
            lang="ar"
            className="font-arabic text-2xl sm:text-[26px] leading-relaxed text-white"
          >
            السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
          </p>
          <p className="text-xs sm:text-sm leading-relaxed text-white/90 font-normal">
            Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan.
            Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami:
          </p>
        </motion.div>
      </section>
    </>
  );
}
