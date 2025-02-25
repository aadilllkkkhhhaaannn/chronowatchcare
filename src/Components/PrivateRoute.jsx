import React from "react";
import useAuthStatus from "../hooks/useAuthStatus";
import Loading from "../Components/Loading";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const {isLoggedIn, cheking} = useAuthStatus();

  if (cheking) {
    return <Loading />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
