# Sophia’s little collection

A Next.js + TypeScript personal scrapbook. No backend, authentication, CMS, music integration, or database.

## Run locally

Use Node.js 20.9 or newer. Run `npm install`, then `npm run dev` and visit http://127.0.0.1:3000. Checks: `npm run build`, `npm run typecheck`, `npm run lint`.

## Add something to the archive

All content records are in `src/data/archive.ts`. Add an image to `public/assets/`, then add a record to the appropriate collection. Records include an id, type, image, meaningful alt text, title, optional date/context, description, rotation, desktop x (percentage), y (pixels), width (pixels), mobileOrder, and interaction. Desktop coordinates are relative to each scene. Mobile uses the supplied order and CSS composition rather than those coordinates. Increase a scene’s height in `src/app/globals.css` when adding more desktop rows.

- Drawings: `public/assets/doodles/`. Current two scraps use different CSS crops of `notebook-friends.png`. Remove `crop` when replacing them with separate images.
- Photography: `public/assets/photos/`.
- Portraits: `public/assets/personal/`.
- Clover: replace `public/assets/clover/clover.png`. Behavior is isolated in `src/components/Clover.tsx`. The supplied green conure is assumed to be Clover; the cockatiel remains a separate archive photo. V1 uses one photograph with pose and caption responses; no alternate expression images were supplied.
- Project images: `public/assets/projects/`. A project record can use `type: 'photo'` and an image, or `type: 'note'` and frontText.
- Optional textures: `public/assets/textures/`; current grain is a lightweight inline SVG.

`ArchiveObject` owns shared drag and flip logic. `Scrapbook` owns the continuous page and mobile inspection dialog. Enter/Space reveals a focused object’s story. Mouse double-click flips; touch double-tap inspects. Mouse dragging is enabled only above 760px with a fine pointer. Touch scrolling remains native. Reduced motion disables transitions and uses a static back reveal.

## Intentional placeholders

Dates, photo locations, drawing stories, a future project/artwork, and contact details are not invented. Edit their text in `archive.ts` and `Scrapbook.tsx`. Discovery copy lives in the `discovery` record. The visitor counter is explicitly marked mock; replace the footer counter with a server-backed component later if wanted. Drag positions reset on reload.

Inspiration screenshots are references only and are not shipped as site imagery. All photographs and drawings shipped here were supplied by Sophia. No hosting or custom domain has been configured.
