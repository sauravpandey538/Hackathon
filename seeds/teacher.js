import { Knex } from "knex";

export async function seed(knex) {
  await knex("teacher_routines").del();

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const shifts = ["06:30", "08:30"];
  const faculties = ["BIT", "BCA", "BBS"];
  const sections = ["A", "B", "C"];
  const semisters = ["1", "2", "2"];

  const teacherData = await knex("teachers").select("id");
  const routines = [];

  let teacherIndex = 0;

  for (const day of days) {
    for (let i = 0; i < faculties.length; i++) {
      for (const time of shifts) {
        routines.push({
          day,
          time,
          section: sections[i],
          teacher_id: teacherData[teacherIndex].id,
          faculty: faculties[i],
          semister: semisters[i],
        });
        teacherIndex++;
      }
    }
  }

  await knex("teacher_routines").insert(routines);
}
