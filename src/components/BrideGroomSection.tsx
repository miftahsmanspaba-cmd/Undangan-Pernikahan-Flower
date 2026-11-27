import { motion } from 'motion/react';
import { COUPLE_INFO } from '../data/weddingData';
import { ResilientImage } from './ResilientImage';
import { FloralCornerCluster } from './FloralDecor';

export function BrideGroomSection() {
  const coupleProfiles = [
    {
      role: 'Bride',
      ...COUPLE_INFO.bride,
    },
    {
      role: 'Groom',
      ...COUPLE_INFO.groom,
    },
  ];

  return (
    <section
      id="couple-section"
      className="relative bg-floral-pastel px-4 sm:px-6 py-12 text-slate-900 overflow-hidden"
    >
      <FloralCornerCluster position="top-right" />
      <FloralCornerCluster position="bottom-left" />

      <div className="relative z-10 flex items-stretch gap-3 sm:gap-4">
        {/* Vertical Rotated Section Title */}
        <div className="flex items-center justify-center w-8 sm:w-10 shrink-0">
          <h2
            className="font-serif text-3xl sm:text-4xl text-[#3A5476] tracking-wide whitespace-nowrap select-none"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Bride &amp; Groom
          </h2>
        </div>

        {/* Stacked Portrait Cards inside Floral-Tinted Frame */}
        <div className="flex-1 rounded-3xl overflow-hidden bg-[#F7EDF2]/80 backdrop-blur-sm shadow-md border border-[#D8B4C4]/50 p-1.5 space-y-1.5">
          {coupleProfiles.map((person, index) => (
            <motion.article
              key={person.fullName}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#4D688A]/20"
            >
              <div className="absolute inset-0">
                <ResilientImage
                  src={person.photo}
                  alt={person.fullName}
                  className="w-full h-full object-cover object-top"
                  fallbackTitle={person.fullName}
                />
              </div>

              {/* Subtle inner white hairline border matching video */}
              <div className="absolute inset-2.5 border border-white/60 rounded-xl pointer-events-none z-10" />

              {/* Bottom contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              {/* Profile Details */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-7 text-center text-white space-y-1.5">
                <h3 className="font-serif text-2xl sm:text-[28px] font-semibold tracking-tight leading-snug">
                  {person.fullName}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 leading-snug">
                  <span className="block">{person.childOrder}</span>
                  <span className="font-medium">{person.parents}</span>
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
