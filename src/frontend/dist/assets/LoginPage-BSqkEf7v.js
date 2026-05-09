import { c as createLucideIcon, u as useTranslation, a as useAuthStore, r as reactExports, j as jsxRuntimeExports, m as motion, B as Button, X } from "./index-D2S5mC_U.js";
import { I as Input } from "./input-BTHBc13a.js";
import { L as Label } from "./label-C9UBYSRz.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-CdYqkgKA.js";
import { P as Phone } from "./phone-CaZFRKNj.js";
import { C as CircleCheck } from "./circle-check-CeWkmbTN.js";
import { E as Eye } from "./eye-CK-5nior.js";
import { A as AnimatePresence } from "./index-BSMxu79j.js";
import "./index-BHXDJJ9c.js";
import "./index-BstO6tBW.js";
import "./index-BBKAJGCp.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode);
function LoginPage({ onLogin }) {
  const { t } = useTranslation();
  const customerLogin = useAuthStore((s) => s.customerLogin);
  const [tab, setTab] = reactExports.useState("login");
  const [phone, setPhone] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPw, setShowPw] = reactExports.useState(false);
  const [rememberMe, setRememberMe] = reactExports.useState(false);
  const [forgotOpen, setForgotOpen] = reactExports.useState(false);
  const [forgotPhone, setForgotPhone] = reactExports.useState("");
  const [forgotSent, setForgotSent] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [fullName, setFullName] = reactExports.useState("");
  const [signupPhone, setSignupPhone] = reactExports.useState("");
  const [signupEmail, setSignupEmail] = reactExports.useState("");
  const [signupPw, setSignupPw] = reactExports.useState("");
  const [signupConfirmPw, setSignupConfirmPw] = reactExports.useState("");
  const [acceptTerms, setAcceptTerms] = reactExports.useState(false);
  const [showSignupPw, setShowSignupPw] = reactExports.useState(false);
  const [signupError, setSignupError] = reactExports.useState("");
  const [otpStep, setOtpStep] = reactExports.useState(false);
  const [otp, setOtp] = reactExports.useState("");
  const [otpError, setOtpError] = reactExports.useState("");
  const [otpResent, setOtpResent] = reactExports.useState(false);
  const [pendingUser, setPendingUser] = reactExports.useState(null);
  function handleLogin() {
    if (!phone || !password) {
      setError("Please enter your mobile number and password.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setPendingUser({ name: "Ali Hassan", phone, email: "ali@example.com" });
    setOtpStep(true);
  }
  function handleSignup() {
    if (!fullName || !signupPhone || !signupPw || !acceptTerms) {
      setSignupError("Please fill all required fields and accept terms.");
      return;
    }
    if (signupPw !== signupConfirmPw) {
      setSignupError("Passwords do not match.");
      return;
    }
    if (signupPw.length < 6) {
      setSignupError("Password must be at least 6 characters.");
      return;
    }
    setSignupError("");
    setPendingUser({ name: fullName, phone: signupPhone, email: signupEmail });
    setOtpStep(true);
  }
  function handleVerifyOtp() {
    if (otp.length < 4) {
      setOtpError("Enter a valid OTP (at least 4 digits).");
      return;
    }
    setOtpError("");
    customerLogin({
      id: `cust-${Date.now()}`,
      name: (pendingUser == null ? void 0 : pendingUser.name) ?? "Ali Hassan",
      phone: (pendingUser == null ? void 0 : pendingUser.phone) ?? phone,
      email: (pendingUser == null ? void 0 : pendingUser.email) ?? "ali@example.com",
      walletBalance: 1500,
      totalRides: 0,
      profilePhoto: ""
    });
    onLogin();
  }
  function handleResendOtp() {
    setOtp("");
    setOtpError("");
    setOtpResent(true);
    setTimeout(() => setOtpResent(false), 3e3);
  }
  function handleGoogleLogin() {
    customerLogin({
      id: "cust-google-1",
      name: "Fatima Baloch",
      phone: "0300-9876543",
      email: "fatima.baloch@gmail.com",
      walletBalance: 2500,
      totalRides: 14,
      profilePhoto: ""
    });
    onLogin();
  }
  if (otpStep) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen bg-background flex items-center justify-center p-4",
        "data-ocid": "otp.page",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            className: "w-full max-w-sm",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-6 shadow-elevated", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-7 h-7 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground", children: "Verify Your Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                  "OTP sent to",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: pendingUser == null ? void 0 : pendingUser.phone })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary mt-1 font-mono", children: "(Use any code — demo mode)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "otp-input", children: "Enter OTP" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "otp-input",
                      "data-ocid": "otp.input",
                      type: "text",
                      inputMode: "numeric",
                      maxLength: 6,
                      placeholder: "••••••",
                      value: otp,
                      onChange: (e) => setOtp(e.target.value.replace(/\D/g, "")),
                      className: "text-center text-2xl tracking-[0.4em] font-mono mt-1 h-14"
                    }
                  ),
                  otpError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      "data-ocid": "otp.field_error",
                      className: "text-destructive text-xs mt-1.5 flex items-center gap-1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                        " ",
                        otpError
                      ]
                    }
                  ),
                  otpResent && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary text-xs mt-1.5 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                    " New OTP sent!"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "otp.submit_button",
                    className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-11",
                    onClick: handleVerifyOtp,
                    children: "Verify & Continue"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setOtpStep(false);
                        setOtp("");
                        setOtpError("");
                      },
                      className: "text-muted-foreground hover:text-foreground transition-smooth",
                      children: [
                        "← ",
                        t("common.back")
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "otp.resend_button",
                      onClick: handleResendOtp,
                      className: "text-primary hover:underline text-xs",
                      children: "Resend OTP"
                    }
                  )
                ] })
              ] })
            ] })
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden",
      "data-ocid": "login.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-primary/8 to-transparent pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            className: "w-full max-w-sm relative z-10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "w-16 h-16 rounded-3xl bg-primary flex items-center justify-center mx-auto mb-3 shadow-elevated",
                    whileHover: { scale: 1.05 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display font-black text-primary-foreground", children: "Z" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground", children: [
                  "Zarin ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Drive" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: t("common.tagline") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border shadow-elevated overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Tabs,
                {
                  value: tab,
                  onValueChange: (v) => {
                    setTab(v);
                    setError("");
                    setSignupError("");
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full rounded-none border-b border-border bg-muted/30 h-12", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TabsTrigger,
                        {
                          value: "login",
                          "data-ocid": "login.tab",
                          className: "flex-1 rounded-none text-sm",
                          children: t("auth.login")
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TabsTrigger,
                        {
                          value: "signup",
                          "data-ocid": "signup.tab",
                          className: "flex-1 rounded-none text-sm",
                          children: t("auth.signup")
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "login", className: "p-6 space-y-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-phone", children: t("auth.phone") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "login-phone",
                              "data-ocid": "login.phone_input",
                              type: "tel",
                              placeholder: "0300-1234567",
                              value: phone,
                              onChange: (e) => setPhone(e.target.value),
                              className: "pl-9"
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-password", children: t("auth.password") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "login-password",
                              "data-ocid": "login.password_input",
                              type: showPw ? "text" : "password",
                              placeholder: "••••••••",
                              value: password,
                              onChange: (e) => setPassword(e.target.value),
                              onKeyDown: (e) => e.key === "Enter" && handleLogin(),
                              className: "pr-9"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => setShowPw(!showPw),
                              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
                              "aria-label": "Toggle password visibility",
                              children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                            }
                          )
                        ] })
                      ] }),
                      error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "p",
                        {
                          "data-ocid": "login.field_error",
                          className: "text-destructive text-xs flex items-center gap-1.5 bg-destructive/5 border border-destructive/20 rounded-lg px-3 py-2",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 shrink-0" }),
                            " ",
                            error
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer select-none", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              type: "checkbox",
                              "data-ocid": "login.remember_checkbox",
                              checked: rememberMe,
                              onChange: (e) => setRememberMe(e.target.checked),
                              className: "accent-primary w-4 h-4"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: t("auth.rememberMe") })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "data-ocid": "login.forgot_password",
                            onClick: () => setForgotOpen(true),
                            className: "text-primary hover:underline text-xs",
                            children: t("auth.forgotPassword")
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          "data-ocid": "login.submit_button",
                          className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-11",
                          onClick: handleLogin,
                          children: t("auth.login")
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative my-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full border-t border-border" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-card px-3 text-xs text-muted-foreground", children: "or continue with" }) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          "data-ocid": "login.google_button",
                          variant: "outline",
                          className: "w-full gap-2",
                          onClick: handleGoogleLogin,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
                            t("auth.loginWithGoogle")
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "signup", className: "p-6 space-y-3.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "signup-name", children: [
                          t("auth.fullName"),
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "signup-name",
                            "data-ocid": "signup.name_input",
                            type: "text",
                            placeholder: "Muhammad Ali Hassan",
                            value: fullName,
                            onChange: (e) => setFullName(e.target.value),
                            className: "mt-1"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "signup-phone", children: [
                          t("auth.phone"),
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "signup-phone",
                              "data-ocid": "signup.phone_input",
                              type: "tel",
                              placeholder: "0300-1234567",
                              value: signupPhone,
                              onChange: (e) => setSignupPhone(e.target.value),
                              className: "pl-9"
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "signup-email", children: t("auth.email") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "signup-email",
                              "data-ocid": "signup.email_input",
                              type: "email",
                              placeholder: "ali@example.com",
                              value: signupEmail,
                              onChange: (e) => setSignupEmail(e.target.value),
                              className: "pl-9"
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "signup-pw", children: [
                            t("auth.password"),
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: "signup-pw",
                                "data-ocid": "signup.password_input",
                                type: showSignupPw ? "text" : "password",
                                placeholder: "Min 6 chars",
                                value: signupPw,
                                onChange: (e) => setSignupPw(e.target.value),
                                className: "pr-8"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => setShowSignupPw(!showSignupPw),
                                className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                                "aria-label": "Toggle",
                                children: showSignupPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "signup-confirm-pw", children: "Confirm" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "signup-confirm-pw",
                              "data-ocid": "signup.confirm_password_input",
                              type: "password",
                              placeholder: "Repeat",
                              value: signupConfirmPw,
                              onChange: (e) => setSignupConfirmPw(e.target.value),
                              className: "mt-1"
                            }
                          )
                        ] })
                      ] }),
                      signupError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "p",
                        {
                          "data-ocid": "signup.field_error",
                          className: "text-destructive text-xs flex items-center gap-1.5 bg-destructive/5 border border-destructive/20 rounded-lg px-3 py-2",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 shrink-0" }),
                            " ",
                            signupError
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-2 cursor-pointer select-none", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "checkbox",
                            "data-ocid": "signup.terms_checkbox",
                            checked: acceptTerms,
                            onChange: (e) => setAcceptTerms(e.target.checked),
                            className: "accent-primary mt-0.5 w-4 h-4 shrink-0"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground leading-relaxed", children: [
                          t("auth.termsAgree"),
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary cursor-pointer hover:underline", children: "Terms & Conditions" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          "data-ocid": "signup.submit_button",
                          className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-11",
                          onClick: handleSignup,
                          children: t("auth.signup")
                        }
                      )
                    ] })
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: forgotOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4",
            "data-ocid": "forgot_password.dialog",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.95 },
                className: "bg-card rounded-2xl border border-border p-6 w-full max-w-sm shadow-elevated",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-display font-bold text-foreground", children: t("auth.forgotPassword") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "forgot_password.close_button",
                        onClick: () => {
                          setForgotOpen(false);
                          setForgotSent(false);
                          setForgotPhone("");
                        },
                        className: "w-7 h-7 rounded-full bg-muted/40 flex items-center justify-center hover:bg-muted transition-smooth",
                        "aria-label": "Close",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5 text-muted-foreground" })
                      }
                    )
                  ] }),
                  forgotSent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 text-primary mx-auto mb-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Reset code sent!" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                      "Check your SMS at ",
                      forgotPhone
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        className: "mt-4 w-full",
                        onClick: () => {
                          setForgotOpen(false);
                          setForgotSent(false);
                          setForgotPhone("");
                        },
                        children: "Done"
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Enter your registered mobile number to receive reset instructions." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          "data-ocid": "forgot_password.input",
                          type: "tel",
                          placeholder: "0300-1234567",
                          value: forgotPhone,
                          onChange: (e) => setForgotPhone(e.target.value),
                          className: "pl-9"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          "data-ocid": "forgot_password.cancel_button",
                          variant: "outline",
                          className: "flex-1",
                          onClick: () => setForgotOpen(false),
                          children: t("common.cancel")
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          "data-ocid": "forgot_password.confirm_button",
                          className: "flex-1 bg-primary text-primary-foreground",
                          onClick: () => {
                            if (forgotPhone) setForgotSent(true);
                          },
                          children: "Send Code"
                        }
                      )
                    ] })
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
  LoginPage as default
};
