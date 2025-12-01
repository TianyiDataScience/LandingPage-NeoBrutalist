import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailCaptureModal: React.FC<EmailCaptureModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      console.log(`Captured email: ${email}`);
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setEmail('');
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-paper border-4 border-black p-8 rounded-xl shadow-neo max-w-md w-full relative overflow-hidden"
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              {status === 'success' ? (
                <div className="flex flex-col items-center text-center py-8">
                  <div className="w-16 h-16 bg-green-400 border-2 border-black rounded-full flex items-center justify-center mb-4 animate-bounce">
                    <Check size={32} strokeWidth={3} />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-2">You're on the list!</h3>
                  <p className="text-gray-600">Watch your inbox for your access link.</p>
                </div>
              ) : (
                <>
                  <h3 className="font-display font-bold text-3xl mb-2">Unlock Deep Focus</h3>
                  <p className="text-gray-600 mb-6 font-medium">
                    Join 10,000+ builders using FlowState. Get your 7-day free trial link instantly.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="space-y-1">
                      <label htmlFor="email" className="font-bold text-sm uppercase tracking-wide">Email Address</label>
                      <input 
                        type="email" 
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="builder@example.com"
                        className="w-full px-4 py-3 bg-white border-2 border-black rounded-lg focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow placeholder:text-gray-400 font-medium"
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-accent hover:bg-accent-hover text-black font-bold py-4 border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        "Get Access Now"
                      )}
                    </button>
                    
                    <p className="text-xs text-center text-gray-500 font-medium mt-2">
                      No spam. Unsubscribe anytime.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EmailCaptureModal;
