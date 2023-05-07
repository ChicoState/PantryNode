import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import UserContext from "../../../store/context/UserContext";
import Login from "../../../components/auth/Login";
import { mockUserContext } from "../../../mock/UserStoreMock";

describe("Login component", () => {
  beforeEach(() => {
    render(
      <UserContext.Provider value={mockUserContext}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </UserContext.Provider>
    );
  });

  test("renders login form", () => {
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test("submits form with user input", () => {
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByTestId("loginBtn");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    expect(mockUserContext.login).toHaveBeenCalledWith(
      "test@example.com",
      "password123"
    );
  });
});
