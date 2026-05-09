# Design Brief — Zarin Drive Ecosystem

## Purpose & Emotional State
Professionals and customers seeking premium, safe, and efficient mobility in Gwadar. Drivers seeking transparent earning platforms. Admins managing real-time operations.

## Tone & Aesthetic
Luxury + modern tech. Disciplined geometry, gold accents on black authority, white for clarity. Dark mode primary. No decoration without purpose. Restrained, confident motion.

## Differentiation
Three-app unified ecosystem (Customer/Driver/Admin) with shared gold/black/white tokens. Maps as centerpiece. Real-time status visibility across all roles. Financial transparency (earnings, commissions, wallet).

## Color Palette

| Role            | OKLCH            | Purpose                           |
| --------------- | ---------------- | --------------------------------- |
| Primary (Gold)  | 0.65 0.22 90     | CTAs, highlights, active states   |
| Secondary       | 0.15 0 0         | Black authority, strong emphasis  |
| Background      | 0.11 0 0 (dark)  | Main canvas                       |
| Card            | 0.16 0 0 (dark)  | Elevated content containers       |
| Foreground      | 0.95 0 0         | Primary text                      |
| Muted           | 0.25 0 0         | Secondary text, inactive          |
| Success         | 0.70 0.16 142    | Confirmations, accepted rides     |
| Destructive     | 0.62 0.19 25     | Alerts, cancellations             |

## Typography

| Role    | Font            | Usage                  |
| ------- | --------------- | ---------------------- |
| Display | Space Grotesk   | Headings, branding     |
| Body    | General Sans    | Content, UI labels     |
| Mono    | JetBrains Mono  | Earnings, codes, data  |

## Structural Zones

| Zone       | Treatment                                      |
| ---------- | ---------------------------------------------- |
| Header     | bg-card border-b, elevated shadow-card         |
| Sidebar    | bg-card, subtle vertical rhythm                |
| Map        | bg-background, centered, full bleed            |
| Content    | bg-background, cards on muted/10%              |
| Modals     | bg-popover, shadow-elevated, gold ring focus   |
| Footer     | bg-card/50%, border-t, muted text              |

## Shape Language
- Border radius: 0.75rem (12px) — geometric, not playful
- No sharp corners on interactive elements
- Consistent 16px spacing base

## Elevation & Depth
- Layers: background < card < popover (z-hierarchy)
- Shadows: card (subtle), elevated (prominent for modals)
- Gold glow: shadow-gold on primary buttons, 0.3 opacity

## Component Patterns
- Buttons: primary (gold bg, black text), secondary (transparent, gold border), destructive (red bg)
- Cards: bg-card, border-border/30%, padding-4, shadow-card
- Inputs: bg-input, border-border, focus:ring-2 ring-primary
- Badges: inline-flex, gap-1, px-2 py-1, rounded-md, bg-muted/30

## Motion
- Transitions: all 0.3s ease-out (--transition-smooth)
- Entrance: slide-in-bottom (modals, toasts)
- Feedback: pulse-gold on active CTAs
- Maps: instant pan/zoom, no easing on data updates
- Ride status: fade-in-out for state changes

## Constraints
- No raw hex colors — all tokens via CSS variables
- No arbitrary Tailwind classes — only semantic tokens
- Accessibility: AA+ contrast (L diff ≥ 0.45 on focus states)
- Dark mode only for core apps; light mode for admin reports
- Max 3 levels of nesting in shadows/effects

## Signature Detail
Gold gradient accent on prominent ride request cards and primary CTAs. Smooth gold pulse on wallet balance updates. Map icons scale smoothly on hover. Ride status progression uses gold → success → neutral color shift.

## Fonts
- @font-face: Space Grotesk (400–700), General Sans (400–700), JetBrains Mono (400–700)
- Served from /assets/fonts/ with font-display: swap

## Mode Support
- Dark mode: primary (default, luxury experience)
- Light mode: available via theme toggle, same tokens with adjusted lightness
- Root-level class toggle: html.dark { --background: 0.11 0 0; ... }

## Custom Utilities
- `.gradient-gold`: bg-gradient-to-r from-accent to-accent/70
- `.shadow-elevated`: 0 20px 25px -5px rgba(0, 0, 0, 0.15)
- `.shadow-card`: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- `.transition-smooth`: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- `.animate-pulse-gold`: pulse-gold 2s infinite
- `.animate-slide-in-bottom`: slide-in-bottom 0.3s ease-out
