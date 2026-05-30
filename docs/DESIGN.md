# Design System: Nâu Coffee

## 1. Visual Theme & Atmosphere

A warm, moody, gallery-airy interface with confident asymmetric layouts and restrained cinematic motion. The atmosphere evokes a dimly-lit specialty coffee bar — deep espresso wood surfaces, golden caramel light filtering through, cream-colored ceramic. Every surface feels tactile and lived-in, not sterile or digitally cold.

**Design Read:** Premium-consumer coffee brand website for design-conscious coffee enthusiasts, with a warm editorial language, leaning toward dark-mode-locked + GSAP scroll choreography + distinctive serif display.

**Dials:**
- `DESIGN_VARIANCE: 7` — Confident asymmetry, not chaotic
- `MOTION_INTENSITY: 6` — Fluid scroll reveals and spring-physics hover, no gratuitous loops
- `VISUAL_DENSITY: 3` — Gallery-airy, generous whitespace, content breathes

## 2. Color Palette & Roles

All colors sourced from brand identity kit — no deviation.

- **Espresso Dark** (#1A1208) — Primary background surface. The dominant canvas. Near-black with warm undertone
- **Coffee Surface** (#2D2418) — Card and container fill. Elevated surfaces, navbar background
- **Warm Stone** (#8A7E6E) — Secondary text, descriptions, metadata, borders, dividers
- **Caramel Gold** (#C4903D) — Single accent for CTAs, active states, focus rings, logo highlight. Saturation ~72%
- **Cream Ivory** (#F5ECD7) — Primary text on dark backgrounds. Headlines, body text, navigation labels

**Accent rule:** Caramel Gold is the ONLY accent. No secondary accent. No gradient variations. Lock it across every section.

**Banned:**
- Pure black (#000000) — always use Espresso Dark (#1A1208)
- AI Purple / Blue neon — not relevant to this brand
- Warm beige backgrounds (#f5f1ea, #faf7f1) — this is a DARK MODE LOCKED site. No light sections
- Cool grays — warm undertone throughout, never Zinc or Slate

## 3. Typography Rules

From brand identity kit:

- **Display / Headlines:** DM Serif Display — Elegant, editorial serif justified by the genuine artisan/café heritage of this brand. Track-normal, controlled scale, weight-driven hierarchy. NOT a generic serif — DM Serif Display has distinctive ball terminals and high contrast strokes that evoke letterpress coffee packaging.
- **Body:** Outfit — Clean geometric sans-serif. Relaxed leading (1.7), 65ch max-width for reading comfort. Weight 300 for body, 500 for emphasis, 600 for buttons/labels.
- **Labels / Mono:** Outfit Medium — For navigation, buttons, category labels, prices. Uppercase with wide tracking (0.08em-0.12em) for small text.

**Scale:**
- Display Large: DM Serif Display, clamp(2.5rem, 5vw, 4rem), line-height 1.1
- Display Medium: DM Serif Display, clamp(2rem, 4vw, 3rem), line-height 1.15
- Heading: DM Serif Display, clamp(1.5rem, 3vw, 2rem), line-height 1.2
- Body: Outfit 300, clamp(0.95rem, 1.2vw, 1.125rem), line-height 1.7
- Label: Outfit 500, 0.75rem, uppercase, tracking 0.1em
- Price: Outfit 600, 1.125rem

**Banned:** Inter, generic system fonts, Fraunces, Instrument Serif, Stigma (not in brand kit).

## 4. Component Stylings

### Buttons
- **Primary CTA:** Caramel Gold (#C4903D) fill, Espresso Dark (#1A1208) text. Rounded 8px. Outfit 600, 0.875rem, uppercase, tracking 0.08em. On hover: lighten to #D4A85C, translateY(-2px), soft caramel glow shadow. On active: translateY(0), scale(0.98) for tactile push.
- **Secondary / Outline:** Transparent fill, 1.5px Warm Stone border, Cream text. On hover: border becomes Caramel Gold, text becomes Caramel Gold, translateY(-2px).
- **Ghost links:** No border, Caramel Gold text, underline-offset animation on hover.
- Max 1 primary CTA per section. Label max 3 words.

### Cards
- Background: Coffee Surface (#2D2418). Border: 1px rgba(168,153,126,0.1). Rounded 16px.
- On hover: translateY(-4px), shadow 0 4px 24px rgba(0,0,0,0.3), border-color shifts to rgba(196,144,61,0.2).
- Image inside cards: object-fit cover, 0 border-radius on top, card radius on bottom.
- Cards used ONLY when elevation communicates hierarchy (menu items, gallery). Otherwise use border-top dividers or negative space.

### Navigation
- Fixed top, transparent → Coffee Surface on scroll. Height: 72px desktop, 64px mobile.
- Logo left (Nâu script + icon mark). Links center: Outfit Medium, 0.8125rem, uppercase, tracking 0.08em, Cream Ivory text.
- CTA button right: Caramel Gold fill, compact padding.
- Mobile: hamburger icon, fullscreen overlay menu with staggered reveal.

### Inputs / Forms
- Label above input (Outfit Medium, 0.75rem, uppercase, tracking 0.08em, Warm Stone color).
- Input: Coffee Surface fill, 1px Warm Stone border, Cream text, rounded 8px, padding 0.875rem 1rem.
- Focus: border becomes Caramel Gold, soft glow ring.
- Error: #C44D3D text below input.
- No floating labels. No placeholder-as-label.

### Loading States
- Skeletal shimmer matching exact layout dimensions. Shimmer gradient from Coffee Surface to Espresso Dark.
- No circular spinners.

### Empty States
- Composed composition with DM Serif Display heading + Outfit body + relevant illustration or icon.

## 5. Layout Principles

- **Dark mode locked.** Every section uses the Espresso Dark → Coffee Surface spectrum. No light sections mid-page.
- **Grid-first.** CSS Grid for multi-column layouts. No flexbox percentage math.
- **Max-width containment:** 72rem (1152px) centered with 1.5rem mobile padding, 2.5rem desktop.
- **Section spacing:** clamp(3.5rem, 8vw, 6rem) vertical gap between sections.
- **Hero:** Asymmetric or left-aligned content, NOT centered (variance 7). Full-viewport with background image. Content positioned left or with split layout.
- **Feature sections:** No 3-equal-column card grids. Use 2-column zig-zag, asymmetric grid (wide + narrow), or horizontal scroll for menu categories.
- **Mobile collapse:** All multi-column layouts → single column below 768px. No exceptions.
- **Full-height sections:** Use min-h-[100dvh], never h-screen.
- **Section-Layout-Repetition Ban:** Each section uses a different layout family. Max 2 consecutive image+text splits.

## 6. Hero Section

- Full viewport height, background image (moody coffee photography with B&W or desaturated treatment + warm overlay).
- Content left-aligned or asymmetric split (NOT centered — variance 7).
- Headline: DM Serif Display, 2 lines max. Example: "Khoảnh khắc / của sự tinh tế."
- Subtext: Outfit 300, max 20 words. Warm Stone color.
- 1 primary CTA: "Khám Phá Menu" or "Khám Phá" — Caramel Gold button.
- No secondary CTA in hero. No "scroll to explore" text. No bouncing arrows.
- Gradient overlay: linear-gradient from rgba(26,18,8,0.85) to rgba(26,18,8,0.3) — ensures text readability over image.

## 7. Motion & Interaction

- **Engine:** GSAP + ScrollTrigger for scroll-based choreography. Lenis for smooth scroll inertia.
- **Scroll reveal:** Staggered fade-up (opacity 0→1, translateY 30px→0) with 0.06s delay between siblings. Triggered once on viewport entry.
- **Spring physics:** For interactive elements — stiffness: 100, damping: 20. Premium weighty feel.
- **Page transitions:** Fade between routes, 300ms.
- **Hover states:** Cards lift (translateY -4px). Buttons lift (translateY -2px). Images subtle scale(1.05) with overflow hidden.
- **Performance:** Animate ONLY transform and opacity. No top/left/width/height animation. Grain overlay on fixed pseudo-element only.
- **Reduced motion:** All motion collapses to instant under prefers-reduced-motion.
- **Perpetual loops:** None by default. Status indicators only if needed (order tracking).
- **Marquee:** Max 1 per page if used at all.
- **Every animation must be motivated** — hierarchy, storytelling, feedback, or state transition. No "looked cool" animations.

## 8. Image Strategy

- **Hero:** Real moody coffee photography. Desaturated/B&W treatment with warm color grade overlay. Full bleed.
- **Menu items:** Square or 4:3 ratio. Warm lighting, shallow depth of field. Dark background in photos.
- **Gallery:** Mix of landscape and portrait shots. Masonry or staggered grid.
- **About:** Environmental portraits, workspace shots, raw coffee beans.
- **All images:** Warm color temperature. Low-key lighting. Never bright/clinical.
- **No placeholder divs.** Generate real images or use picsum.photos with appropriate seeds.

## 9. Anti-Patterns (Banned)

- No emojis anywhere in UI
- No Inter font
- No pure black (#000000)
- No neon / outer glow shadows
- No oversaturated accents
- No gradient text on headers
- No custom mouse cursors
- No overlapping elements
- No 3-column equal card layouts
- No generic names ("John Doe", "Acme")
- No fake round numbers
- No AI copywriting clichés ("Elevate", "Seamless", "Unleash", "Next-Gen")
- No filler UI text: "Scroll to explore", "Swipe down", scroll arrows, bouncing chevrons
- No centered hero (variance 7)
- No light/white sections mid-page (dark mode locked)
- No DM Serif Display + Libre Franklin pairing (brand specifies Outfit)
- No Stigma font (not in brand identity kit)
- No broken image links
- No section theme inversions
- No split-header pattern (left headline + right explainer)
- No eyebrow on every section (max 1 per 3 sections)

## 10. Responsive Rules

- **Mobile-first collapse (<768px):** All multi-column → single column
- **No horizontal scroll on mobile**
- **Typography scaling:** Headlines via clamp(). Body minimum 0.95rem
- **Touch targets:** All interactive elements minimum 44px
- **Navigation:** Desktop horizontal → mobile hamburger + fullscreen overlay
- **Section spacing:** Reduces via clamp(3.5rem, 8vw, 6rem)
- **Hero:** Image remains full-bleed, content stacks vertically
- **Cards:** Full-width on mobile, no side padding squeeze
