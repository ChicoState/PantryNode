import React, { useEffect, useState } from "react";
import Expiry from "../Components/Expiry/ExpiryTable";
import axiosInstance from "../util/axiosInstance";


import { AppBar, Toolbar, MenuItem, Typography } from "@mui/material";


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


const aboutToExpiryDummyData: expiryFeed[] = [
 {
   trans_item_id: 1,
   item: {
     name: "Apples",
   },
   tran: {
     date: "2023-04-25",
   },
   expiration: "2023-05-01",
   quantity: 3,
 },
 {
   trans_item_id: 2,
   item: {
     name: "Chicken",
   },
   tran: {
     date: "2023-04-23",
   },
   expiration: "2023-04-29",
   quantity: 1,
 },
 {
   trans_item_id: 3,
   item: {
     name: "Yogurt",
   },
   tran: {
     date: "2023-04-27",
   },
   expiration: "2023-05-03",
   quantity: 2,
 },
 {
   trans_item_id: 4,
   item: {
     name: "Cheese",
   },
   tran: {
     date: "2023-04-26",
   },
   expiration: "2023-05-02",
   quantity: 1,
 },
 {
   trans_item_id: 5,
   item: {
     name: "Lettuce",
   },
   tran: {
     date: "2023-04-28",
   },
   expiration: "2023-05-04",
   quantity: 2,
 },
];


// Stringifying the dummy data as the database is returning the data as a string.
const aboutToExpiryDummyDataString = JSON.stringify(aboutToExpiryDummyData);


const expiryDummyData: expiryFeed[] = [
 {
   trans_item_id: 1,
   item: {
     name: "Apples",
   },
   tran: {
     date: "2023-04-25",
   },
   expiration: "2023-05-01",
   quantity: 3,
 },
 {
   trans_item_id: 2,
   item: {
     name: "Chicken",
   },
   tran: {
     date: "2023-04-23",
   },
   expiration: "2023-04-29",
   quantity: 1,
 },
 {
   trans_item_id: 3,
   item: {
     name: "Yogurt",
   },
   tran: {
     date: "2023-04-27",
   },
   expiration: "2023-05-03",
   quantity: 2,
 },
 {
   trans_item_id: 4,
   item: {
     name: "Cheese",
   },
   tran: {
     date: "2023-04-26",
   },
   expiration: "2023-05-02",
   quantity: 1,
 },
 {
   trans_item_id: 5,
   item: {
     name: "Lettuce",
   },
   tran: {
     date: "2023-04-28",
   },
   expiration: "2023-05-04",
   quantity: 2,
 },
];


// Stringifying the dummy data as the database is returning the data as a string.
const expiryDummyDataString = JSON.stringify(expiryDummyData);


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


 const [selectedSortBy, setSelectedSortBy] = useState<string>("Expiry Date");
 const [selectedSortBy2, setSelectedSortBy2] = useState<string>("Expiry Date");


 // console.log(Category);


 useEffect(() => {
   axiosInstance.get<expiryFeed[]>("/items/expired").then((res: any) => {
     // uncomment the below line for production use
     // setFeedList(JSON.parse(res) as expiryFeed[]);


     // Comment or Remove the below line for production use
     const data = JSON.parse(expiryDummyDataString) as expiryFeed[];

     const sortedData = data.sort((a, b) => {
       const aExpiry = new Date(a.expiration).getTime();
       const bExpiry = new Date(b.expiration).getTime();
       return aExpiry - bExpiry;
     });
     setFeedList(sortedData);
   });
   axiosInstance
     .get<expiryFeed[]>("/items/nearly_expired")
     .then((res: any) => {
       // uncomment the below line for production use
       // setNearlyExpiredFeedList(JSON.parse(res) as expiryFeed[]);


       // Comment or Remove the below line for production use
       const data = JSON.parse(aboutToExpiryDummyDataString) as expiryFeed[];


       const sortedData = data.sort((a, b) => {
         const aExpiry = new Date(a.expiration).getTime();
         const bExpiry = new Date(b.expiration).getTime();
         return aExpiry - bExpiry;
       });


       setNearlyExpiredFeedList(sortedData);
     });
 }, []);


 const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
   setSelectedSortBy(event.target.value);
   console.log(event.target.value);
   if (event.target.value == "Item") {
     feedList.sort((a, b) => {
       if (a.item.name < b.item.name) {
         return -1;
       } else if (a.item.name > b.item.name) {
         return 1;
       } else {
         return 0;
       }
     });
   } else if (event.target.value == "Expiry Date") {
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


   console.log(feedList);
   setFeedList(feedList);
 };


 const handleSortByChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
   setSelectedSortBy2(event.target.value);
   console.log(event.target.value);
   if (event.target.value == "Item") {
     nearlyExpiredFeedList.sort((a, b) => {
       if (a.item.name < b.item.name) {
         return -1;
       } else if (a.item.name > b.item.name) {
         return 1;
       } else {
         return 0;
       }
     });
   } else if (event.target.value == "Expiry Date") {
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


   console.log(nearlyExpiredFeedList);
   setNearlyExpiredFeedList(nearlyExpiredFeedList);
 };


 const sortByList = ["Expiry Date", "Item"];


 return (
   <div>
     <AppBar
       position="static"
       style={{ marginBottom: 10, alignItems: "center" }}
     >
       <Toolbar>
         <h2>Expiry Items</h2>
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
         <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
           <h3>Expired Items</h3>
           <div>
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
           </div>
         </Toolbar>
         <Expiry ep={feedList} />
       </div>
       <div>
         <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
           <h3>Expiring Soon</h3>
           <div>
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
           </div>
         </Toolbar>
         <Expiry ep={nearlyExpiredFeedList} />
       </div>
     </div>
   </div>
 );
};

export default ExpiryIndex;
