"use client";

import WeeklyRoutineCalendar from "./week-module";
import { Skeleton } from "@/src/components/ui/skeleton";
import { fetchApi } from "@/src/lib/api";
import React, { useEffect, useState } from "react";

interface RoutineItem {
  id: number;
  day: string;
  time: string;
  teacher_id: number;
  teacher_name?: string;
  subject?: string;
  semister: string;
  faculty: string;
}

function TeacherRoutinesPage() {
  const [routines, setRoutines] = useState<RoutineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTeacherRoutines = async () => {
    try {
      setIsLoading(true);
      const response = await fetchApi("/api/routines/get-teachers-routine", {
        method: "GET",
        credentials: "include",
      });
      if (response.success && Array.isArray(response.data)) {
        setRoutines(response.data as RoutineItem[]);
      }
    } catch (error) {
      console.error("Error fetching routines:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacherRoutines();
  }, []);

  if (isLoading) {
    return (
      <div className="container w-full space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  return (
    <div className="container w-full">
      {JSON.stringify(routines)}
      {/* <WeeklyRoutineCalendar routines={routines || []} /> */}
    </div>
  );
}

export default TeacherRoutinesPage;
