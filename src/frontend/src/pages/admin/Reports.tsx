import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { mockDrivers } from "../../data/mockDrivers";
import { mockRides } from "../../data/mockRides";

// Inline SVG area chart
function SvgAreaChart({
  data,
  colorStroke = "oklch(0.65 0.22 90)",
  gradientId = "grad1",
}: {
  data: { label: string; value: number }[];
  colorStroke?: string;
  gradientId?: string;
}) {
  if (data.length < 2) return null;
  const max = Math.max(...data.map((d) => d.value), 1);
  const W = 400;
  const H = 120;
  const step = W / (data.length - 1);
  const pts = data.map((d, i) => ({
    x: i * step,
    y: H - (d.value / max) * H * 0.88,
  }));
  const linePath = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const areaPath = [
    `M ${pts[0].x.toFixed(1)} ${H}`,
    ...pts.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`),
    `L ${pts[pts.length - 1].x.toFixed(1)} ${H} Z`,
  ].join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H + 24}`}
      width="100%"
      preserveAspectRatio="none"
      role="img"
      aria-label="Line chart"
    >
      <title>Line chart</title>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colorStroke} stopOpacity={0.3} />
          <stop offset="100%" stopColor={colorStroke} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      {/* grid lines */}
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line
          key={f}
          x1={0}
          y1={H * (1 - f * 0.88)}
          x2={W}
          y2={H * (1 - f * 0.88)}
          stroke="oklch(0.35 0 0)"
          strokeOpacity={0.3}
          strokeDasharray="4 4"
        />
      ))}
      <path d={areaPath} fill={`url(#${gradientId})`} />
      <path
        d={linePath}
        fill="none"
        stroke={colorStroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {data.map((d, i) => (
        <text
          key={d.label}
          x={pts[i].x}
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

// Inline SVG bar chart
function SvgBarChart({
  data,
  color = "oklch(0.65 0.22 90)",
}: { data: { label: string; value: number }[]; color?: string }) {
  if (data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.value), 1);
  const W = 400;
  const H = 120;
  const gap = 4;
  const barW = Math.floor((W - (data.length - 1) * gap) / data.length);

  return (
    <svg
      viewBox={`0 0 ${W} ${H + 24}`}
      width="100%"
      preserveAspectRatio="none"
      role="img"
      aria-label="Bar chart"
    >
      <title>Bar chart</title>
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line
          key={f}
          x1={0}
          y1={H * (1 - f * 0.88)}
          x2={W}
          y2={H * (1 - f * 0.88)}
          stroke="oklch(0.35 0 0)"
          strokeOpacity={0.3}
          strokeDasharray="4 4"
        />
      ))}
      {data.map((d, i) => {
        const bh = Math.max(4, (d.value / max) * H * 0.88);
        const x = i * (barW + gap);
        return (
          <g key={d.label}>
            <rect
              x={x}
              y={H - bh}
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

const dailyRevenue = [
  { label: "May 1", value: 38200, rides: 89 },
  { label: "May 2", value: 41500, rides: 97 },
  { label: "May 3", value: 35100, rides: 82 },
  { label: "May 4", value: 44800, rides: 105 },
  { label: "May 5", value: 48200, rides: 113 },
  { label: "May 6", value: 52600, rides: 124 },
  { label: "May 7", value: 45800, rides: 107 },
];

const weeklyRevenue = [
  { label: "Wk 1", value: 245000, rides: 580 },
  { label: "Wk 2", value: 288000, rides: 680 },
  { label: "Wk 3", value: 312000, rides: 735 },
  { label: "Wk 4", value: 296000, rides: 698 },
];

const monthlyRevenue = [
  { label: "Nov", value: 920000, rides: 2100 },
  { label: "Dec", value: 1050000, rides: 2400 },
  { label: "Jan", value: 1120000, rides: 2580 },
  { label: "Feb", value: 1040000, rides: 2390 },
  { label: "Mar", value: 1180000, rides: 2710 },
  { label: "Apr", value: 1250000, rides: 2870 },
  { label: "May", value: 420000, rides: 960 },
];

const customerGrowth = [
  { label: "Nov", value: 120 },
  { label: "Dec", value: 160 },
  { label: "Jan", value: 198 },
  { label: "Feb", value: 235 },
  { label: "Mar", value: 280 },
  { label: "Apr", value: 320 },
  { label: "May", value: 370 },
];

const RANK_COLORS: Record<string, string> = {
  gold: "text-yellow-500 border-yellow-500/30 bg-yellow-500/10",
  diamond: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  platinum: "text-purple-400 border-purple-400/30 bg-purple-400/10",
};

export default function Reports() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");

  const driverPerformance = mockDrivers
    .map((d) => {
      const driverRides = mockRides.filter(
        (r) => r.driverId === d.id && r.status === "completed",
      );
      const revenue = driverRides.reduce((s, r) => s + r.totalFare, 0);
      const ratedRides = driverRides.filter((r) => r.rating != null);
      const avgRating =
        ratedRides.length > 0
          ? ratedRides.reduce((s, r) => s + (r.rating ?? 0), 0) /
            ratedRides.length
          : d.rating;
      return {
        ...d,
        rideCount: driverRides.length,
        revenue,
        avgRating: avgRating.toFixed(1),
      };
    })
    .sort((a, b) => b.revenue - a.revenue);

  const revenueData =
    period === "daily"
      ? dailyRevenue
      : period === "weekly"
        ? weeklyRevenue
        : monthlyRevenue;
  const totalRevenue = revenueData.reduce((s, d) => s + d.value, 0);
  const totalRides = revenueData.reduce((s, d) => s + d.rides, 0);

  return (
    <div className="p-6 space-y-6" data-ocid="admin.reports.page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Tabs
          value={period}
          onValueChange={(v) => setPeriod(v as typeof period)}
        >
          <TabsList>
            <TabsTrigger value="daily" data-ocid="admin.reports.tab.daily">
              Daily
            </TabsTrigger>
            <TabsTrigger value="weekly" data-ocid="admin.reports.tab.weekly">
              Weekly
            </TabsTrigger>
            <TabsTrigger value="monthly" data-ocid="admin.reports.tab.monthly">
              Monthly
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              console.log("Exporting PDF report", { period, revenueData });
              toast.success("PDF report exported");
            }}
            data-ocid="admin.reports.pdf_button"
          >
            <Download className="w-3.5 h-3.5 mr-1" /> PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              console.log("Exporting Excel report", { period, revenueData });
              toast.success("Excel report exported");
            }}
            data-ocid="admin.reports.excel_button"
          >
            <Download className="w-3.5 h-3.5 mr-1" /> Excel
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total Revenue",
            value: `Rs. ${totalRevenue.toLocaleString()}`,
            color: "text-primary",
          },
          {
            label: "Total Rides",
            value: totalRides.toLocaleString(),
            color: "text-blue-400",
          },
          {
            label: "Avg Fare",
            value: `Rs. ${totalRides > 0 ? Math.round(totalRevenue / totalRides).toLocaleString() : 0}`,
            color: "text-green-400",
          },
          {
            label: "Platform Commission (20%)",
            value: `Rs. ${Math.round(totalRevenue * 0.2).toLocaleString()}`,
            color: "text-orange-400",
          },
        ].map((s) => (
          <Card key={s.label} className="p-4 bg-card border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {s.label}
            </p>
            <p
              className={["text-xl font-display font-bold mt-1", s.color].join(
                " ",
              )}
            >
              {s.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Revenue chart */}
      <Card className="p-5 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-1 text-sm">
          Revenue Trend
        </h3>
        <p className="text-xs text-muted-foreground mb-4 capitalize">
          {period} breakdown
        </p>
        <Tabs value="revenue">
          <TabsContent value="revenue" forceMount>
            <SvgBarChart data={revenueData} />
          </TabsContent>
        </Tabs>
      </Card>

      {/* Customer growth */}
      <Card className="p-5 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-1 text-sm">
          Customer Growth
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Total registered:{" "}
          {customerGrowth[customerGrowth.length - 1].value.toLocaleString()}
        </p>
        <SvgAreaChart
          data={customerGrowth}
          colorStroke="oklch(0.7 0.16 142)"
          gradientId="growthGrad"
        />
      </Card>

      {/* Driver performance */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Driver Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  #
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Driver
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Vehicle
                </th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                  Rides
                </th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                  Revenue
                </th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                  Commission
                </th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                  Avg Rating
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Rank
                </th>
              </tr>
            </thead>
            <tbody>
              {driverPerformance.map((d, i) => (
                <tr
                  key={d.id}
                  className="border-b border-border/50 hover:bg-muted/20 transition-smooth"
                  data-ocid={`admin.reports.driver_row.${i + 1}`}
                >
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                    {i + 1}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {d.name}
                  </td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">
                    {d.vehicleType}
                  </td>
                  <td className="px-4 py-3 text-right text-foreground">
                    {d.rideCount}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-primary">
                    Rs. {d.revenue.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-orange-400">
                    Rs. {Math.round(d.revenue * 0.2).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">⭐ {d.avgRating}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={[
                        "capitalize text-xs",
                        RANK_COLORS[d.rank] ?? "",
                      ].join(" ")}
                    >
                      {d.rank}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
