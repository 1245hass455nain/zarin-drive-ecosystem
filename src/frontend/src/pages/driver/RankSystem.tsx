import type React from "react";
import { navigate } from "../../App";
import { useAuthStore } from "../../stores/authStore";

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: "🏠" },
  { key: "earnings", label: "Earnings", icon: "💰" },
  { key: "rank", label: "Rank", icon: "🏆" },
  { key: "profile", label: "Profile", icon: "👤" },
] as const;

interface RankTier {
  name: "gold" | "diamond" | "platinum";
  label: string;
  limit: number;
  color: string;
  glow: string;
  icon: React.ReactNode;
  benefits: string[];
  advance: string;
}

const RANKS: RankTier[] = [
  {
    name: "gold",
    label: "Gold",
    limit: 3000,
    color: "text-yellow-400",
    glow: "",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        role="img"
        aria-label="Gold rank star"
      >
        <title>Gold</title>
        <polygon
          points="16,2 20,12 31,12 22,19 25,30 16,23 7,30 10,19 1,12 12,12"
          fill="oklch(0.82 0.18 90)"
          stroke="oklch(0.65 0.22 90)"
          strokeWidth="1"
        />
      </svg>
    ),
    benefits: [
      "Accept ride requests",
      "Basic dashboard access",
      "Daily earnings tracking",
      "Priority in nearby areas",
    ],
    advance: "Complete 50 rides with avg rating ≥ 4.0 to reach Diamond",
  },
  {
    name: "diamond",
    label: "Diamond",
    limit: 5000,
    color: "text-blue-400",
    glow: "",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        role="img"
        aria-label="Diamond rank crystal"
      >
        <title>Diamond</title>
        <polygon
          points="16,2 28,12 16,30 4,12"
          fill="oklch(0.7 0.18 240)"
          stroke="oklch(0.6 0.2 240)"
          strokeWidth="1"
        />
        <polygon
          points="16,8 24,14 16,24 8,14"
          fill="oklch(0.78 0.15 240)"
          opacity="0.6"
        />
      </svg>
    ),
    benefits: [
      "Higher wallet limit",
      "Priority ride matching",
      "Weekly bonus eligibility",
      "Customer preference badge",
    ],
    advance: "Complete 150 rides with avg rating ≥ 4.5 to reach Platinum",
  },
  {
    name: "platinum",
    label: "Platinum",
    limit: 8000,
    color: "text-slate-300",
    glow: "",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        role="img"
        aria-label="Platinum rank shield"
      >
        <title>Platinum</title>
        <path
          d="M16 2 L20 8 L28 6 L26 14 L30 20 L22 20 L16 28 L10 20 L2 20 L6 14 L4 6 L12 8 Z"
          fill="oklch(0.75 0.04 250)"
          stroke="oklch(0.6 0.05 250)"
          strokeWidth="1"
        />
      </svg>
    ),
    benefits: [
      "Maximum wallet limit",
      "Exclusive premium rides",
      "Monthly bonus guaranteed",
      "VIP customer access",
      "Admin support priority",
    ],
    advance: "Maintain Platinum by keeping rating ≥ 4.5",
  },
];

