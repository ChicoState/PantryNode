import React from 'react'
import { Box, Typography } from '@mui/material';

type FeedProps = {
    sortedFeedList: { 
        id: number; 
        item: string; 
        expiry_date: string; 
        quantity: number 
    }[];
  };
  

const Feed = ({ sortedFeedList }: FeedProps) => {
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
                <Typography>
                    {item.item} {isExpiring ? "expiring soon" : isExpired ? "expired on" : "getting expiring on"} {item.expiry_date}
                </Typography>
                
                <Typography>
                    <strong>Stock Quantity:{item.quantity}</strong>
                </Typography>
            </div>
          );
        })}
      </div>
    </Box>
  )
}

export default Feed;