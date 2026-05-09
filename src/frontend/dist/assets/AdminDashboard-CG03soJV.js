import { c as createLucideIcon, j as jsxRuntimeExports, x as Car } from "./index-D2S5mC_U.js";
import { B as Badge } from "./badge-CtI4d2cg.js";
import { C as Card } from "./card-DEOosrQ5.js";
import { U as Users } from "./users-CejCx-4x.js";
import { C as Clock } from "./clock-DBLc99QC.js";
import { C as CircleX } from "./circle-x-C13UDlIa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function BarChart({
  data,
  color = "oklch(0.65 0.22 90)"
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const W = 400;
  const H = 140;
  const barW = Math.floor((W - (data.length - 1) * 4) / data.length);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: `0 0 ${W} ${H + 24}`,
      width: "100%",
      preserveAspectRatio: "none",
      role: "img",
      "aria-label": "Bar chart",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Bar chart" }),
        data.map((d, i) => {
          const bh = Math.max(4, d.value / max * H);
          const x = i * (barW + 4);
          const y = H - bh;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "rect",
              {
                x,
                y,
                width: barW,
                height: bh,
                rx: 3,
                fill: color,
                fillOpacity: 0.85
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: x + barW / 2,
                y: H + 16,
                textAnchor: "middle",
                fontSize: 9,
                fill: "oklch(0.6 0 0)",
                children: d.label
              }
            )
          ] }, d.label);
        })
      ]
    }
  );
}
function AreaChart({
  data,
  color = "oklch(0.65 0.22 90)"
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const W = 400;
  const H = 120;
  const step = W / (data.length - 1);
  const points = data.map((d, i) => ({
    x: i * step,
    y: H - d.value / max * H * 0.9
  }));
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = [
    `M ${points[0].x} ${H}`,
    ...points.map((p) => `L ${p.x} ${p.y}`),
    `L ${points[points.length - 1].x} ${H}`,
    "Z"
  ].join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: `0 0 ${W} ${H + 24}`,
      width: "100%",
      preserveAspectRatio: "none",
      role: "img",
      "aria-label": "Area chart",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Area chart" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "areaGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: color, stopOpacity: 0.3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: color, stopOpacity: 0.02 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: areaPath, fill: "url(#areaGrad)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: linePath,
            fill: "none",
            stroke: color,
            strokeWidth: 2,
            strokeLinejoin: "round"
          }
        ),
        data.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: points[i].x,
            y: H + 16,
            textAnchor: "middle",
            fontSize: 9,
            fill: "oklch(0.6 0 0)",
            children: d.label
          },
          d.label
        ))
      ]
    }
  );
}
const ridesPerHour = [
  { label: "6a", value: 4 },
  { label: "7a", value: 9 },
  { label: "8a", value: 18 },
  { label: "9a", value: 24 },
  { label: "10a", value: 16 },
  { label: "11a", value: 12 },
  { label: "12p", value: 20 },
  { label: "1p", value: 22 },
  { label: "2p", value: 14 },
  { label: "3p", value: 10 },
  { label: "4p", value: 13 },
  { label: "5p", value: 28 },
  { label: "6p", value: 31 },
  { label: "7p", value: 26 },
  { label: "8p", value: 18 },
  { label: "9p", value: 11 }
];
const revenueWeek = [
  { label: "Mon", value: 38200 },
  { label: "Tue", value: 42100 },
  { label: "Wed", value: 35600 },
  { label: "Thu", value: 48900 },
  { label: "Fri", value: 52300 },
  { label: "Sat", value: 61200 },
  { label: "Sun", value: 45800 }
];
const peakHours = [
  [0, 0, 1, 1, 0, 0, 0, 0, 2, 4, 3, 2, 4, 3, 2, 1, 1, 2, 5, 5, 4, 3, 2, 1],
  [0, 0, 0, 1, 0, 0, 0, 1, 3, 5, 4, 3, 5, 4, 3, 2, 2, 3, 6, 6, 5, 4, 2, 1],
  [0, 0, 0, 0, 0, 0, 1, 2, 4, 5, 5, 4, 5, 4, 4, 3, 3, 4, 7, 7, 6, 5, 3, 1],
  [0, 0, 0, 0, 0, 1, 1, 2, 5, 6, 5, 4, 6, 5, 4, 3, 4, 5, 8, 8, 7, 5, 3, 2],
  [0, 0, 0, 0, 0, 1, 2, 3, 6, 7, 6, 5, 7, 6, 5, 4, 5, 6, 9, 9, 8, 6, 4, 2],
  [0, 0, 0, 0, 1, 1, 2, 4, 5, 6, 6, 5, 6, 5, 5, 4, 5, 6, 8, 8, 7, 5, 4, 2],
  [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 3, 3, 4, 3, 3, 2, 2, 3, 5, 5, 4, 3, 2, 1]
];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxPeak = 9;
const STATS = [
  {
    label: "Total Rides",
    value: "1,247",
    sub: "+12% today",
    icon: Car,
    color: "text-primary",
    iconStyle: void 0
  },
  {
    label: "Online Drivers",
    value: "8",
    sub: "3 currently on ride",
    icon: TrendingUp,
    color: "text-primary",
    iconStyle: { color: "#16a34a" }
  },
  {
    label: "Active Customers",
    value: "342",
    sub: "online now",
    icon: Users,
    color: "text-primary",
    iconStyle: { color: "#3b82f6" }
  },
  {
    label: "Today Revenue",
    value: "Rs. 42,500",
    sub: "All vehicles",
    icon: DollarSign,
    color: "text-primary",
    iconStyle: void 0
  },
  {
    label: "Pending Payments",
    value: "Rs. 8,200",
    sub: "Awaiting clearance",
    icon: Clock,
    color: "text-primary",
    iconStyle: { color: "#f97316" }
  },
  {
    label: "Cancelled Rides",
    value: "23",
    sub: "Today",
    icon: CircleX,
    color: "text-destructive"
  }
];
const RECENT_ACTIVITY = [
  { time: "09:14", text: "Driver Iqbal Zehri was suspended", type: "warn" },
  {
    time: "08:55",
    text: "Payment received from Noor Ahmed – Rs. 850",
    type: "success"
  },
  { time: "08:30", text: "Ride #005 force completed by admin", type: "info" },
  {
    time: "07:50",
    text: "New activation code generated: ZRN-ABC",
    type: "info"
  },
  {
    time: "07:22",
    text: "Customer Waseem Pirkani banned from platform",
    type: "error"
  }
];
function AdminDashboard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", "data-ocid": "admin.dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-4", children: STATS.map((s) => {
      const Icon = s.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide truncate", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-foreground mt-1", children: s.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: s.sub })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "p-2 rounded-lg bg-muted flex-shrink-0 ml-2",
            style: s.iconStyle,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
          }
        )
      ] }) }, s.label);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1 text-sm", children: "Rides Per Hour — Today" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Peak: 6pm with 31 rides" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BarChart, { data: ridesPerHour })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1 text-sm", children: "Revenue — Last 7 Days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-4", children: [
          "Total: Rs.",
          " ",
          revenueWeek.reduce((s, d) => s + d.value, 0).toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AreaChart, { data: revenueWeek, color: "oklch(0.65 0.22 90)" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-4", children: "Peak Hours Heatmap" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[600px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10" }),
          [
            "0h",
            "_1",
            "_2",
            "3h",
            "_4",
            "_5",
            "6h",
            "_6",
            "_7",
            "9h",
            "_8",
            "_9",
            "12h",
            "_10",
            "_11",
            "15h",
            "_12",
            "_13",
            "18h",
            "_14",
            "_15",
            "21h",
            "_16",
            "_17"
          ].map((label) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex-1 text-center text-xs text-muted-foreground",
              children: label.startsWith("_") ? "" : label
            },
            label
          ))
        ] }),
        days.map((day, di) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 text-xs text-muted-foreground flex items-center", children: day }),
          peakHours[di].map((val, hi) => {
            const opacity = val / maxPeak;
            const hour = `${String(hi).padStart(2, "0")}:00`;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex-1 h-6 rounded-sm",
                style: {
                  backgroundColor: `oklch(0.65 0.22 90 / ${(opacity * 0.9 + 0.05).toFixed(2)})`
                },
                title: `${day} ${hour} — ${val} rides`
              },
              `${day}-${hour}`
            );
          })
        ] }, day)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Low" }),
          [0.1, 0.3, 0.5, 0.7, 0.9].map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-4 h-4 rounded-sm",
              style: { backgroundColor: `oklch(0.65 0.22 90 / ${o})` }
            },
            o
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "High" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-3 text-sm", children: "Driver Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
          {
            status: "Online",
            count: 8,
            dotStyle: { backgroundColor: "#16a34a" }
          },
          {
            status: "On Ride",
            count: 3,
            dotStyle: { backgroundColor: "#3b82f6" }
          },
          {
            status: "Offline",
            count: 4,
            dotStyle: void 0
          }
        ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-2.5 h-2.5 rounded-full flex-shrink-0 bg-muted",
              style: s.dotStyle
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground flex-1", children: s.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: s.count })
        ] }, s.status)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground mb-3 text-sm flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary" }),
          " Recent Activity"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: RECENT_ACTIVITY.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 text-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-mono flex-shrink-0 pt-0.5", children: a.time }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: a.type === "success" ? { color: "#4ade80" } : a.type === "warn" ? { color: "#fb923c" } : void 0,
                  className: a.type === "error" ? "text-destructive" : a.type === "info" ? "text-foreground" : "",
                  children: a.text
                }
              )
            ]
          },
          `${a.time}-${a.text.slice(0, 10)}`
        )) })
      ] })
    ] })
  ] });
}
export {
  AdminDashboard as default
};
