import { c as createLucideIcon, r as reactExports, e as useComposedRefs, j as jsxRuntimeExports, d as cn, u as useTranslation, a as useAuthStore, f as useAppStore, W as Wallet, M as MapPin, m as motion, B as Button, X, g as Moon, S as Sun, b as Bell, L as LogOut } from "./index-D2S5mC_U.js";
import { I as Input } from "./input-BTHBc13a.js";
import { L as Label } from "./label-C9UBYSRz.js";
import { u as useControllableState, P as Primitive, c as composeEventHandlers, a as createContextScope } from "./index-BHXDJJ9c.js";
import { u as usePrevious, a as useSize } from "./index-CIMqAcq2.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-CdYqkgKA.js";
import { m as mockRides } from "./mockRides-D5EVF1ST.js";
import { u as useCustomerStore } from "./customerStore-CKDmhgAW.js";
import { u as useNotificationStore } from "./notificationStore-CX3eR6RT.js";
import { u as useRideStore } from "./rideStore-BlpMfOfX.js";
import { A as ArrowLeft } from "./arrow-left-BrvHSzSU.js";
import { C as CircleCheck } from "./circle-check-CeWkmbTN.js";
import { P as Phone } from "./phone-CaZFRKNj.js";
import { C as Clock } from "./clock-DBLc99QC.js";
import { S as Star } from "./star-CgEckE3F.js";
import { P as Plus } from "./plus-DPmtINSs.js";
import { A as AnimatePresence } from "./index-BSMxu79j.js";
import "./index-BstO6tBW.js";
import "./index-BBKAJGCp.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode);
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
const DEFAULT_SAVED_PLACES = [
  {
    id: "sp-home",
    label: "Home",
    address: "House 12, Block C, Model Town, Gwadar",
    icon: "home",
    lat: 25.13,
    lng: 62.32
  },
  {
    id: "sp-work",
    label: "Work",
    address: "Gwadar Development Authority Office",
    icon: "work",
    lat: 25.12,
    lng: 62.33
  }
];
const TRANSACTION_HISTORY = [
  {
    id: "tx-1",
    label: "Ride to Gwadar Port",
    amount: -278,
    date: "May 7",
    type: "debit"
  },
  {
    id: "tx-2",
    label: "Wallet Top-up",
    amount: 500,
    date: "May 6",
    type: "credit"
  },
  {
    id: "tx-3",
    label: "Ride to Serena Hotel",
    amount: -320,
    date: "May 5",
    type: "debit"
  },
  {
    id: "tx-4",
    label: "Promo Cashback",
    amount: 100,
    date: "May 4",
    type: "credit"
  },
  {
    id: "tx-5",
    label: "Ride to University",
    amount: -210,
    date: "May 2",
    type: "debit"
  }
];
function CustomerProfile({
  onBack,
  onLogout
}) {
  const { t } = useTranslation();
  const customerUser = useAuthStore((s) => s.customerUser);
  const customerLogout = useAuthStore((s) => s.customerLogout);
  const { theme, setTheme, language, setLanguage } = useAppStore();
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore();
  const { savedPlaces, addSavedPlace, removeSavedPlace } = useCustomerStore();
  const { rides } = useRideStore();
  const [showAddMoney, setShowAddMoney] = reactExports.useState(false);
  const [addAmount, setAddAmount] = reactExports.useState("");
  const [addMoneySuccess, setAddMoneySuccess] = reactExports.useState(false);
  const [showAddPlace, setShowAddPlace] = reactExports.useState(false);
  const [newPlaceLabel, setNewPlaceLabel] = reactExports.useState("");
  const [newPlaceAddress, setNewPlaceAddress] = reactExports.useState("");
  const [editingName, setEditingName] = reactExports.useState(false);
  const [editName, setEditName] = reactExports.useState((customerUser == null ? void 0 : customerUser.name) ?? "");
  const initials = (customerUser == null ? void 0 : customerUser.name) ? customerUser.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() : "G";
  const customerNotifs = notifications.filter((n) => n.target === "customer");
  const unreadCount = customerNotifs.filter((n) => !n.isRead).length;
  const allSavedPlaces = [...DEFAULT_SAVED_PLACES, ...savedPlaces];
  const myRides = rides.filter((r) => r.customerId === (customerUser == null ? void 0 : customerUser.id));
  const displayRides = myRides.length > 0 ? myRides : mockRides.filter((r) => r.status === "completed").slice(0, 6);
  function handleLogout() {
    customerLogout();
    onLogout();
  }
  function handleAddMoney() {
    const amt = Number.parseInt(addAmount, 10);
    if (!amt || amt < 100) return;
    setAddMoneySuccess(true);
    setTimeout(() => {
      setAddMoneySuccess(false);
      setShowAddMoney(false);
      setAddAmount("");
    }, 2e3);
  }
  function handleAddPlace() {
    if (!newPlaceLabel || !newPlaceAddress) return;
    addSavedPlace({
      id: `sp-${Date.now()}`,
      label: newPlaceLabel,
      address: newPlaceAddress,
      icon: "other",
      lat: 25.13,
      lng: 62.32
    });
    setNewPlaceLabel("");
    setNewPlaceAddress("");
    setShowAddPlace(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col",
      "data-ocid": "customer_profile.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "bg-card border-b border-border px-4 h-14 flex items-center gap-3 shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "customer_profile.back_button",
              onClick: onBack,
              className: "w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted/50 transition-smooth",
              "aria-label": "Go back",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5 text-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-display font-bold text-foreground flex-1", children: "My Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "customer_profile.edit_button",
              onClick: () => setEditingName(!editingName),
              className: "w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted/50 transition-smooth",
              "aria-label": "Edit profile",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4 text-muted-foreground" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-b from-primary/10 via-card to-card px-4 pt-5 pb-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-xl font-display font-black text-primary shrink-0", children: initials }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            editingName ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "customer_profile.name_input",
                  value: editName,
                  onChange: (e) => setEditName(e.target.value),
                  className: "h-8 text-sm",
                  autoFocus: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "customer_profile.save_name_button",
                  onClick: () => setEditingName(false),
                  className: "shrink-0",
                  "aria-label": "Save name",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-primary" })
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-display font-bold text-foreground truncate", children: (customerUser == null ? void 0 : customerUser.name) ?? "Guest" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: (customerUser == null ? void 0 : customerUser.phone) ?? "" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: (customerUser == null ? void 0 : customerUser.email) ?? "" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Wallet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-display font-black text-primary", children: [
              "PKR ",
              ((customerUser == null ? void 0 : customerUser.walletBalance) ?? 0).toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              (customerUser == null ? void 0 : customerUser.totalRides) ?? 0,
              " rides"
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "history", className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full rounded-none border-b border-border bg-card grid grid-cols-4 h-11", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "history",
                "data-ocid": "profile.history_tab",
                className: "text-xs rounded-none gap-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                  " Rides"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "wallet",
                "data-ocid": "profile.wallet_tab",
                className: "text-xs rounded-none gap-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-3.5 h-3.5" }),
                  " Wallet"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "places",
                "data-ocid": "profile.places_tab",
                className: "text-xs rounded-none gap-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5" }),
                  " Places"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "settings",
                "data-ocid": "profile.settings_tab",
                className: "text-xs rounded-none gap-1",
                children: "Settings"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TabsContent,
            {
              value: "history",
              className: "p-4 space-y-3",
              "data-ocid": "profile.history_panel",
              children: displayRides.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "text-center py-12",
                  "data-ocid": "profile.rides_empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-12 h-12 text-muted-foreground/20 mx-auto mb-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No rides yet." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 mt-1", children: "Your ride history will appear here." })
                  ]
                }
              ) : displayRides.map((r, i) => {
                var _a;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 8 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: i * 0.05 },
                    "data-ocid": `profile.ride.item.${i + 1}`,
                    className: "bg-card border border-border rounded-xl p-3.5 shadow-card",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground truncate", children: [
                            r.pickupAddress,
                            " → ",
                            r.dropAddress
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                            (_a = r.startTime) == null ? void 0 : _a.slice(0, 10),
                            " • ",
                            r.driverName
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold text-sm shrink-0 ml-3", children: [
                          "PKR ",
                          r.totalFare
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: cn(
                                "text-[10px] px-1.5 py-0.5 rounded-full font-semibold",
                                r.status === "completed" ? "bg-primary/15 text-primary" : r.status === "cancelled" ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground"
                              ),
                              children: r.status
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground capitalize", children: r.vehicleType })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Star,
                          {
                            className: cn(
                              "w-3 h-3",
                              s <= (r.rating ?? 0) ? "fill-primary text-primary" : "fill-muted text-muted-foreground/30"
                            )
                          },
                          s
                        )) })
                      ] })
                    ]
                  },
                  r.id
                );
              })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsContent,
            {
              value: "wallet",
              className: "p-4 space-y-4",
              "data-ocid": "profile.wallet_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-primary/20 via-primary/10 to-card border border-primary/20 rounded-2xl p-5 shadow-elevated", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Available Balance" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-display font-black text-primary", children: [
                    "PKR ",
                    ((customerUser == null ? void 0 : customerUser.walletBalance) ?? 0).toLocaleString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      "data-ocid": "profile.add_money_button",
                      size: "sm",
                      className: "mt-3 bg-primary text-primary-foreground",
                      onClick: () => setShowAddMoney(true),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
                        " Add Money"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2", children: "Recent Transactions" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: TRANSACTION_HISTORY.map((tx, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      "data-ocid": `profile.transaction.item.${i + 1}`,
                      className: "bg-card border border-border rounded-xl px-4 py-3 flex items-center justify-between shadow-card",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: tx.label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: tx.date })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: cn(
                              "font-bold text-sm",
                              tx.type === "credit" ? "text-primary" : "text-destructive"
                            ),
                            children: [
                              tx.type === "credit" ? "+" : "",
                              tx.amount > 0 ? `+${tx.amount}` : tx.amount
                            ]
                          }
                        )
                      ]
                    },
                    tx.id
                  )) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsContent,
            {
              value: "places",
              className: "p-4 space-y-3",
              "data-ocid": "profile.places_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest", children: "Saved Places" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "profile.add_place_button",
                      onClick: () => setShowAddPlace(true),
                      className: "flex items-center gap-1 text-xs text-primary hover:underline",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                        " Add"
                      ]
                    }
                  )
                ] }),
                allSavedPlaces.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -10 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: i * 0.07 },
                    "data-ocid": `profile.saved_place.item.${i + 1}`,
                    className: "bg-card border border-border rounded-xl p-3 flex items-center gap-3 shadow-card",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: p.icon === "home" ? /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4 text-primary" }) : p.icon === "work" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: p.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: p.address })
                      ] }),
                      p.id.startsWith("sp-1") || p.id.startsWith("sp-h") || p.id.startsWith("sp-w") ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `profile.remove_place.${i + 1}`,
                          onClick: () => removeSavedPlace(p.id),
                          className: "text-muted-foreground/50 hover:text-destructive transition-smooth",
                          "aria-label": "Remove place",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                        }
                      )
                    ]
                  },
                  p.id
                )),
                allSavedPlaces.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "text-center py-8",
                    "data-ocid": "profile.places_empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-10 h-10 text-muted-foreground/20 mx-auto mb-2" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No saved places yet." })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsContent,
            {
              value: "settings",
              className: "p-4 space-y-4",
              "data-ocid": "profile.settings_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-4 h-4 text-primary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Label,
                        {
                          htmlFor: "theme-toggle",
                          className: "text-sm text-foreground cursor-pointer",
                          children: theme === "dark" ? t("common.darkMode") : t("common.lightMode")
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        id: "theme-toggle",
                        "data-ocid": "settings.theme_toggle",
                        checked: theme === "dark",
                        onCheckedChange: (v) => {
                          const next = v ? "dark" : "light";
                          setTheme(next);
                          document.documentElement.classList.toggle(
                            "dark",
                            next === "dark"
                          );
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "lang-toggle",
                        className: "text-sm text-foreground cursor-pointer",
                        children: language === "en" ? "English / اردو" : "اردو / English"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        id: "lang-toggle",
                        "data-ocid": "settings.language_toggle",
                        checked: language === "ur",
                        onCheckedChange: (v) => setLanguage(v ? "ur" : "en")
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "Notifications" })
                    ] }),
                    unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "profile.mark_all_read_button",
                        onClick: () => markAllAsRead("customer"),
                        className: "text-xs text-primary hover:underline",
                        children: [
                          "Mark all read (",
                          unreadCount,
                          ")"
                        ]
                      }
                    )
                  ] }),
                  customerNotifs.slice(0, 3).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-4 py-3 text-xs text-muted-foreground", children: "No notifications yet." }) : customerNotifs.slice(0, 3).map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `profile.notification.item.${i + 1}`,
                      onClick: () => markAsRead(n.id),
                      className: cn(
                        "w-full px-4 py-2.5 text-left border-b border-border/60 last:border-0 transition-smooth hover:bg-muted/20",
                        !n.isRead ? "opacity-100" : "opacity-50"
                      ),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: n.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: n.message })
                      ]
                    },
                    n.id
                  ))
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: [
                  { label: "Help & Support", ocid: "settings.help_button" },
                  { label: "Privacy Policy", ocid: "settings.privacy_button" },
                  { label: "Terms & Conditions", ocid: "settings.terms_button" }
                ].map((item, i, arr) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": item.ocid,
                    className: cn(
                      "w-full px-4 py-3 text-left text-sm text-muted-foreground hover:bg-muted/30 transition-smooth",
                      i < arr.length - 1 ? "border-b border-border" : ""
                    ),
                    children: item.label
                  },
                  item.label
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "settings.logout_button",
                    variant: "destructive",
                    className: "w-full",
                    onClick: handleLogout,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 mr-2" }),
                      t("common.logout")
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showAddMoney && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4",
            "data-ocid": "add_money.dialog",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { scale: 0.95, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                exit: { scale: 0.95, opacity: 0 },
                className: "bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-elevated",
                children: addMoneySuccess ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-14 h-14 text-primary mx-auto mb-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-display font-bold text-foreground", children: "Money Added!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                    "PKR ",
                    addAmount,
                    " added to your wallet."
                  ] })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-display font-bold text-foreground", children: "Add Money" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "add_money.close_button",
                        onClick: () => setShowAddMoney(false),
                        className: "w-7 h-7 rounded-full bg-muted/40 flex items-center justify-center",
                        "aria-label": "Close",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Select or enter an amount to top up your wallet." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 mb-4", children: [200, 500, 1e3, 2e3, 5e3, 1e4].map((amt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setAddAmount(String(amt)),
                      className: cn(
                        "rounded-xl border py-2 text-sm font-medium transition-smooth",
                        addAmount === String(amt) ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/20 text-muted-foreground hover:border-primary/30"
                      ),
                      children: amt.toLocaleString()
                    },
                    amt
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      "data-ocid": "add_money.amount_input",
                      type: "number",
                      placeholder: "Or enter custom amount",
                      value: addAmount,
                      onChange: (e) => setAddAmount(e.target.value),
                      className: "mb-4"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        "data-ocid": "add_money.cancel_button",
                        variant: "outline",
                        className: "flex-1",
                        onClick: () => setShowAddMoney(false),
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        "data-ocid": "add_money.confirm_button",
                        className: "flex-1 bg-primary text-primary-foreground",
                        onClick: handleAddMoney,
                        children: [
                          "Add PKR ",
                          addAmount || "0"
                        ]
                      }
                    )
                  ] })
                ] })
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showAddPlace && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4",
            "data-ocid": "add_place.dialog",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { scale: 0.95, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                exit: { scale: 0.95, opacity: 0 },
                className: "bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-elevated",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-display font-bold text-foreground", children: "Add New Place" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "add_place.close_button",
                        onClick: () => setShowAddPlace(false),
                        className: "w-7 h-7 rounded-full bg-muted/40 flex items-center justify-center",
                        "aria-label": "Close",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "place-label", children: "Label" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "place-label",
                          "data-ocid": "add_place.label_input",
                          placeholder: "e.g. Gym, Parent's House",
                          value: newPlaceLabel,
                          onChange: (e) => setNewPlaceLabel(e.target.value),
                          className: "mt-1"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "place-address", children: "Address" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "place-address",
                          "data-ocid": "add_place.address_input",
                          placeholder: "Full address in Gwadar",
                          value: newPlaceAddress,
                          onChange: (e) => setNewPlaceAddress(e.target.value),
                          className: "mt-1"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        "data-ocid": "add_place.cancel_button",
                        variant: "outline",
                        className: "flex-1",
                        onClick: () => setShowAddPlace(false),
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        "data-ocid": "add_place.confirm_button",
                        className: "flex-1 bg-primary text-primary-foreground",
                        onClick: handleAddPlace,
                        children: "Save Place"
                      }
                    )
                  ] })
                ]
              }
            )
          }
        ) })
      ]
    }
  );
}
export {
  CustomerProfile as default
};
