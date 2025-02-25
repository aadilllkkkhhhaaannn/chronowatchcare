import React from "react";
import { Link } from "react-router-dom";
import Backbutton from "./Backbutton";

const PageNotFound = () => {
  return (
    <>
      <div
        id="container"
        className="p-5 d-flex align-items-center justify-content-center"
        >
        {/*  <Backbutton /> */}
        {/* <h1 className="display-6 text-danger text-center my-4">
          404 Page Not Found
        </h1> */}
        <img
          src="https://images.squarespace-cdn.com/content/v1/6006dd43893bc73c30c23d0d/1611062696335-6GPMFGGT0LNC898XH6OS/ezgif.com-crop.gif"
          alt=""
        />
        {/* <Link to={"/"} className="btn btn-dark w-100 btn-sm">
          Go Back
        </Link> */}
      </div>
    </>
  );
};

export default PageNotFound;
