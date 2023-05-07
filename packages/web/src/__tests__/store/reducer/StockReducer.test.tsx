import Chart from "../../../interface/Stock/ChartType";
import StockAction from "../../../interface/Stock/StockAction";
import { StockTypes } from "../../../interface/Stock/StockStateType";
import { ActionType } from "../../../store/ActionTypes";
import StockReducer, { initState } from "../../../store/reducer/StockReducer";
import { mockChart } from "../../../mock/StockStoreMock";
describe("StockReducer", () => {
  it("should handle SET_CATEGORIES", () => {
    const payload = {
      categories: [
        {
          id: "1",
          name: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      loading: "",
      chart: {} as Chart,
      err: "",
      errMsg: "",
    };
    const action = { type: ActionType.SET_CATEGORIES, payload } as StockAction;
    expect(StockReducer(initState, action)).toEqual({
      ...initState,
      categories: payload.categories,
      loading: "",
    });
  });

  it("should handle SET_CHART", () => {
    const payload = {
      categories: [
        {
          id: "10",
          name: "Category 1",
          createdAt: new Date("2022-02-19T10:00:00Z"),
          updatedAt: new Date("2022-02-18T11:00:00Z"),
        },
      ],
      loading: "",
      chart: mockChart,
      err: "",
      errMsg: "",
    };
    const action = { type: ActionType.SET_CHART, payload } as StockAction;
    expect(StockReducer(initState, action)).toEqual({
      ...initState,
      chart: payload.chart,
      loading: "",
    });
  });

  it("should handle LOADING", () => {
    const payload = { loading: "CHART" };
    const action = { type: ActionType.LOADING, payload } as StockAction;
    expect(StockReducer(initState, action)).toEqual({
      ...initState,
      loading: payload.loading,
    });
  });

  it("should handle STOCK_ERR", () => {
    const payload = { err: StockTypes.CATEGORY, errMsg: "Error message" };

    const action = { type: ActionType.STOCK_ERR, payload } as StockAction;
    expect(StockReducer(initState, action)).toEqual({
      ...initState,
      err: payload.err,
      errMsg: payload.errMsg,
      loading: "",
    });
  });
});
