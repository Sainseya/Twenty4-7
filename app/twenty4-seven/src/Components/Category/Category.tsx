import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { extractDominantColor } from "../../Utils/colorExtractor";
import { isPageValid } from "../../Utils/ValidePages";

interface CategoriesProps {
  categoryName: string;
  imgPath?: string | null;
}

const Category: React.FC<CategoriesProps> = ({
  categoryName,
  imgPath = null,
}) => {
  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: "#F9FAFB",
  });

  let navigate = useNavigate();

  useEffect(() => {
    if (!imgPath) {
      return;
    }

    extractDominantColor(imgPath)
      .then((dominantColor) => {
        const colorHex = `#${(
          (1 << 24) +
          (dominantColor[0] << 16) +
          (dominantColor[1] << 8) +
          dominantColor[2]
        )
          .toString(16)
          .slice(1)}`;
        setButtonStyle({ backgroundColor: colorHex });
      })
      .catch((error) => {
        console.error("Error when extracting the main color :", error);
      });
  }, [imgPath]);

  const navigateToCategory = (categoryName: string) => {
    if (isPageValid(categoryName)) {
      navigate(`/${categoryName.toLowerCase()}`);
      window.scrollTo(0, 0);
    } else {
      // Redirects to 404 page if category is invalid
      navigate("/404");
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ rotate: 5 }}
      style={buttonStyle}
      className="flex relative h-72 min-w-28 flex-grow mx-2 rounded-xl border-2 border-light_border dark:border-dark_border items-center justify-center"
      onClick={() => navigateToCategory(categoryName)}
    >
      {imgPath ? (
        <img
          id="imgID"
          src={imgPath}
          alt={categoryName}
          className="object-cover size-64 rounded-xl"
          loading="lazy"
        />
      ) : (
        <p className="text-center font-semibold text-2xl">{categoryName}</p>
      )}
    </motion.button>
  );
};

export default Category;
