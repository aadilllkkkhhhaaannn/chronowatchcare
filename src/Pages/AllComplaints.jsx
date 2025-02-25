import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComplaints } from "../features/auth/Watch/watchSlice";
import { Link, useNavigate } from "react-router-dom";
import Backbutton from "../Components/Backbutton";
import Loading from "../Components/Loading";
import { toast } from "react-toastify";

const AllComplaints = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 320);
  const { watchName, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.watch
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
    if (!user) {
      return navigate("/login");
    }
    dispatch(getComplaints());
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 320);
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
    <div className="container Complaints-box p-4">
      <Backbutton url={"/"} />
      <div className="txt">
        <h1 className="text-center">All Complaints</h1>
      </div>
      <table className="table m-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Watch</th>
            <th scope="col">Registration</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(watchName) && watchName.length > 0 ? (
            watchName.map((watches, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <span
                      className="badge m-1"
                      style={{
                        backgroundColor: "pink",
                        color: "black",
                        display: isSmallScreen ? "inline-block" : "none",
                      }}
                    >
                      Watch{""}{" "}
                    </span>
                    {watches?.watch || "N/A"}
                  </td>
                  <td>
                    {" "}
                    <span
                      className="badge text-bg-warning m-1"
                      style={{
                        display: isSmallScreen ? "inline-block" : "none",
                      }}
                    >
                      Registration{""}{" "}
                    </span>{" "}
                    {watches?.registration || "N/A"}
                  </td>
                  <td>
                    {" "}
                    <span
                      className="badge text-bg-danger m-1"
                      style={{
                        display: isSmallScreen ? "inline-block" : "none",
                      }}
                    >
                      Date{" "}
                    </span>
                    {watches?.createdAt
                      ? new Date(watches.createdAt).toLocaleDateString("EN-IN")
                      : "N/A"}
                  </td>
                  <td>
                    {" "}
                    <span
                      className={
                        watches?.status === "closed"
                          ? "badge text-bg-danger"
                          : "badge text-bg-success"
                      }
                    >
                      {watches?.status || "Unknown"}
                    </span>
                  </td>
                  <td>
                    <span
                      className="badge text-bg-primary m-1"
                      style={{
                        display: isSmallScreen ? "inline-block" : "none",
                      }}
                    >
                      Details{" "}
                    </span>
                    <Link
                      className="btn btn-sm btn-dark"
                      to={`/watches/${watches._id}`}
                    >
                      {/* View */}
                      <i class="fas fa-eye"></i>
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Complaint Processing 😴
                {/* <Loading />/ */}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllComplaints;
