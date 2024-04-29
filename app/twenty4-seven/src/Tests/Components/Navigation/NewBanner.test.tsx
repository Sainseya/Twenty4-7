import { render, screen } from "@testing-library/react";
import NewBanner from "../../../Components/navigation/NewBanner";

describe("NewBanner component", () => {
  test("renders correctly with provided props", () => {
    const newsText = "New items available!";
    render(<NewBanner newsText={newsText} />);

    const newsBanner = screen.getByText(`🎉 New arrivages : ${newsText}`);
    expect(newsBanner).toBeInTheDocument();
  });

  test('contains a link with text "click here"', () => {
    const newsText = "New items available!";
    render(<NewBanner newsText={newsText} />);

    const link = screen.getByText("click here");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
