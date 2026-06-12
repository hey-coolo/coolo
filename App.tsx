import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, Transition } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PlaybookPage from './pages/PlaybookPage';
import ClarityPage from './pages/ClarityPage';
import FreeResourcesPage from './pages/clarity/FreeResourcesPage';
import RealityCheckApp from './pages/clarity/RealityCheckApp';
import ClarityTierPage from './pages/ClarityTierPage';
import DesignPowerPage from './pages/DesignPowerPage';
import TierDetailPage from './pages/TierDetailPage';
import PartnershipPage from './pages/PartnershipPage';
import PartnershipDetail from './pages/PartnershipDetail';
import WorkPage from './pages/WorkPage';
import ProjectPage from './pages/ProjectPage';
import TeamPage from './pages/TeamPage';
import TeamMemberPage from './pages/TeamMemberPage';
import JournalPage from './pages/JournalPage';
import DropsPage from './pages/SupportAnArtist';
import SupportAnArtistDetailPage from './pages/SupportAnArtistDetailPage';
import CheckoutPage from './pages/CheckoutPage'; 
import ContactPage from './pages/ContactPage';
import JoinPage from './pages/JoinPage';
import UnsubscribePage from './pages/Unsubscribe';
import NotFoundPage from './pages/NotFoundPage';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import { Analytics } from './components/Analytics';
import StickerSystem from './components/StickerSystem';
import SmoothScroll from './components/SmoothScroll'; 

const pageVariants = {
  initial: { opacity: 0, scale: 0.99, y: 10 },
  in: { opacity: 1, scale: 1, y: 0 },
  out: { opacity: 0, scale: 1.01, y: -10 },
};

const pageTransition: Transition = {
  duration: 0.8,
  ease: [0.19, 1, 0.22, 1],
};

const App: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(() => {
    const hasVisited = sessionStorage.getItem('coolo_visited');
    return !hasVisited;
  });
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleEnter = () => {
    sessionStorage.setItem('coolo_visited', 'true');
    setLoading(false);
  };

  return (
    <SmoothScroll>
      <Helmet>
        {/* Dynamic Canonical URL to prevent duplicate content indexing by AI crawlers */}
        <link rel="canonical" href={`https://coolo.co.nz${location.pathname}`} />
      </Helmet>
      
      <div className="bg-brand-offwhite font-body text-brand-navy min-h-screen flex flex-col antialiased selection:bg-brand-yellow">
        <CustomCursor />
        
        <AnimatePresence mode="wait">
          {loading && <Loader key="loader" onEnter={handleEnter} />}
        </AnimatePresence>
        
        {!loading && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="flex flex-col min-h-screen"
            >
                <StickerSystem />
                <Header />
                <Analytics />
                <main className="flex-grow">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={location.pathname}
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                      className="w-full will-change-transform"
                    >
                      <Routes location={location}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/playbook" element={<PlaybookPage />} />
                        
                        <Route path="/clarity" element={<ClarityPage />} />
                        <Route path="/clarity/free-resources" element={<FreeResourcesPage />} />
                        <Route path="/audit" element={<RealityCheckApp />} />
                        <Route path="/clarity/reality-check" element={<RealityCheckApp />} />
                        <Route path="/clarity/:slug" element={<ClarityTierPage />} />
                        
                        <Route path="/design-power/:slug" element={<TierDetailPage />} />
                        <Route path="/design-power" element={<DesignPowerPage />} />
                        
                        <Route path="/partnership/:slug" element={<PartnershipDetail />} />
                        <Route path="/partnership" element={<PartnershipPage />} />
                        
                        <Route path="/work/:slug" element={<ProjectPage />} />
                        <Route path="/work" element={<WorkPage />} />
                        
                        <Route path="/team/:memberSlug" element={<TeamMemberPage />} />
                        <Route path="/team" element={<TeamPage />} />
                        
                        <Route path="/journal/:slug" element={<JournalPage />} />
                        <Route path="/journal" element={<JournalPage />} />
                        
                        <Route path="/support-an-artist/:slug" element={<SupportAnArtistDetailPage />} />
                        <Route path="/support-an-artist" element={<DropsPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/join" element={<JoinPage />} />
                        <Route path="/unsubscribe" element={<UnsubscribePage />} />
                        
                        <Route path="*" element={<NotFoundPage />} />
                      </Routes>
                    </motion.div>
                  </AnimatePresence>
                </main>
              <Footer />
            </motion.div>
        )}
      </div>
    </SmoothScroll>
  );
};

export default App;