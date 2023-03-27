import React from "react";
import Drawer from "@mui/material/Drawer";
import NavLinks from "./NavLinks";
import { Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const drawerWidth = 200;

const Navigation = () => {
  const [anchorOpen, setAnchorOpen] = React.useState(true);
  const toggleDrawer: Function =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setAnchorOpen((anchorOpen) => !anchorOpen);
    };
  return (
    <>
      <Button
        sx={{
          position: "fixed",
          top: 15,
          left: 15,
        }}
        onClick={toggleDrawer()}>
        <MenuIcon
          sx={{
            borderRadius: "20%",
            backgroundColor: "lightgray",
            fontSize: "2.5rem",
            padding: "6px 3px",
          }}
        />
      </Button>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            maxHeight: "100vh",
          },
        }}
        open={anchorOpen}
        onClose={toggleDrawer()}
        // variant="permanent"
        anchor="left">
        <NavLinks setAnchorOpen={setAnchorOpen} toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  );
};

export default Navigation;
