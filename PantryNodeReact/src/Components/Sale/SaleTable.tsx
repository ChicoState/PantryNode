import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';

interface categoryListType {
  id: number;
  name: string;
  image_url: string;
};

interface productType {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

interface SaleTableProps {
  category: categoryListType;
  products: productType[];
}

const SaleTable = ({ category, products }: SaleTableProps) => {
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
            {products.map((product) => (
              <TableRow key={product.id}>
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
