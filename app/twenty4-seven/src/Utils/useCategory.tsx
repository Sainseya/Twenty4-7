import React, { useState, useEffect } from "react";
import axios from "axios";

const useCategory = () => {
  const [categoryData, setCategoryData] = useState([])

  const ENDPOINT = "http://localhost:8000/categories"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ENDPOINT);

        setCategoryData(response.data);
      } catch (error) {
        console.error("Error fetching category data: ", error);
      }
    };

    fetchData();
  }, []);

  return {
    categoryData,
  };
};

export default useCategory;
