import React from "react";
import Typography from "@mui/material/Typography";

function Copyright(props: { sx: any }) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      Pantry Node
      {" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
