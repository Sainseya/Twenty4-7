import { useState } from "react";
import axios from "axios";

const useUpdateUser = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    bio: "",
  });

  const ENDPOINT = "http://localhost:8000/user";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(
        ([_, value]) => value !== " " && value !== null
      )
    );

    try {
      const response = await axios.put(ENDPOINT, filteredData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(response.data);
      //? add toster here
    } catch (error) {
      console.error("Error form update user : ", error);
    }
  };

  return {
    formData,
    setFormData,
    handleSubmit,
  };
};

export default useUpdateUser;
