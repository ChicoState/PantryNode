import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../Components/Copyright";
import { useState } from "react";
import Success from "./success";
import { useFormik } from "formik";

type RegisterFormInput = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  password?: string;
};

export default function SignUp() {
  const [isRegistered, setIsRegistered] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      const {
        email: emailValue,
        password: passwordValue,
        phone: phoneNumberValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
      } = values;
      const errors: RegisterFormInput = {};

      // firstName
      if (firstNameValue.trim() === "") {
        errors.firstName = "First name is required";
      }

      // lastName
      if (lastNameValue.trim() === "") {
        errors.lastName = "Last name is required";
      }

      // email
      if (emailValue.trim() === "") {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
        errors.email = "Email is invalid";
      }

      // password
      if (passwordValue.trim() === "") {
        errors.password = "Password is required";
      } else if (passwordValue.length < 8) {
        errors.password = "Password must be at least 8 characters long";
      } else if (!/(?=.*[A-Z])(?=.*[\W_])/.test(passwordValue)) {
        errors.password =
          "Password must contain at least one number and one special character";
      }

      // phoneNumber
      if (phoneNumberValue.trim() === "") {
        errors.phone = "Please enter your phone number";
      } else if (!/^[0-9]+$/.test(phoneNumberValue)) {
        errors.phone = "Please enter a valid phone number";
      } else if (phoneNumberValue.length !== 10) {
        errors.phone = "Phone number must be 10 Digits";
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = new FormData();
      for (let value in values) {
        data.append(value, values[value as keyof typeof values]);
      }
      // navigate("/")
      setIsRegistered(true);
    },
  });

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
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName &&
                    formik.errors?.firstName !== undefined
                  }
                  helperText={
                    formik.touched.firstName ? formik.errors.firstName : ""
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="given-name"
                  name="lastName"
                  required
                  fullWidth
                  label="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName &&
                    formik.errors.lastName !== undefined
                  }
                  helperText={
                    formik.touched.lastName
                      ? formik.errors.lastName
                      : formik.errors.lastName
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone-number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.phone && formik.errors?.phone !== undefined
                  }
                  helperText={formik.touched.phone ? formik.errors.phone : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.email && formik.errors?.email !== undefined
                  }
                  helperText={formik.touched.email ? formik.errors.email : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password &&
                    formik.errors?.password !== undefined
                  }
                  helperText={
                    formik.touched.password ? formik.errors.password : ""
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!(formik.dirty && formik.isValid)}
              sx={{ mt: 3, mb: 2, py: 2 }}
              style={{
                backgroundColor: "primary",
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
