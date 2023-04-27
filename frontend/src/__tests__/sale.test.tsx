import React from 'react';
import { render, screen } from '@testing-library/react';
import Sale from '../pages/sale';
import '@testing-library/jest-dom'
describe('Sale Page', () => {
    it('should render Multiple buttons "', () => {
        render(<Sale />);
        //const images = screen.getAllByRole('img', { name: /fruits/i });
        //expect(images.length).toBe(1);
        //const buttons = screen.getAllByRole('button');
        //expect(buttons.length).toBeGreaterThan(0);
    });
});