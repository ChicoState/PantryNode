import * as React from "react";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import CategoryIcon from "@mui/icons-material/Category";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import TimerIcon from "@mui/icons-material/Timer";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

// Add new paths here along with imported icons
const paths: Path[] = [
  {
    path: "/stock",
    key: "Current Stock",
    icon: <Inventory2Icon />,
  },
  {
    path: "/donors",
    key: "Donors",
    icon: <VolunteerActivismIcon />,
  },
  {
    path: "/sale",
    key: "On Sale",
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
    key: "Scan",
    icon: <QrCodeScannerIcon />,
  },
];

type Path = {
  path: string;
  key: string;
  icon: JSX.Element;
};

export default paths;
