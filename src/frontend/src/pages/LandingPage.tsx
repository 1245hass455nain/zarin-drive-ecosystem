import {
  Bike,
  Car,
  CreditCard,
  Crown,
  Gauge,
  MapPin,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { LanguageToggle } from "../components/LanguageToggle";
import { ThemeToggle } from "../components/ThemeToggle";
import { useTranslation } from "../i18n/useTranslation";
import { useAppStore } from "../stores/appStore";

function navigate(app: string) {
  window.dispatchEvent(new CustomEvent("zarin-navigate", { detail: { app } }));
}

// --- Animated Background ---
function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const particles: {
      x: number;
      y: number;
      r: number;
      dx: number;
      dy: number;
      o: number;
      do: number;
    }[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initParticles() {
      if (!canvas) return;
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2 + 0.5,
          dx: (Math.random() - 0.5) * 0.4,
          dy: -(Math.random() * 0.5 + 0.2),
          o: Math.random() * 0.6 + 0.1,
          do: (Math.random() - 0.5) * 0.005,
        });
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        p.o += p.do;
        if (p.o <= 0.05 || p.o >= 0.7) p.do *= -1;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) {
          p.dx *= -1;
        }
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// --- App Entry Card ---
interface AppCardProps {
  section: "customer" | "driver" | "admin";
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  variant: "gold" | "dark" | "premium";
  badge?: string;
  delay?: number;
  enterLabel: string;
}

function AppCard({
  section,
  title,
  subtitle,
  description,
  icon,
  variant,
  badge,
  delay = 0,
  enterLabel,
}: AppCardProps) {
  const cardStyles = {
    gold: {
      bg: "bg-gradient-to-br from-[oklch(0.65_0.22_90)] to-[oklch(0.55_0.18_75)]",
      text: "text-[oklch(0.08_0_0)]",
      subtext: "text-[oklch(0.15_0_0)]",
      border: "border-[oklch(0.65_0.22_90)]",
      glow: "shadow-[0_0_40px_oklch(0.65_0.22_90/0.4)]",
      iconBg: "bg-[oklch(0.08_0_0/0.15)]",
      btnBg:
        "bg-[oklch(0.08_0_0)] text-[oklch(0.65_0.22_90)] hover:bg-[oklch(0.15_0_0)]",
    },
    dark: {
      bg: "bg-gradient-to-br from-[oklch(0.16_0_0)] to-[oklch(0.12_0_0)]",
      text: "text-[oklch(0.95_0_0)]",
      subtext: "text-[oklch(0.7_0_0)]",
      border: "border-[oklch(0.65_0.22_90/0.4)]",
      glow: "shadow-[0_0_40px_oklch(0_0_0/0.6)]",
      iconBg: "bg-[oklch(0.65_0.22_90/0.1)]",
      btnBg:
        "bg-[oklch(0.65_0.22_90/0.15)] text-[oklch(0.65_0.22_90)] border border-[oklch(0.65_0.22_90/0.4)] hover:bg-[oklch(0.65_0.22_90/0.25)]",
    },
    premium: {
      bg: "bg-gradient-to-br from-[oklch(0.18_0.03_280)] to-[oklch(0.12_0_0)]",
      text: "text-[oklch(0.95_0_0)]",
      subtext: "text-[oklch(0.7_0_0)]",
      border: "border-[oklch(0.65_0.22_90/0.6)]",
      glow: "shadow-[0_0_50px_oklch(0.65_0.22_90/0.2),0_0_100px_oklch(0.18_0.03_280/0.4)]",
      iconBg: "bg-[oklch(0.65_0.22_90/0.15)]",
      btnBg:
        "bg-gradient-to-r from-[oklch(0.65_0.22_90)] to-[oklch(0.55_0.18_75)] text-[oklch(0.08_0_0)] hover:opacity-90",
    },
  };

  const s = cardStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04, y: -8 }}
      data-ocid={`landing.${section}_card`}
      className={`relative flex flex-col rounded-2xl border ${s.border} ${s.bg} ${s.glow} p-8 cursor-pointer group transition-smooth overflow-hidden`}
      onClick={() => navigate(section)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(section)}
      aria-label={`Open ${title}`}
    >
      {/* Decorative gradient orb */}
      <div
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.22 90), transparent)",
        }}
      />

      {badge && (
        <span className="absolute top-4 right-4 text-xs font-bold tracking-widest uppercase bg-[oklch(0.65_0.22_90/0.15)] text-[oklch(0.65_0.22_90)] border border-[oklch(0.65_0.22_90/0.3)] rounded-full px-3 py-1">
          {badge}
        </span>
      )}

      <div
        className={`w-16 h-16 rounded-2xl ${s.iconBg} flex items-center justify-center mb-6`}
      >
        {icon}
      </div>

      <h2 className={`text-2xl font-bold font-display ${s.text} mb-1`}>
        {title}
      </h2>
      <p
        className={`text-sm font-semibold uppercase tracking-widest ${s.subtext} mb-4 opacity-80`}
      >
        {subtitle}
      </p>
      <p
        className={`text-sm ${s.subtext} opacity-70 mb-8 leading-relaxed flex-1`}
      >
        {description}
      </p>

      <button
        type="button"
        className={`w-full rounded-xl py-3 text-sm font-bold transition-smooth ${s.btnBg}`}
        onClick={(e) => {
          e.stopPropagation();
          navigate(section);
        }}
        data-ocid={`landing.${section}_enter_button`}
      >
        {enterLabel}
      </button>
    </motion.div>
  );
}

