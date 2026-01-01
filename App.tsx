
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, Transition } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ClarityPage from './pages/ClarityPage';
import FreeResourcesPage from './pages/clarity/FreeResourcesPage';
import WorkbookPage from './pages/clarity/WorkbookPage';
import CoursePage from './pages/clarity/CoursePage';
import FirepowerPage from './pages/FirepowerPage';
import PartnershipPage from './pages/PartnershipPage';
import WorkPage from './pages/WorkPage';
import TeamPage from './pages/TeamPage';
import TeamMemberPage from './pages/TeamMemberPage';
import ProjectPage from './pages/ProjectPage';
import ContactPage from './pages/ContactPage';
import JournalPage from './pages/JournalPage';
import DropsPage from './pages/DropsPage';
import DropDetailPage from './pages/DropDetailPage';
import LabPage from './pages/LabPage';
import AboutPage from './pages/AboutPage';
import TierDetailPage from './pages/TierDetailPage';
import ClarityTierPage from './pages/ClarityTierPage';
import PartnershipDetail from './pages/PartnershipDetail';
import FAQPage from './pages/FAQPage';
import PlaybookPage from './pages/PlaybookPage';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';

const pageVariants = {
  initial: { opacity: 0, scale: 0.99, y: 10 },
  in: { opacity: 1, scale: 1, y: 0 },
  out: { opacity: 0, scale: 1.01, y: -10 },
};

const pageTransition: Transition = {
  duration: 0.8,
  ease: [0.19, 1, 0.22, 1], // Expo out for kinetic feel
};

const App: React.FC = () => {
  const location = useLocation();
  
  // Check session storage to see if the user has already visited in this session
  const [loading, setLoading] = useState(() => {
    const hasVisited = sessionStorage.getItem('coolo_visited');
    return !hasVisited;
  });
  
  React.useEffect(() => {
    // Reset scroll position instantly on route change so animation plays cleanly
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleEnter = () => {
    // Mark session as visited
    sessionStorage.setItem('coolo_visited', 'true');
    setLoading(false);
  };

  return (
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
              <Header />
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
                      <Route path="/clarity/workbook" element={<WorkbookPage />} />
                      <Route path="/clarity/course" element={<CoursePage />} />
                      <Route path="/clarity/:slug" element={<ClarityTierPage />} />
                      <Route path="/firepower" element={<FirepowerPage />} />
                      <Route path="/firepower/:slug" element={<TierDetailPage />} />
                      <Route path="/partnership" element={<PartnershipPage />} />
                      <Route path="/partnership/:slug" element={<PartnershipDetail />} />
                      <Route path="/work" element={<WorkPage />} />
                      <Route path="/work/:slug" element={<ProjectPage />} />
                      <Route path="/team" element={<TeamPage />} />
                      <Route path="/team/:memberSlug" element={<TeamMemberPage />} />
                      <Route path="/journal" element={<JournalPage />} />
                      <Route path="/journal/:slug" element={<JournalPage />} />
                      <Route path="/drops" element={<DropsPage />} />
                      <Route path="/drops/:slug" element={<DropDetailPage />} />
                      <Route path="/lab" element={<LabPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/faq" element={<FAQPage />} />
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
