import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../Copyright";
import { useState } from "react";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid ",
  borderColor: "primary",
  boxShadow: 24,
  p: 4,
};

export default function Passwordreset() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [npassword, setNpassword] = useState("");
  const [npasswordError, setNpasswordError] = useState("");
  const [cnpassword, setCNpassword] = useState("");
  const [cnpasswordError, setCNpasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showNPassword, setShowNPassword] = useState(false);
  const [showCNPassword, setShowCNPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "npassword") {
      setNpassword(value);
      if (value.trim() === "") {
        setNpasswordError("Password is required");
      } else if (value.length < 8) {
        setNpasswordError("Password must be at least 8 characters long");
      } else if (!/(?=.*[A-Z])(?=.*[\W_])/.test(value)) {
        setNpasswordError(
          "Password must contain at least one uppercase, one number and one special character");
      }
      else {
        setIsDisabled(false);
        setNpasswordError("");
      }
    }
    if (name === "cnpassword") {
      setCNpassword(value);
      if (npassword !== value) {
        setCNpasswordError("New password and confirm password do not match");
        setIsDisabled(true);
      }
      else {
        setCNpasswordError("");
        setIsDisabled(false);
      }
    }
  };

  const handleToggleNPasswordVisibility = () => {
    setShowNPassword(!showNPassword);
  };

  const handleToggleCNPasswordVisibility = () => {
    setShowCNPassword(!showCNPassword);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleClick = () => {
    if (password === "") {
      setError(true);
    } else {
      console.log("Password:", password);
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("Handle Submit");
    setOpen(true);
  };
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
          Account Recovery
        </Typography>
        <p>Enter you new password</p>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="npassword"
            label="New Password"
            name="npassword"
            autoComplete="npassword"
            autoFocus
            type={showNPassword ? "text" : "password"}
            value={npassword}
            onChange={handleChange}
            error={Boolean(npasswordError)}
            helperText={npasswordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleNPasswordVisibility}>
                    {showNPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
            type={showCNPassword ? "text" : "password"}
            value={cnpassword}
            onChange={handleChange}
            error={Boolean(cnpasswordError)}
            helperText={cnpasswordError}
          />
          <Button
            type="submit"
            fullWidth
            disabled={isDisabled}
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 2 }}
            style={{
              backgroundColor: "primary"
            }}
          >
            Set New Password
          </Button>

        </Box>
      </Box>
      {/* Modal code goes here */}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" >
            Password Changed Successfully!
          </Typography>
          <Button
            type="submit"
            fullWidth
            disabled={isDisabled}
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 2 }}
            style={{
              backgroundColor: "primary"
            }}
            onClick={() => { navigate("/login"); }}
          >
            Login
          </Button>
        </Box>
      </Modal>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
