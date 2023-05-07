import UserStateType, {
  ErrType,
  GeneralTypes,
  LoadingComponent
} from "../interface/User/UserStateType";
import StockStateType, {
  LoadingStockComponent
} from "../interface/Stock/StockStateType";
import { ActionType } from "./ActionTypes";
import Category from "../interface/Stock/Category";
import Chart from "../interface/Stock/ChartType";
import { initState } from "./reducer/UserReducer";
import DonorType from "../interface/User/DonorType";

export const loginDispatcher = (response: UserStateType) => ({
  type: ActionType.LOGIN,
  payload: response
});

export const toggleLoading = (l: LoadingComponent) => ({
  type: ActionType.LOADING,
  payload: {
    loading: l
  } as UserStateType
});

export const errDispatcher = (errType: ErrType, msg: string) => {
  return {
    type: ActionType.ERR,
    payload: {
      err: errType,
      errMsg: msg,
      username: "",
      token: "",
      userId: "",
      loading: GeneralTypes.BLANK
    }
  };
};
export const loginSuccessDispatcher = (userData: UserStateType) => ({
  type: ActionType.LOGIN,
  payload: userData
});

export const logoutSuccessDispatcher = () => ({
  type: ActionType.LOGIN,
  payload: initState
});

export const signUpSuccessDispatcher = (userData: UserStateType) => ({
  type: ActionType.SIGNUP,
  payload: userData
});

export const categoriesSuccessDispatcher = (cat: Category[]) => ({
  type: ActionType.SET_CATEGORIES,
  payload: {
    categories: cat
  }
});

export const donorSuccessDispatcher = (d: DonorType[]) => ({
  type: ActionType.SET_DONORS,
  payload: {
    donors: d
  }
});

export const chartSuccessDispatcher = (c: Chart) => ({
  type: ActionType.SET_CHART,
  payload: {
    chart: c
  }
});

export const toggleStockLoading = (l: LoadingStockComponent) => ({
  type: ActionType.LOADING,
  payload: {
    loading: l
  } as StockStateType
});

export const errStock = (err: LoadingStockComponent, errMsg: string) => ({
  type: ActionType.STOCK_ERR,
  payload: {
    err: err,
    errMsg: errMsg
  } as StockStateType
});
