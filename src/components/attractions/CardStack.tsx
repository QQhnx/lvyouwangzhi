import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Attraction } from '../../types';
import AttractionCard from './AttractionCard';
import CardIndicator from './CardIndicator';

interface CardStackProps {
  attractions: Attraction[];
  onCardClick: (id: string) => void;
}

const CardStack = ({ attractions, onCardClick }: CardStackProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'prev' | 'next' | null>(null);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const lockTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const boundaryScrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const getCardTransform = useCallback((index: number, current: number) => {
    const offset = index - current;
    
    if (offset === 0) {
      return { 
        x: 0, 
        y: 0, 
        rotate: 0, 
        scale: 1,
        zIndex: attractions.length,
        opacity: 1,
      };
    }
    
    if (offset > 0) {
      return {
        x: 0,
        y: Math.min(offset * 18, 120),
        rotate: offset * 2.5,
        scale: 1 - offset * 0.03,
        zIndex: attractions.length - offset,
        opacity: 1 - offset * 0.12,
      };
    }
    
    return {
      x: 0,
      y: Math.max(offset * 18, -120),
      rotate: offset * 2.5,
      scale: 1 - Math.abs(offset) * 0.03,
      zIndex: attractions.length - Math.abs(offset),
      opacity: 1 - Math.abs(offset) * 0.12,
    };
  }, [attractions.length]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isFullscreen) {
      return;
    }
    
    e.preventDefault();
    
    if (isAnimating.current) return;
    
    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;
    
    if (scrollingDown && currentIndex < attractions.length - 1) {
      if (boundaryScrollTimeout.current) {
        clearTimeout(boundaryScrollTimeout.current);
        boundaryScrollTimeout.current = null;
      }
      
      setDirection('next');
      setIsScrollLocked(true);
      isAnimating.current = true;
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
      lockTimeoutRef.current = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        isAnimating.current = false;
      }, 400);
      
    } else if (scrollingUp && currentIndex > 0) {
      if (boundaryScrollTimeout.current) {
        clearTimeout(boundaryScrollTimeout.current);
        boundaryScrollTimeout.current = null;
      }
      
      setDirection('prev');
      setIsScrollLocked(true);
      isAnimating.current = true;
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
      lockTimeoutRef.current = setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        isAnimating.current = false;
      }, 400);
      
    } else if (scrollingDown && currentIndex === attractions.length - 1) {
      if (boundaryScrollTimeout.current) {
        clearTimeout(boundaryScrollTimeout.current);
      }
      
      setIsScrollLocked(false);
      boundaryScrollTimeout.current = setTimeout(() => {
        const nextSection = document.getElementById('seasons');
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 800);
      
    } else if (scrollingUp && currentIndex === 0) {
      if (boundaryScrollTimeout.current) {
        clearTimeout(boundaryScrollTimeout.current);
      }
      
      setIsScrollLocked(false);
      boundaryScrollTimeout.current = setTimeout(() => {
        const prevSection = document.getElementById('hero');
        if (prevSection) {
          prevSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 800);
    }
  }, [isFullscreen, currentIndex, attractions.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isFullscreen) return;
    if (isAnimating.current) return;
    
    if (e.key === 'ArrowDown' && currentIndex < attractions.length - 1) {
      setDirection('next');
      isAnimating.current = true;
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        isAnimating.current = false;
      }, 400);
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
      setDirection('prev');
      isAnimating.current = true;
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        isAnimating.current = false;
      }, 400);
    } else if (e.key === 'Escape' || e.key === 'Enter') {
      setIsScrollLocked(false);
      const nextSection = document.getElementById('seasons');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [isFullscreen, currentIndex, attractions.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      window.removeEventListener('keydown', handleKeyDown);
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
      if (boundaryScrollTimeout.current) clearTimeout(boundaryScrollTimeout.current);
    };
  }, [handleWheel, handleKeyDown]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;
          const ratio = entry.intersectionRatio;
          
          setIsFullscreen(isVisible && ratio >= 0.8);
        });
      },
      {
        threshold: [0.1, 0.5, 0.8, 1.0],
        rootMargin: '-50px',
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleCardClick = (index: number) => {
    if (index === currentIndex) {
      onCardClick(attractions[index].id);
    } else if (!isAnimating.current) {
      setDirection(index > currentIndex ? 'next' : 'prev');
      isAnimating.current = true;
      setTimeout(() => {
        setCurrentIndex(index);
        isAnimating.current = false;
      }, 400);
    }
  };

  const handleSkip = () => {
    setIsScrollLocked(false);
    const nextSection = document.getElementById('seasons');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={sectionRef}
      className="h-screen bg-paper flex flex-col relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-2 px-4 pt-4 flex-shrink-0"
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
          探索八大秘境
        </h2>
      </motion.div>

      <div
        ref={containerRef}
        className={`relative w-full flex-grow perspective-[1000px] overflow-hidden ${
          isFullscreen ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
      >
        <AnimatePresence mode="popLayout">
          {attractions.map((attraction, index) => {
            const transform = getCardTransform(index, currentIndex);
            
            return (
              <motion.div
                key={attraction.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: direction === 'next' && index < currentIndex 
                    ? -500 
                    : direction === 'prev' && index > currentIndex 
                      ? 500 
                      : transform.x,
                  y: transform.y,
                  rotate: direction === 'next' && index < currentIndex 
                    ? -15 
                    : direction === 'prev' && index > currentIndex 
                      ? 15 
                      : transform.rotate,
                  scale: transform.scale,
                  opacity: direction === 'next' && index < currentIndex 
                    ? 0 
                    : direction === 'prev' && index > currentIndex 
                      ? 0 
                      : transform.opacity,
                  zIndex: transform.zIndex,
                }}
                exit={{
                  x: direction === 'next' ? 500 : -500,
                  rotate: direction === 'next' ? 15 : -15,
                  opacity: 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 250,
                  damping: 25,
                }}
                className="absolute inset-0"
                onClick={() => handleCardClick(index)}
              >
                <AttractionCard 
                  attraction={attraction} 
                  isActive={index === currentIndex}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        <CardIndicator 
          current={currentIndex} 
          total={attractions.length} 
          onSelect={handleCardClick}
        />
        
        {currentIndex === attractions.length - 1 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-8 right-8 px-6 py-3 bg-white/90 backdrop-blur-sm text-primary rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            onClick={handleSkip}
          >
            <span>跳过查看</span>
            <span className="text-sm opacity-60">↓</span>
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default CardStack;
