import { a as useAuthStore, r as reactExports, t as ue, s as navigate, j as jsxRuntimeExports, B as Button } from "./index-D2S5mC_U.js";
import { B as Badge } from "./badge-CtI4d2cg.js";
import { M as MapView, G as GWADAR_CENTER } from "./MapView-DQ8U3W77.js";
import { u as useRideStore } from "./rideStore-BlpMfOfX.js";
const MOCK_REQUESTS = [
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
    otp: "4821"
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
    otp: "2951"
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
    otp: "7364"
  }
];
const NAV_ITEMS = [
  { key: "home", label: "Home", icon: "🏠" },
  { key: "earnings", label: "Earnings", icon: "💰" },
  { key: "rank", label: "Rank", icon: "🏆" },
  { key: "profile", label: "Profile", icon: "👤" }
];
function DriverHome() {
  const driver = useAuthStore((s) => s.driverUser);
  const [isOnline, setIsOnline] = reactExports.useState((driver == null ? void 0 : driver.status) === "online");
  const [activeNav, setActiveNav] = reactExports.useState("home");
  const [request, setRequest] = reactExports.useState(
    null
  );
  const [timer, setTimer] = reactExports.useState(30);
  const [_requestIdx, setRequestIdx] = reactExports.useState(0);
  const timerRef = reactExports.useRef(null);
  const scheduleRef = reactExports.useRef(null);
  const setActiveRide = useRideStore((s) => s.setActiveRide);
  const todayEarnings = 1840;
  const todayTrips = 7;
  reactExports.useEffect(() => {
    if (!isOnline) {
      setRequest(null);
      if (scheduleRef.current) clearInterval(scheduleRef.current);
      return;
    }
    const initial = setTimeout(() => showRequest(), 5e3);
    scheduleRef.current = setInterval(() => showRequest(), 45e3);
    return () => {
      clearTimeout(initial);
      if (scheduleRef.current) clearInterval(scheduleRef.current);
    };
  }, [isOnline]);
  function showRequest() {
    setRequestIdx((i) => {
      const r = MOCK_REQUESTS[i % MOCK_REQUESTS.length];
      setRequest(r);
      setTimer(30);
      return i + 1;
    });
  }
  reactExports.useEffect(() => {
    if (!request) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setRequest(null);
          ue.info("Ride request expired");
          return 30;
        }
        return t - 1;
      });
    }, 1e3);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [request]);
  function handleAccept() {
    if (!request || !driver) return;
    const ride = {
      ...request,
      id: `ride-live-${Date.now()}`,
      driverId: driver.id,
      driverName: driver.name,
      driverPhone: driver.phone,
      vehiclePlate: driver.vehiclePlate,
      startTime: (/* @__PURE__ */ new Date()).toISOString(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
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
    ue.info("Ride request rejected");
  }
  function handleNavChange(key) {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-4 py-3 flex items-center justify-between shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-display font-bold text-primary", children: "Zarin Pro" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "text-xs border-primary/40 text-primary",
            children: "Driver"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Wallet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-primary", children: [
            "Rs. ",
            driver.walletBalance.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setIsOnline((v) => !v),
            "data-ocid": "driver_home.online_toggle",
            className: "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-smooth border",
            style: isOnline ? {
              backgroundColor: "rgba(22,163,74,0.10)",
              borderColor: "rgba(22,163,74,0.40)",
              color: "#16a34a"
            } : void 0,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `w-2 h-2 rounded-full ${isOnline ? "animate-pulse" : "bg-destructive"}`,
                  style: isOnline ? { backgroundColor: "#4ade80" } : void 0
                }
              ),
              isOnline ? "Online" : "Offline"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", style: { height: "50vh" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MapView,
        {
          center: GWADAR_CENTER,
          zoom: 14,
          showUserLocation: true,
          className: "w-full h-full rounded-none"
        }
      ),
      !isOnline && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/60 flex items-center justify-center rounded-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl mb-1", children: "😴" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "You are offline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Go online to receive ride requests" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-4 py-4 space-y-4 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Today's Earnings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-bold text-primary", children: [
            "Rs. ",
            todayEarnings.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            todayTrips,
            " trips completed"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Net (after 20%)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-foreground", children: [
            "Rs. ",
            (todayEarnings * 0.8).toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            "Commission: Rs. ",
            (todayEarnings * 0.2).toLocaleString()
          ] })
        ] })
      ] }),
      isOnline && request ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border-2 border-primary/50 rounded-2xl p-4 shadow-elevated",
          "data-ocid": "driver_home.ride_request_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "New Ride Request" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-10 h-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    className: "w-10 h-10 -rotate-90",
                    viewBox: "0 0 36 36",
                    "aria-hidden": "true",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "circle",
                        {
                          cx: "18",
                          cy: "18",
                          r: "15",
                          fill: "none",
                          stroke: "oklch(0.22 0 0)",
                          strokeWidth: "3"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "circle",
                        {
                          cx: "18",
                          cy: "18",
                          r: "15",
                          fill: "none",
                          stroke: "oklch(0.65 0.22 90)",
                          strokeWidth: "3",
                          strokeDasharray: `${timer / 30 * 94.2} 94.2`,
                          strokeLinecap: "round"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 flex items-center justify-center text-xs font-bold text-primary", children: timer })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-muted rounded-full mb-4 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-primary rounded-full transition-all duration-1000",
                style: { width: `${timer / 30 * 100}%` }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 text-sm", style: { color: "#4ade80" }, children: "📍" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pickup" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: request.pickupAddress })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5 text-sm", children: "🏁" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Drop-off" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: request.dropAddress })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Est. Fare" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-primary", children: [
                  "Rs. ",
                  request.totalFare.toLocaleString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Distance" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                  request.distanceKm,
                  " km"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your Earn" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-sm font-semibold",
                    style: { color: "#4ade80" },
                    children: [
                      "Rs. ",
                      (request.totalFare * 0.8).toFixed(0)
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleReject,
                  variant: "outline",
                  className: "flex-1 border-destructive/50 text-destructive hover:bg-destructive/10",
                  "data-ocid": "driver_home.reject_button",
                  children: "Reject"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleAccept,
                  className: "flex-1 font-semibold",
                  style: { backgroundColor: "#16a34a", color: "#ffffff" },
                  "data-ocid": "driver_home.accept_button",
                  children: "Accept"
                }
              )
            ] })
          ]
        }
      ) : isOnline ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-dashed border-border rounded-2xl p-8 text-center",
          "data-ocid": "driver_home.waiting_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl mb-2", children: "🔍" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Waiting for ride requests..." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "New requests appear here automatically" })
          ]
        }
      ) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 flex justify-around", children: NAV_ITEMS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => handleNavChange(item.key),
        "data-ocid": `driver_home.nav_${item.key}`,
        className: `flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-smooth ${activeNav === item.key ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: item.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: item.label })
        ]
      },
      item.key
    )) })
  ] });
}
export {
  DriverHome as default
};
