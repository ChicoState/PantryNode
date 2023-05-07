import DonorType from "./DonorType";

export enum GeneralTypes {
  LOGIN = "LOGIN",
  SIGNUP = "SIGNUP",
  DONOR = "DONOR",
  BLANK = ""
}
export type ErrType = "LOGIN" | "SIGNUP" | "DONOR" | "";

export type LoadingComponent = "LOGIN" | "SIGNUP" | "DONOR" | "";

interface UserStateType {
  username?: string;
  token?: string;
  userId?: string;
  loading?: LoadingComponent;
  err?: ErrType;
  errMsg?: string;
  donors?: DonorType[];
}

export default UserStateType;
