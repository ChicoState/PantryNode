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

type ExpiryProps = {
  expiredFeedList: {
    id: number;
    item: string;
    expiry_date: string;
    added_date: string;
    quantity: number;
  }[];
};

const Expiry = ({ expiredFeedList }: ExpiryProps) => {
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
          {expiredFeedList.map((item) => {
            // to change date format 2023-05-04 => May 4, 2023
            const formattedExpiryDate = new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(new Date(item.expiry_date));
            const formattedAddedDate = new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(new Date(item.added_date));
            return (
              <TableRow key={item.id}>
                <TableCell>{counter++}</TableCell>
                <TableCell>{item.item}</TableCell>
                <TableCell>{formattedExpiryDate}</TableCell>
                <TableCell>{formattedAddedDate}</TableCell>
                <TableCell>
                  {item.quantity < 1 ? "Not available" : item.quantity}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Expiry;
