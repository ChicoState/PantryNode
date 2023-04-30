import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Login from "../pages/login";
import { store } from "../store";
import { Provider } from "react-redux";

describe("Login form", () => {
    it("submits the form successfully", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>{" "}
            </Provider>
        );

        // Fill in email and password fields
        fireEvent.change(screen.getByLabelText(/email address/i), {
            target: {
                value: "test@example.com",
            },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: {
                value: "password",
            },
        });

        // Click the "Login" button
        fireEvent.click(
            screen.getByRole("button", {
                name: /login/i,
            })
        );

        // Wait for the form submission to complete
        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
        });

        // Check that the user was logged in
        expect(screen.getByText(/Forgot password?/i)).toBeInTheDocument();
    });
});