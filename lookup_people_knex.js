const pg = require("pg");
const settings = require("./settings");

const args = process.argv.slice(2);
const lookupName = args[0];

const knex = require('knex')({
  client: 'postgres',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

knex.select('*').from('famous_people')
.where('last_name', lookupName)
.orWhere('first_name', lookupName)
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  console.log(rows);
  knex.destroy();
});

