import { h as create, p as persist } from "./index-D2S5mC_U.js";
const useCustomerStore = create()(
  persist(
    (set) => ({
      customers: [],
      savedPlaces: [],
      recentSearches: [],
      setCustomers: (customers) => set({ customers }),
      addSavedPlace: (place) => set((state) => ({ savedPlaces: [...state.savedPlaces, place] })),
      removeSavedPlace: (id) => set((state) => ({
        savedPlaces: state.savedPlaces.filter((p) => p.id !== id)
      })),
      addRecentSearch: (query) => set((state) => ({
        recentSearches: [
          query,
          ...state.recentSearches.filter((s) => s !== query)
        ].slice(0, 10)
      })),
      clearRecentSearches: () => set({ recentSearches: [] }),
      updateCustomerStatus: (customerId, status) => set((state) => ({
        customers: state.customers.map(
          (c) => c.id === customerId ? { ...c, status } : c
        )
      }))
    }),
    { name: "zarin-customer-store" }
  )
);
export {
  useCustomerStore as u
};
