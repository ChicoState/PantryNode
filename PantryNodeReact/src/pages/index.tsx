import React from "react";
import { Box, Grid, Card, CardContent, Container, Typography } from '@mui/material';

const index = () => {

  const feedList = [
    { id: 1, item: "Rice", expiry_date: "2023-08-12", quantity:1 },
    { id: 2, item: "Onion", expiry_date: "2023-06-04", quantity:5 },
    { id: 3, item: "Potatoes", expiry_date: "2023-10-11", quantity:3 },
    { id: 4, item: "Eggs", expiry_date: "2023-01-07", quantity:6 },
    { id: 5, item: "Milk", expiry_date: "2023-04-04", quantity:2 },
    { id: 6, item: "Canned Beans", expiry_date: "2023-08-11", quantity:11 },
    { id: 7, item: "Peanut Butter", expiry_date: "2023-08-10", quantity:3 },
    { id: 8, item: "Canned Chicken", expiry_date: "2023-06-22", quantity:5 },
    { id: 9, item: "Whole grain cereals", expiry_date: "2023-10-03", quantity:5 },
    { id: 10, item: "Ramen", expiry_date: "2023-03-12", quantity:7 },
    { id: 11, item: "Oranges", expiry_date: "2023-02-24", quantity:13 },
    { id: 12, item: "Apples", expiry_date: "2023-10-15", quantity:15 },
  ];

  // sort by ascending dates
  const sortedFeedList = feedList.sort((a, b) => {
    return new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime();
  });

  return (

    <Box sx={{ width: '100%', bgcolor: '', p: 2 }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        Feed
      </Typography>

      <div style={{ display: "flex", flexWrap:"wrap", justifyContent: "space-between", alignItems: "center",}}>

        {sortedFeedList.map((item, index) => {
          
          const expiryDate = new Date(item.expiry_date).getTime();
          const currentDate = new Date().getTime();
          const isExpiring = expiryDate > currentDate && expiryDate - currentDate < 7 * 24 * 60 * 60 * 1000;
          const isExpired = expiryDate <= currentDate;
          return (
            <div key={item.id} 
                  style={{ 
                    display: "flex",
                    width:"48%",
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    padding: "25px",
                    backgroundColor:"#eee8e8",
                    margin: "10px",
                    borderBottom: index !== sortedFeedList.length - 1 ? "1px solid #ccc" : "none" 
                  }}>
              
                    <Typography key={item.id}>
                      {item.item} {isExpiring ? "expiring soon" : isExpired ? "expired on" : "getting expiring on"} {item.expiry_date}
                    </Typography>
                    
                    <Typography key={item.id}>
                      <strong>Stock Quantity:{item.quantity}</strong>
                    </Typography>

              
            
            </div>
          );
        })}

      </div>

    </Box>
  );
};

export default index;
