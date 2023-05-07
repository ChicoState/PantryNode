import React from "react";
import { render, screen } from "@testing-library/react";
import UserContext from "../store/context/UserContext";
import App from "../App";
import UserContextType from "../interface/User/UserContextType";
import UserStateType from "../interface/User/UserStateType";

describe("App", () => {
  test("renders login page by default", () => {
    render(
      // <MemoryRouter initialEntries={["/"]}>
      <App />
      // </MemoryRouter>
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  test("renders authenticated routes when authenticated", () => {
    const mockUserState: UserStateType = {
      username: "mockuser",
      token: "mocktoken",
      userId: "mockuserid",
      loading: "",
      err: "",
      errMsg: "",
      donors: [],
    };

    const mockLogin = jest.fn();
    const mockLogout = jest.fn();
    const mockGetDonors = jest.fn();
    const mockAutoLogin = jest.fn();
    const mockRegister = jest.fn();
    const mockRegisterDonor = jest.fn();

    const mockedUserContext: UserContextType = {
      userState: mockUserState,
      login: mockLogin,
      logout: mockLogout,
      getDonors: mockGetDonors,
      autoLogin: mockAutoLogin,
      register: mockRegister,
      registerDonor: mockRegisterDonor,
    };

    render(
      // <MemoryRouter initialEntries={["/home"]}>
      //   <Route path="/home/*">
      <UserContext.Provider value={mockedUserContext}>
        <App />
      </UserContext.Provider>
      //   </Route>
      // </MemoryRouter>
    );
    expect(screen.getByText("Pantry")).toBeInTheDocument();
  });
});
