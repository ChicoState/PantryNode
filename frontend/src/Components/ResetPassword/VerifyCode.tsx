import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../Copyright';
import { useState } from "react";

export default function Verify() {

  const [code, setcode] = useState("");
  const [codeError, setcodeError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
      setcode(value);
      setcodeError("");
  };

  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const codeValue = data.get("code") as string;

    if (codeValue.trim() === "") {
      setcodeError("code is required");
      return;
    }
  
    if (!(/^[a-z0-9]+$/i.test(codeValue))) {
      setcodeError("code is invalid");
      return;
    }
    if(codeValue.length <6 || codeValue.length>6){
        setcodeError("code should only be 6 characters long")
    }
    navigate("/newPassword")
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
          <p>Please enter the 6 digit verification code</p>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="code"
              label="Verification Code"
              name="code"
              autoComplete="code"
              autoFocus
              value={code}
              onChange={handleChange}
              error={Boolean(codeError)}
              helperText={codeError}
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
              Confirm
            </Button>
            <Grid container>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}
