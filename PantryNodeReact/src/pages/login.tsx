import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      login
      <Button onClick={() => navigate("/")}> Submit</Button>
    </div>
  );
};

export default Login;
