"use client";

import { Button } from "@/src/components/ui/button";
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
import { toast } from "@/src/hooks/use-toast";
import { fetchApi } from "@/src/lib/api";
import { useState } from "react";

// Faculty options
const FACULTY_OPTIONS = [
  { value: "BIT", label: "Bachelor of Information Technology" },
  { value: "BCS", label: "Bachelor of Computer Science" },
  { value: "BBS", label: "Bachelor of Business Studies" },
];

// Semester options
const SEMESTER_OPTIONS = Array.from({ length: 8 }, (_, i) => ({
  value: (i + 1).toString(),
  label: `Semester ${i + 1}`,
}));

interface ModuleFormProps {
  onSuccess: () => void;
}

export default function ModuleForm({ onSuccess }: ModuleFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    faculty: "BIT",
    semester: "1",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetchApi("/api/admin/modules", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.success) {
        toast({
          title: "Success",
          description: "Module added successfully",
        });
        setOpen(false);
        setFormData({
          name: "",
          faculty: "BIT",
          semester: "1",
        });
        onSuccess();
      } else {
        toast({
          title: "Error",
          description: "Failed to add module",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding module:", error);
      toast({
        title: "Error",
        description: "Failed to add module",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Module</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Module</DialogTitle>
          <DialogDescription>
            Add a new module to the system. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
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
                value={formData.faculty}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, faculty: value }))
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
                value={formData.semester}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, semester: value }))
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
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Module"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
