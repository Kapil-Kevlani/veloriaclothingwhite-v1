# Velorida Clothing — Minimal, Elegant eCommerce (2025)

A clean, premium, and mobile-first fashion storefront for Velorida Clothing. The UI is predominantly white with deep charcoal accents, sharp typography, and generous spacing that highlights the clothes over the interface.

Live (local): `http://localhost:8000`

---

## 1) Quick Start

- Prerequisites: Python 3 installed (for a static server)
- Run locally:
```bash
python -m http.server 8000
```
- Open:
  - Homepage: `http://localhost:8000`
  - Shop: `http://localhost:8000/shop.html`
  - Product: `http://localhost:8000/product.html`
  - Checkout: `http://localhost:8000/checkout.html`

Note: You may see a `GET /favicon.ico 404` in the terminal. This is harmless. Add a favicon to `/favicon.ico` to remove it.

---

## 2) Project Structure

```
veloriaclothingwhite/
├── index.html           # Homepage (dynamic hero, collections, newsletter)
├── shop.html            # Product Listing Page (filters, sort, pagination)
├── product.html         # Product Detail Page (gallery + zoom, tabs)
├── checkout.html        # One-page checkout (validated forms, summary)
│
├── styles.css           # Global design system + components + responsive
├── shop.css             # Shop-specific styles
├── product.css          # PDP-specific styles
├── checkout.css         # Checkout-specific styles
│
├── script.js            # Global interactivity (cart, gestures, animations)
├── shop.js              # Shop logic (filters, sort, pagination)
├── product.js           # PDP logic (gallery, options, tabs)
├── checkout.js          # Checkout logic (validation, totals, flow)
│
└── README.md            # This document
```

---

## 3) Design System (UI)

- Palette (CSS variables in `styles.css`):
  - `--primary-white: #fff` / `--secondary-white: #fafafa`
  - `--accent-charcoal: #2c2c2c` / `--accent-black: #1a1a1a`
  - Text: `--text-primary`, `--text-secondary`, `--text-light`
  - Lines/Shadows: `--border-light`, `--shadow-subtle|medium|strong`
- Typography:
  - Headings: Poppins (weights 300–700)
  - Body: Inter (weights 300–600)
  - Hierarchy (desktop base):
    - H1 72px, H2 40px, H3 28px, H4 20px, Body 16px
- Spacing (8px system):
  - `--space-xs/sm/md/lg/xl/2xl` (8/16/24/32/48/64px)
- Radius:
  - `--radius-sm/md/lg` (4/8/12px)
- Motion:
  - `--transition-fast|medium|slow` (0.2s/0.3s/0.5s)
  - Keyframes: `fadeInUp`, `slideInUp`, `slideInLeft/Right`, `scaleIn`, `ripple`, `bounce`

---

## 4) Visual Language & Brand

- Predominantly white canvas with subtle depth (soft shadows, semi-transparent layers, light gradients)
- Accent used sparingly (CTAs, underline accents, hover states)
- Glassmorphism touches on hero stats and overlays for premium feel
- Section titles include an animated accent line

---

## 5) Components

- Buttons
  - Primary: charcoal→black gradient, lift on hover, ripple on press
  - Outline: charcoal border, fills on hover, shimmer sweep
  - Icon: circular, scale + rotate on hover
  - Sizes: default, `.btn-large`, and `.btn-full`
- Navigation (sticky)
  - Brand at left, links with animated underline, right-aligned actions (search, wishlist, cart badges)
  - Mobile hamburger with slide/fade panel
- Cards
  - Product cards: 1:1 media, hover lift + subtle zoom, overlay quick actions, optional color dots
  - Collection cards: large media, scale on hover
- Overlays & Modals
  - Cart sidebar (slide-in), dimmer overlay
  - Image zoom modal on PDP
- Forms
  - Inputs with clear focus states, inline errors, descriptive labels

---

## 6) Pages & UX Flows

### 6.1 Home (`index.html`)
- Dynamic hero
  - Looping lifestyle video background with light gradient overlay
  - Animated H1 split into lines with staggered enter
  - Dual CTAs (Shop Collection, Watch Lookbook)
  - Stats (customers/new arrivals/rating) in semi-transparent cards
  - Scroll indicator with pulse
