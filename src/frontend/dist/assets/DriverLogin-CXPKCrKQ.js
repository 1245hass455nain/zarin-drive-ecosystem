import { r as reactExports, a as useAuthStore, j as jsxRuntimeExports, s as navigate, B as Button, t as ue } from "./index-D2S5mC_U.js";
import { I as Input } from "./input-BTHBc13a.js";
import { L as Label } from "./label-C9UBYSRz.js";
import { m as mockDrivers } from "./mockDrivers-BlyLXLsg.js";
function DriverLogin() {
  const [phone, setPhone] = reactExports.useState("");
  const [code, setCode] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const driverLogin = useAuthStore((s) => s.driverLogin);
  async function handleLogin(e) {
    e.preventDefault();
    if (!phone.trim() || !code.trim()) {
      ue.error("Please enter both mobile number and activation code");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const found = mockDrivers.find((d) => d.phone === phone.trim()) ?? mockDrivers[0];
    driverLogin(found);
    sessionStorage.setItem("zarin-driver-page", "home");
    navigate("driver", "home");
    ue.success(`Welcome back, ${found.name}!`);
    setLoading(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-secondary flex flex-col items-center justify-center px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate("landing"),
        className: "absolute top-6 left-6 text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-2 text-sm",
        "data-ocid": "driver_login.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "currentColor",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10.78 3.22a.75.75 0 0 1 0 1.06L7.06 8l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0z" })
            }
          ),
          "Back"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: "40",
            height: "40",
            viewBox: "0 0 40 40",
            fill: "none",
            role: "img",
            "aria-label": "Zarin Pro logo",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Zarin Pro logo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: "20",
                  cy: "20",
                  r: "18",
                  stroke: "oklch(0.65 0.22 90)",
                  strokeWidth: "2"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M12 26 L20 10 L28 26",
                  stroke: "oklch(0.65 0.22 90)",
                  strokeWidth: "2.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M14.5 21h11",
                  stroke: "oklch(0.65 0.22 90)",
                  strokeWidth: "2",
                  strokeLinecap: "round"
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-primary tracking-tight", children: "Zarin Pro" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Driver Partner Portal" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 shadow-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-display font-semibold text-foreground mb-1", children: "Driver Login" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Enter your credentials to continue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "phone",
                className: "text-foreground text-sm font-medium",
                children: "Mobile Number"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "phone",
                type: "tel",
                placeholder: "0300-1234567",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                className: "bg-background border-input",
                "data-ocid": "driver_login.phone_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "code",
                className: "text-foreground text-sm font-medium",
                children: "Secret Activation Code"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "code",
                type: "password",
                placeholder: "ZRN-2024-XXX",
                value: code,
                onChange: (e) => setCode(e.target.value),
                className: "bg-background border-input",
                "data-ocid": "driver_login.code_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: loading,
              className: "w-full bg-primary text-primary-foreground font-semibold h-11 mt-2",
              "data-ocid": "driver_login.submit_button",
              children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" }),
                "Signing in..."
              ] }) : "Sign In"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-5 leading-relaxed", children: [
          "Don't have a code?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Contact admin for activation" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-6", children: "No self-registration. Drivers are added by Zarin administrators." })
    ] })
  ] });
}
export {
  DriverLogin as default
};
