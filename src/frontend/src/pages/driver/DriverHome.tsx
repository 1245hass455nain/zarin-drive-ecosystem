import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { navigate } from "../../App";
import { MapView } from "../../components/MapView";
import { GWADAR_CENTER } from "../../data/mockLocations";
import { useAuthStore } from "../../stores/authStore";
import { useRideStore } from "../../stores/rideStore";
import type { Ride } from "../../stores/rideStore";

const MOCK_REQUESTS: Omit<Ride, "id" | "startTime" | "createdAt">[] = [
  {
    customerId: "cust-3",
    driverId: "driver-1",
    customerName: "Sana Zehri",
    driverName: "",
    driverPhone: "",
    driverRating: 0,
    driverPhoto: "",
    vehiclePlate: "",
    pickupAddress: "Gwadar Port",
    dropAddress: "Serena Hotel",
    pickupLat: 25.1196,
    pickupLng: 62.3295,
    dropLat: 25.1177,
    dropLng: 62.344,
    vehicleType: "car",
    baseFare: 150,
    distanceKm: 3.2,
    totalFare: 278,
    status: "searching",
    paymentMethod: "cash",
    otp: "4821",
  },
  {
    customerId: "cust-5",
    driverId: "driver-1",
    customerName: "Fatima Kalmati",
    driverName: "",
    driverPhone: "",
    driverRating: 0,
    driverPhoto: "",
    vehiclePlate: "",
    pickupAddress: "Marina Club",
    dropAddress: "Gwadar Airport",
    pickupLat: 25.115,
    pickupLng: 62.34,
    dropLat: 25.2333,
    dropLng: 62.3297,
    vehicleType: "premium",
    baseFare: 250,
    distanceKm: 12.8,
    totalFare: 1018,
    status: "searching",
    paymentMethod: "jazzcash",
    otp: "2951",
  },
  {
    customerId: "cust-7",
    driverId: "driver-1",
    customerName: "Rukhsar Ahmed",
    driverName: "",
    driverPhone: "",
    driverRating: 0,
    driverPhoto: "",
    vehiclePlate: "",
    pickupAddress: "Fish Harbour",
    dropAddress: "Downtown Market",
    pickupLat: 25.11,
    pickupLng: 62.33,
    dropLat: 25.128,
    dropLng: 62.318,
    vehicleType: "bike",
    baseFare: 80,
    distanceKm: 2.1,
    totalFare: 122,
    status: "searching",
    paymentMethod: "cash",
    otp: "7364",
  },
];

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: "🏠" },
  { key: "earnings", label: "Earnings", icon: "💰" },
  { key: "rank", label: "Rank", icon: "🏆" },
  { key: "profile", label: "Profile", icon: "👤" },
] as const;

