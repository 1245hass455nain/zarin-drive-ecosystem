import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Clock, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { mockDrivers } from "../../data/mockDrivers";
import type { GwadarLocation } from "../../data/mockLocations";
import { useTranslation } from "../../i18n/useTranslation";
import type { VehicleType } from "../../stores/rideStore";

interface VehicleOption {
  type: VehicleType;
  label: string;
  labelUr: string;
  description: string;
  emoji: string;
  baseFare: number;
  perKm: number;
  capacity: number;
  badge?: string;
}

const VEHICLES: VehicleOption[] = [
  {
    type: "bike",
    label: "Bike",
    labelUr: "بائیک",
    description: "Fast & affordable, solo rides",
    emoji: "🏍️",
    baseFare: 80,
    perKm: 20,
    capacity: 1,
  },
  {
    type: "rickshaw",
    label: "Rickshaw",
    labelUr: "رکشا",
    description: "Economical, open-air comfort",
    emoji: "🛣️",
    baseFare: 120,
    perKm: 30,
    capacity: 3,
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
    badge: "Popular",
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
    badge: "Luxury",
  },
];

const ETA_MAP: Record<VehicleType, number> = {
  bike: 3,
  rickshaw: 5,
  car: 6,
  premium: 8,
};

interface VehicleSelectionProps {
  destination: GwadarLocation | null;
  pickup?: string;
  onBack: () => void;
  onConfirm: (vehicleType: VehicleType, fare: number) => void;
}

export default function VehicleSelection({
  destination,
  pickup = "Gwadar City Centre",
  onBack,
  onConfirm,
}: VehicleSelectionProps) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<VehicleType>("car");

  // Mock distance calculation
  const distanceKm = destination
    ? Math.max(1.2, 3.5 + ((destination.lat % 2) + (destination.lng % 2)))
    : 4.2;

  const selectedVehicle = VEHICLES.find((v) => v.type === selected)!;
  const estimatedFare = Math.round(
    selectedVehicle.baseFare + selectedVehicle.perKm * distanceKm,
  );

  const nearbyCount = (type: VehicleType) =>
    mockDrivers.filter((d) => d.vehicleType === type && d.status === "online")
      .length;

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-ocid="vehicle_selection.page"
    >
      {/* Header */}
      <header className="bg-card border-b border-border px-4 h-14 flex items-center gap-3 shadow-card">
        <button
          type="button"
          data-ocid="vehicle_selection.back_button"
          onClick={onBack}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted/50 transition-smooth"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="text-base font-display font-bold text-foreground">
            {t("customer.selectVehicle")}
          </h1>
          {destination && (
            <p className="text-xs text-muted-foreground truncate">
              To: {destination.name}
            </p>
          )}
        </div>
        {/* Distance pill */}
        <div className="bg-muted/40 border border-border rounded-full px-3 py-1 shrink-0">
          <span className="text-xs text-muted-foreground font-mono">
            {distanceKm.toFixed(1)} km
          </span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* Route summary card */}
        <div className="bg-muted/20 border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-primary/25 shrink-0" />
                <span className="text-sm text-foreground truncate">
                  {pickup}
                </span>
              </div>
              <div className="ml-1 h-4 w-px border-l-2 border-dashed border-border" />
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive ring-2 ring-destructive/25 shrink-0" />
                <span className="text-sm text-foreground truncate">
                  {destination?.name ?? "Select destination"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle options */}
        <div className="p-4 space-y-3">
          {VEHICLES.map((v, i) => {
            const fare = Math.round(v.baseFare + v.perKm * distanceKm);
            const nearby = nearbyCount(v.type);
            const eta = ETA_MAP[v.type];
            const isSelected = selected === v.type;

            return (
              <motion.button
                key={v.type}
                type="button"
                data-ocid={`vehicle_selection.vehicle.item.${i + 1}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setSelected(v.type)}
                className={cn(
                  "w-full rounded-xl border p-4 flex items-center gap-4 transition-smooth text-left relative overflow-hidden",
                  isSelected
                    ? "border-primary bg-primary/8 shadow-elevated"
                    : "border-border bg-card hover:border-primary/30 hover:bg-muted/10",
                )}
              >
                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-primary rounded-l-xl" />
                )}

                {/* Vehicle emoji */}
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-smooth",
                    isSelected ? "bg-primary/20" : "bg-muted/40",
                  )}
                >
                  {v.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "font-display font-bold text-base",
                          isSelected ? "text-primary" : "text-foreground",
                        )}
                      >
                        {v.label}
                      </span>
                      {v.badge && (
                        <span
                          className={cn(
                            "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                            v.badge === "Popular"
                              ? "bg-primary/15 text-primary"
                              : "bg-muted/60 text-muted-foreground",
                          )}
                        >
                          {v.badge}
                        </span>
                      )}
                    </div>
                    <span
                      className={cn(
                        "font-bold text-lg",
                        isSelected ? "text-primary" : "text-foreground",
                      )}
                    >
                      PKR {fare}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mb-1.5 truncate">
                    {v.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-3 h-3" /> {v.capacity}
                    </span>
                    <span className="flex items-center gap-1 text-primary">
                      <Clock className="w-3 h-3" /> {eta} min
                    </span>
                    {nearby > 0 ? (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Zap className="w-3 h-3 text-primary" />
                        {nearby} nearby
                      </span>
                    ) : (
                      <span className="text-muted-foreground/50">
                        No drivers
                      </span>
                    )}
                  </div>

                  <p className="text-[10px] text-muted-foreground/60 mt-1">
                    Rs.{v.baseFare} base + Rs.{v.perKm}/km
                  </p>
                </div>

                {/* Selected checkmark */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0"
                  >
                    <span className="text-[10px] text-primary-foreground font-bold">
                      ✓
                    </span>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Confirm footer */}
      <div className="bg-card border-t border-border p-4 shadow-elevated">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-muted-foreground">
              {t("customer.estimatedFare")}
            </p>
            <p className="text-2xl font-display font-black text-primary">
              PKR {estimatedFare}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {distanceKm.toFixed(1)} km • {selectedVehicle.label}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">
              {t("customer.eta") || "ETA"}
            </p>
            <p className="text-lg font-display font-bold text-foreground">
              {ETA_MAP[selected]} {t("customer.etaMinutes")}
            </p>
          </div>
        </div>

        <Button
          type="button"
          data-ocid="vehicle_selection.confirm_button"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 text-base"
          onClick={() => onConfirm(selected, estimatedFare)}
        >
          {t("customer.confirmRide")} ({selectedVehicle.label})
        </Button>
      </div>
    </div>
  );
}
