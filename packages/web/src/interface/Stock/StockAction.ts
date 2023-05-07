import { ActionTypes } from "../../store/ActionTypes";
import StockStateType from "./StockStateType";

export interface StockAction {
  type: ActionTypes;
  payload: StockStateType;
}
export default StockAction;
