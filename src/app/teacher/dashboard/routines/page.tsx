"use client";

import WeeklyRoutineCalendar from "./week-module";
import { fetchApi } from "@/src/lib/api";
import React, { useEffect, useState } from "react";

function page() {
  const [routine, setRoutine] = useState<any>(null);
  const fetchNextRoutine = async () => {
    const response = await fetchApi("/api/routines/get-teachers-routine", {
      method: "GET",
      credentials: "include",
    });
    if (response.success && response.data) {
      setRoutine(response.data);
    }
  };
  useEffect(() => {
    fetchNextRoutine();
  }, []);

  return (
    <div className="container w-full">
      <WeeklyRoutineCalendar routines={routine} />
    </div>
  );
}

export default page;
