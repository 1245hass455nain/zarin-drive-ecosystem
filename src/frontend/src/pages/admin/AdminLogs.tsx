import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Car,
  Search,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react";
import { useState } from "react";

type LogCategory = "auth" | "driver" | "ride" | "system" | "wallet";

interface AdminLog {
  id: string;
  timestamp: string;
  admin: string;
  role: string;
  category: LogCategory;
  action: string;
  target: string;
  ip: string;
}

const LOG_DATA: AdminLog[] = [
  {
    id: "log-001",
    timestamp: "2026-05-08 09:14:32",
    admin: "Zulfiqar Khan",
    role: "Super Admin",
    category: "driver",
    action: "Suspended driver",
    target: "Iqbal Zehri (driver-8)",
    ip: "182.191.22.14",
  },
  {
    id: "log-002",
    timestamp: "2026-05-08 08:55:11",
    admin: "Mehreen Baloch",
    role: "Manager",
    category: "wallet",
    action: "Reset dues",
    target: "Noor Ahmed (driver-4)",
    ip: "182.191.22.15",
  },
  {
    id: "log-003",
    timestamp: "2026-05-08 08:30:44",
    admin: "Zulfiqar Khan",
    role: "Super Admin",
    category: "ride",
    action: "Force completed ride",
    target: "Ride #ride-005",
    ip: "182.191.22.14",
  },
  {
    id: "log-004",
    timestamp: "2026-05-08 08:15:22",
    admin: "Saad Rind",
    role: "Support",
    category: "auth",
    action: "Admin login",
    target: "support@zarin.pk",
    ip: "182.191.22.18",
  },
  {
    id: "log-005",
    timestamp: "2026-05-08 07:50:05",
    admin: "Mehreen Baloch",
    role: "Manager",
    category: "driver",
    action: "Generated activation code",
    target: "ZRN-2024-ABC",
    ip: "182.191.22.15",
  },
  {
    id: "log-006",
    timestamp: "2026-05-07 22:44:17",
    admin: "Zulfiqar Khan",
    role: "Super Admin",
    category: "system",
    action: "Updated commission rate",
    target: "Bike: 20% → 18%",
    ip: "182.191.22.14",
  },
  {
    id: "log-007",
    timestamp: "2026-05-07 21:30:59",
    admin: "Saad Rind",
    role: "Support",
    category: "driver",
    action: "Activated driver",
    target: "Sajjad Buledi (driver-12)",
    ip: "182.191.22.18",
  },
  {
    id: "log-008",
    timestamp: "2026-05-07 19:22:40",
    admin: "Zulfiqar Khan",
    role: "Super Admin",
    category: "wallet",
    action: "Marked payment received",
    target: "Bashir Kalmati (driver-9) — Rs. 4,300",
    ip: "182.191.22.14",
  },
  {
    id: "log-009",
    timestamp: "2026-05-07 18:05:03",
    admin: "Mehreen Baloch",
    role: "Manager",
    category: "ride",
    action: "Cancelled ride",
    target: "Ride #ride-006",
    ip: "182.191.22.15",
  },
  {
    id: "log-010",
    timestamp: "2026-05-07 16:33:27",
    admin: "Zulfiqar Khan",
    role: "Super Admin",
    category: "driver",
    action: "Added new driver",
    target: "Rashid Pirkani (driver-14)",
    ip: "182.191.22.14",
  },
  {
    id: "log-011",
    timestamp: "2026-05-07 14:58:50",
    admin: "Saad Rind",
    role: "Support",
    category: "ride",
    action: "Refunded ride fare",
    target: "Ride #ride-004 — Rs. 204",
    ip: "182.191.22.18",
  },
  {
    id: "log-012",
    timestamp: "2026-05-07 12:10:14",
    admin: "Mehreen Baloch",
    role: "Manager",
    category: "system",
    action: "Sent notification",
    target: "All customers — Eid promo",
    ip: "182.191.22.15",
  },
  {
    id: "log-013",
    timestamp: "2026-05-07 10:40:02",
    admin: "Zulfiqar Khan",
    role: "Super Admin",
    category: "wallet",
    action: "Reset commission dues",
    target: "Daud Mengal (driver-6)",
    ip: "182.191.22.14",
  },
  {
    id: "log-014",
    timestamp: "2026-05-06 20:15:33",
    admin: "Zulfiqar Khan",
    role: "Super Admin",
    category: "auth",
    action: "Admin login",
    target: "admin@zarin.pk",
    ip: "182.191.22.14",
  },
  {
    id: "log-015",
    timestamp: "2026-05-06 17:48:19",
    admin: "Mehreen Baloch",
    role: "Manager",
    category: "driver",
    action: "Blocked driver",
    target: "Khalid Gichki (driver-13)",
    ip: "182.191.22.15",
  },
];

