import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { FaGoogle, FaGithub } from "react-icons/fa";
// import UseFetch from "../hooks/useFetch";

export default function Login() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const baseUrl = "https://66690c4a2e964a6dfed3aa1d.mockapi.io/user";
  const method = "POST";
  const body = { username, password };
  let bool;

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return passwordRegex.test(password);
  };

  //Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setData('Password must be at least 8 characters long, contain at least 1 special character, 1 number, and 1 uppercase letter.');
      return;
    }
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      //Send user's input to backend
      fetch(baseUrl, {
        method: method,
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "OK") {
            alert(data.message);
            localStorage.setItem("user", data.token);
          } else if (data.status === "Failed") {
            alert(data.message);
          }
        });
    }
    setValidated(true);
  };

  return (
    <Container
      style={{ paddingTop: "10%", paddingBottom: "10%" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div
        className="p-4"
        style={{
          width: "30%",
          backgroundColor: "rgba(217, 217, 217, 0.7)",
          borderRadius: 20,
        }}
      >
        <h2 className="text-center mb-4">Sign in</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="username">Username:</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2"
              style={{ borderColor: "#000", borderRadius: 10 }}
              id="username"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Password:</Form.Label>
            <Form.Control
              required
              type="password"
              className="border-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderColor: "#000", borderRadius: 10 }}
              minLength={8}
              id="password"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a password.
            </Form.Control.Feedback>
            <div className="text-end mt-2">
              <Link
                to="/reset_password"
                className="text-muted text-decoration-none"
              >
                Forget password
              </Link>
            </div>
          </Form.Group>
          <div className="d-flex justify-content-center mb-3">
            <Button
              type="submit"
              className="w-75 border-2"
              style={{
                backgroundColor: "rgba(201, 201, 201, 1)",
                borderColor: "#000",
                color: "#000",
                borderRadius: 10,
              }}
            >
              Sign in
            </Button>
          </div>
        </Form>
        <div className="d-flex align-items-center my-3">
          <div style={{ flex: 1, height: "1px", backgroundColor: "#000" }} />
          <span className="mx-3 text-muted">Or</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#000" }} />
        </div>
        <div className="d-flex justify-content-center mb-3">
          <Button variant="outline-dark" className="mx-2">
            <FaGoogle />
          </Button>
          <Button variant="outline-dark" className="mx-2">
            <FaGithub />
          </Button>
        </div>
        <p className="text-center text-muted">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-decoration-underline text-muted">
            Sign up
          </Link>
        </p>
      </div>
    </Container>
  );
}
