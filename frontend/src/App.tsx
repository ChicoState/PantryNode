import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Donor from "./pages/donor";
import Expiry from "./pages/expiry";
import Index from "./pages/index";
import Login from "./pages/login";
import Sale from "./pages/sale";
import Stock from "./pages/stock";
import Summary from "./pages/summary";
import Signup from "./pages/register";
import Scanner from "./pages/scanner";
import ProtectedRoute from "./Components/ProtectedRoute";
import { getToken } from "./Components/useToken";

import { makeServer } from "./mirage";

makeServer({ environment: "development" });

// Enable this after all the APIs' are ready
// if (process.env.NODE_ENV === "development") {
//   makeServer({ environment: "development" });
// }

function App() {
  const [is_logged_in, set_is_logged_in] = useState(false);
  useEffect(() => {
    console.log("Setting state");
    const token = getToken();
    if (token) {
      set_is_logged_in(true);
      console.log("Setting to true");
    }
  }, [is_logged_in]);
  
  console.log(is_logged_in);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* All the routes that are restricted and need authorization */}
      <Route element={<ProtectedRoute isLoggedIn={is_logged_in} />}>
        <Route index element={<Index />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/donor" element={<Donor />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/expiry" element={<Expiry />} />
        <Route path="/scanner" element={<Scanner />} />
      </Route>
    </Routes>
  );
}

export default App;
