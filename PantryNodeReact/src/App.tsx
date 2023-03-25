import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./pages/index";
import Login from "./pages/login";
function App() {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
