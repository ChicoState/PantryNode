import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUp from "../../../components/auth/SignUp";
import UserContext from "../../../store/context/UserContext";
import { MemoryRouter } from "react-router";
import { mockUserContext } from "../../../mock/UserStoreMock";
import { act } from "react-dom/test-utils";

describe("SignUp component", () => {
  beforeEach(() => {
    render(
      <UserContext.Provider value={mockUserContext}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </UserContext.Provider>
    );
  });
  test("renders sign up form", () => {
    const fullNameInput = screen.getByPlaceholderText("Full Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const phoneInput = screen.getByPlaceholderText("(xxx) xxx-xxxx");
    const signUpButton = screen.getByRole("button", { name: /sign up/i });
    expect(fullNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

  test("registers a user when the sign up form is submitted", () => {
    const fullNameInput = screen.getByPlaceholderText("Full Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const phoneInput = screen.getByPlaceholderText("(xxx) xxx-xxxx");
    const signUpButton = screen.getByRole("button", { name: /sign up/i });
    act(() => {
      userEvent.type(fullNameInput, "Test User");
      userEvent.type(emailInput, "testuser@example.com");
      userEvent.type(passwordInput, "testpassword");
      userEvent.type(phoneInput, "1234567890");
      fireEvent.click(signUpButton);
    });
    expect(mockUserContext.register).toHaveBeenCalledWith({
      username: "Test User",
      email: "testuser@example.com",
      password: "testpassword",
      phone: "1234567890",
    });
  });
});
