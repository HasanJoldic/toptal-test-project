import Hapi from "hapi";
import { getConnection } from "typeorm";
import bcrypt from "bcrypt";
const uuidv4 = require("uuid/v4");
import jwt from "jsonwebtoken";
import Boom from "boom";

import { User } from "../../db/entities/User";
import { AccessToken } from "../../db/entities/AccessToken";

import { IRegisterPostRequest } from "../../schemas/auth/RegisterPostRequest";
import { ILoginPostRequest } from "../../schemas/auth/LoginPostRequest";
// import Config from "../../shared/config/Config";

const saltRounds = 10;

export const register = async (request: Hapi.Request, reply: any) => {
  const { username, password, role = "user" } = request.payload as IRegisterPostRequest;
  const hash = await bcrypt.hash(password, saltRounds);
  const currentDateTime = new Date();

  let user = new User();
  user.username = username;
  user.role = role;
  user.password = hash;
  user.uid = uuidv4();
  user.createdAt = currentDateTime;
  user.meals = [];

  let accessToken = new AccessToken();
  accessToken.token = uuidv4();
  accessToken.createdAt = currentDateTime;
  accessToken.validUntil = new Date(currentDateTime.getTime() + 30*24*3600*1000);

  user.accessToken = accessToken;

  const userRepository = getConnection().getRepository(User);
  return userRepository.save(user).then(() => {
    return {
      username: user.username, 
      uid: user.uid,
      accessToken: jwtSign({token: accessToken.token}),
      user: {
        username: user.username,
        dailyCalorieGoal: user.dailyCalorieGoal,
        role: user.role
      }
    };
  }).catch((error:any) => {
    return Boom.conflict("User already exists.");
  });  
};

export const login = async (request: Hapi.Request, reply: any) => {
  const currentDateTime = new Date();
  const { username, password } = request.payload as ILoginPostRequest;
  const userRepository = getConnection().getRepository(User);

  const user = await userRepository.findOne({
    where: {username},
    relations: ["accessToken"]
  });

  if (user) {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {

      user.accessToken.token = uuidv4();
      user.accessToken.createdAt = currentDateTime;
      user.accessToken.validUntil = new Date(currentDateTime.getTime() + 30*24*3600*1000);

      await userRepository.save(user);
      return {
        username: user.username, 
        uid: user.uid,
        accessToken: jwtSign({token: user.accessToken.token}),
        user: {
          username: user.username,
          dailyCalorieGoal: user.dailyCalorieGoal,
          role: user.role
        }
      };
    } else {
      return Boom.badData("User and/or password is not correct.");
    }
  } else {
    return Boom.badData("User and/or password is not correct.");
  }
};

const jwtSign = (payload: any) => {
  return jwt.sign(payload, "NeverShareYourSecret", { expiresIn: 30*24*3600 });
};