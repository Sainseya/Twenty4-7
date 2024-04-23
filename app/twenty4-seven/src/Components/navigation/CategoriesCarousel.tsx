import React from "react";
import Categories from "./Categories";

interface CategoriesCarouselProps {
  categoryName: string[];
}

const CategoriesCarousel: React.FC<CategoriesCarouselProps> = ({
  categoryName,
}) => {
  const categoriesComponents = categoryName.map((categoryName, index) => (
    <Categories key={index} categoryName={categoryName} />
  ));
  return (
    <div className="flex w-full h-80 px-44 bg-light_txtZone items-center justify-between">
      <div className="flex h-72 w-80 mr-2 bg-light_bg2 rounded-xl border-2 border-light_border items-center justify-center">
        <p className="text-center font-semibold text-2xl">Sale categories</p>
      </div>
      {categoriesComponents}
      {/* <Categories categorieName="NFT" />
      <Categories categorieName="Water" />
      <Categories categorieName="Courses" />
      <Categories categorieName="Soon" /> */}
    </div>
  );
};

export default CategoriesCarousel;
