import { r as reactExports, j as jsxRuntimeExports, B as Button, t as ue } from "./index-D2S5mC_U.js";
import { B as Badge } from "./badge-CtI4d2cg.js";
import { C as Card } from "./card-DEOosrQ5.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-z0beCMMA.js";
import { I as Input } from "./input-BTHBc13a.js";
import { L as Label } from "./label-C9UBYSRz.js";
import { m as mockDrivers } from "./mockDrivers-BlyLXLsg.js";
import { C as CircleCheckBig } from "./circle-check-big-bhwtxREB.js";
import { R as RefreshCw } from "./refresh-cw-Ca-W0xtV.js";
import "./index-BHXDJJ9c.js";
import "./index-DisWonvz.js";
import "./index-BBKAJGCp.js";
const COMMISSION_RATES = {
  bike: 20,
  rickshaw: 20,
  car: 20,
  premium: 20
};
const initialWallets = mockDrivers.map((d) => ({
  driverId: d.id,
  name: d.name,
  vehicleType: d.vehicleType,
  balance: d.walletBalance,
  pendingDues: Math.round(d.walletBalance * 0.2),
  lastPayment: "2024-05-01",
  status: d.walletBalance > 3e3 ? "overdue" : d.walletBalance > 1e3 ? "pending" : "clear"
}));
function WalletPayments() {
  const [wallets, setWallets] = reactExports.useState(initialWallets);
  const [selectedEntry, setSelectedEntry] = reactExports.useState(null);
  const [paymentOpen, setPaymentOpen] = reactExports.useState(false);
  const [commissionRates, setCommissionRates] = reactExports.useState(COMMISSION_RATES);
  const [amount, setAmount] = reactExports.useState("");
  function markPaymentReceived(e) {
    e.preventDefault();
    if (!selectedEntry) return;
    const paid = Number(amount);
    setWallets(
      (prev) => prev.map(
        (w) => w.driverId === selectedEntry.driverId ? {
          ...w,
          pendingDues: Math.max(0, w.pendingDues - paid),
          status: "clear",
          lastPayment: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
        } : w
      )
    );
    ue.success(
      `Payment of Rs. ${paid.toLocaleString()} recorded for ${selectedEntry.name}`
    );
    setPaymentOpen(false);
    setAmount("");
    setSelectedEntry(null);
  }
  function resetDues(driverId) {
    setWallets(
      (prev) => prev.map(
        (w) => w.driverId === driverId ? { ...w, pendingDues: 0, status: "clear" } : w
      )
    );
    ue.success("Dues reset to zero");
  }
  const STATUS_COLORS = {
    clear: "text-green-500 border-green-500/30",
    pending: "text-orange-500 border-orange-500/30",
    overdue: "text-destructive border-destructive/30"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", "data-ocid": "admin.wallet.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Total Driver Balances" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-bold text-primary mt-1", children: [
          "Rs. ",
          wallets.reduce((s, w) => s + w.balance, 0).toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Total Pending Dues" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-bold text-orange-500 mt-1", children: [
          "Rs.",
          " ",
          wallets.reduce((s, w) => s + w.pendingDues, 0).toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Overdue Accounts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-destructive mt-1", children: wallets.filter((w) => w.status === "overdue").length })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-4", children: "Commission Rate Settings (%)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: Object.entries(commissionRates).map(([type, rate]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "capitalize", children: type }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 0,
              max: 50,
              value: rate,
              onChange: (e) => setCommissionRates((prev) => ({
                ...prev,
                [type]: Number(e.target.value)
              })),
              className: "w-full",
              "data-ocid": `admin.wallet.commission_${type}_input`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "%" })
        ] })
      ] }, type)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          className: "mt-4",
          size: "sm",
          onClick: () => ue.success("Commission rates saved"),
          "data-ocid": "admin.wallet.save_commission_button",
          children: "Save Rates"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Driver" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Balance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Pending Dues" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Last Payment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-medium text-muted-foreground", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: wallets.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/50 hover:bg-muted/20 transition-smooth",
          "data-ocid": `admin.wallet.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: w.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 capitalize text-muted-foreground", children: w.vehicleType }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono text-primary", children: [
              "Rs. ",
              w.balance.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono text-orange-500", children: [
              "Rs. ",
              w.pendingDues.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: w.lastPayment }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: [
                  "capitalize",
                  STATUS_COLORS[w.status] ?? ""
                ].join(" "),
                children: w.status
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => {
                    setSelectedEntry(w);
                    setAmount(String(w.pendingDues));
                    setPaymentOpen(true);
                  },
                  "data-ocid": `admin.wallet.pay_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
                    " Pay"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  onClick: () => resetDues(w.driverId),
                  "data-ocid": `admin.wallet.reset_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" })
                }
              )
            ] }) })
          ]
        },
        w.driverId
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: paymentOpen, onOpenChange: setPaymentOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "admin.wallet.payment_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Mark Payment Received" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: markPaymentReceived, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Recording payment for ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: selectedEntry == null ? void 0 : selectedEntry.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amount (Rs.)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              value: amount,
              onChange: (e) => setAmount(e.target.value),
              required: true,
              "data-ocid": "admin.wallet.payment_amount_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setPaymentOpen(false),
              "data-ocid": "admin.wallet.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", "data-ocid": "admin.wallet.confirm_button", children: "Confirm Payment" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  WalletPayments as default
};
