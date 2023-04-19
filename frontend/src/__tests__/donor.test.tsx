import React from 'react';
import { render, screen } from '@testing-library/react';
import Donor from '../pages/donor';

describe('Donor Page', () => {
    it('should render a button with text "Donate"', () => {
        render(<Donor />);
        const AddDonor = screen.getByText('Add Donor');
        expect(AddDonor).toBeInTheDocument(); // assert that the button is in the document
    });
});
