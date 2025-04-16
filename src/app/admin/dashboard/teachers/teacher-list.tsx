import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Trash2 } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";

export const TeacherList = ({
    teachers,
    onRemove,
    onFilter
  }: {
    teachers: { id: number; name: string; subject: string, email: string, faculty: string }[];
    onRemove: (id: number) => void;
    onFilter: (faculty: string | null) => void;
  }) => {
    const [faculty, setFaculty] = useState<string | null>(null);

    const handleFilter = () => {
      onFilter(faculty);
    };
    return (
      <div className="space-y-4">
     <div className="flex gap-4 items-end">
        <div className="w-[200px]">
          <label className="block text-sm font-medium mb-1">Faculty</label>
          <Select value={faculty || 'all'} onValueChange={setFaculty}>
            <SelectTrigger>
              <SelectValue placeholder="All Faculties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Faculties</SelectItem>
           
                <SelectItem value="BIT">Bachelor of Information Technology</SelectItem>
                <SelectItem value="BBS">Bachelor of Business Studies</SelectItem>
                <SelectItem value="BCA">Bachelor of Computer Application</SelectItem>
          
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
              <TableHead>Subject</TableHead>
              <TableHead>Faculty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No teachers found
                </TableCell>
              </TableRow>
            ) : (
              teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>
                    {teacher.subject}
                  </TableCell>
                 
                  <TableCell>
                    {teacher.faculty}
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
  };
  