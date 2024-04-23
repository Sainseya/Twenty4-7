interface CategoriesPreviewReverseProps {
  categoryName: string;
  textCategory: string;
}

const CategoryPreviewReverse: React.FC<CategoriesPreviewReverseProps> = ({
  categoryName,
  textCategory,
}) => {
  return (
    <div className="flex my-8">
      <div
        id="img"
        className="h-72 w-2/6 mr-28 bg-light_bg border-4 border-light_border rounded-xl"
      ></div>
      <div className="flex flex-col flex-grow">
        <div className="font-semibold text-2xl">
          <span className="border-b-4 border-txtGreen rounded-b">
            {categoryName} :
          </span>
        </div>
        <br />
        <div id="text" className="text-lg">
          {textCategory}
        </div>
      </div>
    </div>
  );
};

export default CategoryPreviewReverse;
