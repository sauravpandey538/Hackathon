"use client";

import { useEffect, useState } from "react";
import { TeacherList } from "./teacher-list";
import { TeacherForm } from "./teacher-form";
import { WeeklyRoutine } from "./weekly-routine";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";


interface Teacher {
  id: number;
  name: string;
  subject: string;
  user_id?: number;
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

  // Fetch teachers and routines on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch teachers
        const teachersResponse = await fetch('/api/teachers');
        if (!teachersResponse.ok) {
          throw new Error('Failed to fetch teachers');
        }
        const teachersData = await teachersResponse.json();
        setTeachers(teachersData);
        
        // Fetch routines
        const routinesResponse = await fetch('/api/routines');
        if (!routinesResponse.ok) {
          throw new Error('Failed to fetch routines');
        }
        const routinesData = await routinesResponse.json();
        setRoutines(routinesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addTeacher = async (teacher: { name: string; subject: string; email: string; password: string, faculty: "BBS" | "BIT" | "BCA"  }) => {
    try {
      const response = await fetch('/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacher),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add teacher');
      }

      const newTeacher = await response.json();
      setTeachers((prev) => [...prev, newTeacher]);
      
          // toast({
          //   title: "Success",
          //   description: "Teacher added successfully",
          // });
    } catch (error) {
      console.error('Error adding teacher:', error);
      // toast({
      //   title: "Error",
      //   description: error instanceof Error ? error.message : "Failed to add teacher",
      //   variant: "destructive",
      // });
    }
  };

  const removeTeacher = async (id: number) => {
    try {
      const response = await fetch(`/api/teachers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove teacher');
      }

      setTeachers((prev) => prev.filter((t) => t.id !== id));
      
      // Also remove any routines associated with this teacher
      setRoutines((prev) => prev.filter((r) => r.teacher_id !== id));
      
      // toast({
      //   title: "Success",
      //   description: "Teacher removed successfully",
      // });
    } catch (error) {
      console.error('Error removing teacher:', error);
      // toast({
      //   title: "Error",
      //   description: error instanceof Error ? error.message : "Failed to remove teacher",
      //   variant: "destructive",
      // });
    }
  };

  const addRoutine = async (routine: { day: string; time: string; section: string; teacherId: number }) => {
    try {
      const response = await fetch('/api/routines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routine),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add routine');
      }

      const newRoutine = await response.json();
      setRoutines((prev) => [...prev, newRoutine]);
      
      // toast({
      //   title: "Success",
      //   description: "Routine added successfully",
      // });
    } catch (error) {
      console.error('Error adding routine:', error);
      // toast({
      //   title: "Error",
      //   description: error instanceof Error ? error.message : "Failed to add routine",
      //   variant: "destructive",
      // });
    }
  };

  const removeRoutine = async (id: number) => {
    try {
      const response = await fetch(`/api/routines/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove routine');
      }

      setRoutines((prev) => prev.filter((r) => r.id !== id));
      
      // toast({
      //   title: "Success",
      //   description: "Routine removed successfully",
      // });
    } catch (error) {
      console.error('Error removing routine:', error);
      // toast({
      //   title: "Error",
      //   description: error instanceof Error ? error.message : "Failed to remove routine",
      //   variant: "destructive",
      // });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <Tabs defaultValue="teachers" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="routine">Weekly Routine</TabsTrigger>
        </TabsList>
        
        <TabsContent value="teachers" className="space-y-6">
          <TeacherForm onAdd={addTeacher} />
          <TeacherList teachers={teachers} onRemove={removeTeacher} />
        </TabsContent>
        
        <TabsContent value="routine">
          <WeeklyRoutine 
            teachers={teachers} 
            routines={routines}
            onAddRoutine={addRoutine}
            onRemoveRoutine={removeRoutine}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
