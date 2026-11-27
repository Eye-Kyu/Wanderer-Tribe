# Design: Wanderer Tribe

The locked system. Every Hallmark run reads this first, and all pages share it. Change it on purpose: this file is the rule.

## System
- Genre: editorial
- Shape of the first page: Photographic (the owner's photographs and hero video lead)
- Theme: brand, pinned by the owner (forest green, rust orange and gold; Stardom display)
- Axes: light/roman-serif/warm · posture: full palette. Forest is the field (bands, footer, active tabs), rust is the signal (the one primary control, focus), gold is the seal (heads on forest), and ink is everything else.

## Tokens
`src/app/tokens.css` is the source of truth. The roles:
```css
:root {
  --color-paper: oklch(96.6% 0.014 85);  --color-paper-2: oklch(93.4% 0.024 85);  --color-paper-3: oklch(89.6% 0.032 84);
  --color-ink: oklch(21.5% 0.03 153);  --color-ink-2: oklch(33% 0.035 153);  --color-muted: oklch(46% 0.03 140);  --color-rule: oklch(84.5% 0.026 88);
  --color-accent: oklch(65.1% 0.143 45);  --color-accent-ink: oklch(20.5% 0.035 42);  --color-focus: oklch(58% 0.19 42);
  --color-field: oklch(38.3% 0.065 153);  --color-field-ink: oklch(95% 0.03 87);  --color-seal: oklch(75.1% 0.092 80);
  --font-display: "Stardom", ui-serif, Georgia, serif;  --font-body: Instrument Sans (next/font, --font-instrument);
  --radius-card: 6px;  --radius-pill: 999px;  --rule-hair: 1px;  --shadow-card: 0 1px 2px oklch(20% 0.02 153 / 0.08);
}
```
The spacing scale, the type scale, the easings and the durations are the scaffold's and live in `tokens.css`. `.field` swaps focus and rules for the forest surface.

## Controls
- Primary: rust fill (`.btn-primary`) · pill · 48px. One per screen.
- Secondary: outlined in currentColor (`.btn-quiet`) or a typographic `.link`, with a rust underline · same radius and height.
- Fields: `.field-input`, 48px, a constant 1px border, an outline focus ring. Selects sit in `.select-wrap` with a Lucide chevron.

## Pages
- Home: Counter hero (the planner on a plate over the video). Region index, photo band, itinerary rows, experience switcher, quotes on forest, camp rail, enquiry form.
- Lists (regions, experiences): Banner with the plate on the right, filter chips, a three-column card grid (a lone last card spans the row).
- Trip pages: Stage (text on 5, photo on 7), day-by-day rows, "Before you go" on paper-2, more in the region. On phones, a sticky enquiry bar appears after the page's own button.
- Indexes, About and Contact close on a forest band with "Plan a trip". Terms and Privacy are Long Documents with a sticky table of contents.

## Motion
- Character: calm. No scroll reveals and no parallax. Hover is one colour step. The dialog fades in over 420ms. Under reduced motion everything ends at once, and the hero video starts paused.

## Exports
`src/app/tokens.css` in this project. Tailwind 3 names in `tailwind.config.js`: paper, ink, quiet, rule, signal, field, seal, scrim. Tailwind, DTCG or shadcn blocks get added here on request.
