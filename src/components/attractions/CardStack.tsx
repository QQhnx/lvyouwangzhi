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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const lockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const boundaryScrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastWheelTime = useRef(0);
  const wheelThreshold = 50; // 毫秒内只处理一次滚轮

  const visibleCardRange = 3;

  const getCardTransform = useCallback((index: number, current: number) => {
    const offset = index - current;
    
    if (Math.abs(offset) > visibleCardRange) {
      return {
        x: 0,
        y: offset > 0 ? 200 : -200,
        rotate: offset * 2.5,
        scale: 0.85,
        zIndex: 0,
        opacity: 0,
        display: 'none' as const,
      };
    }
    
    if (offset === 0) {
      return { 
        x: 0, 
        y: 0, 
        rotate: 0, 
        scale: 1,
        zIndex: attractions.length,
        opacity: 1,
        display: 'block' as const,
      };
    }
    
    const absOffset = Math.abs(offset);
    const scale = 1 - absOffset * 0.04;
    const opacity = 1 - absOffset * 0.15;
    
    if (offset > 0) {
      return {
        x: 0,
        y: Math.min(offset * 30, 120),
        rotate: offset * 1.5,
        scale: Math.max(scale, 0.88),
        zIndex: attractions.length - offset,
        opacity: Math.max(opacity, 0),
        display: 'block' as const,
      };
    }
    
    return {
      x: 0,
      y: Math.max(offset * 30, -120),
      rotate: offset * 1.5,
      scale: Math.max(scale, 0.88),
      zIndex: attractions.length - absOffset,
      opacity: Math.max(opacity, 0),
      display: 'block' as const,
    };
  }, [attractions.length]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isFullscreen) {
      return;
    }
    
    // 检查鼠标是否在边缘区域（上下各 80px）
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const edgeMargin = 80;
    const isTopEdge = mouseY < edgeMargin;
    const isBottomEdge = mouseY > rect.height - edgeMargin;
    
    // 检查卡片是否完全显示（从顶部到底部都在视口中）
    const isCardBottomAligned = rect.bottom <= window.innerHeight + 1;
    
    // 优先级：卡片边缘滑动功能 > 卡片底部锁定
    if (isTopEdge || isBottomEdge) {
      return;
    }
    
    const deltaY = e.deltaY;
    
    // 移除卡片底部锁定功能，避免卡片没有完全显示就锁定网页滑动
    // 直接阻止默认滚动，正常处理翻页
    e.preventDefault();
    
    if (isAnimating.current) return;
    
    const now = Date.now();
    // 节流：防止快速滑动时多次触发
    if (now - lastWheelTime.current < wheelThreshold) {
      return;
    }
    
    if (deltaY > 30 && currentIndex < attractions.length - 1) {
      lastWheelTime.current = now;
      if (boundaryScrollTimeout.current) {
        clearTimeout(boundaryScrollTimeout.current);
        boundaryScrollTimeout.current = null;
      }
      
      setDirection('next');
      isAnimating.current = true;
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
      lockTimeoutRef.current = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        isAnimating.current = false;
      }, 300);
      
    } else if (deltaY < -30 && currentIndex > 0) {
      lastWheelTime.current = now;
      if (boundaryScrollTimeout.current) {
        clearTimeout(boundaryScrollTimeout.current);
        boundaryScrollTimeout.current = null;
      }
      
      setDirection('prev');
      isAnimating.current = true;
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
      lockTimeoutRef.current = setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        isAnimating.current = false;
      }, 300);
      
    } else if (deltaY > 50 && currentIndex === attractions.length - 1) {
      lastWheelTime.current = now;
      if (boundaryScrollTimeout.current) {
        clearTimeout(boundaryScrollTimeout.current);
      }
      
      boundaryScrollTimeout.current = setTimeout(() => {
        const nextSection = document.getElementById('seasons');
        if (nextSection) {
          setIsFullscreen(false);
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400);
      
    } else if (deltaY < -50 && currentIndex === 0) {
      lastWheelTime.current = now;
      if (boundaryScrollTimeout.current) {
        clearTimeout(boundaryScrollTimeout.current);
      }
      
      boundaryScrollTimeout.current = setTimeout(() => {
        const prevSection = document.getElementById('hero');
        if (prevSection) {
          setIsFullscreen(false);
          prevSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400);
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
      }, 300);
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
      setDirection('prev');
      isAnimating.current = true;
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        isAnimating.current = false;
      }, 300);
    } else if (e.key === 'Escape' || e.key === 'Enter') {
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
      }, 300);
    }
  };

  return (
    <div 
      ref={sectionRef}
      className="h-screen flex flex-col relative"
      style={{
        background: 'linear-gradient(180deg, #F7F4EC 0%, #EDE8DD 100%)'
      }}
    >
      <div
        ref={containerRef}
        className={`relative w-full flex-grow perspective-[1000px] overflow-hidden ${
          isFullscreen ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
      >
        <AnimatePresence mode="popLayout">
          {attractions.map((attraction, index) => {
            const transform = getCardTransform(index, currentIndex);
            
            if (transform.display === 'none') {
              return null;
            }
            
            const isLeaving = direction === 'next' 
              ? index < currentIndex 
              : direction === 'prev' 
                ? index > currentIndex 
                : false;
            
            return (
              <motion.div
                key={attraction.id}
                initial={{ opacity: 0, scale: 0.85, y: transform.y }}
                animate={{
                  x: isLeaving 
                    ? (direction === 'next' ? -600 : 600) 
                    : transform.x,
                  y: transform.y,
                  rotate: isLeaving 
                    ? (direction === 'next' ? -20 : 20) 
                    : transform.rotate,
                  scale: transform.scale,
                  opacity: isLeaving ? 0 : transform.opacity,
                  zIndex: transform.zIndex,
                }}
                exit={{
                  x: direction === 'next' ? 600 : -600,
                  rotate: direction === 'next' ? 20 : -20,
                  opacity: 0,
                  scale: 0.8,
                }}
                transition={{
                  type: 'tween',
                  duration: 0.3,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{
                  willChange: 'transform, opacity',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
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
      </div>
    </div>
  );
};

export default CardStack;
