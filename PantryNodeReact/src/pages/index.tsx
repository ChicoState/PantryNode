import React from "react";
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import Layout from "../Components/Layout";

const index = () => {

  const feedList = [
    { id: 1, item: "Rice", expiry_date: "2023-08-12" },
    { id: 2, item: "Onion", expiry_date: "2023-06-04" },
    { id: 3, item: "Potatoes", expiry_date: "2023-10-11" },
    { id: 4, item: "Eggs", expiry_date: "2023-01-07" },
    { id: 5, item: "Milk", expiry_date: "2023-04-04" },
    { id: 6, item: "Canned Beans", expiry_date: "2023-08-11" },
    { id: 7, item: "Peanut Butter", expiry_date: "2023-08-10" },
    { id: 8, item: "Canned Chicken", expiry_date: "2023-06-22" },
    { id: 9, item: "Whole grain cereals", expiry_date: "2023-10-03" },
    { id: 10, item: "Ramen", expiry_date: "2023-03-12" },
    { id: 11, item: "Oranges", expiry_date: "2023-02-24" },
    { id: 12, item: "Apples", expiry_date: "2023-10-15" },
  ];

  const sortedFeedList = feedList.sort((a, b) => {
    return new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime();
  });

  return (
    <Box sx={{ width: '100%', bgcolor: '#f5f5f5', p: 2 }}>
    <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
      Feed
    </Typography>
    {sortedFeedList.map((item, index) => (
      <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: index !== sortedFeedList.length - 1 ? "1px solid #ccc" : "none" }}>
        <Typography key={item.id}>
          {item.item} expiring on {item.expiry_date}
        </Typography>
      </div>
    ))}
  </Box>


  );
};

export default index;
