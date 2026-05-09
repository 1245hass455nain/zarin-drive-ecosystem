import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Bell,
  CheckCircle2,
  Clock,
  MapPin,
  Search,
  Star,
  Wallet,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { MapView } from "../../components/MapView";
import { driverCoordinates, mockDrivers } from "../../data/mockDrivers";
import { GWADAR_CENTER, gwadarLocations } from "../../data/mockLocations";
import type { GwadarLocation } from "../../data/mockLocations";
import { useTranslation } from "../../i18n/useTranslation";
import { useAuthStore } from "../../stores/authStore";
import { useCustomerStore } from "../../stores/customerStore";
import { useNotificationStore } from "../../stores/notificationStore";

const ONLINE_DRIVERS = mockDrivers.filter((d) => d.status === "online");

const driverMarkers = ONLINE_DRIVERS.slice(0, 9).map((d) => ({
  id: d.id,
  lat: driverCoordinates[d.id]?.lat ?? GWADAR_CENTER.lat,
  lng: driverCoordinates[d.id]?.lng ?? GWADAR_CENTER.lng,
  vehicleType: d.vehicleType,
  status: d.status,
  name: d.name,
}));

const SUGGESTED_PLACES = [
  {
    id: "sp-1",
    name: "Gwadar Port",
    icon: "⚓",
    distance: "2.3 km",
    locKey: "Gwadar Port",
  },
  {
    id: "sp-2",
    name: "Serena Hotel",
    icon: "🏨",
    distance: "1.8 km",
    locKey: "Serena Hotel",
  },
  {
    id: "sp-3",
    name: "Fish Harbour",
    icon: "🐟",
    distance: "3.1 km",
    locKey: "Fish Harbour",
  },
  {
    id: "sp-4",
    name: "Gwadar Beach",
    icon: "🌊",
    distance: "0.9 km",
    locKey: "Gwadar Beach",
  },
  {
    id: "sp-5",
    name: "Airport",
    icon: "✈️",
    distance: "11.2 km",
    locKey: "Gwadar International Airport",
  },
];

interface HomePageProps {
  onSelectDestination: (destination: GwadarLocation) => void;
  onOpenProfile: () => void;
}

