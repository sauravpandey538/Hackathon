"use client";

import { Icons } from "@/src/components/icons";
import SearchableSelect from "@/src/components/searchable-input";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { useToast } from "@/src/hooks/use-toast";
import { fetchApi } from "@/src/lib/api";
import React, { useState, useEffect } from "react";

interface Teacher {
  id: number;
  user_id: number;
  name: string;
  subject: string;
  email: string;
  faculty: string;
}

interface EditTeacherForm {
  id: number;
  name: string;
  email: string;
  faculty: string;
  subject: string;
}

export const TeacherList = () => {
  const { toast } = useToast();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [faculty, setFaculty] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [editForm, setEditForm] = useState<EditTeacherForm>({
    id: 0,
    name: "",
    email: "",
    faculty: "",
    subject: "",
  });
  const [subList, setSubList] = useState<any[]>([]);

  // Fetch teachers
  const fetchTeachers = async () => {
    try {
      setIsLoading(true);
      const url =
        faculty && faculty !== "all"
          ? `/api/admin/teachers?faculty=${faculty}`
          : "/api/admin/teachers";

      const response = await fetchApi(url, {
        method: "GET",
        credentials: "include",
      });

      if (response.success && Array.isArray(response.data)) {
        setTeachers(response.data);
      } else {
        setTeachers([]);
        console.error("Invalid response data:", response);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setTeachers([]);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load teachers. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle filter change
  const handleFilter = () => {
    fetchTeachers();
  };

  // Handle edit teacher
  const handleEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setEditForm({
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      faculty: teacher.faculty,
      subject: teacher.subject,
    });
    setIsEditDialogOpen(true);
  };

  // Handle delete teacher
  const handleDelete = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsDeleteDialogOpen(true);
  };

  // Handle edit form change
  const handleEditFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle edit form submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetchApi("/api/admin/teachers", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (response.success) {
        toast({
          title: "Success",
          description: "Teacher updated successfully.",
        });
        setIsEditDialogOpen(false);
        fetchTeachers();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.error || "Failed to update teacher.",
        });
      }
    } catch (error) {
      console.error("Error updating teacher:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update teacher. Please try again.",
      });
    }
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    if (!selectedTeacher) return;

    try {
      const response = await fetchApi(
        `/api/admin/teachers?id=${selectedTeacher.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.success) {
        toast({
          title: "Success",
          description: "Teacher deleted successfully.",
        });
        setIsDeleteDialogOpen(false);
        fetchTeachers();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.error || "Failed to delete teacher.",
        });
      }
    } catch (error) {
      console.error("Error deleting teacher:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete teacher. Please try again.",
      });
    }
  };

  // Fetch subjects based on faculty
  const fetchSubjects = async () => {
    if (!editForm.faculty || editForm.faculty === "all") {
      return [];
    }

    try {
      const response = await fetchApi(
        `/api/subjects?faculty=${editForm.faculty}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.success && Array.isArray(response.data)) {
        // Transform the data to match the SelectItem interface
        return response.data.map((subject: any) => ({
          id: subject.id.toString(),
          name: subject.name,
        }));
      }
      return [];
    } catch (error) {
      console.error("Error fetching subjects:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchSubjects();
  }, []);

  return (
    <div className="space-y-4">
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
              <SelectItem value="BBS">Bachelor of Business Studies</SelectItem>
              <SelectItem value="BCA">
                Bachelor of Computer Application
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleFilter}>Filter</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : teachers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No teachers found
                  </TableCell>
                </TableRow>
              ) : (
                teachers?.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">
                      {teacher.name}
                    </TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>{teacher.faculty}</TableCell>
                    <TableCell className="flex justify-end">
                      <div className="flex justify-center gap-2 items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(teacher)}
                        >
                          <Icons.edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(teacher)}
                        >
                          <Icons.delete className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Teacher Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
            <DialogDescription>
              Update teacher information. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name" className="text-left">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditFormChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div>
                {" "}
                <Label htmlFor="email" className="text-left">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editForm.email}
                  onChange={handleEditFormChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div>
                {" "}
                <Label htmlFor="faculty" className="text-left">
                  Faculty
                </Label>
                <Select
                  value={editForm.faculty}
                  onValueChange={(value) =>
                    setEditForm((prev) => ({ ...prev, faculty: value }))
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select faculty" />
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
                {" "}
                <Label htmlFor="subject" className="text-left">
                  Subject
                </Label>
                <SearchableSelect
                  key={editForm.faculty}
                  value={editForm.subject}
                  fetchItems={fetchSubjects}
                  onSelect={(item) => {
                    setEditForm((prev) => ({ ...prev, subject: item.name }));
                  }}
                  placeholder="Select a subject"
                  className="w-full border"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Teacher Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Teacher</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this teacher? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
