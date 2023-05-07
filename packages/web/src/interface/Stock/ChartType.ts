import GoodItemsType from "./GoodItemsType";
import ExpiredItemsType from "./ExpiredItemsType";
import SoonToBeExpiredType from "./SoonToBeExpiredType";
import CheckoutHistory from "./CheckoutHistoryType";

interface Chart {
  goodItems: GoodItemsType[];
  checkoutHistory: CheckoutHistory[];
  expiredItems: ExpiredItemsType[];
  soonToBeExpired: SoonToBeExpiredType[];
}

export default Chart;
