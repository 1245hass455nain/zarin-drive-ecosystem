import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Bell,
  Briefcase,
  CheckCircle2,
  Clock,
  Heart,
  Home,
  LogOut,
  MapPin,
  Moon,
  PenLine,
  Phone,
  Plus,
  Star,
  Sun,
  Wallet,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { mockRides } from "../../data/mockRides";
import { useTranslation } from "../../i18n/useTranslation";
import { useAppStore } from "../../stores/appStore";
import { useAuthStore } from "../../stores/authStore";
import { useCustomerStore } from "../../stores/customerStore";
import { useNotificationStore } from "../../stores/notificationStore";
import { useRideStore } from "../../stores/rideStore";

const DEFAULT_SAVED_PLACES = [
  {
    id: "sp-home",
    label: "Home",
    address: "House 12, Block C, Model Town, Gwadar",
    icon: "home" as const,
    lat: 25.13,
    lng: 62.32,
  },
  {
    id: "sp-work",
    label: "Work",
    address: "Gwadar Development Authority Office",
    icon: "work" as const,
    lat: 25.12,
    lng: 62.33,
  },
];

const TRANSACTION_HISTORY = [
  {
    id: "tx-1",
    label: "Ride to Gwadar Port",
    amount: -278,
    date: "May 7",
    type: "debit",
  },
  {
    id: "tx-2",
    label: "Wallet Top-up",
    amount: +500,
    date: "May 6",
    type: "credit",
  },
  {
    id: "tx-3",
    label: "Ride to Serena Hotel",
    amount: -320,
    date: "May 5",
    type: "debit",
  },
  {
    id: "tx-4",
    label: "Promo Cashback",
    amount: +100,
    date: "May 4",
    type: "credit",
  },
  {
    id: "tx-5",
    label: "Ride to University",
    amount: -210,
    date: "May 2",
    type: "debit",
  },
];

interface CustomerProfileProps {
  onBack: () => void;
  onLogout: () => void;
}

