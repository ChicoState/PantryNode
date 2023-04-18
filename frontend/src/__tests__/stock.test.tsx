import React from 'react';
import { render, screen } from '@testing-library/react';
import Stock from '../pages/stock';
import '@testing-library/jest-dom'
describe('Stock', () => {
    test('renders stock component', () => {
        render(<Stock />);
        const stockElement = screen.getByText(/stock/i);
        expect(stockElement).toBeInTheDocument();
    });
});
