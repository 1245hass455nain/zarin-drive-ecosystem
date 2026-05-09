import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-D2S5mC_U.js";
import { B as Badge } from "./badge-CtI4d2cg.js";
import { C as Card } from "./card-DEOosrQ5.js";
import { M as MapView } from "./MapView-DQ8U3W77.js";
import { m as mockDrivers, d as driverCoordinates } from "./mockDrivers-BlyLXLsg.js";
import { m as mockRides } from "./mockRides-D5EVF1ST.js";
function LiveMap() {
  const [showOnline, setShowOnline] = reactExports.useState(true);
  const [showOnRide, setShowOnRide] = reactExports.useState(true);
  const [showOffline, setShowOffline] = reactExports.useState(true);
  const [selectedDriverId, setSelectedDriverId] = reactExports.useState(null);
  const filtered = mockDrivers.filter((d) => {
    if (d.status === "online" && !showOnline) return false;
    if (d.status === "on_ride" && !showOnRide) return false;
    if (d.status === "offline" && !showOffline) return false;
    return true;
  });
  const driverMarkers = filtered.map((d) => {
    var _a, _b;
    return {
      id: d.id,
      lat: ((_a = driverCoordinates[d.id]) == null ? void 0 : _a.lat) ?? 25.127,
      lng: ((_b = driverCoordinates[d.id]) == null ? void 0 : _b.lng) ?? 62.325,
      vehicleType: d.vehicleType,
      status: d.status,
      name: d.name
    };
  });
  const activeRides = mockRides.filter((r) => r.status === "in_progress");
  const routePoints = activeRides.length > 0 ? [
    { lat: activeRides[0].pickupLat, lng: activeRides[0].pickupLng },
    { lat: activeRides[0].dropLat, lng: activeRides[0].dropLng }
  ] : [];
  const statusCount = {
    online: mockDrivers.filter((d) => d.status === "online").length,
    on_ride: mockDrivers.filter((d) => d.status === "on_ride").length,
    offline: mockDrivers.filter((d) => d.status === "offline").length
  };
  const selectedDriver = mockDrivers.find((d) => d.id === selectedDriverId) ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", "data-ocid": "admin.livemap.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Show Drivers:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: showOnline ? "default" : "outline",
          size: "sm",
          onClick: () => setShowOnline((v) => !v),
          "data-ocid": "admin.livemap.toggle_online",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-green-400 mr-2 inline-block" }),
            "Online (",
            statusCount.online,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: showOnRide ? "default" : "outline",
          size: "sm",
          onClick: () => setShowOnRide((v) => !v),
          "data-ocid": "admin.livemap.toggle_on_ride",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-blue-400 mr-2 inline-block" }),
            "On Ride (",
            statusCount.on_ride,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: showOffline ? "default" : "outline",
          size: "sm",
          onClick: () => setShowOffline((v) => !v),
          "data-ocid": "admin.livemap.toggle_offline",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-muted-foreground mr-2 inline-block" }),
            "Offline (",
            statusCount.offline,
            ")"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", style: { height: "calc(100vh - 240px)" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 rounded-xl overflow-hidden border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        MapView,
        {
          drivers: driverMarkers,
          routePoints,
          zoom: 13
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-72 flex flex-col gap-2 overflow-y-auto", children: filtered.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: [
            "p-3 bg-card border-border cursor-pointer transition-smooth",
            selectedDriverId === d.id ? "border-primary" : "hover:border-muted-foreground"
          ].join(" "),
          onClick: () => setSelectedDriverId(selectedDriverId === d.id ? null : d.id),
          "data-ocid": `admin.livemap.driver_card.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: [
                    "w-2.5 h-2.5 rounded-full flex-shrink-0",
                    d.status === "online" ? "bg-green-500" : d.status === "on_ride" ? "bg-blue-500" : "bg-muted-foreground"
                  ].join(" ")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: d.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground capitalize", children: [
                  d.vehicleType,
                  " · ",
                  d.status.replace("_", " ")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs capitalize", children: d.rank })
            ] }),
            (selectedDriver == null ? void 0 : selectedDriver.id) === d.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 pt-2 border-t border-border space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "📞 ",
                d.phone
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "🚗 ",
                d.vehiclePlate
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary", children: [
                "Wallet: Rs. ",
                d.walletBalance.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "⭐ ",
                d.rating,
                " rating"
              ] })
            ] })
          ]
        },
        d.id
      )) })
    ] })
  ] });
}
export {
  LiveMap as default
};
