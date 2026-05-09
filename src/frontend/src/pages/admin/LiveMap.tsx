import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { MapView } from "../../components/MapView";
import { driverCoordinates, mockDrivers } from "../../data/mockDrivers";
import { mockRides } from "../../data/mockRides";

export default function LiveMap() {
  const [showOnline, setShowOnline] = useState(true);
  const [showOnRide, setShowOnRide] = useState(true);
  const [showOffline, setShowOffline] = useState(true);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

  const filtered = mockDrivers.filter((d) => {
    if (d.status === "online" && !showOnline) return false;
    if (d.status === "on_ride" && !showOnRide) return false;
    if (d.status === "offline" && !showOffline) return false;
    return true;
  });

  const driverMarkers = filtered.map((d) => ({
    id: d.id,
    lat: driverCoordinates[d.id]?.lat ?? 25.127,
    lng: driverCoordinates[d.id]?.lng ?? 62.325,
    vehicleType: d.vehicleType,
    status: d.status,
    name: d.name,
  }));

  const activeRides = mockRides.filter((r) => r.status === "in_progress");
  const routePoints =
    activeRides.length > 0
      ? [
          { lat: activeRides[0].pickupLat, lng: activeRides[0].pickupLng },
          { lat: activeRides[0].dropLat, lng: activeRides[0].dropLng },
        ]
      : [];

  const statusCount = {
    online: mockDrivers.filter((d) => d.status === "online").length,
    on_ride: mockDrivers.filter((d) => d.status === "on_ride").length,
    offline: mockDrivers.filter((d) => d.status === "offline").length,
  };

  const selectedDriver =
    mockDrivers.find((d) => d.id === selectedDriverId) ?? null;

  return (
    <div className="p-6 space-y-4" data-ocid="admin.livemap.page">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-foreground">
          Show Drivers:
        </span>
        <Button
          variant={showOnline ? "default" : "outline"}
          size="sm"
          onClick={() => setShowOnline((v) => !v)}
          data-ocid="admin.livemap.toggle_online"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 mr-2 inline-block" />
          Online ({statusCount.online})
        </Button>
        <Button
          variant={showOnRide ? "default" : "outline"}
          size="sm"
          onClick={() => setShowOnRide((v) => !v)}
          data-ocid="admin.livemap.toggle_on_ride"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 inline-block" />
          On Ride ({statusCount.on_ride})
        </Button>
        <Button
          variant={showOffline ? "default" : "outline"}
          size="sm"
          onClick={() => setShowOffline((v) => !v)}
          data-ocid="admin.livemap.toggle_offline"
        >
          <span className="w-2 h-2 rounded-full bg-muted-foreground mr-2 inline-block" />
          Offline ({statusCount.offline})
        </Button>
      </div>

      <div className="flex gap-4" style={{ height: "calc(100vh - 240px)" }}>
        <div className="flex-1 rounded-xl overflow-hidden border border-border">
          <MapView
            drivers={driverMarkers}
            routePoints={routePoints}
            zoom={13}
          />
        </div>

        <div className="w-72 flex flex-col gap-2 overflow-y-auto">
          {filtered.map((d, i) => (
            <Card
              key={d.id}
              className={[
                "p-3 bg-card border-border cursor-pointer transition-smooth",
                selectedDriverId === d.id
                  ? "border-primary"
                  : "hover:border-muted-foreground",
              ].join(" ")}
              onClick={() =>
                setSelectedDriverId(selectedDriverId === d.id ? null : d.id)
              }
              data-ocid={`admin.livemap.driver_card.${i + 1}`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={[
                    "w-2.5 h-2.5 rounded-full flex-shrink-0",
                    d.status === "online"
                      ? "bg-green-500"
                      : d.status === "on_ride"
                        ? "bg-blue-500"
                        : "bg-muted-foreground",
                  ].join(" ")}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {d.name}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {d.vehicleType} · {d.status.replace("_", " ")}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs capitalize">
                  {d.rank}
                </Badge>
              </div>
              {selectedDriver?.id === d.id && (
                <div className="mt-2 pt-2 border-t border-border space-y-1">
                  <p className="text-xs text-muted-foreground">📞 {d.phone}</p>
                  <p className="text-xs text-muted-foreground">
                    🚗 {d.vehiclePlate}
                  </p>
                  <p className="text-xs text-primary">
                    Wallet: Rs. {d.walletBalance.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ⭐ {d.rating} rating
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
