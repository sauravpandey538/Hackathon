import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";

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
  onAddRoutine: (routine: { day: string; time: string; section: string; teacherId: number }) => void;
}


export function WeeklyRoutine({ teachers, onAddRoutine }: WeeklyRoutineProps) {
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
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="day" className="pl-1">Day</Label>
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
          <div>
            <Label htmlFor="time" className="pl-1">Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="section" className="pl-1">Section</Label>
            <Input
              id="section"
              value={section}
              onChange={(e) => setSection(e.target.value.toUpperCase())}
              required
           
            />
          </div>
          <div >
            <Label htmlFor="teacher" className="pl-1">Teacher</Label>
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

  
      </CardContent>
    </Card>
  );
}
  