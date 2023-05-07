import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Donor from "../../components/Donor";
import { MemoryRouter } from "react-router";
import { mockUserContext } from "../../mock/UserStoreMock";
import UserContext from "../../store/context/UserContext";

describe("Donor component", () => {
  const mockRegisterDonor = jest.fn();
  afterEach(cleanup);
  const setup = () => {
    return render(
      <UserContext.Provider
        value={{
          userState: mockUserContext.userState,
          login: jest.fn(),
          logout: jest.fn(),
          getDonors: jest.fn(),
          autoLogin: jest.fn(),
          register: jest.fn(),
          registerDonor: mockRegisterDonor,
        }}
      >
        <MemoryRouter>
          <Donor />
        </MemoryRouter>
      </UserContext.Provider>
    );
  };
  it("should render the form with inputs and a submit button", () => {
    setup();
    const nameInput = screen.getByLabelText("Name");
    expect(nameInput).toBeInTheDocument();
    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    const phoneInput = screen.getByLabelText("Phone");
    expect(phoneInput).toBeInTheDocument();
    const locInput = screen.getByLabelText("Location");
    expect(locInput).toBeInTheDocument();
    const userTypeSelect = screen.getByLabelText("Type of User");
    expect(userTypeSelect).toBeInTheDocument();
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();
  });

  it("should update the form values when inputs change", () => {
    setup();
    const nameInput = screen.getByLabelText("Name") as HTMLSelectElement;
    fireEvent.change(nameInput, { target: { value: "Test Name" } });
    expect(nameInput.value).toBe("Test Name");
    const emailInput = screen.getByLabelText("Email") as HTMLSelectElement;
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");
    const phoneInput = screen.getByLabelText("Phone") as HTMLSelectElement;
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    expect(phoneInput.value).toBe("1234567890");
    const locInput = screen.getByLabelText("Location") as HTMLSelectElement;
    fireEvent.change(locInput, { target: { value: "Test Location" } });
    expect(locInput.value).toBe("Test Location");
    const userTypeSelect = screen.getByLabelText(
      "Type of User"
    ) as HTMLSelectElement;
    fireEvent.change(userTypeSelect, { target: { value: "anonymous" } });
    expect(userTypeSelect.value).toBe("anonymous");
  });

  it("should submit the form when the submit button is clicked", () => {
    setup();
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const phoneInput = screen.getByLabelText("Phone");
    const locInput = screen.getByLabelText("Location");
    const userTypeSelect = screen.getByLabelText("Type of User");
    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.change(nameInput, { target: { value: "Test Name" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(locInput, { target: { value: "Test Location" } });
    fireEvent.change(userTypeSelect, { target: { value: "anonymous" } });
    fireEvent.click(submitButton);
    expect(mockRegisterDonor).toHaveBeenCalledWith({
      name: "Test Name",
      email: "test@example.com",
      phone: "1234567890",
      location: "Test Location",
      type: "anonymous",
    });
  });
});
