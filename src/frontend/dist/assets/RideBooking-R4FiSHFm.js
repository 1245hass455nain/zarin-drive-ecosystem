import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, d as cn, u as useTranslation, a as useAuthStore, m as motion, B as Button, X } from "./index-D2S5mC_U.js";
import { G as GWADAR_CENTER, g as gwadarLocations, M as MapView } from "./MapView-DQ8U3W77.js";
import { S as Star } from "./star-CgEckE3F.js";
import { d as driverCoordinates, m as mockDrivers } from "./mockDrivers-BlyLXLsg.js";
import { u as useNotificationStore } from "./notificationStore-CX3eR6RT.js";
import { u as useRideStore } from "./rideStore-BlpMfOfX.js";
import { A as ArrowLeft } from "./arrow-left-BrvHSzSU.js";
import { P as Phone } from "./phone-CaZFRKNj.js";
import { T as TriangleAlert } from "./triangle-alert-zPtHyvPA.js";
import { A as AnimatePresence } from "./index-BSMxu79j.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
const sizeClasses = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8" };
function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
  className
}) {
  const [hovered, setHovered] = reactExports.useState(0);
  const display = hovered || value;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "fieldset",
    {
      className: cn("flex gap-1 border-none p-0 m-0", className),
      "aria-label": "Star rating",
      children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          disabled: readonly,
          onClick: () => onChange == null ? void 0 : onChange(star),
          onMouseEnter: () => !readonly && setHovered(star),
          onMouseLeave: () => !readonly && setHovered(0),
          "aria-label": `${star} star${star > 1 ? "s" : ""}`,
          className: cn(
            "transition-smooth",
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Star,
            {
              className: cn(
                sizeClasses[size],
                star <= display ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
              )
            }
          )
        },
        star
      ))
    }
  );
}
const rideStatusConfig = {
  searching: {
    label: "Searching",
    className: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
  },
  accepted: {
    label: "Accepted",
    className: "bg-blue-500/20 text-blue-400 border border-blue-500/30"
  },
  arriving: {
    label: "Arriving",
    className: "bg-primary/20 text-primary border border-primary/30"
  },
  reached: {
    label: "Reached",
    className: "bg-primary/20 text-primary border border-primary/30"
  },
  started: {
    label: "Started",
    className: "bg-green-500/20 text-green-400 border border-green-500/30"
  },
  in_progress: {
    label: "In Progress",
    className: "bg-green-500/20 text-green-400 border border-green-500/30"
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-destructive/20 text-destructive border border-destructive/30"
  }
};
function StatusBadge({ status, className }) {
  const config = rideStatusConfig[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        config.className,
        className
      ),
      children: config.label
    }
  );
}
const PAYMENT_METHODS = [
  { id: "cash", label: "Cash", icon: "💵" },
  { id: "wallet", label: "Wallet", icon: "👛" },
  { id: "easypaisa", label: "Easypaisa", icon: "📱" },
  { id: "jazzcash", label: "JazzCash", icon: "📲" }
];
const STATUS_SEQUENCE = [
  "searching",
  "accepted",
  "arriving",
  "reached",
  "started",
  "in_progress",
  "completed"
];
function RideBooking({
  vehicleType,
  fare,
  destination,
  onBack,
  onComplete
}) {
  const { t } = useTranslation();
  const customerUser = useAuthStore((s) => s.customerUser);
  const { addRide, updateRide } = useRideStore();
  const addNotification = useNotificationStore((s) => s.addNotification);
  const [status, setStatus] = reactExports.useState("searching");
  const [searchProgress, setSearchProgress] = reactExports.useState(0);
  const [countdown, setCountdown] = reactExports.useState(30);
  const [selectedPayment, setSelectedPayment] = reactExports.useState("cash");
  const [rating, setRating] = reactExports.useState(0);
  const [feedback, setFeedback] = reactExports.useState("");
  const [showSos, setShowSos] = reactExports.useState(false);
  const [showShareModal, setShowShareModal] = reactExports.useState(false);
  const [rideId] = reactExports.useState(`ride-${Date.now()}`);
  const [rideTimer, setRideTimer] = reactExports.useState(0);
  const assignedDriver = mockDrivers[2];
  const otp = "4827";
  const driverPos = driverCoordinates[assignedDriver.id] ?? GWADAR_CENTER;
  const dropLoc = destination ?? gwadarLocations[0];
  const [animDriverPos, setAnimDriverPos] = reactExports.useState(driverPos);
  const animFrameRef = reactExports.useRef(null);
  const moveDriver = reactExports.useCallback(() => {
    setAnimDriverPos((prev) => ({
      lat: prev.lat + (Math.random() - 0.5) * 1e-3,
      lng: prev.lng + (Math.random() - 0.5) * 1e-3
    }));
  }, []);
  reactExports.useEffect(() => {
    if (status === "in_progress") {
      animFrameRef.current = setInterval(moveDriver, 2e3);
    } else if (animFrameRef.current) {
      clearInterval(animFrameRef.current);
    }
    return () => {
      if (animFrameRef.current) clearInterval(animFrameRef.current);
    };
  }, [status, moveDriver]);
  reactExports.useEffect(() => {
    if (status !== "in_progress") return;
    const interval = setInterval(() => setRideTimer((t2) => t2 + 1), 1e3);
    return () => clearInterval(interval);
  }, [status]);
  reactExports.useEffect(() => {
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
        customerId: (customerUser == null ? void 0 : customerUser.id) ?? "guest",
        driverId: assignedDriver.id,
        customerName: (customerUser == null ? void 0 : customerUser.name) ?? "Guest",
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
        status: "accepted",
        paymentMethod: selectedPayment,
        otp,
        startTime: (/* @__PURE__ */ new Date()).toISOString(),
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      addRide(newRide);
      addNotification({
        title: "Driver Accepted!",
        message: `${assignedDriver.name} is on the way. Vehicle: ${assignedDriver.vehiclePlate}`,
        type: "ride",
        target: "customer",
        targetId: customerUser == null ? void 0 : customerUser.id
      });
    }, 14e3);
    return () => {
      clearInterval(progressInterval);
      clearTimeout(acceptTimer);
    };
  }, [status]);
  reactExports.useEffect(() => {
    if (status === "accepted") {
      const t1 = setTimeout(() => setStatus("arriving"), 6e3);
      const t2 = setTimeout(() => setStatus("reached"), 13e3);
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
      endTime: (/* @__PURE__ */ new Date()).toISOString()
    });
    addNotification({
      title: "Ride Completed! 🎉",
      message: `You paid PKR ${fare} via ${selectedPayment}. Thanks for riding with Zarin Drive!`,
      type: "ride",
      target: "customer",
      targetId: customerUser == null ? void 0 : customerUser.id
    });
    onComplete();
  }
  const formatTimer = (secs) => {
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
      name: assignedDriver.name
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col",
      "data-ocid": "ride_booking.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "bg-card border-b border-border px-4 h-14 flex items-center gap-3 shadow-card z-20 relative", children: [
          status === "searching" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "ride_booking.back_button",
              onClick: onBack,
              className: "w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted/50 transition-smooth",
              "aria-label": "Go back",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5 text-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-base font-display font-bold text-foreground", children: [
              status === "searching" && "Finding your driver...",
              status === "accepted" && t("customer.driverAccepted"),
              status === "arriving" && t("customer.driverArriving"),
              status === "reached" && t("customer.driverReached"),
              status === "started" && "Verify OTP to Start",
              status === "in_progress" && t("customer.rideInProgress"),
              status === "completed" && t("customer.rideCompleted")
            ] }),
            status === "in_progress" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary font-mono", children: [
              "⏱ ",
              formatTimer(rideTimer)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
          status === "searching" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center min-h-[65vh] px-6",
              "data-ocid": "ride_booking.loading_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary",
                      animate: { rotate: 360 },
                      transition: {
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear"
                      }
                    }
                  ),
                  [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "absolute inset-0 rounded-full border border-primary/15",
                      animate: { scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] },
                      transition: {
                        duration: 2.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.7,
                        ease: "easeOut"
                      }
                    },
                    i
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: vehicleType === "bike" ? "🏍️" : vehicleType === "rickshaw" ? "🛣️" : vehicleType === "premium" ? "🚙" : "🚗" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-display font-bold text-foreground mb-2", children: [
                  "Finding your ",
                  vehicleType,
                  " driver..."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 text-center", children: "Matching you with the best available driver nearby" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-xs bg-muted/30 rounded-full h-2 overflow-hidden mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "h-full bg-primary rounded-full",
                    style: { width: `${searchProgress}%` },
                    transition: { duration: 0.3 }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  Math.round(countdown),
                  "s remaining"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-muted/30 border border-border rounded-xl px-4 py-3 w-full max-w-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Fare estimate" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
                      "PKR ",
                      fare
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm mt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Destination" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate max-w-32", children: dropLoc.name })
                  ] })
                ] })
              ]
            }
          ),
          ["accepted", "arriving", "reached"].includes(status) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                className: "bg-card border border-primary/20 rounded-2xl p-4 shadow-elevated",
                "data-ocid": "ride_booking.driver_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center text-2xl font-display font-black text-primary", children: assignedDriver.name.charAt(0) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary border-2 border-card" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-foreground", children: assignedDriver.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-mono", children: assignedDriver.vehiclePlate }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5 mt-1", children: [
                        [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: s <= Math.round(assignedDriver.rating) ? "text-primary" : "text-muted-foreground/30",
                            children: "★"
                          },
                          s
                        )),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: assignedDriver.rating })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "ETA" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-primary", children: status === "accepted" ? "6 min" : status === "arriving" ? "3 min" : "Here!" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between bg-muted/30 rounded-xl px-4 py-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("customer.rideOtp") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/60", children: "Show this to driver" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-black text-3xl text-primary tracking-[0.2em]", children: otp })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 rounded-2xl overflow-hidden border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              MapView,
              {
                center: GWADAR_CENTER,
                zoom: 14,
                drivers: driverMarker,
                pickupLocation: {
                  lat: GWADAR_CENTER.lat,
                  lng: GWADAR_CENTER.lng,
                  label: "Pickup"
                },
                dropLocation: {
                  lat: dropLoc.lat,
                  lng: dropLoc.lng,
                  label: dropLoc.name
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [
              {
                icon: Phone,
                label: t("customer.callDriver"),
                ocid: "ride_booking.call_driver_button"
              },
              {
                icon: MessageSquare,
                label: t("customer.chatDriver"),
                ocid: "ride_booking.chat_driver_button"
              },
              {
                icon: Share2,
                label: t("customer.shareTrip"),
                ocid: "ride_booking.share_trip_button",
                action: () => setShowShareModal(true)
              }
            ].map(({ icon: Icon, label, ocid, action }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": ocid,
                onClick: action,
                className: "flex flex-col items-center gap-1.5 bg-card border border-border rounded-xl p-3 hover:border-primary/30 transition-smooth",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground text-center leading-tight", children: label })
                ]
              },
              ocid
            )) }),
            status === "reached" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                className: "bg-primary/10 border border-primary/30 rounded-xl p-3 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-0.5", children: "Your driver has arrived!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Show OTP code",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-primary", children: otp }),
                    " ",
                    "to start your ride"
                  ] })
                ]
              }
            ),
            status === "reached" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                "data-ocid": "ride_booking.start_ride_button",
                className: "w-full bg-primary text-primary-foreground font-semibold h-12",
                onClick: handleAdvance,
                children: "📤 Start Ride"
              }
            )
          ] }),
          status === "started" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              className: "flex flex-col items-center justify-center min-h-[65vh] p-6 text-center",
              "data-ocid": "ride_booking.otp_verify_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-primary/15 border-2 border-primary/30 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-black text-3xl text-primary tracking-widest", children: otp }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground mb-2", children: "Your OTP Code" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-8 max-w-xs", children: [
                  "Share this code with",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: assignedDriver.name }),
                  " ",
                  "to confirm your identity and start the ride."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "ride_booking.confirm_otp_button",
                    className: "w-full max-w-xs bg-primary text-primary-foreground font-semibold h-12",
                    onClick: handleAdvance,
                    children: "Driver Verified OTP → Start Ride"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-4", children: "Ride begins once driver confirms your OTP" })
              ]
            }
          ),
          status === "in_progress" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 rounded-2xl overflow-hidden border border-primary/30 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              MapView,
              {
                center: animDriverPos,
                zoom: 14,
                drivers: driverMarker,
                pickupLocation: {
                  lat: GWADAR_CENTER.lat,
                  lng: GWADAR_CENTER.lng,
                  label: "Pickup"
                },
                dropLocation: {
                  lat: dropLoc.lat,
                  lng: dropLoc.lng,
                  label: dropLoc.name
                },
                routePoints: [
                  { lat: GWADAR_CENTER.lat, lng: GWADAR_CENTER.lng },
                  { lat: animDriverPos.lat, lng: animDriverPos.lng },
                  { lat: dropLoc.lat, lng: dropLoc.lng }
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4 shadow-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Destination" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: dropLoc.name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("customer.estimatedFare") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-display font-bold text-primary", children: [
                    "PKR ",
                    fare
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-muted/30 rounded-xl px-4 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Ride Timer" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-bold text-foreground", children: formatTimer(rideTimer) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Driver" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: assignedDriver.name })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "ride_booking.sos_button",
                  onClick: () => setShowSos(true),
                  className: "flex flex-col items-center gap-1.5 bg-destructive/10 border border-destructive/30 rounded-xl p-3 hover:bg-destructive/20 transition-smooth",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-destructive" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive font-semibold", children: t("customer.sos") })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "ride_booking.call_driver_button",
                  className: "flex flex-col items-center gap-1.5 bg-card border border-border rounded-xl p-3 hover:border-primary/30 transition-smooth",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: t("customer.callDriver") })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "ride_booking.share_trip_button",
                  onClick: () => setShowShareModal(true),
                  className: "flex flex-col items-center gap-1.5 bg-card border border-border rounded-xl p-3 hover:border-primary/30 transition-smooth",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-5 h-5 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: t("customer.shareTrip") })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                "data-ocid": "ride_booking.end_ride_button",
                className: "w-full bg-primary text-primary-foreground font-semibold h-12",
                onClick: handleAdvance,
                children: "🏁 End Ride"
              }
            )
          ] }),
          status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              className: "p-4 space-y-4",
              "data-ocid": "ride_booking.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { scale: 0.5 },
                      animate: { scale: 1 },
                      transition: { type: "spring", bounce: 0.4 },
                      className: "w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-3 text-3xl",
                      children: "🎉"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground", children: t("customer.rideCompleted") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Hope you enjoyed your ride!" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4 shadow-card", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-3", children: "Fare Breakdown" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    [
                      { label: "Base fare", amount: Math.round(fare * 0.5) },
                      {
                        label: "Distance (4.2 km × rate)",
                        amount: Math.round(fare * 0.4)
                      },
                      {
                        label: "Platform fee (10%)",
                        amount: Math.round(fare * 0.1)
                      }
                    ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: row.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                        "PKR ",
                        row.amount
                      ] })
                    ] }, row.label)),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-2 flex justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: t("customer.totalFare") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary text-lg", children: [
                        "PKR ",
                        fare
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4 shadow-card", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-3", children: t("customer.paymentMethod") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: PAYMENT_METHODS.map((pm) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `ride_booking.payment.${pm.id}`,
                      onClick: () => setSelectedPayment(pm.id),
                      className: cn(
                        "flex flex-col items-center gap-1 p-2 rounded-xl border text-xs transition-smooth",
                        selectedPayment === pm.id ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/20 text-muted-foreground hover:border-primary/30"
                      ),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: pm.icon }),
                        pm.label
                      ]
                    },
                    pm.id
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4 shadow-card", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-3", children: t("customer.rateDriver") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: rating, onChange: setRating, size: "lg" }) }),
                  rating > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-primary mb-3", children: rating === 5 ? "Excellent!" : rating === 4 ? "Good ride!" : rating === 3 ? "Average" : "Could be better" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      "data-ocid": "ride_booking.feedback_textarea",
                      placeholder: t("customer.writeReview"),
                      value: feedback,
                      onChange: (e) => setFeedback(e.target.value),
                      className: "w-full bg-muted/30 border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground resize-none h-20 focus:outline-none focus:border-primary transition-smooth"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "ride_booking.pay_button",
                    className: "w-full bg-primary text-primary-foreground font-semibold h-12 text-base",
                    onClick: handlePayAndRate,
                    children: [
                      "Pay PKR ",
                      fare,
                      " & Finish"
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showSos && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4",
            "data-ocid": "sos.dialog",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { scale: 0.9 },
                animate: { scale: 1 },
                exit: { scale: 0.9 },
                className: "bg-card border border-destructive/40 rounded-2xl p-6 w-full max-w-sm shadow-elevated",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-destructive/20 border-2 border-destructive/40 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-8 h-8 text-destructive" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-display font-bold text-foreground", children: "Emergency SOS" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Your safety is our priority" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: [
                    { label: "Police", number: "15", icon: "👮" },
                    { label: "Ambulance", number: "1122", icon: "🚑" },
                    {
                      label: "Zarin Safety Team",
                      number: "0800-ZARIN",
                      icon: "🛡️"
                    }
                  ].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `sos.contact.${c.label.toLowerCase().replace(" ", "_")}`,
                      className: "w-full flex items-center gap-3 bg-muted/30 border border-border rounded-xl px-4 py-3 hover:border-destructive/30 transition-smooth",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: c.icon }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-left text-sm font-medium text-foreground", children: c.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-mono font-bold", children: c.number })
                      ]
                    },
                    c.label
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      "data-ocid": "sos.close_button",
                      variant: "outline",
                      className: "w-full",
                      onClick: () => setShowSos(false),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-2" }),
                        " Close"
                      ]
                    }
                  )
                ]
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showShareModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4",
            "data-ocid": "share_trip.dialog",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { y: 40, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                exit: { y: 40, opacity: 0 },
                className: "bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-elevated",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-display font-bold text-foreground mb-2", children: "Share Your Trip" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Share your live trip with friends or family for safety." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 border border-border rounded-xl px-3 py-2 text-sm text-foreground font-mono mb-4 break-all", children: [
                    "zarin.app/track/",
                    rideId.slice(-8)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        "data-ocid": "share_trip.cancel_button",
                        variant: "outline",
                        className: "flex-1",
                        onClick: () => setShowShareModal(false),
                        children: t("common.cancel")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        "data-ocid": "share_trip.confirm_button",
                        className: "flex-1 bg-primary text-primary-foreground",
                        onClick: () => setShowShareModal(false),
                        children: "Copy Link"
                      }
                    )
                  ] })
                ]
              }
            )
          }
        ) })
      ]
    }
  );
}
export {
  RideBooking as default
};
