/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("teacher_routines").del();
  await knex("teachers").del();
  await knex("students").del();
  await knex("users").del();

  // Insert Users
  const users = await knex("users")
    .insert([
      // Teachers
      {
        name: "Alice Sharma",
        email: "alice@bit.edu",
        password: "password123",
        role: "teacher",
      },
      {
        name: "Bishal Singh",
        email: "bishal@BCA.edu",
        password: "password123",
        role: "teacher",
      },
      {
        name: "Chitra Pandey",
        email: "chitra@bbs.edu",
        password: "password123",
        role: "teacher",
      },
      {
        name: "David Rai",
        email: "david@bit.edu",
        password: "password123",
        role: "teacher",
      },
      {
        name: "Eva Koirala",
        email: "eva@BCA.edu",
        password: "password123",
        role: "teacher",
      },
      {
        name: "Faisal Gurung",
        email: "faisal@bbs.edu",
        password: "password123",
        role: "teacher",
      },

      // Students
      {
        name: "Deepak Thapa",
        email: "deepak@bit.com",
        password: "password123",
        role: "student",
      },
      {
        name: "Elina Joshi",
        email: "elina@bit.com",
        password: "password123",
        role: "student",
      },
      {
        name: "Firoj Rai",
        email: "firoj@BCA.com",
        password: "password123",
        role: "student",
      },
      {
        name: "Gita Kumari",
        email: "gita@BCA.com",
        password: "password123",
        role: "student",
      },
      {
        name: "Hari Neupane",
        email: "hari@bbs.com",
        password: "password123",
        role: "student",
      },
      {
        name: "Isha Lamicchane",
        email: "isha@bbs.com",
        password: "password123",
        role: "student",
      },

      // Admin
      {
        name: "Jitendra Karki",
        email: "admin@system.com",
        password: "admin123",
        role: "admin",
      },
    ])
    .returning(["id", "email"]);

  // Helper to find user_id by email
  const findUser = (email) => {
    const user = users.find((u) => u.email === email);
    return user ? user.id : null;
  };

  // Insert Teachers and Map their IDs
  const teachersData = [
    {
      faculty: "BIT",
      subject: "Programming Fundamentals",
      user_id: findUser("alice@bit.edu"),
    },
    {
      faculty: "BCA",
      subject: "Database Management Systems",
      user_id: findUser("bishal@BCA.edu"),
    },
    {
      faculty: "BBS",
      subject: "Business Statistics",
      user_id: findUser("chitra@bbs.edu"),
    },
    {
      faculty: "BIT",
      subject: "Data Structures",
      user_id: findUser("david@bit.edu"),
    },
    {
      faculty: "BCA",
      subject: "Software Engineering",
      user_id: findUser("eva@BCA.edu"),
    },
    {
      faculty: "BBS",
      subject: "Marketing",
      user_id: findUser("faisal@bbs.edu"),
    },
  ];

  const insertedTeachers = await knex("teachers")
    .insert(teachersData)
    .returning("id");

  // Check for missing user IDs
  if (insertedTeachers.length !== teachersData.length) {
    throw new Error(
      "Teacher insertion failed, some user IDs might be missing."
    );
  }

  // Now that we have teachers, let's proceed with inserting routines
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const shifts = ["06:30", "08:30"];
  const faculties = ["BIT", "BCA", "BBS"];
  const sections = ["A", "B", "C"];
  const semisters = ["1", "2", "2"];

  const t = insertedTeachers; // Use the returned teachers' IDs
  const routines = [];

  let teacherIndex = 0;

  for (const day of days) {
    for (let i = 0; i < faculties.length; i++) {
      for (const time of shifts) {
        routines.push({
          day,
          time,
          section: sections[i],
          teacher_id: t[teacherIndex].id, // Use the mapped teacher id
          faculty: faculties[i],
          semister: semisters[i],
        });
        teacherIndex++;
        if (teacherIndex === insertedTeachers.length) {
          teacherIndex = 0; // Loop over the teachers again if necessary
        }
      }
    }
  }

  await knex("teacher_routines").insert(routines);

  // Insert Students (same as before)
  const studentsData = [
    {
      user_id: findUser("deepak@bit.com"),
      name: "Deepak Thapa",
      email: "deepak@bit.com",
      address: "Kathmandu",
      phone_number: "9800000001",
      faculty: "BIT",
      semester: 1,
      section: "A",
      joined_at: "2023-08-01",
      graduate_at: null,
    },
    {
      user_id: findUser("elina@bit.com"),
      name: "Elina Joshi",
      email: "elina@bit.com",
      address: "Pokhara",
      phone_number: "9800000002",
      faculty: "BIT",
      semester: 3,
      section: "B",
      joined_at: "2022-08-01",
      graduate_at: null,
    },
    {
      user_id: findUser("firoj@BCA.com"),
      name: "Firoj Rai",
      email: "firoj@BCA.com",
      address: "Lalitpur",
      phone_number: "9800000003",
      faculty: "BCA",
      semester: 2,
      section: "A",
      joined_at: "2023-08-01",
      graduate_at: null,
    },
    {
      user_id: findUser("gita@BCA.com"),
      name: "Gita Kumari",
      email: "gita@BCA.com",
      address: "Bhaktapur",
      phone_number: "9800000004",
      faculty: "BCA",
      semester: 4,
      section: "B",
      joined_at: "2022-08-01",
      graduate_at: null,
    },
    {
      user_id: findUser("hari@bbs.com"),
      name: "Hari Neupane",
      email: "hari@bbs.com",
      address: "Chitwan",
      phone_number: "9800000005",
      faculty: "BBS",
      semester: 2,
      section: "C",
      joined_at: "2023-08-01",
      graduate_at: null,
    },
    {
      user_id: findUser("isha@bbs.com"),
      name: "Isha Lamicchane",
      email: "isha@bbs.com",
      address: "Dharan",
      phone_number: "9800000006",
      faculty: "BBS",
      semester: 4,
      section: "D",
      joined_at: "2022-08-01",
      graduate_at: null,
    },
  ];

  // Ensure all user ids are correctly found
  if (studentsData.some((student) => student.user_id === null)) {
    throw new Error("One or more students have invalid user IDs");
  }

  await knex("students").insert(studentsData);
};
