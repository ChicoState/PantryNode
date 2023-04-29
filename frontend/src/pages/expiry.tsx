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
  const [selectedSortBy, setSelectedSortBy] = useState<string>("Item");
  const [selectedSortBy2, setSelectedSortBy2] = useState<string>("Item");
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

  const handleSortByChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSortBy(event.target.value);
    console.log(event.target.value)
    if(event.target.value == "Item") {
      feedList.sort((a, b) => {
        if (a.item.name < b.item.name) {
          return -1;
        } else if (a.item.name > b.item.name) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    else if(event.target.value == "Expiry Date") {
      feedList.sort((a, b) => {
        if (a.expiration < b.expiration) {
          return -1;
        } else if (a.expiration > b.expiration) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    
    console.log(feedList)
    setFeedList(feedList)
  };

  const handleSortByChange2 = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSortBy2(event.target.value);
    console.log(event.target.value)
    if(event.target.value == "Item") {
      nearlyExpiredFeedList.sort((a, b) => {
        if (a.item.name < b.item.name) {
          return -1;
        } else if (a.item.name > b.item.name) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    else if(event.target.value == "Expiry Date") {
      nearlyExpiredFeedList.sort((a, b) => {
        if (a.expiration < b.expiration) {
          return -1;
        } else if (a.expiration > b.expiration) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    
    console.log(nearlyExpiredFeedList)
    setNearlyExpiredFeedList(nearlyExpiredFeedList)
  };

  const categories = ["All", ...categoryList.map((category) => category.name)];
  const sortByList = ["Item", "Expiry Date"];


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
          <Typography>Sort By</Typography>
            <select value={selectedSortBy} onChange={handleSortByChange}>
              {sortByList.map((category) => (
                <option key={category} value={category}>
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                </option>
              ))}
            </select>
          <Expiry ep={feedList} />
        </div>
        <div>
          <h3>Expiring Soon</h3>
          <Typography>Sort By</Typography>
            <select value={selectedSortBy2} onChange={handleSortByChange2}>
              {sortByList.map((category) => (
                <option key={category} value={category}>
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                </option>
              ))}
            </select>
          <Expiry ep={nearlyExpiredFeedList} />
        </div>
      </div>
    </div>
  );
};

export default ExpiryIndex;
