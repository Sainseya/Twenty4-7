import React, { useState, ReactNode } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

interface PasswordInputProps {
  label: string;
  placeholder: string;
  icon?: ReactNode; //* Optionnel: permet de spécifier une icône pour le champ de texte
  showForgotPassword?: boolean; //* Optionnel: afficher le lien "Forgot password"
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  placeholder,
  icon,
  showForgotPassword = false,
  value,
  onChange
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor="passwordInput"
          className="text-base font-medium dark:text-txtWhite"
        >
          {label}
        </label>
        {showForgotPassword && (
          <button
            type="button"
            title="Forgot password?"
            className="text-sm font-medium text-green-400 dark:text-txtGreen hover:text-green-600 dark:hover:text-green-500 hover:underline"
          >
            Forgot password ?
          </button>
        )}
      </div>
      <div className="mt-2.5 relative text-txtPlaceholder">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="block w-full py-4 pl-10 pr-14 text-txtBlack dark:text-txtWhite placeholder-txtPlaceholder bg-light_bg border dark:bg-dark_txtZone border-light_border dark:border-dark_border rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
          required
          value={value}
          onChange={onChange}
        />

        <div
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={togglePasswordVisibility}
          data-testid="eye-icon"
        >
          {showPassword ? <HiEye /> : <HiEyeOff />}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
