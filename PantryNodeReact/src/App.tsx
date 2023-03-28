import React from "react";
import { Route, Routes } from "react-router-dom";
import Donor from "./pages/donor";
import Expiry from "./pages/expiry";
import Index from "./pages/index";
import Login from "./pages/login";
import Sale from "./pages/sale";
import Stock from "./pages/stock";
import Summary from "./pages/summary";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  // this needs to be replaced with a check to see if the user is logged in from state
  const isLoggedIn = true;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* All the routes that are restricted and need authorization */}
      <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
        <Route index element={<Index />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="donor" element={<Donor />} />
        <Route path="sale" element={<Sale />} />
        <Route path="expiry" element={<Expiry />} />
      </Route>
    </Routes>
  );
}

export default App;
