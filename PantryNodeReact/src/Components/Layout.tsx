import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { ListItemIcon } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import CategoryIcon from "@mui/icons-material/Category";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import TimerIcon from "@mui/icons-material/Timer";
import LogoutIcon from "@mui/icons-material/Logout";
const drawerWidth = 240;

const Layout = ({ children }: any) => {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  const [activeLink, setActiveLink] = useState(path.split("/")[1]);

  const handleLogout = () => {
    return navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
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
        <Typography
          textAlign={"center"}
          variant="h4"
          paddingY="1rem"
          color="primary"
          fontWeight="bold">
          Pantry Node
        </Typography>
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
            <ListItem
              key={"Stock"}
              disablePadding
              onClick={() => {
                setActiveLink("stock");
                navigate("/stock");
              }}>
              <ListItemButton selected={activeLink === "stock"}>
                <ListItemIcon>
                  <Inventory2Icon />
                </ListItemIcon>
                <ListItemText primary={"Stock"} />
              </ListItemButton>
            </ListItem>

            <ListItem
              key={"Donor"}
              disablePadding
              onClick={() => {
                setActiveLink("donor");
                navigate("/donor");
              }}>
              <ListItemButton selected={activeLink === "donor"}>
                <ListItemIcon>
                  <VolunteerActivismIcon />
                </ListItemIcon>
                <ListItemText primary={"Donor"} />
              </ListItemButton>
            </ListItem>
            <ListItem
              key={"Sale"}
              disablePadding
              onClick={() => {
                setActiveLink("sale");
                navigate("/sale");
              }}>
              <ListItemButton selected={activeLink === "sale"}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary={"Sale"} />
              </ListItemButton>
            </ListItem>

            <ListItem
              key={"Summary"}
              disablePadding
              onClick={() => {
                setActiveLink("summary");
                navigate("/summary");
              }}>
              <ListItemButton selected={activeLink === "summary"}>
                <ListItemIcon>
                  <StackedBarChartIcon />
                </ListItemIcon>
                <ListItemText primary={"Summary"} />
              </ListItemButton>
            </ListItem>

            <ListItem
              key={"Expiry"}
              disablePadding
              onClick={() => {
                setActiveLink("expiry");
                navigate("/expiry");
              }}>
              <ListItemButton selected={activeLink === "expiry"}>
                <ListItemIcon>
                  <TimerIcon />
                </ListItemIcon>
                <ListItemText primary={"Expiry"} />
              </ListItemButton>
            </ListItem>
          </div>
          <ListItem
            key={"Logout"}
            // pale red
            style={{ backgroundColor: "#ffcccb" }}
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
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};
export default Layout;
