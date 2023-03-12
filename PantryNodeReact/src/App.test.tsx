import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders pantry node heading", () => {
  render(<App />);
  // this is meant to find only only 'pantry node' text
  const linkElement: HTMLHeadingElement = screen.getByText(/Pantry Node/i);
  expect(linkElement).toBeInTheDocument();
});
