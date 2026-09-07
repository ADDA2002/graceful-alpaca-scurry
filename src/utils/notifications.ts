/**
 * Notification System for Welfare Alerts
 * Handles push notifications, email alerts, and in-app notifications
 */

export interface Notification {
  id: string;
  type: "alert" | "info" | "warning" | "success";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: "low" | "medium" | "high" | "critical";
  category: "welfare" | "biometric" | "system" | "compliance";
  personnelId?: string;
  actionUrl?: string;
}

export interface NotificationPreferences {
  emailEnabled: boolean;
  pushEnabled: boolean;
  smsEnabled: boolean;
  categories: string[];
  quietHours: {
    start: string;
    end: string;
  };
}

export class NotificationManager {
  private static notifications: Notification[] = [];
  private static preferences: NotificationPreferences = {
    emailEnabled: true,
    pushEnabled: true,
    smsEnabled: false,
    categories: ["welfare", "biometric", "system", "compliance"],
    quietHours: { start: "22:00", end: "07:00" }
  };

  static createNotification(
    type: Notification["type"],
    title: string,
    message: string,
    priority: Notification["priority"] = "medium",
    category: Notification["category"] = "system",
    personnelId?: string
  ): Notification {
    const notification: Notification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      priority,
      category,
      personnelId
    };

    this.notifications.unshift(notification);
    this.saveToStorage();
    return notification;
  }

  static getNotifications(personnelId?: string): Notification[] {
    this.loadFromStorage();
    if (personnelId) {
      return this.notifications.filter(n => n.personnelId === personnelId);
    }
    return this.notifications;
  }

  static markAsRead(notificationId: string): void {
    const notif = this.notifications.find(n => n.id === notificationId);
    if (notif) {
      notif.read = true;
      this.saveToStorage();
    }
  }

  static markAllAsRead(personnelId?: string): void {
    const notifs = personnelId
      ? this.notifications.filter(n => n.personnelId === personnelId)
      : this.notifications;
    notifs.forEach(n => (n.read = true));
    this.saveToStorage();
  }

  static deleteNotification(notificationId: string): void {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.saveToStorage();
  }

  static getUnreadCount(personnelId?: string): number {
    const notifs = personnelId
      ? this.notifications.filter(n => n.personnelId === personnelId && !n.read)
      : this.notifications.filter(n => !n.read);
    return notifs.length;
  }

  static getCriticalAlerts(personnelId?: string): Notification[] {
    return this.getNotifications(personnelId).filter(
      n => n.priority === "critical" && !n.read
    );
  }

  static generateWelfareAlert(
    personnelId: string,
    riskLevel: string,
    score: number,
    factors: string[]
  ): Notification {
    return this.createNotification(
      "alert",
      `Welfare Alert: ${riskLevel.toUpperCase()} Risk Detected`,
      `Personnel ${personnelId} has been flagged with a ${riskLevel} risk score of ${score}/100. Key factors: ${factors.join(", ")}. Immediate review recommended.`,
      riskLevel === "critical" ? "critical" : "high",
      "welfare",
      personnelId
    );
  }

  static generateBiometricAlert(
    personnelId: string,
    metric: string,
    value: string,
    status: string
  ): Notification {
    return this.createNotification(
      "warning",
      `Biometric Alert: ${metric} ${status}`,
      `Personnel ${personnelId} shows ${metric} at ${value} which is outside normal range. Status: ${status}.`,
      "high",
      "biometric",
      personnelId
    );
  }

  static generateComplianceNotification(
    personnelId: string,
    action: string,
    details: string
  ): Notification {
    return this.createNotification(
      "info",
      `Compliance: ${action}`,
      `Personnel ${personnelId}: ${details}`,
      "medium",
      "compliance",
      personnelId
    );
  }

  static updatePreferences(prefs: Partial<NotificationPreferences>): void {
    this.preferences = { ...this.preferences, ...prefs };
    localStorage.setItem("notification-preferences", JSON.stringify(this.preferences));
  }

  static getPreferences(): NotificationPreferences {
    const stored = localStorage.getItem("notification-preferences");
    if (stored) {
      return JSON.parse(stored);
    }
    return this.preferences;
  }

  static isQuietHours(): boolean {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const { start, end } = this.preferences.quietHours;
    return currentTime >= start && currentTime <= end;
  }

  private static saveToStorage(): void {
    localStorage.setItem("notifications", JSON.stringify(this.notifications));
  }

  private static loadFromStorage(): void {
    const stored = localStorage.getItem("notifications");
    if (stored) {
      this.notifications = JSON.parse(stored);
    }
  }
}