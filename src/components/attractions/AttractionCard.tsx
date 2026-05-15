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
      whileHover={isActive ? { y: -8 } : {}}
      transition={{ duration: 0.3 }}
      className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 cursor-pointer group"
    >
      <div className="absolute inset-0">
        <img
          src={attraction.heroImage}
          alt={attraction.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex flex-wrap gap-2 mb-2">
          {attraction.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-white/20 backdrop-blur-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-2xl font-serif font-bold mb-2">
          {attraction.name}
        </h3>
        
        <p className="text-white/80 text-sm line-clamp-2 mb-3">
          {attraction.tagline}
        </p>
        
        <div className="flex items-center text-white/60 text-sm group-hover:text-white transition-colors">
          <span>查看详情</span>
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export default AttractionCard;
