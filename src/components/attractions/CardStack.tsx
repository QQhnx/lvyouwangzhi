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
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

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
        y: Math.min(offset * 12, 84),
        rotate: offset * 2,
        scale: 1 - offset * 0.03,
        zIndex: attractions.length - offset,
        opacity: 1 - offset * 0.1,
      };
    }
    
    return {
      x: 0,
      y: Math.max(offset * 12, -84),
      rotate: offset * 2,
      scale: 1 - Math.abs(offset) * 0.03,
      zIndex: attractions.length - Math.abs(offset),
      opacity: 1 - Math.abs(offset) * 0.1,
    };
  }, [attractions.length]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (isAnimating.current) return;
    e.preventDefault();
    
    if (e.deltaY > 0 && currentIndex < attractions.length - 1) {
      setDirection('next');
      isAnimating.current = true;
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        isAnimating.current = false;
      }, 300);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setDirection('prev');
      isAnimating.current = true;
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        isAnimating.current = false;
      }, 300);
    }
  }, [currentIndex, attractions.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isAnimating.current) return;
    
    if (e.key === 'ArrowDown' && currentIndex < attractions.length - 1) {
      setDirection('next');
      isAnimating.current = true;
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        isAnimating.current = false;
      }, 300);
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
      setDirection('prev');
      isAnimating.current = true;
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        isAnimating.current = false;
      }, 300);
    }
  }, [currentIndex, attractions.length]);

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
    };
  }, [handleWheel, handleKeyDown]);

  const handleCardClick = (index: number) => {
    if (index === currentIndex) {
      onCardClick(attractions[index].id);
    } else if (!isAnimating.current) {
      setDirection(index > currentIndex ? 'next' : 'prev');
      isAnimating.current = true;
      setTimeout(() => {
        setCurrentIndex(index);
        isAnimating.current = false;
      }, 300);
    }
  };

  return (
    <div className="py-20 bg-paper">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            探秘八大景点
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            滚轮滑动或点击卡片，探索颐和园最具代表性的八大景点
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative w-full max-w-4xl h-[520px] mx-auto perspective-[1000px] overflow-hidden cursor-grab active:cursor-grabbing"
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
                      ? -400 
                      : direction === 'prev' && index > currentIndex 
                        ? 400 
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
                    x: direction === 'next' ? 400 : -400,
                    rotate: direction === 'next' ? 15 : -15,
                    opacity: 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="absolute w-full px-4"
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
        </div>
      </div>
    </div>
  );
};

export default CardStack;
