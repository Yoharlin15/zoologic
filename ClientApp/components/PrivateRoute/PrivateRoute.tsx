import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../utils/isAuthenticated";
import { Routes } from "#core";

const PrivateRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to={Routes.BASE_ROUTE} replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
