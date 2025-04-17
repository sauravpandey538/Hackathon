/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("modules", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("faculty").notNullable();
    table.string("semester").notNullable();
  });

  await knex("modules").insert([
    { name: "Engineering Mathematics-I", faculty: "BIT", semester: "1" },
    { name: "Applied Physics", faculty: "BIT", semester: "1" },
    { name: "Programming Fundamentals", faculty: "BIT", semester: "1" },
    { name: "Engineering Mathematics-II", faculty: "BIT", semester: "2" },
    { name: "Digital Logic Design", faculty: "BIT", semester: "2" },
    { name: "Object-Oriented Programming", faculty: "BIT", semester: "2" },
    { name: "Data Structures", faculty: "BIT", semester: "3" },
    { name: "DBMS", faculty: "BIT", semester: "3" },
    { name: "Operating Systems", faculty: "BIT", semester: "3" },
    { name: "Computer Networks", faculty: "BIT", semester: "4" },
    { name: "Web Technologies", faculty: "BIT", semester: "4" },
    { name: "Software Engineering", faculty: "BIT", semester: "4" },
    { name: "Design & Analysis of Algorithms", faculty: "BIT", semester: "5" },
    { name: "Mobile App Development", faculty: "BIT", semester: "5" },
    { name: "Computer Architecture", faculty: "BIT", semester: "5" },
    { name: "Machine Learning", faculty: "BIT", semester: "6" },
    { name: "Artificial Intelligence", faculty: "BIT", semester: "6" },
    { name: "Big Data Analytics", faculty: "BIT", semester: "6" },
    { name: "Cloud Computing", faculty: "BIT", semester: "7" },
    { name: "IoT Systems", faculty: "BIT", semester: "7" },
    { name: "Blockchain Technology", faculty: "BIT", semester: "7" },
    { name: "Cyber Security", faculty: "BIT", semester: "8" },
    { name: "Advanced Web Frameworks", faculty: "BIT", semester: "8" },
    { name: "Capstone Project", faculty: "BIT", semester: "8" },

    { name: "Introduction to Computing", faculty: "BCA", semester: "1" },
    { name: "Discrete Mathematics", faculty: "BCA", semester: "1" },
    { name: "Fundamentals of Programming", faculty: "BCA", semester: "1" },
    { name: "Communication Skills", faculty: "BCA", semester: "1" },
    { name: "Data Structures", faculty: "BCA", semester: "2" },
    {
      name: "Digital Logic & Computer Organization",
      faculty: "BCA",
      semester: "2",
    },
    { name: "Object-Oriented Programming", faculty: "BCA", semester: "2" },
    { name: "Probability & Statistics", faculty: "BCA", semester: "2" },
    { name: "Operating Systems", faculty: "BCA", semester: "3" },
    { name: "Database Management Systems", faculty: "BCA", semester: "3" },
    { name: "Software Engineering", faculty: "BCA", semester: "3" },
    { name: "Computer Networks", faculty: "BCA", semester: "3" },
    { name: "Web Development", faculty: "BCA", semester: "4" },
    { name: "Theory of Computation", faculty: "BCA", semester: "4" },
    { name: "Java Programming", faculty: "BCA", semester: "4" },
    { name: "Data Communication", faculty: "BCA", semester: "4" },
    { name: "Mobile Application Development", faculty: "BCA", semester: "5" },
    { name: "Cloud Computing", faculty: "BCA", semester: "5" },
    { name: "Data Analytics", faculty: "BCA", semester: "5" },
    { name: "Design & Analysis of Algorithms", faculty: "BCA", semester: "5" },
    { name: "Artificial Intelligence", faculty: "BCA", semester: "6" },
    { name: "Human-Computer Interaction", faculty: "BCA", semester: "6" },
    { name: "Information Security", faculty: "BCA", semester: "6" },
    { name: "Research Methodology", faculty: "BCA", semester: "6" },
    { name: "Machine Learning", faculty: "BCA", semester: "7" },
    { name: "Blockchain Technology", faculty: "BCA", semester: "7" },
    { name: "Advanced Web Technologies", faculty: "BCA", semester: "7" },
    { name: "Elective I", faculty: "BCA", semester: "7" },
    { name: "Capstone Project", faculty: "BCA", semester: "8" },
    { name: "Cyber Laws & Ethics", faculty: "BCA", semester: "8" },
    { name: "Big Data", faculty: "BCA", semester: "8" },
    { name: "Elective II", faculty: "BCA", semester: "8" },

    { name: "Principles of Management", faculty: "BBS", semester: "1" },
    { name: "Business Mathematics", faculty: "BBS", semester: "1" },
    { name: "Microeconomics", faculty: "BBS", semester: "1" },
    { name: "English Communication", faculty: "BBS", semester: "1" },
    { name: "Financial Accounting", faculty: "BBS", semester: "2" },
    { name: "Business Statistics", faculty: "BBS", semester: "2" },
    { name: "Macroeconomics", faculty: "BBS", semester: "2" },
    { name: "Business Environment", faculty: "BBS", semester: "2" },
    { name: "Marketing Management", faculty: "BBS", semester: "3" },
    { name: "Business Law", faculty: "BBS", semester: "3" },
    { name: "Organizational Behavior", faculty: "BBS", semester: "3" },
    { name: "Cost Accounting", faculty: "BBS", semester: "3" },
    { name: "Human Resource Management", faculty: "BBS", semester: "4" },
    { name: "Financial Management", faculty: "BBS", semester: "4" },
    { name: "Entrepreneurship", faculty: "BBS", semester: "4" },
    { name: "E-Commerce", faculty: "BBS", semester: "4" },
    { name: "Strategic Management", faculty: "BBS", semester: "5" },
    { name: "Research Methodology", faculty: "BBS", semester: "5" },
    { name: "Consumer Behavior", faculty: "BBS", semester: "5" },
    { name: "Management Information Systems", faculty: "BBS", semester: "5" },
    { name: "Investment Analysis", faculty: "BBS", semester: "6" },
    { name: "International Business", faculty: "BBS", semester: "6" },
    { name: "Operations Management", faculty: "BBS", semester: "6" },
    { name: "Leadership and Ethics", faculty: "BBS", semester: "6" },
    { name: "Project Management", faculty: "BBS", semester: "7" },
    { name: "Brand Management", faculty: "BBS", semester: "7" },
    { name: "Elective I", faculty: "BBS", semester: "7" },
    { name: "Supply Chain Management", faculty: "BBS", semester: "7" },
    {
      name: "Final Year Project / Dissertation",
      faculty: "BBS",
      semester: "8",
    },
    { name: "Elective II", faculty: "BBS", semester: "8" },
    { name: "Business Policy & Strategy", faculty: "BBS", semester: "8" },
    { name: "Internship / Viva", faculty: "BBS", semester: "8" },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("modules");
};
