import { render, screen, fireEvent } from "@testing-library/react";
import PasswordInput from "../../../Components/Input/PasswordInput";

test("render PasswordInput with correct props", () => { 
  render(<PasswordInput label="Password" placeholder="Enter your password" />);

  const labelElement = screen.getByText(/Password/i);
  expect(labelElement).toBeInTheDocument();

  const inputElement = screen.getByPlaceholderText(/Enter your password/i);
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveAttribute("type", "password");
});

test("render PasswordInput with icon if specified", () => {
  const icon = <svg data-testid="test-icon" />;
  render(
    <PasswordInput
      label="Password"
      placeholder="Enter your password"
      icon={icon}
    />
  );

  const iconElement = screen.getByTestId("test-icon");
  expect(iconElement).toBeInTheDocument();
});

test("render Password with forget password if specified", () => {
  const showForgotPassword = true;
  render(
    <PasswordInput
      label="Password"
      placeholder="Enter your password"
      showForgotPassword={showForgotPassword}
    />
  );

  const forgotPasswordLink = screen.getByText(/Forgot password/i);
  expect(forgotPasswordLink).toBeInTheDocument();
});

test("toggle password visibility when eye icon is clicked", () => {
    render(<PasswordInput label="Password" placeholder="Enter your password" />);

    const eyeIcon = screen.getByTestId('eye-icon');
    const passwordInput = screen.getByPlaceholderText('Enter your password');

    expect(passwordInput).toHaveAttribute('type', 'password'); // Password input type should be initially 'password'

    fireEvent.click(eyeIcon);
    expect(passwordInput).toHaveAttribute('type', 'text'); // Password input type should be 'text' after clicking eye icon

    fireEvent.click(eyeIcon);
    expect(passwordInput).toHaveAttribute('type', 'password'); // Password input type should revert back to 'password' after clicking eye icon again
});
