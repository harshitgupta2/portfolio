# Developer portfolio

A single-page portfolio built with React, Vite, Tailwind, GSAP ScrollTrigger, Framer Motion and Swiper.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the build locally
npm run lint
```

---

## Fill these in before you deploy

Nothing personal is invented anywhere in this project. Values left as `ALL_CAPS`
tokens are placeholders, and any link still holding one renders as a visibly
inert chip with a tooltip instead of a dead href. Replace the token and the link
wires itself up.

Name, email, LinkedIn, GitHub and the two live project URLs are already filled
in. What remains:

**`index.html`, `public/robots.txt`, `public/sitemap.xml`** — replace
`https://your-domain.example` with your real domain once you have one. It appears
in the canonical tag, the Open Graph and Twitter URLs, and the JSON-LD block.

**`src/data/experience.js`** — `company` is still `COMPANY_NAME`. Fill in the
employer name and it appears in the experience rail; left as a token, it is
simply not rendered. The Rentellor link is already wired.

**`src/data/projects.js`** — Expense Tracker and QuickShow have `liveUrl: null`.
Add a URL and those cards become clickable too; until then they render marked
"Live link coming soon".

**`public/`** — add your `resume.pdf`; the hero's download button points at
`/resume.pdf`. Also replace `og-cover.png` with a 1200×630 social image.

---

## Structure

```
src/
├── components/   Navbar, ProjectCard, SkillCategory, CustomCursor, …
├── sections/     Hero, Experience, Skills, Projects, Contact, Footer
├── data/         site.js, experience.js, skills.js, projects.js
├── hooks/        smooth scroll, media queries, magnetic hover, active section
├── assets/       project cover artwork
├── utils/
├── App.jsx
└── main.jsx
```

All copy and content lives in `src/data`. Adding a skill or a project is a data
edit — no markup to duplicate.

---

## Design system

The theme is dark, and every colour comes from CSS custom properties at the top
of `src/index.css`:

| Token | Value | Used for |
| --- | --- | --- |
| `--bg` | `#0B0D12` | page background |
| `--surface` / `--surface-2` | `#12151C` / `#181C25` | cards, fields, raised elements |
| `--fg` / `--fg-muted` | `#F2F1ED` / `#939AA8` | text |
| `--accent` / `--accent-soft` | `#5B76FF` / `#A9B8FF` | links, focus rings, active states |
| `--line` / `--line-strong` | translucent white | hairlines and borders |

Change `--accent` alone and the whole site retunes: buttons, focus rings, the
scroll bar, hover borders and the nav indicator all read from it. The matching
value also lives in `tailwind.config.js` for utility classes, and in the four
project SVGs if you want the artwork to follow.

**Layout grid.** Every section uses `.grid-12` from `src/index.css`: a shared
12-column grid where `.rail` spans columns 1–3 and `.content` spans 4–12. Section
numbers and metadata sit in the rail; headings, copy and cards start at column 4.
That is what keeps the headings, the experience detail and the contact channels
on the same vertical rules all the way down the page. Cards use `h-full` with
`mt-auto` on their footers, so rows stay level regardless of how much copy each
card carries.

**Brand colours.** Technology marks render in their official colours from
`src/utils/brandColors.js`. Skill rows stay neutral at rest and pick up a tint of
the technology's own colour on hover, so a column of logos reads as a list rather
than a paint chart. Add a technology by putting its hex in that file and its icon
in `src/components/TechIcon.jsx`.

## Notes on the build

**Project artwork.** The four covers in `src/assets/projects/` are hand-authored
SVG, one concept per project rather than a screenshot: a resume refracted through
a prism, screens orbiting a single play sphere, coin stacks as a spending chart,
a lit seat in a dark auditorium. They share one art direction, carry no readable
text and no logos, weigh a few KB each and stay sharp at any size. To replace
them with 3D renders, see **PROMPTS.md** — it holds a filled-in generation prompt
per project plus the swap instructions.

**Motion.** GSAP ScrollTrigger drives scroll-linked work (heading reveals, image
parallax); Framer Motion handles component-level state (hover, the nav indicator,
the mobile menu). Lenis provides smooth scrolling, sharing GSAP's ticker so the
two never run competing rAF loops.

**Reduced motion.** Every animation checks `prefers-reduced-motion`. When it is
set, Lenis does not start, GSAP tweens are skipped rather than replayed instantly,
counters jump to their final value, the grain layer is removed and the custom
cursor never mounts. The page is fully usable with all motion off.

**Touch.** The custom cursor, magnetic buttons and pointer parallax are gated
behind `(hover: hover) and (pointer: fine)`, so touch devices never download the
interaction cost of effects they cannot use. The hero's floating tech field and
the projects grid both have separate mobile layouts rather than scaled-down
desktop ones.

**Performance.** Swiper is lazy-loaded and only requested on small screens. GSAP
and Framer Motion are split into their own cache-stable chunks. Project images are
lazy except the first, which is marked high priority. Animations move `transform`
and `opacity` only.

**Contact form.** There is no backend, so submitting composes a message in the
visitor's mail client with the fields already filled in — and the button says so.
To collect submissions instead, point `onSubmit` in `src/sections/Contact.jsx` at
Formspree, Resend or your own endpoint.

**React Router** is not installed. The site is one page with in-page navigation,
so a router would add weight without adding routes. Add it if you introduce case
study pages.
