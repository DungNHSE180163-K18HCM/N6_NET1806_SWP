import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the .toBeInTheDocument() matcher
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './login/Login.jsx';

describe('Login Component', () => {
  test('renders login form', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    // Use getByRole for better specificity
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('validates form fields', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const usernameInput = screen.getByLabelText(/username:/i);
    const passwordInput = screen.getByLabelText(/password:/i);

    expect(usernameInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  test('submits form with valid inputs', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const signInButton = screen.getByRole('button', { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();

    // Further interactions and assertions for form submission can go here
  });
});