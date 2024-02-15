import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import EventBus from "./common/EventBus";
import { logout } from "./slices/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import AddAddress from "./components/AddAddress";

const App = () => {
  const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    console.log(isLoggedIn);
    if (isLoggedIn) {
      return children;
    }
    return isLoggedIn ? children : <Navigate to="/" replace />;
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/addAddress"
            element={
              <PrivateRoute>
                <AddAddress />
              </PrivateRoute>
            }
          />

          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
