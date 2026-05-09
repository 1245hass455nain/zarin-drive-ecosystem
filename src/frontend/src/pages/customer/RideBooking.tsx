import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ArrowLeft,
  MessageSquare,
  Phone,
  Share2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { MapView } from "../../components/MapView";
import { StarRating } from "../../components/StarRating";
import { StatusBadge } from "../../components/StatusBadge";
import { driverCoordinates, mockDrivers } from "../../data/mockDrivers";
import { GWADAR_CENTER, gwadarLocations } from "../../data/mockLocations";
import { useTranslation } from "../../i18n/useTranslation";
import { useAuthStore } from "../../stores/authStore";
import { useNotificationStore } from "../../stores/notificationStore";
import {
  type PaymentMethod,
  type RideStatus,
  type VehicleType,
  useRideStore,
} from "../../stores/rideStore";

const PAYMENT_METHODS: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: "cash", label: "Cash", icon: "💵" },
  { id: "wallet", label: "Wallet", icon: "👛" },
  { id: "easypaisa", label: "Easypaisa", icon: "📱" },
  { id: "jazzcash", label: "JazzCash", icon: "📲" },
];

// Order of status progression
const STATUS_SEQUENCE: RideStatus[] = [
  "searching",
  "accepted",
  "arriving",
  "reached",
  "started",
  "in_progress",
  "completed",
];

interface RideBookingProps {
  vehicleType: VehicleType;
  fare: number;
  destination: { name: string; lat: number; lng: number } | null;
  onBack: () => void;
  onComplete: () => void;
}

