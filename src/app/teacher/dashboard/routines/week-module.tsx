import localizer from "@/src/components/calander";
import { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";

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

const getDayDate = (day: string, time: string): Date => {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const currentWeekday = today.getDay();
  const targetWeekday = weekDays.indexOf(day);

  let diff = targetWeekday - currentWeekday;
  if (diff < 0) {
    diff += 7; // Always move to the NEXT occurrence of the day
  }

  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + diff);

  const [hours, minutes] = time.split(":").map(Number);
  targetDate.setHours(hours);
  targetDate.setMinutes(minutes);
  targetDate.setSeconds(0);
  targetDate.setMilliseconds(0);

  return targetDate;
};

export default function WeeklyRoutineCalendar({
  routines,
}: {
  routines: RoutineItem[];
}) {
  // Convert your API data to calendar event format
  const events = routines?.map((item) => {
    const start = getDayDate(item.day, item.time);
    const end = new Date(start.getTime() + 2.5 * 60 * 60000); // Assuming each class is 2.5 hr

    return {
      title: `${item.subject} - ${item.teacher_name}`,
      start,
      end,
    };
  });

  return (
    <div className="container h-full w-full">
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        views={["week"]}
        step={30}
        timeslots={2}
        defaultDate={new Date()}
        style={{ height: "100%" }}
      />
    </div>
  );
}
