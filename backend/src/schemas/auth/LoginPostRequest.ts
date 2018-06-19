import Joi from "joi";

import * as types from "../types";

export interface ILoginPostRequest {
  username: string;
  password: string;
}

export const LoginPostRequest = Joi.object().required().keys({
  username: Joi.string().required(),
  password: types.password.required()
}).label("LoginPostRequest");