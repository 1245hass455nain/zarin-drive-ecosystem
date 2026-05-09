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
import { CheckCircle, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { mockDrivers } from "../../data/mockDrivers";

const COMMISSION_RATES: Record<string, number> = {
  bike: 20,
  rickshaw: 20,
  car: 20,
  premium: 20,
};

interface WalletEntry {
  driverId: string;
  name: string;
  vehicleType: string;
  balance: number;
  pendingDues: number;
  lastPayment: string;
  status: "clear" | "pending" | "overdue";
}

const initialWallets: WalletEntry[] = mockDrivers.map((d) => ({
  driverId: d.id,
  name: d.name,
  vehicleType: d.vehicleType,
  balance: d.walletBalance,
  pendingDues: Math.round(d.walletBalance * 0.2),
  lastPayment: "2024-05-01",
  status:
    d.walletBalance > 3000
      ? "overdue"
      : d.walletBalance > 1000
        ? "pending"
        : "clear",
}));

export default function WalletPayments() {
  const [wallets, setWallets] = useState<WalletEntry[]>(initialWallets);
  const [selectedEntry, setSelectedEntry] = useState<WalletEntry | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [commissionRates, setCommissionRates] = useState(COMMISSION_RATES);
  const [amount, setAmount] = useState("");

  function markPaymentReceived(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedEntry) return;
    const paid = Number(amount);
    setWallets((prev) =>
      prev.map((w) =>
        w.driverId === selectedEntry.driverId
          ? {
              ...w,
              pendingDues: Math.max(0, w.pendingDues - paid),
              status: "clear",
              lastPayment: new Date().toISOString().slice(0, 10),
            }
          : w,
      ),
    );
    toast.success(
      `Payment of Rs. ${paid.toLocaleString()} recorded for ${selectedEntry.name}`,
    );
    setPaymentOpen(false);
    setAmount("");
    setSelectedEntry(null);
  }

  function resetDues(driverId: string) {
    setWallets((prev) =>
      prev.map((w) =>
        w.driverId === driverId ? { ...w, pendingDues: 0, status: "clear" } : w,
      ),
    );
    toast.success("Dues reset to zero");
  }

  const STATUS_COLORS: Record<string, string> = {
    clear: "text-green-500 border-green-500/30",
    pending: "text-orange-500 border-orange-500/30",
    overdue: "text-destructive border-destructive/30",
  };

  return (
    <div className="p-6 space-y-6" data-ocid="admin.wallet.page">
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-card border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Total Driver Balances
          </p>
          <p className="text-2xl font-display font-bold text-primary mt-1">
            Rs. {wallets.reduce((s, w) => s + w.balance, 0).toLocaleString()}
          </p>
        </Card>
        <Card className="p-4 bg-card border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Total Pending Dues
          </p>
          <p className="text-2xl font-display font-bold text-orange-500 mt-1">
            Rs.{" "}
            {wallets.reduce((s, w) => s + w.pendingDues, 0).toLocaleString()}
          </p>
        </Card>
        <Card className="p-4 bg-card border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Overdue Accounts
          </p>
          <p className="text-2xl font-display font-bold text-destructive mt-1">
            {wallets.filter((w) => w.status === "overdue").length}
          </p>
        </Card>
      </div>

      {/* Commission settings */}
      <Card className="p-5 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-4">
          Commission Rate Settings (%)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(commissionRates).map(([type, rate]) => (
            <div key={type} className="space-y-1">
              <Label className="capitalize">{type}</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={0}
                  max={50}
                  value={rate}
                  onChange={(e) =>
                    setCommissionRates((prev) => ({
                      ...prev,
                      [type]: Number(e.target.value),
                    }))
                  }
                  className="w-full"
                  data-ocid={`admin.wallet.commission_${type}_input`}
                />
                <span className="text-muted-foreground">%</span>
              </div>
            </div>
          ))}
        </div>
        <Button
          type="button"
          className="mt-4"
          size="sm"
          onClick={() => toast.success("Commission rates saved")}
          data-ocid="admin.wallet.save_commission_button"
        >
          Save Rates
        </Button>
      </Card>

      {/* Wallet table */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Driver
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Type
                </th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                  Balance
                </th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                  Pending Dues
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Last Payment
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
              {wallets.map((w, i) => (
                <tr
                  key={w.driverId}
                  className="border-b border-border/50 hover:bg-muted/20 transition-smooth"
                  data-ocid={`admin.wallet.item.${i + 1}`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {w.name}
                  </td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">
                    {w.vehicleType}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-primary">
                    Rs. {w.balance.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-orange-500">
                    Rs. {w.pendingDues.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {w.lastPayment}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={[
                        "capitalize",
                        STATUS_COLORS[w.status] ?? "",
                      ].join(" ")}
                    >
                      {w.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedEntry(w);
                          setAmount(String(w.pendingDues));
                          setPaymentOpen(true);
                        }}
                        data-ocid={`admin.wallet.pay_button.${i + 1}`}
                      >
                        <CheckCircle className="w-3 h-3 mr-1" /> Pay
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => resetDues(w.driverId)}
                        data-ocid={`admin.wallet.reset_button.${i + 1}`}
                      >
                        <RefreshCw className="w-3 h-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent data-ocid="admin.wallet.payment_dialog">
          <DialogHeader>
            <DialogTitle>Mark Payment Received</DialogTitle>
          </DialogHeader>
          <form onSubmit={markPaymentReceived} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Recording payment for <strong>{selectedEntry?.name}</strong>
            </p>
            <div className="space-y-1">
              <Label>Amount (Rs.)</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                data-ocid="admin.wallet.payment_amount_input"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setPaymentOpen(false)}
                data-ocid="admin.wallet.cancel_button"
              >
                Cancel
              </Button>
              <Button type="submit" data-ocid="admin.wallet.confirm_button">
                Confirm Payment
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
