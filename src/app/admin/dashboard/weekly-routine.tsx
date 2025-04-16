import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";

interface Teacher {
  id: number;
  name: string;
  subject: string;
}

interface RoutineItem {
  id: number;
  day: string;
  time: string;
  section: string;
  teacher_id: number;
  teacher_name?: string;
  subject?: string;
}

interface WeeklyRoutineProps {
  teachers: Teacher[];
  routines: RoutineItem[];
  onAddRoutine: (routine: { day: string; time: string; section: string; teacherId: number }) => void;
  onRemoveRoutine: (id: number) => void;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SECTIONS = ["A", "B", "C", "D"];
const TIME_SLOTS = ["8:00-9:00", "9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-1:00", "1:00-2:00", "2:00-3:00", "3:00-4:00"];

export function WeeklyRoutine({ teachers, routines, onAddRoutine, onRemoveRoutine }: WeeklyRoutineProps) {
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [section, setSection] = useState("");
  const [teacherId, setTeacherId] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teacherId === "") return;
    onAddRoutine({ day, time, section, teacherId: Number(teacherId) });
    setDay("");
    setTime("");
    setSection("");
    setTeacherId("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Routine</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="day">Day</Label>
            <Select value={day} onValueChange={setDay}>
              <SelectTrigger>
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Monday">Monday</SelectItem>
                <SelectItem value="Tuesday">Tuesday</SelectItem>
                <SelectItem value="Wednesday">Wednesday</SelectItem>
                <SelectItem value="Thursday">Thursday</SelectItem>
                <SelectItem value="Friday">Friday</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="section">Section</Label>
            <Input
              id="section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="teacher">Teacher</Label>
            <Select value={teacherId.toString()} onValueChange={(value) => setTeacherId(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id.toString()}>
                    {teacher.name} ({teacher.subject})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Add Routine</Button>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Current Routines</h3>
          <div className="space-y-4">
            {routines.map((routine) => (
              <Card key={routine.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{routine.day} at {routine.time}</p>
                      <p className="text-sm text-gray-500">Section: {routine.section}</p>
                      <p className="text-sm text-gray-500">
                        Teacher: {routine.teacher_name} ({routine.subject})
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onRemoveRoutine(routine.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
  