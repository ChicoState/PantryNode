import { render, screen, waitFor, cleanup } from "@testing-library/react";
import Chart from "../../components/Chart";
import StockContext from "../../store/context/StockContext";
import { mockStockContextValue } from "../../mock/StockStoreMock";

describe("Chart component", () => {
  afterEach(cleanup);
  test("renders the checkout history table", async () => {
    render(
      <StockContext.Provider value={mockStockContextValue}>
        <Chart />
      </StockContext.Provider>
    );

    // Wait for the spinner to disappear
    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    // Assert that the checkout history table is rendered with the correct data
    expect(
      screen.getByRole("heading", { name: "Purchase" })
    ).toBeInTheDocument();

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("STOCK")).toBeInTheDocument();
    expect(screen.getByText("Sat Feb 26 2022")).toBeInTheDocument();
  });

  test("renders the current stock table", async () => {
    render(
      <StockContext.Provider value={mockStockContextValue}>
        <Chart />
      </StockContext.Provider>
    );

    // Wait for the spinner to disappear
    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    // Assert that the current stock table is rendered with the correct data
    expect(
      screen.getByRole("heading", { name: "Current Stock" })
    ).toBeInTheDocument();
    expect(screen.getByText("Purchase")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("29")).toBeInTheDocument();
    expect(screen.getByText("Thu Feb 24 2022")).toBeInTheDocument();
    expect(screen.getByText("Sat Feb 26 2022")).toBeInTheDocument();
  });

  test("renders soonToBeExpired table with data when chart data is loaded", () => {
    render(
      <StockContext.Provider value={mockStockContextValue}>
        <Chart />
      </StockContext.Provider>
    );

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Item 12")).toBeInTheDocument();
    // expect(screen.getByText("-406")).toBeInTheDocument();
    expect(screen.getByText("Thu Feb 03 2022")).toBeInTheDocument();
  });

  test("renders the correct Expired items text and table rows based on the stock context", () => {
    render(
      <StockContext.Provider value={mockStockContextValue}>
        <Chart />
      </StockContext.Provider>
    );

    expect(screen.getByText("Item 13")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("Tue Feb 15 2022")).toBeInTheDocument();
  });
});
