import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { MapPin, CalendarPlus } from 'lucide-react';
import { COUPLE_INFO, WEDDING_EVENTS, WEDDING_PHOTOS, WeddingEvent } from '../data/weddingData';
import { ResilientImage } from './ResilientImage';
import { FloralCornerCluster } from './FloralDecor';

function AnimatedDayNumber({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(target);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;
    let frame = 0;
    const totalFrames = 18;
    const interval = window.setInterval(() => {
      frame += 1;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.max(1, Math.round(eased * target));
      setDisplayValue(val);
      if (frame >= totalFrames) {
        setDisplayValue(target);
        window.clearInterval(interval);
      }
    }, 24);
    return () => window.clearInterval(interval);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
    </span>
  );
}

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const isRightSidebar = event.sidebarSide === 'right';

  return (
    <motion.article
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`flex items-stretch rounded-2xl overflow-hidden bg-[#F7EFF4] shadow-md border border-[#D8B4C4]/45 min-h-[380px] sm:min-h-[410px] ${
        isRightSidebar ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Slate Blue Vertical Sidebar Title */}
      <div className="w-16 sm:w-20 shrink-0 bg-[#4D688A] text-white flex items-center justify-center p-2">
        <h3
          className="font-serif text-2xl sm:text-3xl tracking-wide whitespace-nowrap select-none"
          style={{
            writingMode: 'vertical-rl',
            transform: isRightSidebar ? 'none' : 'rotate(180deg)',
          }}
        >
          {event.title}
        </h3>
      </div>

      {/* Photo & Frosted Info Panel */}
      <div className="relative flex-1 min-h-[380px] sm:min-h-[410px] overflow-hidden">
        <div className="absolute inset-0">
          <ResilientImage
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover object-center"
            fallbackTitle={event.title}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

        {/* Frosted Dark Event Box */}
        <div className="absolute inset-x-3.5 bottom-3.5 sm:inset-x-4 sm:bottom-4 rounded-xl bg-black/55 backdrop-blur-md border border-white/25 p-4 text-white space-y-2.5">
          <div className="flex items-center gap-3">
            <div className="text-4xl sm:text-5xl font-semibold leading-none tracking-tight">
              <AnimatedDayNumber target={event.dayNumber} />
            </div>
            <div className="text-xs sm:text-sm leading-tight text-white/95 border-l border-white/30 pl-3">
              <p className="font-medium">{event.dayName}</p>
              <p>{event.month}</p>
              <p className="tabular-nums">{event.year}</p>
            </div>
          </div>

          <div className="h-px bg-white/20" />

          <div className="space-y-1 text-xs leading-relaxed">
            <p className="font-semibold tabular-nums">{event.time}</p>
            <p className="font-semibold tracking-wide uppercase text-white/95">
              {event.venueTitle}
            </p>
            <p className="text-white/85">{event.address}</p>
          </div>

          <div className="pt-1">
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-[#4D688A] hover:bg-[#3F5878] text-white text-xs font-medium transition-colors min-h-[40px] whitespace-nowrap shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateRemaining(targetIso: string): TimeRemaining {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function EventsAndCountdown() {
  const [countdown, setCountdown] = useState<TimeRemaining>(() =>
    calculateRemaining(COUPLE_INFO.targetIsoDate)
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(calculateRemaining(COUPLE_INFO.targetIsoDate));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleSaveToCalendar = () => {
    const googleCalUrl =
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Alesha+%26+Rafi&dates=20261230T010000Z/20261231T140000Z&details=Akad+Nikah+%26+Resepsi+Alesha+%26+Rafi&location=Tokyo,+Jepang';
    const link = document.createElement('a');
    link.href = googleCalUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  return (
    <>
      {/* Quranic Verse Ar-Rum 21 */}
      <section className="relative bg-floral-slate text-white px-6 py-12 text-center overflow-hidden">
        <FloralCornerCluster position="bottom-right" />
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-md mx-auto space-y-5"
        >
          {/* Golden Laurel Leaf SVG */}
          <div className="flex justify-center">
            <svg
              aria-hidden="true"
              viewBox="0 0 80 44"
              className="w-20 h-11 text-[#D4B475]"
              fill="currentColor"
            >
              <path d="M12 36 C25 34, 48 22, 68 8 C50 18, 30 28, 12 36 Z" />
              <path d="M22 30 C18 22, 22 14, 29 12 C28 20, 26 26, 22 30 Z" />
              <path d="M34 24 C30 16, 35 8, 42 7 C40 15, 38 20, 34 24 Z" />
              <path d="M47 18 C44 10, 49 4, 56 3 C54 10, 51 14, 47 18 Z" />
              <path d="M28 32 C34 36, 42 35, 46 29 C39 29, 33 30, 28 32 Z" />
              <path d="M42 25 C48 29, 56 27, 60 21 C53 21, 47 22, 42 25 Z" />
              <path d="M55 17 C61 20, 68 18, 72 12 C66 12, 60 14, 55 17 Z" />
            </svg>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-white/95">
            &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
            pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan
            merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan
            sayang. Sungguh, pada yang demikian itu benar-benar terdapat
            tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.&rdquo;
          </p>

          <p className="font-serif italic text-base sm:text-lg text-white/95 tracking-wide">
            - QS. Ar-Rum : 21 -
          </p>
        </motion.div>
      </section>

      {/* Wedding Event Section */}
      <section
        id="event-section"
        className="relative bg-floral-pastel px-5 py-12 text-slate-900 space-y-8 overflow-hidden"
      >
        <FloralCornerCluster position="top-left" />
        <FloralCornerCluster position="bottom-right" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#4D688A]/45" />
          <div className="text-right leading-none">
            <span className="block font-serif text-3xl sm:text-4xl text-[#3A5476] tracking-tight">
              Wedding
            </span>
            <span className="block font-script text-5xl sm:text-6xl text-[#4D688A] -mt-3 pr-1">
              Event
            </span>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          {WEDDING_EVENTS.map((event, idx) => (
            <EventCard key={event.id} event={event} index={idx} />
          ))}
        </div>
      </section>

      {/* Happy Days Countdown */}
      <section className="relative h-[440px] sm:h-[480px] w-full overflow-hidden bg-[#4D688A]">
        <div className="absolute inset-0">
          <ResilientImage
            src={WEDDING_PHOTOS.cover}
            alt="Save the Date Alesha & Rafi"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 h-full flex items-center justify-center px-5">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md rounded-2xl bg-black/50 backdrop-blur-md border border-white/25 px-5 py-7 text-center text-white space-y-5 shadow-xl"
          >
            <p className="font-serif text-lg sm:text-xl tracking-wide text-white/95">
              ~ Happy Days Countdown ~
            </p>

            <div className="grid grid-cols-4 gap-2 tabular-nums">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Minutes', value: countdown.minutes },
                { label: 'Seconds', value: countdown.seconds },
              ].map((unit) => (
                <div key={unit.label} className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-semibold tracking-tight">
                    {String(unit.value).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] sm:text-xs text-white/80">
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <button
                type="button"
                onClick={handleSaveToCalendar}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/40 text-xs sm:text-sm font-medium text-white transition-colors cursor-pointer min-h-[40px] whitespace-nowrap"
              >
                <CalendarPlus className="w-4 h-4 shrink-0" />
                <span>~ Save The Date ~</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
