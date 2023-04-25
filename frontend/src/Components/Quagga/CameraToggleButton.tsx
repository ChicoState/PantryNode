import { Button } from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import React from "react";

// eslint-disable-next-line react/prop-types
const CameraToggleButton = ({ cameraStatus, handleToggleCamera }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleToggleCamera}
      sx={{ paddingRight: 2, marginBottom: 5 }}>
      <QrCodeScannerIcon sx={{ marginRight: 2 }} />
      {cameraStatus ? "Stop" : "Start"} Camera
    </Button>
  );
};

export default CameraToggleButton;
