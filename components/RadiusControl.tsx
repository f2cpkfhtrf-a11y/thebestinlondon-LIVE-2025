import React from 'react';

interface RadiusControlProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export default function RadiusControl({ 
  value, 
  onChange, 
  min = 1, 
  max = 25, 
  className = '' 
}: RadiusControlProps) {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <label className="text-white font-medium" htmlFor="radius-slider">
        Search radius:
      </label>
      <input
        id="radius-slider"
        type="range"
        min={min}
        max={max}
        step="0.5"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="flex-1 h-2 bg-grey-dark rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, #d4af37 0%, #d4af37 ${((value - min) / (max - min)) * 100}%, #374151 ${((value - min) / (max - min)) * 100}%, #374151 100%)`
        }}
      />
      <div className="min-w-[4rem] text-gold font-semibold text-center">
        {value.toFixed(1)} km
      </div>
    </div>
  );
}
