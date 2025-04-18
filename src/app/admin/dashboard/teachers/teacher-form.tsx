import SearchableSelect from "@/src/components/searchable-input";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/src/components/ui/select";
import { fetchApi } from "@/src/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Schema using Zod
const teacherSchema = z.object({
  name: z.string().min(5, "Name is required and must be at least 5 characters"),
  subject: z.string().min(1, "Subject is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().length(10, "Phone number must be 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  faculty: z.enum(["BBS", "BIT", "BCA"], {
    required_error: "Faculty is required",
  }),
});

type TeacherFormData = z.infer<typeof teacherSchema>;

interface TeacherFormProps {
  onAdd: (data: TeacherFormData) => Promise<void>;
}

// Faculty options
const FACULTY_OPTIONS = [
  { value: "BIT", label: "Bachelor of Information Technology" },
  { value: "BBS", label: "Bachelor of Business Studies" },
  { value: "BCA", label: "Bachelor of Computer Application" },
];

export function TeacherForm({ onAdd }: TeacherFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [subList, setSubList] = useState<any[]>([]);

  const defaultValues: TeacherFormData = {
    name: "",
    subject: "",
    email: "",
    phone: "",
    password: "",
    faculty: "BIT",
  };

  const form = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),
    defaultValues,
  });

  const onSubmit = async (data: TeacherFormData) => {
    try {
      setIsLoading(true);
      await onAdd(data);
      form.reset(defaultValues);
    } catch (error) {
      // Optionally handle error/toast
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchSubjects() {
    const response = await fetchApi(
      `/api/subjects?faculty=${form.watch("faculty")}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (response.success && response.data) {
      setSubList(response.data as any[]);
      form.setValue("subject", "");
    }
  }
  useEffect(() => {
    fetchSubjects();
  }, [form.watch("faculty")]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Teacher</CardTitle>
        <CardDescription>
          Fill in the details to add a new teacher
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="faculty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Faculty</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select faculty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {FACULTY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Select a teacher" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <SearchableSelect
                        key={form.watch("faculty")}
                        value={field.value}
                        fetchItems={() => Promise.resolve(subList)}
                        onSelect={(item) => {
                          field.onChange(item.name);
                          form.setValue("subject", item.name);
                        }}
                        placeholder="Select a subject"
                        className="w-full border"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="teacher@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="9876543210"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Teacher"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
