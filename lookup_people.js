const pg = require("pg");
const settings = require("./settings");

const args = process.argv.slice(2);
// Must be an array
const lookupName = [args[0]];
const queryText = "SELECT * FROM famous_people WHERE last_name = ($1) OR first_name = ($1)";

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(queryText, lookupName, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows);
    client.end();
  });
});