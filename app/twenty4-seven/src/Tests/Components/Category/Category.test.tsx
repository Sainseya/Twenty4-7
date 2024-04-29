import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Category from "../../../Components/Category/Category";

describe("Category component", () => {
  test("renders correctly with provided category name", () => {
    const categoryName = "NFT";
    render(
      <Router>
        <Category categoryName={categoryName} />
      </Router>
    );

    const categoryTitle = screen.getByText(categoryName);
    expect(categoryTitle).toBeInTheDocument();
  });
});
