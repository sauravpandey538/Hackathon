"use client";

import SingleModule from "@/src/app/student/dashboard/modules/single-module";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
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
import { toast } from "@/src/hooks/use-toast";
import { fetchApi } from "@/src/lib/api";
import { useEffect, useState } from "react";

interface Module {
  id: number;
  name: string;
  faculty: string;
  semester: string;
}

interface ModuleListProps {
  onFilter: (faculty: string | null, semester: string | null) => void;
}

// Faculty options
const FACULTY_OPTIONS = [
  { value: "BIT", label: "Bachelor of Information Technology" },
  { value: "BCA", label: "Bachelor of Computer Application" },
  { value: "BBS", label: "Bachelor of Business Studies" },
];

// Semester options
const SEMESTER_OPTIONS = Array.from({ length: 8 }, (_, i) => ({
  value: (i + 1).toString(),
  label: `Semester ${i + 1}`,
}));

export default function ModuleList({ onFilter }: ModuleListProps) {
  const [faculty, setFaculty] = useState<string>("BIT");
  const [semester, setSemester] = useState<string>("1");
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    faculty: "",
    semester: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState<Module | null>(null);

  useEffect(() => {
    fetchModules();
  }, [faculty, semester]);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const response = await fetchApi(
        `/api/admin/modules?faculty=${faculty}&semester=${semester}`,
        {
          credentials: "include",
        }
      );

      if (response.success && Array.isArray(response.data)) {
        setModules(response.data);
      } else {
        setModules([]);
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error fetching modules:", error);
      setModules([]);
      toast({
        title: "Error",
        description: "Failed to fetch modules",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    onFilter(
      faculty === "all" ? null : faculty,
      semester === "all" ? null : semester
    );
  };

  const handleEdit = (module: Module) => {
    setSelectedModule(module);
    setEditForm({
      name: module.name,
      faculty: module.faculty,
      semester: module.semester,
    });
    setIsEditing(true);
  };

  const handleEditSubmit = async () => {
    if (!selectedModule) return;

    try {
      const response = await fetchApi(
        `/api/admin/modules/${selectedModule.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );

      if (response.success) {
        toast({
          title: "Success",
          description: "Module updated successfully",
        });
        setIsEditing(false);
        fetchModules();
      } else {
        toast({
          title: "Error",
          description: "Failed to update module",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating module:", error);
      toast({
        title: "Error",
        description: "Failed to update module",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (module: Module) => {
    setModuleToDelete(module);
    setIsDeleting(true);
  };

  const handleDeleteConfirm = async () => {
    if (!moduleToDelete) return;

    try {
      const response = await fetchApi(
        `/api/admin/modules/${moduleToDelete.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.success) {
        toast({
          title: "Success",
          description: "Module deleted successfully",
        });
        setIsDeleting(false);
        fetchModules();
      } else {
        toast({
          title: "Error",
          description: "Failed to delete module",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting module:", error);
      toast({
        title: "Error",
        description: "Failed to delete module",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-end flex-wrap">
        <div className="w-[200px]">
          <label className="block text-sm font-medium mb-1">Faculty</label>
          <Select value={faculty} onValueChange={setFaculty}>
            <SelectTrigger>
              <SelectValue placeholder="Select Faculty" />
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

        <div className="w-[200px]">
          <label className="block text-sm font-medium mb-1">Semester</label>
          <Select value={semester} onValueChange={setSemester}>
            <SelectTrigger>
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent>
              {SEMESTER_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleFilter}>Filter</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-4">Loading...</div>
        ) : modules.length === 0 ? (
          <div className="col-span-full text-center py-4">No modules found</div>
        ) : (
          modules.map((module) => (
            <div key={module.id} className="relative group">
              <SingleModule
                moduleName={module.name}
                faculty={module.faculty}
                semester={parseInt(module.semester)}
                teacherName=""
                teacherPhone=""
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(module)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(module)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Module</DialogTitle>
            <DialogDescription>
              Make changes to the module here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="semester" className="text-right">
                Semester
              </Label>
              <Select
                value={editForm.semester}
                onValueChange={(value) =>
                  setEditForm((prev) => ({ ...prev, semester: value }))
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {SEMESTER_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              module
              {moduleToDelete ? ` "${moduleToDelete.name}"` : ""}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
