import React from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const SearchProductPanel: React.FC = () => {
  const submitSimpleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Simple search");
  };

  const submitGlobalSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Global search");
  };

  return (
    
    <div className="flex flex-col w-80 pt-4 gap-4 bg-light_bg dark:bg-dark_bg2 border-x-2 border-light_border dark:border-dark_border">
      <form action="" className="mb-2 px-4 z-30 sticky top-[146px]">
        <div className="font-semibold mb-2 text-xl text-txtBlack dark:text-txtWhite">
          Search
        </div>
        <div className="flex justify-between">
          <input
            type="text"
            className="border-2 border-light_border dark:border-dark_txtZone bg-light_bg dark:bg-dark_txtZone rounded-lg outline-none placeholder:to-txtPlaceholder"
            placeholder="Dirt block"
          ></input>
          <motion.button
            whileHover={{ scale: 1.1 }}
            type="submit"
            className="flex h-12 w-12 px-3 justify-center items-center rounded-lg border-2 border-light_border dark:border-dark_txtZone bg-light_bg2 dark:bg-dark_txtZone"
            onClick={submitSimpleSearch}
          >
            <FaSearch
              size={18}
              className="text-txtPlaceholder dark:text-txtWhite"
            />
          </motion.button>
        </div>
      </form>
      <form action="" className="sticky top-64">
        <div className="mb-2 px-4">
          <div className="font-semibold mb-2 text-xl text-txtBlack dark:text-txtWhite">
            Price Range
          </div>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              className="w-1/2 border-2 border-light_border dark:border-dark_txtZone bg-light_bg2 dark:bg-dark_txtZone rounded-lg outline-none placeholder:to-txtPlaceholder"
              placeholder="Min"
              step="any"
              min="0"
            ></input>
            <div className="text-txtBlack dark:text-txtWhite">to</div>
            <input
              type="text"
              className="w-1/2 border-2 border-light_border dark:border-dark_txtZone bg-light_bg2 dark:bg-dark_txtZone rounded-lg outline-none placeholder:to-txtPlaceholder"
              placeholder="Max"
              step="any"
              min="0"
            ></input>
          </div>
        </div>
        <div className="mt-8 px-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="button"
            className="w-full p-3 bg-purpleButton text-txtWhite rounded-lg font-semibold"
            onClick={submitGlobalSearch}
          >
            Apply
          </motion.button>
        </div>
      </form>
      <div className="flex-1 min-h-10"></div>
    </div>
    
  );
};

export default SearchProductPanel;
