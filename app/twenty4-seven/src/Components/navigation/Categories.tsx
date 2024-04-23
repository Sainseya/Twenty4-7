import React from "react";
import { motion } from "framer-motion";

interface CategoriesProps {
    categoryName: string;
}

const Categories: React.FC<CategoriesProps> = ({ categoryName }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className="flex h-72 flex-grow mx-2 bg-light_bg2 hover:bg-light_txtZone rounded-xl border-2 border-light_border items-center justify-center"
    >
      <p className="text-center font-semibold text-2xl">{categoryName}</p>
    </motion.button>
  );
};

export default Categories;