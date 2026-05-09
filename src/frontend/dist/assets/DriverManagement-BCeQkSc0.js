import { r as reactExports, j as jsxRuntimeExports, B as Button, K as Key, t as ue } from "./index-D2S5mC_U.js";
import { B as Badge } from "./badge-CtI4d2cg.js";
import { C as Card } from "./card-DEOosrQ5.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-z0beCMMA.js";
import { I as Input } from "./input-BTHBc13a.js";
import { L as Label } from "./label-C9UBYSRz.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-_bs4dzrJ.js";
import { m as mockDrivers } from "./mockDrivers-BlyLXLsg.js";
import { S as Search } from "./search-CJjdnnTu.js";
import { P as Plus } from "./plus-DPmtINSs.js";
import { P as Pause, B as Ban } from "./pause-D_ImUBtz.js";
import "./index-BHXDJJ9c.js";
import "./index-DisWonvz.js";
import "./index-BBKAJGCp.js";
import "./index-BstO6tBW.js";
import "./index-CIMqAcq2.js";
const RANK_COLORS = {
  gold: "text-yellow-500 border-yellow-500/30 bg-yellow-500/10",
  diamond: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  platinum: "text-purple-400 border-purple-400/30 bg-purple-400/10"
};
function DriverManagement() {
  const [drivers, setDrivers] = reactExports.useState(mockDrivers);
  const [search, setSearch] = reactExports.useState("");
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [codeOpen, setCodeOpen] = reactExports.useState(false);
  const [generatedCode, setGeneratedCode] = reactExports.useState("");
  const [codeExpiry, setCodeExpiry] = reactExports.useState("24h");
  const [newDriver, setNewDriver] = reactExports.useState({
    name: "",
    phone: "",
    cnic: "",
    license: "",
    vehicleType: "car",
    vehiclePlate: ""
  });
  const filtered = drivers.filter(
    (d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.phone.includes(search) || d.vehiclePlate.toLowerCase().includes(search.toLowerCase())
  );
  function handleAddDriver(e) {
    e.preventDefault();
    const driver = {
      id: `driver-${Date.now()}`,
      name: newDriver.name,
      phone: newDriver.phone,
      vehicleType: newDriver.vehicleType,
      vehiclePlate: newDriver.vehiclePlate,
      rank: "gold",
      walletBalance: 0,
      status: "offline",
      rating: 0,
      activationCode: `ZRN-${Date.now()}`
    };
    setDrivers((prev) => [driver, ...prev]);
    ue.success(`Driver ${driver.name} added successfully`);
    setAddOpen(false);
    setNewDriver({
      name: "",
      phone: "",
      cnic: "",
      license: "",
      vehicleType: "car",
      vehiclePlate: ""
    });
  }
  function generateCode() {
    const rand = Math.random().toString(36).toUpperCase().slice(2, 8);
    const expiryLabel = codeExpiry.replace("h", "H");
    const code = `ZRN-${rand}-${expiryLabel}`;
    setGeneratedCode(code);
    ue.success(`Code generated: ${code}`);
  }
  function handleSuspend(id) {
    setDrivers(
      (prev) => prev.map(
        (d) => d.id === id ? { ...d, extStatus: "suspended" } : d
      )
    );
    ue.warning("Driver suspended");
  }
  function handleBlock(id) {
    setDrivers(
      (prev) => prev.map(
        (d) => d.id === id ? { ...d, extStatus: "blocked" } : d
      )
    );
    ue.error("Driver blocked");
  }
  function handleActivate(id) {
    setDrivers(
      (prev) => prev.map((d) => {
        if (d.id === id) {
          const { extStatus: _, ...rest } = d;
          return rest;
        }
        return d;
      })
    );
    ue.success("Driver activated");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", "data-ocid": "admin.drivers.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-48", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "pl-9",
            placeholder: "Search drivers...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            "data-ocid": "admin.drivers.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setCodeOpen(true),
          variant: "outline",
          "data-ocid": "admin.drivers.gen_code_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "w-4 h-4 mr-2" }),
            " Generate Code"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setAddOpen(true),
          "data-ocid": "admin.drivers.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
            " Add Driver"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Driver" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Vehicle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Rank" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Wallet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Rating" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-medium text-muted-foreground", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/50 hover:bg-muted/20 transition-smooth",
          "data-ocid": `admin.drivers.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: d.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: d.phone })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "capitalize text-foreground", children: d.vehicleType }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: d.vehiclePlate })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: d.extStatus ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "capitalize", children: d.extStatus }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: [
                  "capitalize",
                  d.status === "online" ? "text-green-500 border-green-500/30" : d.status === "on_ride" ? "text-blue-500 border-blue-500/30" : "text-muted-foreground"
                ].join(" "),
                children: d.status.replace("_", " ")
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: ["capitalize", RANK_COLORS[d.rank] ?? ""].join(
                  " "
                ),
                children: d.rank
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono text-primary", children: [
              "Rs. ",
              d.walletBalance.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right text-foreground", children: [
              "⭐ ",
              d.rating
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1", children: d.extStatus ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => handleActivate(d.id),
                "data-ocid": `admin.drivers.activate_button.${i + 1}`,
                children: "Activate"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => handleSuspend(d.id),
                  "data-ocid": `admin.drivers.suspend_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "destructive",
                  onClick: () => handleBlock(d.id),
                  "data-ocid": `admin.drivers.block_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-3 h-3" })
                }
              )
            ] }) }) })
          ]
        },
        d.id
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: addOpen, onOpenChange: setAddOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-md",
        "data-ocid": "admin.drivers.add_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add New Driver" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAddDriver, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: newDriver.name,
                    onChange: (e) => setNewDriver((p) => ({ ...p, name: e.target.value })),
                    required: true,
                    "data-ocid": "admin.drivers.name_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: newDriver.phone,
                    onChange: (e) => setNewDriver((p) => ({ ...p, phone: e.target.value })),
                    required: true,
                    "data-ocid": "admin.drivers.phone_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "CNIC" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: newDriver.cnic,
                    onChange: (e) => setNewDriver((p) => ({ ...p, cnic: e.target.value })),
                    placeholder: "XXXXX-XXXXXXX-X",
                    "data-ocid": "admin.drivers.cnic_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Vehicle Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: newDriver.vehicleType,
                    onValueChange: (v) => setNewDriver((p) => ({
                      ...p,
                      vehicleType: v
                    })),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "admin.drivers.vehicle_type_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "bike", children: "Bike" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rickshaw", children: "Rickshaw" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "car", children: "Car" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "premium", children: "Premium Car" })
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Vehicle Plate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: newDriver.vehiclePlate,
                    onChange: (e) => setNewDriver((p) => ({
                      ...p,
                      vehiclePlate: e.target.value
                    })),
                    placeholder: "GWD-2024-0000",
                    "data-ocid": "admin.drivers.plate_input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: () => setAddOpen(false),
                  "data-ocid": "admin.drivers.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", "data-ocid": "admin.drivers.confirm_button", children: "Add Driver" })
            ] })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: codeOpen, onOpenChange: setCodeOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "admin.drivers.code_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Generate Activation Code" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Code Expiry" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: codeExpiry, onValueChange: setCodeExpiry, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "admin.drivers.code_expiry_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "24h", children: "24 Hours" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "48h", children: "48 Hours" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "7d", children: "7 Days" })
            ] })
          ] })
        ] }),
        generatedCode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-lg p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Generated Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-lg font-bold text-primary", children: generatedCode })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            className: "w-full",
            onClick: generateCode,
            "data-ocid": "admin.drivers.generate_code_button",
            children: "Generate Code"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  DriverManagement as default
};
