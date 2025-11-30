import React from 'react';
import Section from './ui/Section';

const Features: React.FC = () => {
  return (
    <Section className="bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display font-bold text-3xl mb-8 border-b-2 border-white/30 pb-4">
          Built for the obsessives.
        </h2>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {[
            {
              title: "Brown Noise Generator",
              desc: "Specifically tuned for ADHD brains to calm internal monologue."
            },
            {
              title: "Spotify Integration",
              desc: "Layer your own playlists underneath our focus frequencies."
            },
            {
              title: "Visual Breathing",
              desc: "On-screen guides to help you reset when anxiety spikes."
            },
            {
              title: "Dark Mode Native",
              desc: "Because nobody wants to stare at a lightbulb at 2 AM."
            }
          ].map((feature, i) => (
            <div key={i}>
              <h3 className="font-bold text-accent text-lg mb-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                {feature.title}
              </h3>
              <p className="text-gray-300 pl-4">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Features;