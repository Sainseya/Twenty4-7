import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NftCard from "../../../Components/Nft/NftCard";

describe("NftCard", () => {
  test("renders price correctly", () => {
    const price = 100;

    render(<NftCard price={price} idCard={1} />);

    const priceElement = screen.getByText(price.toString());
    expect(priceElement).toBeInTheDocument();
  });

  test("renders buttons correctly", () => {
    const price = 100;

    render(<NftCard price={price} idCard={1} />);

    const detailsButton = screen.getByText("Details");
    const addToCartButton = screen.getByTestId("add to cart");

    expect(detailsButton).toBeInTheDocument();
    expect(addToCartButton).toBeInTheDocument();
  });

});