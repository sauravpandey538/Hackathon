import db from "@/src/lib/db";

(async () => {
  const modules = await db("modules").where("faculty", "BCS").update({
    faculty: "BCA",
  });
  console.log(modules);
})();
