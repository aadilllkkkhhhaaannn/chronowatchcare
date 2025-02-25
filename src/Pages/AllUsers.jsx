import React, { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import Backbutton from "../Components/Backbutton";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/admin/adminSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const { users, isLoading, isError, message } = useSelector(
    (state) => state.admin
  );
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getUsers());
    }
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); 
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container p-3">
        <Backbutton url={"/"} />
        <div className="txt">
          <h1 className="text-center">All Users</h1>
        </div>
        <div className="table-container">
          <table className=" responsive-table table m-3">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <span
                        className={`badge m-1 ${
                          isSmallScreen ? "d-inline" : "d-none"
                        }`}
                        style={{
                          backgroundColor: "pink",
                          color: "black",
                        }}
                      >
                        Name{" "}
                      </span>{" "}
                      {user?.name}
                    </td>
                    <td>
                      <span
                        className={`badge m-1 text-bg-warning ${
                          isSmallScreen ? "d-inline" : "d-none"
                        }`}
                        style={{
                          color: "black",
                        }}
                      >
                        Email{" "}
                      </span>{" "}
                      {user?.email}
                    </td>
                    <td>
                      <span
                        className={`badge m-1 text-bg-warning ${
                          isSmallScreen ? "d-inline" : "d-none"
                        }`}
                        style={{
                          color: "black",
                        }}
                      >
                        Email{" "}
                      </span>{" "}
                      {user?.password}
                    </td>
                    <td>
                      <span
                        className={`badge m-1 text-bg-danger ${
                          isSmallScreen ? "d-inline" : "d-none"
                        }`}
                        style={{
                          color: "black",
                        }}
                      >
                        Date{" "}
                      </span>{" "}
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td>
                    <td>
                      <span
                        className={`badge m-1 text-bg-success ${
                          isSmallScreen ? "d-inline" : "d-none"
                        }`}
                        style={{
                          color: "black",
                        }}
                      >
                        Time{" "}
                      </span>{" "}
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No data available 😴
                    {/* <Loading /> */}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
