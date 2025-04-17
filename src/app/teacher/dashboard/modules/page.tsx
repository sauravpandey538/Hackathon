"use client";

import SingleModule from "./single-module";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Skeleton } from "@/src/components/ui/skeleton";
import { fetchApi } from "@/src/lib/api";
import { Ban } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Module {
  id: number;
  imageUrl: string;
  moduleName: string;
  teacherName: string;
}

const faculties = [
  { value: "all", label: "All Faculties" },
  { value: "BIT", label: "Bachelor of Information Technology" },
  { value: "BBS", label: "Bachelor of Business Studies" },
  { value: "BCA", label: "Bachelor of Computer Application" },
];

const StudentDashboard = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(false);
  const [faculty, setFaculty] = useState("all");

  // For select input only (temporary state)
  const [selectedFaculty, setSelectedFaculty] = useState("all");

  const fetchModules = async (selectedFaculty: string) => {
    setLoading(true);
    const query =
      selectedFaculty === "all" ? "" : `?faculty=${selectedFaculty}`;
    const response = await fetchApi(`/api/teachers/modules${query}`, {
      method: "GET",
      credentials: "include",
    });

    if (response.success && response.data) {
      setModules(response.data as Module[]);
    } else {
      setModules([]);
    }

    setLoading(false);
  };

  // Load all modules by default once (optional)
  useEffect(() => {
    fetchModules("all");
  }, []);

  return (
    <main className="container bg-background px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-left">Available Modules</h1>

      {/* Faculty Filter */}
      {/* Hide this section by commenting or controlling via prop/condition */}
      <div className="w-full max-w-md flex flex-col sm:flex-row items-center gap-4 mb-8">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium mb-1">Faculty</label>
          <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Faculty" />
            </SelectTrigger>
            <SelectContent>
              {faculties.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          className="mt-1 sm:mt-6 w-full sm:w-auto"
          onClick={() => {
            setFaculty(selectedFaculty);
            fetchModules(selectedFaculty);
          }}
        >
          Filter
        </Button>
      </div>

      {/* Modules Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton
              key={idx}
              className="h-[350px] w-full rounded-xl bg-muted"
            />
          ))}
        </div>
      ) : modules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <SingleModule
              key={mod.id}
              moduleName={mod.moduleName}
              faculty={faculty}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-center text-muted-foreground">
          <Ban className="w-16 h-16 mb-4 text-zinc-500" />
          <p className="text-lg font-semibold">
            No modules are assigned to you for this faculty.
          </p>
        </div>
      )}
    </main>
  );
};

export default StudentDashboard;
