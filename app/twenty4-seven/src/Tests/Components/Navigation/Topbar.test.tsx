import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router";
import Topbar from "../../../Components/navigation/Topbar";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Topbar component", () => {
  test('contains search input with placeholder "Search..."', () => {
    render(
      <MemoryRouter>
        <Topbar />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();
  });

  test("renders brand name correctly", () => {
    render(
      <MemoryRouter>
        <Topbar />
      </MemoryRouter>
    );

    const brandName = screen.getByText('Twenty4/7');
    expect(brandName).toBeInTheDocument();
  });

  test("renders weather, cart, and user icons", () => {
    render(
      <MemoryRouter>
        <Topbar />
      </MemoryRouter>
    );

    expect(screen.getByTestId("theme-icon")).toBeInTheDocument();
    expect(screen.getByTestId("cart-icon")).toBeInTheDocument();
    expect(screen.getByTestId("user-icon")).toBeInTheDocument();
  });

  test('navigates to correct link when brand name is clicked', () => {
    (useNavigate() as jest.Mock).mockReturnValue(mockedUsedNavigate);

    render(
      <MemoryRouter>
        <Topbar />
      </MemoryRouter>
    );

    const brandName = screen.getByText('Twenty4/7');
    fireEvent.click(brandName);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  });
});
