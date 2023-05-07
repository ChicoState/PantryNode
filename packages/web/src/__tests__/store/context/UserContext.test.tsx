import { render, screen } from "@testing-library/react";
import UserContextType from "../../../interface/User/UserContextType";
import UserContext from "../../../store/context/UserContext";

describe("UserContext", () => {
  it("renders without crashing", () => {
    render(
      <UserContext.Provider value={{} as UserContextType}>
        <div data-testid="stock-context-test">UserContext Context Test</div>
      </UserContext.Provider>
    );
    expect(screen.getByTestId("stock-context-test")).toBeInTheDocument();
  });
});
