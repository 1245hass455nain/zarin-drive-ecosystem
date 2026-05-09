import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, t as ue } from "./index-D2S5mC_U.js";
import { B as Badge } from "./badge-CtI4d2cg.js";
import { C as Card } from "./card-DEOosrQ5.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-CdYqkgKA.js";
import { m as mockDrivers } from "./mockDrivers-BlyLXLsg.js";
import { m as mockRides } from "./mockRides-D5EVF1ST.js";
import "./index-BHXDJJ9c.js";
import "./index-BstO6tBW.js";
import "./index-BBKAJGCp.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode);
function SvgAreaChart({
  data,
  colorStroke = "oklch(0.65 0.22 90)",
  gradientId = "grad1"
}) {
  if (data.length < 2) return null;
  const max = Math.max(...data.map((d) => d.value), 1);
  const W = 400;
  const H = 120;
  const step = W / (data.length - 1);
  const pts = data.map((d, i) => ({
    x: i * step,
    y: H - d.value / max * H * 0.88
  }));
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const areaPath = [
    `M ${pts[0].x.toFixed(1)} ${H}`,
    ...pts.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`),
    `L ${pts[pts.length - 1].x.toFixed(1)} ${H} Z`
  ].join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: `0 0 ${W} ${H + 24}`,
      width: "100%",
      preserveAspectRatio: "none",
      role: "img",
      "aria-label": "Line chart",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Line chart" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: gradientId, x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: colorStroke, stopOpacity: 0.3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: colorStroke, stopOpacity: 0.02 })
        ] }) }),
        [0.25, 0.5, 0.75, 1].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: 0,
            y1: H * (1 - f * 0.88),
            x2: W,
            y2: H * (1 - f * 0.88),
            stroke: "oklch(0.35 0 0)",
            strokeOpacity: 0.3,
            strokeDasharray: "4 4"
          },
          f
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: areaPath, fill: `url(#${gradientId})` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: linePath,
            fill: "none",
            stroke: colorStroke,
            strokeWidth: 2,
            strokeLinejoin: "round"
          }
        ),
        data.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: pts[i].x,
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
function SvgBarChart({
  data,
  color = "oklch(0.65 0.22 90)"
}) {
  if (data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.value), 1);
  const W = 400;
  const H = 120;
  const gap = 4;
  const barW = Math.floor((W - (data.length - 1) * gap) / data.length);
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
        [0.25, 0.5, 0.75, 1].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: 0,
            y1: H * (1 - f * 0.88),
            x2: W,
            y2: H * (1 - f * 0.88),
            stroke: "oklch(0.35 0 0)",
            strokeOpacity: 0.3,
            strokeDasharray: "4 4"
          },
          f
        )),
        data.map((d, i) => {
          const bh = Math.max(4, d.value / max * H * 0.88);
          const x = i * (barW + gap);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "rect",
              {
                x,
                y: H - bh,
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
const dailyRevenue = [
  { label: "May 1", value: 38200, rides: 89 },
  { label: "May 2", value: 41500, rides: 97 },
  { label: "May 3", value: 35100, rides: 82 },
  { label: "May 4", value: 44800, rides: 105 },
  { label: "May 5", value: 48200, rides: 113 },
  { label: "May 6", value: 52600, rides: 124 },
  { label: "May 7", value: 45800, rides: 107 }
];
const weeklyRevenue = [
  { label: "Wk 1", value: 245e3, rides: 580 },
  { label: "Wk 2", value: 288e3, rides: 680 },
  { label: "Wk 3", value: 312e3, rides: 735 },
  { label: "Wk 4", value: 296e3, rides: 698 }
];
const monthlyRevenue = [
  { label: "Nov", value: 92e4, rides: 2100 },
  { label: "Dec", value: 105e4, rides: 2400 },
  { label: "Jan", value: 112e4, rides: 2580 },
  { label: "Feb", value: 104e4, rides: 2390 },
  { label: "Mar", value: 118e4, rides: 2710 },
  { label: "Apr", value: 125e4, rides: 2870 },
  { label: "May", value: 42e4, rides: 960 }
];
const customerGrowth = [
  { label: "Nov", value: 120 },
  { label: "Dec", value: 160 },
  { label: "Jan", value: 198 },
  { label: "Feb", value: 235 },
  { label: "Mar", value: 280 },
  { label: "Apr", value: 320 },
  { label: "May", value: 370 }
];
const RANK_COLORS = {
  gold: "text-yellow-500 border-yellow-500/30 bg-yellow-500/10",
  diamond: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  platinum: "text-purple-400 border-purple-400/30 bg-purple-400/10"
};
function Reports() {
  const [period, setPeriod] = reactExports.useState("daily");
  const driverPerformance = mockDrivers.map((d) => {
    const driverRides = mockRides.filter(
      (r) => r.driverId === d.id && r.status === "completed"
    );
    const revenue = driverRides.reduce((s, r) => s + r.totalFare, 0);
    const ratedRides = driverRides.filter((r) => r.rating != null);
    const avgRating = ratedRides.length > 0 ? ratedRides.reduce((s, r) => s + (r.rating ?? 0), 0) / ratedRides.length : d.rating;
    return {
      ...d,
      rideCount: driverRides.length,
      revenue,
      avgRating: avgRating.toFixed(1)
    };
  }).sort((a, b) => b.revenue - a.revenue);
  const revenueData = period === "daily" ? dailyRevenue : period === "weekly" ? weeklyRevenue : monthlyRevenue;
  const totalRevenue = revenueData.reduce((s, d) => s + d.value, 0);
  const totalRides = revenueData.reduce((s, d) => s + d.rides, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", "data-ocid": "admin.reports.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tabs,
        {
          value: period,
          onValueChange: (v) => setPeriod(v),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "daily", "data-ocid": "admin.reports.tab.daily", children: "Daily" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "weekly", "data-ocid": "admin.reports.tab.weekly", children: "Weekly" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "monthly", "data-ocid": "admin.reports.tab.monthly", children: "Monthly" })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => {
              console.log("Exporting PDF report", { period, revenueData });
              ue.success("PDF report exported");
            },
            "data-ocid": "admin.reports.pdf_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 mr-1" }),
              " PDF"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => {
              console.log("Exporting Excel report", { period, revenueData });
              ue.success("Excel report exported");
            },
            "data-ocid": "admin.reports.excel_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 mr-1" }),
              " Excel"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
      {
        label: "Total Revenue",
        value: `Rs. ${totalRevenue.toLocaleString()}`,
        color: "text-primary"
      },
      {
        label: "Total Rides",
        value: totalRides.toLocaleString(),
        color: "text-blue-400"
      },
      {
        label: "Avg Fare",
        value: `Rs. ${totalRides > 0 ? Math.round(totalRevenue / totalRides).toLocaleString() : 0}`,
        color: "text-green-400"
      },
      {
        label: "Platform Commission (20%)",
        value: `Rs. ${Math.round(totalRevenue * 0.2).toLocaleString()}`,
        color: "text-orange-400"
      }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: s.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: ["text-xl font-display font-bold mt-1", s.color].join(
            " "
          ),
          children: s.value
        }
      )
    ] }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1 text-sm", children: "Revenue Trend" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-4 capitalize", children: [
        period,
        " breakdown"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { value: "revenue", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "revenue", forceMount: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgBarChart, { data: revenueData }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1 text-sm", children: "Customer Growth" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-4", children: [
        "Total registered:",
        " ",
        customerGrowth[customerGrowth.length - 1].value.toLocaleString()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SvgAreaChart,
        {
          data: customerGrowth,
          colorStroke: "oklch(0.7 0.16 142)",
          gradientId: "growthGrad"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Driver Performance" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Driver" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Vehicle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Rides" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Revenue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Commission" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Avg Rating" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Rank" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: driverPerformance.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/50 hover:bg-muted/20 transition-smooth",
            "data-ocid": `admin.reports.driver_row.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground font-mono text-xs", children: i + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: d.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 capitalize text-muted-foreground", children: d.vehicleType }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-foreground", children: d.rideCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono text-primary", children: [
                "Rs. ",
                d.revenue.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono text-orange-400", children: [
                "Rs. ",
                Math.round(d.revenue * 0.2).toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right", children: [
                "⭐ ",
                d.avgRating
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: [
                    "capitalize text-xs",
                    RANK_COLORS[d.rank] ?? ""
                  ].join(" "),
                  children: d.rank
                }
              ) })
            ]
          },
          d.id
        )) })
      ] }) })
    ] })
  ] });
}
export {
  Reports as default
};
