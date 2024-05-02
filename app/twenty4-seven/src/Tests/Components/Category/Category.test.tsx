import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Category from "../../../Components/Category/Category";

describe("Category component", () => {
  test("renders correctly with provided category name", () => {
    const categoryName = "NFT";
    render(
      <MemoryRouter>
        <Category categoryName={categoryName} />
      </MemoryRouter>
    );

    const categoryTitle = screen.getByText(categoryName);
    expect(categoryTitle).toBeInTheDocument();
  });
});
