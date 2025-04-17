import localizer from "@/src/components/calander";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { EventComponent } from "@/src/components/eventComponent";
import { useState } from "react";

// important!

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

interface RoutineItem {
  id: number;
  day: string;
  time: string;
  section: string;
  teacher_id: number;
  teacher_name?: string;
  subject?: string;
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
  onEventDrop,
  onEventResize,
  onDeleteEvent,
}: {
  routines: RoutineItem[];
  onEventDrop: (args: any) => void;
  onEventResize: (args: any) => void;
  onDeleteEvent: (props: any) => void;
}) {
  const [currentView, setCurrentView] = useState<"week" | "day" | "month">(
    "week"
  );

  // Convert your API data to calendar event format
  const events = routines?.map((item) => {
    const start = getDayDate(item.day, item.time);
    const end = new Date(start.getTime() + 2.5 * 60 * 60000); // Assuming each class is 2.5 hr

    return {
      id: item.id,
      title: `${item.subject} - ${item.teacher_name}`,
      start,
      end,
    };
  });

  return (
    <div className="container h-full w-full">
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        onEventResize={(args) => onEventResize(args)}
        onEventDrop={(args) => onEventDrop(args)}
        resizable
        view={currentView} // ✅ controlled view
        onView={(view) => setCurrentView(view as "week" | "day" | "month")} // ✅ update view on user change
        step={30}
        timeslots={2}
        defaultDate={new Date()}
        style={{ height: "100%" }}
        components={{
          event: (props) => (
            <EventComponent
              event={props.event}
              onDelete={(props) => onDeleteEvent(props)}
            />
          ),
        }}
      />
    </div>
  );
}
