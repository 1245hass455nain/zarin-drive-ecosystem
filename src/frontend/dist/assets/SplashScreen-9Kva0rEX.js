import { u as useTranslation, a as useAuthStore, r as reactExports, j as jsxRuntimeExports, m as motion } from "./index-D2S5mC_U.js";
function SplashScreen({ onFinish }) {
  const { t } = useTranslation();
  useAuthStore((s) => s.isCustomerLoggedIn);
  const [phase, setPhase] = reactExports.useState("logo");
  const [checks, setChecks] = reactExports.useState([
    {
      label: "Checking GPS...",
      labelUr: "جی پی ایس جانچ رہے ہیں...",
      status: "pending"
    },
    {
      label: "Checking Internet...",
      labelUr: "انٹرنیٹ جانچ رہے ہیں...",
      status: "pending"
    }
  ]);
  reactExports.useEffect(() => {
    const t1 = setTimeout(() => setPhase("checks"), 700);
    const t2 = setTimeout(() => {
      const hasGps = "geolocation" in navigator;
      setChecks(
        (prev) => prev.map(
          (c, i) => i === 0 ? { ...c, status: hasGps ? "ok" : "warn" } : c
        )
      );
    }, 1300);
    const t3 = setTimeout(() => {
      setChecks(
        (prev) => prev.map(
          (c, i) => i === 1 ? { ...c, status: navigator.onLine ? "ok" : "warn" } : c
        )
      );
    }, 1900);
    const t4 = setTimeout(() => setPhase("done"), 2400);
    const t5 = setTimeout(() => onFinish(), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onFinish]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden",
      "data-ocid": "splash.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary/8 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/5 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/10 blur-3xl" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-[0.03] pointer-events-none",
            style: {
              backgroundImage: "linear-gradient(oklch(0.65 0.22 90 / 1) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.22 90 / 1) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center gap-10 px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { scale: 0.4, opacity: 0, y: 20 },
              animate: { scale: 1, opacity: 1, y: 0 },
              transition: { duration: 0.8, type: "spring", bounce: 0.35 },
              className: "flex flex-col items-center gap-5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    animate: phase === "done" ? { scale: [1, 1.06, 1] } : {},
                    transition: { duration: 0.4 },
                    className: "relative",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 h-28 rounded-[2rem] bg-primary flex items-center justify-center shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.span,
                        {
                          className: "text-5xl font-display font-black text-primary-foreground",
                          animate: { rotate: [0, 3, -3, 0] },
                          transition: {
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: 2
                          },
                          children: "Z"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          className: "absolute inset-0 rounded-[2rem] border-2 border-primary/40",
                          animate: { scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] },
                          transition: { duration: 2, repeat: Number.POSITIVE_INFINITY }
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl font-display font-black tracking-tight text-foreground", children: [
                    "Zarin",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: " Drive" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.p,
                    {
                      initial: { opacity: 0, y: 8 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.6 },
                      className: "text-muted-foreground mt-2 text-sm font-body",
                      children: t("common.tagline")
                    }
                  )
                ] })
              ]
            }
          ),
          (phase === "checks" || phase === "done") && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              className: "flex flex-col gap-3 w-56",
              children: checks.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: -12 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: idx * 0.25 },
                  className: "flex items-center gap-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: `w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-all duration-500 ${item.status === "pending" ? "border-2 border-muted-foreground/30 bg-transparent animate-pulse" : item.status === "ok" ? "bg-primary text-primary-foreground" : "bg-amber-500 text-white"}`,
                        children: [
                          item.status === "ok" && "✓",
                          item.status === "warn" && "!"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-sm transition-colors duration-300 ${item.status === "pending" ? "text-muted-foreground/50" : item.status === "ok" ? "text-primary" : "text-amber-500"}`,
                        children: item.status === "ok" ? item.label.replace("Checking", "✓").replace("...", " Ready") : item.status === "warn" ? item.label.replace("Checking", "⚠").replace("...", " Unavailable") : item.label
                      }
                    )
                  ]
                },
                item.label
              ))
            }
          ),
          phase === "done" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              className: "w-56 h-1 bg-muted/50 rounded-full overflow-hidden",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "h-full bg-primary rounded-full",
                  initial: { width: "0%" },
                  animate: { width: "100%" },
                  transition: { duration: 0.8, ease: "easeOut" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 0.4 },
              transition: { delay: 1.5 },
              className: "text-xs text-muted-foreground tracking-widest uppercase absolute bottom-8",
              children: "Gwadar · Balochistan · Pakistan"
            }
          )
        ] })
      ]
    }
  );
}
export {
  SplashScreen as default
};
