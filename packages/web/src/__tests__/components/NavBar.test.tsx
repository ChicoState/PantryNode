import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { mockUserContext } from "../../mock/UserStoreMock";
import CustomNavbar from "../../components/NavBar";
import UserContext from "../../store/context/UserContext";

describe("CustomNavbar", () => {
  afterEach(cleanup);
  const setup = (isAuthenticated: boolean) => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    });
    return render(
      <UserContext.Provider value={mockUserContext}>
        <MemoryRouter>
          <CustomNavbar isAuthenticated={isAuthenticated} />
        </MemoryRouter>
      </UserContext.Provider>
    );
  };
  it("renders the navbar with links when user is authenticated", () => {
    const isAuthenticated = true;
    setup(isAuthenticated);
    const homeLink = screen.getByText("Home") as HTMLSelectElement;
    const stockLink = screen.getByText("stock") as HTMLSelectElement;
    const checkoutLink = screen.getByText("checkout") as HTMLSelectElement;
    const saleLink = screen.getByText("Sale") as HTMLSelectElement;
    const chartLink = screen.getByText("Chart") as HTMLSelectElement;
    const logoutLink = screen.getByText("Logout") as HTMLSelectElement;
    const welcomeMessage = screen.getByText("Welcome testuser");

    expect(homeLink).toBeInTheDocument();
    expect(stockLink).toBeInTheDocument();
    expect(checkoutLink).toBeInTheDocument();
    expect(saleLink).toBeInTheDocument();
    expect(chartLink).toBeInTheDocument();
    expect(logoutLink).toBeInTheDocument();
    expect(welcomeMessage).toBeInTheDocument();
  });

  it("renders the navbar with login and register links when user is not authenticated", () => {
    const isAuthenticated = false;

    setup(isAuthenticated);

    const loginLink = screen.getByText("Login") as HTMLSelectElement;
    const registerLink = screen.getByText("Register") as HTMLSelectElement;

    expect(loginLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });

  it("calls the logout function and reloads the page when Logout link is clicked", () => {
    const isAuthenticated = true;
    setup(isAuthenticated);

    const logoutLink = screen.getByText("Logout") as HTMLSelectElement;

    fireEvent.click(logoutLink);

    expect(mockUserContext.logout).toHaveBeenCalled();
  });
});
