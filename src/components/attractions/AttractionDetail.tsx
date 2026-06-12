import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Ruler, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAttractionStore } from '../../store/attractionStore';
import Button from '../common/Button';
import { getImageUrl } from '../../utils/helpers';

const AttractionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const attractions = useAttractionStore(state => state.attractions);
  const { setCurrentAttraction } = useAttractionStore();

  const attraction = attractions.find(a => a.id === id);

  useEffect(() => {
    if (attraction) {
      setCurrentAttraction(attraction.id);
    }
  }, [attraction, setCurrentAttraction]);

  if (!attraction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <p className="text-gray-600">景点未找到</p>
      </div>
    );
  }

  const relatedAttractions = attraction.relatedIds
    .map(relatedId => attractions.find(a => a.id === relatedId))
    .filter(Boolean);

  const bgImage = (img: string) => ({
    backgroundImage: `url(${getImageUrl(img)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  });

  return (
    <div className="min-h-screen bg-black">
      {/* ===== Section 1: Hero 视差 ===== */}
      <section
        className="relative min-h-screen flex items-end parallax-bg"
        style={bgImage(attraction.heroImage)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        <div className="relative z-10 w-full pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Button
                variant="secondary"
                onClick={() => navigate('/')}
                className="mb-8 bg-white/10 backdrop-blur-md border-gold/50 text-gold hover:bg-gold hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回首页
              </Button>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-gold mb-6">
                {attraction.name}
              </h1>
              <div className="flex flex-wrap gap-2 mb-6">
                {attraction.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 text-sm bg-gold/20 backdrop-blur-sm rounded-full text-gold border border-gold/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-2xl text-white/80 max-w-2xl font-serif">
                {attraction.tagline}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Section 2: 画廊 全屏滚动 ===== */}
      <section className="relative bg-black">
        {attraction.gallery.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8 }}
            className="min-h-screen flex items-center justify-center relative"
            style={{
              ...bgImage(image),
              backgroundAttachment: 'scroll',
            }}
          >
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 text-center">
              <Camera className="w-8 h-8 text-gold/60 mx-auto mb-4" />
              <p className="text-white/70 font-serif tracking-wider">
                图 {index + 1} / {attraction.gallery.length}
              </p>
            </div>

            {index > 0 && (
              <button
                onClick={() => {
                  const prev = document.querySelector(`[data-gallery="${index - 1}"]`);
                  prev?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-gold hover:bg-gold/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            {index < attraction.gallery.length - 1 && (
              <button
                onClick={() => {
                  const next = document.querySelector(`[data-gallery="${index + 1}"]`);
                  next?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-gold hover:bg-gold/30 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
            <div data-gallery={index} className="absolute bottom-0 h-1" />
          </motion.div>
        ))}
      </section>

      {/* ===== Section 3: 建筑档案 视差 ===== */}
      <section
        className="relative min-h-screen flex items-center parallax-bg"
        style={bgImage(attraction.gallery[attraction.gallery.length - 1] || attraction.heroImage)}
      >
        <div className="absolute inset-0 bg-purple/85 backdrop-blur-[2px]" />
        <div className="relative z-10 w-full py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-16">
                <div className="divider-ornament mb-6">
                  <span className="text-gold/60 text-sm tracking-widest">ARCHIVES</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gold mb-4 flex items-center justify-center">
                  <MapPin className="w-8 h-8 mr-3" />
                  建筑档案
                </h2>
              </div>

              <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-gold/20 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  {attraction.archives.height && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                        <Ruler className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <p className="text-gold/60 text-sm">高度</p>
                        <p className="text-white font-serif text-xl">{attraction.archives.height}</p>
                      </div>
                    </div>
                  )}
                  {attraction.archives.area && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <p className="text-gold/60 text-sm">规模</p>
                        <p className="text-white font-serif text-xl">{attraction.archives.area}</p>
                      </div>
                    </div>
                  )}
                  {attraction.archives.builtYear && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <p className="text-gold/60 text-sm">
                          {attraction.archives.rebuiltYear ? '初建时间' : '建造时间'}
                        </p>
                        <p className="text-white font-serif text-xl">{attraction.archives.builtYear}</p>
                      </div>
                    </div>
                  )}
                  {attraction.archives.rebuiltYear && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <p className="text-gold/60 text-sm">重建时间</p>
                        <p className="text-white font-serif text-xl">{attraction.archives.rebuiltYear}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-gold font-serif text-lg mb-4">主要特征</h3>
                  <div className="flex flex-wrap gap-3">
                    {attraction.archives.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gold/15 text-gold rounded-full text-sm border border-gold/30 font-serif"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Section 4: 文化介绍 视差 + 侧导航 ===== */}
      <section
        className="relative min-h-screen flex items-center parallax-bg"
        style={bgImage(attraction.gallery[0] || attraction.heroImage)}
      >
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 w-full py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-16">
                <div className="divider-ornament mb-6">
                  <span className="text-gold/60 text-sm tracking-widest">CULTURE</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gold mb-4 flex items-center justify-center">
                  <Camera className="w-8 h-8 mr-3" />
                  文化介绍
                </h2>
              </div>

              <div className="relative">
                {/* 左侧导航卡片 */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-30"
                >
                  <div className="bg-black/30 backdrop-blur-md rounded-lg p-4 w-48 border border-gold/20">
                    <p className="text-gold/60 text-sm tracking-widest mb-4">快速导航</p>
                    <a href="#culture-history" className="block text-gold/70 hover:text-gold text-base py-2 transition-colors">
                      历史背景
                    </a>
                    <a href="#culture-architecture" className="block text-gold/70 hover:text-gold text-base py-2 transition-colors">
                      建筑特色
                    </a>
                    <a href="#culture-significance" className="block text-gold/70 hover:text-gold text-base py-2 transition-colors">
                      文化意义
                    </a>
                  </div>
                </motion.div>

                {/* 右侧导航卡片 */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-30"
                >
                  <div className="bg-black/30 backdrop-blur-md rounded-lg p-4 w-48 border border-gold/20">
                    <p className="text-gold/60 text-sm tracking-widest mb-4">相关景点</p>
                    {relatedAttractions.map((related) => (
                      related && (
                        <button
                          key={related.id}
                          onClick={() => navigate(`/attraction/${related.id}`)}
                          className="block text-gold/70 hover:text-gold text-base py-2 transition-colors text-left w-full"
                        >
                          {related.name}
                        </button>
                      )
                    ))}
                    {relatedAttractions.length === 0 && (
                      <p className="text-gold/40 text-base">暂无</p>
                    )}
                  </div>
                </motion.div>

                {/* 文化内容卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" id="culture-content">
                  <motion.div
                    id="culture-history"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-gold/20 hover:border-gold/40 transition-all duration-300"
                  >
                    <h3 className="text-xl font-serif font-bold text-gold mb-4">历史背景</h3>
                    <p className="text-white/80 leading-relaxed font-serif">
                      {attraction.cultureContent.history}
                    </p>
                  </motion.div>

                  <motion.div
                    id="culture-architecture"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-gold/20 hover:border-gold/40 transition-all duration-300"
                  >
                    <h3 className="text-xl font-serif font-bold text-gold mb-4">建筑特色</h3>
                    <p className="text-white/80 leading-relaxed font-serif">
                      {attraction.cultureContent.architecture}
                    </p>
                  </motion.div>

                  <motion.div
                    id="culture-significance"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-gold/20 hover:border-gold/40 transition-all duration-300"
                  >
                    <h3 className="text-xl font-serif font-bold text-gold mb-4">文化意义</h3>
                    <p className="text-white/80 leading-relaxed font-serif">
                      {attraction.cultureContent.significance}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* 相关推荐底部 */}
              {relatedAttractions.length > 0 && (
                <div className="mt-20 text-center">
                  <p className="text-gold/40 text-sm tracking-widest mb-8">RELATED</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {relatedAttractions.map((related) => (
                      related && (
                        <button
                          key={related.id}
                          onClick={() => navigate(`/attraction/${related.id}`)}
                          className="px-6 py-3 bg-gold/10 border border-gold/30 rounded-full text-gold 
                                   hover:bg-gold hover:text-primary transition-all duration-300 font-serif"
                        >
                          {related.name}
                        </button>
                      )
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AttractionDetail;
