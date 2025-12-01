import React from 'react';
import Section from './ui/Section';
import PomodoroTimer from './PomodoroTimer';
import { motion } from 'framer-motion';

const HowItWorks: React.FC = () => {
  const steps = [
    { num: "01", title: "Select Mode", desc: "Choose from Deep Work, Creative Flow, or ADHD Rescue." },
    { num: "02", title: "Press Play", desc: "AI generates a unique soundscape based on your current state." },
    { num: "03", title: "Lock In", desc: "Binaural beats entrain your brainwaves to 40Hz (Gamma) focus." },
  ];

  return (
    <Section id="how-it-works" className="bg-white">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl mb-6"
          >
            Science-backed focus.<br/>
            <span className="text-gray-400">Not just white noise.</span>
          </motion.h2>
          
          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex gap-4 group"
              >
                <div className="font-mono font-bold text-accent text-xl mt-1 group-hover:translate-x-1 transition-transform">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-accent/20 rounded-full blur-3xl -z-10"></div>
          <div className="text-center mb-4 font-bold text-gray-500">TRY IT NOW</div>
          <PomodoroTimer />
        </motion.div>
      </div>
    </Section>
  );
};

export default HowItWorks;