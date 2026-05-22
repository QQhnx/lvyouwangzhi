import { motion } from 'framer-motion';
import { Season } from '../../types';
import { Camera, Clock, Sun } from 'lucide-react';

interface SeasonTabsProps {
  seasons: Season[];
  currentSeason: Season;
  onSeasonChange: (seasonId: Season['id']) => void;
}

const SeasonTabs = ({ seasons, currentSeason, onSeasonChange }: SeasonTabsProps) => {
  return (
    <section id="seasons" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            四季颐和园
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            春花秋月，夏荷冬雪，每个季节都有独特的美
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {seasons.map((season) => (
            <button
              key={season.id}
              onClick={() => onSeasonChange(season.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                currentSeason.id === season.id
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg">{season.name}</span>
              <span className="ml-2 text-sm opacity-70">{season.nameEn}</span>
            </button>
          ))}
        </div>

        <motion.div
          key={currentSeason.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                {currentSeason.name}季特色
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {currentSeason.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  <span className="text-sm">
                    最佳时间：{currentSeason.bestTime}
                  </span>
                </div>
              </div>
              
              <div className="bg-paper rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Camera className="w-5 h-5 mr-2 text-primary" />
                  <h4 className="font-semibold text-gray-800">摄影攻略</h4>
                </div>
                <ul className="space-y-2">
                  {currentSeason.photographyTips.map((tip, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {currentSeason.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative rounded-xl overflow-hidden group cursor-pointer"
                >
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h4 className="font-semibold mb-1">{highlight.title}</h4>
                    <p className="text-sm text-white/80">{highlight.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SeasonTabs;
