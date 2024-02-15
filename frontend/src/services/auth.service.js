import Agent from "./auth-header";
import { ServerError } from "../utils/helpers";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const API_URL = "http://localhost:5000";

const register = (payload, cb) => {
  Agent.fire("post", `${API_URL}/signup`)
    .send(payload)
    .end((err, res) => {
      var error =
        err || res.error
          ? ServerError(res)
          : res.body && res.body.error
          ? ServerError(res)
          : null;
      let userData = JSON.parse(JSON.stringify((res && res.body) || {}));

      if (!error) {
        cookie.set("token", userData.data.token, { path: "/" });
      }
      if (typeof cb === "function") return cb(error, userData);
    });
};

const login = (payload, cb) => {
  Agent.fire("post", `${API_URL}/signin`)
    .send(payload)
    .end((err, res) => {
      var error =
        err || res.error
          ? ServerError(res)
          : res.body && res.body.error
          ? ServerError(res)
          : null;
      let userData = JSON.parse(JSON.stringify((res && res.body) || {}));

      if (!error) {
        cookie.set("token", userData.data.token, { path: "/" });
      }

      if (typeof cb === "function") return cb(error, userData);
    });
};

const logout = () => {
  Agent.removeSession();
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
