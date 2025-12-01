import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 24); // Center of 48px
      cursorY.set(e.clientY - 24);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.closest('[role="button"]')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  // If not visible yet (mouse hasn't moved), don't render to avoid artifacts
  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor Circle - Magnetic Spring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border-2 border-black rounded-full pointer-events-none z-[9999] bg-white/10 backdrop-blur-[1px]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? "rgba(163, 230, 53, 1)" : "rgba(0, 0, 0, 1)", // Accent color on hover
          borderWidth: isHovering ? 4 : 2,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      
      {/* Center Dot - Solid & Sharp */}
      <motion.div 
        className="fixed top-0 left-0 w-6 h-6 bg-accent border-2 border-black rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX, 
          y: cursorY,
          translateX: 12, // Center inside the 48px circle (24 - 12)
          translateY: 12
        }}
        animate={{
          scale: isHovering ? 0.5 : 1, // Shrink dot slightly on hover for focus
        }}
      />
    </>
  );
};

export default CustomCursor;
