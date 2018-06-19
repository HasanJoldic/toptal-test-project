import Joi from "joi";

import * as types from "../types";

export interface IRegisterPostRequest {
  username: string;
  password: string;
  role: string;
}

export const RegisterPostRequest = Joi.object().required().keys({
  username: Joi.string().required(),
  password: types.password.required(),
  role: types.role
}).label("RegisterPostRequest");