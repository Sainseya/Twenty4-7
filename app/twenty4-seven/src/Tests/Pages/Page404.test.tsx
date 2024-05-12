import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Page404 from "../../Pages/Page404";

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

describe("404 page", () => {
  test("navigate to home page when HOME button is clicked", () => {
    render(
      <MemoryRouter>
        <Page404 />
      </MemoryRouter>
    );

    const homeBtn = screen.getByText("HOME");
    fireEvent.click(homeBtn);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  });
});
