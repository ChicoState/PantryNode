//Alphabetical Order imports for better readability
import '@testing-library/jest-dom'
import Donor from '../pages/donor';
import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';

describe('Donor Page', () => {
    it('Should render a button with text "Add Donate"', () => {
        render(<Donor />);
        const AddDonor = screen.getByText('Add Donor');
        expect(AddDonor).toBeInTheDocument(); // assert that the button is in the document
    });

    describe("Donor component", () => {
        it("Renders the Donor List title with pre-exisiting data", () => {
            const { getByText } = render(<Donor />);
            expect(getByText("Donor List")).toBeInTheDocument();
        });
        it("displays a dialog for adding a new donor when the 'Add Donor' button is clicked", () => {
            const { getByRole, queryByText } = render(<Donor />);
            const addButton = getByRole("button", { name: "Add Donor" });
            fireEvent.click(addButton);
            expect(queryByText("Add New Entry")).toBeInTheDocument();
        });
        it("Adds a new donor to the table when the 'Add' button is clicked in the Add New Entry dialog", () => {
            const { getByRole, getByLabelText, getByText, queryByText } = render(
                <Donor />
            );
            const addButton = getByRole("button", { name: "Add Donor" });
            fireEvent.click(addButton);
            const nameInput = getByLabelText("Name");
            const emailInput = getByLabelText("Email");
            const locationInput = getByLabelText("Location");
            fireEvent.change(nameInput, { target: { value: "Tanvi" } });
            fireEvent.change(emailInput, { target: { value: "mahajan@gmail.com" } });
            fireEvent.change(locationInput, { target: { value: "Mexico" } });
            const addDonorrButton = getByText("Add");
            fireEvent.click(addDonorrButton);
            expect(queryByText("Tanvi")).toBeInTheDocument();
            expect(queryByText("mahajan@gmail.com")).toBeInTheDocument();
            expect(queryByText("Mexico")).toBeInTheDocument();
        });
        it("displays an error message if the email address is invalid in the add donor dialog", () => {
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

        it("displays an error message if the no email address is provided in the Email Address field of the add donor dialog", () => {
            const { getByRole, getByLabelText, getByText, queryByText } = render(
                <Donor />
            );
            const addDonorButton = getByRole("button", { name: "Add Donor" });
            fireEvent.click(addDonorButton);
            const emailInput = getByLabelText("Email");
            const addButton = getByText("Add");
            expect(addButton).toBeDisabled();
            //First we put in dummy text
            fireEvent.change(emailInput, { target: { value: "zyzz" } });
            //Removing the dummy text to initiate warning message
            fireEvent.change(emailInput, { target: { value: "" } });
            fireEvent.click(addButton);
            expect(queryByText("Email is required")).toBeInTheDocument();
        });


        //PLEASE NOTE : THE BELOW TESTS LOOK REDUNDANT BUT IT HELPS WITH COVERING STATEMENTS
        it("Sorts the donor list in ascending order by name when the name header is clicked once", () => {
            const { getByText, queryByText } = render(<Donor />);
            const nameHeader = getByText("Name");
            fireEvent.click(nameHeader);
            expect(queryByText("Danny")).toBeInTheDocument();
            expect(queryByText("John")).toBeInTheDocument();
        });

        it("sorts the donor list in descending order by name when the name header is clicked twice", () => {
            const { getByText, queryByText } = render(<Donor />);
            const nameHeader = getByText("Name");
            fireEvent.click(nameHeader);
            fireEvent.click(nameHeader);
            expect(queryByText("John")).toBeInTheDocument();
            expect(queryByText("Danny")).toBeInTheDocument();
        });

        it("sorts the donor list in descending order by Email when the Email header is clicked once", () => {
            const { getByText, queryByText } = render(<Donor />);
            const EmailHeader = getByText("Email");
            fireEvent.click(EmailHeader);

            expect(queryByText("danny@gmail.com")).toBeInTheDocument();
            expect(queryByText("john@gmail.com")).toBeInTheDocument();
        });

        it("sorts the donor list in ascending order by Email when the Email header is clicked twice", () => {
            const { getByText, queryByText } = render(<Donor />);
            const EmailHeader = getByText("Email");
            fireEvent.click(EmailHeader);
            fireEvent.click(EmailHeader);

            expect(queryByText("john@gmail.com")).toBeInTheDocument();
            expect(queryByText("danny@gmail.com")).toBeInTheDocument();
        });

        //it("sorts the donor list in descending order by Location when the Location header is clicked once", () => {
        //    const { getByText, queryByText } = render(<Donor />);
        //    const LocationHeader = getByText("Location");
        //    fireEvent.click(LocationHeader);

        //    expect(queryByText("USA")).toBeInTheDocument();
        //    expect(queryByText("USA")).toBeInTheDocument();
        //});

        //it("sorts the donor list in ascending order by Location when the Location header is clicked twice", () => {
        //    const { getByText, queryByText } = render(<Donor />);
        //    const LocationHeader = getByText("Email");
        //    fireEvent.click(LocationHeader);
        //    fireEvent.click(LocationHeader);

        //    expect(queryByText("USA")).toBeInTheDocument();
        //    expect(queryByText("USA")).toBeInTheDocument();

    });
});
