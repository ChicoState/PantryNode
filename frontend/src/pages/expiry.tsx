import React, { useEffect, useState } from "react";
import Expiry from "../Components/Expiry/ExpiryTable";
import axiosInstance from "../util/axiosInstance";

import {
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

type expiryFeed = {
  id: number;
  item: string;
  expiry_date: string;
  quantity: number;
  added_date: string;
  category: string;
};

type Category = {
  id: number;
  name: string;
};

const ExpiryIndex = () => {
  const [feedList, setFeedList] = useState<expiryFeed[]>([]);
  const [expiredFeedList, setExpiredFeedList] = useState<expiryFeed[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    axiosInstance.get<Category[]>("categories").then((res) => {
      setCategoryList(res as any);
    });
  }, []);

  useEffect(() => {
    axiosInstance.get<expiryFeed[]>("feed").then((res: any) => {
      setFeedList(res);
    });
  }, []);

  useEffect(() => {
    if (feedList.length > 0) {
      // filter feeds whose expiry date has passed and sort by expiry_date
      const now = new Date();
      const filteredFeedList = selectedCategory === "All" ? feedList : feedList.filter((item) => item.category === selectedCategory);
      const sortedExpiredFeedList = filteredFeedList
        .filter((item) => new Date(item.expiry_date) < now)
        .sort((a, b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime());
      setExpiredFeedList(sortedExpiredFeedList);
    }
  }, [feedList, selectedCategory]);

  console.log(expiredFeedList);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const categories = ["All", ...categoryList.map((category) => category.name)];

  return (
    <div>
      <AppBar position="static" style={{marginBottom: 10}}>
      <Toolbar>
        <div style={{flexDirection: "column", justifyContent: "center", display: "flex", alignItems: "center"}}>
        <Typography>
          Category
        </Typography>
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
      <Expiry expiredFeedList={expiredFeedList} />
    </div>
  );
};


export default ExpiryIndex;