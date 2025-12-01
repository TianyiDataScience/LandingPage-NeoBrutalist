import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AudienceCheck from './components/AudienceCheck';
import HowItWorks from './components/HowItWorks';
import Deliverables from './components/Deliverables';
import Pricing from './components/Pricing';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import CustomCursor from './components/CustomCursor';
import AuthModal from './components/AuthModal';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [isFocusMode, setIsFocusMode] = useState(false);

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className={`font-body min-h-screen flex flex-col selection:bg-accent selection:text-black cursor-none transition-colors duration-700 ${isFocusMode ? 'bg-zinc-950 text-white' : 'bg-paper text-black'}`}>
      <CustomCursor />
      <Header 
        onOpenAuth={handleOpenAuth} 
        isFocusMode={isFocusMode} 
        toggleFocusMode={() => setIsFocusMode(!isFocusMode)} 
      />
      
      <main className="flex-grow relative">
        <Hero isFocusMode={isFocusMode} />
        
        {/* Content that fades out in Focus Mode */}
        <motion.div
          animate={{ 
            opacity: isFocusMode ? 0.05 : 1,
            filter: isFocusMode ? 'blur(4px)' : 'blur(0px)',
            pointerEvents: isFocusMode ? 'none' : 'auto'
          }}
          transition={{ duration: 0.8 }}
        >
          <AudienceCheck />
          <HowItWorks />
          <Deliverables />
          <Pricing />
          <Testimonials />
          <Features />
          <FAQ />
        </motion.div>
      </main>
      
      <motion.div
        animate={{ opacity: isFocusMode ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Footer />
      </motion.div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode} 
      />
    </div>
  );
};

export default App;