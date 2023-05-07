import { UserAction } from "../../interface/User/UserAction";
import UserStateType, {
  GeneralTypes
} from "../../interface/User/UserStateType";
import { ActionType } from "../ActionTypes";

export const initState: UserStateType = {
  username: "",
  token: "",
  userId: "",
  loading: "",
  err: "",
  errMsg: ""
};

const UserReducer = (
  state: UserStateType = initState,
  action: UserAction
): UserStateType => {
  switch (action.type) {
    case ActionType.LOGIN: {
      return {
        ...state,
        loading: GeneralTypes.BLANK,
        username: action.payload?.username,
        userId: action.payload?.userId,
        err: action.payload?.err,
        token: action.payload?.token,
        errMsg: ""
      };
    }
    case ActionType.SIGNUP: {
      return {
        ...state,
        loading: GeneralTypes.BLANK,
        username: action.payload?.username,
        userId: action.payload?.userId,
        err: action.payload?.err,
        token: action.payload?.token,
        errMsg: ""
      };
    }
    case ActionType.ERR: {
      return {
        ...state,
        err: action.payload?.err,
        errMsg: action.payload?.errMsg,
        loading: GeneralTypes.BLANK
      };
    }
    case ActionType.SET_DONORS: {
      return {
        ...state,
        donors: action.payload?.donors,
        loading: GeneralTypes.BLANK
      };
    }
    case ActionType.LOADING:
      return { ...state, loading: action.payload?.loading };
    default:
      return state;
  }
};

export default UserReducer;
