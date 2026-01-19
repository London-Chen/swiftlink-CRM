import React from 'react';
import { MapPin } from 'lucide-react';
import { Coordinate } from '../types';

interface LocationPickerProps {
  value?: Coordinate;
  onChange?: (coord: Coordinate) => void;
  readOnly?: boolean;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({ value, onChange, readOnly = false }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (readOnly || !onChange) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onChange({ x, y });
  };

  return (
    <div 
      className={`relative w-full h-48 bg-slate-100 rounded-lg border-2 border-dashed ${readOnly ? 'border-gray-200 cursor-default' : 'border-gray-300 hover:border-blue-400 cursor-crosshair'} overflow-hidden transition-colors`}
      onClick={handleClick}
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', 
             backgroundSize: '20px 20px' 
           }}>
      </div>

      {/* Map Labels Simulation */}
      <div className="absolute top-2 left-2 text-xs text-slate-400 font-mono">MAP VIEW v2.4</div>
      <div className="absolute bottom-2 right-2 text-xs text-slate-400 font-mono">LAT/LNG MODE</div>

      {/* The Pin */}
      {value && (
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-full transition-all duration-300 ease-out"
          style={{ left: `${value.x}%`, top: `${value.y}%` }}
        >
          <MapPin className="w-8 h-8 text-red-500 fill-red-500 drop-shadow-md" />
          <div className="w-2 h-1 bg-black/20 rounded-full mx-auto mt-[-2px] blur-[1px]"></div>
        </div>
      )}
      
      {!value && !readOnly && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
          <span className="text-sm">Click to select location</span>
        </div>
      )}
    </div>
  );
};