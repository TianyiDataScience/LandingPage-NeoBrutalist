import React, { useState, useRef, useEffect } from 'react';
import Button from './ui/Button';
import Section from './ui/Section';
import { Check, Play, Pause, Volume2 } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import EmailCaptureModal from './EmailCaptureModal';

interface HeroProps {
  isFocusMode?: boolean;
}

const Hero: React.FC<HeroProps> = ({ isFocusMode = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Audio & Visualizer Refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

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
    audioRef.current.crossOrigin = "anonymous";

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const initAudioContext = () => {
    if (!audioContextRef.current && audioRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 64; // Low resolution for chunky bars
      
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    }
  };

  const drawVisualizer = () => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const renderFrame = () => {
      animationFrameRef.current = requestAnimationFrame(renderFrame);
      analyserRef.current!.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 1.5; // Make bars wider
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height;

        // Dynamic color based on Focus Mode
        ctx.fillStyle = isFocusMode ? '#a3e635' : '#000000'; // Lime-400 in focus, Black in normal

        // Rounded caps look
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
        
        x += barWidth + 1;
      }
    };

    renderFrame();
  };

  const togglePlay = async () => {
    if (audioRef.current) {
      if (!audioContextRef.current) {
        initAudioContext();
        drawVisualizer();
      }
      
      if (audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current.resume();
      }

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
      <Section className={`min-h-[90vh] flex items-center overflow-hidden relative transition-colors duration-700 ${isFocusMode ? 'bg-zinc-950' : 'bg-paper'}`}>
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left: Copy */}
          <div className={`flex flex-col gap-6 items-start transition-opacity duration-700 ${isFocusMode ? 'opacity-20 blur-sm hover:opacity-100 hover:blur-0' : 'opacity-100'}`}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`inline-block px-3 py-1 font-bold text-sm -rotate-1 transition-colors duration-700 ${isFocusMode ? 'bg-white text-black' : 'bg-black text-white'}`}
            >
              New: Binaural Beats 2.0
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`font-display font-bold text-5xl md:text-7xl leading-[0.95] tracking-tighter transition-colors duration-700 ${isFocusMode ? 'text-white' : 'text-black'}`}
            >
              Turn <motion.span 
                className="inline-block cursor-default"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: -3, 
                  color: "#ef4444", 
                  transition: { type: "spring", stiffness: 300 } 
                }}
              >ADHD</motion.span> into <span className={`relative inline-block transition-colors duration-700 ${isFocusMode ? 'text-accent' : 'text-purple-600'}`}>
                <motion.span
                  className="inline-block cursor-default"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 3, 
                    textShadow: isFocusMode ? "4px 4px 0px #fff" : "4px 4px 0px #000",
                    transition: { type: "spring", stiffness: 300 } 
                  }}
                >
                  Deep Work.
                </motion.span>
                <svg className={`absolute w-full h-3 -bottom-1 left-0 -z-10 transition-colors duration-700 ${isFocusMode ? 'text-white' : 'text-accent'}`} viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`text-xl md:text-2xl font-medium leading-snug max-w-lg transition-colors duration-700 ${isFocusMode ? 'text-gray-400' : 'text-gray-800'}`}
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
                <motion.li 
                  key={i} 
                  className={`flex items-center gap-3 font-semibold group cursor-default w-fit transition-colors duration-700 ${isFocusMode ? 'text-gray-300' : 'text-black'}`}
                  whileHover={{ x: 10 }}
                >
                  <motion.div 
                    className={`p-1 border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group-hover:bg-purple-400 ${isFocusMode ? 'bg-black border-white shadow-[2px_2px_0px_0px_#fff]' : 'bg-accent border-black'}`}
                    whileHover={{ rotate: 180 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Check size={16} strokeWidth={4} className={isFocusMode ? 'text-white' : 'text-black'} />
                  </motion.div>
                  {benefit}
                </motion.li>
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
                className={`w-full sm:w-auto hover:scale-105 transition-transform shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${isFocusMode ? 'bg-white text-black border-white shadow-[6px_6px_0px_0px_#3f3f46]' : ''}`}
              >
                Start 7-Day Free Trial
              </Button>
              <p className={`text-sm font-bold text-center sm:text-left transition-colors duration-700 ${isFocusMode ? 'text-gray-600' : 'text-gray-500'}`}>
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
              className={`backdrop-blur-xl border-4 p-6 shadow-neo rounded-xl relative z-10 transition-colors duration-700 ${isFocusMode ? 'bg-black/90 border-white shadow-[8px_8px_0px_0px_#3f3f46]' : 'bg-white/90 border-black'}`}
            >
              <div className={`flex justify-between items-center border-b-2 pb-4 mb-6 transition-colors duration-700 ${isFocusMode ? 'border-white/20' : 'border-black/10'}`}>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 border border-black hover:scale-125 transition-transform"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black hover:scale-125 transition-transform"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 border border-black hover:scale-125 transition-transform"></div>
                </div>
                <div className="font-mono text-xs font-bold text-gray-400">SESSION: DEEP_WORK_01</div>
              </div>

              <div className="space-y-6">
                {/* Real-time Visualizer Canvas */}
                <div className={`h-32 border-2 flex items-end justify-center overflow-hidden relative transition-colors duration-700 ${isFocusMode ? 'bg-black border-white' : 'bg-gray-50 border-black'}`}>
                  {/* Overlay for "off" state */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 z-10">
                      <span className="font-mono text-xs text-gray-500">PAUSED</span>
                    </div>
                  )}
                  
                  <canvas 
                    ref={canvasRef} 
                    width={300} 
                    height={128} 
                    className="w-full h-full"
                  />
                </div>

                {/* Controls */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className={`font-display font-bold text-2xl transition-colors duration-700 ${isFocusMode ? 'text-white' : 'text-black'}`}>HyperFocus Mode</span>
                    <span className="font-mono text-sm text-gray-500">Binaural • 40Hz • Rain</span>
                  </div>
                  <button 
                    onClick={togglePlay}
                    className={`group w-16 h-16 border-2 rounded-full flex items-center justify-center transition-all active:translate-y-1 active:shadow-none ${isFocusMode ? 'bg-white border-white shadow-[4px_4px_0px_0px_#3f3f46] hover:bg-gray-200' : 'bg-accent border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-accent-hover'}`}
                  >
                    {isPlaying ? (
                      <Pause size={32} fill={isFocusMode ? "black" : "black"} className={isFocusMode ? "text-black" : "text-black"} />
                    ) : (
                      <Play size={32} fill={isFocusMode ? "black" : "black"} className={`ml-1 ${isFocusMode ? "text-black" : "text-black"}`} />
                    )}
                  </button>
                </div>

                {/* Sliders */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 group">
                    <Volume2 size={20} className={`group-hover:rotate-12 transition-transform ${isFocusMode ? 'text-white' : 'text-black'}`} />
                    <div className={`flex-1 h-4 border-2 rounded-full relative overflow-hidden transition-colors duration-700 ${isFocusMode ? 'bg-gray-800 border-white' : 'bg-gray-200 border-black'}`}>
                      <div className={`absolute top-0 left-0 h-full w-[70%] rounded-l-full transition-colors duration-700 ${isFocusMode ? 'bg-white' : 'bg-black'}`}></div>
                      <div className={`absolute top-1/2 -translate-y-1/2 left-[70%] w-6 h-6 border-2 rounded-full hover:scale-110 transition-transform cursor-pointer shadow-sm z-10 ${isFocusMode ? 'bg-black border-white' : 'bg-white border-black'}`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements - Animated */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className={`hidden lg:block absolute -bottom-6 -right-6 border-2 p-4 shadow-neo z-20 rotate-3 transition-colors duration-700 ${isFocusMode ? 'bg-purple-900 border-white text-white' : 'bg-purple-400 border-black text-black'}`}
            >
               <span className="font-mono font-bold text-sm">CURRENT STREAK: 12 DAYS</span>
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className={`hidden lg:block absolute -top-8 -left-8 border-2 p-3 shadow-neo z-0 -rotate-2 transition-colors duration-700 ${isFocusMode ? 'bg-yellow-600 border-white text-white' : 'bg-yellow-300 border-black text-black'}`}
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