import React from 'react';
import Section from './ui/Section';

const AudienceCheck: React.FC = () => {
  return (
    <Section className="bg-white">
      <div className="text-center mb-12">
        <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">Are you tired of "just focus harder"?</h2>
        <p className="text-xl font-medium">This tool is specifically built for you if...</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "The Procrastinating Student",
            desc: "You have a 3,000-word essay due tomorrow, you've written 12 words, and you're currently researching ergonomic keyboards instead of writing.",
            emoji: "📚"
          },
          {
            title: "The Solo Freelancer",
            desc: "You sit down to code at 9 AM, blink, and suddenly it's 2 PM and you've only rearranged your Trello board three times.",
            emoji: "💻"
          },
          {
            title: "The ADHD Mind",
            desc: "Silence is deafening, music is distracting, and white noise is boring. You need that 'goldilocks' zone of stimulation to function.",
            emoji: "🧠"
          }
        ].map((item, i) => (
          <div key={i} className="border-2 border-black p-6 shadow-neo bg-paper hover:-translate-y-1 transition-transform">
            <div className="text-4xl mb-4">{item.emoji}</div>
            <h3 className="font-display font-bold text-xl mb-3">You're a {item.title} who...</h3>
            <p className="font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default AudienceCheck;