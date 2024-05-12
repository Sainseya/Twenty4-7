import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const ENDPOINT = "http://localhost:8000/api";
  const navigate = useNavigate();

  const handleCommonSubmit = async (url: string, data: any) => {
    try {
      const response = await axios.post(`${ENDPOINT}/${url}`, data, {
        headers: { "Content-Type": "application/json" },
      });

      //console.log(response.data);
      localStorage.setItem("token", response.data.token); //! Tempo
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.includes(" ")) {
      console.error(
        "Error: The name field must contain both first name and last name."
      );
      return;
    }

    const nameArray = formData.name.split(" ");
    const firstname = nameArray[0];
    const lastname = nameArray.slice(1).join(" ");
    const data = { firstname, lastname, email: formData.email, password: formData.password };

    await handleCommonSubmit("register", data);
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { email: formData.email, password: formData.password };

    await handleCommonSubmit("login", data);
  };

  return {
    formData,
    setFormData,
    handleSubmitSignUp,
    handleSubmitLogin,
  };
};

export default useAuth;
