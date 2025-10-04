
import React from 'react';

interface CardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-brand-surface rounded-xl shadow-lg border border-gray-800 overflow-hidden">
      <div className="p-5 border-b border-gray-800 flex items-center space-x-3">
        {icon && <div className="text-brand-primary">{icon}</div>}
        <h2 className="text-xl font-bold text-brand-text">{title}</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
