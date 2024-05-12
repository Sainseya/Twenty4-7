import { render, screen } from "@testing-library/react";
import OrderCard from "../../../Components/Order/OrderCard";

describe("OrderCard component", () => {
  test("renders order number, date, and status correctly", () => {
    const orderNumber = 12345;
    const dateOfOrder = "2024-05-01";
    const status = "shipped";

    render(
      <OrderCard
        numberOrder={orderNumber}
        dateOfOrder={dateOfOrder}
        status={status}
      />
    );

    expect(screen.getByText(`Order n°${orderNumber + 1}`)).toBeInTheDocument();
    expect(screen.getByText(dateOfOrder)).toBeInTheDocument();
    expect(screen.getByText("Shipped")).toBeInTheDocument();
  });

  test("capitalizes status correctly", () => {
    const orderNumber = 12345;
    const dateOfOrder = "2024-05-01";
    const status = "pending";

    render(
      <OrderCard
        numberOrder={orderNumber}
        dateOfOrder={dateOfOrder}
        status={status}
      />
    );

    expect(screen.getByText("Pending")).toBeInTheDocument();
  });
});
