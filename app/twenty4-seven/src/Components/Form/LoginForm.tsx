import React, { FormEventHandler } from "react";
import { motion } from "framer-motion";
import { SiMaildotru } from "react-icons/si";
import { HiOutlineFingerPrint } from "react-icons/hi";
import TextInput from "../Input/TextInput";
import PasswordInput from "../Input/PasswordInput";

interface LoginFormProps {
  onLoginSubmit: FormEventHandler<HTMLFormElement>;
  formData: { name: string; email: string; password: string };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      password: string;
    }>
  >;
  togglePanel: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLoginSubmit,
  formData,
  setFormData,
  togglePanel,
}) => {
  return (
    <div id="rightSide" className="flex-1">
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight dark:text-txtWhite sm:text-4xl lg:text-5xl">
              Welcome Back!
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed dark:text-txtWhite">
              Login to your account
            </p>
          </div>
          <div className="relative max-w-md mx-auto mt-8 md:mt-16">
            <div className="overflow-hidden bg-light_bg dark:bg-dark_bg2 rounded-md shadow-md">
              <div className="px-4 py-6 sm:px-8 sm:py-7">
                <form onSubmit={onLoginSubmit}>
                  <div className="space-y-5">
                    <TextInput
                      label="Email address"
                      type="email"
                      placeholder="Enter your email"
                      icon={<SiMaildotru />}
                      isRequired={true}
                      value={formData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <PasswordInput
                      label="Password"
                      placeholder="Enter your password"
                      icon={<HiOutlineFingerPrint />}
                      showForgotPassword={false}
                      value={formData.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                    />
                    <div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        type="submit"
                        className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white bg-purpleButton border border-transparent rounded-md focus:outline-none"
                      >
                        Log in
                      </motion.button>
                    </div>

                    <div className="text-center">
                      <p className="text-base dark:text-txtWhite">
                        Don't have an account?{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            togglePanel();
                          }}
                          className="font-medium text-green-400 dark:text-txtGreen hover:text-green-600 dark:hover:text-green-500 hover:underline"
                        >
                          Create a free account
                        </button>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
