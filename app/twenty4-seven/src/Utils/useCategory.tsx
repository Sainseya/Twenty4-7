import { useState } from "react";
import axios from "axios";
import {
  fakeNftImage,
  fakeBathwaterImage,
  fakeCoursesImage,
  fakeSonnImage,
} from "../Data/fakeCategoryData";

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
    } catch (error) {
      console.error("Error fetching category data: ", error);
    }
    // console.log("Response Axios :", categoryData);
  };

  const getImageFromId = (id: number): string => {
    switch (id) {
      case 1:
        return fakeNftImage;
      case 2:
        return fakeBathwaterImage;
      case 3:
        return fakeCoursesImage;
      case 4:
        return fakeSonnImage;
      default:
        return "https://placehold.co/512?text=Category";
    }
  };

  /**
   * The `sortCategoriesById` function sorts an array of Category objects by their id values, with
   * "soon" categories placed at the end.
   * @param {Category[]} categories - An array of objects representing categories. Each category object
   * has properties including an `id` (number) and a `type` (string).
   * @returns The function `sortCategoriesById` is returning an array of `Category` objects sorted by
   * their `id` property. If two categories have the same `id`, the function will then sort them based
   * on their `type` property, with categories of type "soon" being placed at the end.
   */
  const sortCategoriesById = (categories: Category[]): Category[] => {
    return categories.sort((a, b) => {
      if (a.id === b.id) {
        return 0;
      }
      // Placer "soon" à la fin
      if (a.type === "soon") {
        return 1;
      }
      if (b.type === "soon") {
        return -1;
      }
      return a.id - b.id;
    });
  };

  return {
    categoryData,
    fetchData,
    getImageFromId,
    sortCategoriesById,
  };
};

export default useCategory;
