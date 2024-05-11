import React, { useEffect, useState } from "react";
import CategoryCarousel from "../Components/Category/CategoryCarousel";
import CategoryPreview from "../Components/Category/CategoryPreview";
import CategoryPreviewReverse from "../Components/Category/CategoryPreviewReverse";
import NewBanner from "../Components/navigation/NewBanner";
import Topbar from "../Components/navigation/Topbar";
import Footer from "../Components/navigation/Footer";
import useCategory from "../Utils/useCategory";
import { capitalizeWords } from "../Utils/Tools";
import Loader from "../Components/Loader";

const Homepage: React.FC = () => {
  const { categoryData, fetchData, getImageFromId, sortCategoriesById } = useCategory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      await fetchData();
      setIsLoading(false); // Arrête le chargement une fois que les données ont été récupérées
    };

    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortedCategories = sortCategoriesById(categoryData);

  const categories = sortedCategories.map((category) => ({
    id: category.id,
    categoryName: category.type,
    description: category.bio,
    imageUrl: getImageFromId(category.id),
  }));

  console.log("Categories  in homepage :", categories);

  return (
    <div className="min-h-screen flex flex-col bg-light_bg dark:bg-dark_bg">
      <Topbar />
      <NewBanner
        newsText="New Mineblock NFT Collection"
        linkToNewArrivages="nft"
      />
      {isLoading && <Loader />}
      <CategoryCarousel categories={categories} />
      <div className="flex flex-col flex-grow h-full px-44">
        <div className="h-2 bg-light_border dark:bg-dark_border rounded-xl"></div>
        {categories.map((category, index) => (
          <React.Fragment key={index}>
            {category.categoryName.toLowerCase() !== "soon" && (
              <>
                {index % 2 === 0 ? (
                  <CategoryPreview
                    categoryName={capitalizeWords(category.categoryName)}
                    textCategory={category.description}
                    imgPath={category.imageUrl}
                  />
                ) : (
                  <CategoryPreviewReverse
                    categoryName={capitalizeWords(category.categoryName)}
                    textCategory={category.description}
                    imgPath={category.imageUrl}
                  />
                )}
                {index !== categories.length - 2 && (
                  <div className="h-2 bg-light_border dark:bg-dark_border rounded-xl"></div>
                )}
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
