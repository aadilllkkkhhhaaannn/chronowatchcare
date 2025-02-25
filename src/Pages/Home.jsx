import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (user?.isAdmin && user.email === "aadilkhanadmin@gmail.com") {
    return (
      <div className="container p-5">
        <div className="tx">
          <h1 className="text-center">👋🏻Welcome {user?.name}!</h1>
        </div>
        <div className="card p-3">
          <h3 className="text-center text-dark">Select Any Option From Here</h3>
          <Link to={"/admin/users"} className="bttn btn btn-outline-dark my-1">
            View All Users
          </Link>
          <Link
            to={"/admin/watches"}
            className="bttn btn btn-outline-dark my-1"
          >
            View All Job Cards
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container p-5">
        <h1 className="text-center name">👋🏻Welcome {user?.name}!</h1>
        <div className="card p-3">
          <h3 className="text-center text-dark">Select Any Option From Here</h3>
          <Link to={"/create"} className="bttn btn btn-outline-dark my-1">
            Create Job Card
          </Link>
          <Link to={"/watches"} className="bttn btn btn-outline-dark my-1">
            View Job Cards
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
