"use client";

import { useState, useEffect } from "react";
import { NotificationManager, Notification } from "@/utils/notifications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, X, Check, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { formatDate } from "@/utils/anonymization";

interface NotificationPanelProps {
  userRole: string;
  personnelId?: string;
}

export default function NotificationPanel({ userRole, personnelId }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, [personnelId]);

  const loadNotifications = () => {
    const notifs = NotificationManager.getNotifications(personnelId);
    setNotifications(notifs);
    setUnreadCount(NotificationManager.getUnreadCount(personnelId));
  };

  const handleMarkRead = (id: string) => {
    NotificationManager.markAsRead(id);
    loadNotifications();
  };

  const handleMarkAllRead = () => {
    NotificationManager.markAllAsRead(personnelId);
    loadNotifications();
  };

  const handleDelete = (id: string) => {
    NotificationManager.deleteNotification(id);
    loadNotifications();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-700 border-red-200";
      case "high": return "bg-orange-100 text-orange-700 border-orange-200";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-green-100 text-green-700 border-green-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "alert": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "success": return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  if (notifications.length === 0) {
    return (
      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#0F766E]" />
              Notifications
            </CardTitle>
            <Badge variant="secondary">0</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-500">
            <Bell className="h-12 w-12 mx-auto mb-3 text-slate-300" />
            <p>No notifications yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#0F766E]" />
            Notifications
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={unreadCount > 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}>
              {unreadCount} unread
            </Badge>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
                <Check className="h-3 w-3 mr-1" />
                Mark all read
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.slice(0, 10).map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                  !notification.read ? "bg-blue-50 border-blue-100" : "bg-white border-slate-100 hover:bg-slate-50"
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className={`font-medium text-sm ${!notification.read ? "text-slate-900" : "text-slate-600"}`}>
                      {notification.title}
                    </h4>
                    <div className="flex items-center gap-1">
                      <Badge variant="secondary" className={getPriorityColor(notification.priority)}>
                        {notification.priority}
                      </Badge>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 p-0"
                          onClick={() => handleMarkRead(notification.id)}
                        >
                          <Check className="h-3 w-3 text-green-500" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 p-0"
                        onClick={() => handleDelete(notification.id)}
                      >
                        <X className="h-3 w-3 text-slate-400" />
                      </Button>
                    </div>
                  </div>
                  <p className={`text-sm mt-1 ${!notification.read ? "text-slate-700" : "text-slate-500"}`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                    <span>{formatDate(notification.timestamp)}</span>
                    <span>•</span>
                    <span className="capitalize">{notification.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}