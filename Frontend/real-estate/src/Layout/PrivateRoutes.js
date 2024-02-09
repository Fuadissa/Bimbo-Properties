import React from "react";
import { storedToken } from "../AdminAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  return storedToken() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
