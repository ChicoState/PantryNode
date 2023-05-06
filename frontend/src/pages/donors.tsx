import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TableCell,
  DialogTitle,
  TextField,
  DialogContent,
  Dialog,
  DialogActions,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import axiosInstance from "../util/axiosInstance";



//JSON type
export type donorFeed = {
  person_id: number;
  full_name: string;
  email: string;
};


//JSON type
export type lookupFeed = {
  person_id: number;
  full_name: string;
};



//Storing each Donor in an array DonorFeed
const Donor = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<donorFeed[]>([
    {
      person_id: 0,
      full_name: "",
      email: "",
    } as donorFeed,
  ]);

  //Sort the data 
  interface SortConfig {
    key: keyof donorFeed | null;
    direction: "ascending" | "descending" | null;
  }

  //setting errors and modals
  const [showlookupModal, setlookupShowModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [emailError, setEmailError] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  //bool to set anonymous donor
  const [isAnonymous, setIsAnonymous] = useState(false); // added state variable

  //creating a new entry
  const [newEntry, setNewEntry] = useState<donorFeed>({
    person_id: 0,
    full_name: "",
    email: "",
  });

  //lookupDonor
  const [lookupEntry, setlookupEntry] = useState<lookupFeed>({
    person_id: 0,
    full_name: "",
  });


  //sorting entries
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });

  //connecting donors endpoint to backend, so will retrieve all donors
  useEffect(() => {
    axiosInstance.get<donorFeed[]>("/donors")
      .then((res: any) => {
        console.log(res);
        setData(res as donorFeed[]);
      });
  }, []);

  //connecting Add Donor button to backend, /addDonor to add to database
  const handleAddEntry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newDonor = {
      person_id: newEntry.person_id,
      full_name: newEntry.full_name,
      email: newEntry.email,
    };
    console.log(newDonor);
    axiosInstance.post("/addDonor", newDonor)
      .then((response) => {
        if (!response) {
          throw new Error("Failed to save new donor");
        }
        return response.data;
      })
      .then((savedDonor) => {
        console.log("New donor saved:", savedDonor);
        setData([...data, newEntry]);
        setNewEntry({
          person_id: 0,
          full_name: "",
          email: "",
        });
        setShowModal(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };


//lookupDonor, when anonymous checkbox is selected
  const handlelookupDonor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lookupDonor = {
      person_id: lookupEntry.person_id,
      full_name: isAnonymous ? "anonymous" : lookupEntry.full_name, // updated the full_name field
    };
    setlookupEntry({ ...lookupEntry});
    console.log(lookupDonor);
    setShowModal(false);
  };

  //checkboc for anonymous
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAnonymous(e.target.checked);
    if (e.target.checked) {
      setlookupEntry({ ...lookupEntry, full_name: "anonymous" });
    }
  };

 //Making sure the input text is correct
 const handlelookupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setlookupEntry({ ...lookupEntry, [e.target.name]: e.target.value });
  console.log(e.target.value, "test");
};
 

  //Making sure the input text is correct
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
    console.log(e.target.value, "test");
  };

  //Making sure the input email is correct
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
    console.log(e.target.value, "email");
    const emailValue = e.target.value;

    if (emailValue.trim() === "") {
      setEmailError("Email is required");
      setIsEmailError(true);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(emailValue)) {
      setEmailError("Email is invalid");
      setIsEmailError(true);
      return;
    }
    setEmailError("");
    setIsEmailError(false);
  };


  //Sorting Values
  const onSort = (key: keyof donorFeed) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  //Sorting Data
  const sortedData = (): donorFeed[] => {
    if (!data) {
      return [];
    }
    const sortedData = [...data];
    console.log(sortedData);
    if (sortConfig !== null) {
      sortedData.sort((a: donorFeed, b: donorFeed) => {
        if (sortConfig.key !== null) {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
        }
        return 0;
      });
    }
    return sortedData;
  };


  return (
    <div>
      <div style={{ width: "100%", display: "flex" }}>
        <div style={{ flex: "1", textAlign: "left" }}>
          <Typography variant="h4" align="left" sx={{ color: "#8c2332" }}>
            <b>Donor List</b>
          </Typography>
        </div>

        <div
          style={{
            display: "flex", alignItems: "center"
          }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowModal(true)}
            sx={{ marginRight: "1rem" }}
          >
            <AddIcon />
            Add Donor
          </Button>


          <Button
            variant="contained"
            color="primary"
            onClick={() => setlookupShowModal(true)}>
            Lookup Donor
          </Button>

        </div>
      </div>

      <Dialog open={showlookupModal} onClose={() => setlookupShowModal(false)}>
        <DialogTitle>Lookup Donor</DialogTitle>
        <DialogContent>
          <form onSubmit={handlelookupDonor}>
            <TextField
              margin="dense"
              label="Person ID"
              name="person_id"
              value={lookupEntry.person_id}
              onChange={handlelookupChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              label="Full Name"
              name="full_name"
              value={lookupEntry.full_name}
              onChange={handlelookupChange}
              fullWidth
            />
            <DialogActions>
              <Button onClick={() => setlookupShowModal(true)} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={
                  newEntry.person_id === 0 || newEntry.full_name === ""
                }>
                Lookup
              </Button>
            </DialogActions>
            <FormControlLabel
              control={
                <Checkbox
                checked={isAnonymous}
                onChange={handleCheckboxChange}
                  name="anonymous"
                  color="primary"/>}
              label="Anonymous Donor"
            />
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Add New Entry</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddEntry}>
            <TextField
              margin="dense"
              label="Person ID"
              name="person_id"
              value={newEntry.person_id}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              label="Full Name"
              name="full_name"
              value={newEntry.full_name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              value={newEntry.email}
              autoComplete="email"
              onChange={handleEmailChange}
              error={Boolean(emailError)}
              helperText={emailError}
              fullWidth
            />

            <DialogActions>
              <Button onClick={() => setShowModal(true)} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={
                  isEmailError || newEntry.person_id === 0 || newEntry.full_name === ""
                }
              >
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

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
              <TableCell>Donor ID</TableCell>
              <TableCell onClick={() => onSort("full_name")}>
                <strong>Name</strong>
                {sortConfig &&
                  sortConfig.key === "full_name" &&
                  (sortConfig.direction === "ascending" ? (
                    <ArrowUpwardIcon sx={{ fontSize: 12 }} />
                  ) : (
                    <ArrowDownwardIcon sx={{ fontSize: 12 }} />
                  ))}
              </TableCell>
              <TableCell onClick={() => onSort("email")}>
                <strong>Email</strong>
                {sortConfig &&
                  sortConfig.key === "email" &&
                  (sortConfig.direction === "ascending" ? (
                    <ArrowUpwardIcon sx={{ fontSize: 12 }} />
                  ) : (
                    <ArrowDownwardIcon sx={{ fontSize: 12 }} />
                  ))}
              </TableCell>
              <TableCell>Donation</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedData().map((entry: donorFeed, index: number) => (
                <TableRow
                key={index}
                style={
                  index % 2
                    ? { background: "#fcfcfc" }
                    : { background: "white" }
                }>
                <TableCell>{entry.person_id}</TableCell>
                <TableCell>{entry.full_name}</TableCell>
                <TableCell>{entry.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      navigate(`/donorView/${entry.person_id}`)
                    }
                  >
                    Donate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Donor;


























