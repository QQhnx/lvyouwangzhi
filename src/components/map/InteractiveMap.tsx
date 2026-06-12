import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Attraction, AttractionCategory } from '../../types';
import { getImageUrl } from '../../utils/helpers';

interface InteractiveMapProps {
  attractions: Attraction[];
  onAttractionClick: (id: string) => void;
}

/* ── 分类配置 ── */
const catColors: Record<AttractionCategory, { fill: string; ring: string; bg: string }> = {
  building: { fill: '#2D6A4F', ring: '#40916C', bg: '#D8F3DC' },
  garden:  { fill: '#B8860B', ring: '#D4A72C', bg: '#FFF3CD' },
  water:   { fill: '#1B6B93', ring: '#3A8FBF', bg: '#D0EFFF' },
  culture: { fill: '#7B4B2A', ring: '#A6734A', bg: '#F5E6D3' },
};

/* ── 景点专用标记图标 SVG ── */
const MarkerIcon = ({ type, color }: { type: AttractionCategory; color: string }) => {
  switch (type) {
    case 'building':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M4 22V12h4v10H4z" fill={color} opacity="0.3"/>
          <path d="M9 22V8h6v14H9z" fill={color} opacity="0.25"/>
          <path d="M16 22V12h4v10h-4z" fill={color} opacity="0.3"/>
          <path d="M9 8h6v3H9z" fill={color} opacity="0.5"/>
          <path d="M10 5h4v3h-4z" fill={color}/>
          <path d="M11 2h2v3h-2z" fill={color}/>
        </svg>
      );
    case 'garden':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="14" r="3" fill={color} opacity="0.25"/>
          <circle cx="9" cy="11" r="2" fill={color} opacity="0.3"/>
          <circle cx="15" cy="11" r="2" fill={color} opacity="0.3"/>
          <circle cx="12" cy="9" r="1.5" fill={color} opacity="0.35"/>
          <rect x="11" y="17" width="2" height="5" rx="0.5" fill={color}/>
          <path d="M9 21 L11 17 L13 17 L15 21" fill={color} opacity="0.3"/>
        </svg>
      );
    case 'water':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 12 Q6 9 9 12 Q12 15 15 12 Q18 9 21 12" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6"/>
          <path d="M3 15 Q6 12 9 15 Q12 18 15 15 Q18 12 21 15" stroke={color} strokeWidth="1.5" fill="none" opacity="0.45"/>
          <path d="M3 18 Q6 15 9 18 Q12 21 15 18 Q18 15 21 18" stroke={color} strokeWidth="1.5" fill="none" opacity="0.3"/>
          <path d="M10 6 Q12 4 14 6 L13 8 Q12 7 11 8z" fill={color} opacity="0.5"/>
        </svg>
      );
    case 'culture':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="5" y="4" width="14" height="16" rx="1" fill={color} opacity="0.2"/>
          <rect x="5" y="4" width="14" height="3" rx="1" fill={color} opacity="0.4"/>
          <line x1="5" y1="9" x2="19" y2="9" stroke={color} strokeWidth="0.8" opacity="0.3"/>
          <line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="0.8" opacity="0.3"/>
          <line x1="5" y1="15" x2="16" y2="15" stroke={color} strokeWidth="0.8" opacity="0.3"/>
        </svg>
      );
  }
};

/* ── 颐和园俯视图底图 ── */
const SummerPalaceMap = () => (
  <img
    src={getImageUrl('/map-aerial.png')}
    alt="颐和园俯视图"
    className="w-full h-full object-contain"
  />
);

