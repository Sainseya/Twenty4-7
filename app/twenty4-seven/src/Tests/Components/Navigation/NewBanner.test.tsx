import { render, screen, fireEvent  } from "@testing-library/react";
import { MemoryRouter, useNavigate } from 'react-router';
import NewBanner from "../../../Components/navigation/NewBanner";

// Mocking useNavigate hook
const mockedUsedNavigate = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockedUsedNavigate,
}));

describe("NewBanner component", () => {
  test("renders correctly with provided props", () => {
    const newsText = "Check out our latest products!";
    render(
      <MemoryRouter>
        <NewBanner newsText={newsText} linkToNewArrivages="/" />
      </MemoryRouter>
    );

    const newsBanner = screen.getByText(`🎉 New arrivages : ${newsText}`);
    expect(newsBanner).toBeInTheDocument();
  });


  test("navigates to the correct link when button is clicked", () => {
    const newsText = "Check out our latest products!";
    const linkToNewArrivages = "new-arrivals";
    (useNavigate() as jest.Mock).mockReturnValue(mockedUsedNavigate);

    render(
      <MemoryRouter>
        <NewBanner newsText={newsText} linkToNewArrivages={linkToNewArrivages} />
      </MemoryRouter>
    );

    const button = screen.getByText('click here');
    fireEvent.click(button);

    expect(mockedUsedNavigate).toHaveBeenCalledWith(`/${linkToNewArrivages}`);
  });
});
