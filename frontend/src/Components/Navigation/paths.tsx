import * as React from "react";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import CategoryIcon from "@mui/icons-material/Category";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import TimerIcon from "@mui/icons-material/Timer";

// Add new paths here along with imported icons
const paths: Path[] = [
  {
    path: "/stock",
    key: "Stock",
    icon: <Inventory2Icon />,
  },
  {
    path: "/donor",
    key: "Donor",
    icon: <VolunteerActivismIcon />,
  },
  {
    path: "/sale",
    key: "Sale",
    icon: <CategoryIcon />,
  },
  {
    path: "/summary",
    key: "Summary",
    icon: <StackedBarChartIcon />,
  },
  {
    path: "/expiry",
    key: "Expiry",
    icon: <TimerIcon />,
  },
  {
    path: "/scanner",
    key: "Scanner",
    icon: <TimerIcon />,
  },
];

type Path = {
  path: string;
  key: string;
  icon: JSX.Element;
};

export default paths;
