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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ban, Eye, Pause, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { mockCustomers } from "../../data/mockCustomers";
import type { CustomerRecord } from "../../stores/customerStore";

const STATUS_COLORS: Record<string, string> = {
  active: "text-green-500 border-green-500/30",
  suspended: "text-orange-500 border-orange-500/30",
  banned: "text-destructive border-destructive/30",
};

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<CustomerRecord[]>(mockCustomers);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<CustomerRecord | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const active = customers.filter((c) => c.status === "active");
  const suspended = customers.filter((c) => c.status === "suspended");
  const blacklist = customers.filter((c) => c.status === "banned");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  function updateStatus(id: string, status: CustomerRecord["status"]) {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c)),
    );
    toast.success(`Customer ${status}`);
  }

  function CustomerRow({ c, i }: { c: CustomerRecord; i: number }) {
    return (
      <tr
        className="border-b border-border/50 hover:bg-muted/20 transition-smooth"
        data-ocid={`admin.customers.item.${i + 1}`}
      >
        <td className="px-4 py-3">
          <div className="font-medium text-foreground">{c.name}</div>
          <div className="text-xs text-muted-foreground">{c.email}</div>
        </td>
        <td className="px-4 py-3 text-muted-foreground">{c.phone}</td>
        <td className="px-4 py-3 text-right font-mono text-primary">
          Rs. {c.walletBalance.toLocaleString()}
        </td>
        <td className="px-4 py-3 text-right text-foreground">{c.totalRides}</td>
        <td className="px-4 py-3">
          <Badge
            variant="outline"
            className={["capitalize", STATUS_COLORS[c.status] ?? ""].join(" ")}
          >
            {c.status}
          </Badge>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center justify-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setSelected(c);
                setDetailOpen(true);
              }}
              data-ocid={`admin.customers.view_button.${i + 1}`}
            >
              <Eye className="w-3.5 h-3.5" />
            </Button>
            {c.status === "active" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateStatus(c.id, "suspended")}
                data-ocid={`admin.customers.suspend_button.${i + 1}`}
              >
                <Pause className="w-3.5 h-3.5" />
              </Button>
            )}
            {c.status !== "banned" && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => updateStatus(c.id, "banned")}
                data-ocid={`admin.customers.ban_button.${i + 1}`}
              >
                <Ban className="w-3.5 h-3.5" />
              </Button>
            )}
            {c.status !== "active" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateStatus(c.id, "active")}
                data-ocid={`admin.customers.activate_button.${i + 1}`}
              >
                Unban
              </Button>
            )}
          </div>
        </td>
      </tr>
    );
  }

  const TableHeader = () => (
    <tr className="border-b border-border bg-muted/40">
      <th className="text-left px-4 py-3 font-medium text-muted-foreground">
        Customer
      </th>
      <th className="text-left px-4 py-3 font-medium text-muted-foreground">
        Phone
      </th>
      <th className="text-right px-4 py-3 font-medium text-muted-foreground">
        Wallet
      </th>
      <th className="text-right px-4 py-3 font-medium text-muted-foreground">
        Rides
      </th>
      <th className="text-left px-4 py-3 font-medium text-muted-foreground">
        Status
      </th>
      <th className="text-center px-4 py-3 font-medium text-muted-foreground">
        Actions
      </th>
    </tr>
  );

  return (
    <div className="p-6 space-y-4" data-ocid="admin.customers.page">
      <div className="flex gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="admin.customers.search_input"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active", count: active.length, color: "text-green-500" },
          {
            label: "Suspended",
            count: suspended.length,
            color: "text-orange-500",
          },
          {
            label: "Banned",
            count: blacklist.length,
            color: "text-destructive",
          },
        ].map((s) => (
          <Card key={s.label} className="p-4 bg-card border-border">
            <p className="text-xs text-muted-foreground uppercase">{s.label}</p>
            <p
              className={["text-2xl font-bold font-display mt-1", s.color].join(
                " ",
              )}
            >
              {s.count}
            </p>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all" data-ocid="admin.customers.tabs">
        <TabsList>
          <TabsTrigger value="all" data-ocid="admin.customers.tab.all">
            All ({customers.length})
          </TabsTrigger>
          <TabsTrigger value="active" data-ocid="admin.customers.tab.active">
            Active ({active.length})
          </TabsTrigger>
          <TabsTrigger
            value="suspended"
            data-ocid="admin.customers.tab.suspended"
          >
            Suspended ({suspended.length})
          </TabsTrigger>
          <TabsTrigger
            value="blacklist"
            data-ocid="admin.customers.tab.blacklist"
          >
            Blacklist ({blacklist.length})
          </TabsTrigger>
        </TabsList>

        {(["all", "active", "suspended", "blacklist"] as const).map((tab) => {
          const list =
            tab === "all"
              ? filtered
              : tab === "blacklist"
                ? blacklist.filter((c) =>
                    c.name.toLowerCase().includes(search.toLowerCase()),
                  )
                : customers.filter(
                    (c) =>
                      c.status === tab &&
                      c.name.toLowerCase().includes(search.toLowerCase()),
                  );
          return (
            <TabsContent key={tab} value={tab}>
              <Card className="bg-card border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <TableHeader />
                    </thead>
                    <tbody>
                      {list.map((c, i) => (
                        <CustomerRow key={c.id} c={c} i={i} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent data-ocid="admin.customers.detail_dialog">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-muted-foreground">Name:</span>{" "}
                  <span className="font-medium">{selected.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone:</span>{" "}
                  {selected.phone}
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Email:</span>{" "}
                  {selected.email}
                </div>
                <div>
                  <span className="text-muted-foreground">Wallet:</span>{" "}
                  <span className="text-primary font-bold">
                    Rs. {selected.walletBalance.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Rides:</span>{" "}
                  {selected.totalRides}
                </div>
                <div>
                  <span className="text-muted-foreground">Joined:</span>{" "}
                  {selected.joinDate}
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>{" "}
                  <Badge
                    variant="outline"
                    className={[
                      "capitalize",
                      STATUS_COLORS[selected.status] ?? "",
                    ].join(" ")}
                  >
                    {selected.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
