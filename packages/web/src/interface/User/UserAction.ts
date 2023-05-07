import { ActionTypes } from "../../store/ActionTypes";
import UserStateType from "./UserStateType";

export interface UserAction {
  type: ActionTypes;
  payload: UserStateType;
}
