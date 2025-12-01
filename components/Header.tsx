import React from 'react';
import Button from './ui/Button';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

interface HeaderProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  isFocusMode: boolean;
  toggleFocusMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenAuth, isFocusMode, toggleFocusMode }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`py-6 px-4 md:px-8 flex justify-between items-center max-w-7xl mx-auto w-full relative z-50 transition-colors duration-700 ${isFocusMode ? 'text-white' : 'text-black'}`}>
      <motion.div 
        className="font-display font-bold text-2xl tracking-tighter flex items-center gap-2 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <motion.div 
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-700 ${isFocusMode ? 'bg-white' : 'bg-black'}`}
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-3 h-3 bg-accent rounded-full"></div>
        </motion.div>
        FlowState
      </motion.div>

      <nav className={`hidden md:flex gap-8 font-medium transition-opacity duration-500 ${isFocusMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {[
          { label: 'How it works', id: 'how-it-works' },
          { label: 'Pricing', id: 'pricing' },
          { label: 'FAQ', id: 'faq' }
        ].map((item) => (
          <motion.button 
            key={item.label} 
            onClick={() => scrollToSection(item.id)}
            className="relative group bg-transparent border-none cursor-pointer font-medium text-inherit"
            whileHover={{ y: -2 }}
          >
            {item.label}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
          </motion.button>
        ))}
      </nav>

      <div className="flex gap-4 items-center">
        {/* Focus Mode Toggle */}
        <button 
          onClick={toggleFocusMode}
          className={`flex items-center gap-2 font-bold text-sm px-3 py-1.5 rounded-full border-2 transition-all duration-300 ${isFocusMode ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'}`}
        >
          {isFocusMode ? <EyeOff size={16} /> : <Eye size={16} />}
          <span className="hidden sm:inline">{isFocusMode ? 'Exit Focus' : 'Focus Mode'}</span>
        </button>

        <button 
          onClick={() => onOpenAuth('login')}
          className={`font-bold hidden md:block self-center hover:underline bg-transparent border-none cursor-pointer transition-opacity duration-500 ${isFocusMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          Login
        </button>
        <div className={`transition-opacity duration-500 ${isFocusMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Button 
            size="sm" 
            className="hover:-translate-y-1 transition-transform"
            onClick={() => onOpenAuth('signup')}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;