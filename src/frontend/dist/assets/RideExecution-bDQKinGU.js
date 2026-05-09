import { h as create, p as persist, a as useAuthStore, r as reactExports, s as navigate, j as jsxRuntimeExports, B as Button, t as ue } from "./index-D2S5mC_U.js";
import { I as Input } from "./input-BTHBc13a.js";
import { M as MapView } from "./MapView-DQ8U3W77.js";
import { u as useRideStore } from "./rideStore-BlpMfOfX.js";
const useDriverStore = create()(
  persist(
    (set) => ({
      drivers: [],
      earnings: {},
      activationCodes: [],
      setDrivers: (drivers) => set({ drivers }),
      updateDriverStatus: (driverId, status) => set((state) => ({
        drivers: state.drivers.map(
          (d) => d.id === driverId ? { ...d, status } : d
        )
      })),
      updateDriverEarnings: (driverId, amount) => set((state) => {
        const current = state.earnings[driverId] ?? {
          driverId,
          today: 0,
          thisWeek: 0,
          thisMonth: 0,
          commission: 0,
          pendingDues: 0
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
              pendingDues: current.pendingDues + commission
            }
          }
        };
      }),
      addActivationCode: (code) => set((state) => ({
        activationCodes: [code, ...state.activationCodes]
      })),
      markCodeUsed: (code) => set((state) => ({
        activationCodes: state.activationCodes.map(
          (c) => c.code === code ? { ...c, isUsed: true } : c
        )
      }))
    }),
    { name: "zarin-driver-store" }
  )
);
const STAGE_LABELS = {
  navigating: "Navigate to Pickup",
  arrived: "Verify OTP",
  in_ride: "Ride in Progress",
  completed: "Ride Completed"
};
const STAGE_STEPS = [
  "navigating",
  "arrived",
  "in_ride",
  "completed"
];
function RideExecution() {
  const ride = useRideStore((s) => s.activeRide);
  const setActiveRide = useRideStore((s) => s.setActiveRide);
  const updateDriverEarnings = useDriverStore((s) => s.updateDriverEarnings);
  const driver = useAuthStore((s) => s.driverUser);
  const [stage, setStage] = reactExports.useState("navigating");
  const [otp, setOtp] = reactExports.useState("");
  const [otpError, setOtpError] = reactExports.useState("");
  const [eta, setEta] = reactExports.useState(8);
  const [rideSeconds, setRideSeconds] = reactExports.useState(0);
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (stage !== "navigating") return;
    timerRef.current = setInterval(() => {
      setEta((t) => Math.max(0, t - 1));
    }, 1e4);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stage]);
  reactExports.useEffect(() => {
    if (stage !== "in_ride") return;
    timerRef.current = setInterval(() => {
      setRideSeconds((s) => s + 1);
    }, 1e3);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stage]);
  function handleArrived() {
    if (timerRef.current) clearInterval(timerRef.current);
    setStage("arrived");
    ue.success("Arrived at pickup location");
  }
  function handleStartRide() {
    if (otp.length < 4) {
      setOtpError("Enter 4-digit OTP from customer");
      return;
    }
    setOtpError("");
    setStage("in_ride");
    ue.success("Ride started!");
  }
  function handleEndRide() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (driver && ride) updateDriverEarnings(driver.id, ride.totalFare);
    setStage("completed");
    ue.success("Ride completed!");
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
  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };
  const currentIdx = STAGE_STEPS.indexOf(stage);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary text-lg", children: "Zarin Pro" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: STAGE_LABELS[stage] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center gap-1",
          "data-ocid": "ride_exec.progress_indicator",
          children: STAGE_STEPS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${i < currentIdx ? "bg-primary text-primary-foreground" : i === currentIdx ? "bg-primary text-primary-foreground ring-2 ring-primary/30" : "bg-muted text-muted-foreground"}`,
                children: i < currentIdx ? "✓" : i + 1
              }
            ),
            i < STAGE_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `flex-1 h-0.5 mx-1 ${i < currentIdx ? "bg-primary" : "bg-muted"}`
              }
            )
          ] }, s))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "38vh" }, className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      MapView,
      {
        center: { lat: ride.pickupLat, lng: ride.pickupLng },
        zoom: 14,
        pickupLocation: stage !== "in_ride" ? {
          lat: ride.pickupLat,
          lng: ride.pickupLng,
          label: ride.pickupAddress
        } : void 0,
        dropLocation: stage === "in_ride" || stage === "completed" ? {
          lat: ride.dropLat,
          lng: ride.dropLng,
          label: ride.dropAddress
        } : void 0,
        routePoints: stage === "in_ride" ? [
          { lat: ride.pickupLat, lng: ride.pickupLng },
          {
            lat: (ride.pickupLat + ride.dropLat) / 2,
            lng: (ride.pickupLng + ride.dropLng) / 2 + 0.01
          },
          { lat: ride.dropLat, lng: ride.dropLng }
        ] : [],
        showUserLocation: true,
        className: "w-full h-full rounded-none"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-4 py-4 pb-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl px-4 py-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: ride.customerName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Fare" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-primary", children: [
            "Rs. ",
            ride.totalFare.toLocaleString()
          ] })
        ] })
      ] }),
      stage === "navigating" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-2xl p-4 space-y-3",
          "data-ocid": "ride_exec.navigating_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "📍" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pickup Location" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground", children: ride.pickupAddress })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-muted/40 rounded-xl px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "⏱️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
                "Estimated arrival:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground", children: [
                  eta,
                  " min"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleArrived,
                className: "w-full bg-primary text-primary-foreground font-semibold h-12 text-base",
                "data-ocid": "ride_exec.arrived_button",
                children: "I've Arrived"
              }
            )
          ]
        }
      ),
      stage === "arrived" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-2xl p-4 space-y-3",
          "data-ocid": "ride_exec.otp_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🔐" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Verify Customer OTP" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Ask customer for their 4-digit OTP" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                placeholder: "Enter 4-digit OTP",
                value: otp,
                onChange: (e) => {
                  setOtp(e.target.value.slice(0, 4));
                  setOtpError("");
                },
                className: "bg-background border-input text-center text-2xl tracking-widest font-mono h-14",
                maxLength: 4,
                "data-ocid": "ride_exec.otp_input"
              }
            ),
            otpError && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-destructive text-xs",
                "data-ocid": "ride_exec.otp_error",
                children: otpError
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleStartRide,
                className: "w-full bg-primary text-primary-foreground font-semibold h-12",
                "data-ocid": "ride_exec.start_ride_button",
                children: "Start Ride"
              }
            )
          ]
        }
      ),
      stage === "in_ride" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-2xl p-4 space-y-3",
          "data-ocid": "ride_exec.in_ride_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-2 h-2 rounded-full animate-pulse",
                    style: { backgroundColor: "#4ade80" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-sm font-semibold",
                    style: { color: "#4ade80" },
                    children: "Ride in Progress"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lg font-bold text-foreground", children: formatTime(rideSeconds) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🏁" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Drop-off" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground", children: ride.dropAddress }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                  ride.distanceKm,
                  " km total"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleEndRide,
                className: "w-full bg-destructive text-destructive-foreground font-semibold h-12",
                "data-ocid": "ride_exec.end_ride_button",
                children: "End Ride"
              }
            )
          ]
        }
      ),
      stage === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-primary/30 rounded-2xl p-5 space-y-4",
          "data-ocid": "ride_exec.completion_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-2", children: "🎉" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-bold text-foreground", children: "Ride Completed!" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-2 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Gross Fare" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                  "Rs. ",
                  grossFare.toLocaleString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-2 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Platform Commission (20%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-destructive", children: [
                  "- Rs. ",
                  commission.toFixed(0)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Net Earnings" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-xl text-primary", children: [
                  "Rs. ",
                  netEarnings.toFixed(0)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-muted/40 rounded-xl px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "💳" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                "Payment:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize text-foreground font-medium", children: ride.paymentMethod })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleDone,
                className: "w-full bg-primary text-primary-foreground font-semibold h-12",
                "data-ocid": "ride_exec.done_button",
                children: "Back to Home"
              }
            )
          ]
        }
      )
    ] })
  ] });
}
export {
  RideExecution as default
};
