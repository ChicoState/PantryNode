import { Button, Stack, Typography } from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import React from "react";

// eslint-disable-next-line react/prop-types
const Header = ({ cameraStatus, handleToggleCamera }) => {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        marginBottom: 7,
        flexWrap: "wrap",
      }}>
      <Typography variant="h4" fontWeight="bold" color="primary">
        Scan Now
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleToggleCamera}
        sx={{ paddingRight: 2, marginY: "auto", alignSelf: "flex-end" }}>
        <QrCodeScannerIcon sx={{ marginRight: 2 }} />
        {cameraStatus ? "Stop" : "Start"} Camera
      </Button>
    </Stack>
  );
};

export default Header;
