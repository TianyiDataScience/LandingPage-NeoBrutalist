import React from 'react';
import { motion } from 'framer-motion';

const Testimonials: React.FC = () => {
  const reviews = [
    { name: "Alex Chen", role: "Indie Hacker", text: "I shipped 3 features in one session. This is cheating." },
    { name: "Sarah J.", role: "Writer", text: "Finally, noise that doesn't sound like a broken fan." },
    { name: "David Park", role: "Senior Dev", text: "The binaural beats actually work. My focus score is up 40%." },
    { name: "Emily R.", role: "Designer", text: "The UI alone makes me want to work. It's so clean." },
    { name: "Michael T.", role: "Founder", text: "FlowState is the only reason I hit my deadline." },
  ];

  return (
    <div className="bg-accent border-y-4 border-black py-12 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      
      <div className="flex">
        <motion.div 
          className="flex gap-8 px-4"
          animate={{ x: "-50%" }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ width: "fit-content" }}
        >
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <div 
              key={i} 
              className="w-80 flex-shrink-0 bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg"
            >
              <p className="font-medium text-lg mb-4">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full border border-black"></div>
                <div>
                  <p className="font-bold text-sm">{review.name}</p>
                  <p className="text-xs text-gray-500 font-mono">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
