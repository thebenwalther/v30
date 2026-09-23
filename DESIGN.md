---
name: Ben Walther
description: One drive home, from sodium-lit autopilot to daylight, ending at an exit sign.
colors:
  night-ground: "#1a1108"
  night-ink: "#f2a541"
  night-dim: "#c0843f"
  sky: "#cfe0ea"
  sky-deep: "#9fc3db"
  day-ink: "#13202b"
  day-dim: "#2f4757"
  sign-green: "#00704a"
  sign-white: "#ffffff"
  lane-yellow: "#f5c518"
  verge: "#8d9c76"
  asphalt: "#4a4f57"
  road-paint: "#f5f5ed"
  sky-zenith: "#8fbddb"
  day-horizon: "#e6f0f2"
  dawn-horizon: "#ffcc99"
typography:
  display:
    fontFamily: "'Overpass Variable', 'Overpass', system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.2rem + 5.6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "'Overpass Variable', 'Overpass', system-ui, sans-serif"
    fontSize: "clamp(2.15rem, 1.1rem + 4.2vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  sign-legend:
    fontFamily: "'Overpass Variable', 'Overpass', system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.1rem + 3.4vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  title:
    fontFamily: "'Overpass Variable', 'Overpass', system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1rem + 1.8vw, 2.4rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "'Public Sans Variable', 'Public Sans', system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1rem + 0.7vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "'Public Sans Variable', 'Public Sans', system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Overpass Variable', 'Overpass', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.01em"
  plaque:
    fontFamily: "'Overpass Variable', 'Overpass', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  plate: "4px"
  marker: "5px"
  plaque: "6px"
  sign-sm: "8px"
  sign-tab: "10px"
  sign-lg: "14px"
spacing:
  column-gap: "16px"
  gutter: "clamp(16px, 4.5vw, 64px)"
  section-y: "clamp(80px, 14vh, 160px)"
  stack: "clamp(1.75rem, 4vw, 3rem)"
components:
  topbar-link:
    backgroundColor: "{colors.night-ink}"
    textColor: "{colors.night-ground}"
    typography: "{typography.label}"
    rounded: "{rounded.plaque}"
    padding: "0.5em 0.85em 0.4em"
  exit-link-night:
    backgroundColor: "{colors.night-ink}"
    textColor: "{colors.night-ground}"
    rounded: "{rounded.sign-sm}"
    padding: "0.85rem 1.1rem 0.75rem 1.25rem"
  guide-sign:
    backgroundColor: "{colors.sign-green}"
    textColor: "{colors.sign-white}"
    typography: "{typography.sign-legend}"
    rounded: "{rounded.sign-lg}"
    padding: "clamp(1.75rem, 4vw, 3.25rem)"
  signup-input:
    backgroundColor: "{colors.sign-white}"
    textColor: "{colors.day-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sign-sm}"
    padding: "0.8rem 1rem"
    height: "3.25rem"
  signup-button:
    backgroundColor: "{colors.lane-yellow}"
    textColor: "{colors.day-ink}"
    rounded: "{rounded.sign-sm}"
    padding: "0.8rem 1.25rem 0.7rem"
    height: "3.25rem"
  signup-button-hover:
    backgroundColor: "#ffd43b"
    textColor: "{colors.day-ink}"
  mile-marker-day:
    backgroundColor: "{colors.sign-green}"
    textColor: "{colors.sign-white}"
    rounded: "{rounded.marker}"
    width: "3.6rem"
  mile-marker-night:
    textColor: "{colors.night-dim}"
    rounded: "{rounded.plaque}"
    width: "4.25rem"
  footer-plate:
    backgroundColor: "{colors.day-ink}"
    textColor: "{colors.sign-white}"
    rounded: "{rounded.plate}"
    padding: "0.3em 0.6em 0.2em"
---

# Design System: Ben Walther

## Overview

**Creative North Star: "The Drive Home"**

