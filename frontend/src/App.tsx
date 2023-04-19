import React from "react";
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

import selectStatus from "./redux-features/user";
import type { RootState } from './store'
import { useSelector, useDispatch } from 'react-redux'

// import { makeServer } from "./mirage";

// makeServer({ environment: "development" });

// Enable this after all the APIs' are ready
// if (process.env.NODE_ENV === "development") {
//   makeServer({ environment: "development" });
// }

function App() {
  const test = useSelector((state: RootState) => state.user.status);
  const dispatch = useDispatch()
  var isLoggedIn = false;
  if (test === "authenticated"){
    isLoggedIn = true;
  }
  // this needs to be replaced with a check to see if the user is logged in from state

  console.log("test0", test, isLoggedIn);
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* All the routes that are restricted and need authorization */}
      <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
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
