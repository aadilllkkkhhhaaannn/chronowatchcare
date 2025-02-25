import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import Loading from "../Components/Loading";
import { Link, useNavigate } from "react-router-dom";
import CopyToClipboard from "../Components/CopyToClipboard"; // Make sure this is imported
import { toast } from "react-toastify";


const Register = () => {
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
    if (e.target.name === "password") {
      if (e.target.value.length < 5) {
        setPasswordError("Password must be at least 5 characters long.");
      } else {
        setPasswordError("");
      }
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
    e.preventDefault();

    if (password.length < 5) {
      setPasswordError("Password must be at least 5 characters long.");
      return;
    }


    toast.success(
      <div>
        <p>Register Successfully</p>

      </div>,
      { position: "top-center", theme: "dark" }
    );

    dispatch(registerUser({ ...formData }));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }

    if (isError && message) {
      // toast.error(message);
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
        <h1 className="text-center">Register</h1>

        <div className="card p-3 my-3 rounded-0">
          <form onSubmit={handleSubmit}>
            <input
              value={name}
              name="name"
              required
              onChange={handleChange}
              type="text"
              placeholder="Enter Name"
              className="form-control my-2 login-input rounded-0"
            />

            <input
              value={email}
              name="email"
              required
              onChange={handleChange}
              type="email"
              placeholder="Enter Email"
              className="form-control my-2 login-input rounded-0"
            />

            <input
              value={password}
              name="password"
              required
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="form-control my-2 login-input rounded-0"
            />
            <i
              className="fa-regular fa-eye"
              style={{
                position: "absolute",
                top: "60%",
                right: "22px",
                cursor: "pointer",
              }}
              onClick={togglePasswordVisibility}
            ></i>

            {passwordError && (
              <small className="text-danger">{passwordError}</small>
            )}

            <button
              className="btn btn-sm w-100 rounded-0 login-input"
              disabled={isButtonDisabled}
              style={{
                backgroundColor: isButtonDisabled
                  ? " rgb(19, 21, 21)"
                  : "black",
                color: "white",
              }}
            >
              Register
            </button>
          </form>
        </div>
        <div className="signup">
          <p>
            Already have an account? {""} <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
