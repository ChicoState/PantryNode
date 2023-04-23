import React, { useEffect, useState } from "react";
import Expiry from "../Components/Expiry/ExpiryTable";
import axiosInstance from "../util/axiosInstance";

type expiryFeed = {
  id: number;
  item: string;
  expiry_date: string;
  quantity: number;
  added_date: string;
};

const ExpiryIndex = () => {
  const [feedList, setFeedList] = useState<expiryFeed[]>([]);
  const [expiredFeedList, setExpiredFeedList] = useState<expiryFeed[]>([]);

  useEffect(() => {
    axiosInstance.get<expiryFeed[]>("feed").then((res: any) => {
      setFeedList(res);
    });
  }, []);

  useEffect(() => {
    if (feedList.length > 0) {
      // filter feeds whose expiry date has passed and sort by expiry_date
      const now = new Date();
      const sortedExpiredFeedList = feedList
        .filter((item) => new Date(item.expiry_date) < now)
        .sort((a, b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime());
      setExpiredFeedList(sortedExpiredFeedList);
    }
  }, [feedList]);

  return <Expiry expiredFeedList={expiredFeedList} />
};

export default ExpiryIndex;