import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { extractDominantColor } from "../../Utils/colorExtractor";

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
  const formatCategoryName = categoryName.toLowerCase();
  let navigate = useNavigate();

  console.log("IMG path : " + imgPath);
  

  useEffect(() => {
    if (!imgPath) {
      return;
    }

    // Extraire la couleur principale de l'image
    extractDominantColor(imgPath)
      .then((dominantColor) => {
        // Convertir la couleur RVB en chaîne hexadécimale
        const colorHex = `#${(
          (1 << 24) +
          (dominantColor[0] << 16) +
          (dominantColor[1] << 8) +
          dominantColor[2]
        )
          .toString(16)
          .slice(1)}`;
        // Mettre à jour le style du bouton avec la couleur extraite
        setButtonStyle({ backgroundColor: colorHex });
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'extraction de la couleur principale :",
          error
        );
      });
  }, [imgPath]);

  const navigateToCategory = () => {
    navigate(`/${formatCategoryName}`);
    window.scrollTo(0, 0);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ rotate: 5 }}
      style={buttonStyle}
      className="flex relative h-72 min-w-28 flex-grow mx-2 rounded-xl border-2 border-light_border dark:border-dark_border items-center justify-center"
      onClick={navigateToCategory}
    >
      {imgPath ? (
        <img
          id="imgID"
          src={imgPath}
          alt={categoryName}
          className="object-cover size-64 rounded-xl"
        />
      ) : (
        <p className="text-center font-semibold text-2xl">
          {categoryName}
        </p>
      )}
    </motion.button>
  );
};

export default Category;
