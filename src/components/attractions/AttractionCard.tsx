import { motion } from 'framer-motion';
import { Attraction } from '../../types';
import { ArrowRight } from 'lucide-react';

interface AttractionCardProps {
  attraction: Attraction;
  isActive?: boolean;
}

const AttractionCard = ({ attraction, isActive = false }: AttractionCardProps) => {
  return (
    <motion.div
      whileHover={isActive ? { y: -12 } : {}}
      transition={{ duration: 0.3 }}
      className="relative w-full h-full min-h-[400px] overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 cursor-pointer group"
    >
      <div className="absolute inset-0">
        <img
          src={attraction.heroImage}
          alt={attraction.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
        <div className="flex flex-wrap gap-3 mb-4">
          {attraction.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-sm bg-white/20 backdrop-blur-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
          {attraction.name}
        </h3>
        
        <p className="text-white/80 text-lg md:text-xl line-clamp-2 mb-6 max-w-3xl">
          {attraction.tagline}
        </p>
        
        <div className="flex items-center text-white/60 text-base md:text-lg group-hover:text-white transition-colors">
          <span>点击查看详情</span>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export default AttractionCard;
