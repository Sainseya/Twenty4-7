import { render, screen, fireEvent } from "@testing-library/react";
import NftNavBar from "../../../Components/navigation/NftNavBar";

describe("NftNavBar", () => {
  test("renders buttons correctly", () => {
    const setActiveIndexMock = jest.fn();
    const activeIndex = 0;

    render(
      <NftNavBar
        setActiveIndex={setActiveIndexMock}
        activeIndex={activeIndex}
      />
    );

    const itemsButton = screen.getByText("Items");
    expect(itemsButton).toBeInTheDocument();

    const marketButton = screen.getByText("Market");
    expect(marketButton).toBeInTheDocument();

    const newsButton = screen.getByText("News");
    expect(newsButton).toBeInTheDocument();
  });

  test("calls setActiveIndex with correct index when button is clicked", () => {
    const setActiveIndexMock = jest.fn();
    const activeIndex = 0;

    render(
      <NftNavBar
        setActiveIndex={setActiveIndexMock}
        activeIndex={activeIndex}
      />
    );

    const marketButton = screen.getByText("Market");
    fireEvent.click(marketButton);

    expect(setActiveIndexMock).toHaveBeenCalledWith(1);
  });
});
