
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description,
  delay = 0 
}) => {
  return (
    <div 
      className="feature-card animate-slide-in-bottom"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-full bg-nurturing-100 flex items-center justify-center mb-4">
        <Icon className="text-nurturing-600" size={22} />
      </div>
      <h3 className="text-xl font-semibold text-nurturing-900 mb-2">{title}</h3>
      <p className="text-nurturing-700">{description}</p>
    </div>
  );
};

export default FeatureCard;
