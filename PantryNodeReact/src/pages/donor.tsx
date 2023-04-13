import * as React from "react";
import { useState } from "react";
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

const Donor = () => {
  interface Entry {
    name: string;
    email: string;
    location: string;
  }

  interface SortConfig {
    key: keyof Entry | null;
    direction: "ascending" | "descending" | null;
  }

  const initialData: Entry[] = [
    { name: "John", email: "john@gmail.com", location: "USA" },
    { name: "Danny", email: "danny@gmail.com", location: "USA" },
  ];

  const [showModal, setShowModal] = useState<boolean>(false);
  const [data, setData] = useState<Entry[]>(initialData);
  const [emailError, setEmailError] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [newEntry, setNewEntry] = useState<Entry>({
    name: "",
    email: "",
    location: "",
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });

  const handleAddEntry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data, "Forma data");
    setData([...data, newEntry]);
    setNewEntry({ name: "", email: "", location: "" });
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

  const onSort = (key: keyof Entry) => {
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

  const sortedData = (): Entry[] => {
    const sortedData = [...data];
    if (sortConfig !== null) {
      sortedData.sort((a: Entry, b: Entry) => {
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
          <Typography variant="h6" align="left" sx={{ color: "#8c2332" }}>
            <h2> Donor List</h2>
          </Typography>
        </div>

        <div
          style={{
            display: "flex",
            flex: "1",
            textAlign: "right",
            flexDirection: "column",
            justifyContent: "center",
          }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowModal(true)}
            sx={{ marginLeft: "auto", paddingRight: 2 }}>
            <AddIcon />
            Add Donor
          </Button>
        </div>
      </div>

      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Add New Entry</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddEntry}>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              name="name"
              value={newEntry.name}
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
            <TextField
              margin="dense"
              label="Location"
              name="location"
              value={newEntry.location}
              onChange={handleChange}
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
                  isEmailError || newEntry.location == "" || newEntry.name == ""
                }>
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <TableContainer
        component={Paper}
        style={{ marginTop: "1rem", boxShadow: "none" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell onClick={() => onSort("name")}>
                <strong>Name</strong>
                {sortConfig &&
                  sortConfig.key === "name" &&
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
              <TableCell onClick={() => onSort("location")}>
                <strong>Location</strong>
                {sortConfig &&
                  sortConfig.key === "location" &&
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
            {sortedData().map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell>{entry.email}</TableCell>
                <TableCell>{entry.location}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      alert(`Donate button clicked for ${entry.name}`)
                    }>
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
