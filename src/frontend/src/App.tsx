import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { Toaster } from "sonner";
import type { GwadarLocation } from "./data/mockLocations";
import LandingPage from "./pages/LandingPage";
import { AdminLayout } from "./pages/admin/AdminLayout";
import type { AdminPage as AdminLayoutPage } from "./pages/admin/AdminLayout";
import { useAppStore } from "./stores/appStore";
import type { VehicleType } from "./stores/rideStore";

// Customer pages
const CustomerSplash = lazy(() => import("./pages/customer/SplashScreen"));
const CustomerLogin = lazy(() => import("./pages/customer/LoginPage"));
const CustomerHome = lazy(() => import("./pages/customer/HomePage"));
const VehicleSelect = lazy(() => import("./pages/customer/VehicleSelection"));
const BookingFlow = lazy(() => import("./pages/customer/RideBooking"));
const CustomerProfilePage = lazy(
  () => import("./pages/customer/CustomerProfile"),
);

// Driver pages
const DriverLogin = lazy(() => import("./pages/driver/DriverLogin"));
const DriverHome = lazy(() => import("./pages/driver/DriverHome"));
const RideExecution = lazy(() => import("./pages/driver/RideExecution"));
const DriverEarnings = lazy(() => import("./pages/driver/DriverEarnings"));
const DriverProfile = lazy(() => import("./pages/driver/DriverProfile"));
const RankSystem = lazy(() => import("./pages/driver/RankSystem"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminDrivers = lazy(() => import("./pages/admin/DriverManagement"));
const AdminCustomers = lazy(() => import("./pages/admin/CustomerManagement"));
const AdminRides = lazy(() => import("./pages/admin/RideManagement"));
const AdminWallet = lazy(() => import("./pages/admin/WalletPayments"));
const AdminMap = lazy(() => import("./pages/admin/LiveMap"));
const AdminNotifications = lazy(
  () => import("./pages/admin/NotificationSystem"),
);
const AdminReports = lazy(() => import("./pages/admin/Reports"));
const AdminCodes = lazy(() => import("./pages/admin/AdminCodes"));
const AdminPromos = lazy(() => import("./pages/admin/AdminPromos"));
const AdminLogs = lazy(() => import("./pages/admin/AdminLogs"));

type AppSection = "landing" | "customer" | "driver" | "admin";
type CustomerPage =
  | "splash"
  | "login"
  | "home"
  | "vehicle"
  | "booking"
  | "profile";
type DriverPage = "login" | "home" | "ride" | "earnings" | "profile" | "rank";
type AdminPage =
  | "login"
  | "dashboard"
  | "drivers"
  | "customers"
  | "rides"
  | "wallet"
  | "map"
  | "notifications"
  | "reports"
  | "codes"
  | "promos"
  | "logs";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

function PageSpinner() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

function CustomerSection() {
  const [page, setPage] = useState<CustomerPage>(() => {
    const stored = sessionStorage.getItem("zarin-customer-page");
    return (stored as CustomerPage) ?? "splash";
  });
  const [selectedDestination, setSelectedDestination] =
    useState<GwadarLocation | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>("car");
  const [selectedFare, setSelectedFare] = useState(0);

  const goTo = useCallback((p: CustomerPage) => {
    setPage(p);
    sessionStorage.setItem("zarin-customer-page", p);
  }, []);

  useEffect(() => {
    function handleNav(e: Event) {
      const detail = (e as CustomEvent<{ app: string; page?: string }>).detail;
      if (detail.app === "customer" && detail.page) {
        goTo(detail.page as CustomerPage);
      }
    }
    window.addEventListener("zarin-navigate", handleNav);
    return () => window.removeEventListener("zarin-navigate", handleNav);
  }, [goTo]);

  return (
    <Suspense fallback={<PageSpinner />}>
      {page === "splash" && <CustomerSplash onFinish={() => goTo("login")} />}
      {page === "login" && <CustomerLogin onLogin={() => goTo("home")} />}
      {page === "home" && (
        <CustomerHome
          onSelectDestination={(dest) => {
            setSelectedDestination(dest);
            goTo("vehicle");
          }}
          onOpenProfile={() => goTo("profile")}
        />
      )}
      {page === "vehicle" && (
        <VehicleSelect
          destination={selectedDestination}
          onBack={() => goTo("home")}
          onConfirm={(vType, fare) => {
            setSelectedVehicle(vType);
            setSelectedFare(fare);
            goTo("booking");
          }}
        />
      )}
      {page === "booking" && (
        <BookingFlow
          vehicleType={selectedVehicle}
          fare={selectedFare}
          destination={selectedDestination}
          onBack={() => goTo("vehicle")}
          onComplete={() => goTo("home")}
        />
      )}
      {page === "profile" && (
        <CustomerProfilePage
          onBack={() => goTo("home")}
          onLogout={() => navigate("landing")}
        />
      )}
    </Suspense>
  );
}

function DriverSection() {
  const [page, setPage] = useState<DriverPage>(() => {
    const stored = sessionStorage.getItem("zarin-driver-page");
    return (stored as DriverPage) ?? "login";
  });

  useEffect(() => {
    function handleNav(e: Event) {
      const detail = (e as CustomEvent<{ app: string; page?: string }>).detail;
      if (detail.app === "driver" && detail.page) {
        const p = detail.page as DriverPage;
        setPage(p);
        sessionStorage.setItem("zarin-driver-page", p);
      }
    }
    window.addEventListener("zarin-navigate", handleNav);
    return () => window.removeEventListener("zarin-navigate", handleNav);
  }, []);

  return (
    <Suspense fallback={<PageSpinner />}>
      {page === "login" && <DriverLogin />}
      {page === "home" && <DriverHome />}
      {page === "ride" && <RideExecution />}
      {page === "earnings" && <DriverEarnings />}
      {page === "profile" && <DriverProfile />}
      {page === "rank" && <RankSystem />}
    </Suspense>
  );
}

function AdminSection() {
  const [page, setPage] = useState<AdminPage>(() => {
    const stored = sessionStorage.getItem("zarin-admin-page");
    return (stored as AdminPage) ?? "login";
  });

  const goTo = useCallback((p: AdminPage) => {
    setPage(p);
    sessionStorage.setItem("zarin-admin-page", p);
  }, []);

  useEffect(() => {
    function handleNav(e: Event) {
      const detail = (e as CustomEvent<{ app: string; page?: string }>).detail;
      if (detail.app === "admin" && detail.page) {
        goTo(detail.page as AdminPage);
      }
    }
    window.addEventListener("zarin-navigate", handleNav);
    return () => window.removeEventListener("zarin-navigate", handleNav);
  }, [goTo]);

  if (page === "login") {
    return (
      <Suspense fallback={<PageSpinner />}>
        <AdminLogin />
      </Suspense>
    );
  }

  return (
    <AdminLayout
      currentPage={page as AdminLayoutPage}
      onNavigate={(p) => goTo(p as AdminPage)}
    >
      <Suspense fallback={<PageSpinner />}>
        {page === "dashboard" && <AdminDashboard />}
        {page === "drivers" && <AdminDrivers />}
        {page === "customers" && <AdminCustomers />}
        {page === "rides" && <AdminRides />}
        {page === "wallet" && <AdminWallet />}
        {page === "map" && <AdminMap />}
        {page === "notifications" && <AdminNotifications />}
        {page === "reports" && <AdminReports />}
        {page === "codes" && <AdminCodes />}
        {page === "promos" && <AdminPromos />}
        {page === "logs" && <AdminLogs />}
      </Suspense>
    </AdminLayout>
  );
}

function RootComponent() {
  const theme = useAppStore((s) => s.theme);
  const [activeApp, setActiveApp] = useState<AppSection>(() => {
    const stored = sessionStorage.getItem("zarin-active-app");
    return (stored as AppSection) ?? "landing";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    function handleNav(e: Event) {
      const detail = (e as CustomEvent<{ app: string }>).detail;
      const app = detail.app as AppSection;
      if (
        app === "landing" ||
        app === "customer" ||
        app === "driver" ||
        app === "admin"
      ) {
        setActiveApp(app);
        sessionStorage.setItem("zarin-active-app", app);
      }
    }
    window.addEventListener("zarin-navigate", handleNav);
    return () => window.removeEventListener("zarin-navigate", handleNav);
  }, []);

  function renderSection() {
    switch (activeApp) {
      case "customer":
        return <CustomerSection />;
      case "driver":
        return <DriverSection />;
      case "admin":
        return <AdminSection />;
      default:
        return <Outlet />;
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {renderSection()}
      <Toaster
        position="top-right"
        theme={theme === "dark" ? "dark" : "light"}
        richColors
      />
    </div>
  );
}

const rootRoute = createRootRoute({ component: RootComponent });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const routeTree = rootRoute.addChildren([indexRoute]);

const memoryHistory = createMemoryHistory({ initialEntries: ["/"] });
const router = createRouter({ routeTree, history: memoryHistory });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export function navigate(app: AppSection, page?: string) {
  window.dispatchEvent(
    new CustomEvent("zarin-navigate", { detail: { app, page } }),
  );
}
