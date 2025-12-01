import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Optional: Play alarm sound here
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((mode === 'focus' ? 25 * 60 : 5 * 60) - timeLeft) / (mode === 'focus' ? 25 * 60 : 5 * 60);

  return (
    <div className="bg-white/80 backdrop-blur-md border-2 border-black p-6 rounded-xl shadow-neo w-full max-w-sm mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-display font-bold text-xl">Focus Timer</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => { setMode('focus'); setTimeLeft(25 * 60); setIsActive(false); }}
            className={`px-3 py-1 text-xs font-bold border-2 border-black rounded-full transition-colors ${mode === 'focus' ? 'bg-accent' : 'bg-transparent hover:bg-gray-100'}`}
          >
            Focus
          </button>
          <button 
            onClick={() => { setMode('break'); setTimeLeft(5 * 60); setIsActive(false); }}
            className={`px-3 py-1 text-xs font-bold border-2 border-black rounded-full transition-colors ${mode === 'break' ? 'bg-blue-300' : 'bg-transparent hover:bg-gray-100'}`}
          >
            Break
          </button>
        </div>
      </div>

      <div className="relative flex justify-center items-center mb-8">
        {/* Progress Ring */}
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 88}
            strokeDashoffset={2 * Math.PI * 88 * (1 - progress)}
            className={`${mode === 'focus' ? 'text-accent' : 'text-blue-400'} transition-all duration-1000 ease-linear`}
            strokeLinecap="round"
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-5xl font-bold tracking-tighter">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button 
          onClick={toggleTimer}
          className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
        >
          {isActive ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
        <button 
          onClick={resetTimer}
          className="w-14 h-14 bg-gray-200 border-2 border-black rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors active:scale-95"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
