import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { GWADAR_CENTER } from "../data/mockLocations";
import type { VehicleType } from "../stores/rideStore";
import {
  getCustomerMarkerIcon,
  getDriverMarkerIcon,
  getDropMarkerIcon,
  getPickupMarkerIcon,
} from "./DriverMarker";

interface DriverMarkerData {
  id: string;
  lat: number;
  lng: number;
  vehicleType: VehicleType;
  status: string;
  name: string;
}

interface MapViewProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  showUserLocation?: boolean;
  drivers?: DriverMarkerData[];
  pickupLocation?: { lat: number; lng: number; label?: string } | null;
  dropLocation?: { lat: number; lng: number; label?: string } | null;
  routePoints?: { lat: number; lng: number }[];
  className?: string;
  onMapClick?: (lat: number, lng: number) => void;
}

export function MapView({
  center = GWADAR_CENTER,
  zoom = 13,
  showUserLocation = false,
  drivers = [],
  pickupLocation = null,
  dropLocation = null,
  routePoints = [],
  className,
  onMapClick,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const polylineRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapRef.current || mapInstanceRef.current) return;

      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (!isMounted || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [center.lat, center.lng],
        zoom,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      if (onMapClick) {
        map.on("click", (e: { latlng: { lat: number; lng: number } }) => {
          onMapClick(e.latlng.lat, e.latlng.lng);
        });
      }

      mapInstanceRef.current = map;
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center.lat, center.lng, zoom, onMapClick]);

  // Update markers when data changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    (async () => {
      const L = (await import("leaflet")).default;

      // Clear old markers
      for (const m of markersRef.current) m.remove();
      markersRef.current = [];
      if (polylineRef.current) {
        polylineRef.current.remove();
        polylineRef.current = null;
      }

      // Driver markers
      for (const d of drivers) {
        const icon = L.icon({
          iconUrl: getDriverMarkerIcon(d.vehicleType, d.status),
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          popupAnchor: [0, -18],
        });
        const marker = L.marker([d.lat, d.lng], { icon })
          .addTo(map)
          .bindPopup(`<strong>${d.name}</strong><br/>${d.vehicleType}`);
        markersRef.current.push(marker);
      }

      // User location
      if (showUserLocation) {
        const icon = L.icon({
          iconUrl: getCustomerMarkerIcon(),
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
        const m = L.marker([center.lat, center.lng], { icon })
          .addTo(map)
          .bindPopup("My Location");
        markersRef.current.push(m);
      }

      // Pickup marker
      if (pickupLocation) {
        const icon = L.icon({
          iconUrl: getPickupMarkerIcon(),
          iconSize: [32, 40],
          iconAnchor: [16, 40],
        });
        const m = L.marker([pickupLocation.lat, pickupLocation.lng], { icon })
          .addTo(map)
          .bindPopup(pickupLocation.label ?? "Pickup");
        markersRef.current.push(m);
      }

      // Drop marker
      if (dropLocation) {
        const icon = L.icon({
          iconUrl: getDropMarkerIcon(),
          iconSize: [32, 40],
          iconAnchor: [16, 40],
        });
        const m = L.marker([dropLocation.lat, dropLocation.lng], { icon })
          .addTo(map)
          .bindPopup(dropLocation.label ?? "Drop-off");
        markersRef.current.push(m);
      }

      // Route polyline
      if (routePoints.length >= 2) {
        const latLngs = routePoints.map(
          (p) => [p.lat, p.lng] as [number, number],
        );
        polylineRef.current = L.polyline(latLngs, {
          color: "oklch(0.65 0.22 90)",
          weight: 4,
          opacity: 0.85,
          dashArray: "8, 4",
        }).addTo(map);
      }
    })();
  }, [
    drivers,
    showUserLocation,
    center,
    pickupLocation,
    dropLocation,
    routePoints,
  ]);

  return (
    <div
      ref={mapRef}
      className={cn("w-full h-full rounded-xl overflow-hidden", className)}
      data-ocid="map.canvas_target"
    />
  );
}
