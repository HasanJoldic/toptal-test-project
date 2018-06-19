const { Client } = require("pg");

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD
})

client.connect();

client.query("CREATE TABLE test3 (test varchar(255))", (err, res) => {
  console.log(err, res);
  client.end();
});
