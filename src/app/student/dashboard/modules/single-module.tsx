import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/src/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

interface SingleModuleProps {
  moduleName: string;
  teacherName: string;
  faculty: string;
  semester: number;
  teacherPhone: string;
}

function SingleModule({
  moduleName,
  teacherName,
  faculty,
  semester,
  teacherPhone,
}: SingleModuleProps) {
  return (
    <Card className="w-full max-w-md mx-auto mt-6 shadow-lg rounded-2xl">
      <CardHeader className="flex items-center gap-4">
        <Image
          src={"/module.png"}
          alt={moduleName}
          width={280}
          height={280}
          className="rounded-full object-cover border"
        />

        <div>
          <CardTitle className="text-xl font-semibold">{moduleName}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Taught by {teacherName || "N/A"}
            <br />
            {teacherPhone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> {teacherPhone}
              </div>
            )}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="border-t pt-4  text-sm text-muted-foreground flex justify-between items-center">
        {faculty}
        <span>Semister {semester}</span>
      </CardContent>
    </Card>
  );
}

export default SingleModule;
