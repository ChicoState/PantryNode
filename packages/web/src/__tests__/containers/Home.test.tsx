import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home from "../../containers/Home";
import StockContext from "../../store/context/StockContext";
import { mockStockContextValue } from "../../mock/StockStoreMock";

describe("Home", () => {
  beforeEach(() => {
    render(
      <StockContext.Provider value={mockStockContextValue}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </StockContext.Provider>
    );
  });

  it("renders the navigation buttons", () => {
    const checkoutButton = screen.getByRole("button", { name: "Checkout" });
    const donorButton = screen.getByRole("button", { name: "Donor" });
    const expiryCheckButton = screen.getByRole("button", {
      name: "Expiry Check",
    });
    const saleReportButton = screen.getByRole("button", {
      name: "Sale Report",
    });
    expect(checkoutButton).toBeInTheDocument();
    expect(donorButton).toBeInTheDocument();
    expect(expiryCheckButton).toBeInTheDocument();
    expect(saleReportButton).toBeInTheDocument();
  });

  it("renders the soon-to-be expired items in the feed", async () => {
    await screen.findByRole("heading", { name: "Feed" });
    expect(mockStockContextValue.getChart).toHaveBeenCalled();
    const item1 = screen.getByText(/Item 12/i);
    const date = screen.getByText(/Mon Feb 07 2022/i);
    expect(item1).toBeInTheDocument();
    expect(date).toBeInTheDocument();
  });
});
