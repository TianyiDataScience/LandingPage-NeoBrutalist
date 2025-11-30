import React from 'react';
import Section from './ui/Section';
import { Box, Clock, Sliders, Zap, Download, Activity } from 'lucide-react';

const Deliverables: React.FC = () => {
  const items = [
    { Icon: Activity, title: "Infinite Soundscapes", desc: "Never hear the same loop twice. Audio is generated procedurally in real-time." },
    { Icon: Clock, title: "Pomodoro Integration", desc: "Built-in customizable timers that fade audio in and out for breaks." },
    { Icon: Zap, title: "Neuro-adaptive Audio", desc: "Binaural beats that automatically adjust frequency to guide your brainwaves." },
    { Icon: Download, title: "Offline Mode", desc: "Download 60-minute generated blocks to focus on airplanes or in dead zones." },
    { Icon: Sliders, title: "Mix Controls", desc: "Too much rain? Not enough lo-fi crackle? Adjust individual stems instantly." },
    { Icon: Box, title: "Focus Analytics", desc: "Track your deep work hours and find your peak productivity window." },
  ];

  return (
    <Section className="bg-paper">
      <div className="mb-12">
        <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">What you get inside</h2>
        <p className="text-xl">Everything you need to ship faster.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <div key={i} className="group flex items-start gap-4 p-4 border-2 border-transparent hover:border-black hover:bg-white hover:shadow-neo transition-all rounded-lg">
            <div className="bg-accent p-3 border-2 border-black flex-shrink-0 group-hover:rotate-6 transition-transform duration-300">
              <item.Icon size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl mb-1">{item.title}</h3>
              <p className="text-gray-700 font-medium">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Deliverables;