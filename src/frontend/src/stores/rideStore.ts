import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RideStatus =
  | "searching"
  | "accepted"
  | "arriving"
  | "reached"
  | "started"
  | "in_progress"
  | "completed"
  | "cancelled";

export type VehicleType = "bike" | "rickshaw" | "car" | "premium";
export type PaymentMethod = "cash" | "wallet" | "easypaisa" | "jazzcash";

export interface Ride {
  id: string;
  customerId: string;
  driverId: string;
  customerName: string;
  driverName: string;
  driverPhone: string;
  driverRating: number;
  driverPhoto: string;
  vehiclePlate: string;
  pickupAddress: string;
  dropAddress: string;
  pickupLat: number;
  pickupLng: number;
  dropLat: number;
  dropLng: number;
  vehicleType: VehicleType;
  baseFare: number;
  distanceKm: number;
  totalFare: number;
  status: RideStatus;
  paymentMethod: PaymentMethod;
  otp: string;
  rating?: number;
  feedback?: string;
  startTime: string;
  endTime?: string;
  createdAt: string;
}

interface RideState {
  rides: Ride[];
  activeRide: Ride | null;
  pendingRideRequest: Ride | null;
  setActiveRide: (ride: Ride | null) => void;
  setPendingRideRequest: (ride: Ride | null) => void;
  updateRideStatus: (rideId: string, status: RideStatus) => void;
  addRide: (ride: Ride) => void;
  updateRide: (rideId: string, updates: Partial<Ride>) => void;
  setRides: (rides: Ride[]) => void;
}

export const useRideStore = create<RideState>()(
  persist(
    (set) => ({
      rides: [],
      activeRide: null,
      pendingRideRequest: null,
      setActiveRide: (activeRide) => set({ activeRide }),
      setPendingRideRequest: (pendingRideRequest) =>
        set({ pendingRideRequest }),
      updateRideStatus: (rideId, status) =>
        set((state) => ({
          rides: state.rides.map((r) =>
            r.id === rideId ? { ...r, status } : r,
          ),
          activeRide:
            state.activeRide?.id === rideId
              ? { ...state.activeRide, status }
              : state.activeRide,
        })),
      addRide: (ride) => set((state) => ({ rides: [ride, ...state.rides] })),
      updateRide: (rideId, updates) =>
        set((state) => ({
          rides: state.rides.map((r) =>
            r.id === rideId ? { ...r, ...updates } : r,
          ),
          activeRide:
            state.activeRide?.id === rideId
              ? { ...state.activeRide, ...updates }
              : state.activeRide,
        })),
      setRides: (rides) => set({ rides }),
    }),
    { name: "zarin-ride-store" },
  ),
);
