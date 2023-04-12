import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../Components/Copyright';
import { useState } from "react";

export default function Passwordreset(){

  const [npassword, setNpassword] = useState("");
  const [npasswordError, setNpasswordError] = useState("");
  const [cnpassword, setCNpassword] = useState("");
  const [cnpasswordError, setCNpasswordError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "npassword") {
      setNpassword(value);
      setNpasswordError("");
    }
    if (name === "cnpassword") {
      setCNpassword(value);
      setCNpasswordError("");
    }
  };


  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const npasswordValue = data.get("npassword") as string;
    const cnpasswordValue = data.get("cnpassword") as string;
    // npassword
    if (npasswordValue.trim() === "") {
      setNpasswordError("Password is required");
      return;
    }
    if (npasswordValue.length < 8){
      setNpasswordError("Password must be at least 8 characters long");
      return;
    }
    if (!/(?=.*[A-Z])(?=.*[\W_])/.test(npasswordValue)) {
      setNpasswordError("Password must contain at least one number and one special character");
      return;
    }
    //confirm password
    if (cnpasswordValue.trim() === "") {
      setCNpasswordError("Password is required");
      return;
    }
    if (cnpasswordValue.length < 8){
      setCNpasswordError("Password must be at least 8 characters long");
      return;
    }
    if (!/(?=.*[A-Z])(?=.*[\W_])/.test(cnpasswordValue)) {
      setCNpasswordError("Password must contain at least one number and one special character");
      return;
    }
    navigate("/passwordsuccessful")
  };
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#8C2332' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Account Recovery
          </Typography>
          <p>Enter you new password</p>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="npassword"
              label="New Password"
              name="npassword"
              autoComplete="npassword"
              autoFocus
              value={npassword}
              onChange={handleChange}
              error={Boolean(npasswordError)}
              helperText={npasswordError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="cnpassword"
              label="Confirm New Password"
              name="cnpassword"
              autoComplete="cnpassword"
              autoFocus
              value={cnpassword}
              onChange={handleChange}
              error={Boolean(cnpasswordError)}
              helperText={cnpasswordError}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py:2 }}
              style={{
                backgroundColor: "primary"
              }}
            >
              Set New Password
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}