import { render, screen } from "@testing-library/react";
import TimelineItem from "../../../Components/Order/TimelineItem";

describe("TimelineItem component", () => {
  test("renders status, date, and hour correctly", () => {
    const status = "shipped";
    const date = "2024-05-01";
    const hour = "12:00";

    render(<TimelineItem status={status} date={date} hour={hour} />);

    expect(screen.getByText("Shipped")).toBeInTheDocument();
    expect(screen.getByText("2024-05-01 ,12:00")).toBeInTheDocument();
  });
});
