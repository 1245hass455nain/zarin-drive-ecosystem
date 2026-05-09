import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { navigate } from "../../App";
import { LanguageToggle } from "../../components/LanguageToggle";
import { ThemeToggle } from "../../components/ThemeToggle";
import { mockRides } from "../../data/mockRides";
import { useAuthStore } from "../../stores/authStore";

const VEHICLE_ICONS: Record<string, string> = {
  bike: "🏍️",
  rickshaw: "🛺",
  car: "🚗",
  premium: "🚙",
};

const MOCK_RATINGS = [5, 4, 5, 5, 4] as const;

function maskCnic(cnic: string): string {
  if (!cnic || cnic.length < 13) return "XXXXX-XXXXXXX-X";
  const clean = cnic.replace(/-/g, "");
  return `${"X".repeat(5)}-${"X".repeat(3)}${clean.slice(8, 12)}-${clean.slice(12)}`;
}

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: "🏠" },
  { key: "earnings", label: "Earnings", icon: "💰" },
  { key: "rank", label: "Rank", icon: "🏆" },
  { key: "profile", label: "Profile", icon: "👤" },
] as const;

export default function DriverProfile() {
  const driver = useAuthStore((s) => s.driverUser);
  const driverLogout = useAuthStore((s) => s.driverLogout);
  const [editOpen, setEditOpen] = useState(false);
  const [vehiclePlate, setVehiclePlate] = useState(driver?.vehiclePlate ?? "");
  const [vehicleModel, setVehicleModel] = useState("Toyota Corolla");
  const [vehicleColor, setVehicleColor] = useState("White");

  if (!driver) {
    navigate("driver", "login");
    return null;
  }

  const initials = driver.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const joinedDate = "March 2024";

  const driverRides = mockRides
    .filter((r) => r.status === "completed")
    .slice(0, 10);

  function handleNav(key: string) {
    sessionStorage.setItem("zarin-driver-page", key);
    navigate("driver", key);
  }

  function handleSaveVehicle() {
    toast.success("Vehicle details updated");
    setEditOpen(false);
  }

  function handleLogout() {
    driverLogout();
    sessionStorage.removeItem("zarin-driver-page");
    navigate("driver", "login");
    toast.info("Logged out");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => handleNav("home")}
          className="text-muted-foreground hover:text-foreground transition-smooth"
          data-ocid="driver_profile.back_button"
        >
          ←
        </button>
        <h1 className="flex-1 text-xl font-display font-bold text-foreground">
          My Profile
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setEditOpen(true)}
          className="border-primary/40 text-primary hover:bg-primary/10"
          data-ocid="driver_profile.edit_button"
        >
          Edit
        </Button>
      </div>

      <div className="flex-1 px-4 py-4 space-y-4 pb-24 overflow-y-auto">
        {/* Profile Card */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-primary">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-display font-semibold text-foreground truncate">
                {driver.name}
              </h2>
              <p className="text-sm text-muted-foreground">{driver.phone}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Joined {joinedDate}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className={`text-base ${s <= Math.round(driver.rating) ? "text-primary" : "text-muted"}`}
                >
                  ★
                </span>
              ))}
              <span className="text-sm font-semibold text-foreground ml-1">
                {driver.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-muted-foreground text-sm">•</span>
            <span className="text-sm text-muted-foreground capitalize">
              {driver.rank} Rank
            </span>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-sm font-semibold text-foreground mb-3">
            Vehicle Details
          </p>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">
              {VEHICLE_ICONS[driver.vehicleType] ?? "🚗"}
            </span>
            <div>
              <p className="text-base font-semibold text-foreground capitalize">
                {driver.vehicleType === "premium"
                  ? "Premium Car"
                  : driver.vehicleType.charAt(0).toUpperCase() +
                    driver.vehicleType.slice(1)}
              </p>
              <p className="text-sm text-muted-foreground">
                {vehicleModel} · {vehicleColor}
              </p>
            </div>
          </div>
          <div className="bg-muted/40 rounded-xl px-4 py-2">
            <p className="text-xs text-muted-foreground">Number Plate</p>
            <p className="font-mono text-base font-bold text-foreground tracking-widest">
              {vehiclePlate}
            </p>
          </div>
        </div>

        {/* CNIC */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-sm font-semibold text-foreground mb-2">
            CNIC (Masked)
          </p>
          <p className="font-mono text-base text-muted-foreground tracking-widest">
            {maskCnic("4210112345671")}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            For security, only last digits are visible
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-sm font-semibold text-foreground mb-3">
            Rating Breakdown
          </p>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-center">
              <p className="text-3xl font-display font-bold text-primary">
                {driver.rating.toFixed(1)}
              </p>
              <div className="flex gap-0.5 justify-center mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className={`text-sm ${s <= Math.round(driver.rating) ? "text-primary" : "text-muted"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Overall</p>
            </div>
            <div className="flex-1 space-y-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = MOCK_RATINGS.filter((r) => r === star).length;
                const pct = (count / MOCK_RATINGS.length) * 100;
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-3">
                      {star}
                    </span>
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-4">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-2">Last 5 ratings</p>
          <div className="flex gap-2">
            {(
              ["5-first", "4-second", "5-third", "5-fourth", "4-fifth"] as const
            ).map((key) => {
              const val = Number(key.split("-")[0]);
              return (
                <span
                  key={key}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    val >= 4
                      ? "bg-primary/20 text-primary"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {val}★
                </span>
              );
            })}
          </div>
        </div>

        {/* Ride History */}
        <div
          className="bg-card border border-border rounded-2xl overflow-hidden"
          data-ocid="driver_profile.ride_history"
        >
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-foreground">
              Recent Rides
            </p>
          </div>
          <div className="divide-y divide-border">
            {driverRides.map((r, idx) => (
              <div
                key={r.id}
                className="px-4 py-3"
                data-ocid={`driver_profile.ride_item.${idx + 1}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {new Date(r.startTime).toLocaleDateString("en-PK", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </p>
                    <p className="text-sm font-medium text-foreground truncate">
                      {r.pickupAddress} → {r.dropAddress}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {r.customerName}
                    </p>
                  </div>
                  <div className="text-right ml-3 shrink-0">
                    <p className="text-sm font-bold text-primary">
                      Rs. {r.totalFare.toLocaleString()}
                    </p>
                    {r.rating && (
                      <p className="text-xs text-muted-foreground">
                        {r.rating}★
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-sm font-semibold text-foreground mb-3">Settings</p>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between py-2 border-t border-border">
            <span className="text-sm text-muted-foreground">Language</span>
            <LanguageToggle />
          </div>
          <div className="pt-3 border-t border-border">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full border-destructive/40 text-destructive hover:bg-destructive/10"
              data-ocid="driver_profile.logout_button"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Vehicle Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent
          className="bg-card border-border"
          data-ocid="driver_profile.edit_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              Edit Vehicle Details
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-foreground">Number Plate</Label>
              <Input
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                className="bg-background border-input font-mono"
                data-ocid="driver_profile.plate_input"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Vehicle Model</Label>
              <Input
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                className="bg-background border-input"
                data-ocid="driver_profile.model_input"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Vehicle Color</Label>
              <Input
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                className="bg-background border-input"
                data-ocid="driver_profile.color_input"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setEditOpen(false)}
                className="flex-1"
                data-ocid="driver_profile.cancel_button"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveVehicle}
                className="flex-1 bg-primary text-primary-foreground"
                data-ocid="driver_profile.save_button"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 flex justify-around">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => handleNav(item.key)}
            data-ocid={`driver_profile.nav_${item.key}`}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-smooth ${
              item.key === "profile"
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
