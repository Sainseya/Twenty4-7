import { useEffect, useState } from "react";
import { extractDominantColor } from "../../Utils/colorExtractor";

interface CategoriesPreviewProps {
  categoryName: string;
  textCategory: string;
  imgPath?: string;
}

const CategoryPreview: React.FC<CategoriesPreviewProps> = ({
  categoryName,
  textCategory,
  imgPath,
}) => {
  const [divStyle, setDivStyle] = useState({
    backgroundColor: "#F9FAFB",
  });

  useEffect(() => {
    if (!imgPath) {
      return;
    }

    extractDominantColor(imgPath)
      .then((dominantColor) => {
        const colorHex = `#${(
          (1 << 24) +
          (dominantColor[0] << 16) +
          (dominantColor[1] << 8) +
          dominantColor[2]
        )
          .toString(16)
          .slice(1)}`;
        setDivStyle({ backgroundColor: colorHex });
      })
      .catch((error) => {
        console.error("Error when extracting the main color :", error);
      });
  }, [imgPath]);

  return (
    <div className="flex my-8">
      <div className="flex flex-col flex-grow">
        <div className="font-semibold text-2xl">
          <span
            data-testid="categoryName"
            className="border-b-4 text-txtBlack dark:text-txtWhite border-txtGreen rounded-b"
          >
            {categoryName} :
          </span>
        </div>
        <br />
        <div
          data-testid="textCategory"
          className="text-lg text-txtBlack dark:text-txtWhite"
        >
          {textCategory}
        </div>
      </div>
      <div
        id="img"
        style={divStyle}
        className="flex h-72 w-2/6 ml-28 bg-light_bg dark:bg-[#D9D9D9] border-4 border-light_border dark:border-dark_border rounded-xl items-center justify-center"
      >
        <img
          src={imgPath}
          alt={categoryName}
          className="object-cover size-64 rounded-xl"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default CategoryPreview;
