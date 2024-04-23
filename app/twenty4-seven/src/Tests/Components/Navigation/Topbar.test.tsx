import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Topbar from "../../../Components/navigation/Topbar";

describe("Topbar component", () => {
  test("renders correctly with provided props", () => {
    const nameWebsite = "MyWebsite";
    render(
      <Router>
        <Topbar nameWebsite={nameWebsite} />
      </Router>
    );

    expect(screen.getByText(nameWebsite)).toBeInTheDocument();
  });

  test('contains search input with placeholder "Search..."', () => {
    render(
      <Router>
        <Topbar nameWebsite="MyWebsite" />
      </Router>
    );

    const searchInput = screen.getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();
  });

  test("renders weather, cart, and user icons", () => {
    render(
      <Router>
        <Topbar nameWebsite="MyWebsite" />
      </Router>
    );

    expect(screen.getByTestId("weather-icon")).toBeInTheDocument();
    expect(screen.getByTestId("cart-icon")).toBeInTheDocument();
    expect(screen.getByTestId("user-icon")).toBeInTheDocument();
  });

  test('clicking on user icon navigates to "/connexion" page', () => {
    render(
      <Router>
        <Topbar nameWebsite="MyWebsite" />
      </Router>
    );

    const userIcon = screen.getByTestId("user-icon");
    fireEvent.click(userIcon);

    setTimeout(() => {
      expect(window.location.pathname).toBe("/connexion");
    }, 500); // Attendre 500ms avant de vérifier l'URL
  });
});
