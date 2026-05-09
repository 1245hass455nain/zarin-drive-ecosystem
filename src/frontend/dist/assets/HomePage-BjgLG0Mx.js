import { u as useTranslation, a as useAuthStore, r as reactExports, j as jsxRuntimeExports, W as Wallet, b as Bell, m as motion, X, M as MapPin, d as cn, B as Button } from "./index-D2S5mC_U.js";
import { I as Input } from "./input-BTHBc13a.js";
import { g as gwadarLocations, M as MapView, G as GWADAR_CENTER } from "./MapView-DQ8U3W77.js";
import { d as driverCoordinates, m as mockDrivers } from "./mockDrivers-BlyLXLsg.js";
import { u as useCustomerStore } from "./customerStore-CKDmhgAW.js";
import { u as useNotificationStore } from "./notificationStore-CX3eR6RT.js";
import { S as Star } from "./star-CgEckE3F.js";
import { S as Search } from "./search-CJjdnnTu.js";
import { C as Clock } from "./clock-DBLc99QC.js";
import { A as AnimatePresence } from "./index-BSMxu79j.js";
import { C as CircleCheck } from "./circle-check-CeWkmbTN.js";
const ONLINE_DRIVERS = mockDrivers.filter((d) => d.status === "online");
const driverMarkers = ONLINE_DRIVERS.slice(0, 9).map((d) => {
  var _a, _b;
  return {
    id: d.id,
    lat: ((_a = driverCoordinates[d.id]) == null ? void 0 : _a.lat) ?? GWADAR_CENTER.lat,
    lng: ((_b = driverCoordinates[d.id]) == null ? void 0 : _b.lng) ?? GWADAR_CENTER.lng,
    vehicleType: d.vehicleType,
    status: d.status,
    name: d.name
  };
});
const SUGGESTED_PLACES = [
  {
    id: "sp-1",
    name: "Gwadar Port",
    icon: "⚓",
    distance: "2.3 km",
    locKey: "Gwadar Port"
  },
  {
    id: "sp-2",
    name: "Serena Hotel",
    icon: "🏨",
    distance: "1.8 km",
    locKey: "Serena Hotel"
  },
  {
    id: "sp-3",
    name: "Fish Harbour",
    icon: "🐟",
    distance: "3.1 km",
    locKey: "Fish Harbour"
  },
  {
    id: "sp-4",
    name: "Gwadar Beach",
    icon: "🌊",
    distance: "0.9 km",
    locKey: "Gwadar Beach"
  },
  {
    id: "sp-5",
    name: "Airport",
    icon: "✈️",
    distance: "11.2 km",
    locKey: "Gwadar International Airport"
  }
];
function HomePage({
  onSelectDestination,
  onOpenProfile
}) {
  var _a;
  const { t } = useTranslation();
  const customerUser = useAuthStore((s) => s.customerUser);
  const { recentSearches, addRecentSearch } = useCustomerStore();
  const { notifications, markAllAsRead } = useNotificationStore();
  const [destQuery, setDestQuery] = reactExports.useState("");
  const [showSuggestions, setShowSuggestions] = reactExports.useState(false);
  const [showNotifPanel, setShowNotifPanel] = reactExports.useState(false);
  const unreadCount = notifications.filter(
    (n) => !n.isRead && n.target === "customer"
  ).length;
  const customerNotifs = notifications.filter((n) => n.target === "customer").slice(0, 15);
  const filteredLocations = destQuery.length > 0 ? gwadarLocations.filter(
    (l) => l.name.toLowerCase().includes(destQuery.toLowerCase()) || l.address.toLowerCase().includes(destQuery.toLowerCase())
  ) : gwadarLocations.slice(0, 8);
  function handleSelectLocation(loc) {
    addRecentSearch(loc.name);
    setDestQuery(loc.name);
    setShowSuggestions(false);
    onSelectDestination(loc);
  }
  const firstName = ((_a = customerUser == null ? void 0 : customerUser.name) == null ? void 0 : _a.split(" ")[0]) ?? "Guest";
  const initials = (customerUser == null ? void 0 : customerUser.name) ? customerUser.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() : "G";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-screen bg-background overflow-hidden",
      "data-ocid": "home.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-card border-b border-border px-4 pt-4 pb-3 z-20 relative shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "home.profile_button",
                onClick: onOpenProfile,
                className: "w-10 h-10 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center text-primary font-bold text-sm transition-smooth hover:border-primary hover:scale-105",
                "aria-label": "Open profile",
                children: initials
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                t("customer.hello"),
                ","
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-display font-bold text-foreground leading-tight", children: firstName })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-3.5 h-3.5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-primary", children: [
                "PKR ",
                ((customerUser == null ? void 0 : customerUser.walletBalance) ?? 0).toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "home.notifications_button",
                onClick: () => setShowNotifPanel(true),
                className: "relative w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/40 transition-smooth",
                "aria-label": "Notifications",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-muted-foreground" }),
                  unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center", children: unreadCount > 9 ? "9+" : unreadCount })
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MapView,
            {
              center: GWADAR_CENTER,
              zoom: 13,
              showUserLocation: true,
              drivers: driverMarkers,
              className: "absolute inset-0 z-0"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-card/90 backdrop-blur-sm border border-primary/30 rounded-full px-3 py-1.5 shadow-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-primary", children: [
              ONLINE_DRIVERS.length,
              " drivers nearby"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-card/90 backdrop-blur-sm border border-border rounded-full px-3 py-1.5 shadow-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 text-primary fill-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground font-medium", children: "4.8" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-3 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { y: 60, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                transition: { duration: 0.45, delay: 0.1 },
                className: "bg-card/96 backdrop-blur-md rounded-2xl border border-border shadow-elevated overflow-hidden",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 border-b border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/20 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground truncate min-w-0 flex-1", children: "Gwadar City Centre" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full shrink-0", children: t("customer.currentLocation") })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        "data-ocid": "home.destination_input",
                        type: "text",
                        placeholder: t("customer.whereToGo"),
                        value: destQuery,
                        onChange: (e) => {
                          setDestQuery(e.target.value);
                          setShowSuggestions(true);
                        },
                        onFocus: () => setShowSuggestions(true),
                        className: "border-none bg-transparent shadow-none focus-visible:ring-0 p-0 text-sm text-foreground placeholder:text-muted-foreground h-auto flex-1 min-w-0"
                      }
                    ),
                    destQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          setDestQuery("");
                          setShowSuggestions(false);
                        },
                        "aria-label": "Clear destination",
                        className: "text-muted-foreground hover:text-foreground transition-smooth shrink-0",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                      }
                    )
                  ] }),
                  showSuggestions && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "border-t border-border max-h-56 overflow-y-auto",
                      "data-ocid": "home.suggestions_list",
                      children: [
                        filteredLocations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "px-4 py-3 text-sm text-muted-foreground", children: [
                          'No locations found for "',
                          destQuery,
                          '"'
                        ] }) : filteredLocations.map((loc, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            "data-ocid": `home.suggestion.item.${i + 1}`,
                            onClick: () => handleSelectLocation(loc),
                            className: "w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/40 text-left transition-smooth border-b border-border/40 last:border-0",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-muted/60 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-muted-foreground" }) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: loc.name }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: loc.address })
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground/60 shrink-0 capitalize", children: loc.category })
                            ]
                          },
                          loc.id
                        )),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setShowSuggestions(false),
                            className: "w-full px-4 py-2 text-xs text-muted-foreground/60 hover:text-muted-foreground border-t border-border/30 transition-smooth",
                            children: "Close"
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            ) }),
            !showSuggestions && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.3 },
                className: "bg-card/96 backdrop-blur-md border-t border-border px-4 py-3",
                children: [
                  recentSearches.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2", children: t("customer.recentSearches") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: recentSearches.slice(0, 4).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `home.recent_search.item.${i + 1}`,
                        onClick: () => {
                          const loc = gwadarLocations.find((l) => l.name === s);
                          if (loc) handleSelectLocation(loc);
                        },
                        className: "flex items-center gap-1.5 bg-muted/50 border border-border rounded-full px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-smooth",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                          s
                        ]
                      },
                      s
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2", children: t("customer.suggestedPlaces") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2", children: SUGGESTED_PLACES.map((p, i) => {
                    const loc = gwadarLocations.find(
                      (l) => l.name.includes(p.locKey.split(" ")[0])
                    );
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `home.suggested_place.item.${i + 1}`,
                        onClick: () => {
                          if (loc) handleSelectLocation(loc);
                        },
                        className: "flex flex-col items-center gap-1 p-2 rounded-xl border border-border bg-muted/30 hover:border-primary/30 hover:bg-primary/5 transition-smooth",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: p.icon }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground text-center leading-tight truncate w-full", children: p.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-primary", children: p.distance })
                        ]
                      },
                      p.id
                    );
                  }) })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showNotifPanel && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              className: "fixed inset-0 bg-background/60 backdrop-blur-sm z-40",
              onClick: () => setShowNotifPanel(false)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { x: "100%" },
              animate: { x: 0 },
              exit: { x: "100%" },
              transition: { type: "spring", damping: 28, stiffness: 260 },
              className: "fixed top-0 right-0 bottom-0 w-80 max-w-full bg-card border-l border-border z-50 flex flex-col shadow-elevated",
              "data-ocid": "notifications.panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-4 border-b border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground", children: "Notifications" }),
                    unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                      unreadCount,
                      " unread"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "notifications.mark_all_read_button",
                        onClick: () => markAllAsRead("customer"),
                        className: "text-xs text-primary hover:underline",
                        children: "Mark all read"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "notifications.close_button",
                        onClick: () => setShowNotifPanel(false),
                        className: "w-7 h-7 rounded-full bg-muted/40 flex items-center justify-center hover:bg-muted transition-smooth",
                        "aria-label": "Close notifications",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto py-2", children: customerNotifs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex flex-col items-center justify-center h-full gap-3 px-4",
                    "data-ocid": "notifications.empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-12 h-12 text-muted-foreground/20" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground text-center", children: [
                        "No notifications yet.",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "You'll see ride updates and promotions here." })
                      ] })
                    ]
                  }
                ) : customerNotifs.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: 16 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: i * 0.04 },
                    "data-ocid": `notifications.item.${i + 1}`,
                    className: cn(
                      "mx-3 mb-2 rounded-xl p-3 border transition-smooth",
                      n.isRead ? "bg-muted/20 border-border opacity-60" : "bg-card border-primary/20 shadow-card"
                    ),
                    children: [
                      !n.isRead && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-primary" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-primary font-semibold uppercase tracking-wide", children: n.type })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: n.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: n.message }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/50 mt-1.5", children: new Date(n.createdAt).toLocaleString() })
                    ]
                  },
                  n.id
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    className: "w-full text-sm",
                    onClick: () => setShowNotifPanel(false),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 mr-2 text-primary" }),
                      "Done"
                    ]
                  }
                ) })
              ]
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  HomePage as default
};
