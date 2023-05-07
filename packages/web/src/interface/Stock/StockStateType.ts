import Category from "./Category";
import Chart from "./ChartType";

export enum StockTypes {
  CATEGORY = "CATEGORY",
  STOCK = "STOCK",
  CHART = "CHART",
  CHECKOUT = "CHECKOUT",
  BLANK = ""
}

export type LoadingStockComponent =
  | "CATEGORY"
  | "STOCK"
  | "CHART"
  | "CHECKOUT"
  | "";

interface StockStateType {
  categories?: Category[];
  loading?: LoadingStockComponent;
  chart?: Chart;
  err?: LoadingStockComponent;
  errMsg?: string;
}

export default StockStateType;
