import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Trash2 } from "lucide-react";

export const TeacherList = ({
    teachers,
    onRemove,
  }: {
    teachers: { id: number; name: string; subject: string }[];
    onRemove: (id: number) => void;
  }) => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Teachers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teachers.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No teachers added yet</p>
            ) : (
              teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{teacher.name}</p>
                    <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onRemove(teacher.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    );
  };
  