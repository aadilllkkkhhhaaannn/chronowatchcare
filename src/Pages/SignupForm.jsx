// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const SignupForm = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const isButtonDisabled = !name || !email || !password;

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "name") setName(value);
//     else if (name === "email") setEmail(value);
//     else if (name === "password") setPassword(value);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       alert("Please fill all fields.");
//       return;
//     }

//     const mailBody = `Name: ${name}\nEmail: ${email}\n\nOTP sent to your email.`;
//     const mailToLink = `mailto:aadilkhan04610461@gmail.com?subject=New Signup from ${name}&body=${encodeURIComponent(
//       mailBody
//     )}`;

//     window.location.href = mailToLink;

//     navigate("/verify");
//   };

//   return (
//     <div className="container p-5">
//       <h1 className="text-center">Signup Form</h1>

//       <div className="card p-3 my-3 rounded-0">
//         <form onSubmit={handleSubmit}>
//           <input
//             value={name}
//             name="name"
//             required
//             onChange={handleChange}
//             type="text"
//             placeholder="Enter Name"
//             className="form-control my-2 rounded-0"
//           />

//           <input
//             value={email}
//             name="email"
//             required
//             onChange={handleChange}
//             type="email"
//             placeholder="Enter Email"
//             className="form-control my-2 rounded-0"
//           />

//           <input
//             value={password}
//             name="password"
//             required
//             onChange={handleChange}
//             type={showPassword ? "text" : "password"}
//             placeholder="Enter Password"
//             className="form-control my-2 rounded-0"
//           />
//           <i
//             className="fa-regular fa-eye"
//             style={{
//               position: "absolute",
//               top: "60%",
//               right: "22px",
//               cursor: "pointer",
//             }}
//             onClick={togglePasswordVisibility}
//           ></i>

//           <button
//             type="submit"
//             className="btn btn-sm w-100 rounded-0"
//             disabled={isButtonDisabled}
//             style={{
//               backgroundColor: isButtonDisabled ? "rgb(19, 21, 21)" : "black",
//               color: "white",
//             }}
//           >
//             Signup Now
//           </button>
//         </form>
//       </div>
//       <div className="signup">
//         <p>
//           Already have an account? {""} <Link to={"/login"}>Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;
