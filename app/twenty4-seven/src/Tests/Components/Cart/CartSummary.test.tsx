import { render, screen } from "@testing-library/react";
import CartSummary from "../../../Components/Cart/CartSummary";

describe("CartSummary component", () => {
  test("renders correctly with all values", () => {
    render(
      <CartSummary
        subtotalPriceNft={100}
        subtotalPriceOther={50}
        taxeNft={10}
        taxeOther={5}
        shippingPrice={5}
        allNft={false}
        haveOneNft={true}
      />
    );

    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("Tax")).toBeInTheDocument();
    expect(screen.getByText("Shipping")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Checkout")).toBeInTheDocument();
  });

  test("calculates total correctly with all values", () => {
    render(
      <CartSummary
        subtotalPriceNft={100}
        subtotalPriceOther={50}
        taxeNft={10}
        taxeOther={5}
        shippingPrice={5}
        allNft={true}
        haveOneNft={true}
      />
    );

    expect(screen.getByText("110.00")).toBeInTheDocument();
  });

  test("renders Solana logo correctly with all NFT prices", () => {
    render(
      <CartSummary
        subtotalPriceNft={100}
        subtotalPriceOther={50}
        taxeNft={10}
        taxeOther={5}
        shippingPrice={5}
        allNft={true}
        haveOneNft={true}
      />
    );

    expect(screen.getAllByTestId("solana-logo")).toEqual(expect.arrayContaining([expect.anything()]));
  });
});