export default function CustomerProfile({
  onBack,
  onLogout,
}: CustomerProfileProps) {
  const { t } = useTranslation();
  const customerUser = useAuthStore((s) => s.customerUser);
  const customerLogout = useAuthStore((s) => s.customerLogout);
  const { theme, setTheme, language, setLanguage } = useAppStore();
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore();
  const { savedPlaces, addSavedPlace, removeSavedPlace } = useCustomerStore();
  const { rides } = useRideStore();

  const [showAddMoney, setShowAddMoney] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [addMoneySuccess, setAddMoneySuccess] = useState(false);
  const [showAddPlace, setShowAddPlace] = useState(false);
  const [newPlaceLabel, setNewPlaceLabel] = useState("");
  const [newPlaceAddress, setNewPlaceAddress] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [editName, setEditName] = useState(customerUser?.name ?? "");

  // firstName available for display usage if needed
  const initials = customerUser?.name
    ? customerUser.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "G";

  const customerNotifs = notifications.filter((n) => n.target === "customer");
  const unreadCount = customerNotifs.filter((n) => !n.isRead).length;
  const allSavedPlaces = [...DEFAULT_SAVED_PLACES, ...savedPlaces];

  // Ride history: prefer real rides for this customer, else show mock
  const myRides = rides.filter((r) => r.customerId === customerUser?.id);
  const displayRides =
    myRides.length > 0
      ? myRides
      : mockRides.filter((r) => r.status === "completed").slice(0, 6);

  function handleLogout() {
    customerLogout();
    onLogout();
  }

  function handleAddMoney() {
    const amt = Number.parseInt(addAmount, 10);
    if (!amt || amt < 100) return;
    // Simulate wallet top-up
    setAddMoneySuccess(true);
    setTimeout(() => {
      setAddMoneySuccess(false);
      setShowAddMoney(false);
      setAddAmount("");
    }, 2000);
  }

  function handleAddPlace() {
    if (!newPlaceLabel || !newPlaceAddress) return;
    addSavedPlace({
      id: `sp-${Date.now()}`,
      label: newPlaceLabel,
      address: newPlaceAddress,
      icon: "other",
      lat: 25.13,
      lng: 62.32,
    });
    setNewPlaceLabel("");
    setNewPlaceAddress("");
    setShowAddPlace(false);
  }

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-ocid="customer_profile.page"
    >
      {/* Header */}
      <header className="bg-card border-b border-border px-4 h-14 flex items-center gap-3 shadow-card">
        <button
          type="button"
          data-ocid="customer_profile.back_button"
          onClick={onBack}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted/50 transition-smooth"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-base font-display font-bold text-foreground flex-1">
          My Profile
        </h1>
        <button
          type="button"
          data-ocid="customer_profile.edit_button"
          onClick={() => setEditingName(!editingName)}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted/50 transition-smooth"
          aria-label="Edit profile"
        >
          <PenLine className="w-4 h-4 text-muted-foreground" />
        </button>
      </header>

      {/* Profile card */}
      <div className="bg-gradient-to-b from-primary/10 via-card to-card px-4 pt-5 pb-4 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-xl font-display font-black text-primary shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            {editingName ? (
              <div className="flex items-center gap-2 mb-1">
                <Input
                  data-ocid="customer_profile.name_input"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="h-8 text-sm"
                  autoFocus
                />
                <button
                  type="button"
                  data-ocid="customer_profile.save_name_button"
                  onClick={() => setEditingName(false)}
                  className="shrink-0"
                  aria-label="Save name"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </button>
              </div>
            ) : (
              <h2 className="text-lg font-display font-bold text-foreground truncate">
                {customerUser?.name ?? "Guest"}
              </h2>
            )}
            <div className="flex items-center gap-1.5 mt-0.5">
              <Phone className="w-3 h-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                {customerUser?.phone ?? ""}
              </p>
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {customerUser?.email ?? ""}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-muted-foreground">Wallet</p>
            <p className="text-xl font-display font-black text-primary">
              PKR {(customerUser?.walletBalance ?? 0).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">
              {customerUser?.totalRides ?? 0} rides
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="history" className="flex-1">
        <TabsList className="w-full rounded-none border-b border-border bg-card grid grid-cols-4 h-11">
          <TabsTrigger
            value="history"
            data-ocid="profile.history_tab"
            className="text-xs rounded-none gap-1"
          >
            <Clock className="w-3.5 h-3.5" /> Rides
          </TabsTrigger>
          <TabsTrigger
            value="wallet"
            data-ocid="profile.wallet_tab"
            className="text-xs rounded-none gap-1"
          >
            <Wallet className="w-3.5 h-3.5" /> Wallet
          </TabsTrigger>
          <TabsTrigger
            value="places"
            data-ocid="profile.places_tab"
            className="text-xs rounded-none gap-1"
          >
            <MapPin className="w-3.5 h-3.5" /> Places
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            data-ocid="profile.settings_tab"
            className="text-xs rounded-none gap-1"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        {/* RIDE HISTORY */}
        <TabsContent
          value="history"
          className="p-4 space-y-3"
          data-ocid="profile.history_panel"
        >
          {displayRides.length === 0 ? (
            <div
              className="text-center py-12"
              data-ocid="profile.rides_empty_state"
            >
              <Clock className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No rides yet.</p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Your ride history will appear here.
              </p>
            </div>
          ) : (
            displayRides.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                data-ocid={`profile.ride.item.${i + 1}`}
                className="bg-card border border-border rounded-xl p-3.5 shadow-card"
              >
                <div className="flex items-start justify-between mb-1.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {r.pickupAddress} → {r.dropAddress}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {r.startTime?.slice(0, 10)} • {r.driverName}
                    </p>
                  </div>
                  <span className="text-primary font-bold text-sm shrink-0 ml-3">
                    PKR {r.totalFare}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-full font-semibold",
                        r.status === "completed"
                          ? "bg-primary/15 text-primary"
                          : r.status === "cancelled"
                            ? "bg-destructive/15 text-destructive"
                            : "bg-muted text-muted-foreground",
                      )}
                    >
                      {r.status}
                    </span>
                    <span className="text-[10px] text-muted-foreground capitalize">
                      {r.vehicleType}
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={cn(
                          "w-3 h-3",
                          s <= (r.rating ?? 0)
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted-foreground/30",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </TabsContent>

        {/* WALLET */}
        <TabsContent
          value="wallet"
          className="p-4 space-y-4"
          data-ocid="profile.wallet_panel"
        >
          {/* Balance card */}
          <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-card border border-primary/20 rounded-2xl p-5 shadow-elevated">
            <p className="text-xs text-muted-foreground mb-1">
              Available Balance
            </p>
            <p className="text-4xl font-display font-black text-primary">
              PKR {(customerUser?.walletBalance ?? 0).toLocaleString()}
            </p>
            <Button
              type="button"
              data-ocid="profile.add_money_button"
              size="sm"
              className="mt-3 bg-primary text-primary-foreground"
              onClick={() => setShowAddMoney(true)}
            >
              <Plus className="w-4 h-4 mr-1.5" /> Add Money
            </Button>
          </div>

          {/* Transaction history */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
              Recent Transactions
            </p>
            <div className="space-y-2">
              {TRANSACTION_HISTORY.map((tx, i) => (
                <div
                  key={tx.id}
                  data-ocid={`profile.transaction.item.${i + 1}`}
                  className="bg-card border border-border rounded-xl px-4 py-3 flex items-center justify-between shadow-card"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {tx.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                  <span
                    className={cn(
                      "font-bold text-sm",
                      tx.type === "credit"
                        ? "text-primary"
                        : "text-destructive",
                    )}
                  >
                    {tx.type === "credit" ? "+" : ""}
                    {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* SAVED PLACES */}
        <TabsContent
          value="places"
          className="p-4 space-y-3"
          data-ocid="profile.places_panel"
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Saved Places
            </p>
            <button
              type="button"
              data-ocid="profile.add_place_button"
              onClick={() => setShowAddPlace(true)}
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          {allSavedPlaces.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              data-ocid={`profile.saved_place.item.${i + 1}`}
              className="bg-card border border-border rounded-xl p-3 flex items-center gap-3 shadow-card"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                {p.icon === "home" ? (
                  <Home className="w-4 h-4 text-primary" />
                ) : p.icon === "work" ? (
                  <Briefcase className="w-4 h-4 text-primary" />
                ) : (
                  <Heart className="w-4 h-4 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {p.label}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {p.address}
                </p>
              </div>
              {p.id.startsWith("sp-1") ||
              p.id.startsWith("sp-h") ||
              p.id.startsWith("sp-w") ? null : (
                <button
                  type="button"
                  data-ocid={`profile.remove_place.${i + 1}`}
                  onClick={() => removeSavedPlace(p.id)}
                  className="text-muted-foreground/50 hover:text-destructive transition-smooth"
                  aria-label="Remove place"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          ))}

          {allSavedPlaces.length === 0 && (
            <div
              className="text-center py-8"
              data-ocid="profile.places_empty_state"
            >
              <MapPin className="w-10 h-10 text-muted-foreground/20 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No saved places yet.
              </p>
            </div>
          )}
        </TabsContent>

        {/* SETTINGS */}
        <TabsContent
          value="settings"
          className="p-4 space-y-4"
          data-ocid="profile.settings_panel"
        >
          {/* Display settings */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                {theme === "dark" ? (
                  <Moon className="w-4 h-4 text-primary" />
                ) : (
                  <Sun className="w-4 h-4 text-primary" />
                )}
                <Label
                  htmlFor="theme-toggle"
                  className="text-sm text-foreground cursor-pointer"
                >
                  {theme === "dark"
                    ? t("common.darkMode")
                    : t("common.lightMode")}
                </Label>
              </div>
              <Switch
                id="theme-toggle"
                data-ocid="settings.theme_toggle"
                checked={theme === "dark"}
                onCheckedChange={(v) => {
                  const next = v ? "dark" : "light";
                  setTheme(next);
                  document.documentElement.classList.toggle(
                    "dark",
                    next === "dark",
                  );
                }}
              />
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <Label
                htmlFor="lang-toggle"
                className="text-sm text-foreground cursor-pointer"
              >
                {language === "en" ? "English / اردو" : "اردو / English"}
              </Label>
              <Switch
                id="lang-toggle"
                data-ocid="settings.language_toggle"
                checked={language === "ur"}
                onCheckedChange={(v) => setLanguage(v ? "ur" : "en")}
              />
            </div>
          </div>

          {/* Notifications section */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Notifications</span>
              </div>
              {unreadCount > 0 && (
                <button
                  type="button"
                  data-ocid="profile.mark_all_read_button"
                  onClick={() => markAllAsRead("customer")}
                  className="text-xs text-primary hover:underline"
                >
                  Mark all read ({unreadCount})
                </button>
              )}
            </div>
            {customerNotifs.slice(0, 3).length === 0 ? (
              <p className="px-4 py-3 text-xs text-muted-foreground">
                No notifications yet.
              </p>
            ) : (
              customerNotifs.slice(0, 3).map((n, i) => (
                <button
                  key={n.id}
                  type="button"
                  data-ocid={`profile.notification.item.${i + 1}`}
                  onClick={() => markAsRead(n.id)}
                  className={cn(
                    "w-full px-4 py-2.5 text-left border-b border-border/60 last:border-0 transition-smooth hover:bg-muted/20",
                    !n.isRead ? "opacity-100" : "opacity-50",
                  )}
                >
                  <p className="text-xs font-semibold text-foreground">
                    {n.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {n.message}
                  </p>
                </button>
              ))
            )}
          </div>

          {/* Support links */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {[
              { label: "Help & Support", ocid: "settings.help_button" },
              { label: "Privacy Policy", ocid: "settings.privacy_button" },
              { label: "Terms & Conditions", ocid: "settings.terms_button" },
            ].map((item, i, arr) => (
              <button
                key={item.label}
                type="button"
                data-ocid={item.ocid}
                className={cn(
                  "w-full px-4 py-3 text-left text-sm text-muted-foreground hover:bg-muted/30 transition-smooth",
                  i < arr.length - 1 ? "border-b border-border" : "",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <Button
            type="button"
            data-ocid="settings.logout_button"
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {t("common.logout")}
          </Button>
        </TabsContent>
      </Tabs>

      {/* Add Money Modal */}
      <AnimatePresence>
        {showAddMoney && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            data-ocid="add_money.dialog"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-elevated"
            >
              {addMoneySuccess ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-3" />
                  <h3 className="text-xl font-display font-bold text-foreground">
                    Money Added!
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    PKR {addAmount} added to your wallet.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-display font-bold text-foreground">
                      Add Money
                    </h3>
                    <button
                      type="button"
                      data-ocid="add_money.close_button"
                      onClick={() => setShowAddMoney(false)}
                      className="w-7 h-7 rounded-full bg-muted/40 flex items-center justify-center"
                      aria-label="Close"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select or enter an amount to top up your wallet.
                  </p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[200, 500, 1000, 2000, 5000, 10000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setAddAmount(String(amt))}
                        className={cn(
                          "rounded-xl border py-2 text-sm font-medium transition-smooth",
                          addAmount === String(amt)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-muted/20 text-muted-foreground hover:border-primary/30",
                        )}
                      >
                        {amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <Input
                    data-ocid="add_money.amount_input"
                    type="number"
                    placeholder="Or enter custom amount"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    className="mb-4"
                  />
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      data-ocid="add_money.cancel_button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowAddMoney(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      data-ocid="add_money.confirm_button"
                      className="flex-1 bg-primary text-primary-foreground"
                      onClick={handleAddMoney}
                    >
                      Add PKR {addAmount || "0"}
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Place Modal */}
      <AnimatePresence>
        {showAddPlace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            data-ocid="add_place.dialog"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-elevated"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-display font-bold text-foreground">
                  Add New Place
                </h3>
                <button
                  type="button"
                  data-ocid="add_place.close_button"
                  onClick={() => setShowAddPlace(false)}
                  className="w-7 h-7 rounded-full bg-muted/40 flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-3 mb-4">
                <div>
                  <Label htmlFor="place-label">Label</Label>
                  <Input
                    id="place-label"
                    data-ocid="add_place.label_input"
                    placeholder="e.g. Gym, Parent's House"
                    value={newPlaceLabel}
                    onChange={(e) => setNewPlaceLabel(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="place-address">Address</Label>
                  <Input
                    id="place-address"
                    data-ocid="add_place.address_input"
                    placeholder="Full address in Gwadar"
                    value={newPlaceAddress}
                    onChange={(e) => setNewPlaceAddress(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  data-ocid="add_place.cancel_button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddPlace(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  data-ocid="add_place.confirm_button"
                  className="flex-1 bg-primary text-primary-foreground"
                  onClick={handleAddPlace}
                >
                  Save Place
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
