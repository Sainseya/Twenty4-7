import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ThemeProvider } from "../../../Utils/ThemeContext";
import Footer from "../../../Components/navigation/Footer";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockedUsedNavigate,
}));

let scrollToMock: jest.SpyInstance;

beforeEach(() => {
  scrollToMock = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

afterEach(() => {
  scrollToMock.mockRestore();
});

describe("Footer", () => {
  test("renders product links correctly", () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </ThemeProvider>
    );

    const categoryLink = screen.getByText("Category");
    expect(categoryLink).toBeInTheDocument();

    const nftLink = screen.getByText("NFT");
    expect(nftLink).toBeInTheDocument();
  });

  test("renders company links correctly", () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </ThemeProvider>
    );

    const privacyLink = screen.getByText("Privacy");
    expect(privacyLink).toBeInTheDocument();

    const termsOfServiceLink = screen.getByText("Terms of Service");
    expect(termsOfServiceLink).toBeInTheDocument();
  });

  test("renders developers links correctly", () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </ThemeProvider>
    );

    const projectLink = screen.getByText("Project");
    expect(projectLink).toBeInTheDocument();

    const documentationLink = screen.getByText("Documentation");
    expect(documentationLink).toBeInTheDocument();

    const externalAPILink = screen.getByText("External API");
    expect(externalAPILink).toBeInTheDocument();
  });

  test("navigates to correct link when Category button is clicked", () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </ThemeProvider>
    );

    const categoryButton = screen.getByText("Category");
    fireEvent.click(categoryButton);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  });

  test("navigates to correct link when NFT button is clicked", () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </ThemeProvider>
    );

    const nftButton = screen.getByText("NFT");
    fireEvent.click(nftButton);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/nft");
  });
});
