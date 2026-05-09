import { r as reactExports, j as jsxRuntimeExports, B as Button, t as ue } from "./index-D2S5mC_U.js";
import { B as Badge } from "./badge-CtI4d2cg.js";
import { C as Card } from "./card-DEOosrQ5.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-z0beCMMA.js";
import { I as Input } from "./input-BTHBc13a.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-CdYqkgKA.js";
import { S as Search } from "./search-CJjdnnTu.js";
import { E as Eye } from "./eye-CK-5nior.js";
import { P as Pause, B as Ban } from "./pause-D_ImUBtz.js";
import "./index-BHXDJJ9c.js";
import "./index-DisWonvz.js";
import "./index-BBKAJGCp.js";
import "./index-BstO6tBW.js";
const mockCustomers = [
  {
    id: "cust-1",
    name: "Aisha Baloch",
    phone: "0300-9871234",
    email: "aisha.baloch@gmail.com",
    walletBalance: 2500,
    totalRides: 34,
    status: "active",
    joinDate: "2024-01-15",
    profilePhoto: ""
  },
  {
    id: "cust-2",
    name: "Tariq Mengal",
    phone: "0311-5556789",
    email: "tariq.mengal@gmail.com",
    walletBalance: 800,
    totalRides: 12,
    status: "active",
    joinDate: "2024-02-20",
    profilePhoto: ""
  },
  {
    id: "cust-3",
    name: "Sana Zehri",
    phone: "0333-2223456",
    email: "sana.zehri@gmail.com",
    walletBalance: 4200,
    totalRides: 67,
    status: "active",
    joinDate: "2023-11-01",
    profilePhoto: ""
  },
  {
    id: "cust-4",
    name: "Imran Rind",
    phone: "0345-8889012",
    email: "imran.rind@gmail.com",
    walletBalance: 150,
    totalRides: 5,
    status: "active",
    joinDate: "2024-04-10",
    profilePhoto: ""
  },
  {
    id: "cust-5",
    name: "Fatima Kalmati",
    phone: "0302-1112345",
    email: "fatima.k@gmail.com",
    walletBalance: 3100,
    totalRides: 45,
    status: "active",
    joinDate: "2023-12-05",
    profilePhoto: ""
  },
  {
    id: "cust-6",
    name: "Hassan Marri",
    phone: "0321-4445678",
    email: "hassan.marri@gmail.com",
    walletBalance: 0,
    totalRides: 8,
    status: "suspended",
    joinDate: "2024-03-14",
    profilePhoto: ""
  },
  {
    id: "cust-7",
    name: "Rukhsar Ahmed",
    phone: "0331-7778901",
    email: "rukhsar.ahmed@gmail.com",
    walletBalance: 1800,
    totalRides: 23,
    status: "active",
    joinDate: "2024-01-28",
    profilePhoto: ""
  },
  {
    id: "cust-8",
    name: "Sajid Buledi",
    phone: "0312-0001234",
    email: "sajid.buledi@gmail.com",
    walletBalance: 600,
    totalRides: 9,
    status: "active",
    joinDate: "2024-05-01",
    profilePhoto: ""
  },
  {
    id: "cust-9",
    name: "Nadia Gichki",
    phone: "0307-3334567",
    email: "nadia.gichki@gmail.com",
    walletBalance: 5500,
    totalRides: 89,
    status: "active",
    joinDate: "2023-09-15",
    profilePhoto: ""
  },
  {
    id: "cust-10",
    name: "Waseem Pirkani",
    phone: "0344-6667890",
    email: "waseem.pirkani@gmail.com",
    walletBalance: 0,
    totalRides: 2,
    status: "banned",
    joinDate: "2024-05-20",
    profilePhoto: ""
  }
];
const STATUS_COLORS = {
  active: "text-green-500 border-green-500/30",
  suspended: "text-orange-500 border-orange-500/30",
  banned: "text-destructive border-destructive/30"
};
function CustomerManagement() {
  const [customers, setCustomers] = reactExports.useState(mockCustomers);
  const [search, setSearch] = reactExports.useState("");
  const [selected, setSelected] = reactExports.useState(null);
  const [detailOpen, setDetailOpen] = reactExports.useState(false);
  const active = customers.filter((c) => c.status === "active");
  const suspended = customers.filter((c) => c.status === "suspended");
  const blacklist = customers.filter((c) => c.status === "banned");
  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search) || c.email.toLowerCase().includes(search.toLowerCase())
  );
  function updateStatus(id, status) {
    setCustomers(
      (prev) => prev.map((c) => c.id === id ? { ...c, status } : c)
    );
    ue.success(`Customer ${status}`);
  }
  function CustomerRow({ c, i }) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-border/50 hover:bg-muted/20 transition-smooth",
        "data-ocid": `admin.customers.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: c.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: c.email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: c.phone }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono text-primary", children: [
            "Rs. ",
            c.walletBalance.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-foreground", children: c.totalRides }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: ["capitalize", STATUS_COLORS[c.status] ?? ""].join(" "),
              children: c.status
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                onClick: () => {
                  setSelected(c);
                  setDetailOpen(true);
                },
                "data-ocid": `admin.customers.view_button.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
              }
            ),
            c.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => updateStatus(c.id, "suspended"),
                "data-ocid": `admin.customers.suspend_button.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-3.5 h-3.5" })
              }
            ),
            c.status !== "banned" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "destructive",
                onClick: () => updateStatus(c.id, "banned"),
                "data-ocid": `admin.customers.ban_button.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-3.5 h-3.5" })
              }
            ),
            c.status !== "active" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => updateStatus(c.id, "active"),
                "data-ocid": `admin.customers.activate_button.${i + 1}`,
                children: "Unban"
              }
            )
          ] }) })
        ]
      }
    );
  }
  const TableHeader = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Customer" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Phone" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Wallet" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Rides" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Status" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-medium text-muted-foreground", children: "Actions" })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", "data-ocid": "admin.customers.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-48", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          className: "pl-9",
          placeholder: "Search customers...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          "data-ocid": "admin.customers.search_input"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: [
      { label: "Active", count: active.length, color: "text-green-500" },
      {
        label: "Suspended",
        count: suspended.length,
        color: "text-orange-500"
      },
      {
        label: "Banned",
        count: blacklist.length,
        color: "text-destructive"
      }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase", children: s.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: ["text-2xl font-bold font-display mt-1", s.color].join(
            " "
          ),
          children: s.count
        }
      )
    ] }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "all", "data-ocid": "admin.customers.tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "all", "data-ocid": "admin.customers.tab.all", children: [
          "All (",
          customers.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "active", "data-ocid": "admin.customers.tab.active", children: [
          "Active (",
          active.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "suspended",
            "data-ocid": "admin.customers.tab.suspended",
            children: [
              "Suspended (",
              suspended.length,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "blacklist",
            "data-ocid": "admin.customers.tab.blacklist",
            children: [
              "Blacklist (",
              blacklist.length,
              ")"
            ]
          }
        )
      ] }),
      ["all", "active", "suspended", "blacklist"].map((tab) => {
        const list = tab === "all" ? filtered : tab === "blacklist" ? blacklist.filter(
          (c) => c.name.toLowerCase().includes(search.toLowerCase())
        ) : customers.filter(
          (c) => c.status === tab && c.name.toLowerCase().includes(search.toLowerCase())
        );
        return /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: tab, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: list.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerRow, { c, i }, c.id)) })
        ] }) }) }) }, tab);
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: detailOpen, onOpenChange: setDetailOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "admin.customers.detail_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Customer Details" }) }),
      selected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Name:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: selected.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Phone:" }),
          " ",
          selected.phone
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Email:" }),
          " ",
          selected.email
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Wallet:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold", children: [
            "Rs. ",
            selected.walletBalance.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total Rides:" }),
          " ",
          selected.totalRides
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Joined:" }),
          " ",
          selected.joinDate
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Status:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: [
                "capitalize",
                STATUS_COLORS[selected.status] ?? ""
              ].join(" "),
              children: selected.status
            }
          )
        ] })
      ] }) })
    ] }) })
  ] });
}
export {
  CustomerManagement as default
};
