import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, Filter, X } from 'lucide-react';
import { Attraction, AttractionCategory } from '../../types';
import { MapPin, Eye, ArrowRight } from 'lucide-react';

interface InteractiveMapProps {
  attractions: Attraction[];
  onAttractionClick: (id: string) => void;
}

const InteractiveMap = ({ attractions, onAttractionClick }: InteractiveMapProps) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [filter, setFilter] = useState<AttractionCategory | 'all'>('all');
  const mapRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });

  const filteredAttractions = filter === 'all' 
    ? attractions 
    : attractions.filter(a => a.category === filter);

  const handleZoom = (delta: number) => {
    setScale(prev => Math.min(Math.max(prev + delta, 0.5), 3));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const categories: { value: AttractionCategory | 'all'; label: string }[] = [
    { value: 'all', label: '全部' },
    { value: 'building', label: '建筑' },
    { value: 'garden', label: '园林' },
    { value: 'water', label: '水景' },
  ];

  return (
    <div className="relative w-full h-[600px] bg-paper rounded-2xl overflow-hidden shadow-card">
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => handleZoom(0.2)}
          className="w-10 h-10 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors flex items-center justify-center"
        >
          <ZoomIn className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={() => handleZoom(-0.2)}
          className="w-10 h-10 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors flex items-center justify-center"
        >
          <ZoomOut className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white rounded-lg shadow-md p-2 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                filter === cat.value
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={mapRef}
        className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        <motion.div
          className="relative w-full h-full"
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transformOrigin: 'center center',
          }}
        >
          <div 
            className="absolute inset-0 bg-gradient-to-br from-garden/20 to-lake/20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232D5A3D' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[800px] h-[500px] bg-gradient-to-br from-garden/30 to-lake/30 rounded-3xl border-4 border-garden/30 relative">
              <div className="absolute inset-4 border-2 border-dashed border-garden/20 rounded-2xl" />
              
              <div className="absolute top-8 left-8 text-2xl font-serif font-bold text-garden/40">
                颐和园
              </div>
              
              {filteredAttractions.map((attr) => (
                <motion.button
                  key={attr.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                  style={{
                    left: `${attr.coordinates.x}%`,
                    top: `${attr.coordinates.y}%`,
                  }}
                  onClick={() => setSelectedAttraction(attr)}
                >
                  <div className="relative">
                    <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping" />
                    <div className="relative w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedAttraction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-2xl shadow-xl overflow-hidden z-20"
          >
            <button
              onClick={() => setSelectedAttraction(null)}
              className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            
            <div className="relative h-48">
              <img
                src={selectedAttraction.heroImage}
                alt={selectedAttraction.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-2xl font-serif font-bold text-white">
                {selectedAttraction.name}
              </h3>
            </div>
            
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {selectedAttraction.tagline}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedAttraction.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => {
                  onAttractionClick(selectedAttraction.id);
                  setSelectedAttraction(null);
                }}
                className="w-full btn-primary flex items-center justify-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                查看详情
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveMap;
