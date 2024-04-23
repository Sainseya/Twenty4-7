import React from "react";
import Category from "./Category";

interface CategoriesCarouselProps {
  categoryName: string[];
}

const CategoryCarousel: React.FC<CategoriesCarouselProps> = ({
  categoryName,
}) => {
  const categoryComponents = categoryName.map((categoryName, index) => (
    <Category key={index} categoryName={categoryName} />
  ));
  return (
    <div className="flex w-full h-80 px-44 bg-light_txtZone items-center justify-between">
      <div className="flex h-72 w-80 mr-2 bg-light_bg2 rounded-xl border-2 border-light_border items-center justify-center">
        <p className="text-center font-semibold text-2xl">Sales categories</p>
      </div>
      {categoryComponents}
    </div>
  );
};

export default CategoryCarousel;
