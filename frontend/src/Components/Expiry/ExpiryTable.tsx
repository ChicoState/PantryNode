import React from "react";

import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { expiryFeed } from "../../pages/expiry";

interface ExpiryProps {
  ep: expiryFeed[];
}

const Expiry = (props: ExpiryProps) => {
  let counter = 1;

  return (
    <TableContainer component={Paper} style={{}}>
      <Table>
        <TableHead
          sx={{
            "& th": { color: "white", backgroundColor: "#8C2332" },
          }}
        >
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Item</TableCell>
            <TableCell>Expiry Date</TableCell>
            <TableCell>Added Date</TableCell>
            <TableCell>Stock Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.ep.length > 0 ? (
            props.ep.map((item) => {
              // to change date format 2023-05-04 => May 4, 2023
              // const formattedExpiryDate = new Intl.DateTimeFormat("en-US", {
              //   month: "short",
              //   day: "numeric",
              //   year: "numeric",
              // }).format(new Date(item.expiration));
              // const formattedAddedDate = new Intl.DateTimeFormat("en-US", {
              //   month: "short",
              //   day: "numeric",
              //   year: "numeric",
              // }).format(new Date(item.tran.date));
              return (
                <TableRow key={item.trans_item_id}>
                  <TableCell>{counter++}</TableCell>
                  <TableCell>{item.item.name}</TableCell>
                  <TableCell>{item.expiration}</TableCell>
                  <TableCell>{item.tran.date}</TableCell>
                  <TableCell>
                    {item.quantity < 1 ? "Not available" : item.quantity}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <p>No items</p>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Expiry;
