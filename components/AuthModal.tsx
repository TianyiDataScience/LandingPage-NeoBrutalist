import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import Button from './ui/Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'signup' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      alert(`Successfully ${mode === 'signup' ? 'signed up' : 'logged in'}!`);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white border-4 border-black shadow-neo p-8"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all"
            >
              <X size={24} />
            </button>

            <div className="mb-8 text-center">
              <h2 className="font-display font-bold text-3xl mb-2">
                {mode === 'signup' ? 'Join FlowState' : 'Welcome Back'}
              </h2>
              <p className="text-gray-600 font-medium">
                {mode === 'signup' 
                  ? 'Start your deep work journey today.' 
                  : 'Ready to get back in the zone?'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-bold mb-1">Email</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border-2 border-black font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label className="block font-bold mb-1">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border-2 border-black font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                  placeholder="••••••••"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full flex justify-center items-center gap-2 mt-6"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : (
                  <>
                    {mode === 'signup' ? 'Create Account' : 'Sign In'}
                    <ArrowRight size={20} />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm font-medium">
              {mode === 'signup' ? (
                <p>
                  Already have an account?{' '}
                  <button onClick={() => setMode('login')} className="underline hover:text-accent-dark font-bold">
                    Log in
                  </button>
                </p>
              ) : (
                <p>
                  Need an account?{' '}
                  <button onClick={() => setMode('signup')} className="underline hover:text-accent-dark font-bold">
                    Sign up
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