const CATEGORY_CONFIG: Record<
  LogCategory,
  {
    label: string;
    color: string;
    Icon: React.ComponentType<{ className?: string }>;
  }
> = {
  auth: {
    label: "Auth",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    Icon: ShieldCheck,
  },
  driver: {
    label: "Driver",
    color: "text-green-400 bg-green-500/10 border-green-500/20",
    Icon: Car,
  },
  ride: {
    label: "Ride",
    color: "text-primary bg-primary/10 border-primary/20",
    Icon: Car,
  },
  system: {
    label: "System",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    Icon: Settings,
  },
  wallet: {
    label: "Wallet",
    color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    Icon: AlertTriangle,
  },
};

export default function AdminLogs() {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<"all" | LogCategory>("all");
  const [filterAdmin, setFilterAdmin] = useState("all");

  const admins = Array.from(new Set(LOG_DATA.map((l) => l.admin)));

  const filtered = LOG_DATA.filter((l) => {
    const matchCat = filterCat === "all" || l.category === filterCat;
    const matchAdmin = filterAdmin === "all" || l.admin === filterAdmin;
    const matchSearch =
      !search ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.target.toLowerCase().includes(search.toLowerCase()) ||
      l.admin.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchAdmin && matchSearch;
  });

  return (
    <div className="p-6 space-y-6" data-ocid="admin.logs.page">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Admin Logs
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Full audit trail of all admin actions
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search actions, targets, admins..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-ocid="admin.logs.search_input"
          />
        </div>
        <Select
          value={filterCat}
          onValueChange={(v) => setFilterCat(v as "all" | LogCategory)}
        >
          <SelectTrigger
            className="w-full sm:w-40"
            data-ocid="admin.logs.category_select"
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="auth">Auth</SelectItem>
            <SelectItem value="driver">Driver</SelectItem>
            <SelectItem value="ride">Ride</SelectItem>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="wallet">Wallet</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterAdmin} onValueChange={setFilterAdmin}>
          <SelectTrigger
            className="w-full sm:w-44"
            data-ocid="admin.logs.admin_select"
          >
            <SelectValue placeholder="Admin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Admins</SelectItem>
            {admins.map((a) => (
              <SelectItem key={a} value={a}>
                {a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Timestamp
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Admin
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Category
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Action
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Target
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  IP
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-muted-foreground"
                    data-ocid="admin.logs.empty_state"
                  >
                    No logs match your filters
                  </td>
                </tr>
              )}
              {filtered.map((log, i) => {
                const cat = CATEGORY_CONFIG[log.category];
                const CatIcon = cat.Icon;
                return (
                  <tr
                    key={log.id}
                    className="border-b border-border hover:bg-muted/20 transition-colors"
                    data-ocid={`admin.logs.item.${i + 1}`}
                  >
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                      {log.timestamp}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="w-3 h-3 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-xs">
                            {log.admin}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {log.role}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={`text-xs gap-1 ${cat.color}`}
                      >
                        <CatIcon className="w-3 h-3" />
                        {cat.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {log.action}
                    </td>
                    <td
                      className="px-4 py-3 text-muted-foreground max-w-[200px] truncate"
                      title={log.target}
                    >
                      {log.target}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                      {log.ip}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
