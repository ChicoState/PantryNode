import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import banner from "../images/banner.jpg";
interface Props {}

// https://im1ages.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2848&q=80
const Auth: React.FC<Props> = () => {
  // const history = useHistory();

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <div className="row w-100 mx-0">
        <div className="col-md-6">
          <img src={banner} alt="Logo" className="img-fluid" />
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Navigate to="/auth/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Auth;
