import { Button, Stack, Typography } from "@mui/material";
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

      <Button
        variant="contained"
        color="primary"
        onClick={handleToggleCamera}
        sx={{ paddingRight: 2, marginY: "auto", alignSelf: "flex-end" }}>
        {cameraStatus ? "Stop" : "Start"} Camera
      </Button>
    </Stack>
  );
};

export default Header;