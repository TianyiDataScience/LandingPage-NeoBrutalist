import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  ...props 
}) => {
  const baseStyles = "font-display font-bold border-2 border-black transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-neo-hover disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-accent hover:bg-accent-hover text-black shadow-neo",
    secondary: "bg-white hover:bg-gray-50 text-black shadow-neo",
    outline: "bg-transparent hover:bg-black hover:text-white text-black shadow-none border-black",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg md:text-xl",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;