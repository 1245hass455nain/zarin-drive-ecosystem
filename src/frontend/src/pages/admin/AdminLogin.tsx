import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Crown, Lock, Shield, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "../../stores/authStore";

const ADMIN_CREDS: Record<
  string,
  { name: string; role: "super_admin" | "manager" | "support" }
> = {
  "admin@zarin.pk": { name: "Zulfiqar Khan", role: "super_admin" },
  "manager@zarin.pk": { name: "Mehreen Baloch", role: "manager" },
  "support@zarin.pk": { name: "Saad Rind", role: "support" },
};

const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Admin",
  manager: "Manager",
  support: "Support Staff",
};

const ROLE_COLORS: Record<string, string> = {
  super_admin: "bg-primary/20 text-primary border-primary/30",
  manager: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  support: "bg-green-500/20 text-green-400 border-green-500/30",
};

export default function AdminLogin() {
  const { adminLogin } = useAuthStore();
  const [step, setStep] = useState<"creds" | "2fa">("creds");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code2fa, setCode2fa] = useState("");
  const [loading, setLoading] = useState(false);

  function handleCredSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = ADMIN_CREDS[email.toLowerCase()];
    if (!found || password.length < 4) {
      toast.error("Invalid credentials. Try admin@zarin.pk / zarin2024");
      return;
    }
    setStep("2fa");
    toast.info("Demo 2FA code: 123456");
  }

  function doLogin() {
    const cred = ADMIN_CREDS[email.toLowerCase()];
    if (!cred) return;
    setLoading(true);
    setTimeout(() => {
      adminLogin({
        id: `admin-${Date.now()}`,
        name: cred.name,
        email,
        role: cred.role,
      });
      toast.success(`Welcome back, ${cred.name}!`);
      setLoading(false);
      window.dispatchEvent(
        new CustomEvent("zarin-navigate", {
          detail: { app: "admin", page: "dashboard" },
        }),
      );
    }, 700);
  }

  function handle2faSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code2fa !== "123456") {
      toast.error("Invalid 2FA code. Use 123456 for demo");
      return;
    }
    doLogin();
  }

  const hoveredCred = ADMIN_CREDS[email.toLowerCase()] ?? null;

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center p-4"
      data-ocid="admin.login.page"
    >
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-card border border-primary/30 shadow-elevated mb-4 relative">
            <Crown className="w-9 h-9 text-primary" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <Shield className="w-3 h-3 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Zarin CEO
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Admin Control Panel · Gwadar Operations
          </p>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {Object.entries(ADMIN_CREDS).map(([mail, info]) => (
            <button
              key={mail}
              type="button"
              onClick={() => {
                setEmail(mail);
                setPassword("zarin2024");
              }}
              className={[
                "p-2 rounded-xl border text-xs text-center transition-smooth cursor-pointer",
                email.toLowerCase() === mail
                  ? "border-primary/50 bg-primary/10"
                  : "border-border bg-card hover:border-primary/30",
              ].join(" ")}
            >
              <div className="font-medium text-foreground text-xs">
                {info.name.split(" ")[0]}
              </div>
              <div
                className="text-muted-foreground mt-0.5"
                style={{ fontSize: "10px" }}
              >
                {ROLE_LABELS[info.role]}
              </div>
            </button>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-elevated">
          {step === "creds" ? (
            <form onSubmit={handleCredSubmit} className="space-y-5">
              <div className="flex items-center gap-2 mb-1">
                <User className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  Sign In
                </h2>
                {hoveredCred && (
                  <Badge
                    variant="outline"
                    className={[
                      "ml-auto text-xs",
                      ROLE_COLORS[hoveredCred.role],
                    ].join(" ")}
                  >
                    {ROLE_LABELS[hoveredCred.role]}
                  </Badge>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@zarin.pk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-ocid="admin.login.email_input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-ocid="admin.login.password_input"
                />
              </div>
              <Button
                type="submit"
                className="w-full gap-2"
                data-ocid="admin.login.submit_button"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Demo: admin@zarin.pk / zarin2024
              </p>
            </form>
          ) : (
            <form onSubmit={handle2faSubmit} className="space-y-5">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  Two-Factor Auth
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit code sent to your registered device.
              </p>
              <div className="space-y-2">
                <Label htmlFor="code2fa">2FA Code</Label>
                <Input
                  id="code2fa"
                  type="text"
                  placeholder="123456"
                  value={code2fa}
                  onChange={(e) => setCode2fa(e.target.value)}
                  maxLength={6}
                  required
                  data-ocid="admin.login.2fa_input"
                />
              </div>
              <div className="space-y-2">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                  data-ocid="admin.login.verify_button"
                >
                  {loading ? "Verifying..." : "Verify & Login"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={loading}
                  onClick={doLogin}
                  data-ocid="admin.login.skip_demo_button"
                >
                  Skip (Demo)
                </Button>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground"
                onClick={() => setStep("creds")}
              >
                ← Back
              </Button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          © {new Date().getFullYear()} Zarin Drive. Secure admin access.
        </p>
      </div>
    </div>
  );
}