export default function RideBooking({
  vehicleType,
  fare,
  destination,
  onBack,
  onComplete,
}: RideBookingProps) {
  const { t } = useTranslation();
  const customerUser = useAuthStore((s) => s.customerUser);
  const { addRide, updateRide } = useRideStore();
  const addNotification = useNotificationStore((s) => s.addNotification);

  const [status, setStatus] = useState<RideStatus>("searching");
  const [searchProgress, setSearchProgress] = useState(0);
  const [countdown, setCountdown] = useState(30);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("cash");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showSos, setShowSos] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [rideId] = useState(`ride-${Date.now()}`);
  const [rideTimer, setRideTimer] = useState(0);

  // Pick a reliable driver
  const assignedDriver = mockDrivers[2]; // Gul Hassan
  const otp = "4827";

  const driverPos = driverCoordinates[assignedDriver.id] ?? GWADAR_CENTER;
  const dropLoc = destination ?? gwadarLocations[0];

  const [animDriverPos, setAnimDriverPos] = useState(driverPos);
  const animFrameRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const moveDriver = useCallback(() => {
    setAnimDriverPos((prev) => ({
      lat: prev.lat + (Math.random() - 0.5) * 0.001,
      lng: prev.lng + (Math.random() - 0.5) * 0.001,
    }));
  }, []);

  // Driver movement animation
  useEffect(() => {
    if (status === "in_progress") {
      animFrameRef.current = setInterval(moveDriver, 2000);
    } else if (animFrameRef.current) {
      clearInterval(animFrameRef.current);
    }
    return () => {
      if (animFrameRef.current) clearInterval(animFrameRef.current);
    };
  }, [status, moveDriver]);

  // Ride timer
  useEffect(() => {
    if (status !== "in_progress") return;
    const interval = setInterval(() => setRideTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [status]);

  // Searching → accepted auto-progression
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs once per searching state
  useEffect(() => {
    if (status !== "searching") return;

    const progressInterval = setInterval(() => {
      setSearchProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 5;
      });
      setCountdown((c) => Math.max(0, c - 1.5));
    }, 900);

    const acceptTimer = setTimeout(() => {
      clearInterval(progressInterval);
      setStatus("accepted");
      const newRide = {
        id: rideId,
        customerId: customerUser?.id ?? "guest",
        driverId: assignedDriver.id,
        customerName: customerUser?.name ?? "Guest",
        driverName: assignedDriver.name,
        driverPhone: assignedDriver.phone,
        driverRating: assignedDriver.rating,
        driverPhoto: "",
        vehiclePlate: assignedDriver.vehiclePlate,
        pickupAddress: "Gwadar City Centre",
        dropAddress: dropLoc.name,
        pickupLat: GWADAR_CENTER.lat,
        pickupLng: GWADAR_CENTER.lng,
        dropLat: dropLoc.lat,
        dropLng: dropLoc.lng,
        vehicleType,
        baseFare: Math.round(fare * 0.6),
        distanceKm: 4.2,
        totalFare: fare,
        status: "accepted" as RideStatus,
        paymentMethod: selectedPayment,
        otp,
        startTime: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      addRide(newRide);
      addNotification({
        title: "Driver Accepted!",
        message: `${assignedDriver.name} is on the way. Vehicle: ${assignedDriver.vehiclePlate}`,
        type: "ride",
        target: "customer",
        targetId: customerUser?.id,
      });
    }, 14000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(acceptTimer);
    };
  }, [status]);

  // Auto-advance accepted → arriving → reached
  useEffect(() => {
    if (status === "accepted") {
      const t1 = setTimeout(() => setStatus("arriving"), 6000);
      const t2 = setTimeout(() => setStatus("reached"), 13000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [status]);

  function handleAdvance() {
    const idx = STATUS_SEQUENCE.indexOf(status);
    if (idx < STATUS_SEQUENCE.length - 1) {
      const next = STATUS_SEQUENCE[idx + 1];
      setStatus(next);
      updateRide(rideId, { status: next });
    }
  }

  function handlePayAndRate() {
    updateRide(rideId, {
      status: "completed",
      paymentMethod: selectedPayment,
      rating,
      feedback,
      endTime: new Date().toISOString(),
    });
    addNotification({
      title: "Ride Completed! 🎉",
      message: `You paid PKR ${fare} via ${selectedPayment}. Thanks for riding with Zarin Drive!`,
      type: "ride",
      target: "customer",
      targetId: customerUser?.id,
    });
    onComplete();
  }

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const driverMarker = [
    {
      id: assignedDriver.id,
      lat: animDriverPos.lat,
      lng: animDriverPos.lng,
      vehicleType: assignedDriver.vehicleType,
      status: assignedDriver.status,
      name: assignedDriver.name,
    },
  ];

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-ocid="ride_booking.page"
    >
      {/* Header */}
      <header className="bg-card border-b border-border px-4 h-14 flex items-center gap-3 shadow-card z-20 relative">
        {status === "searching" && (
          <button
            type="button"
            data-ocid="ride_booking.back_button"
            onClick={onBack}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted/50 transition-smooth"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-display font-bold text-foreground">
            {status === "searching" && "Finding your driver..."}
            {status === "accepted" && t("customer.driverAccepted")}
            {status === "arriving" && t("customer.driverArriving")}
            {status === "reached" && t("customer.driverReached")}
            {status === "started" && "Verify OTP to Start"}
            {status === "in_progress" && t("customer.rideInProgress")}
            {status === "completed" && t("customer.rideCompleted")}
          </h1>
          {status === "in_progress" && (
            <p className="text-xs text-primary font-mono">
              ⏱ {formatTimer(rideTimer)}
            </p>
          )}
        </div>
        <StatusBadge status={status} />
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* ---- SEARCHING STATE ---- */}
        {status === "searching" && (
          <div
            className="flex flex-col items-center justify-center min-h-[65vh] px-6"
            data-ocid="ride_booking.loading_state"
          >
            {/* Radar animation */}
            <div className="relative mb-8">
              <motion.div
                className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-primary/15"
                  animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.7,
                    ease: "easeOut",
                  }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">
                  {vehicleType === "bike"
                    ? "🏍️"
                    : vehicleType === "rickshaw"
                      ? "🛣️"
                      : vehicleType === "premium"
                        ? "🚙"
                        : "🚗"}
                </span>
              </div>
            </div>

            <h2 className="text-xl font-display font-bold text-foreground mb-2">
              Finding your {vehicleType} driver...
            </h2>
            <p className="text-sm text-muted-foreground mb-6 text-center">
              Matching you with the best available driver nearby
            </p>

            <div className="w-full max-w-xs bg-muted/30 rounded-full h-2 overflow-hidden mb-2">
              <motion.div
                className="h-full bg-primary rounded-full"
                style={{ width: `${searchProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(countdown)}s remaining
            </p>

            <div className="mt-8 bg-muted/30 border border-border rounded-xl px-4 py-3 w-full max-w-xs">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fare estimate</span>
                <span className="font-bold text-primary">PKR {fare}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-muted-foreground">Destination</span>
                <span className="font-medium text-foreground truncate max-w-32">
                  {dropLoc.name}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ---- ACCEPTED / ARRIVING / REACHED ---- */}
        {["accepted", "arriving", "reached"].includes(status) && (
          <div className="p-4 space-y-4">
            {/* Driver card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-primary/20 rounded-2xl p-4 shadow-elevated"
              data-ocid="ride_booking.driver_card"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center text-2xl font-display font-black text-primary">
                    {assignedDriver.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary border-2 border-card" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-lg text-foreground">
                    {assignedDriver.name}
                  </p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {assignedDriver.vehiclePlate}
                  </p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={
                          s <= Math.round(assignedDriver.rating)
                            ? "text-primary"
                            : "text-muted-foreground/30"
                        }
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">
                      {assignedDriver.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground">ETA</p>
                  <p className="text-xl font-display font-bold text-primary">
                    {status === "accepted"
                      ? "6 min"
                      : status === "arriving"
                        ? "3 min"
                        : "Here!"}
                  </p>
                </div>
              </div>

              {/* OTP display */}
              <div className="mt-3 flex items-center justify-between bg-muted/30 rounded-xl px-4 py-2.5">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t("customer.rideOtp")}
                  </p>
                  <p className="text-[10px] text-muted-foreground/60">
                    Show this to driver
                  </p>
                </div>
                <span className="font-mono font-black text-3xl text-primary tracking-[0.2em]">
                  {otp}
                </span>
              </div>
            </motion.div>

            {/* Map */}
            <div className="h-48 rounded-2xl overflow-hidden border border-border">
              <MapView
                center={GWADAR_CENTER}
                zoom={14}
                drivers={driverMarker}
                pickupLocation={{
                  lat: GWADAR_CENTER.lat,
                  lng: GWADAR_CENTER.lng,
                  label: "Pickup",
                }}
                dropLocation={{
                  lat: dropLoc.lat,
                  lng: dropLoc.lng,
                  label: dropLoc.name,
                }}
              />
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  icon: Phone,
                  label: t("customer.callDriver"),
                  ocid: "ride_booking.call_driver_button",
                },
                {
                  icon: MessageSquare,
                  label: t("customer.chatDriver"),
                  ocid: "ride_booking.chat_driver_button",
                },
                {
                  icon: Share2,
                  label: t("customer.shareTrip"),
                  ocid: "ride_booking.share_trip_button",
                  action: () => setShowShareModal(true),
                },
              ].map(({ icon: Icon, label, ocid, action }) => (
                <button
                  key={ocid}
                  type="button"
                  data-ocid={ocid}
                  onClick={action}
                  className="flex flex-col items-center gap-1.5 bg-card border border-border rounded-xl p-3 hover:border-primary/30 transition-smooth"
                >
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="text-xs text-muted-foreground text-center leading-tight">
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {/* Reached → show start ride button */}
            {status === "reached" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary/10 border border-primary/30 rounded-xl p-3 text-center"
              >
                <p className="text-sm font-semibold text-foreground mb-0.5">
                  Your driver has arrived!
                </p>
                <p className="text-xs text-muted-foreground">
                  Show OTP code{" "}
                  <span className="font-mono font-bold text-primary">
                    {otp}
                  </span>{" "}
                  to start your ride
                </p>
              </motion.div>
            )}

            {status === "reached" && (
              <Button
                type="button"
                data-ocid="ride_booking.start_ride_button"
                className="w-full bg-primary text-primary-foreground font-semibold h-12"
                onClick={handleAdvance}
              >
                📤 Start Ride
              </Button>
            )}
          </div>
        )}

        {/* ---- STARTED (OTP verification) ---- */}
        {status === "started" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-[65vh] p-6 text-center"
            data-ocid="ride_booking.otp_verify_state"
          >
            <div className="w-20 h-20 rounded-2xl bg-primary/15 border-2 border-primary/30 flex items-center justify-center mb-5">
              <span className="font-mono font-black text-3xl text-primary tracking-widest">
                {otp}
              </span>
            </div>
            <h2 className="text-xl font-display font-bold text-foreground mb-2">
              Your OTP Code
            </h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-xs">
              Share this code with{" "}
              <span className="text-foreground font-medium">
                {assignedDriver.name}
              </span>{" "}
              to confirm your identity and start the ride.
            </p>
            <Button
              type="button"
              data-ocid="ride_booking.confirm_otp_button"
              className="w-full max-w-xs bg-primary text-primary-foreground font-semibold h-12"
              onClick={handleAdvance}
            >
              Driver Verified OTP → Start Ride
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Ride begins once driver confirms your OTP
            </p>
          </motion.div>
        )}

        {/* ---- IN PROGRESS ---- */}
        {status === "in_progress" && (
          <div className="p-4 space-y-4">
            <div className="h-64 rounded-2xl overflow-hidden border border-primary/30 shadow-elevated">
              <MapView
                center={animDriverPos}
                zoom={14}
                drivers={driverMarker}
                pickupLocation={{
                  lat: GWADAR_CENTER.lat,
                  lng: GWADAR_CENTER.lng,
                  label: "Pickup",
                }}
                dropLocation={{
                  lat: dropLoc.lat,
                  lng: dropLoc.lng,
                  label: dropLoc.name,
                }}
                routePoints={[
                  { lat: GWADAR_CENTER.lat, lng: GWADAR_CENTER.lng },
                  { lat: animDriverPos.lat, lng: animDriverPos.lng },
                  { lat: dropLoc.lat, lng: dropLoc.lng },
                ]}
              />
            </div>

            <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Destination</p>
                  <p className="font-semibold text-foreground">
                    {dropLoc.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    {t("customer.estimatedFare")}
                  </p>
                  <p className="text-xl font-display font-bold text-primary">
                    PKR {fare}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between bg-muted/30 rounded-xl px-4 py-2">
                <div>
                  <p className="text-xs text-muted-foreground">Ride Timer</p>
                  <p className="font-mono font-bold text-foreground">
                    {formatTimer(rideTimer)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Driver</p>
                  <p className="text-sm font-medium text-foreground">
                    {assignedDriver.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                data-ocid="ride_booking.sos_button"
                onClick={() => setShowSos(true)}
                className="flex flex-col items-center gap-1.5 bg-destructive/10 border border-destructive/30 rounded-xl p-3 hover:bg-destructive/20 transition-smooth"
              >
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <span className="text-xs text-destructive font-semibold">
                  {t("customer.sos")}
                </span>
              </button>
              <button
                type="button"
                data-ocid="ride_booking.call_driver_button"
                className="flex flex-col items-center gap-1.5 bg-card border border-border rounded-xl p-3 hover:border-primary/30 transition-smooth"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">
                  {t("customer.callDriver")}
                </span>
              </button>
              <button
                type="button"
                data-ocid="ride_booking.share_trip_button"
                onClick={() => setShowShareModal(true)}
                className="flex flex-col items-center gap-1.5 bg-card border border-border rounded-xl p-3 hover:border-primary/30 transition-smooth"
              >
                <Share2 className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">
                  {t("customer.shareTrip")}
                </span>
              </button>
            </div>

            <Button
              type="button"
              data-ocid="ride_booking.end_ride_button"
              className="w-full bg-primary text-primary-foreground font-semibold h-12"
              onClick={handleAdvance}
            >
              🏁 End Ride
            </Button>
          </div>
        )}

        {/* ---- COMPLETED ---- */}
        {status === "completed" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 space-y-4"
            data-ocid="ride_booking.success_state"
          >
            <div className="text-center py-4">
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-3 text-3xl"
              >
                🎉
              </motion.div>
              <h2 className="text-2xl font-display font-bold text-foreground">
                {t("customer.rideCompleted")}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Hope you enjoyed your ride!
              </p>
            </div>

            {/* Fare breakdown */}
            <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
              <p className="text-sm font-semibold text-foreground mb-3">
                Fare Breakdown
              </p>
              <div className="space-y-2">
                {[
                  { label: "Base fare", amount: Math.round(fare * 0.5) },
                  {
                    label: "Distance (4.2 km × rate)",
                    amount: Math.round(fare * 0.4),
                  },
                  {
                    label: "Platform fee (10%)",
                    amount: Math.round(fare * 0.1),
                  },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="text-foreground">PKR {row.amount}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="font-bold text-foreground">
                    {t("customer.totalFare")}
                  </span>
                  <span className="font-bold text-primary text-lg">
                    PKR {fare}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
              <p className="text-sm font-semibold text-foreground mb-3">
                {t("customer.paymentMethod")}
              </p>
              <div className="grid grid-cols-4 gap-2">
                {PAYMENT_METHODS.map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    data-ocid={`ride_booking.payment.${pm.id}`}
                    onClick={() => setSelectedPayment(pm.id)}
                    className={cn(
                      "flex flex-col items-center gap-1 p-2 rounded-xl border text-xs transition-smooth",
                      selectedPayment === pm.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-muted/20 text-muted-foreground hover:border-primary/30",
                    )}
                  >
                    <span className="text-xl">{pm.icon}</span>
                    {pm.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
              <p className="text-sm font-semibold text-foreground mb-3">
                {t("customer.rateDriver")}
              </p>
              <div className="flex justify-center mb-3">
                <StarRating value={rating} onChange={setRating} size="lg" />
              </div>
              {rating > 0 && (
                <p className="text-center text-xs text-primary mb-3">
                  {rating === 5
                    ? "Excellent!"
                    : rating === 4
                      ? "Good ride!"
                      : rating === 3
                        ? "Average"
                        : "Could be better"}
                </p>
              )}
              <textarea
                data-ocid="ride_booking.feedback_textarea"
                placeholder={t("customer.writeReview")}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full bg-muted/30 border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground resize-none h-20 focus:outline-none focus:border-primary transition-smooth"
              />
            </div>

            <Button
              type="button"
              data-ocid="ride_booking.pay_button"
              className="w-full bg-primary text-primary-foreground font-semibold h-12 text-base"
              onClick={handlePayAndRate}
            >
              Pay PKR {fare} &amp; Finish
            </Button>
          </motion.div>
        )}
      </div>

      {/* SOS Modal */}
      <AnimatePresence>
        {showSos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            data-ocid="sos.dialog"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-card border border-destructive/40 rounded-2xl p-6 w-full max-w-sm shadow-elevated"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-destructive/20 border-2 border-destructive/40 flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground">
                  Emergency SOS
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your safety is our priority
                </p>
              </div>
              <div className="space-y-2 mb-4">
                {[
                  { label: "Police", number: "15", icon: "👮" },
                  { label: "Ambulance", number: "1122", icon: "🚑" },
                  {
                    label: "Zarin Safety Team",
                    number: "0800-ZARIN",
                    icon: "🛡️",
                  },
                ].map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    data-ocid={`sos.contact.${c.label.toLowerCase().replace(" ", "_")}`}
                    className="w-full flex items-center gap-3 bg-muted/30 border border-border rounded-xl px-4 py-3 hover:border-destructive/30 transition-smooth"
                  >
                    <span className="text-xl">{c.icon}</span>
                    <span className="flex-1 text-left text-sm font-medium text-foreground">
                      {c.label}
                    </span>
                    <span className="text-primary font-mono font-bold">
                      {c.number}
                    </span>
                  </button>
                ))}
              </div>
              <Button
                type="button"
                data-ocid="sos.close_button"
                variant="outline"
                className="w-full"
                onClick={() => setShowSos(false)}
              >
                <X className="w-4 h-4 mr-2" /> Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Trip Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            data-ocid="share_trip.dialog"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-elevated"
            >
              <h3 className="text-lg font-display font-bold text-foreground mb-2">
                Share Your Trip
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Share your live trip with friends or family for safety.
              </p>
              <div className="bg-muted/30 border border-border rounded-xl px-3 py-2 text-sm text-foreground font-mono mb-4 break-all">
                zarin.app/track/{rideId.slice(-8)}
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  data-ocid="share_trip.cancel_button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowShareModal(false)}
                >
                  {t("common.cancel")}
                </Button>
                <Button
                  type="button"
                  data-ocid="share_trip.confirm_button"
                  className="flex-1 bg-primary text-primary-foreground"
                  onClick={() => setShowShareModal(false)}
                >
                  Copy Link
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
