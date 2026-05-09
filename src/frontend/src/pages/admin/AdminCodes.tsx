import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Clock, Copy, Key, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SecretCode {
  code: string;
  createdAt: string;
  expiresAt: string;
  expiryLabel: string;
  isUsed: boolean;
  usedBy?: string;
}

const INITIAL_CODES: SecretCode[] = [
  {
    code: "ZRN-2024-001",
    createdAt: "2026-01-10",
    expiresAt: "2026-01-11",
    expiryLabel: "24h",
    isUsed: true,
    usedBy: "Muhammad Asif",
  },
  {
    code: "ZRN-2024-002",
    createdAt: "2026-01-12",
    expiresAt: "2026-01-13",
    expiryLabel: "24h",
    isUsed: true,
    usedBy: "Abdul Rehman",
  },
  {
    code: "ZRN-2024-003",
    createdAt: "2026-01-15",
    expiresAt: "2026-01-17",
    expiryLabel: "48h",
    isUsed: true,
    usedBy: "Gul Hassan",
  },
  {
    code: "ZRN-2024-ABC",
    createdAt: "2026-05-01",
    expiresAt: "2026-05-08",
    expiryLabel: "7d",
    isUsed: false,
  },
  {
    code: "ZRN-2024-XYZ",
    createdAt: "2026-05-05",
    expiresAt: "2026-05-07",
    expiryLabel: "48h",
    isUsed: false,
  },
];

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const part1 = Array.from(
    { length: 4 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
  const part2 = Array.from(
    { length: 4 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
  return `ZRN-${part1}-${part2}`;
}

function getExpiry(label: string): string {
  const d = new Date();
  if (label === "24h") d.setHours(d.getHours() + 24);
  else if (label === "48h") d.setHours(d.getHours() + 48);
  else d.setDate(d.getDate() + 7);
  return d.toLocaleDateString();
}

export default function AdminCodes() {
  const [codes, setCodes] = useState<SecretCode[]>(INITIAL_CODES);
  const [expiry, setExpiry] = useState("24h");
  const [newCode, setNewCode] = useState("");
  const [copied, setCopied] = useState("");

  function handleGenerate() {
    const code = generateCode();
    const entry: SecretCode = {
      code,
      createdAt: new Date().toLocaleDateString(),
      expiresAt: getExpiry(expiry),
      expiryLabel: expiry,
      isUsed: false,
    };
    setCodes((prev) => [entry, ...prev]);
    setNewCode(code);
    toast.success(`Code generated: ${code}`);
  }

  function handleCopy(code: string) {
    navigator.clipboard.writeText(code).catch(() => undefined);
    setCopied(code);
    setTimeout(() => setCopied(""), 2000);
    toast.success("Code copied to clipboard");
  }

  const unused = codes.filter((c) => !c.isUsed);
  const used = codes.filter((c) => c.isUsed);

  return (
    <div className="p-6 space-y-6" data-ocid="admin.codes.page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Secret Codes
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Generate one-time driver activation codes
          </p>
        </div>
      </div>

      <Card className="p-5 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Key className="w-4 h-4 text-primary" /> Generate New Code
        </h3>
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 space-y-1.5">
            <Label>Expiry Duration</Label>
            <Select value={expiry} onValueChange={setExpiry}>
              <SelectTrigger data-ocid="admin.codes.expiry_select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="48h">48 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleGenerate}
            className="gap-2"
            data-ocid="admin.codes.generate_button"
          >
            <RefreshCw className="w-4 h-4" /> Generate Code
          </Button>
        </div>
        {newCode && (
          <div
            className="mt-4 flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-lg px-4 py-3"
            data-ocid="admin.codes.new_code"
          >
            <code className="font-mono font-bold text-primary text-lg tracking-widest">
              {newCode}
            </code>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleCopy(newCode)}
            >
              {copied === newCode ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5 bg-card border-border">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-400" />
            Unused Codes
            <Badge variant="outline" className="ml-auto">
              {unused.length}
            </Badge>
          </h3>
          <div className="space-y-2">
            {unused.length === 0 && (
              <p
                className="text-muted-foreground text-sm text-center py-6"
                data-ocid="admin.codes.empty_state"
              >
                No unused codes
              </p>
            )}
            {unused.map((c, i) => (
              <div
                key={c.code}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/40"
                data-ocid={`admin.codes.item.${i + 1}`}
              >
                <code className="font-mono text-sm font-medium text-foreground flex-1 tracking-wider">
                  {c.code}
                </code>
                <span className="text-xs text-muted-foreground">
                  Expires {c.expiresAt}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleCopy(c.code)}
                >
                  {copied === c.code ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Used Codes
            <Badge variant="outline" className="ml-auto">
              {used.length}
            </Badge>
          </h3>
          <div className="space-y-2">
            {used.map((c, i) => (
              <div
                key={c.code}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/40"
                data-ocid={`admin.codes.used.${i + 1}`}
              >
                <code className="font-mono text-sm text-muted-foreground flex-1 tracking-wider line-through">
                  {c.code}
                </code>
                <span className="text-xs text-muted-foreground">
                  {c.usedBy}
                </span>
                <Badge
                  variant="outline"
                  className="text-xs text-green-400 border-green-500/30"
                >
                  Used
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
