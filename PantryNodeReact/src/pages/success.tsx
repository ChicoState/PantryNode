import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Success() {
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
        <Typography
          style={{ color: "#8c2332", fontSize: "24px", fontWeight: 900 }}>
          Pantry Node
        </Typography>
        <Typography style={{ color: "green", margin: "10px 0px 17px 0px" }}>
          Registration Successful
        </Typography>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, py: 2, color: "#ffffff" }}
          style={{
            backgroundColor: "primary",
            color: "white",
            margin: 0,
          }}>
          <Link
            href="/login"
            variant="body2"
            style={{
              color: "#fffff",
            }}>
            <Typography style={{ color: "white" }}>Login</Typography>
          </Link>
        </Button>
      </Box>
    </Container>
  );
}
