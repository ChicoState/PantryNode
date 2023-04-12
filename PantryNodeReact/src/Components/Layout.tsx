import * as React from "react";
import Box from "@mui/material/Box";
import Navigation from "./Navigation/index";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <Box sx={{ display: "flex", maxWidth: "1200px" }}>
      <Navigation />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};
export default Layout;
