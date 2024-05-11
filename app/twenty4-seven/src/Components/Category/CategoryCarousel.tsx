import React from "react";
import Category from "./Category";

interface CategoriesCarouselProps {
  categories: { 
    categoryName: string; 
    imageUrl: string 
  }[];
}

const CategoryCarousel: React.FC<CategoriesCarouselProps> = ({
  categories,
}) => {
  const categoryComponents = categories.map((category, index) => (
    <Category
      key={index}
      categoryName={category.categoryName}
      imgPath={category.imageUrl}
    />
  ));

  return (
    <div className="flex w-full h-80 px-44 bg-light_txtZone dark:bg-dark_bg2 items-center justify-between">
      <div className="flex h-72 w-80 mr-2 bg-light_bg2 dark:bg-txtPlaceholder rounded-xl border-2 border-light_border dark:border-dark_border items-center justify-center">
        <p className="text-center font-semibold text-2xl text-txtBlack dark:text-txtWhite">
        Sales categories
        </p>
      </div>
      {categoryComponents}
    </div>
  );
};

export default CategoryCarousel;
