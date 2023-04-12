import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../Components/Copyright";
import { useAppDispatch, useAppSelector } from "../hooks";
import { login } from "../redux-features/user";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useFormik } from "formik";
import axios from 'axios';


interface LoginFormInput {
  email?: string;
  password?: string;
};

export default function Login() {
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values: { [x: string]: string | Blob }) => {
      const formData = new FormData();
      for (const value in values) {
        formData.append(value, values[value as keyof typeof values]);
      }
      console.log({
        email: formData.get("email"),
        password: formData.get("password"),
      });

      axios.post('http://localhost:3001/login', {
        email: formData.get('email'),
        password: formData.get('password'),
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        console.log("login success");
        console.log(response);
        dispatch(login(formData))
          .unwrap()
          .then((res) => {
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(error => {
        console.error("login error: " + error);
      });
    },
    validate: (values) => {
      const errors: LoginFormInput = {};
      const emailValue = values.email;
      const passwordValue = values.password;
      // email
      if (emailValue.trim() === "") {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
        errors.email = "Invalid e-mail";
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
      return errors;
    },
  });
  const handleRememberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(event.target.checked);
  };

  const loading = useAppSelector((state) => state.user.status);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "#8C2332" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email !== undefined}
            helperText={formik.touched.email ? formik.errors.email : ""}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password && formik.errors.password !== undefined
            }
            helperText={formik.touched.password ? formik.errors.password : ""}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onChange={handleRememberChange}
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!(formik.dirty && formik.isValid)}
            sx={{ mt: 3, mb: 2, py: 2 }}
            style={{
              backgroundColor: "primary",
            }}>
            Login
            {loading === "loading" && <CircularProgress />}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
