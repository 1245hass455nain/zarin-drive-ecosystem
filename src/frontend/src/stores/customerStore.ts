import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SavedPlace {
  id: string;
  label: string;
  address: string;
  lat: number;
  lng: number;
  icon: "home" | "work" | "other";
}

export interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  walletBalance: number;
  totalRides: number;
  status: "active" | "suspended" | "banned";
  joinDate: string;
  profilePhoto: string;
}

interface CustomerState {
  customers: CustomerRecord[];
  savedPlaces: SavedPlace[];
  recentSearches: string[];
  setCustomers: (customers: CustomerRecord[]) => void;
  addSavedPlace: (place: SavedPlace) => void;
  removeSavedPlace: (id: string) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  updateCustomerStatus: (
    customerId: string,
    status: CustomerRecord["status"],
  ) => void;
}

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      customers: [],
      savedPlaces: [],
      recentSearches: [],
      setCustomers: (customers) => set({ customers }),
      addSavedPlace: (place) =>
        set((state) => ({ savedPlaces: [...state.savedPlaces, place] })),
      removeSavedPlace: (id) =>
        set((state) => ({
          savedPlaces: state.savedPlaces.filter((p) => p.id !== id),
        })),
      addRecentSearch: (query) =>
        set((state) => ({
          recentSearches: [
            query,
            ...state.recentSearches.filter((s) => s !== query),
          ].slice(0, 10),
        })),
      clearRecentSearches: () => set({ recentSearches: [] }),
      updateCustomerStatus: (customerId, status) =>
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === customerId ? { ...c, status } : c,
          ),
        })),
    }),
    { name: "zarin-customer-store" },
  ),
);
