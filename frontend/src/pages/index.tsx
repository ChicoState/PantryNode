import React, { useEffect, useState } from "react";
import Feed from "../Components/Feed/Feed";
import axiosInstance from "../util/axiosInstance";

type IFeed = {
  id: number;
  item: string;
  expiry_date: string;
  quantity: number;
  added_date: string;
};

const Index = () => {
  const [feedList, setFeedList] = useState<IFeed[]>([]);
  const [sortedFeedList, setSortedFeedList] = useState<IFeed[]>([]);
  const [sortedExpiredFeedList, setSortedExpiredFeedList] = useState<IFeed[]>(
    []
  );
  useEffect(() => {
    axiosInstance.get<IFeed[]>("feed").then((res: any) => {
      setFeedList(res);
    });
  }, []);

  useEffect(() => {
    if (feedList.length > 0) {
      setSortedFeedList(
        feedList.sort((a, b) => {
          return (
            new Date(a.expiry_date).getTime() -
            new Date(b.expiry_date).getTime()
          );
        })
      );

      // sort feeds by latest date to oldest future expiring date
      setSortedExpiredFeedList(
        feedList.sort((a, b) => {
          return (
            new Date(b.expiry_date).getTime() -
            new Date(a.expiry_date).getTime()
          );
        })
      );
    }
  }, [feedList]);

  return (
    <Feed
      sortedFeedList={sortedFeedList}
      sortedExpiredFeedList={sortedExpiredFeedList}
    />
  );
};

export default Index;
