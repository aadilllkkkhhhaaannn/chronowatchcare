import React, { useEffect, useState } from "react";
import Backbutton from "../Components/Backbutton";
import { useDispatch, useSelector } from "react-redux";
import {
  // closeComplaint,
  getComplaint,
} from "../features/auth/Watch/watchSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import imgee from "../assets/grf.jpeg";
import img from "../assets/jcbd.jpeg";
import rlx from "../assets/img.jpeg";
import brgt from "../assets/bt.jpeg";
import grf from "../assets/grfe.jpeg";
import ptk from "../assets/ptk.jpeg";

import { createNote, getNotes } from "../features/notes/noteSlice";
import { toast } from "react-toastify";

const SingleComplaints = () => {
  const [text, setText] = useState("");

  const { user } = useSelector((state) => state.auth);

  const { notes } = useSelector((state) => state.note);

  const { watchName, isError, isLoading, message } = useSelector(
    (state) => state.watch
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ id, note: text }));
    toast.success("Note Added!");
    setText("");
  };

  // Close Complaint
  const closeComplaint = () => {
    dispatch(closeComplaint(id));
    toast.success("Complaint Closed!");
  };

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getComplaint(id));
      dispatch(getNotes(id));
    }
  }, [user, isError, message, id, dispatch, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  const watchImages = {
    "Rolex Paul Newman Daytona": rlx,
    "Breguet Grande Complication Marie-Antoinette": brgt,
    "Jacob & Co. Billionaire Watch": img,
    "Chopard 201-Carat Watch": imgee,
    "Graff Diamonds Hallucination": grf,
    "Patek Philippe Grandmaster Chime": ptk,
  };

  // function to get image based on watch name
  function getImages(item) {
    return watchImages[item] || imgee; // Default image if no match found
  }

  return (
    <>
      <div className="container box p-5">
        <Backbutton />

        <div className="cardd">
          <div className="card p-3 my-3">
            <span className="img d-flex align-items-center justify-content-around">
              <div className="h">
                <h3 className="text my-2">Watch : {watchName?.watch}</h3>
                <h4 className="rg my-2">
                  Registration : {watchName?.registration}
                </h4>
                <h5 className="my-2 gb">
                  Description : {watchName?.description}
                </h5>
                <h5 className="my-2">
                  Status :{" "}
                  <span
                    className={
                      watchName?.status === "closed"
                        ? "badge text-bg-primary"
                        : "badge text-bg-success"
                    }
                  >
                    {watchName?.status}
                  </span>
                </h5>
                <h5>
                  Date :
                  {new Date(watchName?.createdAt).toLocaleDateString("en-IN")}{" "}
                </h5>
              </div>

              <img
                style={{ height: "250px" }}
                src={getImages(watchName?.watch)}
                alt={watchName?.watch}
                className="float-end"
              />
            </span>
          </div>
        </div>
        <div className="cardd">
          <div className="card p-3 my-3">
            <h4>Add Note :</h4>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control note"
                placeholder="Enter Note Here"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div className="note-btn">
                <button
                  required
                  type="submit"
                  className="btn btn-dark my-3 w-100 submit"
                >
                  Add Note
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="cardd">
          <div className="card p-3 my-3">
            <h4>Notes : </h4>

            <ul className="ul list-group">
              <li
                key={notes?._id}
                className={
                  notes?.isStaff
                    ? "list-group-item bg-success"
                    : "list-group-item"
                }
              >
                <h5>{notes[0]?.note}</h5>
                {notes?.isStaff ? (
                  <h6 className="text-light">-From Staff 👍🏻</h6>
                ) : (
                  <h6 className="badge bg-danger text-light">-{user?.name}</h6>
                )}
              </li>
            </ul>
          </div>
          {/* <button
            className="btn btn-danger my-3 w-100"
            disabled={watchName.status === "closed" ? true : false}
            onClick={closeComplaint}
          >
            Close Complaint
          </button> */}
        </div>
      </div>
    </>
  );
};

export default SingleComplaints;
