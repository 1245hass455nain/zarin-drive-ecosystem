import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { navigate } from "../../App";
import { MapView } from "../../components/MapView";
import { useAuthStore } from "../../stores/authStore";
import { useDriverStore } from "../../stores/driverStore";
import { useRideStore } from "../../stores/rideStore";

type ExecStage = "navigating" | "arrived" | "in_ride" | "completed";

const STAGE_LABELS: Record<ExecStage, string> = {
  navigating: "Navigate to Pickup",
  arrived: "Verify OTP",
  in_ride: "Ride in Progress",
  completed: "Ride Completed",
};

const STAGE_STEPS: ExecStage[] = [
  "navigating",
  "arrived",
  "in_ride",
  "completed",
];

export default function RideExecution() {
  const ride = useRideStore((s) => s.activeRide);
  const setActiveRide = useRideStore((s) => s.setActiveRide);
  const updateDriverEarnings = useDriverStore((s) => s.updateDriverEarnings);
  const driver = useAuthStore((s) => s.driverUser);

  const [stage, setStage] = useState<ExecStage>("navigating");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [eta, setEta] = useState(8);
  const [rideSeconds, setRideSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ETA countdown for navigation
  useEffect(() => {
    if (stage !== "navigating") return;
    timerRef.current = setInterval(() => {
      setEta((t) => Math.max(0, t - 1));
    }, 10000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stage]);

  // Ride timer
  useEffect(() => {
    if (stage !== "in_ride") return;
    timerRef.current = setInterval(() => {
      setRideSeconds((s) => s + 1);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stage]);

  function handleArrived() {
    if (timerRef.current) clearInterval(timerRef.current);
    setStage("arrived");
    toast.success("Arrived at pickup location");
  }

  function handleStartRide() {
    if (otp.length < 4) {
      setOtpError("Enter 4-digit OTP from customer");
      return;
    }
    setOtpError("");
    setStage("in_ride");
    toast.success("Ride started!");
  }

  function handleEndRide() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (driver && ride) updateDriverEarnings(driver.id, ride.totalFare);
    setStage("completed");
    toast.success("Ride completed!");
  }

  function handleDone() {
    setActiveRide(null);
    sessionStorage.setItem("zarin-driver-page", "home");
    navigate("driver", "home");
  }

  if (!ride) {
    navigate("driver", "home");
    return null;
  }

  const grossFare = ride.totalFare;
  const commission = grossFare * 0.2;
  const netEarnings = grossFare - commission;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const currentIdx = STAGE_STEPS.indexOf(stage);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <span className="font-display font-bold text-primary text-lg">
            Zarin Pro
          </span>
          <span className="text-sm font-medium text-foreground">
            {STAGE_LABELS[stage]}
          </span>
        </div>
        {/* Stage progress */}
        <div
          className="flex items-center gap-1"
          data-ocid="ride_exec.progress_indicator"
        >
          {STAGE_STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${
                  i < currentIdx
                    ? "bg-primary text-primary-foreground"
                    : i === currentIdx
                      ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {i < currentIdx ? "✓" : i + 1}
              </div>
              {i < STAGE_STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1 ${i < currentIdx ? "bg-primary" : "bg-muted"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div style={{ height: "38vh" }} className="relative">
        <MapView
          center={{ lat: ride.pickupLat, lng: ride.pickupLng }}
          zoom={14}
          pickupLocation={
            stage !== "in_ride"
              ? {
                  lat: ride.pickupLat,
                  lng: ride.pickupLng,
                  label: ride.pickupAddress,
                }
              : undefined
          }
          dropLocation={
            stage === "in_ride" || stage === "completed"
              ? {
                  lat: ride.dropLat,
                  lng: ride.dropLng,
                  label: ride.dropAddress,
                }
              : undefined
          }
          routePoints={
            stage === "in_ride"
              ? [
                  { lat: ride.pickupLat, lng: ride.pickupLng },
                  {
                    lat: (ride.pickupLat + ride.dropLat) / 2,
                    lng: (ride.pickupLng + ride.dropLng) / 2 + 0.01,
                  },
                  { lat: ride.dropLat, lng: ride.dropLng },
                ]
              : []
          }
          showUserLocation
          className="w-full h-full rounded-none"
        />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4 pb-6 space-y-4">
        {/* Customer info strip */}
        <div className="bg-card border border-border rounded-xl px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Customer</p>
            <p className="text-sm font-semibold text-foreground">
              {ride.customerName}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Fare</p>
            <p className="text-sm font-bold text-primary">
              Rs. {ride.totalFare.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Stage: Navigating */}
        {stage === "navigating" && (
          <div
            className="bg-card border border-border rounded-2xl p-4 space-y-3"
            data-ocid="ride_exec.navigating_panel"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <p className="text-xs text-muted-foreground">Pickup Location</p>
                <p className="text-base font-semibold text-foreground">
                  {ride.pickupAddress}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-muted/40 rounded-xl px-3 py-2">
              <span className="text-primary">⏱️</span>
              <p className="text-sm">
                Estimated arrival:{" "}
                <span className="font-bold text-foreground">{eta} min</span>
              </p>
            </div>
            <Button
              onClick={handleArrived}
              className="w-full bg-primary text-primary-foreground font-semibold h-12 text-base"
              data-ocid="ride_exec.arrived_button"
            >
              I've Arrived
            </Button>
          </div>
        )}

        {/* Stage: Arrived - OTP */}
        {stage === "arrived" && (
          <div
            className="bg-card border border-border rounded-2xl p-4 space-y-3"
            data-ocid="ride_exec.otp_panel"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🔐</span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Verify Customer OTP
                </p>
                <p className="text-xs text-muted-foreground">
                  Ask customer for their 4-digit OTP
                </p>
              </div>
            </div>
            <Input
              type="number"
              placeholder="Enter 4-digit OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.slice(0, 4));
                setOtpError("");
              }}
              className="bg-background border-input text-center text-2xl tracking-widest font-mono h-14"
              maxLength={4}
              data-ocid="ride_exec.otp_input"
            />
            {otpError && (
              <p
                className="text-destructive text-xs"
                data-ocid="ride_exec.otp_error"
              >
                {otpError}
              </p>
            )}
            <Button
              onClick={handleStartRide}
              className="w-full bg-primary text-primary-foreground font-semibold h-12"
              data-ocid="ride_exec.start_ride_button"
            >
              Start Ride
            </Button>
          </div>
        )}

        {/* Stage: In Ride */}
        {stage === "in_ride" && (
          <div
            className="bg-card border border-border rounded-2xl p-4 space-y-3"
            data-ocid="ride_exec.in_ride_panel"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "#4ade80" }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#4ade80" }}
                >
                  Ride in Progress
                </span>
              </div>
              <span className="font-mono text-lg font-bold text-foreground">
                {formatTime(rideSeconds)}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏁</span>
              <div>
                <p className="text-xs text-muted-foreground">Drop-off</p>
                <p className="text-base font-semibold text-foreground">
                  {ride.dropAddress}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {ride.distanceKm} km total
                </p>
              </div>
            </div>
            <Button
              onClick={handleEndRide}
              className="w-full bg-destructive text-destructive-foreground font-semibold h-12"
              data-ocid="ride_exec.end_ride_button"
            >
              End Ride
            </Button>
          </div>
        )}

        {/* Stage: Completed */}
        {stage === "completed" && (
          <div
            className="bg-card border border-primary/30 rounded-2xl p-5 space-y-4"
            data-ocid="ride_exec.completion_card"
          >
            <div className="text-center">
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-lg font-display font-bold text-foreground">
                Ride Completed!
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground text-sm">
                  Gross Fare
                </span>
                <span className="font-semibold text-foreground">
                  Rs. {grossFare.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground text-sm">
                  Platform Commission (20%)
                </span>
                <span className="font-semibold text-destructive">
                  - Rs. {commission.toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-foreground">
                  Net Earnings
                </span>
                <span className="font-bold text-xl text-primary">
                  Rs. {netEarnings.toFixed(0)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-muted/40 rounded-xl px-3 py-2">
              <span>💳</span>
              <span className="text-sm text-muted-foreground">
                Payment:{" "}
                <span className="capitalize text-foreground font-medium">
                  {ride.paymentMethod}
                </span>
              </span>
            </div>
            <Button
              onClick={handleDone}
              className="w-full bg-primary text-primary-foreground font-semibold h-12"
              data-ocid="ride_exec.done_button"
            >
              Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
