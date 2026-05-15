import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Ruler, Camera } from 'lucide-react';
import { useAttractionStore } from '../../store/attractionStore';
import Button from '../common/Button';
import { attractions } from '../../data/attractions';

const AttractionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setCurrentAttraction } = useAttractionStore();

  const attraction = attractions.find(a => a.id === id);

  if (!attraction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">景点未找到</p>
      </div>
    );
  }

  setCurrentAttraction(attraction.id);

  const relatedAttractions = attraction.relatedIds
    .map(relatedId => attractions.find(a => a.id === relatedId))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-paper">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[50vh] overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${attraction.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-12 w-full">
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              className="mb-6 bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Button>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              {attraction.name}
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {attraction.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-white/20 backdrop-blur-sm rounded-full text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xl text-white/90 max-w-2xl">
              {attraction.tagline}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-12"
        >
          <section>
            <h2 className="text-2xl font-serif font-bold text-primary mb-6 flex items-center">
              <Camera className="w-6 h-6 mr-2" />
              文化介绍
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-3 text-primary">历史背景</h3>
                <p className="text-gray-700 leading-relaxed">
                  {attraction.cultureContent.history}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-3 text-primary">建筑特色</h3>
                <p className="text-gray-700 leading-relaxed">
                  {attraction.cultureContent.architecture}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-3 text-primary">文化意义</h3>
                <p className="text-gray-700 leading-relaxed">
                  {attraction.cultureContent.significance}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-primary mb-6">
              图片画廊
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {attraction.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative rounded-xl overflow-hidden group cursor-pointer"
                >
                  <img
                    src={image}
                    alt={`${attraction.name} - 图片 ${index + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-primary mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2" />
              建筑档案
            </h2>
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {attraction.archives.height && (
                  <div className="flex items-center">
                    <Ruler className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">高度</p>
                      <p className="font-semibold">{attraction.archives.height}</p>
                    </div>
                  </div>
                )}
                {attraction.archives.builtYear && (
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">
                        {attraction.archives.rebuiltYear ? '初建时间' : '建造时间'}
                      </p>
                      <p className="font-semibold">{attraction.archives.builtYear}</p>
                    </div>
                  </div>
                )}
                {attraction.archives.rebuiltYear && (
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">重建时间</p>
                      <p className="font-semibold">{attraction.archives.rebuiltYear}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">主要特征</h3>
                <div className="flex flex-wrap gap-2">
                  {attraction.archives.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {relatedAttractions.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">
                相关推荐
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedAttractions.map((related) => (
                  related && (
                    <div
                      key={related.id}
                      onClick={() => navigate(`/attraction/${related.id}`)}
                      className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow cursor-pointer group"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={related.heroImage}
                          alt={related.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <h3 className="absolute bottom-4 left-4 text-xl font-serif font-bold text-white">
                          {related.name}
                        </h3>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {related.tagline}
                        </p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </section>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AttractionDetail;
