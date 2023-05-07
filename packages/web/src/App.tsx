import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Chart from "./components/Chart";
import Checkout from "./components/Checkout";
import Donor from "./components/Donor";
import Navbar from "./components/NavBar";
import Stock from "./components/Stock";
import Auth from "./containers/Auth";
import Home from "./containers/Home";
import "./scss/style.scss"; // Import the SCSS
import UserContext from "./store/context/UserContext";

export default function App() {
  const userContext = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    if (!userContext?.userState.token) userContext?.autoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userContext?.userState.token && userContext?.userState.token !== "")
      setIsAuthenticated(true);
  }, [userContext]);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        {isAuthenticated ? (
          <React.Fragment>
            <Route path="/home/*" element={<Home />} />
            <Route path="/stock/*" element={<Stock />} />
            <Route path="/donor/*" element={<Donor />} />
            <Route path="/chart/*" element={<Chart />} />
            <Route path="/checkout/*" element={<Checkout />} />
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        <Route path="/*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </Router>
  );
}