export default function RankSystem() {
  const driver = useAuthStore((s) => s.driverUser);

  if (!driver) {
    navigate("driver", "login");
    return null;
  }

  const currentRank = RANKS.find((r) => r.name === driver.rank) ?? RANKS[0];
  const currentRankIdx = RANKS.findIndex((r) => r.name === driver.rank);
  const nextRank = RANKS[currentRankIdx + 1];
  const isLimitExceeded = driver.walletBalance > currentRank.limit;
  const progressPct = Math.min(
    (driver.walletBalance / currentRank.limit) * 100,
    100,
  );

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
          data-ocid="rank.back_button"
        >
          ←
        </button>
        <h1 className="text-xl font-display font-bold text-foreground">
          My Rank
        </h1>
      </div>

      <div className="flex-1 px-4 py-4 space-y-5 pb-24 overflow-y-auto">
        {/* Limit exceeded warning */}
        {isLimitExceeded && (
          <div
            className="bg-destructive/10 border border-destructive/40 rounded-xl px-4 py-3 flex items-center gap-3"
            data-ocid="rank.limit_warning"
          >
            <span className="text-xl">⚠️</span>
            <div>
              <p className="text-sm font-semibold text-destructive">
                Account Paused
              </p>
              <p className="text-xs text-destructive/80">
                Wallet limit exceeded. Contact admin to resume.
              </p>
            </div>
          </div>
        )}

        {/* Current Rank Hero */}
        <div
          className="bg-card border border-border rounded-2xl p-6 text-center"
          style={
            currentRank.name === "gold"
              ? { boxShadow: "0 0 20px #FFD70066" }
              : currentRank.name === "diamond"
                ? { boxShadow: "0 0 20px #60a5fa66" }
                : currentRank.name === "platinum"
                  ? { boxShadow: "0 0 20px #94a3b866" }
                  : undefined
          }
        >
          <div className="flex justify-center mb-3">{currentRank.icon}</div>
          <p
            className="text-3xl font-display font-bold"
            style={
              currentRank.name === "gold"
                ? { color: "#FFD700" }
                : currentRank.name === "diamond"
                  ? { color: "#60a5fa" }
                  : currentRank.name === "platinum"
                    ? { color: "#94a3b8" }
                    : undefined
            }
          >
            {currentRank.label}
          </p>
          <p className="text-muted-foreground text-sm mt-1">Current Rank</p>
          <div className="mt-4">
            <p className="text-xs text-muted-foreground mb-2">
              Wallet Balance:{" "}
              <span className="text-foreground font-semibold">
                Rs. {driver.walletBalance.toLocaleString()}
              </span>
              {" / "}
              Limit:{" "}
              <span className="text-foreground font-semibold">
                Rs. {currentRank.limit.toLocaleString()}
              </span>
            </p>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-smooth ${
                  isLimitExceeded ? "bg-destructive" : "bg-primary"
                }`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
            {nextRank && (
              <p className="text-xs text-muted-foreground mt-2">
                Next rank:{" "}
                <span
                  style={
                    nextRank.name === "diamond"
                      ? { color: "#60a5fa" }
                      : nextRank.name === "platinum"
                        ? { color: "#94a3b8" }
                        : { color: "#FFD700" }
                  }
                >
                  {nextRank.label}
                </span>{" "}
                at Rs. {nextRank.limit.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {/* Current rank benefits */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-sm font-semibold text-foreground mb-3">
            Your Benefits
          </p>
          <ul className="space-y-2">
            {currentRank.benefits.map((b) => (
              <li
                key={b}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="text-primary">✓</span> {b}
              </li>
            ))}
          </ul>
          {currentRankIdx < RANKS.length - 1 && (
            <div className="mt-4 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">
                  How to advance:{" "}
                </span>
                {currentRank.advance}
              </p>
            </div>
          )}
        </div>

        {/* Rank Tiers */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">
            All Rank Tiers
          </p>
          <div className="grid grid-cols-3 gap-3" data-ocid="rank.tiers_grid">
            {RANKS.map((rank, idx) => (
              <div
                key={rank.name}
                data-ocid={`rank.tier_card.${idx + 1}`}
                className={`bg-card border rounded-2xl p-3 text-center transition-smooth ${rank.name === driver.rank ? "border-primary/50" : "border-border"}`}
                style={
                  rank.name === driver.rank
                    ? rank.name === "gold"
                      ? { boxShadow: "0 0 20px #FFD70066" }
                      : rank.name === "diamond"
                        ? { boxShadow: "0 0 20px #60a5fa66" }
                        : { boxShadow: "0 0 20px #94a3b866" }
                    : undefined
                }
              >
                <div className="flex justify-center mb-2">{rank.icon}</div>
                <p
                  className="text-sm font-bold"
                  style={
                    rank.name === "gold"
                      ? { color: "#FFD700" }
                      : rank.name === "diamond"
                        ? { color: "#60a5fa" }
                        : rank.name === "platinum"
                          ? { color: "#94a3b8" }
                          : undefined
                  }
                >
                  {rank.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Limit</p>
                <p className="text-xs font-semibold text-foreground">
                  Rs. {(rank.limit / 1000).toFixed(0)}k
                </p>
                {rank.name === driver.rank && (
                  <span className="inline-block mt-2 text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">
                    Current
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 flex justify-around">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => handleNav(item.key)}
            data-ocid={`rank.nav_${item.key}`}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-smooth ${
              item.key === "rank"
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
