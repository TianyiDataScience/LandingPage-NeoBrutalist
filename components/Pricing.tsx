import React, { useState } from 'react';
import Section from './ui/Section';
import Button from './ui/Button';
import { Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      name: "Monthly",
      price: "$9",
      period: "/mo",
      desc: "Perfect for short-term sprints.",
      features: [
        "Unlimited Focus Sessions",
        "All 5 Soundscapes",
        "Basic Analytics",
        "Web Access Only"
      ],
      cta: "Start Monthly",
      popular: false
    },
    {
      name: "Yearly",
      price: "$69",
      period: "/yr",
      desc: "Commit to deep work. Save 30%.",
      features: [
        "Everything in Monthly",
        "Offline Mode",
        "Advanced Brainwave Entrainment",
        "Priority Support",
        "Early Access to New Features"
      ],
      cta: "Start Yearly",
      popular: true
    }
  ];

  return (
    <Section id="pricing" className="bg-accent border-y-4 border-black py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-5xl mb-6">Invest in your attention.</h2>
          <p className="text-xl font-medium max-w-2xl mx-auto mb-8">
            Cheaper than a single coffee per month. How much is an hour of deep work worth to you?
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`font-bold ${!isYearly ? 'text-black' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-16 h-8 bg-black rounded-full relative p-1 transition-colors"
            >
              <motion.div 
                className="w-6 h-6 bg-white rounded-full border-2 border-black"
                animate={{ x: isYearly ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`font-bold ${isYearly ? 'text-black' : 'text-gray-500'}`}>
              Yearly <span className="text-xs bg-white border border-black px-1 py-0.5 rounded ml-1 text-red-500">-30%</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`bg-white border-4 border-black p-8 rounded-xl relative ${plan.popular ? 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] scale-105 z-10' : 'shadow-neo'}`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 font-bold border-2 border-black flex items-center gap-2 rotate-1">
                  <Star size={14} fill="white" /> MOST POPULAR
                </div>
              )}

              <h3 className="font-display font-bold text-3xl mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-black">{isYearly && plan.name === "Monthly" ? "$9" : isYearly && plan.name === "Yearly" ? "$69" : plan.price}</span>
                <span className="text-gray-500 font-bold">{plan.period}</span>
              </div>
              <p className="text-gray-600 font-medium mb-8 border-b-2 border-gray-100 pb-6">
                {plan.desc}
              </p>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3 font-medium">
                    <div className="bg-accent p-0.5 rounded-full border border-black mt-0.5">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              <Button 
                size="lg" 
                className={`w-full ${plan.popular ? 'bg-accent hover:bg-accent-hover' : 'bg-white text-black hover:bg-gray-100'}`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-bold text-gray-600 mb-2">Looking for a lifetime deal?</p>
          <a href="#" className="font-black text-lg underline decoration-2 decoration-black hover:text-accent-dark transition-colors">
            Get Lifetime Access for $199 (Limited Time)
          </a>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
