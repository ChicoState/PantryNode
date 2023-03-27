import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const index = () => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        color="primary"
        fontWeight="bold"
        gutterBottom>
        Pantry Node
      </Typography>
      <Typography variant="h5" component="p" color="gray">
        A web application that allows you to manage your pantry.
      </Typography>
      <Box sx={{ height: "100vh" }}></Box>
    </Box>
  );
};

export default index;
