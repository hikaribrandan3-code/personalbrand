# Technical discoverability audit — 2026-10-02

## Before editing

- Vite 8.3.1, React 19.3.0; static Vercel deployment with one client-rendered page. No route library or server renderer.
- `index.html` has a title, description, production canonical, OpenGraph and a Twitter card. OpenGraph title is stale; no image alt or Twitter title/description/image.
- Initial HTML contains an empty root. Desktop bundle is deferred on mobile; below-fold imagery/video and animations already have deliberate loading policies.
- Homepage has one visible primary heading per viewport, meaningful section headings, working résumé/contact/social links and generally useful image alt text. Desktop and mobile are separate responsive presentations of the same work.
- Existing notes are factual shared data in `src/projectData.js`, presented in a lazy-loaded accessible drawer. No durable notes URLs; primary notes actions are buttons.
- No robots.txt, sitemap, JSON-LD, explicit indexing policy, or HTML evidence routes. API contact is the only hosted backend endpoint; restaurant dashboards/camera runtimes belong to external products, not this repository.
- The prior Vercel production origin was consistently present in metadata/contact configuration. No custom domain was configured at the time of this audit.
- No proof that Search Console/Bing ownership or IndexNow is configured. This task does not edit external profiles or products.

## Implementation plan

1. Reuse existing notes data to generate permanent static project/engineering pages using the existing drawer design. Add factual attribution/status/evidence and preserve app-specific limitations.
2. Supply the existing responsive homepage markup in build-time HTML; retain the current client app, animations, deferred media and viewport-specific assets. No framework migration or SEO dependency.
3. Give current notes controls normal hrefs while retaining their current drawer interaction for ordinary clicks. Modified clicks and JavaScript-free navigation reach the permanent notes page.
4. Generate route-specific metadata and a shared Person/WebSite/project graph, robots and sitemap from one production origin and page inventory. Keep preview builds noindex and APIs noindex; use real 404 handling.
5. Check initial HTML, linked assets, entities, routes, headings, desktop/mobile layout, loading and existing build/lint/contact checks.

## Decisions

- Keep the current professional copy and layouts. Use real app names from the repository: iVoz, iOrganize, Screen Bridge, iStats and iBrain. The research's iVoice/example names are not copied.
- Do not create a separate About or HTML résumé page in this pass. The homepage already presents identity/location/availability/contact and the PDF is hosted; both pages remain optional editorial recommendations.
- Use no rating/review/employment/founder schema. Auto Barber revenue is supplied business history; 165+ is total Google reviews, not a claim that every review is five-star.
- Leave training-crawler policy unchanged. Public search crawlers share the normal public allow policy. Do not invent verification keys, URLs, claims, or search guarantees.
