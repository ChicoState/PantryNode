import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from "@mui/icons-material/Add";
import {
    FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableContainer,
    Paper,
    TableCell,
    DialogTitle,
    DialogContent,
    Dialog,
    DialogActions,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import axiosInstance from "../util/axiosInstance";

export type donation = {
    person_id: number,
    siteDetails: string,
    name: string,
    size: number,
    category: string,
    stor_type: string,
    quantity: number,
    expirationDate: string,
}

function DonorView() {

    const { id } = useParams();
    const [openSnack, setOpenSnack] = React.useState(false);
    const [apiResponse, setApiResponse] = useState("");
    const [severity, setSeverity] = useState("");
    const [donorDetails, setDonorDetails] = useState<any>();
    const [transactions, setTransactions] = useState<any[]>();
    const [addModal, setAddModal] = useState<boolean>(false);
    const [expDate, setExpdate] = React.useState<Dayjs | null>(null);
    const [newDonation, setNewDonation] = useState<donation>({
        person_id: id ? parseInt(id) : 0,
        siteDetails: "Paradise",
        name: "",
        size: 0,
        category: "",
        stor_type: "",
        quantity: 0,
        expirationDate: "",
    })
    
    //Snack bar usage
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    
    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setApiResponse("");
        setSeverity("");
        setOpenSnack(false);
    };

    //Get all donations made by the donor on page refresh,new donation and page land
    const getAllDonations = () => {
        axiosInstance.get(`/donations/${id}`)
            .then((res: any) => {
                if(!res)
                {
                    setApiResponse("Failed to retrive donations. Try again later.");
                    setSeverity("error");
                    setOpenSnack(true);
                }
                else
                {
                    setDonorDetails(res.donor);
                    const allTrans: any[] = [];
                    if (res.donations) {
                        res.donations.map((el, ind) => {
                            let trans = {}
                            if (el.items) {
                                el.items.map((item, key) => {
                                    trans = { "date": new Date(el.date).toLocaleString(), "name": item.name, "quantity": item.quantity }
                                    allTrans.push(trans);
                                })
                            }
                        })
                    }
                    setTransactions(allTrans);
                }
                
            });
    }

    useEffect(() => {
        getAllDonations();
    }, []);

    //handling form data
    const handleNewDonationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name == "quantity" || e.target.name == "size") {
            setNewDonation({ ...newDonation, [e.target.name]: parseInt(e.target.value) });
        }
        else {
            setNewDonation({ ...newDonation, [e.target.name]: e.target.value });
        }
    };
    //handle select dropdown data
    const handleSelectEvent = (e: SelectChangeEvent) => {
        setNewDonation({ ...newDonation, [e.target.name]: e.target.value });
    };
    //submit the new donation api call
    const handleNewDonationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        newDonation.expirationDate = expDate ? expDate.toISOString() : '';
        const payload = {
            "person_id": newDonation.person_id,
            "siteDetails": { "name": newDonation.siteDetails },
            "items": [
                {
                    "transItemsDetails": {
                        "quantity": newDonation.quantity,
                        "expiration": newDonation.expirationDate
                    },
                    "itemDetails": {
                        "name": newDonation.name,
                        "size": newDonation.size,
                        "category": newDonation.category
                    },
                    "storageTypeDetails": {
                        "stor_type": newDonation.stor_type
                    }
                }
            ]
        }
        axiosInstance.post('/donate', payload).then((res) => {
            if (!res) {
                setSeverity("error");
                setApiResponse("Something Failed!! Try again later.");
                // throw new Error("Failed to make the donation");
            }
            else {
                setApiResponse("Successfully made a donation.");
                setSeverity("success");
                setOpenSnack(true);
                setNewDonation({
                    person_id: id ? parseInt(id) : 0,
                    siteDetails: "Paradise",
                    name: "",
                    size: 0,
                    category: "",
                    stor_type: "",
                    quantity: 0,
                    expirationDate: "",
                })
                getAllDonations();
            }
        });
        setAddModal(false);
    };
    
    return (
        <Box sx={{ width: 1 }}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <Box gridColumn="span 6">
                    <h2>Donor Details:</h2>
                    {donorDetails &&
                        <>
                            <h3>Name: {`${donorDetails.fname} ${donorDetails.lname}`}</h3>
                            <h3>Email: {`${donorDetails.email}`}</h3>
                            <h3>Donations Made: {`${transactions ? transactions.length : 0}`}</h3>
                        </>}

                </Box>
            </Box>

            <TableContainer
                component={Paper}
                style={{ marginTop: "1rem" }}
            >
                <Table>
                    <TableHead
                        sx={{
                            "& th": { color: "white", backgroundColor: "#8C2332" },
                        }}>
                        <TableRow>
                            <TableCell>
                                <strong>Date</strong>

                            </TableCell>
                            <TableCell>
                                <strong>Name</strong>
                            </TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {transactions && transactions.map((entry: any, index: number) => (
                            <TableRow
                                key={index}
                                style={
                                    index % 2
                                        ? { background: "#fcfcfc" }
                                        : { background: "white" }
                                }>
                                <TableCell>{entry.date}</TableCell>
                                <TableCell>{entry.name}</TableCell>
                                <TableCell>{entry.quantity}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box gridColumn="span 6" sx={{ marginTop: "2rem" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setAddModal(true)}
                    sx={{ marginRight: "1rem" }}
                >
                    <AddIcon />
                    Make Donation
                </Button>
            </Box>
            <Dialog open={addModal} onClose={() => setAddModal(false)}>
                <DialogTitle>Make a Donation</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleNewDonationSubmit}>
                        <h3>Item Details</h3>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Item Name"
                            name="name"
                            value={newDonation.name}
                            onChange={handleNewDonationChange}
                            fullWidth
                        />
                        <FormControl fullWidth sx={{ padding: '10px 0px 10px 0px' }}>
                            <InputLabel id="demo-simple-select-label" sx={{ padding: '10px 0px 10px 0px' }}>Select Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="category"
                                value={newDonation.category}
                                label="Category"
                                onChange={handleSelectEvent}
                            >
                                <MenuItem value={'vegetables'}>Vegetable</MenuItem>
                                <MenuItem value={'meat'}>Meat</MenuItem>
                                <MenuItem value={'dairy'}>Dairy</MenuItem>
                                <MenuItem value={'fruit'}>Fruit</MenuItem>
                                <MenuItem value={'bakery'}>Bakery</MenuItem>
                                <MenuItem value={'stationary'}>Stationary</MenuItem>
                                <MenuItem value={'ready'}>Ready</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ padding: '10px 0px 10px 0px' }}>
                            <InputLabel id="demo-simple-select-label" sx={{ padding: '10px 0px 10px 0px' }}>Select Storage Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="stor_type"
                                value={newDonation.stor_type}
                                label="Storage Type"
                                onChange={handleSelectEvent}

                            >
                                <MenuItem value={'Fridge'}>Fridge</MenuItem>
                                <MenuItem value={'Open'}>Open</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Size"
                            name="size"
                            value={newDonation.size}
                            onChange={handleNewDonationChange}
                            fullWidth
                        />
                        <h3>Donation Information</h3>
                        <TextField
                            autoFocus
                            type="number"
                            margin="dense"
                            label="Quantity"
                            name="quantity"
                            value={newDonation.quantity}
                            onChange={handleNewDonationChange}
                            fullWidth
                        />
                        <DatePicker sx={{ marginTop: "1rem" }} label="Expiration Date" value={expDate} onChange={(newDate) => {
                            newDate && console.log(newDate.toISOString())
                            setExpdate(newDate)
                        }} />
                        <DialogActions>
                            <Button onClick={() => {
                                setNewDonation({
                                    person_id: id ? parseInt(id) : 0,
                                    siteDetails: "Paradise",
                                    name: "",
                                    size: 0,
                                    category: "",
                                    stor_type: "",
                                    quantity: 0,
                                    expirationDate: "",
                                });
                                setExpdate(null)
                                setAddModal(false);
                            }} color="primary">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                color="primary"
                                disabled={
                                    newDonation.name == "" ||
                                    newDonation.size == 0 ||
                                    newDonation.category == "" ||
                                    newDonation.stor_type == "" ||
                                    newDonation.quantity == 0 ||
                                    expDate == null
                                }>
                                Donate
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {apiResponse}
                </Alert>
            </Snackbar>
        </Box >

    )
}

export default DonorView;