import { c as createLucideIcon, j as jsxRuntimeExports, d as cn, r as reactExports, b as Bell, B as Button, t as ue } from "./index-D2S5mC_U.js";
import { B as Badge } from "./badge-CtI4d2cg.js";
import { C as Card } from "./card-DEOosrQ5.js";
import { I as Input } from "./input-BTHBc13a.js";
import { L as Label } from "./label-C9UBYSRz.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-_bs4dzrJ.js";
import { u as useNotificationStore } from "./notificationStore-CX3eR6RT.js";
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
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function NotificationSystem() {
  const { notifications, addNotification } = useNotificationStore();
  const [title, setTitle] = reactExports.useState("");
  const [message, setMessage] = reactExports.useState("");
  const [target, setTarget] = reactExports.useState("customer");
  const [type, setType] = reactExports.useState("system");
  const [sending, setSending] = reactExports.useState(false);
  function handleSend(e) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      addNotification({ title, message, type, target });
      ue.success(`Notification sent to all ${target}s`);
      setTitle("");
      setMessage("");
      setSending(false);
    }, 600);
  }
  const TYPE_COLORS = {
    ride: "bg-blue-500/10 text-blue-400",
    promo: "bg-primary/10 text-primary",
    wallet: "bg-green-500/10 text-green-400",
    system: "bg-muted text-muted-foreground",
    alert: "bg-destructive/10 text-destructive"
  };
  const adminNotifs = notifications.slice(0, 20);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-6", "data-ocid": "admin.notifications.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-primary" }),
        " Compose Notification"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSend, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: title,
              onChange: (e) => setTitle(e.target.value),
              placeholder: "Notification title...",
              required: true,
              "data-ocid": "admin.notifications.title_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: message,
              onChange: (e) => setMessage(e.target.value),
              placeholder: "Write your message...",
              rows: 4,
              required: true,
              "data-ocid": "admin.notifications.message_textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Send To" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: target,
                onValueChange: (v) => setTarget(v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "admin.notifications.target_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "customer", children: "All Customers" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "driver", children: "All Drivers" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "admin", children: "Admin Team" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: type,
                onValueChange: (v) => setType(v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "admin.notifications.type_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "system", children: "System" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "promo", children: "Promotion" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ride", children: "Ride Update" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "wallet", children: "Wallet Alert" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "alert", children: "Alert" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            className: "w-full",
            disabled: sending,
            "data-ocid": "admin.notifications.send_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 mr-2" }),
              " ",
              sending ? "Sending..." : "Send Notification"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-4", children: "Notification History" }),
      adminNotifs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-10 text-muted-foreground",
          "data-ocid": "admin.notifications.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-8 h-8 mx-auto mb-2 opacity-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No notifications sent yet" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-80 overflow-y-auto", children: adminNotifs.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start gap-3 p-3 rounded-lg bg-muted/30",
          "data-ocid": `admin.notifications.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: [
                  "text-xs capitalize flex-shrink-0",
                  TYPE_COLORS[n.type]
                ].join(" "),
                children: n.type
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: n.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: n.message }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                "To: ",
                n.target,
                " · ",
                new Date(n.createdAt).toLocaleString()
              ] })
            ] })
          ]
        },
        n.id
      )) })
    ] })
  ] }) });
}
export {
  NotificationSystem as default
};
