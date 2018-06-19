const { Client } = require("pg");

(async () => {
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD
})

await client.connect();

/*
await client.query("CREATE TABLE Users (" +
	     "id SERIAL PRIMARY KEY, " +
             "username VARCHAR(64) UNIQUE NOT NULL, " +
             "password VARCHAR(255) NOT NULL, " +
             "created_on TIMESTAMP NOT NULL, " +
             "role VARCHAR(10) NOT NULL);", (err, res) => {
  console.log(err, res);
});
*/

await client.query("CREATE TABLE Meals (" +
      	           "id SERIAL PRIMARY KEY, " +
                   "name VARCHAR(128) NOT NULL, " +
                   "calories SMALLINT NOT NULL, " +
                   "created_on TIMESTAMP NOT NULL);", (err, res) => {
  console.log(err, res);
});

await client.end();
})();
