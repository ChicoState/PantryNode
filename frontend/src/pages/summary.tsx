import React, { useState } from "react";
import { Table,TableBody,TableHead, TableRow,TableContainer,Paper,TableCell,Grid,ToggleButton,ToggleButtonGroup, Typography} from "@mui/material";
import { Box } from "@mui/system";
import SummaryBarChart from "../Components/Summary/BarChart";
import { Padding } from "@mui/icons-material";

const Summary = () => {
  const [alignment, setAlignment] = useState("table"); //Used for the purpose of MUI toggle button

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeComponent, setActiveComponent] = useState<string>("tables");
  const [tableVisibility, setTableVisibility] = useState<boolean>(true); //based on boolean data visibility changes, Tables have default visibility
  const [chartVisibility, setChartVisibility] = useState<boolean>(false); //based on boolean data visibility changes,Chart is initially not visible

  const handleAlignmentChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  /**
   * Sets tables as active component and makes the tables visible
   */
  function handleTablesClick() {
    setActiveComponent("tables");
    setTableVisibility(true);
    setChartVisibility(false);
  }
  /**
   * Sets tables as active component and makes the chart visible
   */
  function handleChartClick() {
    setActiveComponent("chart");
    setTableVisibility(false);
    setChartVisibility(true);
  }

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
    {
      name: "John",
      type: "Food",
      stockedDate: "2021-10-10",
      expiryDate: "2021-10-10",
    },
    {
      name: "Danny",
      type: "Food",
      stockedDate: "2021-10-10",
      expiryDate: "2021-10-10",
    },
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

  const data = [
    { name: "Product A", value: 20 },
    { name: "Product B", value: 30 },
    { name: "Product C", value: 50 },
    { name: "Product D", value: 10 },
  ];

  const purchaseTotal = initialDataCurrentStock.length;
  //Get sum of all quantities in purchases
  const purchaseQuantityTotal = initialDataPurchase.reduce(
    (acc, cur) => acc + cur.quantity,
    0
  );
  const currentStockTotal = initialDataCurrentStock.length;
  const totalExpired = initialDataWasteManagement.length;

  return (
    <div>
      <Typography variant="h4" align="left" sx={{ color: "#8c2332"}}>
        <b>Summary</b>
      </Typography>
      <ToggleButtonGroup
        color="primary"
        fullWidth
        value={alignment}
        exclusive
        onChange={handleAlignmentChange}
        aria-label="Platform"
        sx={{ marginBottom: 2 }}>
        <ToggleButton value="table" onClick={handleTablesClick}>
          Table
        </ToggleButton>
        <ToggleButton value="chart" onClick={handleChartClick}>
          Chart
        </ToggleButton>
      </ToggleButtonGroup>
      {tableVisibility && ( // if tableVisibility state is set true, the following tables will be visible.
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={10} md={6} mt={4}>
            <strong>Purchases</strong>
            <br />
            Total Checkout: {purchaseTotal} | Total Quantity Checked Out:{" "}
            {purchaseQuantityTotal}
            {/*Purchase Table*/}
            <Box
              style={{ maxHeight: "40vh", overflow: "auto" }}
              sx={{
                boxShadow: "0px -1px 10px #eeeeee",
                border: "solid 0.1px #e6e6e6",
                borderRadius: "5px",
                marginTop: "1rem",
              }}>
              <TableContainer component={Paper} style={{}}>
                <Table>
                  <TableHead
                    sx={{
                      "& th": { color: "white", backgroundColor: "#8C2332" },
                    }}>
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
                      <TableRow
                        key={index}
                        style={
                          index % 2
                            ? { background: "#fcfcfc" }
                            : { background: "white" }
                        }>
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
          <Grid item xs={10} md={6} mt={4}>
            <strong>Current Stock</strong>
            <br />
            Total Items in Stock: {currentStockTotal}
            {/*Current Stock Table*/}
            <Box
              style={{ maxHeight: "40vh", overflow: "auto" }}
              sx={{
                boxShadow: "0px -1px 10px #eeeeee",
                border: "solid 0.1px #e6e6e6",
                borderRadius: "5px",
                marginTop: "1rem",
              }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead
                    sx={{
                      "& th": { color: "white", backgroundColor: "#8C2332" },
                    }}>
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
                      <TableRow
                        key={index}
                        style={
                          index % 2
                            ? { background: "#fcfcfc" }
                            : { background: "white" }
                        }>
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
          <Grid item xs={10} md={6} mt={4}>
            <strong>Waste Management</strong>
            <br />
            Total Expired: {totalExpired}
            {/*Waste Management Table*/}
            <Box
              style={{ maxHeight: "40vh", overflow: "auto" }}
              sx={{
                boxShadow: "0px -1px 10px #eeeeee",
                border: "solid 0.1px #e6e6e6",
                borderRadius: "5px",
                marginTop: "1rem",
              }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead
                    sx={{
                      "& th": { color: "white", backgroundColor: "#8C2332" },
                    }}>
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
                      <TableRow
                        key={index}
                        style={
                          index % 2
                            ? { background: "#fcfcfc" }
                            : { background: "white" }
                        }>
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
          <Grid item xs={10} md={6} mt={4}>
            <strong>Soon to Expire</strong>
            <br />
            <br />
            {/*Soon to Expire Table*/}
            <Box
              style={{ maxHeight: "40vh", overflow: "auto" }}
              sx={{
                boxShadow: "0px -1px 10px #eeeeee",
                border: "solid 0.1px #e6e6e6",
                borderRadius: "5px",
                marginTop: "1rem",
              }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead
                    sx={{
                      "& th": { color: "white", backgroundColor: "#8C2332" },
                    }}>
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
                      <TableRow
                        key={index}
                        style={
                          index % 2
                            ? { background: "#fcfcfc" }
                            : { background: "white" }
                        }>
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
      )}

      {chartVisibility && ( // if chartVisiblity state is set true, the following SummaryChart will be visible.
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Visualized Data</h4>
          {/* Import Bar Chart */}
          <SummaryBarChart data={data} />
        </div>
      )}
    </div>
  );
};

export default Summary;