import { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TableCell,
  Grid,
} from "@mui/material";
var summary = () => {
  interface purchaseInterface {
    name: string;
    type: string;
    quantity: number;
    date: string;
  }

  interface currentStockInterface  {
    name: string;
    type: string;
    stockedDate: string;
    expiryDate: string;
  }

  interface wasteManagementInterface  {
    name: string;
    quantity: number;
    date: string;
  }

  interface expiryInterface  {
    name: string;
    daysRemaining: number;
    date: string;
  }

  const initialDataPurchase: purchaseInterface[] = [
    { name: "John", type: "Food", quantity: 1, date: "2021-10-10" },
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
  ];

  return (
    <div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={10} md={6}>
          <strong>Purchases</strong>
          <br />
          Total Checkout: 0 | Total Quantity Checked Out: 0{/*Purchase Table*/}
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
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={10} md={6}>
        <strong>Current Stock</strong>
          <br />
          Total Items in Stock: 0
          {/*Current Stock Table*/}
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
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={10} md={6}>
          <strong>Waste Management</strong>
          <br />
          Total Expired: 0
          {/*Waste Management Table*/}
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
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={10} md={6}>
        <strong>Soon to Expire</strong>
          <br />
          <br />
          {/*Soon to Expire Table*/}
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
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default summary;
