import AddStockType from "../TransferTypes/AddStockType";
import CheckoutType from "../TransferTypes/CheckoutType";
import StockStateType from "./StockStateType";

interface StockContextType {
  stockState: StockStateType;
  getCategories: () => void;
  putCategory: (name: string) => void;
  putStock: (stock: AddStockType) => void;
  getChart: () => void;
  checkoutItem: (c: CheckoutType) => void;
}

export default StockContextType;
