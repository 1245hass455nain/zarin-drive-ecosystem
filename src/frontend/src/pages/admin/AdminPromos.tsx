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
import { Plus, Power, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PromoCode {
  id: string;
  code: string;
  discount: number;
  discountType: "flat" | "percent";
  maxUses: number;
  usedCount: number;
  expiresAt: string;
  isActive: boolean;
  appliesTo: "all" | "bike" | "car" | "premium" | "rickshaw";
}

const INITIAL_PROMOS: PromoCode[] = [
  {
    id: "p1",
    code: "WELCOME50",
    discount: 50,
    discountType: "flat",
    maxUses: 200,
    usedCount: 147,
    expiresAt: "2026-06-30",
    isActive: true,
    appliesTo: "all",
  },
  {
    id: "p2",
    code: "GWADAR10",
    discount: 10,
    discountType: "percent",
    maxUses: 500,
    usedCount: 312,
    expiresAt: "2026-05-31",
    isActive: true,
    appliesTo: "all",
  },
  {
    id: "p3",
    code: "PREMIUM100",
    discount: 100,
    discountType: "flat",
    maxUses: 50,
    usedCount: 28,
    expiresAt: "2026-06-15",
    isActive: true,
    appliesTo: "premium",
  },
  {
    id: "p4",
    code: "EID2026",
    discount: 30,
    discountType: "percent",
    maxUses: 1000,
    usedCount: 891,
    expiresAt: "2026-04-30",
    isActive: false,
    appliesTo: "all",
  },
  {
    id: "p5",
    code: "FIRSTRIDE",
    discount: 75,
    discountType: "flat",
    maxUses: 100,
    usedCount: 100,
    expiresAt: "2026-03-31",
    isActive: false,
    appliesTo: "all",
  },
];

export default function AdminPromos() {
  const [promos, setPromos] = useState<PromoCode[]>(INITIAL_PROMOS);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    code: "",
    discount: "",
    discountType: "flat" as "flat" | "percent",
    maxUses: "",
    expiresAt: "",
    appliesTo: "all" as PromoCode["appliesTo"],
  });

  function handleCreate() {
    if (!form.code || !form.discount || !form.maxUses || !form.expiresAt) {
      toast.error("All fields are required");
      return;
    }
    const promo: PromoCode = {
      id: `p${Date.now()}`,
      code: form.code.toUpperCase(),
      discount: Number(form.discount),
      discountType: form.discountType,
      maxUses: Number(form.maxUses),
      usedCount: 0,
      expiresAt: form.expiresAt,
      isActive: true,
      appliesTo: form.appliesTo,
    };
    setPromos((prev) => [promo, ...prev]);
    setIsOpen(false);
    setForm({
      code: "",
      discount: "",
      discountType: "flat",
      maxUses: "",
      expiresAt: "",
      appliesTo: "all",
    });
    toast.success(`Promo code ${promo.code} created`);
  }

  function toggleActive(id: string) {
    setPromos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)),
    );
    toast.success("Promo status updated");
  }

  function handleDelete(id: string) {
    setPromos((prev) => prev.filter((p) => p.id !== id));
    toast.success("Promo code deleted");
  }

  const active = promos.filter((p) => p.isActive);
  const inactive = promos.filter((p) => !p.isActive);

  return (
    <div className="p-6 space-y-6" data-ocid="admin.promos.page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Promo Codes
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Create and manage promotional discounts
          </p>
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          className="gap-2"
          data-ocid="admin.promos.add_button"
        >
          <Plus className="w-4 h-4" /> Create Promo
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 bg-card border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Active Promos
          </p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {active.length}
          </p>
        </Card>
        <Card className="p-4 bg-card border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Total Uses
          </p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {promos.reduce((s, p) => s + p.usedCount, 0)}
          </p>
        </Card>
        <Card className="p-4 bg-card border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Inactive
          </p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {inactive.length}
          </p>
        </Card>
      </div>

      <Card className="border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Code
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Discount
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Usage
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Expires
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Applies To
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {promos.map((p, i) => (
                <tr
                  key={p.id}
                  className="border-b border-border hover:bg-muted/20 transition-colors"
                  data-ocid={`admin.promos.item.${i + 1}`}
                >
                  <td className="px-4 py-3">
                    <code className="font-mono font-bold text-primary tracking-wider">
                      {p.code}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {p.discountType === "flat"
                      ? `Rs. ${p.discount}`
                      : `${p.discount}%`}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {p.usedCount} / {p.maxUses}
                    <div className="w-20 h-1 bg-muted rounded-full mt-1">
                      <div
                        className="h-1 bg-primary rounded-full"
                        style={{
                          width: `${Math.min(100, (p.usedCount / p.maxUses) * 100)}%`,
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {p.expiresAt}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-xs capitalize">
                      {p.appliesTo}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={
                        p.isActive
                          ? "text-green-400 border-green-500/30 bg-green-500/10"
                          : "text-muted-foreground"
                      }
                    >
                      {p.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => toggleActive(p.id)}
                        data-ocid={`admin.promos.toggle.${i + 1}`}
                      >
                        <Power className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(p.id)}
                        data-ocid={`admin.promos.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="bg-card border-border"
          data-ocid="admin.promos.dialog"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" /> Create Promo Code
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2">
                <Label>Promo Code</Label>
                <Input
                  placeholder="e.g. GWADAR50"
                  value={form.code}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      code: e.target.value.toUpperCase(),
                    }))
                  }
                  data-ocid="admin.promos.code_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Discount Value</Label>
                <Input
                  type="number"
                  placeholder="e.g. 50"
                  value={form.discount}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, discount: e.target.value }))
                  }
                  data-ocid="admin.promos.discount_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Discount Type</Label>
                <Select
                  value={form.discountType}
                  onValueChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      discountType: v as "flat" | "percent",
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat (Rs.)</SelectItem>
                    <SelectItem value="percent">Percentage (%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Max Uses</Label>
                <Input
                  type="number"
                  placeholder="e.g. 100"
                  value={form.maxUses}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, maxUses: e.target.value }))
                  }
                  data-ocid="admin.promos.maxuses_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Expires On</Label>
                <Input
                  type="date"
                  value={form.expiresAt}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, expiresAt: e.target.value }))
                  }
                  data-ocid="admin.promos.expiry_input"
                />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label>Applies To</Label>
                <Select
                  value={form.appliesTo}
                  onValueChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      appliesTo: v as PromoCode["appliesTo"],
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vehicles</SelectItem>
                    <SelectItem value="bike">Bike Only</SelectItem>
                    <SelectItem value="rickshaw">Rickshaw Only</SelectItem>
                    <SelectItem value="car">Car Only</SelectItem>
                    <SelectItem value="premium">Premium Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              data-ocid="admin.promos.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              data-ocid="admin.promos.submit_button"
            >
              Create Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
