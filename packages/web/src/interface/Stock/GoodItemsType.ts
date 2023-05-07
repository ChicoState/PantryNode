import Category from "./Category";
import Stock from "./StockDetailsType";
interface GoodItemsType {
  Category: Category;
  CategoryId: string;
  ExpiryDate: Date;
  ItemName: string;
  Stock: Stock;
  StockId: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}
export default GoodItemsType;
