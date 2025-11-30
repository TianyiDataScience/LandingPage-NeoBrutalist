import React from 'react';
import Section from './ui/Section';

const FAQ: React.FC = () => {
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
    <Section className="bg-paper">
      <h2 className="font-display font-bold text-4xl mb-12 text-center">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((item, i) => (
          <details key={i} className="group border-2 border-black bg-white shadow-neo open:shadow-none open:translate-x-[4px] open:translate-y-[4px] transition-all">
            <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-lg list-none select-none">
              <span>{item.q}</span>
              <span className="transform group-open:rotate-180 transition-transform text-2xl">▼</span>
            </summary>
            <div className="px-6 pb-6 text-gray-800 font-medium leading-relaxed border-t-2 border-black/10 pt-4">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
};

export default FAQ;