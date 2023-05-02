import React from 'react';
import { render, screen } from "@testing-library/react";
import SaleTable from "../Components/Sale/SaleTable";

const category = {
  id: 1,
  name: "Category 1",
  image_url: "",
};

const categorydata = [
  {
    item_id: 1,
    quantity: 2,
    person_id: 1,
    price: 10,
    expiration: "",
    first_name: "",
    last_name: "",
    name: "Product 1",
  },
  {
    item_id: 2,
    quantity: 1,
    person_id: 1,
    price: 20,
    expiration: "",
    first_name: "",
    last_name: "",
    name: "Product 2",
  },
];

describe("SaleTable", () => {
  it("renders the table with correct data", () => {
    render(<SaleTable category={category} categorydata={categorydata} />);

    expect(screen.getByText(category.name)).toBeInTheDocument();
    expect(screen.getByText("Product Name")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});