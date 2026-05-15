import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const HeroSection = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      <img 
        src="/foxiangge-new.jpg" 
        alt="佛香阁"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-wider">
            颐和园
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-white/90 mb-12 font-light tracking-widest"
          >
            皇家园林 · 世界遗产 · 颐养太和
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link to="/#attractions">
            <Button variant="primary" size="lg">
              开始游览
            </Button>
          </Link>
          <Link to="/map">
            <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              查看地图
            </Button>
          </Link>
          <Link to="/guide">
            <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              旅游攻略
            </Button>
          </Link>
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
          <ChevronDown size={48} className="text-white/80" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
