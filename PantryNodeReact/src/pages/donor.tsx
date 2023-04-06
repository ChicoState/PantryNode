import { useState } from 'react';
import { Button, Table, TableBody, TableHead, TableRow, TableContainer, Paper, TableCell, DialogTitle, TextField, DialogContent, Dialog, DialogActions } from '@mui/material';

// Dummy Data
const data = [
  { name: 'John', email: 'john@gmail.com', location: 'USA' },
];

var Donor = () => {
  interface Entry {
    name: string;
    email: string;
    location: string;
  }

  const [showModal, setShowModal] = useState<boolean>(false);
  const [data, setData] = useState<Entry[]>([]);
  const [newEntry, setNewEntry] = useState<Entry>({ name: '', email: '', location: '' });

  const handleAddEntry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData([...data, newEntry]);
    setNewEntry({ name: '', email: '', location: '' });
    setShowModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  return <div>

    <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>
      Add Entry
    </Button>

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
              onChange={handleChange}
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
              <Button type="submit" color="primary">
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

    <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Donation</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{entry.name}</TableCell>
              <TableCell>{entry.email}</TableCell>
              <TableCell>{entry.location}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => alert(`Donate button clicked for ${entry.name}`)}>
                  Donate
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>;
};

export default Donor;
