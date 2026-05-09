import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Eye, RotateCcw, Search, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { mockRides } from "../../data/mockRides";
import type { Ride, RideStatus } from "../../stores/rideStore";

const STATUS_COLORS: Record<string, string> = {
  completed: "text-green-500 border-green-500/30",
  in_progress: "text-blue-500 border-blue-500/30",
  cancelled: "text-destructive border-destructive/30",
  searching: "text-yellow-500 border-yellow-500/30",
  accepted: "text-blue-400 border-blue-400/30",
  arriving: "text-blue-300 border-blue-300/30",
  reached: "text-purple-500 border-purple-500/30",
  started: "text-primary border-primary/30",
};

export default function RideManagement() {
  const [rides, setRides] = useState<Ride[]>(mockRides);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const filtered = rides.filter((r) => {
    const matchSearch =
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.driverName.toLowerCase().includes(search.toLowerCase()) ||
      r.pickupAddress.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  function updateStatus(id: string, status: RideStatus) {
    setRides((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    toast.success(`Ride ${status.replace("_", " ")}`);
  }

  function handleRefund(id: string) {
    toast.success(`Refund initiated for ride ${id}`);
  }

  return (
    <div className="p-6 space-y-4" data-ocid="admin.rides.page">
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search rides..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="admin.rides.search_input"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44" data-ocid="admin.rides.status_filter">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="searching">Searching</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Ride ID
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Customer
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Driver
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Route
                </th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                  Fare
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr
                  key={r.id}
                  className="border-b border-border/50 hover:bg-muted/20 transition-smooth"
                  data-ocid={`admin.rides.item.${i + 1}`}
                >
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {r.id}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {r.customerName}
                  </td>
                  <td className="px-4 py-3 text-foreground">{r.driverName}</td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-foreground truncate max-w-36">
                      {r.pickupAddress}
                    </div>
                    <div className="text-xs text-muted-foreground truncate max-w-36">
                      → {r.dropAddress}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-primary">
                    Rs. {r.totalFare}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={[
                        "capitalize text-xs",
                        STATUS_COLORS[r.status] ?? "",
                      ].join(" ")}
                    >
                      {r.status.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedRide(r);
                          setDetailOpen(true);
                        }}
                        data-ocid={`admin.rides.view_button.${i + 1}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      {r.status !== "cancelled" && r.status !== "completed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(r.id, "cancelled")}
                          data-ocid={`admin.rides.cancel_button.${i + 1}`}
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </Button>
                      )}
                      {r.status === "in_progress" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(r.id, "completed")}
                          data-ocid={`admin.rides.complete_button.${i + 1}`}
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                        </Button>
                      )}
                      {r.status === "completed" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRefund(r.id)}
                          data-ocid={`admin.rides.refund_button.${i + 1}`}
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent
          className="max-w-lg"
          data-ocid="admin.rides.detail_dialog"
        >
          <DialogHeader>
            <DialogTitle>Ride Details</DialogTitle>
          </DialogHeader>
          {selectedRide && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">ID:</span>{" "}
                  <span className="font-mono">{selectedRide.id}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">OTP:</span>{" "}
                  <span className="font-mono font-bold text-primary">
                    {selectedRide.otp}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Customer:</span>{" "}
                  {selectedRide.customerName}
                </div>
                <div>
                  <span className="text-muted-foreground">Driver:</span>{" "}
                  {selectedRide.driverName}
                </div>
                <div>
                  <span className="text-muted-foreground">Vehicle:</span>{" "}
                  <span className="capitalize">{selectedRide.vehicleType}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Plate:</span>{" "}
                  {selectedRide.vehiclePlate}
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Pickup:</span>{" "}
                  {selectedRide.pickupAddress}
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Drop:</span>{" "}
                  {selectedRide.dropAddress}
                </div>
                <div>
                  <span className="text-muted-foreground">Distance:</span>{" "}
                  {selectedRide.distanceKm} km
                </div>
                <div>
                  <span className="text-muted-foreground">Fare:</span>{" "}
                  <span className="text-primary font-bold">
                    Rs. {selectedRide.totalFare}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Payment:</span>{" "}
                  <span className="capitalize">
                    {selectedRide.paymentMethod}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>{" "}
                  <Badge
                    variant="outline"
                    className={[
                      "capitalize",
                      STATUS_COLORS[selectedRide.status] ?? "",
                    ].join(" ")}
                  >
                    {selectedRide.status.replace("_", " ")}
                  </Badge>
                </div>
                {selectedRide.rating && (
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Rating:</span> ⭐{" "}
                    {selectedRide.rating}/5 — {selectedRide.feedback}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
