
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
        <path d="M12 2v6M12 22v-6M4.93 10.93l1.41 1.41M19.07 10.93l-1.41 1.41M2 18h2M20 18h2M20 14h2M2 14h2M14 22h2M8 22h2M14 2h2M8 2h2" />
      </svg>
    </div>
  );
}

export default Water3DLogo;