export default function DriverHome() {
  const driver = useAuthStore((s) => s.driverUser);
  const [isOnline, setIsOnline] = useState(driver?.status === "online");
  const [activeNav, setActiveNav] = useState<
    "home" | "earnings" | "rank" | "profile"
  >("home");
  const [request, setRequest] = useState<(typeof MOCK_REQUESTS)[0] | null>(
    null,
  );
  const [timer, setTimer] = useState(30);
  const [_requestIdx, setRequestIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scheduleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const setActiveRide = useRideStore((s) => s.setActiveRide);

  const todayEarnings = 1840;
  const todayTrips = 7;

  // Simulate ride requests every 45s when online
  useEffect(() => {
    if (!isOnline) {
      setRequest(null);
      if (scheduleRef.current) clearInterval(scheduleRef.current);
      return;
    }
    const initial = setTimeout(() => showRequest(), 5000);
    scheduleRef.current = setInterval(() => showRequest(), 45000);
    return () => {
      clearTimeout(initial);
      if (scheduleRef.current) clearInterval(scheduleRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  function showRequest() {
    setRequestIdx((i) => {
      const r = MOCK_REQUESTS[i % MOCK_REQUESTS.length];
      setRequest(r);
      setTimer(30);
      return i + 1;
    });
  }

  // Countdown timer
  useEffect(() => {
    if (!request) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setRequest(null);
          toast.info("Ride request expired");
          return 30;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [request]);

  function handleAccept() {
    if (!request || !driver) return;
    const ride: Ride = {
      ...request,
      id: `ride-live-${Date.now()}`,
      driverId: driver.id,
      driverName: driver.name,
      driverPhone: driver.phone,
      vehiclePlate: driver.vehiclePlate,
      startTime: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    setActiveRide(ride);
    setRequest(null);
    if (timerRef.current) clearInterval(timerRef.current);
    sessionStorage.setItem("zarin-driver-page", "ride");
    navigate("driver", "ride");
  }

  function handleReject() {
    setRequest(null);
    if (timerRef.current) clearInterval(timerRef.current);
    toast.info("Ride request rejected");
  }

  function handleNavChange(key: (typeof NAV_ITEMS)[number]["key"]) {
    setActiveNav(key);
    if (key !== "home") {
      sessionStorage.setItem("zarin-driver-page", key);
      navigate("driver", key);
    }
  }

  if (!driver) {
    navigate("driver", "login");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top Bar */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between shadow-card">
        <div className="flex items-center gap-3">
          <span className="text-xl font-display font-bold text-primary">
            Zarin Pro
          </span>
          <Badge
            variant="outline"
            className="text-xs border-primary/40 text-primary"
          >
            Driver
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Wallet</p>
            <p className="text-sm font-bold text-primary">
              Rs. {driver.walletBalance.toLocaleString()}
            </p>
          </div>
          {/* Online toggle */}
          <button
            type="button"
            onClick={() => setIsOnline((v) => !v)}
            data-ocid="driver_home.online_toggle"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-smooth border"
            style={
              isOnline
                ? {
                    backgroundColor: "rgba(22,163,74,0.10)",
                    borderColor: "rgba(22,163,74,0.40)",
                    color: "#16a34a",
                  }
                : undefined
            }
          >
            <span
              className={`w-2 h-2 rounded-full ${isOnline ? "animate-pulse" : "bg-destructive"}`}
              style={isOnline ? { backgroundColor: "#4ade80" } : undefined}
            />
            {isOnline ? "Online" : "Offline"}
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="relative" style={{ height: "50vh" }}>
        <MapView
          center={GWADAR_CENTER}
          zoom={14}
          showUserLocation
          className="w-full h-full rounded-none"
        />
        {!isOnline && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center rounded-none">
            <div className="text-center">
              <p className="text-2xl mb-1">😴</p>
              <p className="text-muted-foreground text-sm font-medium">
                You are offline
              </p>
              <p className="text-xs text-muted-foreground">
                Go online to receive ride requests
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 px-4 py-4 space-y-4 pb-24">
        {/* Daily Earnings */}
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              Today's Earnings
            </p>
            <p className="text-2xl font-display font-bold text-primary">
              Rs. {todayEarnings.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {todayTrips} trips completed
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">
              Net (after 20%)
            </p>
            <p className="text-xl font-bold text-foreground">
              Rs. {(todayEarnings * 0.8).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Commission: Rs. {(todayEarnings * 0.2).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Ride Request Card */}
        {isOnline && request ? (
          <div
            className="bg-card border-2 border-primary/50 rounded-2xl p-4 shadow-elevated"
            data-ocid="driver_home.ride_request_card"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold text-foreground">
                  New Ride Request
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10">
                  <svg
                    className="w-10 h-10 -rotate-90"
                    viewBox="0 0 36 36"
                    aria-hidden="true"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="oklch(0.22 0 0)"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="oklch(0.65 0.22 90)"
                      strokeWidth="3"
                      strokeDasharray={`${(timer / 30) * 94.2} 94.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary">
                    {timer}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-muted rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-1000"
                style={{ width: `${(timer / 30) * 100}%` }}
              />
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-sm" style={{ color: "#4ade80" }}>
                  📍
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Pickup</p>
                  <p className="text-sm font-medium text-foreground">
                    {request.pickupAddress}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary mt-0.5 text-sm">🏁</span>
                <div>
                  <p className="text-xs text-muted-foreground">Drop-off</p>
                  <p className="text-sm font-medium text-foreground">
                    {request.dropAddress}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Est. Fare</p>
                <p className="text-lg font-bold text-primary">
                  Rs. {request.totalFare.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Distance</p>
                <p className="text-sm font-semibold text-foreground">
                  {request.distanceKm} km
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Your Earn</p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#4ade80" }}
                >
                  Rs. {(request.totalFare * 0.8).toFixed(0)}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleReject}
                variant="outline"
                className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10"
                data-ocid="driver_home.reject_button"
              >
                Reject
              </Button>
              <Button
                onClick={handleAccept}
                className="flex-1 font-semibold"
                style={{ backgroundColor: "#16a34a", color: "#ffffff" }}
                data-ocid="driver_home.accept_button"
              >
                Accept
              </Button>
            </div>
          </div>
        ) : isOnline ? (
          <div
            className="bg-card border border-dashed border-border rounded-2xl p-8 text-center"
            data-ocid="driver_home.waiting_state"
          >
            <p className="text-2xl mb-2">🔍</p>
            <p className="text-sm font-medium text-foreground">
              Waiting for ride requests...
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              New requests appear here automatically
            </p>
          </div>
        ) : null}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 flex justify-around">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => handleNavChange(item.key)}
            data-ocid={`driver_home.nav_${item.key}`}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-smooth ${
              activeNav === item.key
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
