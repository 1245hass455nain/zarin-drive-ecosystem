import { cn } from "@/lib/utils";
import type { RideStatus } from "../stores/rideStore";

type DriverStatus = "online" | "offline" | "on_ride" | "paused" | "suspended";

const rideStatusConfig: Record<
  RideStatus,
  { label: string; className: string }
> = {
  searching: {
    label: "Searching",
    className: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  },
  accepted: {
    label: "Accepted",
    className: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  },
  arriving: {
    label: "Arriving",
    className: "bg-primary/20 text-primary border border-primary/30",
  },
  reached: {
    label: "Reached",
    className: "bg-primary/20 text-primary border border-primary/30",
  },
  started: {
    label: "Started",
    className: "bg-green-500/20 text-green-400 border border-green-500/30",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-green-500/20 text-green-400 border border-green-500/30",
  },
  completed: {
    label: "Completed",
    className:
      "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  },
  cancelled: {
    label: "Cancelled",
    className:
      "bg-destructive/20 text-destructive border border-destructive/30",
  },
};

const driverStatusConfig: Record<
  DriverStatus,
  { label: string; className: string }
> = {
  online: {
    label: "Online",
    className: "bg-green-500/20 text-green-400 border border-green-500/30",
  },
  offline: {
    label: "Offline",
    className: "bg-muted/60 text-muted-foreground border border-border",
  },
  on_ride: {
    label: "On Ride",
    className: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  },
  paused: {
    label: "Paused",
    className: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  },
  suspended: {
    label: "Suspended",
    className:
      "bg-destructive/20 text-destructive border border-destructive/30",
  },
};

interface RideStatusBadgeProps {
  status: RideStatus;
  className?: string;
}

export function StatusBadge({ status, className }: RideStatusBadgeProps) {
  const config = rideStatusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}

interface DriverStatusBadgeProps {
  status: DriverStatus;
  className?: string;
}

export function DriverStatusBadge({
  status,
  className,
}: DriverStatusBadgeProps) {
  const config = driverStatusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
        config.className,
        className,
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          status === "online" && "bg-green-400",
          status === "offline" && "bg-muted-foreground",
          status === "on_ride" && "bg-blue-400",
          status === "paused" && "bg-orange-400",
          status === "suspended" && "bg-destructive",
        )}
      />
      {config.label}
    </span>
  );
}
