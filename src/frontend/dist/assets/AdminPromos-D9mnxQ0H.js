import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, y as Tag, t as ue } from "./index-D2S5mC_U.js";
import { B as Badge } from "./badge-CtI4d2cg.js";
import { C as Card } from "./card-DEOosrQ5.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-z0beCMMA.js";
import { I as Input } from "./input-BTHBc13a.js";
import { L as Label } from "./label-C9UBYSRz.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-_bs4dzrJ.js";
import { P as Plus } from "./plus-DPmtINSs.js";
import "./index-BHXDJJ9c.js";
import "./index-DisWonvz.js";
import "./index-BBKAJGCp.js";
import "./index-BstO6tBW.js";
import "./index-CIMqAcq2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
];
const Power = createLucideIcon("power", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const INITIAL_PROMOS = [
  {
    id: "p1",
    code: "WELCOME50",
    discount: 50,
    discountType: "flat",
    maxUses: 200,
    usedCount: 147,
    expiresAt: "2026-06-30",
    isActive: true,
    appliesTo: "all"
  },
  {
    id: "p2",
    code: "GWADAR10",
    discount: 10,
    discountType: "percent",
    maxUses: 500,
    usedCount: 312,
    expiresAt: "2026-05-31",
    isActive: true,
    appliesTo: "all"
  },
  {
    id: "p3",
    code: "PREMIUM100",
    discount: 100,
    discountType: "flat",
    maxUses: 50,
    usedCount: 28,
    expiresAt: "2026-06-15",
    isActive: true,
    appliesTo: "premium"
  },
  {
    id: "p4",
    code: "EID2026",
    discount: 30,
    discountType: "percent",
    maxUses: 1e3,
    usedCount: 891,
    expiresAt: "2026-04-30",
    isActive: false,
    appliesTo: "all"
  },
  {
    id: "p5",
    code: "FIRSTRIDE",
    discount: 75,
    discountType: "flat",
    maxUses: 100,
    usedCount: 100,
    expiresAt: "2026-03-31",
    isActive: false,
    appliesTo: "all"
  }
];
function AdminPromos() {
  const [promos, setPromos] = reactExports.useState(INITIAL_PROMOS);
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    code: "",
    discount: "",
    discountType: "flat",
    maxUses: "",
    expiresAt: "",
    appliesTo: "all"
  });
  function handleCreate() {
    if (!form.code || !form.discount || !form.maxUses || !form.expiresAt) {
      ue.error("All fields are required");
      return;
    }
    const promo = {
      id: `p${Date.now()}`,
      code: form.code.toUpperCase(),
      discount: Number(form.discount),
      discountType: form.discountType,
      maxUses: Number(form.maxUses),
      usedCount: 0,
      expiresAt: form.expiresAt,
      isActive: true,
      appliesTo: form.appliesTo
    };
    setPromos((prev) => [promo, ...prev]);
    setIsOpen(false);
    setForm({
      code: "",
      discount: "",
      discountType: "flat",
      maxUses: "",
      expiresAt: "",
      appliesTo: "all"
    });
    ue.success(`Promo code ${promo.code} created`);
  }
  function toggleActive(id) {
    setPromos(
      (prev) => prev.map((p) => p.id === id ? { ...p, isActive: !p.isActive } : p)
    );
    ue.success("Promo status updated");
  }
  function handleDelete(id) {
    setPromos((prev) => prev.filter((p) => p.id !== id));
    ue.success("Promo code deleted");
  }
  const active = promos.filter((p) => p.isActive);
  const inactive = promos.filter((p) => !p.isActive);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", "data-ocid": "admin.promos.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Promo Codes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Create and manage promotional discounts" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setIsOpen(true),
          className: "gap-2",
          "data-ocid": "admin.promos.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Create Promo"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Active Promos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground mt-1", children: active.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Total Uses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground mt-1", children: promos.reduce((s, p) => s + p.usedCount, 0) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Inactive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground mt-1", children: inactive.length })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Discount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Usage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Expires" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Applies To" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: promos.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border hover:bg-muted/20 transition-colors",
          "data-ocid": `admin.promos.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono font-bold text-primary tracking-wider", children: p.code }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: p.discountType === "flat" ? `Rs. ${p.discount}` : `${p.discount}%` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-muted-foreground", children: [
              p.usedCount,
              " / ",
              p.maxUses,
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-1 bg-muted rounded-full mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-1 bg-primary rounded-full",
                  style: {
                    width: `${Math.min(100, p.usedCount / p.maxUses * 100)}%`
                  }
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: p.expiresAt }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs capitalize", children: p.appliesTo }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: p.isActive ? "text-green-400 border-green-500/30 bg-green-500/10" : "text-muted-foreground",
                children: p.isActive ? "Active" : "Inactive"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-7 w-7",
                  onClick: () => toggleActive(p.id),
                  "data-ocid": `admin.promos.toggle.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-7 w-7 text-destructive hover:text-destructive",
                  onClick: () => handleDelete(p.id),
                  "data-ocid": `admin.promos.delete_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                }
              )
            ] }) })
          ]
        },
        p.id
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "bg-card border-border",
        "data-ocid": "admin.promos.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-primary" }),
            " Create Promo Code"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Promo Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "e.g. GWADAR50",
                  value: form.code,
                  onChange: (e) => setForm((f) => ({
                    ...f,
                    code: e.target.value.toUpperCase()
                  })),
                  "data-ocid": "admin.promos.code_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Discount Value" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  placeholder: "e.g. 50",
                  value: form.discount,
                  onChange: (e) => setForm((f) => ({ ...f, discount: e.target.value })),
                  "data-ocid": "admin.promos.discount_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Discount Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.discountType,
                  onValueChange: (v) => setForm((f) => ({
                    ...f,
                    discountType: v
                  })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "flat", children: "Flat (Rs.)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "percent", children: "Percentage (%)" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Max Uses" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  placeholder: "e.g. 100",
                  value: form.maxUses,
                  onChange: (e) => setForm((f) => ({ ...f, maxUses: e.target.value })),
                  "data-ocid": "admin.promos.maxuses_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Expires On" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: form.expiresAt,
                  onChange: (e) => setForm((f) => ({ ...f, expiresAt: e.target.value })),
                  "data-ocid": "admin.promos.expiry_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Applies To" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.appliesTo,
                  onValueChange: (v) => setForm((f) => ({
                    ...f,
                    appliesTo: v
                  })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Vehicles" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "bike", children: "Bike Only" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rickshaw", children: "Rickshaw Only" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "car", children: "Car Only" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "premium", children: "Premium Only" })
                    ] })
                  ]
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setIsOpen(false),
                "data-ocid": "admin.promos.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleCreate,
                "data-ocid": "admin.promos.submit_button",
                children: "Create Code"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
export {
  AdminPromos as default
};
