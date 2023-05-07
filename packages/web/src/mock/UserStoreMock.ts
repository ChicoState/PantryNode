import UserContextType from "../interface/User/UserContextType";

export const mockUserContext: UserContextType = {
  userState: {
    username: "testuser",
    token: "testuserToken",
    userId: "1",
    loading: "",
    err: "",
    errMsg: "",
    donors: [
      {
        name: "test",
        email: "t@t.com",
        location: "testLoc",
        type: "testType",
        phone: "1234567890",
        createdAt: new Date("2022-02-19T10:00:00Z"),
        id: "1",
        updatedAt: new Date("2022-02-20T10:00:00Z"),
      },
    ],
  },
  login: jest.fn(),
  logout: jest.fn(),
  getDonors: jest.fn(),
  autoLogin: jest.fn(),
  register: jest.fn(),
  registerDonor: jest.fn(),
};
