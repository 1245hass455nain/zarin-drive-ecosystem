import { u as useTranslation, r as reactExports, j as jsxRuntimeExports, m as motion, d as cn, Z as Zap, B as Button } from "./index-D2S5mC_U.js";
import { m as mockDrivers } from "./mockDrivers-BlyLXLsg.js";
import { A as ArrowLeft } from "./arrow-left-BrvHSzSU.js";
import { U as Users } from "./users-CejCx-4x.js";
import { C as Clock } from "./clock-DBLc99QC.js";
const VEHICLES = [
  {
    type: "bike",
    label: "Bike",
    labelUr: "بائیک",
    description: "Fast & affordable, solo rides",
    emoji: "🏍️",
    baseFare: 80,
    perKm: 20,
    capacity: 1
  },
  {
    type: "rickshaw",
    label: "Rickshaw",
    labelUr: "رکشا",
    description: "Economical, open-air comfort",
    emoji: "🛣️",
    baseFare: 120,
    perKm: 30,
    capacity: 3
  },
  {
    type: "car",
    label: "Standard Car",
    labelUr: "اسٹینڈرڈ کار",
    description: "Comfortable AC ride for all",
    emoji: "🚗",
    baseFare: 150,
    perKm: 40,
    capacity: 4,
    badge: "Popular"
  },
  {
    type: "premium",
    label: "Premium Car",
    labelUr: "پریمیم کار",
    description: "Luxury experience, leather seats",
    emoji: "🚙",
    baseFare: 250,
    perKm: 60,
    capacity: 5,
    badge: "Luxury"
  }
];
const ETA_MAP = {
  bike: 3,
  rickshaw: 5,
  car: 6,
  premium: 8
};
function VehicleSelection({
  destination,
  pickup = "Gwadar City Centre",
  onBack,
  onConfirm
}) {
  const { t } = useTranslation();
  const [selected, setSelected] = reactExports.useState("car");
  const distanceKm = destination ? Math.max(1.2, 3.5 + (destination.lat % 2 + destination.lng % 2)) : 4.2;
  const selectedVehicle = VEHICLES.find((v) => v.type === selected);
  const estimatedFare = Math.round(
    selectedVehicle.baseFare + selectedVehicle.perKm * distanceKm
  );
  const nearbyCount = (type) => mockDrivers.filter((d) => d.vehicleType === type && d.status === "online").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col",
      "data-ocid": "vehicle_selection.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "bg-card border-b border-border px-4 h-14 flex items-center gap-3 shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "vehicle_selection.back_button",
              onClick: onBack,
              className: "w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted/50 transition-smooth",
              "aria-label": "Go back",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5 text-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-display font-bold text-foreground", children: t("customer.selectVehicle") }),
            destination && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
              "To: ",
              destination.name
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 border border-border rounded-full px-3 py-1 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
            distanceKm.toFixed(1),
            " km"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/20 border-b border-border px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-primary/25 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground truncate", children: pickup })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-1 h-4 w-px border-l-2 border-dashed border-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-destructive ring-2 ring-destructive/25 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground truncate", children: (destination == null ? void 0 : destination.name) ?? "Select destination" })
            ] })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: VEHICLES.map((v, i) => {
            const fare = Math.round(v.baseFare + v.perKm * distanceKm);
            const nearby = nearbyCount(v.type);
            const eta = ETA_MAP[v.type];
            const isSelected = selected === v.type;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                type: "button",
                "data-ocid": `vehicle_selection.vehicle.item.${i + 1}`,
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: i * 0.07 },
                onClick: () => setSelected(v.type),
                className: cn(
                  "w-full rounded-xl border p-4 flex items-center gap-4 transition-smooth text-left relative overflow-hidden",
                  isSelected ? "border-primary bg-primary/8 shadow-elevated" : "border-border bg-card hover:border-primary/30 hover:bg-muted/10"
                ),
                children: [
                  isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 bottom-0 w-0.5 bg-primary rounded-l-xl" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-smooth",
                        isSelected ? "bg-primary/20" : "bg-muted/40"
                      ),
                      children: v.emoji
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: cn(
                              "font-display font-bold text-base",
                              isSelected ? "text-primary" : "text-foreground"
                            ),
                            children: v.label
                          }
                        ),
                        v.badge && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: cn(
                              "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                              v.badge === "Popular" ? "bg-primary/15 text-primary" : "bg-muted/60 text-muted-foreground"
                            ),
                            children: v.badge
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: cn(
                            "font-bold text-lg",
                            isSelected ? "text-primary" : "text-foreground"
                          ),
                          children: [
                            "PKR ",
                            fare
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1.5 truncate", children: v.description }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
                        " ",
                        v.capacity
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-primary", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                        " ",
                        eta,
                        " min"
                      ] }),
                      nearby > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3 text-primary" }),
                        nearby,
                        " nearby"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50", children: "No drivers" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground/60 mt-1", children: [
                      "Rs.",
                      v.baseFare,
                      " base + Rs.",
                      v.perKm,
                      "/km"
                    ] })
                  ] }),
                  isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { scale: 0 },
                      animate: { scale: 1 },
                      className: "w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-primary-foreground font-bold", children: "✓" })
                    }
                  )
                ]
              },
              v.type
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-t border-border p-4 shadow-elevated", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("customer.estimatedFare") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-black text-primary", children: [
                "PKR ",
                estimatedFare
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                distanceKm.toFixed(1),
                " km • ",
                selectedVehicle.label
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("customer.eta") || "ETA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-display font-bold text-foreground", children: [
                ETA_MAP[selected],
                " ",
                t("customer.etaMinutes")
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "vehicle_selection.confirm_button",
              className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 text-base",
              onClick: () => onConfirm(selected, estimatedFare),
              children: [
                t("customer.confirmRide"),
                " (",
                selectedVehicle.label,
                ")"
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  VehicleSelection as default
};
