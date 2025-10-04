
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export const Input: React.FC<InputProps> = ({ label, id, className, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-brand-text-secondary mb-2">
        {label}
      </label>
      <input
        id={id}
        className={`w-full bg-brand-secondary border border-gray-600 rounded-lg px-3 py-2 text-brand-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 ${className}`}
        {...props}
      />
    </div>
  );
};
