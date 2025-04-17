"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Skeleton } from "@/src/components/ui/skeleton";
import { fetchApi } from "@/src/lib/api";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";

interface Notification {
  id: number;
  title: string;
  message: string;
  role: string;
  sent_at: string;
}

export default function TeacherNotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await fetchApi<{ notifications: Notification[] }>(
        "/api/teacher/notifications?role=teacher&limit=20"
      );

      if (res.success && res.data?.notifications) {
        setNotifications(res.data.notifications);
      }
    } catch (error) {
      console.error("Failed to fetch teacher notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("notifications");

    channel.bind("new-notification", (data: Notification) => {
      if (data.role === "teacher") {
        setNotifications((prev) => [data, ...prev.slice(0, 19)]);
      }
    });

    return () => {
      pusher.unsubscribe("notifications");
    };
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl w-full">
      <h2 className="text-xl font-semibold mb-4">Teacher Notifications</h2>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-md" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <p className="text-muted-foreground">No notifications yet.</p>
      ) : (
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {notifications.map((n) => (
              <Card key={n.id} className="bg-muted">
                <CardContent className="p-4 space-y-1">
                  <h3 className="font-medium">{n.title}</h3>
                  <p className="text-sm text-gray-600">{n.message}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(n.sent_at).toLocaleString()}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
