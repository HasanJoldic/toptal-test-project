import * as ctrl from "../controllers/user";

const routes = [
  {
    method: "GET",
    path: "/api/v1/user/{username}",
    handler: ctrl.getUser,
    options: {
      auth: {
        access: {
          scope: ["manager", "admin", "user_{params.username}"]
        }
      },
      description: "get single users"
    }
  },
  {
    method: "POST",
    path: "/api/v1/user",
    handler: ctrl.postUser,
    options: {
      auth: {
        access: {
          scope: ["manager", "admin"]
        }
      },
      description: "create a new user"
    }
  },
  {
    method: "PUT",
    path: "/api/v1/user/{username}",
    handler: ctrl.putUser,
    options: {
      auth: {
        access: {
          scope: ["manager", "admin", "user_{params.username}"]
        }
      },
      description: "update a user"
    }
  },
  {
    method: "DELETE",
    path: "/api/v1/user/{username}",
    handler: ctrl.deleteUser,
    options: {
      auth: {
        access: {
          scope: ["manager", "admin", "user_{params.username}"]
        }
      },
      description: "delete a user"
    }
  },
  {
    method: "GET",
    path: "/api/v1/users",
    handler: ctrl.getUsers,
    options: {
      auth: {
        access: {
          scope: ["manager", "admin"]
        }
      },
      description: "get all users"
    }
  }
];

export default routes;