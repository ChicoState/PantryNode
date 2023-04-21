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
    it("Displays a dialog box for adding a new donor when the 'Add Donor' button is clicked", () => {
        const { getByRole, queryByText } = render(<Donor />);
        const addButton = getByRole("button", { name: "Add Donor" });
        fireEvent.click(addButton);
        expect(queryByText("Add New Entry")).toBeInTheDocument();
    });
});
