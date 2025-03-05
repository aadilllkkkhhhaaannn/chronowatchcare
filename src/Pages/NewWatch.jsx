import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addComplaint } from "../features/auth/Watch/watchSlice";
import { toast } from "react-toastify";
import Loading from "../Components/Loading";
import Backbutton from "../Components/Backbutton";

const NewWatch = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.watch
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [registrationError, setRegisterationError] = useState("");
  const [formData, setFormData] = useState({
    watch: "",
    registration: "",
    description: "",
  });
  const { watch, description, registration } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // // Registration error ko clear karo jab user value change kare
    // if (e.target.name === "registration") {
    //   setRegisterationError("");
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // // User data ka check karo, agar user ka registration number na ho to error show karo
    // if (!user || !user.registrationNumber) {
    //   setRegisterationError("User registration number not found.");
    //   return;
    // }

    // console.log("User Registration:", user?.registrationNumber); // Check karo
    // console.log("Entered Registration:", registration); // Check karo

    // // Compare karo entered number aur user ka saved number
    // if (registration.trim() !== user?.registrationNumber?.trim()) {
    //   setRegisterationError("Registration number is invalid.");
    //   return;
    // }

    // setRegisterationError("");
    toast.success("Complaint Raised!", {
      position: "top-center",
      theme: "colored",
      theme: "dark",
    });

    dispatch(addComplaint(formData)); // Complaint dispatch karo
    navigate("/watches"); // Redirect karo watches page pe
  };

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Agar user login nahi hai to login page pe redirect karo
    }
  }, [user, navigate]);

  if (isError && message) {
    toast.error(message);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container p-5">
      <Backbutton />
      <h1 className="text-center">Raise Your Complaint!</h1>
      <div className="card p-3 my-3">
        <input
          name="name"
          className="form-control my-1"
          disabled
          value={user?.name}
          type="text"
        />
        <input
          name="email"
          className="form-control my-1"
          disabled
          value={user?.email}
          type="text"
        />
        <form onSubmit={handleSubmit}>
          <select
            className="form-select my-1"
            name="watch"
            value={watch}
            onChange={handleChange}
          >
            <option value="">Select Your Watch</option>
            {/* Options for watches */}
            <option value="Patek Philippe Grandmaster Chime">
              Patek Philippe Grandmaster Chime
            </option>
            <option value="Jacob & Co. Billionaire Watch">
              Jacob & Co. Billionaire Watch
            </option>
            <option value="Breguet Grande Complication Marie-Antoinette">
              Breguet Grande Complication Marie-Antoinette
            </option>
            <option value="Graff Diamonds Hallucination">
              Graff Diamonds Hallucination
            </option>
            <option value="Rolex Paul Newman Daytona">
              Rolex Paul Newman Daytona
            </option>
            <option value="Chopard 201-Carat Watch">
              Chopard 201-Carat Watch
            </option>
          </select>
          <input
            type="text"
            className="form-control my-1"
            placeholder="Enter Registration Number*"
            value={registration}
            name="registration"
            required
            onChange={handleChange}
          />
          {/* {registrationError && (
            <small className="text-danger">{registrationError}</small>
          )} */}
          <textarea
            value={description}
            name="description"
            onChange={handleChange}
            placeholder="Enter Your Issue*"
            required
            className="form-control my-1"
          ></textarea>
          <button type="submit" className="btn btn-dark my-2 w-100">
            Raise Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewWatch;
