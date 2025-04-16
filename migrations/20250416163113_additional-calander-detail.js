/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("teacher_routines", (table) => {
    table.string("faculty").nullable();
    table.string("semister").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("teacher_routines", (table) => {
    table.dropColumn("faculty");
    table.dropColumn("semister");
  });
};
