import React from "react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { Dialog } from "@material-ui/core";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";

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
        const personID = getByLabelText("Person ID");
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

    it("opens the Add Donor dialog when the 'Add Donor' button is clicked", () => {
        const navigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigate);
        const { getByRole, getByLabelText } = render(<Donor />);
        const addDonorButton = getByRole("button", { name: "Add Donor" });
        fireEvent.click(addDonorButton);
        const emailInput = getByLabelText("Email");
        expect(emailInput).toBeInTheDocument();
      });

     it("opens the Lookup Donor dialog when the 'Lookup Donor' button is clicked:Person ID", () => {
  const navigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(navigate);
  const { getByRole, getByText, getByLabelText } = render(<Donor />);
  const lookupDonorButton = getByText("Lookup Donor");
  fireEvent.click(lookupDonorButton);
  const personIDInput = getByLabelText("Person ID");
  expect(personIDInput).toBeInTheDocument();
});

it("calls the navigate function with the correct route when the 'Add' button is clicked in the 'Add Donor' dialog", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    const { getByRole, getByLabelText, getByText } = render(<Donor />);
    const addDonorButton = getByRole("button", { name: "Add Donor" });
    fireEvent.click(addDonorButton);
    const personID = getByLabelText("Person ID");
    const emailInput = getByLabelText("Email");
    const addButton = getByText("Add");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(personID, { target: { value: "1" } });
    fireEvent.click(addButton);
  });
  it("displays an error message if the no email address is provided in the Email Address field of the add donor dialog", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    const { getByRole, getByLabelText, getByText, queryByText } = render(
        <Donor />
    );
    const addDonorButton = getByRole("button", { name: "Add Donor" });
    fireEvent.click(addDonorButton);
    const personID = getByLabelText("Person ID");
    const emailInput = getByLabelText("Email");
    const addButton = getByText("Add");
    expect(addButton).toBeDisabled();
    //First we put in dummy text
    fireEvent.change(emailInput, { target: { value: "zyzz" } });
    fireEvent.change(personID, { target: { value: "2" } });
    //Removing the dummy text to initiate warning message
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.click(addButton);
    await waitFor(() => expect(queryByText("Email is required")).toBeInTheDocument());
  });
  
  test("submits lookup form when Lookup button is clicked in the Lookup Donor dialog", async () => {
    const { getByRole, getByLabelText, getByText } = render(<Donor />);
    const lookupDonorButton = getByRole("button", { name: "Lookup Donor" });
    fireEvent.click(lookupDonorButton);

    const personID = getByLabelText("Person ID");
    const fullName = getByLabelText("Full Name");
    const lookupButton = getByText("Lookup");

    fireEvent.change(personID, { target: { value: "1" } });
    fireEvent.change(fullName, { target: { value: "Test User" } });
    fireEvent.click(lookupButton);

    await act(async () => {
      expect(personID).toHaveValue("1");
      expect(fullName).toHaveValue("Test User");
    });
  });

  test("renders donor list header with two buttons", () => {
    const { getByRole } = render(<Donor />);
    const donorListHeader = getByRole("heading", { name: "Donor List" });
    const addDonorButton = getByRole("button", { name: "Add Donor" });
    const lookupDonorButton = getByRole("button", { name: "Lookup Donor" });

    expect(donorListHeader).toBeInTheDocument();
    expect(addDonorButton).toBeInTheDocument();
    expect(lookupDonorButton).toBeInTheDocument();
  });

 
});
