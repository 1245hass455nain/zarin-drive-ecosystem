import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, K as Key, B as Button, t as ue } from "./index-D2S5mC_U.js";
import { B as Badge } from "./badge-CtI4d2cg.js";
import { C as Card } from "./card-DEOosrQ5.js";
import { L as Label } from "./label-C9UBYSRz.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-_bs4dzrJ.js";
import { R as RefreshCw } from "./refresh-cw-Ca-W0xtV.js";
import { C as CircleCheckBig } from "./circle-check-big-bhwtxREB.js";
import { C as Clock } from "./clock-DBLc99QC.js";
import "./index-BHXDJJ9c.js";
import "./index-BstO6tBW.js";
import "./index-DisWonvz.js";
import "./index-CIMqAcq2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode);
const INITIAL_CODES = [
  {
    code: "ZRN-2024-001",
    createdAt: "2026-01-10",
    expiresAt: "2026-01-11",
    expiryLabel: "24h",
    isUsed: true,
    usedBy: "Muhammad Asif"
  },
  {
    code: "ZRN-2024-002",
    createdAt: "2026-01-12",
    expiresAt: "2026-01-13",
    expiryLabel: "24h",
    isUsed: true,
    usedBy: "Abdul Rehman"
  },
  {
    code: "ZRN-2024-003",
    createdAt: "2026-01-15",
    expiresAt: "2026-01-17",
    expiryLabel: "48h",
    isUsed: true,
    usedBy: "Gul Hassan"
  },
  {
    code: "ZRN-2024-ABC",
    createdAt: "2026-05-01",
    expiresAt: "2026-05-08",
    expiryLabel: "7d",
    isUsed: false
  },
  {
    code: "ZRN-2024-XYZ",
    createdAt: "2026-05-05",
    expiresAt: "2026-05-07",
    expiryLabel: "48h",
    isUsed: false
  }
];
function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const part1 = Array.from(
    { length: 4 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  const part2 = Array.from(
    { length: 4 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `ZRN-${part1}-${part2}`;
}
function getExpiry(label) {
  const d = /* @__PURE__ */ new Date();
  if (label === "24h") d.setHours(d.getHours() + 24);
  else if (label === "48h") d.setHours(d.getHours() + 48);
  else d.setDate(d.getDate() + 7);
  return d.toLocaleDateString();
}
function AdminCodes() {
  const [codes, setCodes] = reactExports.useState(INITIAL_CODES);
  const [expiry, setExpiry] = reactExports.useState("24h");
  const [newCode, setNewCode] = reactExports.useState("");
  const [copied, setCopied] = reactExports.useState("");
  function handleGenerate() {
    const code = generateCode();
    const entry = {
      code,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      expiresAt: getExpiry(expiry),
      expiryLabel: expiry,
      isUsed: false
    };
    setCodes((prev) => [entry, ...prev]);
    setNewCode(code);
    ue.success(`Code generated: ${code}`);
  }
  function handleCopy(code) {
    navigator.clipboard.writeText(code).catch(() => void 0);
    setCopied(code);
    setTimeout(() => setCopied(""), 2e3);
    ue.success("Code copied to clipboard");
  }
  const unused = codes.filter((c) => !c.isUsed);
  const used = codes.filter((c) => c.isUsed);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", "data-ocid": "admin.codes.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Secret Codes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Generate one-time driver activation codes" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "w-4 h-4 text-primary" }),
        " Generate New Code"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Expiry Duration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: expiry, onValueChange: setExpiry, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "admin.codes.expiry_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "24h", children: "24 Hours" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "48h", children: "48 Hours" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "7d", children: "7 Days" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleGenerate,
            className: "gap-2",
            "data-ocid": "admin.codes.generate_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
              " Generate Code"
            ]
          }
        )
      ] }),
      newCode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-4 flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-lg px-4 py-3",
          "data-ocid": "admin.codes.new_code",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono font-bold text-primary text-lg tracking-widest", children: newCode }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7",
                onClick: () => handleCopy(newCode),
                children: copied === newCode ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-orange-400" }),
          "Unused Codes",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "ml-auto", children: unused.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          unused.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-muted-foreground text-sm text-center py-6",
              "data-ocid": "admin.codes.empty_state",
              children: "No unused codes"
            }
          ),
          unused.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 p-3 rounded-lg bg-muted/40",
              "data-ocid": `admin.codes.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-sm font-medium text-foreground flex-1 tracking-wider", children: c.code }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "Expires ",
                  c.expiresAt
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-7 w-7",
                    onClick: () => handleCopy(c.code),
                    children: copied === c.code ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
                  }
                )
              ]
            },
            c.code
          ))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-400" }),
          "Used Codes",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "ml-auto", children: used.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: used.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 p-3 rounded-lg bg-muted/40",
            "data-ocid": `admin.codes.used.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-sm text-muted-foreground flex-1 tracking-wider line-through", children: c.code }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: c.usedBy }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs text-green-400 border-green-500/30",
                  children: "Used"
                }
              )
            ]
          },
          c.code
        )) })
      ] })
    ] })
  ] });
}
export {
  AdminCodes as default
};
