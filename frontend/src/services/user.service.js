import Agent from "./auth-header";
import { ServerError } from "../utils/helpers";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const API_URL = "http://localhost:5000";

const getUserData = (cb) => {
  Agent.fire("get", `${API_URL}/api/users`).end((err, res) => {
    var error =
      err || res.error
        ? ServerError(res)
        : res.body && res.body.error
        ? ServerError(res)
        : null;
    let data = JSON.parse(
      JSON.stringify((res && res.body && res.body.data) || {})
    );

    if (!error) {
      cookie.set("token", data.token, { path: "/" });
    }

    if (typeof cb === "function") return cb(error, data);
  });
};

const updateUserData = (payload, cb) => {
  Agent.fire("post", `${API_URL}/api/users`)
    .send(payload)
    .end((err, res) => {
      var error =
        err || res.error
          ? ServerError(res)
          : res.body && res.body.error
          ? ServerError(res)
          : null;
      let data = JSON.parse(JSON.stringify((res && res.body) || {}));

      if (!error) {
        cookie.set("token", data.data.token, { path: "/" });
      }

      if (typeof cb === "function") return cb(error, data);
    });
};

const getAddresses = (cb) => {
  Agent.fire("get", `${API_URL}/api/addresses`).end((err, res) => {
    var error =
      err || res.error
        ? ServerError(res)
        : res.body && res.body.error
        ? ServerError(res)
        : null;
    let data = JSON.parse(
      JSON.stringify((res && res.body && res.body.data) || {})
    );

    if (!error) {
      cookie.set("token", data.token, { path: "/" });
    }

    if (typeof cb === "function") return cb(error, data);
  });
};

const deleteAddress = (id, cb) => {
  Agent.fire("post", `${API_URL}/api/addresses/delete`)
    .send({ id: id })
    .end((err, res) => {
      var error =
        err || res.error
          ? ServerError(res)
          : res.body && res.body.error
          ? ServerError(res)
          : null;
      let data = JSON.parse(
        JSON.stringify((res && res.body && res.body.data) || {})
      );

      if (!error) {
        cookie.set("token", data.token, { path: "/" });
      }

      if (typeof cb === "function") return cb(error, data);
    });
};

const addAddress = (payload, cb) => {
  Agent.fire("post", `${API_URL}/api/addresses`)
    .send(payload)
    .end((err, res) => {
      var error =
        err || res.error
          ? ServerError(res)
          : res.body && res.body.error
          ? ServerError(res)
          : null;
      let data = JSON.parse(JSON.stringify((res && res.body) || {}));

      if (!error) {
        cookie.set("token", data.data.token, { path: "/" });
      }

      if (typeof cb === "function") return cb(error, data);
    });
};

const userService = {
  getUserData,
  updateUserData,
  getAddresses,
  deleteAddress,
  addAddress,
};

export default userService;
