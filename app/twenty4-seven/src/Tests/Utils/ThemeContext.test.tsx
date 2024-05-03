import { render, fireEvent, screen } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../../Utils/ThemeContext";

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key],
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock document.documentElement.classList
const classListMock = {
  add: jest.fn(),
  remove: jest.fn(),
};

Object.defineProperty(document, "documentElement", {
  value: {
    classList: classListMock,
  },
});

describe("ThemeProvider", () => {
  test("renders children with light theme by default", () => {
    const TestComponent = () => {
      const { theme } = useTheme();
      return <div data-testid="theme">{theme}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme").textContent).toBe("light");
  });

  test("toggles theme between light and dark", () => {
    const TestComponent = () => {
      const { theme, toggleTheme } = useTheme();
      return (
        <div>
          <div data-testid="theme">{theme}</div>
          <button onClick={toggleTheme} data-testid="toggle-btn">
            Toggle Theme
          </button>
        </div>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId("toggle-btn");
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("theme").textContent).toBe("dark");
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("theme").textContent).toBe("light");
  });

  test("sets theme in localStorage", () => {
    const TestComponent = () => {
      const { toggleTheme } = useTheme();
      return (
        <button onClick={toggleTheme} data-testid="toggle-btn">
          Toggle Theme
        </button>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(localStorage.getItem("theme")).toBe("light");
    fireEvent.click(screen.getByTestId("toggle-btn"));
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  test('adds or removes "dark" class from document.documentElement', () => {
    const TestComponent = () => {
      const { toggleTheme } = useTheme();
      return (
        <button onClick={toggleTheme} data-testid="toggle-btn">
          Toggle Theme
        </button>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(classListMock.add).toHaveBeenCalledWith("dark");
    fireEvent.click(screen.getByTestId("toggle-btn"));
    expect(classListMock.remove).toHaveBeenCalledWith("dark");
  });
});
