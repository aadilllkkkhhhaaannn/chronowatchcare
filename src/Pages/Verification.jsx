import Backbutton from "../Components/Backbutton";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { VerificationUser } from "../features/auth/authSlice";
import Loading from "../Components/Loading";

const Verification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  const [passwordError, setPasswordError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { name, email, password } = formData;

  const handleChange = (e) => {
    if (e.target.name === "password" && e.target.value.length < 5) {
      setPasswordError("Password must be at least 5 characters long.");
    } else {
      setPasswordError("");
    }
    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value,
    // });

    const [formData, setFormData] = useState({
      text: "",
    });
  };

  useEffect(() => {
    const isButtonDisabled = !(
      email.includes("@") &&
      email.includes(".") &&
      password.length >= 5
    );
    if (name && email && password) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, email, password]);

  const handleSubmit = (e) => {
    if (password.length < 5) {
      setPasswordError("Password must be at least 5 characters long.");
      return;
    }

    e.preventDefault();
    toast.success("Register Successfully", {
      position: "top-center",
      theme: "colored",
      theme: "dark",
    });

    dispatch(VerificationUser(formData));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }

    if (isError && message) {
      toast.error(message);
    }
  }, [user, isSuccess, isError, message]);

  if (isLoading) {
    return <Loading />;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="container p-5">
        <Backbutton />

        <div className="d-flex align-items-center justify-content-center">
          <div class="containerr">
            <h1>OPT Verification</h1>
            <div class="cardd p-4">
              <form onSubmit={handleSubmit}>
                <div className="inputs d-flex align-items-center justify-content-center">
                  <div class="form-group my-2">
                    <input
                      type="text"
                      class="form-control i"
                      id="otp"
                      required
                    />
                  </div>
                  <div class="form-group my-2">
                    <input
                      type="text"
                      //   value={text}
                      class="form-control i"
                      id="otp"
                      required
                    />
                  </div>
                  <div class="form-group my-2">
                    <input
                      type="text"
                      class="form-control i"
                      id="otp"
                      required
                    />
                  </div>
                  <div class="form-group my-2">
                    <input
                      type="text"
                      class="form-control i"
                      id="otp"
                      required
                    />
                  </div>
                </div>
                <button type="submit" class="btn btn-primary w-100">
                  Verify
                </button>
              </form>
            </div>
            <div class="footer">
              <p>© 2024 OPT Verification. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verification;
