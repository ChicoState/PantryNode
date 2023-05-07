import { UserAction } from "../../../interface/User/UserAction";
import UserStateType, {
  GeneralTypes
} from "../../../interface/User/UserStateType";
import { ActionType } from "../../../store/ActionTypes";
import UserReducer, { initState } from "../../../store/reducer/UserReducer";

describe("UserReducer", () => {
  it("should return the initial state", () => {
    expect(UserReducer(undefined, {} as UserAction)).toEqual(initState);
  });

  it("should handle LOGIN", () => {
    const payload = {
      username: "testuser",
      userId: "123",
      err: "",
      token: "abc123"
    };
    const expectedState: UserStateType = {
      ...initState,
      loading: "",
      username: payload.username,
      userId: payload.userId,
      err: GeneralTypes.BLANK,
      token: payload.token,
      errMsg: ""
    };
    const action: UserAction = {
      type: ActionType.LOGIN,
      payload: payload
    } as UserAction;
    expect(UserReducer(initState, action)).toEqual(expectedState);
  });

  it("should handle SIGNUP", () => {
    const payload = {
      username: "testuser",
      userId: "123",
      err: "",
      token: "abc123"
    };
    const expectedState: UserStateType = {
      ...initState,
      loading: "",
      username: payload.username,
      userId: payload.userId,
      err: GeneralTypes.BLANK,
      token: payload.token,
      errMsg: ""
    };
    const action: UserAction = {
      type: ActionType.SIGNUP,
      payload: payload
    } as UserAction;
    expect(UserReducer(initState, action)).toEqual(expectedState);
  });

  it("should handle ERR", () => {
    const payload = {
      err: "DONOR",
      errMsg: "Something went wrong"
    };
    const expectedState: UserStateType = {
      ...initState,
      err: GeneralTypes.DONOR,
      errMsg: payload.errMsg,
      loading: ""
    };
    const action: UserAction = {
      type: ActionType.ERR,
      payload: payload
    } as UserAction;
    expect(UserReducer(initState, action)).toEqual(expectedState);
  });

  it("should handle SET_DONORS", () => {
    const payload = {
      donors: [
        {
          name: "t",
          email: "t@t.com",
          location: "tLoc",
          type: "tType",
          phone: "1234567890",
          createdAt: new Date(),
          id: "1",
          updatedAt: new Date()
        }
      ]
    };
    const expectedState: UserStateType = {
      ...initState,
      donors: payload.donors,
      loading: ""
    };
    const action: UserAction = {
      type: ActionType.SET_DONORS,
      payload: payload
    };
    expect(UserReducer(initState, action)).toEqual(expectedState);
  });

  it("should handle LOADING", () => {
    const payload = {
      loading: GeneralTypes.LOGIN
    };
    const expectedState: UserStateType = {
      ...initState,
      loading: GeneralTypes.LOGIN
    };
    const action: UserAction = {
      type: ActionType.LOADING,
      payload: payload
    };
    expect(UserReducer(initState, action)).toEqual(expectedState);
  });
});
