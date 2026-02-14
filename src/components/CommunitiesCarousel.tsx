import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { communities } from '../data/communities';

const GAP_PX = 24; // gap-6 = 1.5rem

const CommunitiesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [desktopSlideStep, setDesktopSlideStep] = useState(376);
  const [isRtl, setIsRtl] = useState(false);
  const desktopCardRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    const formSection = document.getElementById('lead-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const updateCardsPerView = () => {
      const w = window.innerWidth;
      if (w >= 1024) setCardsPerView(3);
      else if (w >= 768) setCardsPerView(2);
      else setCardsPerView(1);
    };
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  useEffect(() => {
    setIsRtl(document.documentElement.dir === 'rtl');
  }, []);

  useEffect(() => {
    const measureDesktopSlide = () => {
      if (window.innerWidth < 1024) return;
      const el = desktopCardRef.current;
      if (el) {
        const width = el.offsetWidth;
        setDesktopSlideStep(width + GAP_PX);
      }
    };
    measureDesktopSlide();
    window.addEventListener('resize', measureDesktopSlide);
    const timer = setTimeout(measureDesktopSlide, 100);
    return () => {
      window.removeEventListener('resize', measureDesktopSlide);
      clearTimeout(timer);
    };
  }, []);

  const maxIndex = Math.max(0, communities.length - cardsPerView);
  const clampedIndex = Math.min(currentIndex, maxIndex);
  const displayIndex = currentIndex % communities.length;

  const next = () => setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
  const prev = () => setCurrentIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));

  const Card = ({ community, isMobile = false, onDetailsClick }: { community: (typeof communities)[0]; isMobile?: boolean; onDetailsClick?: () => void }) => (
    <div
      className={`flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 ${
        isMobile ? 'w-full' : 'w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]'
      }`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-4 md:p-5">
        {community.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {community.tags.map((tag) => (
              <span
                key={tag}
                className={
                  tag.includes('2030') || tag.includes('Tatweer') || tag === 'IL Monte Galala'
                    ? 'text-xs font-semibold px-2 py-1 rounded-full bg-orange-100 text-tatweer-orange uppercase tracking-wide'
                    : 'text-xs text-gray-500 uppercase tracking-wide'
                }
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
          {community.name}
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3">
          {community.description}
        </p>
        <button
          onClick={onDetailsClick}
          className="w-full mt-4 py-3 px-4 bg-tatweer-orange text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
        >
          احصل على مزيد من التفاصيل
        </button>
        <div className="mt-4 pt-4 border-t border-gray-200" />
      </div>
    </div>
  );

  return (
    <section id="project-zones" className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Project Zones
            </h2>
            <p className="text-gray-600">اكتشف مناطق مشروع IL Monte Galala - Marina Towers</p>
          </div>
          <motion.button
            onClick={scrollToForm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-tatweer-orange text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-md whitespace-nowrap"
          >
            استكشف المناطق ←
          </motion.button>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors border border-gray-200"
            aria-label="السابق"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors border border-gray-200"
            aria-label="التالي"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Mobile: single card with swipe */}
          <div className="lg:hidden overflow-hidden">
            <div className="flex items-center justify-center gap-2 mb-3 pb-2 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span className="text-sm">اسحب للتنقل</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={displayIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -500) next();
                  else if (swipe > 500) prev();
                }}
                className="cursor-grab active:cursor-grabbing touch-none"
              >
                <div className="px-2">
                  <Card community={communities[displayIndex]} isMobile onDetailsClick={scrollToForm} />
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  {communities.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === displayIndex ? 'w-6 bg-tatweer-orange' : 'w-2 bg-gray-300'
                      }`}
                      aria-label={`الانتقال إلى ${i + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tablet/Desktop: multiple cards */}
          <div className="hidden lg:block overflow-hidden px-14">
            <motion.div
              className="flex gap-6"
              animate={{
                x: (isRtl ? 1 : -1) * clampedIndex * desktopSlideStep,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {communities.map((community, index) => (
                <div
                  key={community.id}
                  ref={index === 0 ? desktopCardRef : undefined}
                  className="flex-shrink-0 w-[352px] lg:w-[370px]"
                >
                  <Card community={community} onDetailsClick={scrollToForm} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitiesCarousel;
