import React from 'react'
import { Box, Typography } from '@mui/material';

type FeedProps = {
    sortedFeedList: { 
        id: number; 
        item: string; 
        expiry_date: string;
        added_date: string; 
        quantity: number 
    }[];
    
    sortedExpiredFeedList: { 
        id: number; 
        item: string; 
        expiry_date: string;
        added_date: string; 
        quantity: number 
    }[];
  };
  

const Feed = ({ sortedFeedList, sortedExpiredFeedList }: FeedProps) => {
  return (
    <Box sx={{ width: '100%', bgcolor: '', p: 2 }}>
        <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>Feed</Typography>
        <div style={{ display: "flex", flexWrap:"wrap" }}>

            {/* Expiring feed list section */}
            <div style={{ width: "50%" }}>
                <Typography variant="h5" gutterBottom style={{ textAlign: "center" }}>Expiring Soon Items </Typography>

                {
                    sortedFeedList.filter((item) => {
                        const expiryDate = new Date(item.expiry_date).getTime();
                        const currentDate = new Date().getTime();
                        const isExpiring = expiryDate >= currentDate;
                        return isExpiring;
                    } ).map((item, index)=>{
                                            // to change date format 2023-05-04 => May 4, 2023
                    const formattedExpiringDate = new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(item.expiry_date));
                        return (
                            <div key={item.id} 
                                    style={{ 
                                    position:"relative",
                                    display: "flex",
                                    justifyContent: "space-between", 
                                    alignItems: "center", 
                                    padding: "25px",
                                    backgroundColor: "#fff4b2",
                                    margin: "10px",
                                    borderBottom: index !== sortedFeedList.length - 1 ? "1px solid #ccc" : "none" 
                                    }}>
                                <Typography variant="caption" style={{ position:"absolute", top: "5px", right: "10px" }}>
                                    Added on: {item.added_date}
                                </Typography>
                                <Typography style={{ width: "70%" }}>
                                    <b>{item.item}</b> expiring on <b>{formattedExpiringDate}</b>
                                </Typography>
                                
                                <Typography style={{ width:"30%" }}>
                                    <strong>Stock Quantity: { item.quantity<1?"Not available": item.quantity} </strong>
                                </Typography>
                            </div>
                        );
                    })

                }
            </div>
            
            {/* Expired feed list section */}
            <div style={{ width: "50%" }}>
                <Typography variant="h5" gutterBottom style={{ textAlign: "center" }}>Expired Items</Typography>

                {
                sortedExpiredFeedList.filter((item) => {
                    const expiryDate = new Date(item.expiry_date).getTime();
                    const currentDate = new Date().getTime();
                    const isExpired = expiryDate < currentDate;
                    return isExpired;
                }).map((item, index) =>
                {
                    const formattedExpiredDate = new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(item.expiry_date));

                        return (
                            <div key={item.id} 
                                    style={{ 
                                    position:"relative",
                                    display: "flex",
                                    justifyContent: "space-between", 
                                    alignItems: "center", 
                                    padding: "25px",
                                    backgroundColor: "#f9b2b2",
                                    margin: "10px",
                                    borderBottom: index !== sortedExpiredFeedList.length - 1 ? "1px solid #ccc" : "none" 
                                    }}>
                                
                                <Typography variant="caption" style={{ position:"absolute", top: "5px", right: "10px" }}>
                                    Added on: {item.added_date}
                                </Typography>
                                <Typography style={{ width: "70%" }}>
                                    <b>{item.item}</b> expired on <b>{formattedExpiredDate}</b>
                                </Typography>
                                
                                <Typography style={{ width:"30%" }}>
                                    <strong>Stock Quantity:{ item.quantity<1?"Not available": item.quantity}</strong>
                                </Typography>
                            </div>
                        );
                }
                )}
            </div>

        </div>
    </Box>
  )
}

export default Feed;
