import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LogOutUser } from "../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(LogOutUser());
  };

  return (
    <nav className="navbar bg-light shadow-lg">
      <div className="container-fluid">
        <Link to={"/"}>
          {" "}
          <span style={{fontSize : "19px"}} className="navbar-brand mb-0 h1">ChronoWatch</span>
        </Link>

        <span className="float-end">
          {user ? (
            <button
              onClick={handleLogOut}
              className="btn btn-danger btn-sm rounded-0"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to={"/login"}
                className="btn btn-outline-dark btn-sm mx-2 rounded-0"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="btn btn-outline-dark btn-sm rounded-0"
              >
                Sign up
              </Link>
            </>
          )}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
