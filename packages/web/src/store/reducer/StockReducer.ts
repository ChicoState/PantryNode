import { StockAction } from "../../interface/Stock/StockAction";
import StockStateType, {
  StockTypes
} from "../../interface/Stock/StockStateType";
import { ActionType } from "../ActionTypes";

export const initState: StockStateType = {
  categories: [],
  loading: StockTypes.BLANK
};

const StockReducer = (
  state: StockStateType = initState,
  action: StockAction
): StockStateType => {
  switch (action.type) {
    case ActionType.SET_CATEGORIES: {
      return {
        ...state,
        categories: action.payload.categories,
        loading: StockTypes.BLANK
      };
    }
    case ActionType.SET_CHART: {
      return {
        ...state,
        loading: StockTypes.BLANK,
        chart: action.payload.chart
      };
    }
    case ActionType.LOADING: {
      return {
        ...state,
        loading: action.payload.loading
      };
    }
    case ActionType.STOCK_ERR: {
      return {
        ...state,
        loading: StockTypes.BLANK,
        err: action.payload.err,
        errMsg: action.payload.errMsg
      };
    }
    default:
      return state;
  }
};

export default StockReducer;
