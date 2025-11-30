import React from 'react';
import Button from './ui/Button';
import Section from './ui/Section';
import { Check, Play, Settings, Volume2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <Section className="bg-paper min-h-[90vh] flex items-center overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Copy */}
        <div className="flex flex-col gap-6 items-start relative z-10">
          <div className="inline-block bg-black text-white px-3 py-1 font-bold text-sm -rotate-1 animate-pulse">
            Now with Binaural Beats 2.0
          </div>
          <h1 className="font-display font-bold text-5xl md:text-7xl leading-[0.95] tracking-tighter">
            Turn your <span className="text-purple-600">ADHD brain</span> into a deep work machine.
          </h1>
          <p className="text-xl md:text-2xl font-medium text-gray-800 leading-snug">
            AI-generated personalized soundscapes that adapt to your biology. Stop getting distracted by silence and actually finish your work.
          </p>
          
          <ul className="flex flex-col gap-3 my-2">
            {[
              "Enter flow state in < 120 seconds",
              "Block out chaotic background noise automatically",
              "Maintain laser focus for 4+ hours/day"
            ].map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 font-semibold group cursor-default">
                <div className="bg-accent p-1 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-purple-400 group-hover:rotate-12 transition-all duration-300">
                  <Check size={16} strokeWidth={4} />
                </div>
                {benefit}
              </li>
            ))}
          </ul>

          <div className="flex flex-col w-full sm:w-auto gap-3 mt-4">
            <Button size="lg" className="w-full sm:w-auto hover:scale-105 transition-transform">
              Start 7-Day Free Trial
            </Button>
            <p className="text-sm font-bold text-gray-500 text-center sm:text-left">
              No credit card required • Built for solo builders
            </p>
          </div>
        </div>

        {/* Right: Mock UI */}
        <div className="relative pt-10 lg:pt-0">
          {/* Main Card */}
          <div className="bg-white border-4 border-black p-6 shadow-neo rounded-lg relative z-10 animate-float">
            <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 border border-black hover:scale-125 transition-transform"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black hover:scale-125 transition-transform"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 border border-black hover:scale-125 transition-transform"></div>
              </div>
              <div className="font-mono text-xs font-bold text-gray-400">SESSION: DEEP_WORK_01</div>
            </div>

            <div className="space-y-6">
              {/* Waveform Visualization Active Animation */}
              <div className="h-32 bg-gray-100 border-2 border-black flex items-end justify-center gap-1 overflow-hidden px-4 pb-2">
                {[...Array(24)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-2 bg-black rounded-t-sm" 
                    style={{ 
                      height: '20%',
                      animation: `equalizer ${0.6 + Math.random() * 0.6}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * -1}s` 
                    }}
                  ></div>
                ))}
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-display font-bold text-2xl">HyperFocus Mode</span>
                  <span className="font-mono text-sm text-gray-500">Binaural • 40Hz • Rain</span>
                </div>
                <button className="group w-16 h-16 bg-accent border-2 border-black rounded-full flex items-center justify-center hover:bg-accent-hover shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-y-1 active:shadow-none">
                  <Play size={32} fill="black" className="group-hover:scale-110 transition-transform" />
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
          </div>

          {/* Decorative Elements - Animated */}
          <div className="hidden lg:block absolute -bottom-6 -right-6 bg-purple-400 border-2 border-black p-4 shadow-neo z-20 rotate-3 animate-float-delayed">
             <span className="font-mono font-bold text-sm">CURRENT STREAK: 12 DAYS</span>
          </div>
          <div className="hidden lg:block absolute -top-8 -left-8 bg-yellow-300 border-2 border-black p-3 shadow-neo z-0 -rotate-2 animate-wiggle">
             <span className="font-display font-bold text-lg">Focus Score: 98/100</span>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;