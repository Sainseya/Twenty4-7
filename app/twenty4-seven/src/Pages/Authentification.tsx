import { useState } from "react";
import { SiMaildotru } from "react-icons/si";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineFingerPrint } from "react-icons/hi";
import TextInput from "../Components/Input/TextInput";
import PasswordInput from "../Components/Input/PasswordInput";

const Authentification: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="flex flex-row items-center h-screen bg-slate-50">
      <div id="leftSide" className="flex-1">
        <section className="py-10 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Create free account
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                You can create a free Twenty4/7 in 2 minutes
              </p>
            </div>

            <div className="relative max-w-md mx-auto mt-8 md:mt-16">
              <div className="overflow-hidden bg-white rounded-md shadow-md">
                <div className="px-4 py-6 sm:px-8 sm:py-7">
                  <form action="">
                    <div className="space-y-5">
                      <TextInput
                        label="Name"
                        type="text"
                        placeholder="Enter your name"
                        icon={<FaRegUser />}
                      />
                      <TextInput
                        label="Email address"
                        type="email"
                        placeholder="Enter your email"
                        icon={<SiMaildotru />}
                      />
                      <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        icon={<HiOutlineFingerPrint />}
                      />
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="agree"
                          id="agree"
                          className="w-5 h-5 text-green-500 bg-white border-gray-200 rounded"
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
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                        >
                          Create account
                        </button>
                      </div>

                      <div className="text-center">
                        <p className="text-base text-gray-600">
                          Already have an account?{" "}
                          <a
                            href=""
                            onClick={(e) => {
                              e.preventDefault();
                              togglePanel();
                            }}
                            className="font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 hover:underline"
                          >
                            Login here
                          </a>
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
        <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Welcome Back!
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                Login to your account
              </p>
            </div>

            <div className="relative max-w-md mx-auto mt-8 md:mt-16">
              <div className="overflow-hidden bg-white rounded-md shadow-md">
                <div className="px-4 py-6 sm:px-8 sm:py-7">
                  <form action="#" method="POST">
                    <div className="space-y-5">
                      <TextInput
                        label="Email address"
                        type="email"
                        placeholder="Enter your email"
                        icon={<SiMaildotru />}
                      />
                      <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        icon={<HiOutlineFingerPrint />}
                        showForgotPassword={false}
                      />
                      <div>
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                        >
                          Log in
                        </button>
                      </div>

                      <div className="text-center">
                        <p className="text-base text-gray-600">
                          Don’t have an account?{" "}
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              togglePanel();
                            }}
                            className="font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 hover:underline"
                          >
                            Create a free account
                          </a>
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
        className={`absolute h-full w-1/2 z-10 bg-[#d4d4d4] ${
          isPanelOpen ? "translate-x-0" : "translate-x-[100%]"
        } transition-transform duration-300 ease-in-out`}
      ></div>
    </div>
  );
};

export default Authentification;
