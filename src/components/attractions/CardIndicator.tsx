import { motion } from 'framer-motion';

interface CardIndicatorProps {
  current: number;
  total: number;
  onSelect?: (index: number) => void;
}

const CardIndicator = ({ current, total, onSelect }: CardIndicatorProps) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-20">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect?.(index)}
          className="relative"
        >
          <motion.div
            animate={{
              width: index === current ? 24 : 8,
              backgroundColor: index <= current ? '#8B1A1A' : 'rgba(139, 26, 26, 0.3)',
            }}
            className="h-2 rounded-full"
          />
        </button>
      ))}
    </div>
  );
};

export default CardIndicator;
