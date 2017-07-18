exports.up = function(knex, Promise) {
  return knex.schema.createTable('milestones', (table) => {
    table.increments();
    table.string('description');
    table.date('date_acheived');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('milestones');
};
