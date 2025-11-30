import React from 'react';
import Button from './ui/Button';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-paper border-b-2 border-black py-4 px-6 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-black rounded-full border-2 border-accent"></div>
        <span className="font-display font-bold text-xl md:text-2xl tracking-tight">FlowState</span>
      </div>
      <nav className="flex items-center gap-4">
        <a href="#signin" className="hidden md:block font-bold hover:underline">Sign In</a>
        <Button size="sm" variant="secondary">Get Started</Button>
      </nav>
    </header>
  );
};

export default Header;