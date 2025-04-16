import WeeklyRoutineCalendar from "./weekly-calander";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useState } from "react";

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
  onFilter: (
    faculty: string | null,
    semester?: string | null,
    section?: string | null
  ) => void;
}

export function GetRoutine({
  routines,
  onRemoveRoutine,
  onFilter,
}: WeeklyRoutineProps) {
  const [faculty, setFaculty] = useState<"BIT" | "BBS" | "BCA">("BIT");
  const [semester, setSemester] = useState<number>(1);
  const [section, setSection] = useState<"A" | "B" | "C">("A");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const handleFilter = () => {
    onFilter(faculty, semester.toString(), section);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Routine</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          variant="outline"
          onClick={() => setIsFilterOpen((prev) => !prev)}
          className="mb-4"
        >
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
        </Button>

        {isFilterOpen && (
          <div className="flex gap-4 flex-wrap items-end mb-6">
            {/* Faculty */}
            <div className="w-[200px]">
              <label className="block text-sm font-medium mb-1">Faculty</label>
              <Select
                value={faculty}
                onValueChange={(value) =>
                  setFaculty(value as "BIT" | "BBS" | "BCA")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Faculty" />
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

            {/* Semester */}
            <div className="w-[200px]">
              <label className="block text-sm font-medium mb-1">Semester</label>
              <Select
                value={semester.toString()}
                onValueChange={(value) => setSemester(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(8)].map((_, i) => (
                    <SelectItem key={i} value={(i + 1).toString()}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Section */}
            <div className="w-[200px]">
              <label className="block text-sm font-medium mb-1">Section</label>
              <Select
                value={section}
                onValueChange={(value) => setSection(value as "A" | "B" | "C")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleFilter}>Apply Filter</Button>
          </div>
        )}

        {/* Calendar always visible */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-4">Current Routines</h3>
          <WeeklyRoutineCalendar routines={routines} />
        </div>
      </CardContent>
    </Card>
  );
}
