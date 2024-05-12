import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartDropdown from "../../../Components/Cart/CartDropdown";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("CartDropdown", () => {
  test("renders items count correctly", () => {
    const itemsInCart = 2;

    render(
      <CartDropdown
        itemsInCart={itemsInCart}
        isDropdownOpen={true}
        closeDropdown={() => {}}
      />
    );

    const itemsCountElement = screen.getByText(itemsInCart.toString());
    expect(itemsCountElement).toBeInTheDocument();
  });

  test("renders 'Go to cart' button correctly", () => {
    render(
      <CartDropdown
        itemsInCart={2}
        isDropdownOpen={true}
        closeDropdown={() => {}}
      />
    );

    const goToCartButton = screen.getByTestId("go to cart");
    expect(goToCartButton).toBeInTheDocument();
  });

  test("renders each item in the cart correctly", () => {
    const itemsInCart = 3;

    render(
      <CartDropdown
        itemsInCart={itemsInCart}
        isDropdownOpen={true}
        closeDropdown={() => {}}
      />
    );

    const cartItems = screen.getAllByTestId("item");
    expect(cartItems.length).toBe(itemsInCart);
  });
});
