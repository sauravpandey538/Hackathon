// migrations/20240417120000_create_notifications_table.js

exports.up = async function (knex) {
  await knex.schema.createTable("notifications", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("message").notNullable();
    table.string("role").notNullable(); // 'teacher' or 'student'
    table.timestamp("sent_at").defaultTo(knex.fn.now());
    table.timestamps(true, true); // created_at and updated_at
  });
  // await knex("notifications").insert([
  //   {
  //     title: "Welcome to the Portal!",
  //     message: "This is your first notification from the admin.",
  //     role: "student",
  //   },
  //   {
  //     title: "Exam Schedule",
  //     message: "The mid-term exam schedule has been uploaded.",
  //     role: "student",
  //   },
  //   {
  //     title: "Holiday Notice",
  //     message: "The college will remain closed on Friday due to maintenance.",
  //     role: "teacher",
  //   },
  //   {
  //     title: "Holiday Notice",
  //     message: "The college will remain closed on Friday due to maintenance.",
  //     role: "teacher",
  //   },
  // ]);
};

exports.down = function (knex) {
  return knex.schema.dropTable("notifications");
};
