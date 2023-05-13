import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import Donor from "../pages/donors";

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

describe("Donor component", () => {
    it("Checks Rendering of donor page by checking Donor List Text Presence", () => {
        const navigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigate);
        const { getByText } = render(<Donor />);
        const heading = getByText(/Donor List/i);
        expect(heading).toBeInTheDocument();
    });
    it("renders Add Donor button", () => {
        const navigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigate);
        const { getByText } = render(<Donor />);
        const addButton = getByText(/Add Donor/i);
        expect(addButton).toBeInTheDocument();
    });
    it("renders Lookup Donor button", () => {
        const navigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigate);
        const { getByText } = render(<Donor />);
        const addButton = getByText(/Lookup Donor/i);
        expect(addButton).toBeInTheDocument();
    });
    it("displays an error message if the no email address is provided in the Email Address field of the add donor dialog", () => {
        const navigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigate);
        const { getByRole, getByLabelText, getByText, queryByText } = render(
            <Donor />
        );
        const addDonorButton = getByRole("button", { name: "Add Donor" });
        fireEvent.click(addDonorButton);
        const personID = getByLabelText("Person ID")
        const emailInput = getByLabelText("Email");
        const addButton = getByText("Add");
        expect(addButton).toBeDisabled();
        //First we put in dummy text
        fireEvent.change(emailInput, { target: { value: "zyzz" } });
        fireEvent.change(personID, { target: { value: "2" } });
        //Removing the dummy text to initiate warning message
        fireEvent.change(emailInput, { target: { value: "" } });
        fireEvent.click(addButton);
        expect(queryByText("Email is required")).toBeInTheDocument();
    });
    it("displays an error message if the email address is invalid in the add donor dialog", () => {
        const navigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigate);
        const { getByRole, getByLabelText, getByText, queryByText } = render(
            <Donor />
        );
        const addDonorButton = getByRole("button", { name: "Add Donor" });
        fireEvent.click(addDonorButton);
        const emailInput = getByLabelText("Email");
        const addButton = getByText("Add");
        //Add button should be initially disabled
        expect(addButton).toBeDisabled();
        //Entering an invalid email
        fireEvent.change(emailInput, { target: { value: "invalid_email" } });
        fireEvent.click(addButton);
        //Error message should be displayed
        expect(queryByText("Email is invalid")).toBeInTheDocument();
    });

});
