import React from 'react';
import Section from './ui/Section';
import Button from './ui/Button';

const DesignSystem: React.FC = () => {
  return (
    <Section className="bg-black text-white py-24">
      <div className="mb-16">
        <div className="inline-block bg-accent text-black px-3 py-1 font-bold text-sm mb-4">
          BUILDER'S KIT
        </div>
        <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">
          Steal this design system.
        </h2>
        <p className="text-gray-400 text-xl max-w-2xl">
          We built FlowState using a "Neo-Brutalist" aesthetic. It's bold, high-contrast, and impossible to ignore. Here are the raw ingredients.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Colors */}
        <div className="space-y-6">
          <h3 className="font-mono text-xl text-gray-500 mb-4">01. COLOR PALETTE</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-accent border-2 border-white rounded-lg"></div>
              <div className="font-mono text-sm">
                <p className="font-bold">Lime Accent</p>
                <p className="text-gray-500">#a3e635</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-paper border-2 border-white rounded-lg"></div>
              <div className="font-mono text-sm">
                <p className="font-bold">Warm Paper</p>
                <p className="text-gray-500">#fffdf5</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-purple-600 border-2 border-white rounded-lg"></div>
              <div className="font-mono text-sm">
                <p className="font-bold">Deep Purple</p>
                <p className="text-gray-500">#9333ea</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-dark border-2 border-white rounded-lg"></div>
              <div className="font-mono text-sm">
                <p className="font-bold">Off Black</p>
                <p className="text-gray-500">#18181b</p>
              </div>
            </div>
          </div>
        </div>

        {/* Typography & Components */}
        <div className="space-y-12">
          <div>
            <h3 className="font-mono text-xl text-gray-500 mb-6">02. TYPOGRAPHY</h3>
            <div className="space-y-4 bg-white/5 p-6 rounded-xl border border-white/10">
              <div>
                <p className="font-mono text-xs text-gray-500 mb-1">Display Font</p>
                <p className="font-display text-4xl font-bold">Space Grotesk</p>
              </div>
              <div>
                <p className="font-mono text-xs text-gray-500 mb-1">Body Font</p>
                <p className="font-body text-xl">Inter (Variable)</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xl text-gray-500 mb-6">03. COMPONENTS</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button>Primary Button</Button>
              <button className="px-6 py-3 font-bold border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors">
                Secondary
              </button>
              <div className="w-12 h-12 bg-accent border-2 border-white rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_#ffffff]">
                <span className="text-black font-bold">UI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default DesignSystem;
