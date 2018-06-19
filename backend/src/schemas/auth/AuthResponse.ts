import Joi from "joi";

import * as types from "../types";

export interface IAuthResponse {
  accessToken: string;
  username: string;
  uid: string;
}

export const AuthResponse = Joi.object().required().keys({
  accessToken: types.uidv4.required(),
  username: Joi.string().required(),
  uid: types.uidv4.required()
}).label("AuthResponse");