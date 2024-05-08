import { useState } from "react";
import axios from "axios";

interface Category {
  id: number;
  type: string;
  bio: string;
}

const useCategory = () => {
  const [categoryData, setCategoryData] = useState<Category[]>([]);

  const ENDPOINT = "http://localhost:8000/api/catalog";

  const fetchData = async () => {
    try {
      const response = await axios.get(ENDPOINT);

      setCategoryData(response.data.catalogs);
      console.log("Response Axios :", categoryData);
    } catch (error) {
      console.error("Error fetching category data: ", error);
    }
  };

  return {
    categoryData,
    fetchData,
  };
};

export default useCategory;
