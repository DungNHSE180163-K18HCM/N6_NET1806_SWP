import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../login/Login.jsx";

describe("Login Component", () => {
  const setup = () => {
    render(
      <Router>
        <Login />
      </Router>
    );
  };

  test("renders login form", () => {
    setup();

    expect(
      screen.getByRole("heading", { name: /sign in/i })
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/username:/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/password:/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  test("validates form fields", () => {
    setup();

    const usernameInput =
      screen.getByLabelText(/username:/i);
    const passwordInput =
      screen.getByLabelText(/password:/i);

    expect(usernameInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  test("submits form with valid inputs", () => {
    setup();

    const signInButton = screen.getByRole("button", {
      name: /sign in/i,
    });
    expect(signInButton).toBeInTheDocument();

    // Further interactions and assertions for form submission can go here
  });
});
