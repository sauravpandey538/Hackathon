import StudentForm from "./student-form";
import { Icons } from "@/src/components/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { toast } from "@/src/hooks/use-toast";
import { fetchApi } from "@/src/lib/api";
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
  joined_at: string;
  graduate_at: string | null;
  section: string;
}

interface StudentListProps {
  students: Student[];
  onFilter: (faculty: string | null, semester: number | null) => void;
}

// Faculty options
const FACULTY_OPTIONS = [
  { value: "BIT", label: "Bachelor of Information Technology" },
  { value: "BCA", label: "Bachelor of Computer Science" },
  { value: "BBS", label: "Bachelor of Business Studies" },
];

// Semester options
const SEMESTER_OPTIONS = Array.from({ length: 8 }, (_, i) => ({
  value: i + 1,
  label: `Semester ${i + 1}`,
}));

// Section options
const SECTION_OPTIONS = ["A", "B", "C", "D", "E"] as const;

export default function StudentList({ students, onFilter }: StudentListProps) {
  const [faculty, setFaculty] = useState<string>("all");
  const [semester, setSemester] = useState<string>("all");
  const [localStudents, setLocalStudents] = useState<Student[]>(students);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editForm, setEditForm] = useState({
    id: 0,
    name: "",
    email: "",
    phone_number: "",
    address: "",
    faculty: "",
    semester: 0,
    section: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone_number: "",
  });

  // Validation functions
  const validateName = (name: string) => {
    if (name.length < 5) {
      return "Name must be at least 5 characters long";
    }
    return "";
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePhoneNumber = (phone: string) => {
    if (phone && phone.length !== 10) {
      return "Phone number must be exactly 10 digits";
    }
    return "";
  };

  const validateForm = () => {
    const nameError = validateName(editForm.name);
    const emailError = validateEmail(editForm.email);
    const phoneError = validatePhoneNumber(editForm.phone_number);

    setErrors({
      name: nameError,
      email: emailError,
      phone_number: phoneError,
    });

    return !nameError && !emailError && !phoneError;
  };

  const handleFilter = () => {
    onFilter(
      faculty === "all" ? null : faculty,
      semester === "all" ? null : parseInt(semester)
    );
  };

  const handleDelete = async (id: number) => {
    const res = await fetchApi(`/api/admin/students?id=${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.success) {
      setLocalStudents(localStudents.filter((student) => student.id !== id));
      toast({
        title: "Success 🎉",
        description: "Student deleted successfully",
      });
    } else {
      toast({ title: "Error", description: "Failed to delete student" });
    }
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setEditForm({
      id: student.user_id,
      name: student.name,
      email: student.email,
      phone_number: student.phone_number || "",
      address: student.address || "",
      faculty: student.faculty,
      semester: student.semester,
      section: student.section || "",
    });
    setErrors({
      name: "",
      email: "",
      phone_number: "",
    });
    setIsEditing(true);
  };

  const handleEditSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetchApi("/api/admin/students", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (response && response.success) {
        toast({
          title: "Success 🎉",
          description: "Student updated successfully",
        });
        setIsEditing(false);
        onFilter(null, null); // Refresh the list
      } else {
        toast({
          title: "Error",
          description: "Failed to update student",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating student:", error);
      toast({
        title: "Error",
        description: "Failed to update student",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    setLocalStudents(students);
  }, [students]);

  return (
    <div className="space-y-4 ">
      <div className="flex gap-4 items-end flex-wrap">
        <div className="w-[200px]">
          <label className="block text-sm font-medium mb-1">Faculty</label>
          <Select value={faculty} onValueChange={setFaculty}>
            <SelectTrigger>
              <SelectValue placeholder="All Faculties" />
            </SelectTrigger>
            <SelectContent className="flex flex-wrap gap-2">
              <SelectItem value="all">All Faculties</SelectItem>
              {FACULTY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-[200px]">
          <label className="block text-sm font-medium mb-1">Semester</label>
          <Select value={semester} onValueChange={setSemester}>
            <SelectTrigger>
              <SelectValue placeholder="All Semesters" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Semesters</SelectItem>
              {SEMESTER_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
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
                <TableHead>Faculty</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Graduate Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                localStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.name}
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      {FACULTY_OPTIONS.find((f) => f.value === student.faculty)
                        ?.label || student.faculty}
                    </TableCell>
                    <TableCell>Semester {student.semester}</TableCell>
                    <TableCell>{student.phone_number || "-"}</TableCell>
                    <TableCell>
                      {new Date(student.joined_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {student.graduate_at
                        ? new Date(student.graduate_at).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(student)}
                        >
                          <Icons.edit className="w-4 h-4" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Icons.delete className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the student account and
                                remove their data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(student.id)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>
              Make changes to the student profile here. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => {
                  setEditForm((prev) => ({ ...prev, name: e.target.value }));
                  setErrors((prev) => ({ ...prev, name: "" }));
                }}
                className={`col-span-3 ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={editForm.email}
                onChange={(e) => {
                  setEditForm((prev) => ({ ...prev, email: e.target.value }));
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
                className={`col-span-3 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                type="number"
                value={editForm.phone_number}
                onChange={(e) => {
                  setEditForm((prev) => ({
                    ...prev,
                    phone_number: e.target.value,
                  }));
                  setErrors((prev) => ({ ...prev, phone_number: "" }));
                }}
                className={`col-span-3 ${
                  errors.phone_number ? "border-red-500" : ""
                }`}
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone_number}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                value={editForm.address}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, address: e.target.value }))
                }
                className="col-span-3"
              />
            </div>
            <div>
              <Label htmlFor="faculty" className="text-right">
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
                  {FACULTY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="semester" className="text-right">
                Semester
              </Label>
              <Select
                value={editForm.semester.toString()}
                onValueChange={(value) =>
                  setEditForm((prev) => ({
                    ...prev,
                    semester: parseInt(value),
                  }))
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {SEMESTER_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="section" className="text-right">
                Section
              </Label>
              <Select
                value={editForm.section}
                onValueChange={(value) =>
                  setEditForm((prev) => ({ ...prev, section: value }))
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  {SECTION_OPTIONS.map((option: string) => (
                    <SelectItem key={option} value={option}>
                      Section {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEditSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
