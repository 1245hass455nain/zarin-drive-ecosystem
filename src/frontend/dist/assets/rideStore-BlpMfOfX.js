import { h as create, p as persist } from "./index-D2S5mC_U.js";
const useRideStore = create()(
  persist(
    (set) => ({
      rides: [],
      activeRide: null,
      pendingRideRequest: null,
      setActiveRide: (activeRide) => set({ activeRide }),
      setPendingRideRequest: (pendingRideRequest) => set({ pendingRideRequest }),
      updateRideStatus: (rideId, status) => set((state) => {
        var _a;
        return {
          rides: state.rides.map(
            (r) => r.id === rideId ? { ...r, status } : r
          ),
          activeRide: ((_a = state.activeRide) == null ? void 0 : _a.id) === rideId ? { ...state.activeRide, status } : state.activeRide
        };
      }),
      addRide: (ride) => set((state) => ({ rides: [ride, ...state.rides] })),
      updateRide: (rideId, updates) => set((state) => {
        var _a;
        return {
          rides: state.rides.map(
            (r) => r.id === rideId ? { ...r, ...updates } : r
          ),
          activeRide: ((_a = state.activeRide) == null ? void 0 : _a.id) === rideId ? { ...state.activeRide, ...updates } : state.activeRide
        };
      }),
      setRides: (rides) => set({ rides })
    }),
    { name: "zarin-ride-store" }
  )
);
export {
  useRideStore as u
};