- Sections
  - New Arrivals grid (hover overlays, quick actions)
  - Featured Collections (two-up large imagery)
  - Newsletter sign-up (high contrast block)

### 6.2 Shop / PLP (`shop.html`)
- Filters
  - Category (checkboxes), Size, Color (swatches), Price range
  - Mobile: slide-over; Desktop: sticky sidebar
- Controls
  - Sort (featured, price, newest, name)
  - View toggles (grid/list)
- Grid
  - Mobile 1–2 cols, desktop up to 4
  - Cards with hover overlay (quick view, wishlist) and quick add
- Pagination
  - Prev/next + numeric buttons

### 6.3 Product Detail / PDP (`product.html`)
- Gallery
  - Large main image + thumbnails; swipe gestures on mobile
  - Zoom modal
- Product info
  - Title, rating, current + original price, discount chip
  - Size selector, color selector (swatches), quantity control
- Tabs: Description, Details, Reviews, Shipping
- Related products: 4-card grid (same card interactions)

### 6.4 Checkout (`checkout.html`)
- One-page checkout: Information, Shipping, Payment
- Validated form fields (blur + realtime)
- Shipping methods (radio options, accent on selection)
- Sticky order summary (desktop), inline on mobile
- Trust badges, payment icons, and secure CTA

---

## 7) Interactions & Motion (UX)

- Microinteractions
  - Buttons: lift, shimmer, ripple; icon nudge
  - Cards: lift + zoom; overlay and actions stagger in
  - Section titles: animated accent line on reveal
- Scroll-triggered entrance animations (IntersectionObserver)
- Parallax nuance on hero background overlay
- Mobile gestures
  - Swipe galleries (thumbnails advance)
  - Pull-to-refresh (simulated toast)
- Sticky CTAs on mobile
  - Appears after scrolling past hero; shows price/items placeholder

---

## 8) Accessibility (A11y)

- Color contrast curated for WCAG 2.1 AA
- Focus indicators for keyboard navigation on buttons, links, inputs
- Semantic HTML landmarks and proper heading hierarchy
- Motion preferences respected via `prefers-reduced-motion`
- Touch targets ≥ 44px on mobile-first controls

---

## 9) Performance

- Lazy image loading (`loading="lazy"`)
- CSS-only animations using transform/opacity for 60fps
- Lightweight vanilla JS; no framework required
- Fonts via Google Fonts with preconnect
- Suggested: provide WebP assets and preloading for hero media

---

## 10) State & Mock Data

- Cart and wishlist state live in `script.js` (mock)
- PLP products in `shop.js` (mock)
- PDP product in `product.js` (mock)
- Checkout uses mock cart if none is available; totals computed client-side

---

## 11) Developer Notes

- Add a `favicon.ico` to project root to remove the 404 log line
- Replace Unsplash and Vimeo demo media with brand assets
- Wire real APIs for:
  - Catalog (PLP/PDP), search, filters
  - Cart, wishlist persistence
  - Auth & checkout (payment provider)
- Consider bundling/optimizing pipeline if scaling:
  - Minify CSS/JS, inline critical CSS, HTTP/2 server push/preload

---

## 12) Roadmap (Suggested Enhancements)

- Personalization: recent views, trending-by-location, AI recommendations
- Quick preview modal on PLP with size add-to-bag
- Lookbook / Shop-the-outfit storytelling sections
- Persistent wishlist + compare
- PWA features: offline, add-to-home-screen
- Multi-language & currency support

---

## 13) Testing Checklist

- Responsive breakpoints (mobile → desktop)
- Keyboard navigation and focus order
- Reduced motion flag behavior
- Form validation (happy/sad paths)
- Cart interactions across pages
- Low bandwidth test (throttle)

---

## 14) Credits & License

- Design & development: Velorida Clothing (2025)
- Fonts: Google Fonts (Poppins, Inter)
- Icons: Font Awesome
- Media: Placeholder demo assets (replace with brand content)
- License: All rights reserved for Velorida Clothing
