import React from 'react';
import Button from './ui/Button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-paper border-t-2 border-black">
      <div className="py-20 px-4 text-center">
        <h2 className="font-display font-bold text-4xl md:text-6xl mb-6">
          Ready to enter the zone?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto font-medium">
          Stop fighting your brain. Start working with it. <br/>
          Join 10,000+ students and freelancers today.
        </p>
        <Button size="lg" className="text-xl px-10 py-5">
          Start 7-Day Free Trial
        </Button>
      </div>
      
      <div className="border-t-2 border-black bg-gray-100 py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-bold">FlowState © 2024</div>
        <div className="flex gap-6 font-medium text-sm underline">
          <a href="#" className="hover:text-accent-hover">Twitter</a>
          <a href="#" className="hover:text-accent-hover">Privacy</a>
          <a href="#" className="hover:text-accent-hover">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;