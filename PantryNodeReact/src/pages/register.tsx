import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../Components/Copyright';
import { useState } from "react";
import Success from "./success";


export default function SignUp() {

  // validation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
      setEmailError("");
    } else if (name === "password") {
      setPassword(value);
      setPasswordError("");
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
      setPhoneNumberError("");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const emailValue = data.get("email") as string;
    const passwordValue = data.get("password") as string;
    const phoneNumberValue = data.get("phoneNumber") as string;

    // email
    if (emailValue.trim() === "") {
      setEmailError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(emailValue)) {
      setEmailError("Email is invalid");
      return;
    }

    // password
    if (passwordValue.trim() === "") {
      setPasswordError("Password is required");
      return;
    }
    if (passwordValue.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }
    if (!/(?=.*[A-Z])(?=.*[\W_])/.test(passwordValue)) {
      setPasswordError("Password must contain at least one number and one special character");
      return;
    }

    // phoneNumber
    if (phoneNumberValue.trim() === "") {
      setPhoneNumberError("Please enter your phone number");
      return;
    }
    if (!/^[0-9]+$/.test(phoneNumberValue)) {
      setPhoneNumberError("Please enter a valid phone number");
      return;
    }
    if (phoneNumberValue.length !== 10) {
      setPhoneNumberError("Phone number must be 10 Digits");
      return;
    }

    // to do: redirect to success page after built
    // navigate("/")
    setIsRegistered(true);
  };

  if (isRegistered) {
    return <Success />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#8C2332" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} >
                <TextField
                  autoComplete="given-name"
                  name="First Name"
                  required
                  fullWidth
                  id="FirstName"
                  label="FirstName"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6} >
                <TextField
                  autoComplete="given-name"
                  name="Last Name"
                  required
                  fullWidth
                  id="LastName"
                  label="LastName"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phone-number"
                  value={phoneNumber}
                  onChange={handleChange}
                  error={Boolean(phoneNumberError)}
                  helperText={phoneNumberError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleChange}
                  error={Boolean(emailError)}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handleChange}
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 2 }}

              style={{
                backgroundColor: "primary"
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    );
  }


}
