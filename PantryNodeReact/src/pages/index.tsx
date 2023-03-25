import React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const index = () => {
  return (
    <Container maxWidth="sm">
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
      </Box>
    </Container>
  );
};

export default index;
