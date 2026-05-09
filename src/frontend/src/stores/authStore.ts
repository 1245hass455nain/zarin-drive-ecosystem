import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CustomerUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  walletBalance: number;
  totalRides: number;
  profilePhoto: string;
}

export interface DriverUser {
  id: string;
  name: string;
  phone: string;
  vehicleType: "bike" | "rickshaw" | "car" | "premium";
  vehiclePlate: string;
  rank: "gold" | "diamond" | "platinum";
  walletBalance: number;
  status: "online" | "offline" | "on_ride";
  rating: number;
  activationCode: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "manager" | "support";
}

interface AuthState {
  customerUser: CustomerUser | null;
  driverUser: DriverUser | null;
  adminUser: AdminUser | null;
  isCustomerLoggedIn: boolean;
  isDriverLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  customerLogin: (user: CustomerUser) => void;
  customerLogout: () => void;
  driverLogin: (user: DriverUser) => void;
  driverLogout: () => void;
  adminLogin: (user: AdminUser) => void;
  adminLogout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      customerUser: null,
      driverUser: null,
      adminUser: null,
      isCustomerLoggedIn: false,
      isDriverLoggedIn: false,
      isAdminLoggedIn: false,
      customerLogin: (customerUser) =>
        set({ customerUser, isCustomerLoggedIn: true }),
      customerLogout: () =>
        set({ customerUser: null, isCustomerLoggedIn: false }),
      driverLogin: (driverUser) => set({ driverUser, isDriverLoggedIn: true }),
      driverLogout: () => set({ driverUser: null, isDriverLoggedIn: false }),
      adminLogin: (adminUser) => set({ adminUser, isAdminLoggedIn: true }),
      adminLogout: () => set({ adminUser: null, isAdminLoggedIn: false }),
    }),
    { name: "zarin-auth-store" },
  ),
);
