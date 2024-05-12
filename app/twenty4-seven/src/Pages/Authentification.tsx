import React, { useState } from "react";
import { motion } from "framer-motion";
import { SiMaildotru } from "react-icons/si";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineFingerPrint } from "react-icons/hi";
import TextInput from "../Components/Input/TextInput";
import PasswordInput from "../Components/Input/PasswordInput";
import "../CSS/Blob404Style.css";
import { ReactComponent as LogoDark } from "../Assets/LogoWebDark.svg";
import { ReactComponent as LogoLight } from "../Assets/LogoWebLight.svg";
//Hook
import useAuth from "../Utils/useAuth";
import { useTheme } from "../Utils/ThemeContext";

const Authentification: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { formData, setFormData, handleSubmitSignUp, handleSubmitLogin } =
    useAuth();
  const { theme } = useTheme();
  const LogoComponent = theme === 'dark' ? LogoDark : LogoLight;

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="containerBlob">
      <div className="blob-c">
        <div className="shape-blob"></div>
        <div className="shape-blob one"></div>
        <div className="shape-blob two"></div>
        <div className="shape-blob three"></div>
        <div className="shape-blob four"></div>
        <div className="shape-blob five"></div>
        <div className="shape-blob six"></div>
      </div>

      <div className="absolute flex flex-row w-full items-center h-screen">
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
                    <form onSubmit={handleSubmitSignUp}>
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
                            className="w-5 h-5 text-txtGreen bg-white border-gray-200 rounded"
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
                    <form onSubmit={handleSubmitLogin}>
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
        <div
          id="panelSlide"
          className={`absolute h-full w-1/2 z-10 dark:bg-dark_border ${
            isPanelOpen
              ? "translate-x-0 rounded-r-full"
              : "translate-x-[100%] rounded-l-full"
          } transition-all duration-500 ease-in-out`}
        >
          <div
            className={`size-full bg-transparent border-[24px] border-dark_border  ${
              isPanelOpen ? "rounded-r-full" : "rounded-l-full"
            } transition-all duration-500 ease-in-out 
            flex flex-col items-center justify-center gap-4`}
          >
            <div className="dark:text-txtWhite font-semibold text-4xl">Twenty4/7</div>
            <LogoComponent style={{ width: "124px", height: "124px" }} />
            <div className="mt-8 dark:text-txtWhite text-2xl">The E-commerce site for influencers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentification;
