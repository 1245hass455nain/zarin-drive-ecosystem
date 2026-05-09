import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Mail,
  Phone,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "../../i18n/useTranslation";
import { useAuthStore } from "../../stores/authStore";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const { t } = useTranslation();
  const customerLogin = useAuthStore((s) => s.customerLogin);

  const [tab, setTab] = useState<"login" | "signup">("login");

  // Login
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotPhone, setForgotPhone] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [error, setError] = useState("");

  // Signup
  const [fullName, setFullName] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPw, setSignupPw] = useState("");
  const [signupConfirmPw, setSignupConfirmPw] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showSignupPw, setShowSignupPw] = useState(false);
  const [signupError, setSignupError] = useState("");

  // OTP
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpResent, setOtpResent] = useState(false);
  const [pendingUser, setPendingUser] = useState<{
    name: string;
    phone: string;
    email: string;
  } | null>(null);

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
      name: pendingUser?.name ?? "Ali Hassan",
      phone: pendingUser?.phone ?? phone,
      email: pendingUser?.email ?? "ali@example.com",
      walletBalance: 1500,
      totalRides: 0,
      profilePhoto: "",
    });
    onLogin();
  }

  function handleResendOtp() {
    setOtp("");
    setOtpError("");
    setOtpResent(true);
    setTimeout(() => setOtpResent(false), 3000);
  }

  function handleGoogleLogin() {
    customerLogin({
      id: "cust-google-1",
      name: "Fatima Baloch",
      phone: "0300-9876543",
      email: "fatima.baloch@gmail.com",
      walletBalance: 2500,
      totalRides: 14,
      profilePhoto: "",
    });
    onLogin();
  }

  // OTP Step
  if (otpStep) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center p-4"
        data-ocid="otp.page"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm"
        >
          <div className="bg-card rounded-2xl border border-border p-6 shadow-elevated">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-xl font-display font-bold text-foreground">
                Verify Your Number
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                OTP sent to{" "}
                <span className="text-foreground font-medium">
                  {pendingUser?.phone}
                </span>
              </p>
              <p className="text-xs text-primary mt-1 font-mono">
                (Use any code — demo mode)
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="otp-input">Enter OTP</Label>
                <Input
                  id="otp-input"
                  data-ocid="otp.input"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="••••••"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="text-center text-2xl tracking-[0.4em] font-mono mt-1 h-14"
                />
                {otpError && (
                  <p
                    data-ocid="otp.field_error"
                    className="text-destructive text-xs mt-1.5 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" /> {otpError}
                  </p>
                )}
                {otpResent && (
                  <p className="text-primary text-xs mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> New OTP sent!
                  </p>
                )}
              </div>

              <Button
                type="button"
                data-ocid="otp.submit_button"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-11"
                onClick={handleVerifyOtp}
              >
                Verify & Continue
              </Button>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setOtpStep(false);
                    setOtp("");
                    setOtpError("");
                  }}
                  className="text-muted-foreground hover:text-foreground transition-smooth"
                >
                  ← {t("common.back")}
                </button>
                <button
                  type="button"
                  data-ocid="otp.resend_button"
                  onClick={handleResendOtp}
                  className="text-primary hover:underline text-xs"
                >
                  Resend OTP
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden"
      data-ocid="login.page"
    >
      {/* Background glow */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-primary/8 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <motion.div
            className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center mx-auto mb-3 shadow-elevated"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl font-display font-black text-primary-foreground">
              Z
            </span>
          </motion.div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Zarin <span className="text-primary">Drive</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {t("common.tagline")}
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-elevated overflow-hidden">
          <Tabs
            value={tab}
            onValueChange={(v) => {
              setTab(v as "login" | "signup");
              setError("");
              setSignupError("");
            }}
          >
            <TabsList className="w-full rounded-none border-b border-border bg-muted/30 h-12">
              <TabsTrigger
                value="login"
                data-ocid="login.tab"
                className="flex-1 rounded-none text-sm"
              >
                {t("auth.login")}
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                data-ocid="signup.tab"
                className="flex-1 rounded-none text-sm"
              >
                {t("auth.signup")}
              </TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="login" className="p-6 space-y-4">
              <div>
                <Label htmlFor="login-phone">{t("auth.phone")}</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="login-phone"
                    data-ocid="login.phone_input"
                    type="tel"
                    placeholder="0300-1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="login-password">{t("auth.password")}</Label>
                <div className="relative mt-1">
                  <Input
                    id="login-password"
                    data-ocid="login.password_input"
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                    aria-label="Toggle password visibility"
                  >
                    {showPw ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p
                  data-ocid="login.field_error"
                  className="text-destructive text-xs flex items-center gap-1.5 bg-destructive/5 border border-destructive/20 rounded-lg px-3 py-2"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
                </p>
              )}

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    data-ocid="login.remember_checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-primary w-4 h-4"
                  />
                  <span className="text-muted-foreground text-xs">
                    {t("auth.rememberMe")}
                  </span>
                </label>
                <button
                  type="button"
                  data-ocid="login.forgot_password"
                  onClick={() => setForgotOpen(true)}
                  className="text-primary hover:underline text-xs"
                >
                  {t("auth.forgotPassword")}
                </button>
              </div>

              <Button
                type="button"
                data-ocid="login.submit_button"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-11"
                onClick={handleLogin}
              >
                {t("auth.login")}
              </Button>

              <div className="relative my-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-card px-3 text-xs text-muted-foreground">
                    or continue with
                  </span>
                </div>
              </div>

              <Button
                type="button"
                data-ocid="login.google_button"
                variant="outline"
                className="w-full gap-2"
                onClick={handleGoogleLogin}
              >
                <Mail className="w-4 h-4" />
                {t("auth.loginWithGoogle")}
              </Button>
            </TabsContent>

            {/* SIGNUP */}
            <TabsContent value="signup" className="p-6 space-y-3.5">
              <div>
                <Label htmlFor="signup-name">
                  {t("auth.fullName")}{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="signup-name"
                  data-ocid="signup.name_input"
                  type="text"
                  placeholder="Muhammad Ali Hassan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="signup-phone">
                  {t("auth.phone")} <span className="text-destructive">*</span>
                </Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signup-phone"
                    data-ocid="signup.phone_input"
                    type="tel"
                    placeholder="0300-1234567"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="signup-email">{t("auth.email")}</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    data-ocid="signup.email_input"
                    type="email"
                    placeholder="ali@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="signup-pw">
                    {t("auth.password")}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="signup-pw"
                      data-ocid="signup.password_input"
                      type={showSignupPw ? "text" : "password"}
                      placeholder="Min 6 chars"
                      value={signupPw}
                      onChange={(e) => setSignupPw(e.target.value)}
                      className="pr-8"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPw(!showSignupPw)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label="Toggle"
                    >
                      {showSignupPw ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="signup-confirm-pw">Confirm</Label>
                  <Input
                    id="signup-confirm-pw"
                    data-ocid="signup.confirm_password_input"
                    type="password"
                    placeholder="Repeat"
                    value={signupConfirmPw}
                    onChange={(e) => setSignupConfirmPw(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              {signupError && (
                <p
                  data-ocid="signup.field_error"
                  className="text-destructive text-xs flex items-center gap-1.5 bg-destructive/5 border border-destructive/20 rounded-lg px-3 py-2"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {signupError}
                </p>
              )}

              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  data-ocid="signup.terms_checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="accent-primary mt-0.5 w-4 h-4 shrink-0"
                />
                <span className="text-xs text-muted-foreground leading-relaxed">
                  {t("auth.termsAgree")}{" "}
                  <span className="text-primary cursor-pointer hover:underline">
                    Terms &amp; Conditions
                  </span>
                </span>
              </label>

              <Button
                type="button"
                data-ocid="signup.submit_button"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-11"
                onClick={handleSignup}
              >
                {t("auth.signup")}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {forgotOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            data-ocid="forgot_password.dialog"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card rounded-2xl border border-border p-6 w-full max-w-sm shadow-elevated"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-display font-bold text-foreground">
                  {t("auth.forgotPassword")}
                </h3>
                <button
                  type="button"
                  data-ocid="forgot_password.close_button"
                  onClick={() => {
                    setForgotOpen(false);
                    setForgotSent(false);
                    setForgotPhone("");
                  }}
                  className="w-7 h-7 rounded-full bg-muted/40 flex items-center justify-center hover:bg-muted transition-smooth"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>

              {forgotSent ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground">
                    Reset code sent!
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Check your SMS at {forgotPhone}
                  </p>
                  <Button
                    type="button"
                    className="mt-4 w-full"
                    onClick={() => {
                      setForgotOpen(false);
                      setForgotSent(false);
                      setForgotPhone("");
                    }}
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    Enter your registered mobile number to receive reset
                    instructions.
                  </p>
                  <div className="relative mb-4">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      data-ocid="forgot_password.input"
                      type="tel"
                      placeholder="0300-1234567"
                      value={forgotPhone}
                      onChange={(e) => setForgotPhone(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      data-ocid="forgot_password.cancel_button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setForgotOpen(false)}
                    >
                      {t("common.cancel")}
                    </Button>
                    <Button
                      type="button"
                      data-ocid="forgot_password.confirm_button"
                      className="flex-1 bg-primary text-primary-foreground"
                      onClick={() => {
                        if (forgotPhone) setForgotSent(true);
                      }}
                    >
                      Send Code
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
