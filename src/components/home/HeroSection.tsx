import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const HeroSection = () => {
  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      <img
        src="/foxiangge.jpg"
        alt="佛香阁"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/60" />

      <div className="relative z-10 flex flex-col h-full px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <div className="flex items-center gap-6 mb-4">
            <div className="w-px h-20 bg-accent/40" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-[0.15em] leading-tight">
              颐和园
            </h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm md:text-base text-white/85 font-semibold tracking-[0.4em] ml-7"
          >
            皇家园林 · 世界遗产 · 颐养太和
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="max-w-2xl mt-16 py-5 bg-gradient-to-r from-black/40 via-black/30 to-transparent border-l-2 border-accent/50 pl-5"
          >
            <p className="text-sm md:text-base text-white/85 leading-relaxed mb-2">
              颐和园，清代皇家园林，中国现存规模最大、保存最完整的皇家园林之一，
              被誉为"皇家园林博物馆"，1998年被列入《世界遗产名录》。
            </p>
            <p className="text-sm md:text-base text-white/85 leading-relaxed">
              集中国传统造园艺术之大成，融江南婉约与北方恢弘于一体。
              昆明湖碧波浩渺，万寿山楼阁参差，二百九十公顷湖光山色尽显东方园林美学的杰出典范。
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="flex flex-col items-start gap-3"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              document.getElementById('attractions')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-10 py-4 text-lg"
          >
            开始游览
          </Button>
          <div className="flex items-center gap-1 text-sm">
            <Link to="/map" className="text-white/60 hover:text-white transition-colors duration-200">
              查看地图
            </Link>
            <span className="text-white/30">·</span>
            <Link to="/guide" className="text-white/60 hover:text-white transition-colors duration-200">
              旅游攻略
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className="cursor-pointer"
        >
          <ChevronDown size={32} className="text-accent/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