The site is one road seen through a windshield. It opens at night under low-pressure sodium lamps, where everything is a single amber hue on umber, and it ends in open daylight at a green guide sign. Every surface belongs to one of those two lights, and the change between them is the design's central event: a WebGL road behind the page carries the light, and a scroll-scrubbed `uWake` value turns sodium monochrome into dawn and then full day while the horizon drops away and the view tilts up to the sky.

The components are road furniture rather than web widgets: guide signs with an inset white border and an EXIT tab on the top edge, mile-marker plaques, lane dashes, words painted on the pavement, and small navy plates. Type is Overpass (a Highway Gothic descendant) at heavy weight for anything a driver would read off a sign, and Public Sans for the reading copy. Density is low. Headings are large, sit off-center on a 12-column grid, and have long runs of road between them.

Motion is scroll-driven and physical: lines pass like dashes, the car shudders on the rumble strip, the sign grows as you approach it. With reduced motion there is a complete still version, where the road is a single frame behind the first screen and dawn becomes a painted band of light.

**Key Characteristics:**
- Two lights, never mixed: sodium night (one amber hue) and daylight (sky, navy, sign green, lane yellow).
- The WebGL road carries the atmosphere, and the DOM stays flat above it.
- Interactive elements are signs: a solid face, an inset double stroke, and a tab on top.
- Heavy Overpass (800) with tight tracking for display; Public Sans for reading.
- Asymmetric 12-column placements that step across the page like lanes.

## Colors

The palette is two lighting conditions on one road: a single-wavelength amber night and a clear, full-color day.

### Primary
- **Sodium Amber** (night-ink): The only ink at night. Used for the hero headline, subhead, wordmark, and the faces of the night-time sign links. At night it is the whole palette.
- **Guide-Sign Green** (sign-green): The daytime action color. Used for the letter sign face and the fifteen year markers. It is withheld until the page is in daylight.

### Secondary
- **Lane Yellow** (lane-yellow): Used only where the day needs a signal: the submit button, focus outlines (3px), and daytime text selection.
- **Reflective White** (sign-white): Legend and border color on green signs, and the fill of the email field.

### Tertiary (shader-owned)
These values live as `vec3` constants in the road shader, and the DOM never paints them directly. They are recorded so new surfaces can match the road.
- **Asphalt** (asphalt) and **Road Paint** (road-paint): the daylight road surface and its lane lines and pavement lettering.
- **Zenith Sky** (sky-zenith), **Day Horizon** (day-horizon), **Dawn Horizon** (dawn-horizon): the sky gradient. The horizon passes through dawn peach while `uWake` is mid-transition, then settles to pale day.
- The night road is the same luminance image tinted by a sodium multiplier (1.05, 0.62, 0.21) over the night-ground base. This is why night reads amber and colorless.

### Neutral
- **Sodium Umber** (night-ground): The night ground, the `html` background, the theme-color, and the base of the shader's sodium tint.
- **Dimmed Amber** (night-dim): Secondary night text. The autopilot lines and the uncolored night mile plaque use it.
- **Morning Sky / Deep Sky** (sky, sky-deep): The DOM's daylight ground. Together they form the continuous sky gradient used when the road isn't running.
- **Road Navy** (day-ink): Daytime headings and primary text, the rule above the cost list, and the footer plates.
- **Slate Navy** (day-dim): Daytime body copy under headings.
- **Verge Green** (verge): Roadside ground. In the calm version it is the strip that the exit sign stands on, and the footer.

### Named Rules
**The Sodium Lamp Rule.** At night nothing has color except amber. A night-time call to action is still a guide sign, but rendered in amber on umber: no green, no white, no yellow until the wake.

**The Daylight Earns Color Rule.** Sign green, reflective white and lane yellow appear only in `data-tone="day"` territory, after the road has turned. Their arrival is the payoff and must not be spent early.

## Typography

**Display Font:** Overpass Variable (with Overpass, system-ui)
**Body Font:** Public Sans Variable (with Public Sans, system-ui)

