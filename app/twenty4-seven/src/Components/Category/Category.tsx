import React from "react";
import { motion } from "framer-motion";

interface CategoriesProps {
    categoryName: string;
}

const Category: React.FC<CategoriesProps> = ({ categoryName }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ rotate: 5 }}
      className="flex h-72 flex-grow mx-2 bg-light_bg2 dark:bg-txtPlaceholder hover:bg-light_txtZone dark:hover:bg-[#848A95] rounded-xl border-2 border-light_border dark:border-dark_border items-center justify-center"
    >
      <p className="text-center font-semibold text-2xl text-txtBlack dark:text-txtWhite">{categoryName}</p>
    </motion.button>
  );
};

export default Category;