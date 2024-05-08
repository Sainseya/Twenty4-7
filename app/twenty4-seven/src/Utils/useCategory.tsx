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

  /**
   * The `capitalizeWords` function takes a string as input, splits it into words, capitalizes the
   * first letter of each word, and then joins the words back together into a single string.
   * @param {string} str - A string that contains one or more words that you want to capitalize.
   * @returns The `capitalizeWords` function returns a string where each word in the input string `str`
   * is capitalized (the first letter of each word is converted to uppercase) and the words are then
   * joined back together with spaces.
   */
  const capitalizeWords = (str: string): string => {
    const words: string[] = str.split(" ");
    const capitalizedWords: string[] = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  return {
    categoryData,
    fetchData,
    capitalizeWords,
  };
};

export default useCategory;
