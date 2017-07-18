const pg = require("pg");
const settings = require("./settings");

const args = process.argv.slice(2);
const firstName = args[0];
const surName = args[1];
const birthDate = args[2];

const person = [{
  first_name: firstName,
  last_name: surName,
  birthdate: birthDate
}]

const knex = require('knex')({
  client: 'postgres',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

knex('famous_people')
    .insert(person).then(function(result, err){
      if (err){
        console.log(err);
      } else{
        console.log(`Insert successful: ${result}`);
        knex.destroy();
      }
    });