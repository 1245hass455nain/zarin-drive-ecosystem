import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DriverUser } from "./authStore";

export interface DriverEarnings {
  driverId: string;
  today: number;
  thisWeek: number;
  thisMonth: number;
  commission: number;
  pendingDues: number;
}

interface DriverState {
  drivers: DriverUser[];
  earnings: Record<string, DriverEarnings>;
  activationCodes: ActivationCode[];
  setDrivers: (drivers: DriverUser[]) => void;
  updateDriverStatus: (driverId: string, status: DriverUser["status"]) => void;
  updateDriverEarnings: (driverId: string, amount: number) => void;
  addActivationCode: (code: ActivationCode) => void;
  markCodeUsed: (code: string) => void;
}

export interface ActivationCode {
  code: string;
  expiresAt: string;
  isUsed: boolean;
  driverId?: string;
  createdAt: string;
}

export const useDriverStore = create<DriverState>()(
  persist(
    (set) => ({
      drivers: [],
      earnings: {},
      activationCodes: [],
      setDrivers: (drivers) => set({ drivers }),
      updateDriverStatus: (driverId, status) =>
        set((state) => ({
          drivers: state.drivers.map((d) =>
            d.id === driverId ? { ...d, status } : d,
          ),
        })),
      updateDriverEarnings: (driverId, amount) =>
        set((state) => {
          const current = state.earnings[driverId] ?? {
            driverId,
            today: 0,
            thisWeek: 0,
            thisMonth: 0,
            commission: 0,
            pendingDues: 0,
          };
          const commission = amount * 0.2;
          return {
            earnings: {
              ...state.earnings,
              [driverId]: {
                ...current,
                today: current.today + amount,
                thisWeek: current.thisWeek + amount,
                thisMonth: current.thisMonth + amount,
                commission: current.commission + commission,
                pendingDues: current.pendingDues + commission,
              },
            },
          };
        }),
      addActivationCode: (code) =>
        set((state) => ({
          activationCodes: [code, ...state.activationCodes],
        })),
      markCodeUsed: (code) =>
        set((state) => ({
          activationCodes: state.activationCodes.map((c) =>
            c.code === code ? { ...c, isUsed: true } : c,
          ),
        })),
    }),
    { name: "zarin-driver-store" },
  ),
);
