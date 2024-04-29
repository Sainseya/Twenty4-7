import { render, screen } from "@testing-library/react";
import CategoryCarousel from "../../../Components/Category/CategoryCarousel";

describe("CategoryCarousel component", () => {
  test("renders correctly with provided category names", () => {
    const categories = ["NFT", "Water", "Courses", "Soon"];
    render(<CategoryCarousel categoryName={categories} />);

    const salesCategoriesTitle = screen.getByText("Sales categories");
    expect(salesCategoriesTitle).toBeInTheDocument();

    categories.forEach((category) => {
      const categoryTitle = screen.getByText(category);
      expect(categoryTitle).toBeInTheDocument();
    });
  });

  test("renders correct number of categories", () => {
    const categories = ["NFT", "Water", "Courses", "Soon"];
    render(<CategoryCarousel categoryName={categories} />);

    const categoryTitles = screen.getAllByRole('button', { name: new RegExp(categories.join('|')) });
    expect(categoryTitles).toHaveLength(categories.length);
  });
});