**Character:** Overpass carries highway signage: open, heavy and legible at a glance. Public Sans is a plain civic text face that stays quiet next to it.

### Hierarchy
- **Display** (800, clamp 2.6–6rem, 0.98): The hero headline only. Left-aligned and balanced, with a maximum width of 14ch.
- **Headline** (800, clamp 2.15–4.75rem, 1.0): Section heads (wake, cost, story, move) and the night "jolt" line. Measure 12–16ch.
- **Sign Legend** (800, clamp 2–4rem, 1.02): The heading on the green guide sign.
- **Title** (700, clamp 1.5–2.4rem, 1.1): The scrolling autopilot lines. The "Someday" line steps up to 800 in full amber.
- **Lede** (400, clamp 1.2–1.5rem, 1.45): The first paragraph of a section, set in the primary ink. Maximum width 30ch.
- **Body** (400, clamp 1.0625–1.1875rem, 1.6): Reading copy in the dim ink, 44–58ch.
- **Label** (800, 0.9375rem): Sign-link legends, the form label (at 700), and the footer.
- **Plaque** (700, 0.6–0.75rem, uppercase, 0.08–0.1em): Only the small words printed on road objects, such as EXIT tabs and the "Mile" and "Year" words on markers. Numerals beneath them are 800 with tabular figures.

### Named Rules
**The Two Voices Rule.** If a driver would read it off a sign, it is Overpass at 700–800. If a passenger would read it as a paragraph, it is Public Sans at 400. Nothing in between.

**The Plaque Caps Rule.** Uppercase tracked text exists only on physical road objects (tabs, markers). It is never a section label floated above a heading.

## Layout

Every section is a 12-column grid (16px column gap) inside a fluid side gutter (16–64px). Content is placed asymmetrically and steps across the page. Some examples: the hero copy takes columns 1–9, autopilot 2–9, the wake body 6–11, the cost side column 7–11, the story 4–11, and the letter sign 5–12. Headlines hug the left, and supporting copy sits to their right and below. Vertical rhythm is generous, with sections padded by roughly 14–26vh. With motion on, the autopilot (320vh) and the wake (300vh) are tall scroll tracks with a sticky 100svh stage, so the scroll acts as distance travelled.

Below 860px every block spans the full width. Supporting copy (wake body, cost side, move text) keeps a 12% left indent to preserve the stagger, and the indent is dropped below 520px. On narrow screens the night horizon rises (0.34 instead of 0.4) and the device pixel ratio is capped at 1.25.

## Elevation & Depth

Depth comes from perspective, not from stacked cards. The fixed WebGL road behind everything supplies the horizon, fog, headlight falloff and sodium pools, and the DOM floats over it flat. Shadows appear only on objects that physically stand on the roadside, the signs, and they are soft and cast downward. A sign's white border is drawn with inset box-shadows (a double stroke), which keeps the edge crisp without adding a real border.

### Shadow Vocabulary
- **Sign border** (`inset 0 0 0 7px face, inset 0 0 0 10px white` on the large sign; 2/3.5px and 3/5px on the small signs): The legend border of a guide sign, in the face color and then the legend color.
- **Standing sign** (`0 24px 48px -24px rgb(19 32 43 / 0.55)`): The large letter sign. The year markers use `0 6px 14px -8px` with the same navy.
- **Lift on hover** (`0 8px 18px -8px` / `0 10px 24px -8px rgb(0 0 0 / 0.6)`): Night sign links, paired with a 1–2px rise.

### Named Rules
**The Only Signs Stand Rule.** Text blocks, sections and lists are never lifted. Only signs cast shadows, because only signs are standing objects.

## Shapes

Shapes follow real road objects: rectangles with modestly rounded corners that scale with the object. Footer plates use 4px, year markers 5px, plaques and the top-bar sign 6px, sign links and form fields 8px, and the large guide sign 14px. The EXIT tab is rounded on its top corners only (6px or 10px) and overlaps the sign's top edge by a few pixels, the way a tab does on the highway. The big sign stands on two gradient-metal posts. Arrows are heavy-shafted, broad-headed guide-sign arrows drawn as inline SVG: pointing down to jump within the page, and up-right to exit.

