import React from "react";
import { render, screen } from "@testing-library/react";
import Success from "../pages/success";

describe("Success component", () => {
  test("renders success message", () => {
    render(<Success />);
    const successMessage = screen.getByText(/Registration Successful/i);
    expect(successMessage).toBeInTheDocument();
  });

  test("renders login button with correct text and link", () => {
    render(<Success />);
    const loginButton = screen.getByRole("link", { name: /Login/i });
    expect(loginButton).toHaveAttribute("href", "/login");
    expect(loginButton).toHaveTextContent(/Login/i);
  });
});
