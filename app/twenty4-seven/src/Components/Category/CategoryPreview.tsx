interface CategoriesPreviewProps {
  categoryName: string;
  textCategory: string;
}

const CategoryPreview: React.FC<CategoriesPreviewProps> = ({
  categoryName,
  textCategory,
}) => {
  return (
    <div className="flex my-8">
      <div className="flex flex-col flex-grow">
        <div className="font-semibold text-2xl">
          <span data-testid="categoryName" className="border-b-4 border-txtGreen rounded-b">
            {categoryName} :
          </span>
        </div>
        <br />
        <div data-testid="textCategory" className="text-lg">
          {textCategory}
        </div>
      </div>
      <div
        id="img"
        className="h-72 w-2/6 ml-28 bg-light_bg border-4 border-light_border rounded-xl"
      ></div>
    </div>
  );
};

export default CategoryPreview;
