import db from "@/src/lib/db";

(async () => {
  const modules = await db("modules").where("faculty", "BCA").update({
    faculty: "BCA",
  });
  console.log(modules);
})();