export default function HomePage({
  onSelectDestination,
  onOpenProfile,
}: HomePageProps) {
  const { t } = useTranslation();
  const customerUser = useAuthStore((s) => s.customerUser);
  const { recentSearches, addRecentSearch } = useCustomerStore();
  const { notifications, markAllAsRead } = useNotificationStore();
  const [destQuery, setDestQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showNotifPanel, setShowNotifPanel] = useState(false);

  const unreadCount = notifications.filter(
    (n) => !n.isRead && n.target === "customer",
  ).length;
  const customerNotifs = notifications
    .filter((n) => n.target === "customer")
    .slice(0, 15);

  const filteredLocations =
    destQuery.length > 0
      ? gwadarLocations.filter(
          (l) =>
            l.name.toLowerCase().includes(destQuery.toLowerCase()) ||
            l.address.toLowerCase().includes(destQuery.toLowerCase()),
        )
      : gwadarLocations.slice(0, 8);

  function handleSelectLocation(loc: GwadarLocation) {
    addRecentSearch(loc.name);
    setDestQuery(loc.name);
    setShowSuggestions(false);
    onSelectDestination(loc);
  }

  const firstName = customerUser?.name?.split(" ")[0] ?? "Guest";
  const initials = customerUser?.name
    ? customerUser.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "G";

  return (
    <div
      className="flex flex-col h-screen bg-background overflow-hidden"
      data-ocid="home.page"
    >
      {/* Header */}
      <header className="bg-card border-b border-border px-4 pt-4 pb-3 z-20 relative shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-ocid="home.profile_button"
              onClick={onOpenProfile}
              className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center text-primary font-bold text-sm transition-smooth hover:border-primary hover:scale-105"
              aria-label="Open profile"
            >
              {initials}
            </button>
            <div>
              <p className="text-xs text-muted-foreground">
                {t("customer.hello")},
              </p>
              <p className="text-base font-display font-bold text-foreground leading-tight">
                {firstName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Wallet chip */}
            <div className="flex items-center gap-1 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5">
              <Wallet className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary">
                PKR {(customerUser?.walletBalance ?? 0).toLocaleString()}
              </span>
            </div>

            {/* Notification bell */}
            <button
              type="button"
              data-ocid="home.notifications_button"
              onClick={() => setShowNotifPanel(true)}
              className="relative w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/40 transition-smooth"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Map + bottom overlay */}
      <div className="relative flex-1 overflow-hidden">
        <MapView
          center={GWADAR_CENTER}
          zoom={13}
          showUserLocation
          drivers={driverMarkers}
          className="absolute inset-0 z-0"
        />

        {/* Online drivers badge */}
        <div className="absolute top-3 left-3 z-10">
          <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur-sm border border-primary/30 rounded-full px-3 py-1.5 shadow-card">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">
              {ONLINE_DRIVERS.length} drivers nearby
            </span>
          </div>
        </div>

        {/* Rating badge */}
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-1 bg-card/90 backdrop-blur-sm border border-border rounded-full px-3 py-1.5 shadow-card">
            <Star className="w-3 h-3 text-primary fill-primary" />
            <span className="text-xs text-foreground font-medium">4.8</span>
          </div>
        </div>

        {/* Bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          {/* Search panel */}
          <div className="mx-3 mb-2">
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="bg-card/96 backdrop-blur-md rounded-2xl border border-border shadow-elevated overflow-hidden"
            >
              {/* Pickup row */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <div className="w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/20 shrink-0" />
                <span className="text-sm text-foreground truncate min-w-0 flex-1">
                  Gwadar City Centre
                </span>
                <span className="ml-auto text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full shrink-0">
                  {t("customer.currentLocation")}
                </span>
              </div>

              {/* Destination input */}
              <div className="flex items-center gap-3 px-4 py-3">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <Input
                  data-ocid="home.destination_input"
                  type="text"
                  placeholder={t("customer.whereToGo")}
                  value={destQuery}
                  onChange={(e) => {
                    setDestQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="border-none bg-transparent shadow-none focus-visible:ring-0 p-0 text-sm text-foreground placeholder:text-muted-foreground h-auto flex-1 min-w-0"
                />
                {destQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setDestQuery("");
                      setShowSuggestions(false);
                    }}
                    aria-label="Clear destination"
                    className="text-muted-foreground hover:text-foreground transition-smooth shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Location suggestions */}
              {showSuggestions && (
                <div
                  className="border-t border-border max-h-56 overflow-y-auto"
                  data-ocid="home.suggestions_list"
                >
                  {filteredLocations.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-muted-foreground">
                      No locations found for "{destQuery}"
                    </p>
                  ) : (
                    filteredLocations.map((loc, i) => (
                      <button
                        key={loc.id}
                        type="button"
                        data-ocid={`home.suggestion.item.${i + 1}`}
                        onClick={() => handleSelectLocation(loc)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/40 text-left transition-smooth border-b border-border/40 last:border-0"
                      >
                        <div className="w-7 h-7 rounded-lg bg-muted/60 flex items-center justify-center shrink-0">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground truncate">
                            {loc.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {loc.address}
                          </p>
                        </div>
                        <span className="text-[10px] text-muted-foreground/60 shrink-0 capitalize">
                          {loc.category}
                        </span>
                      </button>
                    ))
                  )}
                  <button
                    type="button"
                    onClick={() => setShowSuggestions(false)}
                    className="w-full px-4 py-2 text-xs text-muted-foreground/60 hover:text-muted-foreground border-t border-border/30 transition-smooth"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Recent + Suggested chips */}
          {!showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card/96 backdrop-blur-md border-t border-border px-4 py-3"
            >
              {recentSearches.length > 0 && (
                <div className="mb-3">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                    {t("customer.recentSearches")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.slice(0, 4).map((s, i) => (
                      <button
                        key={s}
                        type="button"
                        data-ocid={`home.recent_search.item.${i + 1}`}
                        onClick={() => {
                          const loc = gwadarLocations.find((l) => l.name === s);
                          if (loc) handleSelectLocation(loc);
                        }}
                        className="flex items-center gap-1.5 bg-muted/50 border border-border rounded-full px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-smooth"
                      >
                        <Clock className="w-3 h-3" />
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                {t("customer.suggestedPlaces")}
              </p>
              <div className="grid grid-cols-5 gap-2">
                {SUGGESTED_PLACES.map((p, i) => {
                  const loc = gwadarLocations.find((l) =>
                    l.name.includes(p.locKey.split(" ")[0]),
                  );
                  return (
                    <button
                      key={p.id}
                      type="button"
                      data-ocid={`home.suggested_place.item.${i + 1}`}
                      onClick={() => {
                        if (loc) handleSelectLocation(loc);
                      }}
                      className="flex flex-col items-center gap-1 p-2 rounded-xl border border-border bg-muted/30 hover:border-primary/30 hover:bg-primary/5 transition-smooth"
                    >
                      <span className="text-base">{p.icon}</span>
                      <span className="text-[9px] text-muted-foreground text-center leading-tight truncate w-full">
                        {p.name}
                      </span>
                      <span className="text-[9px] text-primary">
                        {p.distance}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Notifications slide-in panel */}
      <AnimatePresence>
        {showNotifPanel && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
              onClick={() => setShowNotifPanel(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-card border-l border-border z-50 flex flex-col shadow-elevated"
              data-ocid="notifications.panel"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-border">
                <div>
                  <h2 className="font-display font-bold text-foreground">
                    Notifications
                  </h2>
                  {unreadCount > 0 && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {unreadCount} unread
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      data-ocid="notifications.mark_all_read_button"
                      onClick={() => markAllAsRead("customer")}
                      className="text-xs text-primary hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    type="button"
                    data-ocid="notifications.close_button"
                    onClick={() => setShowNotifPanel(false)}
                    className="w-7 h-7 rounded-full bg-muted/40 flex items-center justify-center hover:bg-muted transition-smooth"
                    aria-label="Close notifications"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Notification list */}
              <div className="flex-1 overflow-y-auto py-2">
                {customerNotifs.length === 0 ? (
                  <div
                    className="flex flex-col items-center justify-center h-full gap-3 px-4"
                    data-ocid="notifications.empty_state"
                  >
                    <Bell className="w-12 h-12 text-muted-foreground/20" />
                    <p className="text-sm text-muted-foreground text-center">
                      No notifications yet.
                      <br />
                      <span className="text-xs">
                        You'll see ride updates and promotions here.
                      </span>
                    </p>
                  </div>
                ) : (
                  customerNotifs.map((n, i) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      data-ocid={`notifications.item.${i + 1}`}
                      className={cn(
                        "mx-3 mb-2 rounded-xl p-3 border transition-smooth",
                        n.isRead
                          ? "bg-muted/20 border-border opacity-60"
                          : "bg-card border-primary/20 shadow-card",
                      )}
                    >
                      {!n.isRead && (
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-[10px] text-primary font-semibold uppercase tracking-wide">
                            {n.type}
                          </span>
                        </div>
                      )}
                      <p className="text-sm font-semibold text-foreground">
                        {n.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {n.message}
                      </p>
                      <p className="text-[10px] text-muted-foreground/50 mt-1.5">
                        {new Date(n.createdAt).toLocaleString()}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer CTA */}
              <div className="p-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full text-sm"
                  onClick={() => setShowNotifPanel(false)}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                  Done
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
