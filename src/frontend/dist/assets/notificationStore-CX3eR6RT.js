import { h as create, p as persist } from "./index-D2S5mC_U.js";
const useNotificationStore = create()(
  persist(
    (set, get) => ({
      notifications: [],
      addNotification: (n) => set((state) => ({
        notifications: [
          {
            ...n,
            id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            isRead: false,
            createdAt: (/* @__PURE__ */ new Date()).toISOString()
          },
          ...state.notifications
        ].slice(0, 100)
      })),
      markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(
          (n) => n.id === id ? { ...n, isRead: true } : n
        )
      })),
      markAllAsRead: (target) => set((state) => ({
        notifications: state.notifications.map(
          (n) => n.target === target ? { ...n, isRead: true } : n
        )
      })),
      clearNotifications: (target) => set((state) => ({
        notifications: state.notifications.filter((n) => n.target !== target)
      })),
      getUnreadCount: (target, targetId) => {
        const { notifications } = get();
        return notifications.filter(
          (n) => !n.isRead && n.target === target && (targetId ? n.targetId === targetId : true)
        ).length;
      }
    }),
    { name: "zarin-notification-store" }
  )
);
export {
  useNotificationStore as u
};
