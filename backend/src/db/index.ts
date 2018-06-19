import {createConnection, Connection} from "typeorm";

const { SQL_USER, SQL_PASSWORD, SQL_HOST, SQL_DATABASE } = process.env;

createConnection({
  type: "mysql",
  host: SQL_HOST,
  username: SQL_USER,
  password: SQL_PASSWORD,
  database: SQL_DATABASE,
  logging: true,
  synchronize: process.env.NODE_ENV === "test" || process.env.NODE_ENV === "dev",
  dropSchema: process.env.NODE_ENV === "test",
  entities: [
    "build/db/entities/**/*.js"
  ]
}).then(_connection => {
  console.log("Connection established.")
}).catch(error => console.log(error));