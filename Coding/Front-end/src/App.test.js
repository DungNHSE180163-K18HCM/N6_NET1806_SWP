import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './login/Login.jsx';

describe('Login Component', () => {
  const setup = () => {
    render(
      <Router>
        <Login />
      </Router>
    );
  };

  test('renders login form', () => {
    setup();

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('validates form fields', () => {
    setup();

    const usernameInput = screen.getByLabelText(/username:/i);
    const passwordInput = screen.getByLabelText(/password:/i);

    expect(usernameInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  test('submits form with valid inputs', () => {
    setup();

    const signInButton = screen.getByRole('button', { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();

    // Further interactions and assertions for form submission can go here
  });

  test('validates password format', () => {
    setup();

    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    const testPasswordValidation = (password, shouldShowError) => {
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.click(submitButton);
      if (shouldShowError) {
        expect(screen.getByText(/password must be at least 8 characters long/i)).toBeInTheDocument();
      } else {
        expect(screen.queryByText(/password must be at least 8 characters long/i)).not.toBeInTheDocument();
      }
    };

    // Test for password with less than 8 characters
    testPasswordValidation('Pass1!', true);

    // Test for password without a special character
    testPasswordValidation('Password1', true);

    // Test for password without a number
    testPasswordValidation('Password!', true);

    // Test for password without an uppercase letter
    testPasswordValidation('password1!', true);

    // Test for valid password
    testPasswordValidation('Password1!', false);
  });
});
