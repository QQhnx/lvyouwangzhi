import { useState } from 'react';
import { motion } from 'framer-motion';
import { GuideCategory, GuideItem } from '../types';
import { guideItems, faqItems } from '../data/guide';
import { Train, Bus, Car, Ticket, Utensils, Coffee, Cake, Building2, Home, Gift, ShoppingBag } from 'lucide-react';

interface TravelGuideProps {
  onCategoryChange?: (category: GuideCategory) => void;
}

const TravelGuide = ({ onCategoryChange }: TravelGuideProps) => {
  const [selectedCategory, setSelectedCategory] = useState<GuideCategory | 'all'>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const categories: { value: GuideCategory | 'all'; label: string; icon: any }[] = [
    { value: 'all', label: '全部', icon: Gift },
    { value: 'transport', label: '交通', icon: Bus },
    { value: 'food', label: '美食', icon: Utensils },
    { value: 'accommodation', label: '住宿', icon: Building2 },
    { value: 'souvenirs', label: '特产', icon: ShoppingBag },
  ];

  const filteredItems = selectedCategory === 'all'
    ? guideItems
    : guideItems.filter(item => item.category === selectedCategory);

  const getIcon = (iconName?: string) => {
    const icons: any = {
      Train,
      Bus,
      Car,
      Ticket,
      Utensils,
      Coffee,
      Cake,
      Building2,
      Home,
      Gift,
      ShoppingBag,
    };
    return iconName && icons[iconName] ? icons[iconName] : Gift;
  };

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            旅游攻略
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            为您的颐和园之旅提供最实用的交通、美食、住宿和特产信息
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === cat.value
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <Icon className="w-5 h-5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredItems.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
                
                {item.details && item.details.length > 0 && (
                  <ul className="space-y-2 mt-4 pt-4 border-t">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </div>

        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">
              常见问题
            </h2>
            <p className="text-gray-600">解答游客最关心的问题</p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl overflow-hidden shadow-card"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-lg pr-4">{faq.question}</span>
                  <span className={`text-2xl text-primary transition-transform ${
                    expandedFaq === index ? 'rotate-45' : ''
                  }`}>
                    +
                  </span>
                </button>
                
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-primary text-white rounded-2xl p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-3xl font-serif font-bold mb-4">
              准备好探索颐和园了吗？
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              无论是历史爱好者、摄影达人还是家庭出游，颐和园都能给您带来难忘的体验
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/"
                className="px-8 py-3 bg-white text-primary rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                开始游览
              </a>
              <a
                href="/map"
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-primary transition-colors"
              >
                查看地图
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default TravelGuide;
