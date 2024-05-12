import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router";
import { ThemeProvider } from "../../../Utils/ThemeContext";
import Topbar from "../../../Components/navigation/Topbar";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockedUsedNavigate,
}));

let scrollToMock: jest.SpyInstance;
beforeEach(() => {
  // Mock window.scrollTo
  scrollToMock = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

afterEach(() => {
  // Restore original window.scrollTo
  scrollToMock.mockRestore();
});

describe("Topbar component", () => {
  test('contains search input with placeholder "Search..."', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Topbar />
        </MemoryRouter>
      </ThemeProvider>
    );

    const searchInput = screen.getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();
  });

  test("renders brand name correctly", () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Topbar />
        </MemoryRouter>
      </ThemeProvider>
    );

    const brandName = screen.getByText('Twenty4/7');
    expect(brandName).toBeInTheDocument();
  });

  test("renders weather, cart, and user icons", () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Topbar />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme-icon")).toBeInTheDocument();
    expect(screen.getByTestId("cart-icon")).toBeInTheDocument();
    expect(screen.getByTestId("user-icon")).toBeInTheDocument();
  });

  test('navigates to correct link when brand name is clicked', () => {
    (useNavigate() as jest.Mock).mockReturnValue(mockedUsedNavigate);

    render(
      <ThemeProvider>
        <MemoryRouter>
          <Topbar />
        </MemoryRouter>
      </ThemeProvider>
    );

    const brandName = screen.getByText('Twenty4/7');
    fireEvent.click(brandName);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  });
});
