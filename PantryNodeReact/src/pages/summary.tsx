import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TableCell,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
var summary = () => {
  interface purchaseInterface {
    name: string;
    type: string;
    quantity: number;
    date: string;
  }

  interface currentStockInterface {
    name: string;
    type: string;
    stockedDate: string;
    expiryDate: string;
  }

  interface wasteManagementInterface {
    name: string;
    quantity: number;
    date: string;
  }

  interface expiryInterface {
    name: string;
    daysRemaining: number;
    date: string;
  }

  const initialDataPurchase: purchaseInterface[] = [
    { name: "John", type: "Food", quantity: 3, date: "2021-10-10" },
    { name: "Danny", type: "Food", quantity: 1, date: "2021-10-10" },
    { name: "John", type: "Food", quantity: 3, date: "2021-10-10" },
    { name: "Danny", type: "Food", quantity: 1, date: "2021-10-10" },
    { name: "John", type: "Food", quantity: 3, date: "2021-10-10" },
    { name: "Danny", type: "Food", quantity: 1, date: "2021-10-10" },
    { name: "Danny", type: "Food", quantity: 1, date: "2021-10-10" },
    { name: "Danny", type: "Food", quantity: 1, date: "2021-10-10" },
    { name: "Danny", type: "Food", quantity: 1, date: "2021-10-10" },
    { name: "Danny", type: "Food", quantity: 1, date: "2021-10-10" },
    { name: "Danny", type: "Food", quantity: 1, date: "2021-10-10" },
    { name: "Danny", type: "Food", quantity: 1, date: "2021-10-10" },
  ];

  const initialDataCurrentStock: currentStockInterface[] = [
    { name: "John", type: "Food", stockedDate: "2021-10-10", expiryDate: "2021-10-10" }, 
    { name: "Danny", type: "Food", stockedDate: "2021-10-10", expiryDate: "2021-10-10" },
  ];

  const initialDataWasteManagement: wasteManagementInterface[] = [
    { name: "John", quantity: 1, date: "2021-10-10" },
    { name: "Danny", quantity: 1, date: "2021-10-10" },
  ];

  const initialDataExpiry: expiryInterface[] = [
    { name: "John", daysRemaining: 1, date: "2021-10-10" },
    { name: "Danny", daysRemaining: 1, date: "2021-10-10" },
    { name: "John", daysRemaining: 1, date: "2021-10-10" },
    { name: "Danny", daysRemaining: 1, date: "2021-10-10" },
    { name: "John", daysRemaining: 1, date: "2021-10-10" },
    { name: "Danny", daysRemaining: 1, date: "2021-10-10" },
    { name: "John", daysRemaining: 1, date: "2021-10-10" },
    { name: "Danny", daysRemaining: 1, date: "2021-10-10" },

  ];
  
  var purchaseTotal = initialDataCurrentStock.length;
  //Get sum of all quantities in purchases
  var purchaseQuantityTotal = initialDataPurchase.reduce(
    (acc, cur) => acc + cur.quantity, 
    0
  );
  var currentStockTotal = initialDataCurrentStock.length;
  var totalExpired = initialDataWasteManagement.length;

  return (
    <div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={10} md={6}>
          <strong>Purchases</strong>
          <br />
          Total Checkout: {purchaseTotal} | Total Quantity Checked Out: {purchaseQuantityTotal}
          {/*Purchase Table*/}
          <Box style={{maxHeight: '40vh', overflow: 'auto'}}>
            <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Type</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Quantity</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Date</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {initialDataPurchase.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item xs={10} md={6}>
          <strong>Current Stock</strong>
          <br />
          Total Items in Stock: {currentStockTotal}
          {/*Current Stock Table*/}
          <Box style={{maxHeight: '40vh', overflow: 'auto'}}>
            <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Type</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Stocked Date</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Expiry Date</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {initialDataCurrentStock.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.stockedDate}</TableCell>
                      <TableCell>{row.expiryDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item xs={10} md={6}>
          <strong>Waste Management</strong>
          <br />
          Total Expired: {totalExpired}
          {/*Waste Management Table*/}
          <Box style={{maxHeight: '40vh', overflow: 'auto'}}>

            <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Quantity</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Date</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {initialDataWasteManagement.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item xs={10} md={6}>
          <strong>Soon to Expire</strong>
          <br />
          <br />
          {/*Soon to Expire Table*/}
          <Box style={{maxHeight: '40vh', overflow: 'auto'}}>
            <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Days Remaining</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Date</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {initialDataExpiry.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.daysRemaining}</TableCell>
                      <TableCell>{row.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default summary;