const InteractiveMap = ({ attractions, onAttractionClick }: InteractiveMapProps) => {
  const [selectedId, setSelectedId] = useState<string>(attractions[0]?.id || '');
  const [filter, setFilter] = useState<AttractionCategory | 'all'>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = filter === 'all'
    ? attractions
    : attractions.filter(a => a.category === filter);

  const selected = attractions.find(a => a.id === selectedId) || attractions[0];
  const catInfo = catColors[selected.category];

  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
      {/* ── 顶部标题 + 筛选 ── */}
      <div className="px-8 pt-7 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-7 rounded-full" style={{ backgroundColor: '#4A1A4A' }}/>
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#1A1A1A] tracking-wide">颐和园互动地图</h1>
            <p className="text-xs text-gray-400 mt-0.5">点击标记或下方列表切换景点，查看详情</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {([
            { value: 'all', label: '全部' },
            { value: 'building', label: '标志性建筑' },
            { value: 'garden', label: '园林精品' },
            { value: 'water', label: '水景桥梁' },
          ] as const).map(cat => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === cat.value
                  ? 'text-white shadow-md'
                  : 'text-gray-500 bg-gray-50 hover:bg-gray-100 hover:text-gray-700'
              }`}
              style={filter === cat.value ? { backgroundColor: '#4A1A4A' } : {}}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── 主体：左图右图 ── */}
      <div className="flex flex-col lg:flex-row min-h-[620px]">
        {/* 左侧：景点大图 + 信息卡 */}
        <div className="lg:w-[42%] relative flex flex-col border-r border-gray-100">
          <div className="relative flex-1 min-h-[340px] lg:min-h-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <img
                  src={getImageUrl(selected.heroImage)}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                />
                {/* 底部渐变衔接白色 */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"/>
              </motion.div>
            </AnimatePresence>

            {/* 图片上的标签组 */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
              {selected.tags.slice(0, 3).map(tag => (
                <span key={tag}
                  className="px-3 py-1 text-xs bg-white/75 backdrop-blur-sm text-gray-700 rounded-full border border-white/60 shadow-sm"
                >{tag}</span>
              ))}
            </div>
          </div>

          {/* 信息卡片 */}
          <div className="bg-white px-8 pb-8 pt-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: catInfo.fill }} />
                  <span className="text-[11px] tracking-[0.15em] uppercase text-gray-400">
                    {selected.category === 'building' ? '标志性建筑' : selected.category === 'garden' ? '园林精品' : selected.category === 'water' ? '水景桥梁' : '文化殿堂'}
                  </span>
                </div>
                <h2 className="text-[28px] font-serif font-bold text-[#1A1A1A] mb-2 tracking-wide">
                  {selected.name}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                  {selected.tagline}
                </p>
              </div>
              <button
                onClick={() => onAttractionClick(selected.id)}
                className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
                           text-white transition-all duration-300 hover:shadow-lg active:scale-95"
                style={{ backgroundColor: '#6B3FA0' }}
              >
                查看详情 <ArrowRight size={16}/>
              </button>
            </div>
          </div>
        </div>

        {/* 右侧：地图区域 */}
        <div className="lg:w-[58%] relative flex flex-col" style={{ backgroundColor: '#F8F5F0' }}>
          {/* 地图画布 */}
          <div className="w-full relative m-6 rounded-2xl overflow-hidden border border-[#E8E0D2]"
            style={{ backgroundColor: '#F5F1E8', aspectRatio: '1620/1805' }}
          >
            {/* 底图 */}
            <div className="absolute inset-0">
              <SummerPalaceMap />
            </div>

            {/* 标记点 */}
            {filtered.map(attr => {
              const cfg = catColors[attr.category];
              const isActive = attr.id === selectedId;
              const isHovered = attr.id === hoveredId;
              const size = isActive ? 52 : isHovered ? 48 : 40;

              return (
                <motion.button
                  key={attr.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: isActive ? 1 : 0.75 }}
                  whileHover={{ scale: 1.12, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                  style={{
                    left: `${attr.coordinates.x}%`,
                    top: `${attr.coordinates.y}%`,
                  }}
                  onClick={() => setSelectedId(attr.id)}
                  onMouseEnter={() => setHoveredId(attr.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="relative flex flex-col items-center" style={{ width: size, height: size }}>
                    {/* 外圈 */}
                    <div
                      className="absolute inset-0 rounded-full transition-all duration-300"
                      style={{
                        border: isActive
                          ? `2.5px solid ${cfg.fill}`
                          : isHovered
                          ? `2px solid ${cfg.ring}`
                          : `1.5px solid ${cfg.fill}35`,
                        backgroundColor: isActive ? 'white' : 'transparent',
                        boxShadow: isActive
                          ? `0 0 0 4px ${cfg.fill}20, 0 4px 16px ${cfg.fill}30`
                          : isHovered
                          ? `0 2px 10px ${cfg.fill}20`
                          : 'none',
                      }}
                    />
                    {/* 内圈 */}
                    <div
                      className="absolute rounded-full transition-all duration-300"
                      style={{
                        width: size * 0.65,
                        height: size * 0.65,
                        top: size * 0.175,
                        left: size * 0.175,
                        backgroundColor: isActive ? cfg.fill : isHovered ? cfg.fill + '30' : cfg.fill + '22',
                        border: isActive || isHovered ? `1px solid ${cfg.fill}40` : 'none',
                      }}
                    />
                    {/* 图标 */}
                    <div
                      className="absolute transition-all duration-300"
                      style={{
                        width: 24,
                        height: 24,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: isActive ? 1 : 0.85,
                      }}
                    >
                      <MarkerIcon type={attr.category} color={cfg.fill}/>
                    </div>
                  </div>

                  {/* 标签 */}
                  <AnimatePresence>
                    {(isActive || isHovered) && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap"
                      >
                        <span
                          className="inline-block px-3 py-1 text-xs rounded-full font-medium shadow-sm"
                          style={{
                            backgroundColor: isActive ? cfg.fill : 'white',
                            color: isActive ? 'white' : '#333',
                            border: isActive ? 'none' : '1px solid #E5E0D8',
                          }}
                        >
                          {attr.name}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* 底部横向滚动景点列表 */}
          <div className="px-6 pb-6 flex gap-2.5 overflow-x-auto scrollbar-none">
            {attractions.map(attr => {
              const cfg = catColors[attr.category];
              const isActive = attr.id === selectedId;
              return (
                <button
                  key={attr.id}
                  onClick={() => setSelectedId(attr.id)}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? cfg.fill : 'white',
                    color: isActive ? 'white' : '#555',
                    border: isActive ? 'none' : '1px solid #E8E0D2',
                    boxShadow: isActive ? `0 2px 8px ${cfg.fill}40` : 'none',
                  }}
                >
                  <span className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: isActive ? 'white' : cfg.fill }}
                  />
                  {attr.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
