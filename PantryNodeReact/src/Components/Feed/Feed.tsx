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
        <div style={{ display: "flex", flexWrap:"wrap" }}>
            <div style={{ width: "50%" }}>
                <Typography variant="h5" gutterBottom>
                    Expiring Soon Items
                </Typography>
                {sortedFeedList.map((item, index) => {
                    const expiryDate = new Date(item.expiry_date).getTime();
                    const currentDate = new Date().getTime();
                    const isExpiring = expiryDate > currentDate;
                    if(isExpiring){
                        return (
                            <div key={item.id} 
                                    style={{ 
                                    display: "flex",
                                    justifyContent: "space-between", 
                                    alignItems: "center", 
                                    padding: "25px",
                                    backgroundColor: isExpiring ? "#fff4b2" : "#eee8e8",
                                    margin: "10px",
                                    borderBottom: index !== sortedFeedList.length - 1 ? "1px solid #ccc" : "none" 
                                    }}>
                                <Typography style={{ width: "70%" }}>
                                    {item.item} expiring soon on {item.expiry_date}
                                </Typography>
                                
                                <Typography style={{ width:"30%" }}>
                                    <strong>Stock Quantity:{item.quantity}</strong>
                                </Typography>
                            </div>
                        );
                    }
                })}
            </div>

            <div style={{ width: "50%" }}>
                <Typography variant="h5" gutterBottom>
                    Expired Items
                </Typography>
                {sortedFeedList.map((item, index) => {
                    const expiryDate = new Date(item.expiry_date).getTime();
                    const currentDate = new Date().getTime();
                    const isExpired = expiryDate < currentDate;
                    if (isExpired){
                        return (
                            <div key={item.id} 
                                    style={{ 
                                    display: "flex",
                                    justifyContent: "space-between", 
                                    alignItems: "center", 
                                    padding: "25px",
                                    backgroundColor: "#f9b2b2",
                                    margin: "10px",
                                    borderBottom: index !== sortedFeedList.length - 1 ? "1px solid #ccc" : "none" 
                                    }}>
                                <Typography style={{ width: "70%" }}>
                                    {item.item} expired on {item.expiry_date}
                                </Typography>
                                
                                <Typography style={{ width:"30%" }}>
                                    <strong>Stock Quantity:{item.quantity}</strong>
                                </Typography>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    </Box>

  )
}

export default Feed;