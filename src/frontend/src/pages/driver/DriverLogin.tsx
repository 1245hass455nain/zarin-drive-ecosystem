import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { navigate } from "../../App";
import { mockDrivers } from "../../data/mockDrivers";
import { useAuthStore } from "../../stores/authStore";

export default function DriverLogin() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const driverLogin = useAuthStore((s) => s.driverLogin);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim() || !code.trim()) {
      toast.error("Please enter both mobile number and activation code");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    // For demo: any matching driver phone works, or fallback to first driver
    const found =
      mockDrivers.find((d) => d.phone === phone.trim()) ?? mockDrivers[0];
    driverLogin(found);
    sessionStorage.setItem("zarin-driver-page", "home");
    navigate("driver", "home");
    toast.success(`Welcome back, ${found.name}!`);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center px-6">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("landing")}
        className="absolute top-6 left-6 text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-2 text-sm"
        data-ocid="driver_login.back_button"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10.78 3.22a.75.75 0 0 1 0 1.06L7.06 8l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0z" />
        </svg>
        Back
      </button>

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 mb-5">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              role="img"
              aria-label="Zarin Pro logo"
            >
              <title>Zarin Pro logo</title>
              <circle
                cx="20"
                cy="20"
                r="18"
                stroke="oklch(0.65 0.22 90)"
                strokeWidth="2"
              />
              <path
                d="M12 26 L20 10 L28 26"
                stroke="oklch(0.65 0.22 90)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.5 21h11"
                stroke="oklch(0.65 0.22 90)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-display font-bold text-primary tracking-tight">
            Zarin Pro
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Driver Partner Portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-elevated">
          <h2 className="text-lg font-display font-semibold text-foreground mb-1">
            Driver Login
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Enter your credentials to continue
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-foreground text-sm font-medium"
              >
                Mobile Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0300-1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-background border-input"
                data-ocid="driver_login.phone_input"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="code"
                className="text-foreground text-sm font-medium"
              >
                Secret Activation Code
              </Label>
              <Input
                id="code"
                type="password"
                placeholder="ZRN-2024-XXX"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="bg-background border-input"
                data-ocid="driver_login.code_input"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-semibold h-11 mt-2"
              data-ocid="driver_login.submit_button"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-5 leading-relaxed">
            Don't have a code?{" "}
            <span className="text-primary">Contact admin for activation</span>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          No self-registration. Drivers are added by Zarin administrators.
        </p>
      </div>
    </div>
  );
}
