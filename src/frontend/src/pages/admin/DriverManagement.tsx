import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ban, Key, Pause, Plus, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { mockDrivers } from "../../data/mockDrivers";
import type { DriverUser } from "../../stores/authStore";

const RANK_COLORS: Record<string, string> = {
  gold: "text-yellow-500 border-yellow-500/30 bg-yellow-500/10",
  diamond: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  platinum: "text-purple-400 border-purple-400/30 bg-purple-400/10",
};

type ExtendedDriver = DriverUser & { extStatus?: "suspended" | "blocked" };

export default function DriverManagement() {
  const [drivers, setDrivers] = useState<ExtendedDriver[]>(mockDrivers);
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [codeExpiry, setCodeExpiry] = useState("24h");

  const [newDriver, setNewDriver] = useState({
    name: "",
    phone: "",
    cnic: "",
    license: "",
    vehicleType: "car" as DriverUser["vehicleType"],
    vehiclePlate: "",
  });

  const filtered = drivers.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search) ||
      d.vehiclePlate.toLowerCase().includes(search.toLowerCase()),
  );

  function handleAddDriver(e: React.FormEvent) {
    e.preventDefault();
    const driver: ExtendedDriver = {
      id: `driver-${Date.now()}`,
      name: newDriver.name,
      phone: newDriver.phone,
      vehicleType: newDriver.vehicleType,
      vehiclePlate: newDriver.vehiclePlate,
      rank: "gold",
      walletBalance: 0,
      status: "offline",
      rating: 0,
      activationCode: `ZRN-${Date.now()}`,
    };
    setDrivers((prev) => [driver, ...prev]);
    toast.success(`Driver ${driver.name} added successfully`);
    setAddOpen(false);
    setNewDriver({
      name: "",
      phone: "",
      cnic: "",
      license: "",
      vehicleType: "car",
      vehiclePlate: "",
    });
  }

  function generateCode() {
    const rand = Math.random().toString(36).toUpperCase().slice(2, 8);
    const expiryLabel = codeExpiry.replace("h", "H");
    const code = `ZRN-${rand}-${expiryLabel}`;
    setGeneratedCode(code);
    toast.success(`Code generated: ${code}`);
  }

  function handleSuspend(id: string) {
    setDrivers((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, extStatus: "suspended" as const } : d,
      ),
    );
    toast.warning("Driver suspended");
  }

  function handleBlock(id: string) {
    setDrivers((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, extStatus: "blocked" as const } : d,
      ),
    );
    toast.error("Driver blocked");
  }

  function handleActivate(id: string) {
    setDrivers((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const { extStatus: _, ...rest } = d;
          return rest;
        }
        return d;
      }),
    );
    toast.success("Driver activated");
  }

  return (
    <div className="p-6 space-y-4" data-ocid="admin.drivers.page">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search drivers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="admin.drivers.search_input"
          />
        </div>
        <Button
          onClick={() => setCodeOpen(true)}
          variant="outline"
          data-ocid="admin.drivers.gen_code_button"
        >
          <Key className="w-4 h-4 mr-2" /> Generate Code
        </Button>
        <Button
          onClick={() => setAddOpen(true)}
          data-ocid="admin.drivers.add_button"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Driver
        </Button>
      </div>

      <Card className="bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Driver
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Vehicle
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Rank
                </th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                  Wallet
                </th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                  Rating
                </th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <tr
                  key={d.id}
                  className="border-b border-border/50 hover:bg-muted/20 transition-smooth"
                  data-ocid={`admin.drivers.item.${i + 1}`}
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{d.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {d.phone}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="capitalize text-foreground">
                      {d.vehicleType}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {d.vehiclePlate}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {d.extStatus ? (
                      <Badge variant="destructive" className="capitalize">
                        {d.extStatus}
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className={[
                          "capitalize",
                          d.status === "online"
                            ? "text-green-500 border-green-500/30"
                            : d.status === "on_ride"
                              ? "text-blue-500 border-blue-500/30"
                              : "text-muted-foreground",
                        ].join(" ")}
                      >
                        {d.status.replace("_", " ")}
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={["capitalize", RANK_COLORS[d.rank] ?? ""].join(
                        " ",
                      )}
                    >
                      {d.rank}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-primary">
                    Rs. {d.walletBalance.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-foreground">
                    ⭐ {d.rating}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      {d.extStatus ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleActivate(d.id)}
                          data-ocid={`admin.drivers.activate_button.${i + 1}`}
                        >
                          Activate
                        </Button>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSuspend(d.id)}
                            data-ocid={`admin.drivers.suspend_button.${i + 1}`}
                          >
                            <Pause className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleBlock(d.id)}
                            data-ocid={`admin.drivers.block_button.${i + 1}`}
                          >
                            <Ban className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent
          className="max-w-md"
          data-ocid="admin.drivers.add_dialog"
        >
          <DialogHeader>
            <DialogTitle>Add New Driver</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddDriver} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1">
                <Label>Full Name</Label>
                <Input
                  value={newDriver.name}
                  onChange={(e) =>
                    setNewDriver((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                  data-ocid="admin.drivers.name_input"
                />
              </div>
              <div className="space-y-1">
                <Label>Phone</Label>
                <Input
                  value={newDriver.phone}
                  onChange={(e) =>
                    setNewDriver((p) => ({ ...p, phone: e.target.value }))
                  }
                  required
                  data-ocid="admin.drivers.phone_input"
                />
              </div>
              <div className="space-y-1">
                <Label>CNIC</Label>
                <Input
                  value={newDriver.cnic}
                  onChange={(e) =>
                    setNewDriver((p) => ({ ...p, cnic: e.target.value }))
                  }
                  placeholder="XXXXX-XXXXXXX-X"
                  data-ocid="admin.drivers.cnic_input"
                />
              </div>
              <div className="space-y-1">
                <Label>Vehicle Type</Label>
                <Select
                  value={newDriver.vehicleType}
                  onValueChange={(v) =>
                    setNewDriver((p) => ({
                      ...p,
                      vehicleType: v as DriverUser["vehicleType"],
                    }))
                  }
                >
                  <SelectTrigger data-ocid="admin.drivers.vehicle_type_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bike">Bike</SelectItem>
                    <SelectItem value="rickshaw">Rickshaw</SelectItem>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="premium">Premium Car</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Vehicle Plate</Label>
                <Input
                  value={newDriver.vehiclePlate}
                  onChange={(e) =>
                    setNewDriver((p) => ({
                      ...p,
                      vehiclePlate: e.target.value,
                    }))
                  }
                  placeholder="GWD-2024-0000"
                  data-ocid="admin.drivers.plate_input"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddOpen(false)}
                data-ocid="admin.drivers.cancel_button"
              >
                Cancel
              </Button>
              <Button type="submit" data-ocid="admin.drivers.confirm_button">
                Add Driver
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={codeOpen} onOpenChange={setCodeOpen}>
        <DialogContent data-ocid="admin.drivers.code_dialog">
          <DialogHeader>
            <DialogTitle>Generate Activation Code</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label>Code Expiry</Label>
              <Select value={codeExpiry} onValueChange={setCodeExpiry}>
                <SelectTrigger data-ocid="admin.drivers.code_expiry_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">24 Hours</SelectItem>
                  <SelectItem value="48h">48 Hours</SelectItem>
                  <SelectItem value="7d">7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {generatedCode && (
              <div className="bg-muted rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">
                  Generated Code
                </p>
                <p className="font-mono text-lg font-bold text-primary">
                  {generatedCode}
                </p>
              </div>
            )}
            <Button
              type="button"
              className="w-full"
              onClick={generateCode}
              data-ocid="admin.drivers.generate_code_button"
            >
              Generate Code
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
