"use client";

import SingleModule from "./single-module";
import { Skeleton } from "@/src/components/ui/skeleton";
import { ApiResponse, fetchApi } from "@/src/lib/api";
import React, { useEffect, useState } from "react";

interface Module {
  id: number;
  moduleName: string;
  teacher_name: string;
  faculty: string;
  semester: number;
  teacher_phone: string;
}

const StudentDashboard = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchModules = async () => {
    const response = await fetchApi("/api/modules", {
      method: "GET",
      credentials: "include",
    });
    if (response.success && response.data) {
      setModules(response.data as Module[]);
    }
  };

  useEffect(() => {
    fetchModules();
    setLoading(false);
  }, []);

  return (
    <main className="min-h-screen bg-background  px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Modules</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  mx-auto">
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="h-[350px] w-[400px] rounded-xl bg-zinc-800"
              />
            ))
          : modules.map((mod) => (
              <SingleModule
                key={mod.id}
                faculty={mod.faculty}
                semester={mod.semester}
                moduleName={mod.moduleName}
                teacherName={mod.teacher_name}
                teacherPhone={mod.teacher_phone}
              />
            ))}
      </div>
    </main>
  );
};

export default StudentDashboard;
