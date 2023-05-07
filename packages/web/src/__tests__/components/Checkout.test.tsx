import { fireEvent, render, screen } from "@testing-library/react";
import { cleanup } from "@testing-library/react";
import Checkout from "../../components/Checkout";
import StockContext from "../../store/context/StockContext";
import { mockChart } from "../../mock/StockStoreMock";

describe("Checkout component", () => {
  const mockCheckoutItem = jest.fn();
  const mockGetChart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = () => {
    return render(
      <StockContext.Provider
        value={{
          stockState: {
            categories: [],
            loading: "",
            chart: mockChart,
            err: "",
            errMsg: "",
          },
          getCategories: jest.fn(),
          putCategory: jest.fn(),
          putStock: jest.fn(),
          getChart: mockGetChart,
          checkoutItem: mockCheckoutItem,
        }}
      >
        <Checkout />
      </StockContext.Provider>
    );
  };
  afterEach(cleanup);

  it("should render the form", () => {
    setup();

    const itemNameLabel = screen.getByText("Item");
    const itemNameSelect = screen.getByLabelText("Item");
    const quantityLabel = screen.getByText("Quantity");
    const quantityInput = screen.getByPlaceholderText("0");
    const cllgIdLabel = screen.getByText("Cllg Id");
    const cllgIdInput = screen.getByPlaceholderText("XXXXXXXX");
    const checkoutButton = screen.getByText("checkout");

    expect(itemNameLabel).toBeInTheDocument();
    expect(itemNameSelect).toBeInTheDocument();
    expect(quantityLabel).toBeInTheDocument();
    expect(quantityInput).toBeInTheDocument();
    expect(cllgIdLabel).toBeInTheDocument();
    expect(cllgIdInput).toBeInTheDocument();
    expect(checkoutButton).toBeInTheDocument();
  });

  it("should show an error if the quantity entered is greater than the available quantity", () => {
    setup();

    const itemNameSelect = screen.getByLabelText("Item");
    const quantityInput = screen.getByPlaceholderText("0");
    const checkoutButton = screen.getByText("checkout");

    fireEvent.change(itemNameSelect, { target: { value: "Item 1" } });
    fireEvent.change(quantityInput, { target: { value: "30" } });
    fireEvent.click(checkoutButton);

    const error = screen.getByText(
      "Quantity entered is greater than available quantity"
    );
    expect(error).toBeInTheDocument();
  });

  it("should submit the form with the correct values", () => {
    setup();

    const itemNameSelect = screen.getByLabelText("Item");
    const quantityInput = screen.getByPlaceholderText("0");
    const cllgIdInput = screen.getByPlaceholderText("XXXXXXXX");
    const checkoutButton = screen.getByText("checkout");

    fireEvent.change(itemNameSelect, { target: { value: "Item 1" } });
    fireEvent.change(quantityInput, { target: { value: "5" } });
    fireEvent.change(cllgIdInput, { target: { value: "123456789" } });
    fireEvent.click(checkoutButton);

    expect(mockCheckoutItem).toHaveBeenCalledWith({
      itemId: "",
      itemQuantityAval: "2",
      quantityX: "5",
      cllgId: "123456789",
    });
  });

  it("should call getChart on mount", () => {
    setup();

    expect(mockGetChart).toHaveBeenCalledTimes(1);
  });
});
