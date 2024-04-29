import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NewBanner from "../../../Components/navigation/NewBanner";

describe("NewBanner component", () => {
  test("renders correctly with provided props", () => {
    const newsText = "New items available!";
    render(
      <Router>
        <NewBanner newsText={newsText} linkToNewArrivages="nft" />
      </Router>
    );

    const newsBanner = screen.getByText(`🎉 New arrivages : ${newsText}`);
    expect(newsBanner).toBeInTheDocument();
  });

  //! To Change
  // test('contains a link with text "click here"', () => {
  //   const newsText = "New items available!";
  //   render(<NewBanner newsText={newsText} linkToNewArrivages="nft" />);

  //   const link = screen.getByText("click here");
  //   expect(link).toBeInTheDocument();
  //   expect(link).toHaveAttribute("href", "/nft");
  // });
});
