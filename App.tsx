import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, Transition } from 'framer-motion';
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
import DropsPage from './pages/DropsPage';
import DropDetailPage from './pages/DropDetailPage';
import ContactPage from './pages/ContactPage';
import JoinPage from './pages/JoinPage';
import QAPage from './pages/QAPage';
import UnsubscribePage from './pages/Unsubscribe';
import NotFoundPage from './pages/NotFoundPage';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import { Analytics } from './components/Analytics';
import StickerSystem from './components/StickerSystem';
import BroadcastHUD from './components/BroadcastHUD';

const pageVariants = {
  initial: { 
    opacity: 0, 
    filter: "blur(8px) grayscale(100%)", // Glitch Start
    scale: 1.02
  },
  in: { 
    opacity: 1, 
    filter: "blur(0px) grayscale(0%)",
    scale: 1 
  },
  out: { 
    opacity: 0, 
    filter: "blur(4px) grayscale(100%) brightness(1.5)", // Glitch End
    scale: 0.99 
  },
};

const pageTransition: Transition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1.0], // Kinetic snap
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
    <div className="bg-[#EAEAEA] font-body text-brand-navy min-h-screen flex flex-col antialiased selection:bg-brand-purple selection:text-white relative overflow-x-hidden">
      {/* GLOBAL CSS FOR SCANLINES (Digital Dirt) */}
      <style>{`
        .scanlines {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.02));
          background-size: 100% 4px;
          pointer-events: none;
          z-index: 9998;
          animation: scanmove 20s linear infinite;
        }
        @keyframes scanmove {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
      `}</style>

      {/* Layer 1: Scanlines */}
      <div className="scanlines"></div>

      {/* Layer 2: Broadcast HUD */}
      {!loading && <BroadcastHUD />}

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
                      
                      {/* --- CLARITY ROUTES --- */}
                      <Route path="/clarity" element={<ClarityPage />} />
                      <Route path="/clarity/free-resources" element={<FreeResourcesPage />} />
                      
                      <Route path="/audit" element={<RealityCheckApp />} />
                      <Route path="/clarity/reality-check" element={<RealityCheckApp />} />

                      <Route path="/clarity/:slug" element={<ClarityTierPage />} />
                      
                      {/* --- DESIGN POWER ROUTES --- */}
                      <Route path="/design-power/:slug" element={<TierDetailPage />} />
                      <Route path="/design-power" element={<DesignPowerPage />} />
                      
                      {/* --- PARTNERSHIP ROUTES --- */}
                      <Route path="/partnership/:slug" element={<PartnershipDetail />} />
                      <Route path="/partnership" element={<PartnershipPage />} />
                      
                      {/* --- WORK ROUTES --- */}
                      <Route path="/work/:slug" element={<ProjectPage />} />
                      <Route path="/work" element={<WorkPage />} />
                      
                      {/* --- TEAM ROUTES --- */}
                      <Route path="/team/:memberSlug" element={<TeamMemberPage />} />
                      <Route path="/team" element={<TeamPage />} />
                      
                      {/* --- JOURNAL ROUTES --- */}
                      <Route path="/journal/:slug" element={<JournalPage />} />
                      <Route path="/journal" element={<JournalPage />} />
                      
                      {/* --- DROPS ROUTES --- */}
                      <Route path="/drops/:slug" element={<DropDetailPage />} />
                      <Route path="/drops" element={<DropsPage />} />
                      
                      {/* --- UTILITY ROUTES --- */}
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/join" element={<JoinPage />} />
                      <Route path="/faq" element={<QAPage />} />
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
  );
};

export default App;