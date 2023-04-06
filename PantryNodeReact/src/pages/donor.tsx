import React from "react";
import {Table, TableBody, TableHead, TableRow, TableContainer, Paper, TableCell} from '@mui/material';

// Dummy Data
const data = [
  {name: 'John', email: 'john@gmail.com', location: 'USA'},
];

var donor = () => {
  return <div>
      <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell>{entry.email}</TableCell>
                <TableCell>{entry.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  </div>;
};

export default donor;
