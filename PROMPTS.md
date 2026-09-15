# Project cover art

The four covers in `src/assets/projects/` are hand-built SVG: concept-driven,
dark-theme, 16:9, no readable text, no logos. They load in a few KB and stay
sharp at any size.

If you want true 3D renders instead, the prompts below are written for image
tools (Midjourney, DALL·E, Firefly, Imagen). Each one is filled in for its
project — paste it as-is.

## Swapping in a generated image

1. Export at **1600×900** (16:9) as `.webp` if your tool offers it, otherwise
   `.jpg` at quality ~82. Avoid PNG for photographic renders; it will be several
   times larger for no visible gain.
2. Save into `src/assets/projects/` — keep the existing filename, or update the
   import at the top of `src/data/projects.js`.
3. Update the matching `alt` string in `projects.js` to describe what the new
   image actually shows. The alt text is what screen reader users get, so it
   should describe the image rather than repeat the project title.
4. Nothing else changes: the card already enforces a 16:9 frame, lazy loading
   and `object-cover`.

Keep all four consistent. A single render that does not match the others will
stand out more than a slightly weaker concept that does.

---

## 01 — AI Resume Builder

> Create a premium 3D realistic conceptual illustration for a modern developer
> portfolio project card representing **AI Resume Builder**.
>
> Visually communicate the core idea of the project through one strong central
> concept, supported by a few subtle related elements. The image should feel
> creative and meaningful to the project rather than being a literal screenshot
> of the application.
>
> Use a stylized realistic 3D render with realistic materials, soft cinematic
> lighting, subtle reflections, natural depth, polished surfaces, soft shadows,
> and a high-end modern technology aesthetic.
>
> The composition should be: clean and minimal; professional and visually
> impressive; concept-driven and instantly understandable; suitable for a premium
> award-winning developer portfolio; landscape 16:9; central subject with enough
> empty space around it; dark neutral modern background; no people; no logos; no
> watermark; no UI screenshot; no excessive futuristic or cyberpunk elements; no
> random floating objects; no readable text inside the image.
>
> **Project concept:** a single sheet of paper is analysed and turned into
> structured insight — a resume passes through a lens and comes out the other
> side as a measured profile of strengths and gaps.
>
> **Visual elements:** a clean white paper document floating upright with real
> thickness and a soft curl; a glass prism or lens catching a narrow beam of
> light; the beam refracting into several horizontal bars of different lengths;
> one soft blue light source.
>
> **Overall style:** realistic 3D conceptual illustration, premium SaaS artwork,
> cinematic lighting, sophisticated composition, realistic paper and glass
> textures, minimal technology aesthetic, deep charcoal background near #0B0D12,
> single accent colour indigo-blue #5B76FF, polished portfolio presentation.

## 02 — YouTube Watch Party

> Create a premium 3D realistic conceptual illustration for a modern developer
> portfolio project card representing **YouTube Watch Party**.
>
> [Same composition, style and restriction block as above.]
>
> **Project concept:** many people in different places watching exactly the same
> moment — separate screens locked to one shared source of truth.
>
> **Visual elements:** one glowing sphere or orb at the centre carrying a simple
> play triangle; four small floating screens arranged around it at equal
> distance, each showing the same frame; a thin orbital ring binding them
> together; faint light trails from each screen back to the centre.
>
> **Overall style:** realistic 3D conceptual illustration, premium SaaS artwork,
> cinematic lighting, glass and matte-metal materials, volumetric glow from the
> central orb, deep charcoal background near #0B0D12, single accent colour
> indigo-blue #5B76FF, polished portfolio presentation.

## 03 — Expense Tracker

> Create a premium 3D realistic conceptual illustration for a modern developer
> portfolio project card representing **Expense Tracker**.
>
> [Same composition, style and restriction block as above.]
>
> **Project concept:** where the money actually went — a month of spending made
> physical and legible at a glance.
>
> **Visual elements:** five stacks of coins at clearly different heights forming
> a bar chart; one stack rendered in the accent colour to mark the largest
> category; a single payment card resting at an angle nearby; a soft dotted trend
> line arcing above the stacks.
>
> **Overall style:** realistic 3D conceptual illustration, premium SaaS artwork,
> cinematic lighting, brushed metal and matte plastic materials, shallow depth of
> field, deep charcoal background near #0B0D12, single accent colour indigo-blue
> #5B76FF, polished portfolio presentation.

## 04 — QuickShow

> Create a premium 3D realistic conceptual illustration for a modern developer
> portfolio project card representing **QuickShow**.
>
> [Same composition, style and restriction block as above.]
>
> **Project concept:** the moment a seat becomes yours — one place held in a dark
> auditorium before the film starts.
>
> **Visual elements:** a short row of plush cinema seats viewed slightly from the
> front; exactly one seat lit in the accent colour while the rest stay dark; a
> soft projector beam crossing the frame from behind; a single ticket stub
> floating at an angle with a perforated edge.
>
> **Overall style:** realistic 3D conceptual illustration, premium SaaS artwork,
> cinematic lighting, velvet and paper textures, atmospheric haze in the
> projector beam, deep charcoal background near #0B0D12, single accent colour
> indigo-blue #5B76FF, polished portfolio presentation.
