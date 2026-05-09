import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Activity,
  Car,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import type React from "react";

// Inline SVG bar chart
function BarChart({
  data,
  color = "oklch(0.65 0.22 90)",
}: { data: { label: string; value: number }[]; color?: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const W = 400;
  const H = 140;
  const barW = Math.floor((W - (data.length - 1) * 4) / data.length);

  return (
    <svg
      viewBox={`0 0 ${W} ${H + 24}`}
      width="100%"
      preserveAspectRatio="none"
      role="img"
      aria-label="Bar chart"
    >
      <title>Bar chart</title>
      {data.map((d, i) => {
        const bh = Math.max(4, (d.value / max) * H);
        const x = i * (barW + 4);
        const y = H - bh;
        return (
          <g key={d.label}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={bh}
              rx={3}
              fill={color}
              fillOpacity={0.85}
            />
            <text
              x={x + barW / 2}
              y={H + 16}
              textAnchor="middle"
              fontSize={9}
              fill="oklch(0.6 0 0)"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// Inline SVG area chart
function AreaChart({
  data,
  color = "oklch(0.65 0.22 90)",
}: { data: { label: string; value: number }[]; color?: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const W = 400;
  const H = 120;
  const step = W / (data.length - 1);

  const points = data.map((d, i) => ({
    x: i * step,
    y: H - (d.value / max) * H * 0.9,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
  const areaPath = [
    `M ${points[0].x} ${H}`,
    ...points.map((p) => `L ${p.x} ${p.y}`),
    `L ${points[points.length - 1].x} ${H}`,
    "Z",
  ].join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H + 24}`}
      width="100%"
      preserveAspectRatio="none"
      role="img"
      aria-label="Area chart"
    >
      <title>Area chart</title>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#areaGrad)" />
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {data.map((d, i) => (
        <text
          key={d.label}
          x={points[i].x}
          y={H + 16}
          textAnchor="middle"
          fontSize={9}
          fill="oklch(0.6 0 0)"
        >
          {d.label}
        </text>
      ))}
    </svg>
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
  { label: "9p", value: 11 },
];

const revenueWeek = [
  { label: "Mon", value: 38200 },
  { label: "Tue", value: 42100 },
  { label: "Wed", value: 35600 },
  { label: "Thu", value: 48900 },
  { label: "Fri", value: 52300 },
  { label: "Sat", value: 61200 },
  { label: "Sun", value: 45800 },
];

const peakHours = [
  [0, 0, 1, 1, 0, 0, 0, 0, 2, 4, 3, 2, 4, 3, 2, 1, 1, 2, 5, 5, 4, 3, 2, 1],
  [0, 0, 0, 1, 0, 0, 0, 1, 3, 5, 4, 3, 5, 4, 3, 2, 2, 3, 6, 6, 5, 4, 2, 1],
  [0, 0, 0, 0, 0, 0, 1, 2, 4, 5, 5, 4, 5, 4, 4, 3, 3, 4, 7, 7, 6, 5, 3, 1],
  [0, 0, 0, 0, 0, 1, 1, 2, 5, 6, 5, 4, 6, 5, 4, 3, 4, 5, 8, 8, 7, 5, 3, 2],
  [0, 0, 0, 0, 0, 1, 2, 3, 6, 7, 6, 5, 7, 6, 5, 4, 5, 6, 9, 9, 8, 6, 4, 2],
  [0, 0, 0, 0, 1, 1, 2, 4, 5, 6, 6, 5, 6, 5, 5, 4, 5, 6, 8, 8, 7, 5, 4, 2],
  [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 3, 3, 4, 3, 3, 2, 2, 3, 5, 5, 4, 3, 2, 1],
];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxPeak = 9;

const STATS: {
  label: string;
  value: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  iconStyle?: React.CSSProperties;
}[] = [
  {
    label: "Total Rides",
    value: "1,247",
    sub: "+12% today",
    icon: Car,
    color: "text-primary",
    iconStyle: undefined,
  },
  {
    label: "Online Drivers",
    value: "8",
    sub: "3 currently on ride",
    icon: TrendingUp,
    color: "text-primary",
    iconStyle: { color: "#16a34a" } as React.CSSProperties,
  },
  {
    label: "Active Customers",
    value: "342",
    sub: "online now",
    icon: Users,
    color: "text-primary",
    iconStyle: { color: "#3b82f6" } as React.CSSProperties,
  },
  {
    label: "Today Revenue",
    value: "Rs. 42,500",
    sub: "All vehicles",
    icon: DollarSign,
    color: "text-primary",
    iconStyle: undefined,
  },
  {
    label: "Pending Payments",
    value: "Rs. 8,200",
    sub: "Awaiting clearance",
    icon: Clock,
    color: "text-primary",
    iconStyle: { color: "#f97316" } as React.CSSProperties,
  },
  {
    label: "Cancelled Rides",
    value: "23",
    sub: "Today",
    icon: XCircle,
    color: "text-destructive",
  },
];

const RECENT_ACTIVITY = [
  { time: "09:14", text: "Driver Iqbal Zehri was suspended", type: "warn" },
  {
    time: "08:55",
    text: "Payment received from Noor Ahmed – Rs. 850",
    type: "success",
  },
  { time: "08:30", text: "Ride #005 force completed by admin", type: "info" },
  {
    time: "07:50",
    text: "New activation code generated: ZRN-ABC",
    type: "info",
  },
  {
    time: "07:22",
    text: "Customer Waseem Pirkani banned from platform",
    type: "error",
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6" data-ocid="admin.dashboard.page">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-4 bg-card border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide truncate">
                    {s.label}
                  </p>
                  <p className="text-xl font-display font-bold text-foreground mt-1">
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {s.sub}
                  </p>
                </div>
                <div
                  className="p-2 rounded-lg bg-muted flex-shrink-0 ml-2"
                  style={s.iconStyle}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5 bg-card border-border">
          <h3 className="font-semibold text-foreground mb-1 text-sm">
            Rides Per Hour — Today
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Peak: 6pm with 31 rides
          </p>
          <BarChart data={ridesPerHour} />
        </Card>

        <Card className="p-5 bg-card border-border">
          <h3 className="font-semibold text-foreground mb-1 text-sm">
            Revenue — Last 7 Days
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Total: Rs.{" "}
            {revenueWeek.reduce((s, d) => s + d.value, 0).toLocaleString()}
          </p>
          <AreaChart data={revenueWeek} color="oklch(0.65 0.22 90)" />
        </Card>
      </div>

      {/* Heatmap */}
      <Card className="p-5 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-4">
          Peak Hours Heatmap
        </h3>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="flex gap-1 mb-1">
              <div className="w-10" />
              {[
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
                "_17",
              ].map((label) => (
                <div
                  key={label}
                  className="flex-1 text-center text-xs text-muted-foreground"
                >
                  {label.startsWith("_") ? "" : label}
                </div>
              ))}
            </div>
            {days.map((day, di) => (
              <div key={day} className="flex gap-1 mb-1">
                <div className="w-10 text-xs text-muted-foreground flex items-center">
                  {day}
                </div>
                {peakHours[di].map((val, hi) => {
                  const opacity = val / maxPeak;
                  const hour = `${String(hi).padStart(2, "0")}:00`;
                  return (
                    <div
                      key={`${day}-${hour}`}
                      className="flex-1 h-6 rounded-sm"
                      style={{
                        backgroundColor: `oklch(0.65 0.22 90 / ${(opacity * 0.9 + 0.05).toFixed(2)})`,
                      }}
                      title={`${day} ${hour} — ${val} rides`}
                    />
                  );
                })}
              </div>
            ))}
            <div className="flex items-center gap-2 mt-3 justify-end">
              <span className="text-xs text-muted-foreground">Low</span>
              {[0.1, 0.3, 0.5, 0.7, 0.9].map((o) => (
                <div
                  key={o}
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: `oklch(0.65 0.22 90 / ${o})` }}
                />
              ))}
              <span className="text-xs text-muted-foreground">High</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Bottom row: driver status + recent activity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="p-5 bg-card border-border">
          <h3 className="font-semibold text-foreground mb-3 text-sm">
            Driver Status
          </h3>
          <div className="space-y-3">
            {[
              {
                status: "Online",
                count: 8,
                dotStyle: { backgroundColor: "#16a34a" } as React.CSSProperties,
              },
              {
                status: "On Ride",
                count: 3,
                dotStyle: { backgroundColor: "#3b82f6" } as React.CSSProperties,
              },
              {
                status: "Offline",
                count: 4,
                dotStyle: undefined,
              },
            ].map((s) => (
              <div key={s.status} className="flex items-center gap-3">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-muted"
                  style={s.dotStyle}
                />
                <span className="text-sm text-muted-foreground flex-1">
                  {s.status}
                </span>
                <Badge variant="secondary">{s.count}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <h3 className="font-semibold text-foreground mb-3 text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" /> Recent Activity
          </h3>
          <div className="space-y-2">
            {RECENT_ACTIVITY.map((a) => (
              <div
                key={`${a.time}-${a.text.slice(0, 10)}`}
                className="flex items-start gap-3 text-xs"
              >
                <span className="text-muted-foreground font-mono flex-shrink-0 pt-0.5">
                  {a.time}
                </span>
                <span
                  style={
                    a.type === "success"
                      ? { color: "#4ade80" }
                      : a.type === "warn"
                        ? { color: "#fb923c" }
                        : undefined
                  }
                  className={
                    a.type === "error"
                      ? "text-destructive"
                      : a.type === "info"
                        ? "text-foreground"
                        : ""
                  }
                >
                  {a.text}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
