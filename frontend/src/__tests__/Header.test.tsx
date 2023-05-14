import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import Header from "../Components/Quagga/Header";

describe("Header component", () => {
  test("renders the title 'Scan Now'", () => {
    const { getByText } = render(<Header />);
    const title = getByText(/Scan Now/i);
    expect(title).toBeInTheDocument();
  });

  test("renders the 'Start Camera' button", () => {
    const { getByRole } = render(<Header />);
    const button = getByRole("button", { name: /Start Camera/i });
    expect(button).toBeInTheDocument();
  });

  test("clicking the 'Start Camera' button calls the handleToggleCamera function", () => {
    const mockHandleToggleCamera = jest.fn();
    const { getByRole } = render(
      <Header cameraStatus={false} handleToggleCamera={mockHandleToggleCamera} />
    );
    const button = getByRole("button", { name: /Start Camera/i });
    fireEvent.click(button);
    expect(mockHandleToggleCamera).toHaveBeenCalledTimes(1);
  });

  test("displays the 'Stop Camera' button when cameraStatus is true", () => {
    const { getByRole } = render(<Header cameraStatus={true} />);
    const button = getByRole("button", { name: /Stop Camera/i });
    expect(button).toBeInTheDocument();
  });

  test("clicking the 'Stop Camera' button calls the handleToggleCamera function", () => {
    const mockHandleToggleCamera = jest.fn();
    const { getByRole } = render(
      <Header cameraStatus={true} handleToggleCamera={mockHandleToggleCamera} />
    );
    const button = getByRole("button", { name: /Stop Camera/i });
    fireEvent.click(button);
    expect(mockHandleToggleCamera).toHaveBeenCalledTimes(1);
  });
});