// --- Feature Highlight ---
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay?: number;
}

function Feature({ icon, title, desc, delay = 0 }: FeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center gap-3 text-center px-4"
    >
      <div className="w-12 h-12 rounded-full bg-[oklch(0.65_0.22_90/0.12)] border border-[oklch(0.65_0.22_90/0.25)] flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-sm font-bold text-[oklch(0.9_0_0)]">{title}</h3>
      <p className="text-xs text-[oklch(0.6_0_0)] leading-relaxed max-w-[140px]">
        {desc}
      </p>
    </motion.div>
  );
}

// --- Main Landing Page ---
export default function LandingPage() {
  const { language } = useAppStore();
  const { t } = useTranslation();

  const isUrdu = language === "ur";

  // Suppress unused warning — t is available for other sections
  void t;

  const tagline = isUrdu
    ? "گوادر میں پاکستان کا بہترین رائیڈ بکنگ پلیٹ فارم"
    : "Pakistan's Premier Ride-Booking Platform";

  const features = [
    {
      icon: <Zap className="w-5 h-5 text-primary" />,
      title: isUrdu ? "فوری پک اپ" : "Fast Pickups",
      desc: isUrdu ? "چند منٹوں میں ڈرائیور" : "Driver arrives in minutes",
    },
    {
      icon: <MapPin className="w-5 h-5 text-primary" />,
      title: isUrdu ? "لائیو ٹریکنگ" : "Live Tracking",
      desc: isUrdu ? "ریئل ٹائم روٹ اپ ڈیٹ" : "Real-time route updates",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
      title: isUrdu ? "محفوظ سفر" : "Safe Rides",
      desc: isUrdu ? "تصدیق شدہ ڈرائیور" : "Verified drivers only",
    },
    {
      icon: <CreditCard className="w-5 h-5 text-primary" />,
      title: isUrdu ? "متعدد ادائیگی" : "Easy Payment",
      desc: isUrdu ? "کیش، والٹ، JazzCash" : "Cash, Wallet, JazzCash",
    },
  ];

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: "oklch(0.08 0 0)" }}
      dir={isUrdu ? "rtl" : "ltr"}
    >
      <GoldParticles />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.65 0.22 90 / 0.06) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />

      {/* Header */}
      <header
        className="relative z-10 flex items-center justify-between px-6 py-4 border-b"
        style={{
          borderColor: "oklch(0.65 0.22 90 / 0.12)",
          background: "oklch(0.08 0 0 / 0.85)",
          backdropFilter: "blur(12px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg font-display"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.22 90), oklch(0.50 0.16 75))",
              color: "oklch(0.08 0 0)",
            }}
          >
            Z
          </div>
          <div>
            <span
              className="font-display font-bold text-lg leading-none"
              style={{ color: "oklch(0.65 0.22 90)" }}
            >
              Zarin
            </span>
            <span
              className="font-display font-light text-lg leading-none ml-1"
              style={{ color: "oklch(0.85 0 0)" }}
            >
              Drive
            </span>
          </div>
        </motion.div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center px-6 pt-16 pb-8">
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 relative"
        >
          <div
            className="w-28 h-28 rounded-3xl flex items-center justify-center font-black text-6xl font-display relative"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.22 90), oklch(0.50 0.16 75))",
              boxShadow:
                "0 0 60px oklch(0.65 0.22 90 / 0.5), 0 0 120px oklch(0.65 0.22 90 / 0.2)",
              color: "oklch(0.08 0 0)",
            }}
          >
            Z
          </div>
          {/* Pulsing ring */}
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-3xl border-2"
            style={{ borderColor: "oklch(0.65 0.22 90 / 0.5)" }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-center mb-4"
          style={{ color: "oklch(0.65 0.22 90)" }}
        >
          Zarin Drive
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-base sm:text-lg text-center max-w-md mb-3 font-display"
          style={{ color: "oklch(0.75 0 0)" }}
        >
          {tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-2 mb-14"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span
            className="text-xs font-mono"
            style={{ color: "oklch(0.65 0 0)" }}
          >
            {isUrdu ? "گوادر، بلوچستان" : "Gwadar, Balochistan, Pakistan"}
          </span>
        </motion.div>

        {/* App Cards */}
        <div
          className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          data-ocid="landing.cards_section"
        >
          <AppCard
            section="customer"
            title="Zarin Drive"
            subtitle={isUrdu ? "کسٹمر ایپ" : "Customer App"}
            description={
              isUrdu
                ? "گوادر میں کہیں بھی فوری رائیڈ بک کریں۔ بائیک، رکشہ، کار یا پریمیم — آپ کی پسند۔"
                : "Book instant rides anywhere in Gwadar. Choose from Bike, Rickshaw, Standard Car, or Premium."
            }
            icon={
              <Car className="w-8 h-8" style={{ color: "oklch(0.08 0 0)" }} />
            }
            variant="gold"
            delay={0.1}
            enterLabel={isUrdu ? "رائیڈ بک کریں →" : "Book a Ride →"}
          />
          <AppCard
            section="driver"
            title="Zarin Pro"
            subtitle={isUrdu ? "ڈرائیور ایپ" : "Driver App"}
            description={
              isUrdu
                ? "آن لائن ہوں، رائیڈز قبول کریں اور روزانہ کمائیں۔ گولڈ، ڈائمنڈ، پلاٹینم رینک سسٹم۔"
                : "Go online, accept rides, and maximize daily earnings. Gold, Diamond & Platinum rank rewards."
            }
            icon={
              <Gauge
                className="w-8 h-8"
                style={{ color: "oklch(0.65 0.22 90)" }}
              />
            }
            variant="dark"
            badge={isUrdu ? "ڈرائیور" : "DRIVERS"}
            delay={0.2}
            enterLabel={isUrdu ? "کمائی شروع کریں →" : "Start Earning →"}
          />
          <AppCard
            section="admin"
            title="Zarin CEO"
            subtitle={isUrdu ? "ایڈمن پینل" : "Admin Panel"}
            description={
              isUrdu
                ? "مکمل کنٹرول: لائیو ڈرائیور مانیٹرنگ، والٹ، رپورٹس اور پورے پلیٹ فارم کا انتظام۔"
                : "Full control: live driver monitoring, wallet management, analytics, and platform oversight."
            }
            icon={
              <Crown
                className="w-8 h-8"
                style={{ color: "oklch(0.65 0.22 90)" }}
              />
            }
            variant="premium"
            badge={isUrdu ? "ایڈمن" : "ADMIN"}
            delay={0.3}
            enterLabel={isUrdu ? "کنٹرول سینٹر →" : "Control Center →"}
          />
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl"
          data-ocid="landing.features_section"
        >
          <div
            className="rounded-2xl border p-8"
            style={{
              borderColor: "oklch(0.65 0.22 90 / 0.15)",
              background: "oklch(0.12 0 0 / 0.7)",
              backdropFilter: "blur(12px)",
            }}
          >
            <p
              className="text-center text-xs font-bold uppercase tracking-widest mb-8"
              style={{ color: "oklch(0.65 0.22 90)" }}
            >
              {isUrdu ? "ہماری خصوصیات" : "Why Zarin Drive"}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <Feature
                  key={f.title}
                  icon={f.icon}
                  title={f.title}
                  desc={f.desc}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Vehicle types strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mt-10 mb-4"
          data-ocid="landing.vehicles_strip"
        >
          {[
            {
              icon: <Bike className="w-4 h-4" />,
              label: isUrdu ? "بائیک" : "Bike",
              price: "Rs. 80",
            },
            {
              icon: <Car className="w-4 h-4" />,
              label: isUrdu ? "رکشہ" : "Rickshaw",
              price: "Rs. 120",
            },
            {
              icon: <Car className="w-4 h-4" />,
              label: isUrdu ? "کار" : "Standard Car",
              price: "Rs. 150",
            },
            {
              icon: <Crown className="w-4 h-4" />,
              label: isUrdu ? "پریمیم" : "Premium Car",
              price: "Rs. 250",
            },
          ].map((v) => (
            <div
              key={v.label}
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs"
              style={{
                borderColor: "oklch(0.65 0.22 90 / 0.2)",
                background: "oklch(0.12 0 0 / 0.6)",
                color: "oklch(0.75 0 0)",
              }}
            >
              <span style={{ color: "oklch(0.65 0.22 90)" }}>{v.icon}</span>
              <span>{v.label}</span>
              <span
                className="font-bold"
                style={{ color: "oklch(0.65 0.22 90)" }}
              >
                {v.price}
              </span>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 text-center py-6 border-t"
        style={{
          borderColor: "oklch(0.65 0.22 90 / 0.1)",
          color: "oklch(0.5 0 0)",
        }}
      >
        <p className="text-xs">
          {isUrdu
            ? "زرین ڈرائیو | گوادر، بلوچستان، پاکستان"
            : "Powered by Zarin Drive | Gwadar, Balochistan, Pakistan"}
          {" · "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-smooth"
          >
            Built with caffeine.ai
          </a>
        </p>
        <p className="text-xs mt-1" style={{ color: "oklch(0.4 0 0)" }}>
          © {new Date().getFullYear()} Zarin Drive.{" "}
          {isUrdu ? "تمام حقوق محفوظ ہیں۔" : "All rights reserved."}
        </p>
      </footer>
    </div>
  );
}
