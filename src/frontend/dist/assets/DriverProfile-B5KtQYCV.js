import { a as useAuthStore, r as reactExports, s as navigate, j as jsxRuntimeExports, B as Button, T as ThemeToggle, v as LanguageToggle, t as ue } from "./index-D2S5mC_U.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-z0beCMMA.js";
import { I as Input } from "./input-BTHBc13a.js";
import { L as Label } from "./label-C9UBYSRz.js";
import { m as mockRides } from "./mockRides-D5EVF1ST.js";
import "./index-BHXDJJ9c.js";
import "./index-DisWonvz.js";
import "./index-BBKAJGCp.js";
const VEHICLE_ICONS = {
  bike: "🏍️",
  rickshaw: "🛺",
  car: "🚗",
  premium: "🚙"
};
const MOCK_RATINGS = [5, 4, 5, 5, 4];
function maskCnic(cnic) {
  if (cnic.length < 13) return "XXXXX-XXXXXXX-X";
  const clean = cnic.replace(/-/g, "");
  return `${"X".repeat(5)}-${"X".repeat(3)}${clean.slice(8, 12)}-${clean.slice(12)}`;
}
const NAV_ITEMS = [
  { key: "home", label: "Home", icon: "🏠" },
  { key: "earnings", label: "Earnings", icon: "💰" },
  { key: "rank", label: "Rank", icon: "🏆" },
  { key: "profile", label: "Profile", icon: "👤" }
];
function DriverProfile() {
  const driver = useAuthStore((s) => s.driverUser);
  const driverLogout = useAuthStore((s) => s.driverLogout);
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const [vehiclePlate, setVehiclePlate] = reactExports.useState((driver == null ? void 0 : driver.vehiclePlate) ?? "");
  const [vehicleModel, setVehicleModel] = reactExports.useState("Toyota Corolla");
  const [vehicleColor, setVehicleColor] = reactExports.useState("White");
  if (!driver) {
    navigate("driver", "login");
    return null;
  }
  const initials = driver.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const joinedDate = "March 2024";
  const driverRides = mockRides.filter((r) => r.status === "completed").slice(0, 10);
  function handleNav(key) {
    sessionStorage.setItem("zarin-driver-page", key);
    navigate("driver", key);
  }
  function handleSaveVehicle() {
    ue.success("Vehicle details updated");
    setEditOpen(false);
  }
  function handleLogout() {
    driverLogout();
    sessionStorage.removeItem("zarin-driver-page");
    navigate("driver", "login");
    ue.info("Logged out");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-4 py-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => handleNav("home"),
          className: "text-muted-foreground hover:text-foreground transition-smooth",
          "data-ocid": "driver_profile.back_button",
          children: "←"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "flex-1 text-xl font-display font-bold text-foreground", children: "My Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => setEditOpen(true),
          className: "border-primary/40 text-primary hover:bg-primary/10",
          "data-ocid": "driver_profile.edit_button",
          children: "Edit"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-4 py-4 space-y-4 pb-24 overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-primary", children: initials }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-display font-semibold text-foreground truncate", children: driver.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: driver.phone }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "Joined ",
              joinedDate
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-base ${s <= Math.round(driver.rating) ? "text-primary" : "text-muted"}`,
                children: "★"
              },
              s
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground ml-1", children: driver.rating.toFixed(1) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground capitalize", children: [
            driver.rank,
            " Rank"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-3", children: "Vehicle Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: VEHICLE_ICONS[driver.vehicleType] ?? "🚗" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground capitalize", children: driver.vehicleType === "premium" ? "Premium Car" : driver.vehicleType.charAt(0).toUpperCase() + driver.vehicleType.slice(1) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              vehicleModel,
              " · ",
              vehicleColor
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl px-4 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Number Plate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-base font-bold text-foreground tracking-widest", children: vehiclePlate })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-2", children: "CNIC (Masked)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-base text-muted-foreground tracking-widest", children: maskCnic("4210112345671") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "For security, only last digits are visible" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-3", children: "Rating Breakdown" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-display font-bold text-primary", children: driver.rating.toFixed(1) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 justify-center mt-1", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-sm ${s <= Math.round(driver.rating) ? "text-primary" : "text-muted"}`,
                children: "★"
              },
              s
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Overall" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-1", children: [5, 4, 3, 2, 1].map((star) => {
            const count = MOCK_RATINGS.filter((r) => r === star).length;
            const pct = count / MOCK_RATINGS.length * 100;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-3", children: star }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full bg-primary rounded-full",
                  style: { width: `${pct}%` }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-4", children: count })
            ] }, star);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Last 5 ratings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["5-first", "4-second", "5-third", "5-fourth", "4-fifth"].map((key) => {
          const val = Number(key.split("-")[0]);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${val >= 4 ? "bg-primary/20 text-primary" : "bg-destructive/10 text-destructive"}`,
              children: [
                val,
                "★"
              ]
            },
            key
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-2xl overflow-hidden",
          "data-ocid": "driver_profile.ride_history",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Recent Rides" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: driverRides.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "px-4 py-3",
                "data-ocid": `driver_profile.ride_item.${idx + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(r.startTime).toLocaleDateString("en-PK", {
                      day: "2-digit",
                      month: "short"
                    }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground truncate", children: [
                      r.pickupAddress,
                      " → ",
                      r.dropAddress
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: r.customerName })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right ml-3 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-primary", children: [
                      "Rs. ",
                      r.totalFare.toLocaleString()
                    ] }),
                    r.rating && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      r.rating,
                      "★"
                    ] })
                  ] })
                ] })
              },
              r.id
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-3", children: "Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Theme" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Language" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageToggle, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: handleLogout,
            className: "w-full border-destructive/40 text-destructive hover:bg-destructive/10",
            "data-ocid": "driver_profile.logout_button",
            children: "Logout"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: editOpen, onOpenChange: setEditOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "bg-card border-border",
        "data-ocid": "driver_profile.edit_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Edit Vehicle Details" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground", children: "Number Plate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: vehiclePlate,
                  onChange: (e) => setVehiclePlate(e.target.value),
                  className: "bg-background border-input font-mono",
                  "data-ocid": "driver_profile.plate_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground", children: "Vehicle Model" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: vehicleModel,
                  onChange: (e) => setVehicleModel(e.target.value),
                  className: "bg-background border-input",
                  "data-ocid": "driver_profile.model_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground", children: "Vehicle Color" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: vehicleColor,
                  onChange: (e) => setVehicleColor(e.target.value),
                  className: "bg-background border-input",
                  "data-ocid": "driver_profile.color_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => setEditOpen(false),
                  className: "flex-1",
                  "data-ocid": "driver_profile.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleSaveVehicle,
                  className: "flex-1 bg-primary text-primary-foreground",
                  "data-ocid": "driver_profile.save_button",
                  children: "Save Changes"
                }
              )
            ] })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 flex justify-around", children: NAV_ITEMS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => handleNav(item.key),
        "data-ocid": `driver_profile.nav_${item.key}`,
        className: `flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-smooth ${item.key === "profile" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
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
  DriverProfile as default
};
