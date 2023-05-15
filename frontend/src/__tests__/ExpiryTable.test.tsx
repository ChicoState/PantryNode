import React from 'react';
import { render, screen } from "@testing-library/react";
import Expiry from "../Components/Expiry/ExpiryTable";

const mockExpiryFeed = [  {    trans_item_id: 1,    item: {      name: "Milk",    },    expiration: "2023-05-15",    tran: {      date: "2023-05-07",    },    quantity: 10,  },  {    trans_item_id: 2,    item: {      name: "Bread",    },    expiration: "2023-05-10",    tran: {      date: "2023-05-07",    },    quantity: 0,  },];

describe("Expiry component", () => {
  it("should render table with items", () => {
    render(<Expiry ep={mockExpiryFeed} />);
    const tableRows = screen.getAllByRole("row");
    expect(tableRows.length).toBe(3); // includes the table header row
    expect(screen.getByText("#")).toBeInTheDocument();
    expect(screen.getByText("Item")).toBeInTheDocument();
    expect(screen.getByText("Expiry Date")).toBeInTheDocument();
    expect(screen.getByText("Added Date")).toBeInTheDocument();
    expect(screen.getByText("Stock Quantity")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Milk")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Bread")).toBeInTheDocument();
  });

  it("should render message when no items are present", () => {
    render(<Expiry ep={[]} />);
    expect(screen.getByText("No items")).toBeInTheDocument();
  });
});