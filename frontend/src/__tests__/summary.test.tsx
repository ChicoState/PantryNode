import React from "react";
import { render, screen } from "@testing-library/react";
import Summary from "../pages/summary";

describe("Summary Page", () => {
  it("should render text with \"Purchases\"", () => {
    render(<Summary />);
    const Purchases = screen.getByText("Purchases");
    expect(Purchases).toBeInTheDocument(); // assert that the button is in the document
  });
  it("should render text with \"Current Stock\"", () => {
    render(<Summary />);
    const CurrentStock = screen.getByText("Current Stock");
    expect(CurrentStock).toBeInTheDocument(); // assert that the button is in the document
  });
  it("should render text with \"Waste Management\"", () => {
    render(<Summary />);
    const WasteManagement = screen.getByText("Waste Management");
    expect(WasteManagement).toBeInTheDocument(); // assert that the button is in the document
  });
  it("should render text with \"Soon to Expire\"", () => {
    render(<Summary />);
    const SoontoExpire = screen.getByText("Soon to Expire");
    expect(SoontoExpire).toBeInTheDocument(); // assert that the button is in the document
  });
});