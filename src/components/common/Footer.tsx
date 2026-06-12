import { Link } from 'react-router-dom';
import { Heart, MapPin, Award } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-gold">颐园印象</h3>
            <p className="text-gold/80 leading-relaxed">
              探索颐和园的世界遗产魅力，感受皇家园林的深厚文化底蕴。
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center text-gold">
              <MapPin className="w-5 h-5 mr-2" />
              快速链接
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gold/80 hover:text-gold transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/#attractions" className="text-gold/80 hover:text-gold transition-colors">
                  景点介绍
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-gold/80 hover:text-gold transition-colors">
                  互动地图
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-gold/80 hover:text-gold transition-colors">
                  旅游攻略
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center text-gold">
              <Award className="w-5 h-5 mr-2" />
              荣誉资质
            </h4>
            <ul className="space-y-2 text-gold/80">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                世界文化遗产
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                国家AAAAA级旅游景区
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                中国古典园林杰出代表
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center text-gold">
              <MapPin className="w-5 h-5 mr-2" />
              相关景点
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/attraction/leshoutang" className="text-gold/80 hover:text-gold transition-colors">
                  乐寿堂
                </Link>
              </li>
              <li>
                <Link to="/attraction/xiequyuan" className="text-gold/80 hover:text-gold transition-colors">
                  谐趣园
                </Link>
              </li>
              <li>
                <Link to="/attraction/paiyundian" className="text-gold/80 hover:text-gold transition-colors">
                  排云殿
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/20 mt-8 pt-8 text-center">
          <p className="flex items-center justify-center text-gold/60">
            <Heart className="w-4 h-4 mr-1" />
            颐和园旅游介绍网站 - 传播中华园林文化
          </p>
          <p className="mt-2 text-gold/40 text-sm">
            © 2024 颐园印象. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
