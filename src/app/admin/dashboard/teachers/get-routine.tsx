import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";

interface Teacher {
  id: number;
  name: string;
  subject: string;
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

interface WeeklyRoutineProps {

  routines: RoutineItem[];
  onRemoveRoutine: (id: number) => void;
}


export function GetRoutine({ routines, onRemoveRoutine }: WeeklyRoutineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Routine</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Current Routines</h3>
          <div className="space-y-4">
            {routines.map((routine) => (
              <Card key={routine.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{routine.day} at {routine.time}</p>
                      <p className="text-sm text-gray-500">Section: {routine.section}</p>
                      <p className="text-sm text-gray-500">
                        Teacher: {routine.teacher_name} ({routine.subject})
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onRemoveRoutine(routine.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
  