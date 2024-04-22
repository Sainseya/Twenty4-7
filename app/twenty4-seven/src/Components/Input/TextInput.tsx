import React, { ReactNode } from 'react';

interface TextInputProps {
    label: string;
    type: string;
    placeholder: string;
    icon?: ReactNode; //* Optionnel: permet de spécifier une icône pour le champ de texte
  }

const TextInput: React.FC<TextInputProps> = ({ label, type, placeholder, icon }) => {
    return (
      <div>
        <label htmlFor="" className="text-base font-medium text-gray-900">
          {label}
        </label>
        <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {icon}
            </div>
          )}
  
          <input
            type={type}
            placeholder={placeholder}
            className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
          />
        </div>
      </div>
    );
  };

export default TextInput