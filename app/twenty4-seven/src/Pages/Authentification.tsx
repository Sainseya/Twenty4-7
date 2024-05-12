import "../CSS/Blob404Style.css";
import React, { useState } from "react";
import TransitionPanel from "../Components/TransitionPanel";
import SignUpForm from "../Components/Form/SignUpForm";
import LoginForm from "../Components/Form/LoginForm";
//Hook
import useAuth from "../Utils/useAuth";

const Authentification: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { formData, setFormData, handleSubmitSignUp, handleSubmitLogin } =
    useAuth();
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
        <SignUpForm
          formData={formData}
          setFormData={setFormData}
          togglePanel={togglePanel}
          onSignUpSubmit={handleSubmitSignUp}
        />
        <LoginForm
          formData={formData}
          setFormData={setFormData}
          togglePanel={togglePanel}
          onLoginSubmit={handleSubmitLogin}
        />
        <TransitionPanel isPanelOpen={isPanelOpen} />
      </div>
    </div>
  );
};

export default Authentification;
