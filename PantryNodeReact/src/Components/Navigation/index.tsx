import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useState } from "react";
import { ListItemIcon } from "@mui/material";
import paths from "./paths";
import LogoutIcon from "@mui/icons-material/Logout";
const drawerWidth = 240;
const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const path: String = location.pathname;
  const [activeLink, setActiveLink] = useState(path);

  const handleLogout = () => {
    return navigate("/login");
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left">
      <NavLink style={{ textDecorationLine: "none" }} to="/">
        <Typography
          textAlign={"center"}
          variant="h4"
          paddingY="1rem"
          color="primary"
          fontWeight="bold">
          Pantry Node
        </Typography>
      </NavLink>
      <Divider />
      <List
        component="nav"
        style={{
          paddingBottom: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
        <div>
          {paths.map((path) => (
            <ListItem
              style={{
                cursor: "pointer",
                borderTop:
                  activeLink === path.path ? "1px solid lightgray" : "",
                borderBottom:
                  activeLink === path.path ? "1px solid lightgray" : "",
              }}
              key={path.key}
              disablePadding
              onClick={() => {
                setActiveLink(path.path);
                navigate(path.path);
              }}>
              <ListItemButton selected={activeLink === path.path}>
                <ListItemIcon>{path.icon}</ListItemIcon>
                <ListItemText primary={path.key} />
              </ListItemButton>
            </ListItem>
          ))}
        </div>
        <ListItem
          key={"Logout"}
          style={{ backgroundColor: "#ffeeee", cursor: "pointer" }}
          disablePadding
          onClick={() => handleLogout()}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Navigation;
