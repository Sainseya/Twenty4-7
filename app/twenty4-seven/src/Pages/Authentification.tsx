import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SiMaildotru } from "react-icons/si";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineFingerPrint } from "react-icons/hi";
import TextInput from "../Components/Input/TextInput";
import PasswordInput from "../Components/Input/PasswordInput";

const Authentification: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ENDPOINT = "http://localhost:8000";

  let navigate = useNavigate();

  const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.includes(" ")) {
      console.error(
        "Error: The name field must contain both first name and last name."
      );
      return;
    }

    const nameArray = name.split(" ");
    const firstname = nameArray[0];
    const lastname = nameArray.slice(1).join(" ");
    const data = { firstname, lastname, email, password };

    console.log("Sing Up Data : " + data);

    try {
      const response = await axios.post(
        `${ENDPOINT}/register`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { email, password }
    console.log("Login Data : " + data);
    
    try {
      const response = await axios.post(
        `${ENDPOINT}/login`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error('Error:', error); 
      // Afficher un message d'erreur à l'utilisateur ou prendre d'autres mesures nécessaires
    }
  };

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
                  <form onSubmit={handleSubmitSignUp}>
                    <div className="space-y-5">
                      <TextInput
                        label="Firstname and lastname"
                        type="text"
                        placeholder="Enter your name"
                        icon={<FaRegUser />}
                        isRequired={true}
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setName(e.target.value)
                        }
                      />
                      <TextInput
                        label="Email address"
                        type="email"
                        placeholder="Enter your email"
                        icon={<SiMaildotru />}
                        isRequired={true}
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setEmail(e.target.value)
                        }
                      />
                      <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        icon={<HiOutlineFingerPrint />}
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPassword(e.target.value)
                        }
                      />
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="agree"
                          id="agree"
                          required
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
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              togglePanel();
                            }}
                            className="font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 hover:underline"
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
                  <form onSubmit={handleSubmitLogin}>
                    <div className="space-y-5">
                      <TextInput
                        label="Email address"
                        type="email"
                        placeholder="Enter your email"
                        icon={<SiMaildotru />}
                        isRequired={true}
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setEmail(e.target.value)}
                      />
                      <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        icon={<HiOutlineFingerPrint />}
                        showForgotPassword={false}
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPassword(e.target.value)}
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
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              togglePanel();
                            }}
                            className="font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 hover:underline"
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
        className={`absolute h-full w-1/2 z-10 bg-[#d4d4d4] ${
          isPanelOpen ? "translate-x-0" : "translate-x-[100%]"
        } transition-transform duration-300 ease-in-out`}
      ></div>
    </div>
  );
};

export default Authentification;
