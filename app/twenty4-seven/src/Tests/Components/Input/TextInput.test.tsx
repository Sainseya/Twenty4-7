import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextInput from "../../../Components/Input/TextInput";

test("renders TextInput with correct props", () => {
  render(<TextInput label="Name" type="text" placeholder="Enter your name" />);

  // Vérifie que le label est rendu correctement
  const labelElement = screen.getByText(/Name/i);
  expect(labelElement).toBeInTheDocument();

  // Vérifie que l'input est rendu avec les props correctes
  const inputElement = screen.getByPlaceholderText(/Enter your name/i);
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveAttribute("type", "text");
});

// Test pour vérifier que l'icône est rendue si elle est spécifiée dans les props
test("renders TextInput with icon if specified", () => {
  const icon = <svg data-testid="test-icon" />;
  render(
    <TextInput
      label="Email"
      type="email"
      placeholder="Enter your email"
      icon={icon}
    />
  );

  // Vérifie que l'icône est rendue correctement
  const iconElement = screen.getByTestId("test-icon");
  expect(iconElement).toBeInTheDocument();
});

// Test pour vérifier l'interaction utilisateur (saisie de texte)
test("allows user to input text", () => {
  render(
    <TextInput
      label="Password"
      type="password"
      placeholder="Enter your password"
    />
  );

  // Sélectionnez l'input
  const inputElement = screen.getByPlaceholderText(/Enter your password/i);

  // Saisie de texte dans l'input
  userEvent.type(inputElement, "testpassword");

  // Vérifie que la valeur saisie est correcte
  expect(inputElement).toHaveValue("testpassword");
});
