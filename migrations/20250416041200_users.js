exports.up = async function (knex) {
    await knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.enum('role', ['teacher', 'student', 'admin']).notNullable();
      table.timestamps(true, true);
    });
  
    await knex.schema.createTable('teachers', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('subject').notNullable();
    });
  
    await knex.schema.createTable('students', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('grade').notNullable();
      table.string('section').nullable();
    });
  
    await knex.schema.createTable('admin', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    });
  };
  
  exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('admin');
    await knex.schema.dropTableIfExists('students');
    await knex.schema.dropTableIfExists('teachers');
    await knex.schema.dropTableIfExists('users');
  };
  