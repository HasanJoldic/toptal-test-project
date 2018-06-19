import * as ctrl from "../controllers/meal";

const routes = [
  {
    method: "GET",
    path: "/api/v1/user/{username}/meal/{mealUid}",
    handler: ctrl.getMeal,
    options: {
      description: "get all meals from user",
      auth: {
        access: {
          scope: ["admin", "user_{params.username}"]
        }
      }
    }
  },
  {
    method: "POST",
    path: "/api/v1/user/{username}/meal",
    handler: ctrl.postMeal,
    options: {
      description: "add a new meal",
      auth: {
        access: {
          scope: ["admin", "user_{params.username}"]
        }
      }
    }
  },
  {
    method: "PUT",
    path: "/api/v1/user/{username}/meal/{mealUid}",
    handler: ctrl.putMeal,
    options: {
      description: "update a meal",
      auth: {
        access: {
          scope: ["admin", "user_{params.username}"]
        }
      }
    }
  },
  {
    method: "DELETE",
    path: "/api/v1/user/{username}/meal/{mealUid}",
    handler: ctrl.deleteMeal,
    options: {
      description: "delete a meal",
      auth: {
        access: {
          scope: ["admin", "user_{params.username}"]
        }
      }
    }
  },
  {
    method: "GET",
    path: "/api/v1/user/{username}/meals",
    handler: ctrl.getMeals,
    options: {
      description: "get all meals from user",
      auth: {
        access: {
          scope: ["admin", "user_{params.username}"]
        }
      }
    }
  },
];

export default routes;