## Components

### Buttons and sign links
- **Character:** Each one is a small guide sign.
- **Night sign link** (hero exit link, top-bar link): An amber face with umber legend, an inset umber double stroke and an Overpass 800 legend. The hero version carries an amber EXIT tab on its top-left edge and a down arrow. **Hover:** rises 1–2px and gains the lift shadow, and the arrow nudges 2px in its direction (0.25s, ease-out `cubic-bezier(0.16, 1, 0.3, 1)`).
- **Submit button:** A lane-yellow face with navy Overpass 800 at 1.0625rem, 8px corners and a 3.25rem minimum height, followed by the up-right exit arrow. **Hover:** a brighter yellow, and the arrow moves 2px up-right. **Active:** presses down 1px. **Disabled:** 0.7 opacity with a progress cursor.
- **Focus (all):** a 3px lane-yellow outline with a 2–3px offset.

### Inputs / Fields
- **Style:** A white fill with a 2px white border, 8px corners, a navy text color, a sign-green caret, and a 3.25rem minimum height. It sits beside the submit button on one row that wraps.
- **Label:** A visible label above the field in Overpass 700 at 0.9375rem.
- **Focus:** a 3px lane-yellow outline. **Error:** the border turns lane yellow (`aria-invalid`), and a polite live status line appears below.

### Navigation
- **Top bar:** Absolutely positioned over the hero, with the wordmark on the left in Overpass 800 at 1.125rem, amber and without underline. On the right is the small amber sign link. It uses night colors because it only ever sits on the night road.

### Guide Sign (signature)
The page's single conversion point is a full MUTCD-style guide sign. It has a green face, an inset white border (7px green, then 3px white), 14px corners, an EXIT tab with an up-right arrow floated to its top-right edge, and two metal posts. Inside are the sign-legend heading, a short note in 90% white, and the signup form. With motion on, the sign scales from 0.82 to 1 from its base as it scrolls in.

### Mile Markers
Small upright plaques that read "Mile" or "Year" above a tabular numeral. At night the plaque is outlined only (2px dimmed amber, no fill) and its number counts up as you scroll. In the day they are filled green with a white inset stroke, and fifteen of them pass horizontally, scrubbed by scroll.

### Pavement Lettering
The shader paints words onto the right lane, stretched lengthwise like road paint and drawn from a canvas texture set in Overpass 800. SOMEDAY appears at night, and EXIT ONLY appears on the approach to the sign, where the car comes to rest a few car lengths behind it.

### Footer Plates
Over the running road, the footer text sits on small navy plates (4px) so that lane paint cannot cut through it.

## Do's and Don'ts

### Do:
- **Do** decide a surface's light first (`data-tone="night"` or `"day"`) and draw only from that light's palette.
- **Do** make every action a road object: a sign face, an inset double stroke in the face and legend colors, Overpass 800, and a guide-sign arrow.
- **Do** set display and headline type in Overpass 800 at -0.03em tracking and 0.98–1.0 line height, left-aligned and balanced.
- **Do** place content asymmetrically on the 12-column grid and step supporting copy to the right of its heading.
- **Do** use lane yellow for focus (a 3px outline) on every interactive element, in both lights.
- **Do** ship a complete still version for reduced motion, in which the road is a single frame and transitions become painted bands.

### Don't:
- **Don't** introduce any hue other than amber into a night section, including green signs, white legends or yellow buttons.
- **Don't** use uppercase tracked labels as eyebrows above headings. Caps belong only on plaques and tabs.
- **Don't** lift text blocks or sections with shadows. Only signs stand.
- **Don't** set reading copy in Overpass, or display text in Public Sans.
- **Don't** add gradient blobs, stock photography, testimonial strips or three-card feature rows.
