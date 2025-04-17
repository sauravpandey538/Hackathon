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
import Image from "next/image";
import React from "react";

interface SingleModuleProps {
  faculty: string;
  moduleName: string;
}

function SingleModuleForTeacher({ moduleName, faculty }: SingleModuleProps) {
  return (
    <Card className="w-full max-w-md mx-auto mt-6 shadow-lg rounded-2xl">
      <CardHeader className="flex items-center gap-4">
        <Image
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9zaFUCD18ltlqn-P8SLTepJbmF9EMYymcrw&s"
          }
          alt={moduleName}
          width={300}
          height={100}
          className="rounded-full"
        />

        <div>
          <CardTitle className="text-2xl font-semibold">{moduleName}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground text-center">
            Associated with{" "}
            <span className="text-2xl md:text-4xl font-extrabold">
              {faculty}
            </span>
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}

export default SingleModuleForTeacher;
