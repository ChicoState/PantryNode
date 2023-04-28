import React, { useEffect, useState } from "react";
import Expiry from "../Components/Expiry/ExpiryTable";
import axiosInstance from "../util/axiosInstance";

import { AppBar, Toolbar, MenuItem, Typography } from "@mui/material";
import { Category } from "@mui/icons-material";

export type expiryFeed = {
  trans_item_id: number;
  item: {
    name: string;
  };
  tran: {
    date: string;
  };
  expiration: string;
  quantity: number;
};

type Category = {
  id: number;
  name: string;
};

const ExpiryIndex = () => {
  const [feedList, setFeedList] = useState<expiryFeed[]>([
    {
      trans_item_id: 0,
      item: {
        name: "",
      },
      tran: {
        date: "",
      },
      expiration: "",
      quantity: 0,
    } as expiryFeed,
  ]);
  const [nearlyExpiredFeedList, setNearlyExpiredFeedList] = useState<
    expiryFeed[]
  >([
    {
      trans_item_id: 1,
      item: {
        name: "test",
      },
      tran: {
        date: "test",
      },
      expiration: "test",
      quantity: 1,
    } as expiryFeed,
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    axiosInstance.get<Category[]>("categories").then((res) => {
      setCategoryList(res as any);
    });
  }, []);

  // console.log(Category);

  useEffect(() => {
    axiosInstance.get<expiryFeed[]>("/items/expired").then((res: any) => {
      setFeedList(JSON.parse(res) as expiryFeed[]);
    });
    axiosInstance
      .get<expiryFeed[]>("/items/nearly_expired")
      .then((res: any) => {
        setNearlyExpiredFeedList(JSON.parse(res) as expiryFeed[]);
      });
  }, []);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const categories = ["All", ...categoryList.map((category) => category.name)];

  return (
    <div>
      <h2>ExpiredItems</h2>
      <AppBar position="static" style={{ marginBottom: 10 }}>
        <Toolbar>
          <div
            style={{
              flexDirection: "column",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography>Category</Typography>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                </option>
              ))}
            </select>
          </div>
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridColumnGap: "20px",
        }}
      >
        <div>
          <h3>Expired Items</h3>
          <Expiry ep={feedList} />
        </div>
        <div>
          <h3>Expiring Soon</h3>
          <Expiry ep={nearlyExpiredFeedList} />
        </div>
      </div>
    </div>
  );
};

export default ExpiryIndex;
