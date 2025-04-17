"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/src/components/ui/tabs";
import { fetchApi } from "@/src/lib/api";
import Pusher from "pusher-js";
import React, { useState, useEffect } from "react";

interface Notification {
  id: number;
  title: string;
  message: string;
  role: string;
  sent_at: string;
}

const NotificationList: React.FC = () => {
  const [role, setRole] = useState<"teacher" | "student">("teacher");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async (role: string) => {
    try {
      const data = await fetchApi(`/api/admin/notifications?role=${role}`);
      if (data.success && data.data) {
        setNotifications(data.data as Notification[]);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications(role);
  }, [role]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("notifications");

    channel.bind("new-notification", (data: Notification) => {
      if (data.role === role) {
        setNotifications((prev) => [data, ...prev]);
      }
    });

    return () => {
      pusher.unsubscribe("notifications");
    };
  }, [role]);

  return (
    <div className="w-full max-w-2xl p-6 bg-background rounded-xl shadow min-h-[80vh]">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>

      <Tabs defaultValue={role} onValueChange={(val) => setRole(val as any)}>
        <TabsList>
          <TabsTrigger value="teacher">Teacher</TabsTrigger>
          <TabsTrigger value="student">Student</TabsTrigger>
        </TabsList>

        <TabsContent value="teacher">
          <NotificationItems notifications={notifications} />
        </TabsContent>
        <TabsContent value="student">
          <NotificationItems notifications={notifications} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const NotificationItems = ({
  notifications,
}: {
  notifications: Notification[];
}) => {
  return (
    <div className="container w-full mt-4 space-y-4">
      {notifications?.length === 0 ? (
        <p className="text-gray-500">No notifications available.</p>
      ) : (
        notifications?.map((n) => (
          <div key={n.id} className="border p-4 rounded-lg bg-background">
            <h3 className="font-semibold">{n.title}</h3>
            <p className="text-sm text-gray-600">{n.message}</p>
            <span className="text-xs text-gray-500">
              {new Date(n.sent_at).toLocaleString()}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationList;
