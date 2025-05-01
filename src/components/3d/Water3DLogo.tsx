
import React from 'react';

interface WaterLogoProps {
  className?: string;
}

export function Water3DLogo({ className = "" }: WaterLogoProps) {
  return (
    <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 ${className}`}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-6 h-6 text-white"
      >
        <path d="M12 2L8 7H16L12 2Z" />
        <path d="M8 7L4 12H12L8 7Z" />
        <path d="M16 7L12 12H20L16 7Z" />
        <path d="M4 12L2 14H10L4 12Z" />
        <path d="M12 12L10 14H14L12 12Z" />
        <path d="M20 12L14 14H22L20 12Z" />
        <path d="M2 14L2 17H22L22 14L2 14Z" />
        <path d="M2 17L0 22H24L22 17L2 17Z" />
      </svg>
    </div>
  );
}

export default Water3DLogo;
