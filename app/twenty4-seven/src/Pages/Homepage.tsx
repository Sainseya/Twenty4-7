import React from "react";
import CategoryCarousel from "../Components/Category/CategoryCarousel";
import CategoryPreview from "../Components/Category/CategoryPreview";
import CategoryPreviewReverse from "../Components/Category/CategoryPreviewReverse";
import NewBanner from "../Components/navigation/NewBanner";
import Topbar from "../Components/navigation/Topbar";

const Homepage: React.FC = () => {
  const categories = ["NFT", "Water", "Courses", "Soon",];

  return (
    <div>
      <Topbar />
      <NewBanner newsText="New Mineblock NFT Collection" linkToNewArrivages="nft" />
      <CategoryCarousel categoryName={categories} />
      <div className="relative flex flex-col w-full px-44 bg-light_bg dark:bg-dark_bg pt-1">
        <div id="seperator" className="absolute left-44 right-44 h-2 bg-light_border dark:bg-dark_border rounded-xl -top-1"></div>
        {categories.map((category, index) => (
          <React.Fragment key={index}>
            {category.toLowerCase() !== "soon" && (
            <>
            {index % 2 === 0 ? (
              <CategoryPreview categoryName={category} textCategory="fgfunhfouignhfu unifdghnfuihgfdigu nhgfd nuh" />
            ) : (
              <CategoryPreviewReverse categoryName={category} textCategory="fgfunhfouignhfu unifdghnfuihgfdigu nhgfd nuh" />
            )}
            {index !== category.length - 1 && <div className="h-2 bg-light_border dark:bg-dark_border rounded-xl"></div>}
            </>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
