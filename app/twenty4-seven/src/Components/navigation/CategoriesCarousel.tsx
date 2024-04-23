import React from "react";
import { motion } from "framer-motion";

const CategoriesCarousel: React.FC = () => {
  return (
    <div className="flex w-full h-80 px-44 bg-light_txtZone items-center justify-between">
      <div className="flex h-72 w-80 bg-light_bg2 rounded-xl border-2 border-light_border items-center justify-center">
        <p className="text-center font-semibold text-2xl">Sale categories</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="flex h-72 w-56 bg-light_bg2 hover:bg-light_txtZone rounded-xl border-2 border-light_border items-center justify-center"
      >
        <p className="text-center font-semibold text-2xl">NFT</p>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="flex h-72 w-56 bg-light_bg2 hover:bg-light_txtZone rounded-xl border-2 border-light_border items-center justify-center"
      >
        <p className="text-center font-semibold text-2xl">Water</p>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="flex h-72 w-56 bg-light_bg2 hover:bg-light_txtZone rounded-xl border-2 border-light_border items-center justify-center"
      >
        <p className="text-center font-semibold text-2xl">Courses</p>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="flex h-72 w-56 bg-light_bg2 hover:bg-light_txtZone rounded-xl border-2 border-light_border items-center justify-center"
      >
        <p className="text-center font-semibold text-2xl">Soon</p>
      </motion.button>
    </div>
  );
};

export default CategoriesCarousel;
