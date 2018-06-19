import Hapi from "hapi";
import { getConnection } from "typeorm";
import Boom from "boom";
const uuidv4 = require("uuid/v4");
import bcrypt from "bcrypt";
const saltRounds = 10;

import { User } from "../../db/entities/User";
import { AccessToken } from "../../db/entities/AccessToken";

export const getUser = async (request: Hapi.Request, reply: any) => {
  const userRepository = getConnection().getRepository(User);
  const user = await userRepository.findOne({username: request.params.username});

  if(!user) return Boom.badData("User doesn't exist.");
  
  return {
    user: {
      username: user.username,
      dailyCalorieGoal: user.dailyCalorieGoal,
      role: user.role,
      uid: user.uid
    }
  };
}

export const postUser = async (request: Hapi.Request, reply: any) => {
  let { username, password, dailyCalorieGoal, role = "user" }: any = request.payload;

  dailyCalorieGoal = dailyCalorieGoal || null;

  const hash = await bcrypt.hash(password, saltRounds);
  
  const currentDateTime = new Date();

  const user = new User();
  user.username = username;
  user.role = role;
  user.password = hash;
  user.dailyCalorieGoal = dailyCalorieGoal;
  user.uid = uuidv4();
  user.createdAt = new Date();

  const accessToken = new AccessToken();
  accessToken.token = uuidv4();
  accessToken.createdAt = currentDateTime;
  accessToken.validUntil = new Date(currentDateTime.getTime() + 30*24*3600*1000);

  user.accessToken = accessToken;

  if (!isWithinScope((request.auth.credentials as any).scope, user)) return Boom.unauthorized();

  const userRepository = getConnection().getRepository(User);
  return userRepository.save(user).then(() => {
    return user;
  }).catch((error:any) => {
    return Boom.conflict("Username is taken.");
  });  
};

export const putUser = async (request: Hapi.Request, reply: any) => {
  let { username, dailyCalorieGoal }: any = request.payload;
  dailyCalorieGoal = dailyCalorieGoal || null;

  const userRepository = getConnection().getRepository(User);
  const user = await userRepository.findOne({username: request.params.username});

  if(!user) return Boom.badData("User doesn't exist.");

  user.username = username;
  user.dailyCalorieGoal = dailyCalorieGoal;

  if (!isWithinScope((request.auth.credentials as any).scope, user)) return Boom.unauthorized();

  return userRepository.save(user).then(() => {
    return {
      user: {
        username: user.username,
        dailyCalorieGoal: user.dailyCalorieGoal,
        role: user.role
      }
    };
  }).catch((error:any) => {
    return Boom.conflict("There was an error updating a user.");
  }); 
};

export const deleteUser = async (request: Hapi.Request, reply: any) => {
  const userRepository = getConnection().getRepository(User);
  const user = await userRepository.findOne({username: request.params.username});

  if(!user) return Boom.badData("User doesn't exist.");

  if (!isWithinScope((request.auth.credentials as any).scope, user)) return Boom.unauthorized();

  return userRepository.remove(user).then(() => {
    return `User with username ${user.username} is successfuly deleted.`;
  }).catch((error:any) => {
    return Boom.conflict("There was an error deleting a user.");
  });  
};

export const getUsers = async (request: Hapi.Request, reply: any) => {
  const userRepository = getConnection().getRepository(User);
  let users;
  
  if ((request.auth.credentials as any).scope === "manager") {
    users = await userRepository.createQueryBuilder("user")
      .where("user.role = 'user'")
      .orWhere(`id = '${(request.auth.credentials as any).id}'`)
      .getMany();
  } else {
    users = await userRepository.find();
  }

  return users.map(user => {
    return {
      username: user.username,
      dailyCalorieGoal: user.dailyCalorieGoal,
      role: user.role
    };
  });
};

const isWithinScope = (subjectScope: string, objectEntity: User) => {
  if (objectEntity.role === "admin" || objectEntity.role === "manager") {
    if (objectEntity.role === "admin") {
      return subjectScope === "admin";
    } else {
      return subjectScope === "admin" || subjectScope === "manager";
    }
  }
  
  return true;
};