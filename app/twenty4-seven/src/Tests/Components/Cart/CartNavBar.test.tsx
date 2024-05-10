import { render, screen, fireEvent } from "@testing-library/react";
import CartNavBar from "../../../Components/Cart/CartNavBar";

describe("CartNavBar component", () => {
  test("renders cart and orders buttons correctly", () => {
    render(<CartNavBar setActiveIndex={() => {}} activeIndex={0} />);

    const cartButton = screen.getByText("Cart");
    const ordersButton = screen.getByText("Orders");

    expect(cartButton).toBeInTheDocument();
    expect(ordersButton).toBeInTheDocument();
  });

  test("calls setActiveIndex with correct index when cart button is clicked", () => {
    const setActiveIndexMock = jest.fn();
    render(<CartNavBar setActiveIndex={setActiveIndexMock} activeIndex={0} />);

    const cartButton = screen.getByText("Cart");
    fireEvent.click(cartButton);

    expect(setActiveIndexMock).toHaveBeenCalledWith(0);
  });

  test("calls setActiveIndex with correct index when orders button is clicked", () => {
    const setActiveIndexMock = jest.fn();
    render(<CartNavBar setActiveIndex={setActiveIndexMock} activeIndex={0} />);

    const ordersButton = screen.getByText("Orders");
    fireEvent.click(ordersButton);

    expect(setActiveIndexMock).toHaveBeenCalledWith(1);
  });
});
