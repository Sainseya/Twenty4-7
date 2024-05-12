import React, { FormEventHandler } from "react";
import { motion } from "framer-motion";
import { SiMaildotru } from "react-icons/si";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineFingerPrint } from "react-icons/hi";
import TextInput from "../Input/TextInput";
import PasswordInput from "../Input/PasswordInput";

interface SignUpFormProps {
  onSignUpSubmit: FormEventHandler<HTMLFormElement>;
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

const SignUpForm: React.FC<SignUpFormProps> = ({
  onSignUpSubmit,
  formData,
  setFormData,
  togglePanel,
}) => {
  return (
    <div id="leftSide" className="flex-1">
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight dark:text-txtWhite sm:text-4xl lg:text-5xl">
              Create free account
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed dark:text-txtWhite">
              You can create a free Twenty4/7 in 2 minutes
            </p>
          </div>
          <div className="relative max-w-md mx-auto mt-8 md:mt-16">
            <div className="overflow-hidden bg-light_bg dark:bg-dark_bg2 rounded-md shadow-md">
              <div className="px-4 py-6 sm:px-8 sm:py-7">
                <form onSubmit={onSignUpSubmit}>
                  <div className="space-y-5">
                    <TextInput
                      label="Firstname and lastname"
                      type="text"
                      placeholder="Enter your name"
                      icon={<FaRegUser />}
                      isRequired={true}
                      value={formData.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
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
                      value={formData.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                    />
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="agree"
                        id="agree"
                        required
                        className="w-5 h-5 text-green-400 bg-white border-gray-200 rounded"
                      />

                      <label
                        htmlFor="agree"
                        className="ml-3 text-sm font-medium text-gray-500"
                      >
                        I agree with{" "}
                        <span className="text-blue-600 hover:text-blue-700 hover:underline">
                          Terms of Service
                        </span>{" "}
                        and{" "}
                        <span className="text-blue-600 hover:text-blue-700 hover:underline">
                          Privacy Policy
                        </span>
                      </label>
                    </div>
                    <div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        type="submit"
                        className="inline-flex items-center justify-center w-full p-4 text-base font-semibold text-white bg-purpleButton rounded-md"
                      >
                        Create account
                      </motion.button>
                    </div>

                    <div className="text-center">
                      <p className="text-base dark:text-txtWhite">
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            togglePanel();
                          }}
                          className="font-medium text-green-400 dark:text-txtGreen hover:text-green-600 dark:hover:text-green-500 hover:underline"
                        >
                          Login here
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

export default SignUpForm;
