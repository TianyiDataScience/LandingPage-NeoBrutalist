import React, { useState, useRef, useEffect } from 'react';
import Button from './ui/Button';
import Section from './ui/Section';
import { Check, Play, Pause, Settings, Volume2 } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import EmailCaptureModal from './EmailCaptureModal';

const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Mouse tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-300, 300], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-5, 5]), { stiffness: 150, damping: 20 });

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=rain-and-thunder-16023.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <>
      <Section className="bg-paper min-h-[90vh] flex items-center overflow-hidden relative">
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left: Copy */}
          <div className="flex flex-col gap-6 items-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-black text-white px-3 py-1 font-bold text-sm -rotate-1"
            >
              New: Binaural Beats 2.0
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-bold text-5xl md:text-7xl leading-[0.95] tracking-tighter"
            >
              Turn ADHD into <span className="text-purple-600 relative inline-block">
                Deep Work.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl font-medium text-gray-800 leading-snug max-w-lg"
            >
              AI soundscapes that adapt to your brain. Stop getting distracted.
            </motion.p>
            
            <motion.ul 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-3 my-2"
            >
              {[
                "Flow state in < 120s",
                "Block noise instantly",
                "Focus for 4+ hours"
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 font-semibold group cursor-default">
                  <div className="bg-accent p-1 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-purple-400 group-hover:rotate-12 transition-all duration-300">
                    <Check size={16} strokeWidth={4} />
                  </div>
                  {benefit}
                </li>
              ))}
            </motion.ul>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col w-full sm:w-auto gap-3 mt-4"
            >
              <Button 
                onClick={() => setIsModalOpen(true)}
                size="lg" 
                className="w-full sm:w-auto hover:scale-105 transition-transform shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                Start 7-Day Free Trial
              </Button>
              <p className="text-sm font-bold text-gray-500 text-center sm:text-left">
                No credit card required • Built for solo builders
              </p>
            </motion.div>
          </div>

          {/* Right: Mock UI with Tilt Effect */}
          <motion.div 
            className="relative pt-10 lg:pt-0 perspective-1000 lg:scale-110 lg:translate-x-8"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
          >
            {/* Main Card */}
            <motion.div 
              style={{ rotateX, rotateY }}
              className="bg-white/90 backdrop-blur-xl border-4 border-black p-6 shadow-neo rounded-xl relative z-10"
            >
              <div className="flex justify-between items-center border-b-2 border-black/10 pb-4 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 border border-black hover:scale-125 transition-transform"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black hover:scale-125 transition-transform"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 border border-black hover:scale-125 transition-transform"></div>
                </div>
                <div className="font-mono text-xs font-bold text-gray-400">SESSION: DEEP_WORK_01</div>
              </div>

              <div className="space-y-6">
                {/* Waveform Visualization Active Animation */}
                <div className="h-32 bg-gray-50 border-2 border-black flex items-end justify-center gap-1 overflow-hidden px-4 pb-2 relative">
                  {/* Overlay for "off" state */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 z-10">
                      <span className="font-mono text-xs text-gray-500">PAUSED</span>
                    </div>
                  )}
                  {[...Array(24)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="w-2 bg-black rounded-t-sm" 
                      animate={isPlaying ? {
                        height: ["20%", "90%", "20%"],
                      } : {
                        height: "20%"
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.05,
                        repeatType: "reverse"
                      }}
                    ></motion.div>
                  ))}
                </div>

                {/* Controls */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-2xl">HyperFocus Mode</span>
                    <span className="font-mono text-sm text-gray-500">Binaural • 40Hz • Rain</span>
                  </div>
                  <button 
                    onClick={togglePlay}
                    className="group w-16 h-16 bg-accent border-2 border-black rounded-full flex items-center justify-center hover:bg-accent-hover shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 active:shadow-none"
                  >
                    {isPlaying ? (
                      <Pause size={32} fill="black" />
                    ) : (
                      <Play size={32} fill="black" className="ml-1" />
                    )}
                  </button>
                </div>

                {/* Sliders */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 group">
                    <Volume2 size={20} className="group-hover:rotate-12 transition-transform" />
                    <div className="flex-1 h-4 bg-gray-200 border-2 border-black rounded-full relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full w-[70%] bg-black rounded-l-full"></div>
                      {/* Animated shine effect on the slider bar */}
                      <div className="absolute top-0 left-0 h-full w-full bg-white opacity-20 -translate-x-full animate-[shimmer_2s_infinite]"></div>
                      <div className="absolute top-1/2 -translate-y-1/2 left-[70%] w-6 h-6 bg-white border-2 border-black rounded-full hover:scale-110 transition-transform cursor-pointer shadow-sm z-10"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements - Animated */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:block absolute -bottom-6 -right-6 bg-purple-400 border-2 border-black p-4 shadow-neo z-20 rotate-3"
            >
               <span className="font-mono font-bold text-sm">CURRENT STREAK: 12 DAYS</span>
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="hidden lg:block absolute -top-8 -left-8 bg-yellow-300 border-2 border-black p-3 shadow-neo z-0 -rotate-2"
            >
               <span className="font-display font-bold text-lg">Focus Score: 98/100</span>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      <EmailCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Hero;