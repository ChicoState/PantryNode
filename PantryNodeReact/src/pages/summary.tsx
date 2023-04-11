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
  DialogTitle,
  TextField,
  DialogContent,
  Dialog,
  DialogActions,
} from "@mui/material";
var summary = () => {
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
