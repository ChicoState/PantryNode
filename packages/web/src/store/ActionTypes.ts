export enum ActionType {
  LOADING = "LOADING",
  LOGIN = "LOGIN",
  ERR = "ERR",
  LOGOUT = "LOGOUT",
  SIGNUP = "SIGNUP",
  SET_CATEGORIES = "SET_CATEGORIES",
  SET_CHART = "SET_CHART",
  STOCK_ERR = "STOCK_ERR",
  SET_DONORS = "SET_DONORS"
}

export type ActionTypes =
  | ActionType.LOADING
  | ActionType.LOGIN
  | ActionType.LOGOUT
  | ActionType.SIGNUP
  | ActionType.ERR
  | ActionType.SET_CHART
  | ActionType.SET_DONORS
  | ActionType.STOCK_ERR
  | ActionType.SET_CATEGORIES;
