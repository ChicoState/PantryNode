import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

interface categoryListType {
  id: number;
  name: string;
  image_url: string;
}

interface categorydata {
  item_id: number,
  quantity: number,
  person_id: number,
  price: number,
  expiration: string,
  first_name: string,
  last_name: string,
  name: string,
};


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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorydata.map((product) => (
              <TableRow >
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
