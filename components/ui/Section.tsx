import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  grid?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, className = '', id, grid = false }) => {
  return (
    <section id={id} className={`py-16 md:py-24 px-4 md:px-8 border-b-2 border-black last:border-b-0 ${className}`}>
      <div className={`max-w-6xl mx-auto ${grid ? 'bg-dots' : ''}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;