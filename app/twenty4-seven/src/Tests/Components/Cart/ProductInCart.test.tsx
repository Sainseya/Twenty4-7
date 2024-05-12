import { render, screen } from "@testing-library/react";
import ProductInCart from "../../../Components/Cart/ProductInCart";

describe("ProductInCart component", () => {
  test("renders product details correctly", () => {
    render(
      <table>
        <tbody>
          <ProductInCart productName="Test Product" price={10} />
        </tbody>
      </table>
    );

    const productNameElement = screen.getByText("Test Product");
    const quantityElement = screen.getByText("1");
    const priceElement = screen.getByText("10");

    expect(productNameElement).toBeInTheDocument();
    expect(quantityElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });

  test("renders quantity correctly when quantity is not 1", () => {
    render(
      <table>
        <tbody>
          <ProductInCart productName="Test Product" quantity={2} price={10} />
        </tbody>
      </table>
    );

    const quantityElement = screen.getByText("2");
    expect(quantityElement).toBeInTheDocument();
  });

  test("renders Solana logo when product is an NFT", () => {
    render(
      <table>
        <tbody>
          <ProductInCart productName="Test Product" isNft price={10} />
        </tbody>
      </table>
    );
    const solanaLogo = screen.getByTestId("solana-logo");
    expect(solanaLogo).toBeInTheDocument();
  });
});
