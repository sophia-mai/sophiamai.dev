# Sophia’s little collection

A Next.js + TypeScript personal scrapbook with a server-backed unique-browser counter. No authentication, CMS, or music integration.

## Run locally

Use Node.js 20.9 or newer. Run `npm install`, then `npm run dev` and visit http://127.0.0.1:3000. Checks: `npm run build`, `npm run typecheck`, `npm run lint`.

## Add something to the archive

All content records are in `src/data/archive.ts`. Add an image to `public/assets/`, then add a record to the appropriate collection. Records include an id, type, image, meaningful alt text, title, optional date/context, description, rotation, desktop x (percentage), y (pixels), width (pixels), mobileOrder, and interaction. Desktop coordinates are relative to each scene. Mobile uses the supplied order and CSS composition rather than those coordinates. Increase a scene’s height in `src/app/globals.css` when adding more desktop rows.

- Drawings: `public/assets/doodles/`. Current two scraps use different CSS crops of `notebook-friends.png`. Remove `crop` when replacing them with separate images.
- Photography: `public/assets/photos/`, grouped into `scenery/`, `animals/`, `friends/`, and `birds/`.
- Full portraits: `public/assets/personal/originals/`. The newly supplied garden portrait is `sophia-in-garden-with-glass-art.png`.
- Sophia’s scissor-cut PNGs: `public/assets/personal/cutouts/`, grouped by place or subject: `bainbridge/`, `lake-22/`, `mount-rainier/`, `yale/`, `minecraft/`, `snow/`, `flowers/`, `iceberg/`, `racing/`, and `poses/`. Place names come from the supplied filenames; no new locations were inferred.
- Clover’s full photo: `public/assets/clover/originals/clover-green-conure-portrait.png`. Alternate scissor-cut poses are in `public/assets/clover/cutouts/`, including staring, chomping, biting, queen, holding a grape, and eating a grape. Behavior is isolated in `src/components/Clover.tsx`. The page uses the scissor-cut poses for proximity and click/tap reactions. The original photograph remains available for reuse.
- Sunny’s scissor-cut portrait: `public/assets/photos/birds/cutouts/sunny-staring.png`. The original cockatiel photo remains named `cockatiel-on-cardboard.jpg` because its identity has not been confirmed.
- Project images: `public/assets/projects/`. A project record can use `type: 'photo'` and an image, or `type: 'note'` and frontText.
- Optional textures: `public/assets/textures/`; current grain is a lightweight inline SVG.

`ArchiveObject` owns shared drag and flip logic. `Scrapbook` owns the continuous page and mobile inspection dialog. Enter/Space reveals a focused object’s story. Mouse double-click flips; touch double-tap inspects. Mouse dragging is enabled only above 760px with a fine pointer. Touch scrolling remains native. Reduced motion disables transitions and uses a static back reveal.

## Intentional placeholders

Missing photo locations, drawing stories, a future project/artwork, and contact details are placeholders. Edit their text in `archive.ts` and `Scrapbook.tsx`. Discovery copy lives in the `discovery` record. Drag positions reset on reload.

## Unique visitor counter

Create a persistent Upstash Redis database and add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to the Vercel project's environment variables, then redeploy. For local development, copy `.env.example` to `.env.local` and fill in the credentials. Never prefix these secrets with `NEXT_PUBLIC_`. The API uses the [Upstash REST API](https://upstash.com/docs/redis/features/restapi); no additional dependency is needed.

The counter stores a random anonymous browser ID in localStorage and deduplicates it in a Redis set. Reloads, tabs, and return visits from the same browser count once while that ID remains stored. It collects no IP addresses. Different devices, browser profiles, private sessions, or cleared site data can count separately; it measures unique browsers, not verified people. Visitors with blocked browser storage are not registered. This is a decorative counter, not bot-proof analytics: automated clients can submit new IDs.

The displayed total refreshes every minute while the page is visible. Development, Vercel previews, and production use separate Redis keys so testing does not inflate production totals. Keep the same database across deployments to preserve the count. If credentials or the service are unavailable, the page shows a dash instead of a fabricated number.

Inspiration screenshots are references only and are not shipped as site imagery. All photographs and drawings shipped here were supplied by Sophia. No hosting or custom domain has been configured.

## Photo source archives

The three supplied ZIP files remain unchanged in `PhotoElementsZip/`. Their 60 PNGs have been extracted with readable lowercase, hyphenated filenames while preserving the original image bytes and transparency. `docs/asset-manifest.json` maps every extracted filename back to its original ZIP and entry name. The original website photographs were moved to descriptive paths and their code references updated. To use any new photo on the page, add its `/assets/...` URL to a record in `src/data/archive.ts`.

## Character interactions

Clover reacts to mouse proximity: staring from a distance, opening her beak nearby, and biting when approached. Every fourth close approach is friendly. Click, tap, Enter, or Space cycles through suspicious, bite, friendly, holding-grape, and eating-grape poses; these settle back to idle after 1.8 seconds. The image and message list lives at the top of `src/components/Clover.tsx`.

`src/components/JumpingSophia.tsx` uses the standing/jumping cutouts as a paired character in the photo area. Click, tap, Enter, or Space triggers one short hop and returns to standing. Repeated activation during a hop is ignored. Both characters use native buttons and do not open archive dialogs or capture touch scrolling. Sophia is larger and draggable on desktop; dragging suppresses the hop click. Arrow keys move the focused Sophia object by 15px. Mobile keeps a larger static cutout with tap-to-hop. Shared desktop dragging and front-layer behavior live in `src/components/usePaperDrag.ts`, also used by archive objects. Reduced motion keeps pose changes and captions but removes the hop animation. Character layout is at the end of `src/app/globals.css`. Images are preloaded in-place to avoid flashes between poses; Sophia’s supplied white backgrounds blend into the paper with CSS multiply, without editing the source files.

## Additional photo spread and decorations

The `photos` and `collected` arrays in `src/data/archive.ts` contain the expanded photo collection. Use `type: cutout` for borderless scissor-cut assets; they support the same desktop dragging, flips, and mobile inspection as other archive objects. Their source backgrounds blend into the paper through CSS; original pixels are preserved. Added captions avoid guessing dates or personal stories.

The 39 supplied Elements ZIP assets live in `public/assets/elements/` with descriptive names. `src/components/ScrapbookElements.tsx` selects and positions decorative assets by scene. They are decorative, hidden from assistive technology, and ignore pointer events so they do not block photographs. Mobile uses a small accent at the end of each spread instead of desktop decoration coordinates.

## Paper reverses

Front content alone sets the archive object's size; its reverse is positioned inside the same bounds. Transparent cutouts can set `paperMask: true` in their data record to use the source image's alpha outline as a mirrored paper reverse. Sunny and Clover's queen cutout use this. White-background assets keep rectangular reverses until a transparent outline is supplied. Notes use the same cut-edge shape on both faces. The full mobile inspection note remains unmasked for readability. The two framed bird photographs were removed from the displayed collection; their original files remain available.
