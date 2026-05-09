import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { navigate } from "../../App";
import { mockRides } from "../../data/mockRides";
import { useAuthStore } from "../../stores/authStore";

type EarningsFilter = "today" | "week" | "month";

const WEEKLY_DATA = [
  { day: "Mon", amount: 1200 },
  { day: "Tue", amount: 980 },
  { day: "Wed", amount: 1540 },
  { day: "Thu", amount: 2100 },
  { day: "Fri", amount: 1840 },
  { day: "Sat", amount: 2640 },
  { day: "Sun", amount: 760 },
];

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: "🏠" },
  { key: "earnings", label: "Earnings", icon: "💰" },
  { key: "rank", label: "Rank", icon: "🏆" },
  { key: "profile", label: "Profile", icon: "👤" },
] as const;

export default function DriverEarnings() {
  const driver = useAuthStore((s) => s.driverUser);
  const [filter, setFilter] = useState<EarningsFilter>("week");

  if (!driver) {
    navigate("driver", "login");
    return null;
  }

  const driverRides = mockRides.filter(
    (r) => r.driverId === driver.id && r.status === "completed",
  );

  const todayEarnings = 1840;
  const todayTrips = 7;
  const weekTotal = WEEKLY_DATA.reduce((a, b) => a + b.amount, 0);
  const monthTotal = weekTotal * 4 + 3200;
  const maxBar = Math.max(...WEEKLY_DATA.map((d) => d.amount));

  const displayEarnings =
    filter === "today"
      ? todayEarnings
      : filter === "week"
        ? weekTotal
        : monthTotal;
  const displayTrips =
    filter === "today" ? todayTrips : filter === "week" ? 42 : 168;
  const displayCommission = displayEarnings * 0.2;

  function handleNav(key: string) {
    sessionStorage.setItem("zarin-driver-page", key);
    navigate("driver", key);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => handleNav("home")}
          className="text-muted-foreground hover:text-foreground transition-smooth"
          data-ocid="earnings.back_button"
        >
          ←
        </button>
        <h1 className="text-xl font-display font-bold text-foreground">
          My Earnings
        </h1>
      </div>

      <div className="flex-1 px-4 py-4 space-y-4 pb-24 overflow-y-auto">
        {/* Filter Tabs */}
        <div
          className="flex bg-muted/40 rounded-xl p-1 gap-1"
          data-ocid="earnings.filter_tabs"
        >
          {(["today", "week", "month"] as EarningsFilter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              data-ocid={`earnings.filter_${f}`}
              className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-smooth ${
                filter === f
                  ? "bg-card text-foreground shadow-card"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "today"
                ? "Today"
                : f === "week"
                  ? "This Week"
                  : "This Month"}
            </button>
          ))}
        </div>

        {/* Summary Card */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Earned</p>
              <p className="text-3xl font-display font-bold text-primary">
                Rs. {displayEarnings.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">
                {displayTrips} trips
              </p>
              <p className="text-xs text-destructive mt-1">
                - Rs. {displayCommission.toFixed(0)} commission
              </p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border flex gap-6">
            <div>
              <p className="text-xs text-muted-foreground">Net Earnings</p>
              <p className="text-lg font-bold text-foreground">
                Rs. {(displayEarnings * 0.8).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg per trip</p>
              <p className="text-lg font-bold text-foreground">
                Rs.{" "}
                {displayTrips > 0
                  ? (displayEarnings / displayTrips).toFixed(0)
                  : 0}
              </p>
            </div>
          </div>
        </div>

        {/* Weekly Bar Chart */}
        {filter !== "today" && (
          <div
            className="bg-card border border-border rounded-2xl p-4"
            data-ocid="earnings.weekly_chart"
          >
            <p className="text-sm font-semibold text-foreground mb-4">
              This Week's Performance
            </p>
            <div className="flex items-end gap-2 h-32">
              {WEEKLY_DATA.map((d, i) => (
                <div
                  key={d.day}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <div
                    className={`w-full rounded-t-lg transition-smooth ${
                      i === 4 ? "bg-primary" : "bg-primary/40"
                    }`}
                    style={{ height: `${(d.amount / maxBar) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {WEEKLY_DATA.map((d) => (
                <span
                  key={d.day}
                  className="text-xs text-muted-foreground flex-1 text-center"
                >
                  {d.amount >= 1000
                    ? `${(d.amount / 1000).toFixed(1)}k`
                    : d.amount}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Wallet Balance */}
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Wallet Balance</p>
            <p className="text-xl font-bold text-primary">
              Rs. {driver.walletBalance.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">Commission Due</p>
            <p className="text-sm font-semibold text-destructive">
              Rs. {(displayEarnings * 0.2).toFixed(0)}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Payment request submitted to admin")}
            className="border-primary/40 text-primary hover:bg-primary/10"
            data-ocid="earnings.request_payment_button"
          >
            Request
          </Button>
        </div>

        {/* Ride History Table */}
        <div
          className="bg-card border border-border rounded-2xl overflow-hidden"
          data-ocid="earnings.ride_history_table"
        >
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-foreground">
              Ride History
            </p>
          </div>
          {driverRides.length === 0 ? (
            <div className="divide-y divide-border">
              {mockRides
                .filter((r) => r.status === "completed")
                .slice(0, 5)
                .map((r, idx) => (
                  <div
                    key={r.id}
                    className="px-4 py-3"
                    data-ocid={`earnings.ride_item.${idx + 1}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">
                          {new Date(r.startTime).toLocaleDateString()}
                        </p>
                        <p className="text-sm font-medium text-foreground truncate">
                          {r.pickupAddress} → {r.dropAddress}
                        </p>
                      </div>
                      <div className="text-right ml-3 shrink-0">
                        <p className="text-xs text-muted-foreground">
                          - Rs. {(r.totalFare * 0.2).toFixed(0)} comm.
                        </p>
                        <p className="text-sm font-bold text-primary">
                          Rs. {(r.totalFare * 0.8).toFixed(0)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {driverRides.slice(0, 10).map((r, idx) => (
                <div
                  key={r.id}
                  className="px-4 py-3"
                  data-ocid={`earnings.ride_item.${idx + 1}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {new Date(r.startTime).toLocaleDateString()}
                      </p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {r.pickupAddress} → {r.dropAddress}
                      </p>
                    </div>
                    <div className="text-right ml-3 shrink-0">
                      <p className="text-xs text-muted-foreground">
                        - Rs. {(r.totalFare * 0.2).toFixed(0)}
                      </p>
                      <p className="text-sm font-bold text-primary">
                        Rs. {(r.totalFare * 0.8).toFixed(0)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 flex justify-around">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => handleNav(item.key)}
            data-ocid={`earnings.nav_${item.key}`}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-smooth ${
              item.key === "earnings"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
