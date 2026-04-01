# Design System Specification: Technical Precision & Editorial Engineering

## 1. Overview & Creative North Star: "The Blueprint Aesthetic"
This design system is a rejection of decorative "fluff" in favor of raw, technical authority. The Creative North Star is **The Blueprint Aesthetic**. It treats the digital interface not as a marketing canvas, but as a high-fidelity engineering document. 

By leveraging the "High-Fidelity Wireframe" look, we signal transparency, expertise, and a "form follows function" philosophy. We break the standard B2B template by utilizing **Extreme White Space** and **Intentional Asymmetry**. Layouts should feel like a perfectly balanced technical drawing—where every element is placed with mathematical intent, and the "void" is as important as the content. This system is optimized for high-density information environments, specifically supporting the Cyrillic alphabet with the same weight and rhythm as Latin characters.

---

## 2. Colors: Tonal Architecture
The palette is rooted in monochromatic discipline, using the accent color `#DC145C` (Crimson) only as a functional "laser" to draw attention to critical actions or status changes.

### The "No-Line" Rule
Traditional 1px borders are prohibited for sectioning. Structural boundaries must be defined solely through background color shifts. For example, moving from `surface` (#f9f9f9) to `surface-container-low` (#f3f3f3) creates a clear, sophisticated transition without the visual "noise" of lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, physical layers. 
- **Base Layer:** `surface` (#f9f9f9)
- **Nested Content:** `surface-container` (#eeeeee)
- **Floating/Active:** `surface-container-highest` (#e2e2e2)

### The "Glass & Gradient" Rule
To elevate the "Engineering" look into a "Premium" space, use Glassmorphism for floating navigation or overlays. Utilize semi-transparent versions of `surface` with a `20px` backdrop-blur. 
- **Signature Texture:** For hero elements or primary CTAs, apply a subtle linear gradient from `primary` (#b20047) to `primary_container` (#dc145c). This adds "soul" and depth to an otherwise rigid system.

---

## 3. Typography: Authority in Type
We use a triad of fonts to establish a strict information hierarchy. The primary engine of this system is **Inter**, providing neutral, high-readability support, while **Oswald** and **Roboto Mono** inject the engineering DNA.

- **Display & Headlines (Oswald):** Used for large, bold statements. The condensed nature of Oswald mirrors architectural headings.
- **Body & Titles (Inter):** The workhorse. Inter provides the necessary clarity for complex B2B data and Russian text strings.
- **Data & Metadata (Roboto Mono):** Used for labels, "engineered" metrics, and code snippets to emphasize technical precision.

### Typographic Hierarchy
- **Display-LG (3.5rem):** Reserved for core value propositions. High-contrast against large white space.
- **Headline-MD (1.75rem):** Section anchors.
- **Label-SM (0.6875rem / Mono):** Technical metadata, uppercase with `0.05em` letter spacing.

---

## 4. Elevation & Depth: Tonal Layering
Avoid "Material" style drop shadows. Depth is achieved through light and layering.

- **The Layering Principle:** Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f3f3f3) background. This creates a "soft lift" that feels architectural rather than digital.
- **Ambient Shadows:** If a floating element (like a modal) is required, use a shadow color tinted with `#1a1c1c` at `4%` opacity, with a `32px` blur and `16px` Y-offset.
- **The "Ghost Border":** If a container requires a boundary (e.g., in a complex data grid), use `outline_variant` (#e4bdc2) at `15%` opacity. Forbid 100% opaque borders.

---

## 5. Components: Functional Primitives

### Buttons
- **Primary:** `primary` (#b20047) background, `on_primary` (#ffffff) text. Shape: `sm` (0.125rem) radius for a sharp, technical feel.
- **Secondary:** Ghost style. `outline` (#8f6f73) at 20% opacity.
- **Tertiary:** Text-only in `primary`, using `Roboto Mono` for the label to indicate an "actionable command."

### Input Fields
- **State:** No background fill. Use a `bottom-border` only (2px) using `secondary` (#5e5e5e).
- **Focus:** Transition the border to `primary` (#b20047). 
- **Labels:** Always visible, `label-sm` in `Roboto Mono`, positioned above the input.

### Cards & Lists
- **Forbid Dividers:** Do not use lines to separate list items. Use the **Spacing Scale** (e.g., `8` / 2.75rem) to create separation through "breathable" white space.
- **Interactive Cards:** On hover, shift the background from `surface` to `surface-container-high` (#e8e8e8).

### Engineering Tables (Custom Component)
- High-density data grids using `body-sm` in `Inter`.
- Alternating row fills using `surface` and `surface-container-low` instead of borders.
- Header row uses `Roboto Mono` for a "system-output" feel.

---

## 6. Do's and Don'ts

### Do
- **DO** use the `24` (8.5rem) spacing token for margins between major sections to emphasize the "High-Fidelity Wireframe" look.
- **DO** align all text to a strict grid. Asymmetry should be intentional (e.g., a headline offset to the right) but never "random."
- **DO** ensure Cyrillic characters have proper line-height (1.5x for body) to avoid the "cramped" look common in Russian B2B UI.

### Don't
- **DON'T** use rounded corners above the `sm` (0.125rem) scale for functional elements. Only use `full` for tags/chips.
- **DON'T** use icons unless they are strictly functional (e.g., arrows, download, close). Avoid "illustrative" icons.
- **DON'T** use pure black (#000000) for body text. Use `on_surface` (#1a1c1c) to maintain a premium, balanced contrast.