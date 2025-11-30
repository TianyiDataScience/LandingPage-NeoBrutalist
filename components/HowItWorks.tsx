import React from 'react';
import Section from './ui/Section';
import { ArrowRight } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <Section className="bg-purple-100">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16">
        <h2 className="font-display font-bold text-4xl md:text-5xl flex-shrink-0">How it works</h2>
        <div className="h-1 bg-black w-full flex-grow hidden md:block"></div>
        <p className="text-xl font-bold flex-shrink-0">Three steps to Flow State.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative">
        {[
          {
            step: "01",
            title: "Pick your goal",
            desc: "Tell FlowState what you're doing: Deep Coding, Creative Writing, or Decompressing."
          },
          {
            step: "02",
            title: "AI generates the vibe",
            desc: "Our engine analyzes your time of day and energy levels to create a unique soundscape."
          },
          {
            step: "03",
            title: "Lock In",
            desc: "The audio evolves in real-time. No loops. No distractions. Just pure focus."
          }
        ].map((item, i) => (
          <div key={i} className="relative group hover:-translate-y-2 transition-transform duration-300 ease-out">
            <div className="absolute -top-6 -left-2 font-display font-bold text-8xl text-purple-200 z-0 group-hover:text-accent transition-colors duration-300">
              {item.step}
            </div>
            <div className="relative z-10 border-l-4 border-black pl-6 py-2">
              <h3 className="font-display font-bold text-2xl mb-2">{item.title}</h3>
              <p className="font-medium text-lg">{item.desc}</p>
            </div>
             {i < 2 && (
               <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20 animate-bounce-x text-black">
                 <ArrowRight size={32} strokeWidth={3} />
               </div>
             )}
          </div>
        ))}
      </div>
    </Section>
  );
};

export default HowItWorks;