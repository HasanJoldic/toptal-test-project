import Hapi from "hapi";
import { getConnection } from "typeorm";
import Boom from "boom";
const uuidv4 = require("uuid/v4");

import { User } from "../../db/entities/User";
import { Meal } from "../../db/entities/Meal";

export const getMeal = async (request: Hapi.Request, reply: any) => {

  const mealRepository = getConnection().getRepository(Meal);
  const meal = await mealRepository.findOne({uid: request.params.mealUid});

  if(!meal) return Boom.badData("Meal doesn't exist.");
  
  return {
    meal
  };
};

export const postMeal = async (request: Hapi.Request, reply: any) => {
  const { name, calories, createdAt }: any = request.payload;

  const userRepository = getConnection().getRepository(User);
  console.log(request.params);
  const user = await userRepository.findOne({username: request.params.username });

  if(!user) return Boom.badData("User doesn't exist.")

  const meal = new Meal();
  meal.name = name;
  meal.calories = calories;
  meal.createdAt = new Date(createdAt);
  meal.uid = uuidv4();
  meal.user = user;

  const mealRepository = getConnection().getRepository(Meal);

  return mealRepository.save(meal).then(() => {
    return "Successfully added a meal.";
  }).catch((error:any) => {
    return Boom.conflict("Error has occured while adding a meal.");
  });  
};

export const putMeal = async (request: Hapi.Request, reply: any) => {
  const { name, calories, createdAt }: any = request.payload;

  const mealRepository = getConnection().getRepository(Meal);
  const meal = await mealRepository.findOne({uid: request.params.mealUid});

  if(!meal) return Boom.badData("Meal doesn't exist.");
  meal.name = name;
  meal.calories = calories;
  meal.createdAt = new Date(createdAt);

  return mealRepository.save(meal).then(() => {
    return "Successfully updated meal.";
  }).catch((error:any) => {
    return Boom.conflict("Error has occured while updating a meal.");
  });  
};

export const deleteMeal = async (request: Hapi.Request, reply: any) => {
  const mealRepository = getConnection().getRepository(Meal);
  const meal = await mealRepository.findOne({uid: request.params.mealUid});

  if(!meal) return Boom.badData("Meal doesn't exist.");

  return mealRepository.remove(meal).then(() => {
    return "Successfully deleted meal.";
  }).catch((error:any) => {
    return Boom.conflict("Error has occured while deleting a meal.");
  });  
};

export const getMeals = async (request: Hapi.Request, reply: any) => {

  const userRepository = getConnection().getRepository(User);
  const user = await userRepository.findOne({
    where: {
      username: request.params.username
    },
    relations: ["meals"]
  });

  if (!user) return Boom.badData("User doesn't exist.");

  return {
    meals: user.meals
  };
};
