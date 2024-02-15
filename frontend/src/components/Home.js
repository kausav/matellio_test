import React from "react";
import { useNavigate } from "react-router-dom";

import UserService from "../services/user.service";

const Home = () => {
  let navigate = useNavigate();

  return (
    <div className="container">
      <header className="jumbotron">
        <button
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </button>
        <button
          onClick={() => {
            navigate("/signin");
          }}
        >
          Sign In
        </button>
      </header>
    </div>
  );
};

export default Home;
