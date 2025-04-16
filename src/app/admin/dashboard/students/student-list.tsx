import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";

interface Student {
  id: number;
  name: string;
  email: string;
  address: string | null;
  phone_number: string | null;
  faculty: string;
  semester: number;
  joined_at: string;
  graduate_at: string | null;
}

interface StudentListProps {
  students: Student[];
  onFilter: (faculty: string | null, semester: number | null) => void;
}

// Faculty options
const FACULTY_OPTIONS = [
  { value: 'BIT', label: 'Bachelor of Information Technology' },
  { value: 'BCS', label: 'Bachelor of Computer Science' },
  { value: 'BBS', label: 'Bachelor of Business Studies' },
];

// Semester options
const SEMESTER_OPTIONS = Array.from({ length: 8 }, (_, i) => ({
  value: i + 1,
  label: `Semester ${i + 1}`,
}));

export default function StudentList({ students, onFilter }: StudentListProps) {
  const [faculty, setFaculty] = useState<string>('all');
  const [semester, setSemester] = useState<string>('all');

  const handleFilter = () => {
    onFilter(
      faculty === 'all' ? null : faculty,
      semester === 'all' ? null : parseInt(semester)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-end">
        <div className="w-[200px]">
          <label className="block text-sm font-medium mb-1">Faculty</label>
          <Select value={faculty} onValueChange={setFaculty}>
            <SelectTrigger>
              <SelectValue placeholder="All Faculties" />
            </SelectTrigger>
            <SelectContent>
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

        <Button onClick={handleFilter}>
          Filter
        </Button>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      {FACULTY_OPTIONS.find(f => f.value === student.faculty)?.label || student.faculty}
                    </TableCell>
                    <TableCell>Semester {student.semester}</TableCell>
                    <TableCell>{student.phone_number || '-'}</TableCell>
                    <TableCell>
                      {new Date(student.joined_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {student.graduate_at ? new Date(student.graduate_at).toLocaleDateString() : '-'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 