import React from "react";
import Feed from "../Components/Feed/Feed";

const index = () => {
  const feedList = [
    {
      id: 1,
      item: "Rice",
      expiry_date: "2023-08-12",
      quantity: 1,
      added_date: "2023-04-25",
    },
    {
      id: 2,
      item: "Onion",
      expiry_date: "2023-06-04",
      quantity: 5,
      added_date: "2023-04-15",
    },
    {
      id: 3,
      item: "Potatoes",
      expiry_date: "2023-10-11",
      quantity: 3,
      added_date: "2023-09-16",
    },
    {
      id: 4,
      item: "Eggs",
      expiry_date: "2023-01-07",
      quantity: 0,
      added_date: "2022-12-28",
    },
    {
      id: 5,
      item: "Milk",
      expiry_date: "2023-04-04",
      quantity: 2,
      added_date: "2023-03-29",
    },
    {
      id: 6,
      item: "Canned Beans",
      expiry_date: "2023-08-11",
      quantity: 11,
      added_date: "2023-07-25",
    },
    {
      id: 7,
      item: "Peanut Butter",
      expiry_date: "2023-08-10",
      quantity: 3,
      added_date: "2023-07-21",
    },
    {
      id: 8,
      item: "Canned Chicken",
      expiry_date: "2023-06-22",
      quantity: 5,
      added_date: "2023-06-12",
    },
    {
      id: 9,
      item: "Whole grain cereals",
      expiry_date: "2023-10-03",
      quantity: 5,
      added_date: "2023-09-27",
    },
    {
      id: 10,
      item: "Ramen",
      expiry_date: "2023-03-12",
      quantity: 7,
      added_date: "2023-03-01",
    },
    {
      id: 11,
      item: "Oranges",
      expiry_date: "2023-02-24",
      quantity: 13,
      added_date: "2023-02-14",
    },
    {
      id: 12,
      item: "Apples",
      expiry_date: "2022-10-15",
      quantity: 15,
      added_date: "2023-10-04",
    },
    {
      id: 13,
      item: "Chilies",
      expiry_date: "2023-05-14",
      quantity: 15,
      added_date: "2023-05-04",
    },
  ];

  // copy of feedList array
  const feedListCopy = [...feedList];

  // sort feeds by latest date to oldest future expiring date
  const sortedFeedList = feedListCopy.sort((a, b) => {
    return (
      new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime()
    );
  });

  // sort feeds by latest expired to oldest expired date
  const sortedExpiredFeedList = feedList.sort((a, b) => {
    return (
      new Date(b.expiry_date).getTime() - new Date(a.expiry_date).getTime()
    );
  });

  return (
    <Feed
      sortedFeedList={sortedFeedList}
      sortedExpiredFeedList={sortedExpiredFeedList}
    />
  );
};

export default index;
