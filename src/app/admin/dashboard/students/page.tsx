"use client";

import StudentForm from "./student-form";
import StudentList from "./student-list";
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
import { toast } from "@/src/hooks/use-toast";
import { fetchApi } from "@/src/lib/api";
// import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";

interface Student {
  id: number;
  user_id: number;
  name: string;
  email: string;
  address: string | null;
  phone_number: string | null;
  faculty: string;
  semester: number;
  section: string;
  joined_at: string;
  graduate_at: string | null;
  role: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async (
    faculty?: string | null,
    semester?: number | null
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      let url = "/api/admin/students";
      const params = new URLSearchParams();
      if (faculty && faculty !== "all") params.append("faculty", faculty);
      if (semester && semester !== 0)
        params.append("semester", semester.toString());
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetchApi(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response && Array.isArray(response)) {
        setStudents(response);
      } else if (response && response.data && Array.isArray(response.data)) {
        setStudents(response.data);
      } else {
        setStudents([]);
        console.error("Invalid response format:", response);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch students");
      setStudents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async (data: any) => {
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add student");
      }

      // Refresh the student list
      fetchStudents();
    } catch (err) {
      toast({
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to add student",
        variant: "destructive",
      });
    }
  };

  const handleFilter = (faculty: string | null, semester: number | null) => {
    fetchStudents(faculty, semester);
  };

  return (
    <div className="container py-6 w-full ">
      <h1 className="text-2xl font-bold mb-6">Student Management</h1>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Student List</TabsTrigger>
          <TabsTrigger value="add">Add Student</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>View and filter all students</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-red-50 text-red-500 rounded-md mb-4">
                  {error}
                </div>
              )}

              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Loading students...</span>
                </div>
              ) : (
                <StudentList students={students} onFilter={handleFilter} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <StudentForm onAdd={handleAddStudent} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
