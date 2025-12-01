import React from 'react';
import Section from './ui/Section';
import { BookOpen, Terminal, BrainCircuit, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AudienceCheck: React.FC = () => {
  const cards = [
    {
      title: "The Procrastinating Student",
      desc: "You have a 3,000-word essay due tomorrow, you've written 12 words, and you're currently researching ergonomic keyboards instead of writing.",
      icon: BookOpen,
      color: "bg-yellow-400",
      rotate: "rotate-1"
    },
    {
      title: "The Solo Freelancer",
      desc: "You sit down to code at 9 AM, blink, and suddenly it's 2 PM and you've only rearranged your Trello board three times.",
      icon: Terminal,
      color: "bg-blue-400",
      rotate: "-rotate-1"
    },
    {
      title: "The ADHD Mind",
      desc: "Silence is deafening, music is distracting, and white noise is boring. You need that 'goldilocks' zone of stimulation to function.",
      icon: BrainCircuit,
      color: "bg-red-400",
      rotate: "rotate-2"
    }
  ];

  return (
    <Section className="bg-paper relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-6xl mb-6 tracking-tighter"
          >
            Are you tired of <br/>
            <span className="bg-black text-white px-4 transform -skew-x-6 inline-block">"just focus harder"?</span>
          </motion.h2>
          <p className="text-xl font-medium text-gray-600">This tool is specifically built for you if...</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`group bg-white border-4 border-black p-8 rounded-2xl shadow-neo relative overflow-hidden ${item.rotate}`}
            >
              {/* Decorative Number */}
              <div className="absolute -right-4 -top-4 text-9xl font-black text-gray-100 -z-10 select-none">
                0{i + 1}
              </div>

              {/* Icon Container */}
              <div className={`w-16 h-16 ${item.color} border-2 border-black rounded-xl flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:rotate-6`}>
                <item.icon size={32} strokeWidth={2.5} className="text-black" />
              </div>

              <h3 className="font-display font-bold text-2xl mb-4 leading-tight">
                {item.title}
              </h3>
              <p className="font-medium text-gray-600 leading-relaxed mb-6">
                {item.desc}
              </p>

              <div className="flex items-center gap-2 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                <span className="underline decoration-2">That's me</span>
                <ArrowRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default AudienceCheck;