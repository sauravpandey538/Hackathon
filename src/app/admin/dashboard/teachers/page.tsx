"use client";

import { GetRoutine } from "./get-routine";
import { TeacherForm } from "./teacher-form";
import { TeacherList } from "./teacher-list";
import { WeeklyRoutine } from "./weekly-routine";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { useToast } from "@/src/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  user_id: number;
  email: string;
  faculty: string;
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

export default function AdminDashboard() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [routines, setRoutines] = useState<RoutineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch teachers and routines on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch teachers
        const teachersResponse = await fetch("/api/teachers");
        if (!teachersResponse.ok) {
          throw new Error("Failed to fetch teachers");
        }
        const teachersData = await teachersResponse.json();
        console.log(teachersData);
        setTeachers(teachersData);

        // Fetch routines
        const routinesResponse = await fetch("/api/routines");
        if (!routinesResponse.ok) {
          throw new Error("Failed to fetch routines");
        }
        const routinesData = await routinesResponse.json();
        setRoutines(routinesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addTeacher = async (teacher: {
    name: string;
    subject: string;
    email: string;
    password: string;
    faculty: "BBS" | "BIT" | "BCA";
  }) => {
    try {
      const response = await fetch("/api/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacher),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add teacher");
      }

      const newTeacher = await response.json();
      setTeachers((prev) => [...prev, newTeacher]);

      toast({
        title: "Successful 🎉",
        description: "Teacher added successfully",
      });
    } catch (error) {
      console.error("Error adding teacher:", error);
      toast({
        title: "Failed ❌",
        description:
          error instanceof Error ? error.message : "Failed to add teacher",
        variant: "destructive",
      });
    }
  };

  const removeTeacher = async (id: number) => {
    try {
      const response = await fetch(`/api/teachers/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to remove teacher");
      }

      setTeachers((prev) => prev.filter((t) => t.id !== id));

      // Also remove any routines associated with this teacher
      setRoutines((prev) => prev.filter((r) => r.teacher_id !== id));

      toast({
        title: "Success ✅",
        description: "Teacher removed successfully",
      });
    } catch (error) {
      console.error("Error removing teacher:", error);
      toast({
        title: "Failed ❌",
        description:
          error instanceof Error ? error.message : "Failed to remove teacher",
        variant: "destructive",
      });
    }
  };

  const addRoutine = async (routine: {
    day: string;
    time: string;
    section: string;
    teacherId: number;
    faculty: string;
    semister: number;
  }) => {
    try {
      const response = await fetch("/api/routines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(routine),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add routine");
      }

      const newRoutine = await response.json();
      setRoutines((prev) => [...prev, newRoutine]);

      toast({
        title: "Successful 🎉",
        description: "Routine added successfully",
      });
    } catch (error) {
      console.error("Error adding routine:", error);
      toast({
        title: "Failed ❌",
        description:
          error instanceof Error ? error.message : "Failed to add routine",
        variant: "destructive",
      });
    }
  };

  const removeRoutine = async (id: number) => {
    try {
      const response = await fetch(`/api/routines/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to remove routine");
      }

      setRoutines((prev) => prev.filter((r) => r.id !== id));

      toast({
        title: "Success ✅",
        description: "Routine removed successfully",
      });
    } catch (error) {
      console.error("Error removing routine:", error);
      toast({
        title: "Failed ❌",
        description:
          error instanceof Error ? error.message : "Failed to remove routine",
        variant: "destructive",
      });
    }
  };

  const handleTeacherFilter = async (faculty: string | null) => {
    const response = await fetch(`/api/teachers?faculty=${faculty}`);
    const data = await response.json();
    console.log(data);
    setTeachers(data);
  };

  const handleRoutineFilter = async (
    faculty?: string | null,
    semester?: string | null,
    section?: string | null
  ) => {
    const response = await fetch(
      `/api/routines?faculty=${faculty}&semester=${semester}&section=${section}`
    );
    const data = await response.json();
    console.log(data);
    setRoutines(data);
  };

  return (
    <div className="md:container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Teacher Management</h1>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList className="flex flex-wrap gap-2 justify-evenly md:justify-start w-fit h-fit">
          <TabsTrigger value="list">Teacher List</TabsTrigger>
          <TabsTrigger value="routine">Weekly Routine</TabsTrigger>
          <TabsTrigger value="add-routine">Add Routine</TabsTrigger>
          <TabsTrigger value="add">Add Teacher</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Teachers</CardTitle>
              <CardDescription>View and filter all teachers</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Loading teachers...</span>
                </div>
              ) : (
                <TeacherList />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <TeacherForm onAdd={addTeacher} />
        </TabsContent>
        <TabsContent value="routine">
          <GetRoutine
            routines={routines}
            onRemoveRoutine={removeRoutine}
            onFilter={handleRoutineFilter}
          />
        </TabsContent>

        <TabsContent value="add-routine">
          <WeeklyRoutine onAddRoutine={addRoutine} teachers={teachers || []} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
