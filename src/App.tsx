import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
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
    window.open(`/attraction/${id}`, '_blank');
  };

  const handleAttractionClick = (id: string) => {
    window.open(`/attraction/${id}`, '_blank');
  };

  return (
    <>
      <HeroSection />
      <div id="attractions">
        <CardStack attractions={attractions} onCardClick={handleCardClick} />
      </div>
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
    window.open(`/attraction/${id}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-paper pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif font-bold text-primary mb-4 text-center">
          颐和园互动地图
        </h1>
        <p className="text-gray-600 text-center mb-8">
          点击地图上的标记查看景点详情，拖拽移动地图，缩放查看细节
        </p>
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
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/attraction/:id" element={<AttractionDetail />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/guide" element={<TravelGuide />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
