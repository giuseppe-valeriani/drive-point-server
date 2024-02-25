exports.up = function (knex) {
  return knex.schema.createTable("pupils", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("starting_date").notNullable();
    table.integer("intro_1").notNullable().defaultTo(0);
    table.integer("intro_2").notNullable().defaultTo(0);
    table.integer("intro_3").notNullable().defaultTo(0);
    table.integer("turn_left_1").notNullable().defaultTo(0);
    table.integer("turn_left_2").notNullable().defaultTo(0);
    table.integer("turn_right_1").notNullable().defaultTo(0);
    table.integer("turn_right_2").notNullable().defaultTo(0);
    table.integer("hill_starts_1").notNullable().defaultTo(0);
    table.integer("hill_starts_2").notNullable().defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("pupils");
};
