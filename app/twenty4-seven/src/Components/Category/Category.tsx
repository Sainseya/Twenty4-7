import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { fakeCategoriesData } from "../../Data/fakeCategoryData";
import TestImage from "../../Assets/Category/Collection Online Courses 3.jpg"
import { extractDominantColor } from "../../Utils/colorExtractor";

interface CategoriesProps {
    categoryName: string;
}

const Category: React.FC<CategoriesProps> = ({ categoryName }) => {
  const [buttonStyle, setButtonStyle] = useState({ backgroundColor: 'transparent' });
  const formatCategoryName = categoryName.toLowerCase();
  let navigate = useNavigate();
  // const categoryData = fakeCategoriesData.find(
  //   (category) => category.categoryName === categoryName
  // );
  
  // if (!categoryData) {
  //   return null;
  // }
  
  // const { imageUrl } = categoryData;
  // console.log(imageUrl);

  useEffect(() => {
    // Extraire la couleur principale de l'image
    extractDominantColor(TestImage)
      .then(dominantColor => {
        // Convertir la couleur RVB en chaîne hexadécimale
        const colorHex = `#${((1 << 24) + (dominantColor[0] << 16) + (dominantColor[1] << 8) + dominantColor[2]).toString(16).slice(1)}`;
        // Mettre à jour le style du bouton avec la couleur extraite
        setButtonStyle({ backgroundColor: colorHex });
      })
      .catch(error => {
        console.error("Erreur lors de l'extraction de la couleur principale :", error);
      });
  }, []);


   const navigateToCategory = () => {
      navigate(`/${formatCategoryName}`);
      window.scrollTo(0, 0);
   }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ rotate: 5 }}
      style={buttonStyle}
      className="flex relative h-72 mx-2 rounded-xl border border-light_border dark:border-dark_border items-center justify-center"
      onClick={navigateToCategory}
    >
      <img id="imgID" src={TestImage} alt={categoryName} className="object-contain size-72 rounded-xl border-4 border-light_border dark:border-dark_border" />
      {/* <p className="absolute bottom-1 text-center font-semibold text-2xl">{categoryName}</p> */}
      
    </motion.button>
  );
};

export default Category;