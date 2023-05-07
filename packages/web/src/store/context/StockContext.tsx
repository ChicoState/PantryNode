import { createContext } from "react";
import StockContextType from "../../interface/Stock/StockContextType";

const StockContext = createContext<StockContextType | null>(null);

export default StockContext;
