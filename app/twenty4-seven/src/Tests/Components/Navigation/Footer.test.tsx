import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router";
import Footer from "../../../Components/navigation/Footer";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Footer", () => {
  test("renders product links correctly", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const categoryLink = screen.getByText("Category");
    expect(categoryLink).toBeInTheDocument();

    const nftLink = screen.getByText("NFT");
    expect(nftLink).toBeInTheDocument();
  });

  test("renders company links correctly", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const privacyLink = screen.getByText("Privacy");
    expect(privacyLink).toBeInTheDocument();

    const termsOfServiceLink = screen.getByText("Terms of Service");
    expect(termsOfServiceLink).toBeInTheDocument();
  });

  test("renders developers links correctly", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
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
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const categoryButton = screen.getByText("Category");
    fireEvent.click(categoryButton);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  });

  test("navigates to correct link when NFT button is clicked", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const nftButton = screen.getByText("NFT");
    fireEvent.click(nftButton);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/nft");
  });
});
