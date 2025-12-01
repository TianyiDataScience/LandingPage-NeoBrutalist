import React, { useState } from 'react';
import Section from './ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Do I need a credit card for the free trial?",
      a: "No. Just sign up with your email. If you don't love it after 7 days, your account simply pauses. No sneaky charges."
    },
    {
      q: "Will this actually work for my ADHD?",
      a: "We can't promise medical miracles, but FlowState was built by a dev with ADHD. It uses scientifically backed 'Brown Noise' and binaural beats designed to quiet the prefrontal cortex."
    },
    {
      q: "Can I use this offline?",
      a: "Yes. You can download generated sessions to your device so you can focus on planes, trains, or in bunkers."
    },
    {
      q: "Is it just looping rain sounds?",
      a: "No. It's generative audio. That means our engine combines layers of textures, frequencies, and rhythms in real-time. It never repeats exactly, so your brain doesn't get bored."
    }
  ];

  return (
    <Section id="faq" className="bg-paper">
      <h2 className="font-display font-bold text-4xl mb-12 text-center">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((item, i) => (
          <div 
            key={i} 
            className="border-2 border-black bg-white shadow-neo rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-bold text-lg font-display">{item.q}</span>
              <div className="bg-black text-white p-1 rounded-full">
                {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
              </div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 text-gray-700 font-medium leading-relaxed border-t-2 border-black/5 pt-2">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default FAQ;