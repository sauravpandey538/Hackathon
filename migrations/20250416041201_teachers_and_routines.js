exports.up = async function (knex) {
  await knex.schema.createTable('teachers', (table) => {
    table.increments('id').primary();
    table.enum('faculty', ['BCS', 'BIT', 'BBS']).notNullable();
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.string('subject').notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('teacher_routines', (table) => {
    table.increments('id').primary();
    table.string('day').notNullable();
    table.string('time').notNullable();
    table.string('section').notNullable();
    table.integer('teacher_id').unsigned().references('id').inTable('teachers').onDelete('CASCADE');
    table.timestamps(true, true);

  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('teacher_routines');
  await knex.schema.dropTableIfExists('teachers');
};
