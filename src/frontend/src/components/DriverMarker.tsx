import type { VehicleType } from "../stores/rideStore";

// Returns SVG icon string for custom Leaflet markers
export function getDriverMarkerIcon(
  vehicleType: VehicleType,
  status: string,
): string {
  const bgColor =
    status === "online"
      ? "#22c55e"
      : status === "on_ride"
        ? "#3b82f6"
        : "#6b7280";
  const icons: Record<VehicleType, string> = {
    bike: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="14" height="14"><path d="M5 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 6l3 5H9l3-5z"/></svg>`,
    rickshaw: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="14" height="14"><path d="M3 13h2V9h14v4h2v2h-2v1a2 2 0 0 1-4 0v-1H9v1a2 2 0 0 1-4 0v-1H3v-2zm5 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>`,
    car: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="14" height="14"><path d="M5 17H3v-2h1V9l2-4h10l2 4v6h1v2h-2a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0zm2 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm6 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm2-6V9.5L14 7H10l-1 2.5V11h6z"/></svg>`,
    premium: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFD700" width="14" height="14"><path d="M5 17H3v-2h1V9l2-4h10l2 4v6h1v2h-2a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0zm2 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm6 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm2-6V9.5L14 7H10l-1 2.5V11h6z"/></svg>`,
  };

  return `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="16" fill="${bgColor}" stroke="white" stroke-width="2"/>
      <g transform="translate(11,11)">${icons[vehicleType]}</g>
    </svg>
  `)}`;
}

export function getCustomerMarkerIcon(): string {
  return `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
      <circle cx="14" cy="14" r="12" fill="#3b82f6" stroke="white" stroke-width="2.5"/>
      <circle cx="14" cy="14" r="5" fill="white"/>
    </svg>
  `)}`;
}

export function getPickupMarkerIcon(): string {
  return `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 24 16 24s16-12 16-24C32 7.163 24.837 0 16 0z" fill="#22c55e"/>
      <circle cx="16" cy="16" r="7" fill="white"/>
    </svg>
  `)}`;
}

export function getDropMarkerIcon(): string {
  return `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 24 16 24s16-12 16-24C32 7.163 24.837 0 16 0z" fill="#FFD700"/>
      <circle cx="16" cy="16" r="7" fill="white"/>
    </svg>
  `)}`;
}
