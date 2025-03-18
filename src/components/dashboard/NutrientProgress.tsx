
import React from 'react';

interface NutrientProgressProps {
  label: string;
  value: number;
  status: 'success' | 'warning' | 'danger';
}

export const NutrientProgress: React.FC<NutrientProgressProps> = ({ 
  label, 
  value, 
  status 
}) => {
  // Determine the color based on status
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-amber-500';
      case 'danger':
        return 'bg-red-500';
      default:
        return 'bg-sky-500';
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-500">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div 
          className={`h-1.5 rounded-full ${getStatusColor()}`} 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};
