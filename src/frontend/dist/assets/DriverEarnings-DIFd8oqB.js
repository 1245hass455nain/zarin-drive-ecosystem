import { a as useAuthStore, r as reactExports, s as navigate, j as jsxRuntimeExports, B as Button, t as ue } from "./index-D2S5mC_U.js";
import { m as mockRides } from "./mockRides-D5EVF1ST.js";
const WEEKLY_DATA = [
  { day: "Mon", amount: 1200 },
  { day: "Tue", amount: 980 },
  { day: "Wed", amount: 1540 },
  { day: "Thu", amount: 2100 },
  { day: "Fri", amount: 1840 },
  { day: "Sat", amount: 2640 },
  { day: "Sun", amount: 760 }
];
const NAV_ITEMS = [
  { key: "home", label: "Home", icon: "🏠" },
  { key: "earnings", label: "Earnings", icon: "💰" },
  { key: "rank", label: "Rank", icon: "🏆" },
  { key: "profile", label: "Profile", icon: "👤" }
];
function DriverEarnings() {
  const driver = useAuthStore((s) => s.driverUser);
  const [filter, setFilter] = reactExports.useState("week");
  if (!driver) {
    navigate("driver", "login");
    return null;
  }
  const driverRides = mockRides.filter(
    (r) => r.driverId === driver.id && r.status === "completed"
  );
  const todayEarnings = 1840;
  const todayTrips = 7;
  const weekTotal = WEEKLY_DATA.reduce((a, b) => a + b.amount, 0);
  const monthTotal = weekTotal * 4 + 3200;
  const maxBar = Math.max(...WEEKLY_DATA.map((d) => d.amount));
  const displayEarnings = filter === "today" ? todayEarnings : filter === "week" ? weekTotal : monthTotal;
  const displayTrips = filter === "today" ? todayTrips : filter === "week" ? 42 : 168;
  const displayCommission = displayEarnings * 0.2;
  function handleNav(key) {
    sessionStorage.setItem("zarin-driver-page", key);
    navigate("driver", key);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-4 py-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => handleNav("home"),
          className: "text-muted-foreground hover:text-foreground transition-smooth",
          "data-ocid": "earnings.back_button",
          children: "←"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "My Earnings" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-4 py-4 space-y-4 pb-24 overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex bg-muted/40 rounded-xl p-1 gap-1",
          "data-ocid": "earnings.filter_tabs",
          children: ["today", "week", "month"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setFilter(f),
              "data-ocid": `earnings.filter_${f}`,
              className: `flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-smooth ${filter === f ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"}`,
              children: f === "today" ? "Today" : f === "week" ? "This Week" : "This Month"
            },
            f
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Total Earned" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-display font-bold text-primary", children: [
              "Rs. ",
              displayEarnings.toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              displayTrips,
              " trips"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive mt-1", children: [
              "- Rs. ",
              displayCommission.toFixed(0),
              " commission"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border flex gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Net Earnings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-foreground", children: [
              "Rs. ",
              (displayEarnings * 0.8).toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Avg per trip" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-foreground", children: [
              "Rs.",
              " ",
              displayTrips > 0 ? (displayEarnings / displayTrips).toFixed(0) : 0
            ] })
          ] })
        ] })
      ] }),
      filter !== "today" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-2xl p-4",
          "data-ocid": "earnings.weekly_chart",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-4", children: "This Week's Performance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-2 h-32", children: WEEKLY_DATA.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex-1 flex flex-col items-center gap-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-full rounded-t-lg transition-smooth ${i === 4 ? "bg-primary" : "bg-primary/40"}`,
                      style: { height: `${d.amount / maxBar * 100}%` }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: d.day })
                ]
              },
              d.day
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between mt-2", children: WEEKLY_DATA.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs text-muted-foreground flex-1 text-center",
                children: d.amount >= 1e3 ? `${(d.amount / 1e3).toFixed(1)}k` : d.amount
              },
              d.day
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Wallet Balance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-primary", children: [
            "Rs. ",
            driver.walletBalance.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Commission Due" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-destructive", children: [
            "Rs. ",
            (displayEarnings * 0.2).toFixed(0)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => ue.success("Payment request submitted to admin"),
            className: "border-primary/40 text-primary hover:bg-primary/10",
            "data-ocid": "earnings.request_payment_button",
            children: "Request"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-2xl overflow-hidden",
          "data-ocid": "earnings.ride_history_table",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Ride History" }) }),
            driverRides.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: mockRides.filter((r) => r.status === "completed").slice(0, 5).map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "px-4 py-3",
                "data-ocid": `earnings.ride_item.${idx + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(r.startTime).toLocaleDateString() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground truncate", children: [
                      r.pickupAddress,
                      " → ",
                      r.dropAddress
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right ml-3 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "- Rs. ",
                      (r.totalFare * 0.2).toFixed(0),
                      " comm."
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-primary", children: [
                      "Rs. ",
                      (r.totalFare * 0.8).toFixed(0)
                    ] })
                  ] })
                ] })
              },
              r.id
            )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: driverRides.slice(0, 10).map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "px-4 py-3",
                "data-ocid": `earnings.ride_item.${idx + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(r.startTime).toLocaleDateString() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground truncate", children: [
                      r.pickupAddress,
                      " → ",
                      r.dropAddress
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right ml-3 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "- Rs. ",
                      (r.totalFare * 0.2).toFixed(0)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-primary", children: [
                      "Rs. ",
                      (r.totalFare * 0.8).toFixed(0)
                    ] })
                  ] })
                ] })
              },
              r.id
            )) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 flex justify-around", children: NAV_ITEMS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => handleNav(item.key),
        "data-ocid": `earnings.nav_${item.key}`,
        className: `flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-smooth ${item.key === "earnings" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
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
  DriverEarnings as default
};
