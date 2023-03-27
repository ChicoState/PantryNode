import * as React from "react";
import Box from "@mui/material/Box";
import Navigation from "./Navigation/index";

const Layout = ({ children }: any) => {
  return (
    <div
      style={{
        maxWidth: "1200px",
        position: "relative",
        // border: "1px solid green",
        margin: "0px auto",
      }}>
      <Box sx={{ display: "flex" }}>
        <Navigation />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
          {children}
        </Box>
      </Box>
    </div>
  );
};
export default Layout;
