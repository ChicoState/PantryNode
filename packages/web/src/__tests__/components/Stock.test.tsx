import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import Stock from "../../components/Stock";
import { mockStockContextValue } from "../../mock/StockStoreMock";
import StockContext from "../../store/context/StockContext";

describe("Stock", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(cleanup);
  const setup = () => {
    return render(
      <StockContext.Provider value={mockStockContextValue}>
        <Stock />
      </StockContext.Provider>
    );
  };

  test("renders without crashing", () => {
    setup();
  });

  test("renders correct elements and values", () => {
    setup();

    // Check that the correct form elements are rendered
    expect(screen.getByLabelText("Type of User")).toBeInTheDocument();
    expect(screen.getByLabelText("Item Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Quantity")).toBeInTheDocument();
    expect(screen.getByLabelText("Price")).toBeInTheDocument();

    // Check that the correct options are rendered in the Type of User select element
    expect(screen.getByLabelText("Type of User")).toHaveTextContent(
      "Select user type"
    );
    expect(screen.getByLabelText("Type of User")).toHaveTextContent(
      "Anonymous"
    );
    expect(screen.getByLabelText("Type of User")).toHaveTextContent("Donor");
    expect(screen.getByLabelText("Type of User")).toHaveTextContent(
      "Pantry User"
    );

    // Check that the correct options are rendered in the Category select element
    expect(screen.getByLabelText("Category")).toHaveTextContent(
      "Select category"
    );

    // Check that the form values can be updated and submitted
    fireEvent.change(screen.getByLabelText("Type of User"), {
      target: { value: "donor" },
    });
    fireEvent.change(screen.getByLabelText("Item Name"), {
      target: { value: "Item 1" },
    });
    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "2023-02-20" },
    });
    fireEvent.change(screen.getByLabelText("Quantity"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: "5.99" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "Add Stock" }));

    expect(mockStockContextValue.putStock).toHaveBeenCalledWith({
      ExpiryDate: new Date("2023-02-20T00:00:00.000Z"),
      category_id: "",
      donorID: "",
      itemName: "Item 1",
      price: "5.99",
      quantity: "10",
      userType: "donor",
    });
  });

  test("renders Add Category form", () => {
    setup();
    const addCategoryForm = screen.getByLabelText("Add Category");
    expect(addCategoryForm).toBeInTheDocument();
  });

  test("submits Add Category form", () => {
    setup();
    const categoryInput = screen.getByLabelText("Add Category");
    fireEvent.change(categoryInput, { target: { value: "" } });
    fireEvent.submit(screen.getByRole("button", { name: "Add Category" }));
    expect(mockStockContextValue.putCategory).toHaveBeenCalledTimes(1);
    expect(mockStockContextValue.putCategory).toHaveBeenCalledWith("");
  });
});
