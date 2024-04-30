import { render, screen } from "@testing-library/react";
import CategoryPreview from "../../../Components/Category/CategoryPreview";
import CategoryPreviewReverse from "../../../Components/Category/CategoryPreviewReverse";


describe("CategoryPreview", () => {
  test("renders category name and text correctly", () => {
    const categoryName = "NFT";
    const textCategory = "Lorem ipsum dolor sit amet";

    render(
      <CategoryPreview
        categoryName={categoryName}
        textCategory={textCategory}
      />
    );

    const categoryNameElement = screen.getByTestId('categoryName');
    expect(categoryNameElement).toBeInTheDocument();

    const textCategoryElement = screen.getByTestId('textCategory');
    expect(textCategoryElement).toHaveTextContent(textCategory);

  });
});

describe("CategoryPreviewReverse", () => {
  test("renders category name and text correctly", () => {
    const categoryName = "NFT";
    const textCategory = "Lorem ipsum dolor sit amet";

    render(
      <CategoryPreviewReverse
        categoryName={categoryName}
        textCategory={textCategory}
      />
    );

    const categoryNameElement = screen.getByTestId('categoryName');
    expect(categoryNameElement).toBeInTheDocument();

    const textCategoryElement = screen.getByTestId('textCategory');
    expect(textCategoryElement).toHaveTextContent(textCategory);

  });
});
