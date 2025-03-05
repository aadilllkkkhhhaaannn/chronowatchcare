import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";
import Loading from "../Components/Loading";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "password") {
      if (e.target.value.length < 5) {
        setPasswordError("Password must be at least 5 characters long.");
      } else {
        setPasswordError("");
      }
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (password.length < 5) {
  //     setPasswordError("Password must be at least 5 characters long.");
  //     return;
  //   }

  //   dispatch(loginUser(formData));

  //   dispatch(loginUser({ ...formData, registrationNumber }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 5) {
      setPasswordError("Password must be at least 5 characters long.");
      return;
    }

    toast.success(
      <div>
        <p>Login Successfully</p>
      </div>,
      { position: "top-center", theme: "dark" }
    );

    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isSuccess && user) {
      // toast.success(
      //   <div>
      //     <p>Login Successfully</p>
      //   </div>,
      //   { position: "top-center", theme: "dark" }
      // );
      navigate("/");
    }

    if (isError) {
      toast.error(
        <div>
          <p>Invalid Credentials</p>
        </div>,
        { position: "top-center", theme: "dark" }
      );
    }
  }, [user, isSuccess, isError, navigate]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }

    if (isError && message) {
      // toast.error(message, { position: "top-center" });
    }
  }, [user, isSuccess, isError, message, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isButtonDisabled = !(
    email.includes("@") &&
    email.includes(".") &&
    password.length >= 5
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container p-5">
        <h1 className="text-center">Login</h1>

        <div className="card p-3 my-3 rounded-0">
          <form onSubmit={handleSubmit}>
            <input
              value={email}
              name="email"
              onChange={handleChange}
              type="email"
              required
              placeholder="Enter Email"
              className="form-control my-2 rounded-0 login-input"
            />

            <input
              value={password}
              name="password"
              onChange={handleChange}
              required
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="form-control my-2 rounded-0 login-input"
            />

            <i
              className="fa-regular fa-eye"
              style={{
                position: "absolute",
                top: "49%",
                right: "22px",
                cursor: "pointer",
              }}
              onClick={togglePasswordVisibility}
            ></i>

            {passwordError && (
              <small
                style={{ color: "gray" }}
                className={
                  password.length >= 5
                    ? "text-success fw-bold"
                    : "fw-bold text-danger"
                }
              >
                {passwordError}
              </small>
            )}

            <button
              className="btn btn-sm w-100 btn-dark rounded-0 batan login-input"
              type="submit"
              disabled={isButtonDisabled}
              style={{
                backgroundColor: isButtonDisabled ? "rgb(19, 21, 21)" : "black",
                color: "white",
              }}
            >
              Login
            </button>
          </form>
        </div>
        <p className="float-end">
          Don't have an account?<Link to={"/register"}>Sign up</Link>
          <a href="https://hamza-s-portfolio-vg5o.vercel.app/">
            <p>
              <span style={{ color: "black" }}>Designed by</span> Aadil Khan
            </p>
          </a>
        </p>
      </div>
    </>
  );
};

export default Login;
