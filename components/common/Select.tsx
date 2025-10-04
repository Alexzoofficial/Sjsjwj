
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, id, options, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-brand-text-secondary mb-2">
        {label}
      </label>
      <select
        id={id}
        className="w-full bg-brand-secondary border border-gray-600 rounded-lg px-3 py-2 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200"
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
