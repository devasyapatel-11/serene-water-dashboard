
import React from 'react';

interface WaterBackgroundProps {
  className?: string;
}

export default function WaterBackground({ className = "" }: WaterBackgroundProps) {
  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-[-1] opacity-50 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #a0d8ef 0%, #3399ff 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
      }}
    />
  );
}
