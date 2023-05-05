import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "./Layout";
import { useAppSelector } from "../hooks";

type ProtectedRouteProps = {
  redirectPath?: string;
};

const ProtectedRoute = ({
  redirectPath = "/login",
}: ProtectedRouteProps) => {
  const status = useAppSelector(state => state.user.status);
  if (status !== "authenticated") {
    return <Navigate to={redirectPath} replace />;
  }
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;
