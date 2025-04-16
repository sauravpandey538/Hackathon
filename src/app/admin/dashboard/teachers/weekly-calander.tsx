import localizer from "@/src/components/calander";
import { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";

const rawData = [
  {
    day: "Thursday",
    time: "12:12",
    subject: "Math",
    teacher_name: "Teacher 1",
  },
  {
    day: "Friday",
    time: "12:12",
    subject: "Math",
    teacher_name: "Teacher 1",
  },
];

// Utility to get date of this week's specific day
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

  const diff = targetWeekday - currentWeekday;
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + diff);

  // Set time (HH:mm)
  const [hours, minutes] = time.split(":").map(Number);
  targetDate.setHours(hours);
  targetDate.setMinutes(minutes);
  targetDate.setSeconds(0);

  return targetDate;
};

// Convert your API data to calendar event format
const events = rawData.map((item) => {
  const start = getDayDate(item.day, item.time);
  const end = new Date(start.getTime() + 2.5 * 60 * 60000); // Assuming each class is 2.5 hr

  return {
    title: `${item.subject} - ${item.teacher_name}`,
    start,
    end,
  };
});
export default function WeeklyRoutineCalendar() {
  //   const [events, setEvents] = useState<any[]>([]);
  //   const getEvents = async () => {
  //     const response = await fetch("/api/teachers?faculty=BBS?");
  //     const data = await response.json();

  //     setEvents(data);
  //   };
  //   useEffect(() => {
  //     getEvents();
  //   }, []);
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
