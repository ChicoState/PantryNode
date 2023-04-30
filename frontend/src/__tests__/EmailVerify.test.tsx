import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import EmailResetComponent from '../Components/ResetPassword/EmailVerify';

import { MemoryRouter } from "react-router";
import { store } from "../store";
import { Provider } from "react-redux";


describe('EmailResetComponent', () => {
// This test case checks if the component is rendered with form fields
  test('renders the component with form fields', () => {
    render(
            <Provider store={store}>
                <MemoryRouter>
                    <EmailResetComponent />
                </MemoryRouter>{" "}
            </Provider>
        );
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    expect(emailInput).toBeInTheDocument();
    const getCodeButton = screen.getByRole('button', { name: 'Get Code' });
    expect(getCodeButton).toBeInTheDocument();
  });
  
    // This test case checks if an error message is displayed when an invalid email is entered
    test('displays error message when email is invalid', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <EmailResetComponent />
                </MemoryRouter>{" "}
            </Provider>
        );
        const emailInput = screen.getByRole('textbox', { name: /email/i });
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        const getCodeButton = screen.getByRole('button', { name: 'Get Code' });
        fireEvent.click(getCodeButton);
        const errorMessage = screen.getByText('Email is invalid');
        expect(errorMessage).toBeInTheDocument();
    });
    // This test case checks if an error message is displayed when no email is entered
    test('displays error message when email is empty', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <EmailResetComponent />
                </MemoryRouter>{" "}
            </Provider>
        );
        const getCodeButton = screen.getByRole('button', { name: 'Get Code' });
        fireEvent.click(getCodeButton);
    });
    // This test case checks if the user is navigated to the verify page when a valid email is entered
    test('navigates to verify page when email is valid', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <EmailResetComponent />
                </MemoryRouter>{" "}
            </Provider>
        );
        const emailInput = screen.getByRole('textbox', { name: /email/i });
        fireEvent.change(emailInput, { target: { value: 'valid-email@example.com' } });
        const getCodeButton = screen.getByRole('button', { name: 'Get Code' });
        fireEvent.click(getCodeButton);
    });

});
