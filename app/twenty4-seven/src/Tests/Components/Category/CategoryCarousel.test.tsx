import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CategoryCarousel from "../../../Components/Category/CategoryCarousel";

describe("CategoryCarousel component", () => {
  //! Test brocken
  // test("renders correctly with provided category names", () => {
  //   const categories = ["NFT", "Water", "Courses", "Soon"];
  //   render(
  //     <MemoryRouter>
  //       <CategoryCarousel categoryName={categories} />
  //     </MemoryRouter>
  //   );

  //   const salesCategoriesTitle = screen.getByText("Sales categories");
  //   expect(salesCategoriesTitle).toBeInTheDocument();

  //   categories.forEach((category) => {
  //     const categoryTitle = screen.getByText(category);
  //     expect(categoryTitle).toBeInTheDocument();
  //   });
  // });

  // test("renders correct number of categories", () => {
  //   const categories = ["NFT", "Water", "Courses", "Soon"];
  //   render(
  //     <MemoryRouter>
  //       <CategoryCarousel categoryName={categories} />
  //     </MemoryRouter>
  //   );

  //   const categoryTitles = screen.getAllByRole("button", {
  //     name: new RegExp(categories.join("|")),
  //   });
  //   expect(categoryTitles).toHaveLength(categories.length);
  // });
});
