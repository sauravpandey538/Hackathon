import WeeklyRoutineCalendar from "./weekly-calander";
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
  routines: RoutineItem[];
  onRemoveRoutine: (id: number) => void;
}

export function GetRoutine({ routines, onRemoveRoutine }: WeeklyRoutineProps) {
  const [faculty, setFaculty] = useState<string | "all">("all");
  const [semister, setSemister] = useState<number>(1);
  const [section, setSection] = useState<"A" | "B" | "C">("A");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Weekly Routine</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="w-[200px]">
              <label className="block text-sm font-medium mb-1">Faculty</label>
              <Select value={faculty || "all"} onValueChange={setFaculty}>
                <SelectTrigger>
                  <SelectValue placeholder="All Faculties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Faculties</SelectItem>

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
            <div className="w-[200px]">
              <label className="block text-sm font-medium mb-1">Semister</label>
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

            <div className="w-[200px]">
              <label className="block text-sm font-medium mb-1">Semister</label>
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
            <Button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? "Close" : "Filter"}
            </Button>
          </div>

          {isOpen && faculty !== "all" ? (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Current Routines</h3>
              <WeeklyRoutineCalendar />
            </div>
          ) : (
            <div className="mt-8">
              <p className="text-muted-foreground">
                Please select a faculty before filtering
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
