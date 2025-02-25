import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Backbutton from "../Components/Backbutton";
import Loading from "../Components/Loading";
import { getWatches } from "../features/admin/adminSlice";
import { toast } from "react-toastify";

const AllWatches = () => {
  const { watches, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
    dispatch(getWatches());
    if (isError && message) {
      toast.error(message);
    }
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container p-3">
      <Backbutton url={"/"} />
      <div className="txt">
        <h1 className="text-center">All Complaints</h1>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover m-3">
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
            {Array?.isArray(watches) && watches?.length > 0 ? (
              watches?.map((watches, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td> {watches?.watch || "N/A"}</td>
                    <td>{watches?.registration || "N/A"}</td>
                    <td>
                      {watches?.createdAt
                        ? new Date(watches?.createdAt).toLocaleDateString(
                            "EN-IN"
                          )
                        : "N/A"}
                    </td>
                    <td>
                      <span
                        className={
                          watches?.status === "closed"
                            ? "badge text-bg-danger"
                            : "badge text-bg-primary"
                        }
                      >
                        {watches?.status || "Unknown"}
                      </span>
                    </td>
                    <td>
                      <Link
                        className="btn btn-sm btn-dark"
                        to={`/watches/${watches?._id}`}
                      >
                        <i class="fas fa-eye"></i>
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  {/* No data available 😴 */}
                  <Loading />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllWatches;
