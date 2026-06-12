import { motion } from 'framer-motion';
import { Season } from '../../types';
import { Camera, Clock, Sun, Cloud, Leaf, Snowflake } from 'lucide-react';
import { getImageUrl } from '../../utils/helpers';

interface SeasonTabsProps {
  seasons: Season[];
  currentSeason: Season;
  onSeasonChange: (seasonId: Season['id']) => void;
}

const SeasonTabs = ({ seasons, currentSeason, onSeasonChange }: SeasonTabsProps) => {
  const seasonIcons: Record<string, React.ReactNode> = {
    spring: <Leaf className="w-5 h-5" />,
    summer: <Sun className="w-5 h-5" />,
    autumn: <Cloud className="w-5 h-5" />,
    winter: <Snowflake className="w-5 h-5" />,
  };

  return (
    <section id="seasons" className="py-24 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            四季颐和园
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            春花秋月，夏荷冬雪，每个季节都有独特的美
          </p>
        </motion.div>

        <div className="flex justify-center gap-0 mb-16 border-b border-gray-200">
          {seasons.map((season) => (
            <button
              key={season.id}
              onClick={() => onSeasonChange(season.id)}
              className={`flex flex-col items-center gap-1 px-10 py-4 relative transition-all duration-300 ${
                currentSeason.id === season.id
                  ? 'text-primary font-semibold'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {seasonIcons[season.id]}
              <span className="text-lg">{season.name}</span>
              <span className="text-sm opacity-70">{season.nameEn}</span>
              {currentSeason.id === season.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-accent" />
              )}
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
            <div className="rounded-xl overflow-hidden order-1">
              <img
                src={getImageUrl(currentSeason.highlights[0].image)}
                alt={currentSeason.highlights[0].title}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>

            <div>
              <span className="text-xs tracking-[0.2em] text-accent uppercase mb-2 block">
                {currentSeason.nameEn}
              </span>
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                {currentSeason.name}季特色
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {currentSeason.description}
              </p>
              
              <span className="inline-flex items-center gap-1.5 text-xs text-accent mt-3">
                <Clock className="w-3.5 h-3.5" />
                最佳时间：{currentSeason.bestTime}
              </span>
              
              <div className="bg-[#F3EFE6] rounded-lg p-4 border-l-4 border-accent mt-6">
                <div className="flex items-center mb-3">
                  <Camera className="w-5 h-5 mr-2 text-accent" />
                  <h4 className="font-semibold text-gray-800">摄影攻略</h4>
                </div>
                <ul className="space-y-2">
                  {currentSeason.photographyTips.map((tip, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 mr-2 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SeasonTabs;
