import React, { useState } from "react";
import { Table, TableBody, TableHead, TableRow, TableContainer, Paper, TableCell, Grid, ToggleButton, ToggleButtonGroup, } from "@mui/material";
import { Box } from "@mui/system";
// import StockBarChart from "./StockChart"

type StockProps = {
    sortedStockList: {
        name: string;
        category: string;
        quantity: number;
    }[];
};


const Stock = ({ sortedStockList }: StockProps) => {
    const [alignment, setAlignment] = useState("table"); //Used for the purpose of MUI toggle button

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeComponent, setActiveComponent] = useState<string>("tables");
    const [tableVisibility, setTableVisibility] = useState<boolean>(true); //based on boolean data visibility changes, Tables have default visibility
    // const [chartVisibility, setChartVisibility] = useState<boolean>(false); //based on boolean data visibility changes,Chart is initially not visible

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
        // setChartVisibility(false);
    }
    /**
     * Sets tables as active component and makes the chart visible
     */
    function handleChartClick() {
        setActiveComponent("chart");
        setTableVisibility(false);
        // setChartVisibility(true);
    }
    return (
        <div>
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
                    <Grid item xs={10} md={6} mt={4}>
                        <strong>Stock</strong>
                        <br />
                        {/* Total Checkout: {purchaseTotal} | Total Quantity Checked Out:{" "}
                        {purchaseQuantityTotal} */}
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
                                                <strong>category</strong>
                                            </TableCell>
                                            <TableCell>
                                                <strong>Quantity</strong>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {sortedStockList.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                style={
                                                    index % 2
                                                        ? { background: "#fcfcfc" }
                                                        : { background: "white" }
                                                }>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{row.name}</TableCell>
                                                <TableCell>{row.category}</TableCell>
                                                <TableCell>{row.quantity}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
            )}
        </div>
    );
}

export default Stock;