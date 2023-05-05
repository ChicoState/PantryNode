import * as React from "react";
import { useEffect, useState } from "react";
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
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import axiosInstance from "../util/axiosInstance";



export type donorFeed = {
  person_id: number;
  full_name: string;
  email: string;
 };

//reconfiguring
const Donor = () => {
  const [data, setData] = useState<donorFeed[]>([
  //interface Entry,
  {
    person_id: 0,
    full_name: "",
    email: "",
  } as donorFeed,
]);

    
//const [feedList, setFeedList] = useState<donorFeed[]>([]);
//const [data, setData] = useState<donorFeed[]>([]);

  interface SortConfig {
   key: keyof donorFeed | null;
   direction: "ascending" | "descending" | null;
  }

  //const initialData: Entry[] = [
    //{ name: "John", email: "john@gmail.com", location: "USA" },
   // { name: "Danny", email: "danny@gmail.com", location: "USA" },
  //]; 

  const [showModal, setShowModal] = useState<boolean>(false);
  const [emailError, setEmailError] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  
  const [newEntry, setNewEntry] = useState<donorFeed>({
    person_id: 0,
    full_name: "",
    email: "",
  });
  
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });


  useEffect(() => {
    axiosInstance.get<donorFeed[]>("/donors")
    .then((res: any) => {
     
      console.log(res)

      setData(res as donorFeed[]);

      });
    }, []);
    

  const handleAddEntry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data, "Forma data");
    setData([...data, newEntry]);
    setNewEntry({ person_id: 0,
      full_name: "",
      email: "" });
      
    setShowModal(false);
  }; 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
    console.log(e.target.value, "test");
  };
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

  const sortedData = (): donorFeed[] => {
      if (!data) {
    return [];
  }
    const sortedData = [...data];
    console.log(sortedData)
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
            display: "flex", alignItems: "center" }}>
            <Button
            variant="contained"
            color="primary"
            onClick={() => setShowModal(true)}
            sx={{ marginRight: "1rem" }}
        >
          <AddIcon/>
          Add Donor
          </Button>

        
           <Button
  variant="contained"
  color="primary"
  onClick={() => alert("Lookup button clicked")}
  >
  Lookup Donor
</Button>

        </div>
      </div>

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
              <Button onClick={() => setShowModal(false)} color="primary">
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
        style={{ marginTop: "1rem", boxShadow: "none" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
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
              <TableRow key={index}>
                <TableCell>{entry.person_id}</TableCell>
                <TableCell>{entry.full_name}</TableCell>
                <TableCell>{entry.email}</TableCell> 
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      alert(`Donate for ${entry.full_name}`)
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


























  