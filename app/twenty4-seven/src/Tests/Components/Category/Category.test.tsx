import { render, screen } from "@testing-library/react";
import Category from "../../../Components/Category/Category";

describe("Category component", () => {
  test("renders correctly with provided category name", () => {
    const categoryName = "NFT";
    render(<Category categoryName={categoryName} />);

    const categoryTitle = screen.getByText(categoryName);
    expect(categoryTitle).toBeInTheDocument();
  });
});
