import Hapi from "hapi";
import bcrypt from "bcrypt";
import { getConnection } from "typeorm";
import "reflect-metadata";

import routes from "./routes/routes";
import "../db/index";
import { AccessToken } from "../db/entities/AccessToken";

const server = new Hapi.Server({
  host: "192.168.33.10",
  port: 3000,
  routes: {cors: true}
});

const validate = async function (decoded:any, request:any) {

  const accessTokenRepository = getConnection().getRepository(AccessToken);

  const accessToken:any = await accessTokenRepository.findOne({
    where: {
      token: decoded.token
    },
    relations: ["user"]
  });
  if (!accessToken || !accessToken.user) {
      return { credentials: null, isValid: false };
  }
  const { user } = accessToken;
  const scope = user.role === "user" ? "user_" + user.username : user.role;
  const credentials = { id: user.id, uid: user.uid, scope };
  return { 
    credentials,
    isValid: true 
  };
};

server.register(require("hapi-auth-jwt2")).then(() => {
  server.auth.strategy("jwt", "jwt", {
    key: "NeverShareYourSecret",          // Never Share your secret key
    validate: validate,            // validate function defined above
    verifyOptions: { algorithms: [ "HS256" ] } // pick a strong algorithm
  });

  server.auth.default("jwt");

  (server.register as any)({
    plugin: require("good"), 
    options: {
      reporters: {
        console: [{
          module: "good-squeeze",
          name: "Squeeze",
          args: [{
            log: "*",
            response: "*"
          }]
        }, {
          module: "good-console"
        }, "stdout"]
      }
    }
  }).then(() => {
    server.route(routes);
    server.start();
  });

});



export default server;