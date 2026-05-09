import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NotificationTarget = "customer" | "driver" | "admin";
export type NotificationType = "ride" | "promo" | "wallet" | "system" | "alert";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  target: NotificationTarget;
  targetId?: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (
    n: Omit<Notification, "id" | "isRead" | "createdAt">,
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: (target: NotificationTarget) => void;
  clearNotifications: (target: NotificationTarget) => void;
  getUnreadCount: (target: NotificationTarget, targetId?: string) => number;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      addNotification: (n) =>
        set((state) => ({
          notifications: [
            {
              ...n,
              id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
              isRead: false,
              createdAt: new Date().toISOString(),
            },
            ...state.notifications,
          ].slice(0, 100),
        })),
      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n,
          ),
        })),
      markAllAsRead: (target) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.target === target ? { ...n, isRead: true } : n,
          ),
        })),
      clearNotifications: (target) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.target !== target),
        })),
      getUnreadCount: (target, targetId) => {
        const { notifications } = get();
        return notifications.filter(
          (n) =>
            !n.isRead &&
            n.target === target &&
            (targetId ? n.targetId === targetId : true),
        ).length;
      },
    }),
    { name: "zarin-notification-store" },
  ),
);
