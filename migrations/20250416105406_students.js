/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    // Create students table
    await knex.schema.createTable('students', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('name', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.text('address');
      table.string('phone_number', 20);
      table.string('faculty', 100).notNullable();
      table.integer('semester').notNullable();
      table.date('joined_at').notNullable();
      table.date('graduate_at');
      table.timestamps(true, true);
    });
  
    // Create indexes
    await knex.schema.raw('CREATE INDEX idx_students_faculty ON students(faculty)');
    await knex.schema.raw('CREATE INDEX idx_students_semester ON students(semester)');
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function(knex) {
    await knex.schema.dropTable('students');
  };
  