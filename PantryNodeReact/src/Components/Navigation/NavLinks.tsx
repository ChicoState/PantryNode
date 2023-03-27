import React from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useState } from "react";
import { Box, ListItemIcon } from "@mui/material";
import paths from "./paths";
import LogoutIcon from "@mui/icons-material/Logout";

type propTypes = {
  toggleDrawer: Function;
  setAnchorOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const NavLinks = ({ toggleDrawer, setAnchorOpen }: propTypes) => {
  const location = useLocation();
  const navigate = useNavigate();

  const path: String = location.pathname;
  const [activeLink, setActiveLink] = useState(path);

  const handleLogout = () => {
    toggleDrawer();
    return navigate("/login");
  };
  return (
    <Box
      role="presentation"
      onClick={() => toggleDrawer()}
      sx={{
        height: "100vh",
      }}>
      <NavLink
        style={{ textDecorationLine: "none" }}
        to="/"
        onClick={() => setAnchorOpen(false)}>
        <Typography
          textAlign={"center"}
          variant="h5"
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
          height: "auto",
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
                setAnchorOpen(false);
              }}>
              <ListItemButton selected={activeLink === path.path}>
                <ListItemIcon>{path.icon}</ListItemIcon>
                <ListItemText primary={path.key} />
              </ListItemButton>
            </ListItem>
          ))}
        </div>
      </List>
      <ListItem
        key={"Logout"}
        style={{
          backgroundColor: "#ffeeee",
          cursor: "pointer",
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
        disablePadding
        onClick={() => handleLogout()}>
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItemButton>
      </ListItem>
    </Box>
  );
};

export default NavLinks;
