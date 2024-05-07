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

  const ENDPOINT = "http://localhost:8000";

  return {
    formData,
    setFormData,
  }

};

export default useUpdateUser;
