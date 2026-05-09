import { c as createLucideIcon, a as useAuthStore, r as reactExports, j as jsxRuntimeExports, C as Crown, w as Shield, B as Button, t as ue } from "./index-D2S5mC_U.js";
import { B as Badge } from "./badge-CtI4d2cg.js";
import { I as Input } from "./input-BTHBc13a.js";
import { L as Label } from "./label-C9UBYSRz.js";
import { U as User } from "./user-D9Aw0UAm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode);
const ADMIN_CREDS = {
  "admin@zarin.pk": { name: "Zulfiqar Khan", role: "super_admin" },
  "manager@zarin.pk": { name: "Mehreen Baloch", role: "manager" },
  "support@zarin.pk": { name: "Saad Rind", role: "support" }
};
const ROLE_LABELS = {
  super_admin: "Super Admin",
  manager: "Manager",
  support: "Support Staff"
};
const ROLE_COLORS = {
  super_admin: "bg-primary/20 text-primary border-primary/30",
  manager: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  support: "bg-green-500/20 text-green-400 border-green-500/30"
};
function AdminLogin() {
  const { adminLogin } = useAuthStore();
  const [step, setStep] = reactExports.useState("creds");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [code2fa, setCode2fa] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  function handleCredSubmit(e) {
    e.preventDefault();
    const found = ADMIN_CREDS[email.toLowerCase()];
    if (!found || password.length < 4) {
      ue.error("Invalid credentials. Try admin@zarin.pk / zarin2024");
      return;
    }
    setStep("2fa");
    ue.info("Demo 2FA code: 123456");
  }
  function doLogin() {
    const cred = ADMIN_CREDS[email.toLowerCase()];
    if (!cred) return;
    setLoading(true);
    setTimeout(() => {
      adminLogin({
        id: `admin-${Date.now()}`,
        name: cred.name,
        email,
        role: cred.role
      });
      ue.success(`Welcome back, ${cred.name}!`);
      setLoading(false);
      window.dispatchEvent(
        new CustomEvent("zarin-navigate", {
          detail: { app: "admin", page: "dashboard" }
        })
      );
    }, 700);
  }
  function handle2faSubmit(e) {
    e.preventDefault();
    if (code2fa !== "123456") {
      ue.error("Invalid 2FA code. Use 123456 for demo");
      return;
    }
    doLogin();
  }
  const hoveredCred = ADMIN_CREDS[email.toLowerCase()] ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex items-center justify-center p-4",
      "data-ocid": "admin.login.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-card border border-primary/30 shadow-elevated mb-4 relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-9 h-9 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3 text-primary-foreground" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground", children: "Zarin CEO" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Admin Control Panel · Gwadar Operations" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 mb-6", children: Object.entries(ADMIN_CREDS).map(([mail, info]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setEmail(mail);
                setPassword("zarin2024");
              },
              className: [
                "p-2 rounded-xl border text-xs text-center transition-smooth cursor-pointer",
                email.toLowerCase() === mail ? "border-primary/50 bg-primary/10" : "border-border bg-card hover:border-primary/30"
              ].join(" "),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground text-xs", children: info.name.split(" ")[0] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "text-muted-foreground mt-0.5",
                    style: { fontSize: "10px" },
                    children: ROLE_LABELS[info.role]
                  }
                )
              ]
            },
            mail
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl p-8 shadow-elevated", children: step === "creds" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCredSubmit, className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "Sign In" }),
              hoveredCred && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: [
                    "ml-auto text-xs",
                    ROLE_COLORS[hoveredCred.role]
                  ].join(" "),
                  children: ROLE_LABELS[hoveredCred.role]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "email",
                  type: "email",
                  placeholder: "admin@zarin.pk",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  required: true,
                  "data-ocid": "admin.login.email_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "password",
                  type: "password",
                  placeholder: "Enter password",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  required: true,
                  "data-ocid": "admin.login.password_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                className: "w-full gap-2",
                "data-ocid": "admin.login.submit_button",
                children: [
                  "Continue ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: "Demo: admin@zarin.pk / zarin2024" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handle2faSubmit, className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "Two-Factor Auth" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Enter the 6-digit code sent to your registered device." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "code2fa", children: "2FA Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "code2fa",
                  type: "text",
                  placeholder: "123456",
                  value: code2fa,
                  onChange: (e) => setCode2fa(e.target.value),
                  maxLength: 6,
                  required: true,
                  "data-ocid": "admin.login.2fa_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full",
                  disabled: loading,
                  "data-ocid": "admin.login.verify_button",
                  children: loading ? "Verifying..." : "Verify & Login"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  className: "w-full",
                  disabled: loading,
                  onClick: doLogin,
                  "data-ocid": "admin.login.skip_demo_button",
                  children: "Skip (Demo)"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "w-full text-muted-foreground",
                onClick: () => setStep("creds"),
                children: "← Back"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-4", children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " Zarin Drive. Secure admin access."
          ] })
        ] })
      ]
    }
  );
}
export {
  AdminLogin as default
};
