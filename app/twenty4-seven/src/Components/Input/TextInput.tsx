import React, { ReactNode } from 'react';

interface TextInputProps {
    label: string;
    type: string;
    placeholder: string;
    icon?: ReactNode; //* Optionnel: permet de spécifier une icône pour le champ de texte
    isRequired?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

const TextInput: React.FC<TextInputProps> = ({ label, type, placeholder, icon, isRequired, value, onChange }) => {
    return (
      <div>
        <label htmlFor="" className="text-base font-medium dark:text-txtWhite">
          {label}
        </label>
        <div className="mt-2.5 relative text-txtPlaceholder">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {icon}
            </div>
          )}
  
          <input
            type={type}
            placeholder={placeholder}
            className="block w-full py-4 pl-10 pr-4 text-txtBlack dark:text-txtWhite placeholder-txtPlaceholder bg-light_bg border dark:bg-dark_txtZone border-light_border dark:border-dark_border rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
            required={isRequired}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    );
  };

export default TextInput