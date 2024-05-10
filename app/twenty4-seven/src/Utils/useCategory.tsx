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
      // console.log("Response Axios :", categoryData);
    } catch (error) {
      console.error("Error fetching category data: ", error);
    }
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
