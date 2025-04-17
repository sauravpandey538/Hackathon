"use client";

import ModuleForm from "./module-form";
import ModuleList from "./module-list";

export default function ModulesPage() {
  const handleFilter = (faculty: string | null, semester: string | null) => {
    // This function is passed to ModuleList but not used directly
    // as the filtering is handled within the ModuleList component
    console.log("Filter:", { faculty, semester });
  };

  const handleModuleAdded = () => {
    // This function is called when a new module is added
    // The ModuleList component will automatically refresh
    console.log("Module added successfully");
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Module Management</h1>
        <ModuleForm onSuccess={handleModuleAdded} />
      </div>
      <ModuleList onFilter={handleFilter} />
    </div>
  );
}
