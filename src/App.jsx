import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import PageNotFound from "./Components/PageNotFound";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AllComplaints from "./Pages/AllComplaints";
import SingleComplaints from "./Pages/SingleComplaints";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewWatch from "./Pages/NewWatch";
import AllUsers from "./Pages/AllUsers";
import AllWatches from "./Pages/AllWatches";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="watches" element={<AllComplaints />} />
            <Route path="create" element={<NewWatch />} />
            <Route path="watches/:id" element={<SingleComplaints />} />
            <Route path="admin/users" element={<AllUsers />} />
            <Route path="admin/watches" element={<AllWatches />} />
          </Route>
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
};

export default App;
