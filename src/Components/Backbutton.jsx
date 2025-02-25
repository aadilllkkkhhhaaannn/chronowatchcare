import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Backbutton = ({url}) => {
    const navigate = useNavigate()

  return (
    <Link onClick={()=>navigate(-1)} className="btn btn-danger btn-sm">
      <i class="fa-solid fa-arrow-left"></i>
    </Link>
  );
};

export default Backbutton;
