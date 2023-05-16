import React, { useEffect, useState } from "react";
import StockChart from "../Components/Stock/StockChart";
import axiosInstance from "../util/axiosInstance";

type cur_stock = {
  name: string;
  category: string;
  quantity: number;
};

const Stock = () => {
  const [stockList, setStockList] = useState<cur_stock[]>([]);
  const [sortedStockList, setSortedStockList] = useState<cur_stock[]>([]);
  // const [sortedExpiredFeedList, setSortedExpiredFeedList] = useState<cur_stock[]>(
  //   []
  // );
  useEffect(() => {
    axiosInstance.get<cur_stock[]>("stock").then((res: any) => {
      setStockList(res);
    });
  }, []);

  useEffect(() => {
    if (stockList.length > 0) {
      setSortedStockList(
        stockList.sort()
      );

      // sort feeds by latest date to oldest future expiring date
      // setSortedExpiredFeedList(
      //   feedList.sort((a, b) => {
      //     return (
      //       new Date(b.expiry_date).getTime() -
      //       new Date(a.expiry_date).getTime()
      //     );
      //   })
      // );
    }
  }, [stockList]);

  return (
    <StockChart
      sortedStockList={sortedStockList}
      // sortedExpiredFeedList={sortedExpiredFeedList}
    />
  );
};

export default Stock;
