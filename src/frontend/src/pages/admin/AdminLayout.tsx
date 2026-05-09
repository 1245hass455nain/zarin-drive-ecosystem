import { Button } from "@/components/ui/button";
import {
  BarChart2,
  Bell,
  Car,
  Key,
  LayoutDashboard,
  LogOut,
  Map as LucideMap,
  Menu,
  Navigation,
  ScrollText,
  Shield,
  Tag,
  UserCheck,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LanguageToggle } from "../../components/LanguageToggle";
import { ThemeToggle } from "../../components/ThemeToggle";
import { useAuthStore } from "../../stores/authStore";

export type AdminPage =
  | "dashboard"
  | "map"
  | "drivers"
  | "wallet"
  | "rides"
  | "customers"
  | "notifications"
  | "reports"
  | "codes"
  | "logs"
  | "promos";

const NAV_ITEMS: {
  id: AdminPage;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "map", label: "Live Map", icon: LucideMap },
  { id: "drivers", label: "Drivers", icon: Car },
  { id: "customers", label: "Customers", icon: UserCheck },
  { id: "rides", label: "Rides", icon: Navigation },
  { id: "wallet", label: "Wallet & Payments", icon: Wallet },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "reports", label: "Reports", icon: BarChart2 },
  { id: "codes", label: "Secret Codes", icon: Key },
  { id: "promos", label: "Promo Codes", icon: Tag },
  { id: "logs", label: "Admin Logs", icon: ScrollText },
];

interface AdminLayoutProps {
  currentPage: AdminPage;
  onNavigate: (page: AdminPage) => void;
  children: React.ReactNode;
}

export function AdminLayout({
  currentPage,
  onNavigate,
  children,
}: AdminLayoutProps) {
  const { adminUser, adminLogout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    adminLogout();
    toast.success("Logged out successfully");
    window.dispatchEvent(
      new CustomEvent("zarin-navigate", {
        detail: { app: "admin", page: "login" },
      }),
    );
  }

  const roleLabel =
    adminUser?.role === "super_admin"
      ? "Super Admin"
      : adminUser?.role === "manager"
        ? "Manager"
        : "Support Staff";

  const pageTitle =
    NAV_ITEMS.find((n) => n.id === currentPage)?.label ?? "Dashboard";

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
          role="button"
          tabIndex={-1}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed lg:static inset-y-0 left-0 z-30 w-64 bg-card border-r border-border",
          "flex flex-col transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-5 border-b border-border">
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="font-display font-bold text-foreground">
              Zarin CEO
            </div>
            <div className="text-xs text-muted-foreground">Admin Panel</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  setSidebarOpen(false);
                }}
                className={[
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                ].join(" ")}
                data-ocid={`admin.nav.${item.id}`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-primary">
                {adminUser?.name?.[0] ?? "A"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">
                {adminUser?.name ?? "Admin"}
              </div>
              <div className="text-xs text-muted-foreground">{roleLabel}</div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleLogout}
            data-ocid="admin.logout_button"
          >
            <LogOut className="w-3.5 h-3.5 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            data-ocid="admin.menu_toggle"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">{pageTitle}</h2>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
