# Ben Walther

Personal site: one scroll story, from autopilot to awareness, told as a night drive that wakes into daylight.

Built with Astro (static output), GSAP ScrollTrigger + SplitText, Lenis, and a hand-written OGL road shader.

```sh
npm install
npm run dev      # local dev server
npm run build    # static site in dist/, deployable to any static host
npm run preview  # serve the built site
```

## Before launch

- **Weekly letter signup:** set `SIGNUP.endpoint` (and `emailField` if your provider needs it) in `src/config.ts`. Until then, the form tells visitors signups aren't open yet.
- **Portrait:** put the photo in `public/` and set `PORTRAIT.src` in `src/config.ts`. The slot renders nothing until then.

## Where things live

- `src/pages/index.astro`: page copy and structure
- `src/styles/global.css`: tokens, layout, and the reduced-motion (static) version
- `src/scripts/road.js`: the WebGL road shader
- `src/scripts/story.js`: scroll choreography
- `PRODUCT.md` / `DESIGN.md`: product and design records
