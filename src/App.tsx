import { HashRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';
import HeroSection from './components/home/HeroSection';
import CardStack from './components/attractions/CardStack';
import SeasonTabs from './components/seasons/SeasonTabs';
import InteractiveMap from './components/map/InteractiveMap';
import TravelGuide from './pages/TravelGuide';
import AttractionDetail from './components/attractions/AttractionDetail';
import { useAttractionStore } from './store/attractionStore';
function HomePage() {
  const { attractions, seasons, currentSeason, setCurrentSeason } = useAttractionStore();

  const handleCardClick = (id: string) => {
    window.open(`${import.meta.env.BASE_URL}#/attraction/${id}`, '_blank');
  };

  return (
    <>
      <HeroSection />
      
      <div id="attractions">
        <CardStack attractions={attractions} onCardClick={handleCardClick} />
      </div>

      <section className="py-16 bg-gradient-to-b from-paper to-white">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="divider-ornament max-w-md mx-auto"
        >
          <span className="text-xs tracking-[0.3em] text-accent uppercase">Four Seasons</span>
        </motion.div>
      </section>

      <SeasonTabs
        seasons={seasons}
        currentSeason={currentSeason}
        onSeasonChange={setCurrentSeason}
      />
    </>
  );
}

function MapPage() {
  const { attractions } = useAttractionStore();

  const handleAttractionClick = (id: string) => {
    window.open(`${import.meta.env.BASE_URL}#/attraction/${id}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-paper pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
        <InteractiveMap
          attractions={attractions}
          onAttractionClick={handleAttractionClick}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow w-full">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/attraction/:id" element={<AttractionDetail />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/guide" element={<TravelGuide />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
