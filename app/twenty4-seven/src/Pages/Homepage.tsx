import React from "react";
import CategoryCarousel from "../Components/Category/CategoryCarousel";
import CategoryPreview from "../Components/Category/CategoryPreview";
import CategoryPreviewReverse from "../Components/Category/CategoryPreviewReverse";
import NewBanner from "../Components/navigation/NewBanner";
import Topbar from "../Components/navigation/Topbar";
import Footer from "../Components/navigation/Footer";
//? Fake Data
import { fakeCategoriesData } from "../Data/fakeCategoryData"; 
import useCategory from "../Utils/useCategory";

const Homepage: React.FC = () => {
  const { categoryData } = useCategory();

  const getCategoryImageUrl = (categoryName: string): string => {
    console.log(`../../Assets/Category/${categoryName}.jpg`);
    
    return `../../Assets/Category/${categoryName}.jpg`
  }

  const categories = fakeCategoriesData.map(category => ({
    categoryName: category.categoryName,
    imageUrl: getCategoryImageUrl(category.categoryName),
  }));

  return (
    <div className="min-h-screen bg-light_bg dark:bg-dark_bg">
      <Topbar />
      <NewBanner newsText="New Mineblock NFT Collection" linkToNewArrivages="nft" />
      <CategoryCarousel categories={categories} />
      <div className="relative flex flex-col w-full px-44 pt-1">
        <div id="seperator" className="absolute left-44 right-44 h-2 bg-light_border dark:bg-dark_border rounded-xl top-0"></div>
        {fakeCategoriesData.map((category, index) => (
          <React.Fragment key={index}>
            {category.categoryName.toLowerCase() !== "soon" && (
            <>
            {index % 2 === 0 ? (
              <CategoryPreview categoryName={category.categoryName} textCategory={category.description} />
            ) : (
              <CategoryPreviewReverse categoryName={category.categoryName} textCategory={category.description} />
            )}
            {index !== categories.length -2  && <div className="h-2 bg-light_border dark:bg-dark_border rounded-xl"></div>}
            </>
            )}
          </React.Fragment>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
