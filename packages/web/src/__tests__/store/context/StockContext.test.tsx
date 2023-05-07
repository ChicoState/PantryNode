import React from "react";
import { render, screen } from "@testing-library/react";
import StockContext from "../../../store/context/StockContext";
import StockContextType from "../../../interface/Stock/StockContextType";

describe("StockContext", () => {
  it("renders without crashing", () => {
    render(
      <StockContext.Provider value={{} as StockContextType}>
        <div data-testid="stock-context-test">Stock Context Test</div>
      </StockContext.Provider>
    );
    expect(screen.getByTestId("stock-context-test")).toBeInTheDocument();
  });
});
