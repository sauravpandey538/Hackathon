"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/hooks/use-toast";
import { fetchApi } from "@/src/lib/api";
import React, { useState } from "react";

const NotificationSender: React.FC = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("teacher");

  const { toast } = useToast();

  const handleSendNotification = async () => {
    if (!title || !message) {
      toast({
        title: "Validation Error",
        description: "Title and message are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetchApi("/api/admin/notifications/send-notofication", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          message,
          role,
        }),
      });

      if (res.success) {
        setTitle("");
        setMessage("");
        toast({
          title: "Success",
          description: "Notification sent successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send notification.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-6 bg-background shadow-md rounded-xl w-full max-w-xl">
      <h2 className="text-xl font-semibold">Send Notification</h2>

      <Input
        placeholder="Notification Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="Notification Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={10}
      />

      <Select value={role} onValueChange={(val) => setRole(val)}>
        <SelectTrigger>
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="teacher">Teacher</SelectItem>
          <SelectItem value="student">Student</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={handleSendNotification}>Send Notification</Button>
    </div>
  );
};

export default NotificationSender;
