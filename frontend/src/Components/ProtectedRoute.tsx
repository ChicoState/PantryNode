import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "./Layout";

type ProtectedRouteProps = {
  isLoggedIn: boolean;
  redirectPath?: string;
};

const ProtectedRoute = ({
  isLoggedIn,
  redirectPath = "/landing",
}: ProtectedRouteProps) => {
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;
