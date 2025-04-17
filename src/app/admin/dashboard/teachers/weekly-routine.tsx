import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useState } from "react";

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
  onAddRoutine: (routine: {
    day: string;
    time: string;
    section: string;
    teacherId: number;
    faculty: string;
    semister: number;
  }) => void;
}

export function WeeklyRoutine({ teachers, onAddRoutine }: WeeklyRoutineProps) {
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [section, setSection] = useState<"A" | "B" | "C">("A");
  const [teacherId, setTeacherId] = useState<number | "">("");
  const [faculty, setFaculty] = useState<"BIT" | "BBS" | "BCA">("BIT");
  const [semister, setSemister] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teacherId === "") return;
    onAddRoutine({
      day,
      time,
      section,
      teacherId: Number(teacherId),
      faculty,
      semister,
    });
    setDay("");
    setTime("");
    setSection("A");
    setTeacherId("");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Add New Routine</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Faculty</label>
              <Select
                value={faculty || "BIT"}
                onValueChange={(val) =>
                  setFaculty(val as "BIT" | "BBS" | "BCA")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Faculties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BIT">
                    Bachelor of Information Technology
                  </SelectItem>
                  <SelectItem value="BBS">
                    Bachelor of Business Studies
                  </SelectItem>
                  <SelectItem value="BCA">
                    Bachelor of Computer Application
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Semester</label>
              <Select
                value={semister.toString()}
                onValueChange={(value) => setSemister(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Faculties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="7">7</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Section</label>
              <Select
                value={section}
                onValueChange={(value) => setSection(value as "A" | "B" | "C")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Faculties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="teacher" className="pl-1">
                Teacher
              </Label>
              <Select
                value={teacherId.toString()}
                onValueChange={(value) => setTeacherId(Number(value))}
              >
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
            <div>
              <Label htmlFor="day" className="pl-1">
                Day
              </Label>
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
              <Label htmlFor="time" className="pl-1">
                Start Time
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="border ">
              Add Routine
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
