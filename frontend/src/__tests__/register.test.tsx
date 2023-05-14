import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from '../pages/register';

describe('SignUp', () => {
  it('should display required error messages on form submit without filling out any fields', async () => {
    render(<SignUp />);

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(submitButton);

    const inputElement = screen.getByRole('textbox', { name: /first name/i });
    expect(inputElement).toBeInTheDocument();
    
    const lnElement = screen.getByRole('textbox', { name: /Last Name/i });
    expect(lnElement).toBeInTheDocument();
    
    
    const phElement = screen.getByRole('textbox', { name: /Phone/i });
    expect(phElement).toBeInTheDocument();
    
    const emailElement = screen.getByRole('textbox', { name: /Email Address/i });
    expect(emailElement).toBeInTheDocument();
    
    
    //const passElement = screen.getByRole('password', { name: /Password/i });
    expect(screen.getAllByRole('textbox', { type: 'password' })[0]).toBeInTheDocument();
    
    expect(screen.getAllByRole('textbox', { type: 'password' })[1]).toBeInTheDocument();
  });

});