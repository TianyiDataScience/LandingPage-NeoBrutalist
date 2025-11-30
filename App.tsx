import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AudienceCheck from './components/AudienceCheck';
import HowItWorks from './components/HowItWorks';
import Deliverables from './components/Deliverables';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="font-body min-h-screen flex flex-col selection:bg-accent selection:text-black">
      <Header />
      <main className="flex-grow">
        <Hero />
        <AudienceCheck />
        <HowItWorks />
        <Deliverables />
        <Features />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default App;