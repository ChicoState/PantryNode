import * as React from "react";
import { Paper } from "@mui/material";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface categoryListType {
  id: number;
  name: string;
  image_url: string;
}

interface categorydata {
  item_id: number;
  quantity: number;
  person_id: number;
  price: number;
  expiration: string;
  first_name: string;
  last_name: string;
  name: string;
}

interface SaleTableProps {
  category: categoryListType;
  categorydata: categorydata[];
}

const SaleTable = ({ category, categorydata }: SaleTableProps) => {
  return (
    <>
      <Typography variant="h6" align="center">
        {category.name}
      </Typography>
      <TableContainer component={Paper} style={{}}>
        <Table>
          <TableHead
            sx={{
              "& th": { color: "white", backgroundColor: "#8C2332" },
            }}>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorydata.map((product) => (
              <TableRow key={product.item_id}
                style={
                  product.item_id % 2
                    ? { background: "#fcfcfc" }
                    : { background: "white" }
                }>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SaleTable;
