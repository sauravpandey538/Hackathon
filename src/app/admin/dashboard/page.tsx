// pages/admin/dashboard.tsx

import NotificationList from "./notification-list";
import NotificationSender from "./notification-sender";
import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className=" md:container w-full flex space-x-8">
      {/* Right side: List of all notifications */}
      <div className="flex-1">
        <NotificationList />
      </div>
      {/* Left side: Notification sender form */}
      <div className="flex-1">
        <NotificationSender />
      </div>
    </div>
  );
};

export default AdminDashboard;
