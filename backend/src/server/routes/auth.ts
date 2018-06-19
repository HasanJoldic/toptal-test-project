import * as ctrl from "../controllers/auth";

import { RegisterPostRequest } from "../../schemas/auth/RegisterPostRequest";
import { LoginPostRequest } from "../../schemas/auth/LoginPostRequest";

const routes = [
  {
    method: "POST",
    path: "/api/v1/auth/register",
    handler: ctrl.register,
    config: {
      auth: false,
      description: "username-password register; returns a json web token",
      validate: {
        payload: RegisterPostRequest
      }
    }
  },
  {
    method: "POST",
    path: "/api/v1/auth/login",
    handler: ctrl.login,
    config: {
      auth: false,
      description: "username-password login; returns a json web token",
      validate: {
        payload: LoginPostRequest
      }
    }
  }
];

export default routes;