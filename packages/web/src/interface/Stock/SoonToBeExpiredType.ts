import Category from "./Category";
import Stock from "./StockDetailsType";

interface SoonToBeExpiredType {
  Category: Category;
  CategoryId: string;
  ExpiryDate: Date;
  ItemName: string;
  Stock: Stock;
  StockId: string;
  createdAt: Date;
  id: string;
  updatedAt: Date;
}

export default SoonToBeExpiredType;
