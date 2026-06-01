# Design System: Nâu Coffee — Specialty Coffee Brand

## 1. Visual Theme & Atmosphere
A brooding, atmospheric specialty coffee sanctuary. The space feels like walking into a dimly-lit roastery at golden hour — deep charcoal surfaces absorb ambient light, while a single warm terracotta accent traces every intentional touchpoint. The density is Art Gallery Airy (3/10) with confident asymmetric layouts (Variance 8/10) and fluid spring-physics motion (Motion 7/10). Every surface whispers craft, not commerce.

**Design Philosophy:** "The Quiet Ritual" — each section is a slow reveal, never a sales pitch. Whitespace is a luxury material. The interface should feel like a well-curated coffee tasting, not a menu board.

## 2. Color Palette & Roles
- **Deep Roast** (#14110e) — Primary background surface. Near-black with warm undertone, NOT pure black
- **Charcoal Surface** (#1c1916) — Card and container fill, elevated surfaces
- **Warm Slate** (#252220) — Secondary surface, subtle tonal shifts between sections
- **Ivory Smoke** (#e8e0d4) — Primary text, headlines, body copy. Warm but NOT cream/beige
- **Ash Stone** (#8a8278) — Secondary text, descriptions, metadata. Cool-neutral
- **Burnt Terracotta** (#c2703a) — Single accent for CTAs, active states, focus rings, links. Warm but NOT brass/gold/caramel
- **Ember Glow** (#d4845a) — Accent hover state, lighter terracotta
- **Deep Clay** (#9a5428) — Accent active/pressed state
- **Moss Success** (#6b8c42) — Success states only
- **Brick Error** (#c44d3d) — Error states only

**BANNED Colors:**
- No #c4903d (caramel/brass/gold) — AI-default premium palette
- No #f5ecd7 (cream/beige background) — AI-default warm paper
- No #1a1208 (warm espresso near-black) — too warm, too generic
- No pure black #000000
- No purple/neon accents
- No gradient text on large headers

## 3. Typography Rules
- **Display/Headlines:** Stigma — Bold, modern display font. Track-normal, uppercase. Controlled scale hierarchy through weight and size, NOT just massive scaling. Max 2 lines for hero headlines
- **Body:** Outfit — Clean geometric sans. Weight 300 for body, 500 for emphasis, 600 for buttons/labels. Line-height 1.7, max 65 characters per line
- **Labels/Meta:** Outfit Medium — Uppercase, tracking 0.08-0.12em. Used sparingly for navigation and metadata
- **Mono companion:** JetBrains Mono — For prices, timestamps, order numbers

**BANNED:** Inter, generic system fonts, generic serif (Georgia, Times New Roman). No serif fonts anywhere in this project — Stigma is a display sans, Outfit is body sans.

## 4. Hero Section Rules
- **Asymmetric Split ONLY** — Text left (45%), atmospheric image right (55%). Centered hero is BANNED
- **No overlapping text on images** — Every element in its own clean spatial zone
- **No filler text** — "Scroll to explore", scroll arrows, bouncing chevrons are BANNED
- **Max 4 text elements:** Headline (max 2 lines) + Subtext (max 20 words) + 1 primary CTA pill button. No eyebrow, no tiny tagline below CTA
- **Hero top padding max pt-24** — Content does NOT float halfway down viewport
- **CTA:** Single pill button, Burnt Terracotta fill, Deep Roast text. No secondary "Learn more" link

## 5. Component Stylings

### Buttons
- **Primary:** Burnt Terracotta (#c2703a) fill, Deep Roast text. Fully rounded pill shape (border-radius: 9999px). Padding: 14px 32px
- **Hover:** Ember Glow (#d4845a), lift translateY(-2px), subtle warm shadow
- **Active/Pressed:** scale(0.98) + translateY(1px) — tactile push feedback. Deep Clay color
- **Ghost/Outline:** Transparent background, 1.5px Ash Stone border, Ivory Smoke text. Hover: border turns Terracotta
- **BANNED:** No outer glows, no neon effects, no custom cursors, no square buttons (all pills)

### Cards — Double-Bezel Architecture
Every premium card uses nested enclosures for machined hardware feel:
- **Outer Shell:** Wrapper with bg Warm Slate (#252220), 1px border rgba(232,224,212,0.06), padding 6px, rounded 2rem
- **Inner Core:** Content container with bg Charcoal Surface (#1c1916), inner highlight shadow inset 0 1px 1px rgba(255,255,255,0.04), rounded calc(2rem - 6px)
- **Hover:** Outer shell border subtly brightens to rgba(194,112,58,0.15). No aggressive translateY

### Navigation — Floating Island
- **Desktop:** Floating pill detached from top — margin-top 16px, centered, max-width 960px, rounded-full
- **Background:** rgba(20,17,14,0.85) + backdrop-blur 20px
- **Border:** 1px solid rgba(232,224,212,0.08)
- **Height:** 56px — compact, premium
- **Logo:** Stigma font, left-aligned inside pill
- **Links:** Outfit Medium, uppercase, tracking 0.12em, 13px
- **CTA:** Small terracotta pill button flush right inside nav
- **Mobile:** Full-screen overlay, backdrop-blur-3xl bg-black/85, staggered link reveals with spring physics

### Inputs/Forms
- Label above input (never floating label, never placeholder-as-label)
- Background: Charcoal Surface
- Border: 1px Ash Stone at 30% opacity
- Focus: Burnt Terracotta ring, 2px
- Error text below input, Brick Error color
- Helper text optional, Ash Stone color
- Rounded 12px (consistent with card inner radius)

### Loading States
- Skeletal shimmer loaders matching exact layout dimensions
- Shimmer color: Warm Slate → Charcoal Surface gradient sweep
- No circular spinners, no bouncing dots

## 6. Layout Principles
- **Dark mode locked** — NO light sections mid-page, NO section flips to inverted mode
- **Grid-first architecture** — CSS Grid over Flexbox math. No calc() percentage hacks
- **Max-width containment:** 72rem (1152px) centered, with 40px side padding desktop, 24px mobile
- **Section padding:** Generous — py-28 to py-40 on desktop. Art Gallery Airy density
- **Asymmetric layouts:** Split 45/55, 40/60, or editorial full-width. Never 50/50 boring splits
- **No 3-equal-column card grids** — use asymmetric 7/5 or 8/4 column splits, or 2-column with staggered heights
- **Section Layout Diversification:** Each section uses a DIFFERENT layout family. No two sections look the same
- **Zigzag Cap:** Max 2 consecutive image+text splits before breaking with full-width section
- **Eyebrow Restraint:** Max 1 eyebrow per 3 sections
- **Mobile collapse:** All multi-column layouts → single column below 768px. w-full, px-6

## 7. Motion & Interaction
- **Spring physics default:** stiffness 100, damping 20 — premium weighty feel. No linear easing
- **Custom cubic-bezier:** cubic-bezier(0.32, 0.72, 0, 1) for all transitions
- **Scroll reveals:** Elements enter with translateY(24px) + opacity(0) + blur(4px), resolving over 800ms
- **Staggered orchestration:** Lists reveal with 60ms cascade delay between items
- **Parallax hero:** Background image shifts at 0.3x scroll speed
- **Grain overlay:** Fixed pseudo-element, fractalNoise SVG, opacity 2.5%, pointer-events none
- **Hardware acceleration:** Animate ONLY transform and opacity. Never top, left, width, height
- **Reduced motion:** All animations collapse to instant under prefers-reduced-motion

## 8. Anti-Patterns (BANNED)
- No emojis anywhere (📍🕐🗺️❝ etc.)
- No Inter font
- No generic serif fonts
- No pure black (#000000)
- No neon/outer glow shadows
- No oversaturated accents (saturation < 75%)
- No gradient text on large headers
- No custom mouse cursors
- No 3-column equal card layouts
- No centered hero sections
- No light sections mid-page
- No AI copywriting clichés ("Elevate", "Seamless", "Next-Gen")
- No scroll-to-explore text or bouncing arrows
- No emojis as icons — use SVG or icon library
- No border-radius mixing (all pills for buttons, all 2rem for cards)
- No placeholder-as-label in forms
- No window.addEventListener('scroll') — use IntersectionObserver or GSAP ScrollTrigger
- No em-dashes as design decoration
- No section-numbering eyebrows (001, 002...)
- No floating top-right sub-text in section headings

## 9. Responsive Rules
- **Mobile-First Collapse (< 768px):** All multi-column → single column. No exceptions
- **No Horizontal Scroll:** Overflow-x hidden. Horizontal overflow on mobile is critical failure
- **Typography Scaling:** Headlines via clamp(). Body minimum 1rem
- **Touch Targets:** All interactive elements minimum 44px tap target
- **Navigation:** Floating island → hamburger with full-screen glass overlay on mobile
- **Spacing:** Section gaps reduce proportionally via clamp(3rem, 8vw, 6rem)
- **Images:** Aspect ratios maintained, lazy loading, object-fit cover
