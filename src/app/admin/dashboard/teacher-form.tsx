import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/src/components/ui/select"
interface TeacherFormProps {
  onAdd: (teacher: { name: string; subject: string; email: string; password: string, faculty: "BBS" | "BIT" | "BCA" }) => void;
}

export function TeacherForm({ onAdd }: TeacherFormProps) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [faculty,setFaculty] = useState<"BBS" | "BIT" | "BCA" >("BIT")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, subject, email, password, faculty });
    setName("");
    setSubject("");
    setEmail("");
    setPassword("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Teacher</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="day">Faculty</Label>
            <Select value={faculty}   onValueChange={(value) => setFaculty(value as "BBS" | "BIT" | "BCA")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BCS">BCS</SelectItem>
                <SelectItem value="BIT">BIT</SelectItem>
                <SelectItem value="BBS">BBS</SelectItem>

              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Add Teacher</Button>
        </form>
      </CardContent>
    </Card>
  );
}
