# Lakhany Silk Mills (Pvt) Ltd — Developer Documentation

Welcome to the technical developer documentation for the **Lakhany Silk Mills (Pvt) Ltd** corporate web platform. This document outlines the system architecture, file organization, UI components, styling design tokens, local server lifecycle, and maintenance guide.

---

## 1. Project Overview

- **Client / Business:** Lakhany Silk Mills (Pvt) Ltd
- **Location:** Metroville, SITE Industrial Area, Karachi, Pakistan (Plus Code: `W2F7+JMH`)
- **Heritage:** Integrated textile processing mill established in 1952 (Rotary Printing, Mercerizing, Stenter Finishing, Lawn & Silk Weaving)
- **Application Type:** High-performance, luxury corporate showcase & export inquiries landing page
- **Primary Objectives:**
  - Present authentic textile lines (*Pure Silk, 80s Digital Lawn, Zari Jacquard, Chiffon*) with technical specs.
  - Provide an interactive silk ribbon canvas simulation without third-party heavy 3D engines.
  - Empower international export buyers with an instantaneous yardage/weight/container calculator.
  - Facilitate direct sample swatch requests and wholesale RFQs to the Karachi sales desk.

---

## 2. Technology Stack

| Layer | Technology | Rationale / Details |
|---|---|---|
| **Structure** | Semantic HTML5 | Clean SEO hierarchy, meta tags, OpenGraph attributes, accessible buttons. |
| **Styling** | Vanilla CSS3 (Custom Design System) | Zero bulky framework overhead (No Tailwind / Bootstrap dependencies). Native CSS variables, glassmorphism, responsive grid & flexbox. |
| **Interactivity** | Vanilla ES6+ JavaScript | Lightweight DOM manipulation, 60fps HTML5 Canvas math simulation, event delegation. |
| **Icons** | [Lucide Icons](https://lucide.dev) | Modern SVG iconography loaded via lightweight CDN script (`lucide.createIcons()`). |
| **Typography** | Google Fonts | Luxury Editorial Serif: `Cinzel` & `Playfair Display`; Sans-serif UI: `Plus Jakarta Sans`. |
| **Server** | Node.js Core HTTP (`server.js`) | Standalone zero-dependency HTTP static server with custom MIME dispatch on port `3457`. |

---

## 3. Directory & File Structure

```text
c:\Users\syedm\Desktop\Lakhany Silk\
│
├── DEVELOPER_DOCUMENTATION.md # Developer guide and system manual
├── index.html                 # Main semantic markup document for the entire platform
├── style.css                  # Complete design system tokens, typography, layouts & animations
├── app.js                     # Interactive scripts (Canvas ribbons, filters, modals, calculator)
├── server.js                  # Node.js zero-dependency local static file server
│
└── assets/                    # High-resolution optimized photographic assets
    ├── hero-silk.jpg              # Hero luxury ivory silk twill photography
    ├── catalog-rolls.jpg          # Pure Mulberry Silk fabric roll inventory
    ├── lawn-fabric.jpg            # High-density 80s/80s digital printed floral lawn
    ├── jacquard-fabric.jpg        # Golden metallic zari brocade floral jacquard
    ├── chiffon-fabric.jpg         # Ethereal flowing sheer silk chiffon waves
    ├── mill-facility.jpg          # Karachi SITE rotary & stenter processing floor
    └── dispatch-erp.jpg           # Warehouse & logistics facility imagery
```

---

## 4. Key Components Breakdown

### 4.1 Header & Navigation (`#mainHeader`)
- **Sticky Luxury Header:** Positioned sticky at `top: 0` with backdrop blur (`backdrop-filter: blur(16px)`).
- **Brand Crest:** Scalable inline SVG crest badge containing imperial gold gradient defs (`#goldGradient`).
- **Single-Line Non-Wrapping Bar:** Uses `flex-wrap: nowrap`, `justify-content: space-between`, and auto spacing to prevent layout shifts.
- **Mobile Menu Toggle:** Responsive hamburger button (`#mobileMenuBtn`) with dynamic toggle handling.

### 4.2 Hero Section (`#hero`)
- **Canvas Waves (`#silkCanvas`):** An animated HTML5 2D canvas computing 6 distinct harmonic sine waves with variable phase shifts, amplitudes, and subtle cursor tracking.
- **KPI Metrics Grid:** 4-column metric highlights (150K+ daily meters, 70+ years heritage, 100% 4-point QC, 25+ export markets).
- **Showcase Window Card:** Glassmorphic macOS-styled chrome header framing hero fabric photography with floating trust chips.

### 4.3 Textile Collections Showcase (`#collections`)
- **Category Filter Tabs (`.catalog-filter-bar`):** Dynamic filtering (`all`, `silk`, `lawn`, `jacquard`, `chiffon`) executed purely through dataset attributes (`data-category`).
- **Fabric Cards Grid (`.catalog-grid`):** 4-column CSS Grid displaying product cards with:
  - High-res fabric photography with zoom hover effects (`transform: scale(1.08)`).
  - Technical specs badge: GSM, width in inches, weave pattern, and yarn count.
  - Interactive triggers: Swatch request modal trigger (`.btn-sample`) and technical specs toast (`.btn-details`).

### 4.4 Manufacturing Infrastructure (`#manufacturing`)
- **6-Stage Manufacturing Flow:** Interactive timeline illustrating Karachi plant processing:
  1. Greige Fabric Sourcing & Inspection
  2. Pre-treatment & Caustic Mercerizing
  3. Precision Printing & Dyeing (16-color rotary lines)
  4. Monforts Stenter Heat-Setting & Calendaring
  5. 4-Point Defect QC & Grading
  6. Export Packaging & Port Dispatch

### 4.5 Export Yardage & Container Estimator (`#calculator`)
- **Reactive Formula Calculations:**
  - $\text{Total Rolls} = \lceil \frac{\text{Order Meters}}{\text{Roll Standard Length}} \rceil$
  - $\text{Total Weight (Kg)} = \frac{\text{Order Meters} \times \text{Width (Meters)} \times \text{GSM}}{1000}$
  - $\text{20ft FCL Container Utilization} = \frac{\text{Weight (Kg)}}{10800}$
- Updates values live as users adjust fabric type, meters, or width.

### 4.6 Contact & Direct Wholesale Inquiries (`#contact`)
- **Mill Headquarters Card:** Direct PTCL line, Metroville plant address, and Google Plus Code.
- **Wholesale Inquiry Form (`#contactForm`):** Form inputs for buyer name, company, WhatsApp number, email, fabric selection, and meterage targets with instant notification toast validation.

---

## 5. Design System & CSS Tokens

All core styles are centralized in `style.css` under the `:root` pseudo-class:

```css
:root {
  /* Silk & Ivory Background Palette */
  --bg-primary: #fcfbf8;
  --bg-secondary: #f6f2e9;
  --bg-tertiary: #f0ebe0;
  --bg-white: #ffffff;
  --bg-card: rgba(255, 255, 255, 0.92);

  /* Deep Silk Navy Typography */
  --text-primary: #112538;
  --text-secondary: #3b5066;
  --text-muted: #6b7f94;

  /* Imperial Gold Accents */
  --gold-50: #fbf8ee;
  --gold-100: #f6efd5;
  --gold-400: #dfb743;
  --gold-500: #c59b27;
  --gold-600: #a7801a;
  --gold-gradient: linear-gradient(135deg, #dfb743 0%, #c59b27 50%, #967014 100%);
  --gold-glow: rgba(197, 155, 39, 0.22);
  --gold-border: rgba(197, 155, 39, 0.28);

  /* Typography */
  --font-serif: 'Cinzel', 'Playfair Display', Georgia, serif;
  --font-editorial: 'Playfair Display', serif;
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}
```

---

## 6. Local Development & Deployment

### Running Locally
To run the local preview server:

```powershell
# Navigate to the workspace directory
cd "c:\Users\syedm\Desktop\Lakhany Silk"

# Start the Node.js server
node server.js
```

The application will be accessible at:
```text
http://localhost:3457
```

### Static Hosting
Because the project contains pure vanilla assets with zero build steps, it can be deployed directly to any static web hosting platform (e.g., Cloudflare Pages, Vercel, Netlify, AWS S3 / CloudFront, or Apache/Nginx web servers).

---

## 7. Maintenance & Extensibility Guide

1. **Adding a New Fabric Card:**
   - Add a new `.fabric-card` in `index.html` inside `#catalogGrid`.
   - Set the `data-category` attribute to match one of the filter buttons.
   - Insert an optimized 4:3 image inside `assets/`.
2. **Modifying Calculator Constants:**
   - Open `app.js` and locate `initExportCalculator()`.
   - Adjust the GSM values in the `<select id="calcFabricType">` or container volume divisor (`10800`).
3. **Updating Contact Details:**
   - Search for `32560014` in `index.html` to update phone numbers or links.
