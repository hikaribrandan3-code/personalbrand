# SEO / AI discoverability implementation — 2026-10-02

This pass is implemented locally. It has not been pushed or deployed. Review the existing portfolio at http://127.0.0.1:5200/ and a permanent notes page at http://127.0.0.1:5200/projects/menutap.

## 1. Before

Vite/React SPA, an empty initial root, basic homepage metadata, and engineering notes available only in JavaScript drawers. There were no permanent notes routes, entity graph, robots file, sitemap or explicit route/indexing policy. See [the original audit](./seo-audit.md).

## 2. Changes

- Build-time rendering supplies the existing desktop and mobile portfolio content in initial HTML. The normal client app still owns interactions and animations; this is prerendering, not hydration or a framework migration.
- Six permanent HTML evidence pages reuse the existing notes, drawer typography and design system. Each includes role/attribution, status, decisions, technical areas, limitations and evidence links. Existing debugging examples are included where supported.
- Current notes controls have real hrefs. Ordinary clicks retain the same drawers; modified clicks and direct navigation can open the permanent pages.
- New route-specific metadata, JSON-LD, robots and sitemap are generated during the build. A repeatable `npm run check:seo` protects their relationships and indexing rules.
- Mobile product backgrounds now load within 600px of the viewport. This prevents prerendering from bringing the below-fold café background into the initial download. Existing image/video deferral and animation behavior remain intact.
- The earlier requested mobile MenuTap and FoodSpot CTA labels remain “Build Notes.” UGC labels and destinations remain unchanged.

## 3. Intentionally unchanged

Homepage copy, imagery, project order, visual layouts, typography, navigation, contact behavior, current animations and responsive breakpoints. No framework migration, SEO package, invented application, testimonial, employment, founder relationship or rating schema. No About page, HTML résumé expansion, blog or llms.txt. No external account/profile/product changes.

## 4. Canonical indexable inventory

Production origin: `https://hikari-brandan.vercel.app`.

- `/`
- `/projects/ugc-camera`
- `/projects/menutap`
- `/projects/foodspot-mobile`
- `/projects/macos-app-suite`
- `/projects/the-auto-barber`
- `/build-notes`
- `/Hikari_Brandan_Resume.pdf`

The six new pages become public after deployment. Every HTML page self-canonicalizes. Query variations point to the clean canonical. `index.html`, notes `.html`/trailing-slash variants and the previous résumé filename redirect to their canonical paths. HTTPS is handled by Vercel; no unsupported www/custom domain was invented.

## 5. Noindex / private inventory

- Preview/non-production Vercel builds: explicit `noindex, follow` HTML and an empty sitemap. Vercel also documents default preview/outdated-deployment noindex response headers; confirm these on the actual deployment, especially with any future custom preview domain.
- `/api/contact`: `X-Robots-Tag: noindex, nofollow`.
- Unknown addresses, including nonexistent auth/admin/account routes: real 404 with noindex, rather than the homepage returning 200.
- The external restaurant/camera apps have their own admin/auth/runtime indexing policy; that policy cannot be changed by this portfolio repository.

## 6. Entities

One stable Person identifier: `https://hikari-brandan.vercel.app/#hikari-brandan`; factual name, AI Product Developer title, Córdoba location, English/Spanish, six demonstrated subject areas, and existing GitHub/LinkedIn identity links. WebSite publisher/about points to that Person.

Six authored CreativeWork notes entities, three creator-linked WebApplications (UGC Camera, MenuTap, FoodSpot Mobile), five real macOS SoftwareApplications (iVoz, iOrganize, Screen Bridge, iStats, iBrain), and the historical Auto Barber Organization. The business is connected through Hikari’s authored notes and explicit role, without inventing an Organization founder relationship.

Product URLs are product URLs, not Person sameAs values. Auto Barber review/revenue history retains the existing qualification; no aggregateRating/review markup is created. FoodSpot’s Smash Burger installation is clearly a demonstration.

## 7. Metadata

Unique titles/descriptions/canonicals; OpenGraph title, description, URL, site name, image and image alt; Twitter card/title/description/image/alt; page-appropriate JSON-LD. Existing optimized imagery supplies the social images. Homepage title now reflects “AI Product Developer | Shipped Products & Experiments.” No extra client requests generate metadata.

## 8. Crawlers / sitemap

Public wildcard allow permits documented search crawlers including OAI-SearchBot, PerplexityBot and Claude-SearchBot. There was no prior training-crawler restriction; none was added or removed. Rendering assets remain accessible. The sitemap contains only the eight stable canonical public URLs above, with no invented lastmod, previews, API URLs, redirects or session parameters.

## 9. Validation / factual TODOs

Passed: production build, ESLint, existing contact test, generated SEO verification, and a preview-policy fixture. Raw HTML, graph reference integrity, unique metadata, headings, alt attributes and internal file destinations were checked. Public routes/redirects/404s were exercised through a local mirror of the Vercel route patterns; actual Vercel routing must be checked after deployment. The contact unit test uses a mocked provider and sends no email.

Browser checks: mobile at 320px/390px, 767/768 breakpoint transitions and 1440px desktop; one visible H1 per presentation; no horizontal overflow; original drawers and bottom navigation; unchanged demo/résumé/profile/contact hrefs; normal refresh and cold-load tests; no introduced console errors. Initial HTML contains both existing responsive variants, only one displayed per breakpoint. The permanent notes pages each contain one H1 and run without client JavaScript.

Local Chromium load measurements are diagnostics, not field Core Web Vitals or native Safari measurements. At 390px, the approved build transferred about 446KB of startup resources; this build about 451KB, with zero layout shift in both. Prerendering adds about 31KB compressed HTML versus the previous sub-1KB shell: a deliberate cost for delivering actual content before JavaScript. Cold mobile FCP was about 112ms and LCP about 132ms locally. A desktop cold-load check also reported zero layout shift. Notes HTML is roughly 2.4–4.8KB compressed and has no application JavaScript. These tests do not establish production performance on slow networks or physical iPhones.

Live UGC Camera, MenuTap menu, FoodSpot delivered receipt/photo invitation and iSuite destinations were opened successfully in the browser. GitHub/LinkedIn links are the existing supplied profile URLs, not newly guessed identities. No missing factual URL blocks the implementation; external profile ownership/name alignment and future attribution links still require account review.

## 10. Outside the repository

After publishing:

1. Verify the production URL-prefix property in Google Search Console; submit `/sitemap.xml`, inspect the homepage plus project notes, and request indexing. No Search Console ownership has been claimed or verification token invented.
2. Verify Bing Webmaster Tools (or import verified Search Console ownership) and submit the sitemap. These account actions have not been performed.
3. IndexNow is optional. It would require a real ownership key file and a publishing workflow; it is not configured and is not needed for this static sitemap implementation.
4. Align LinkedIn and the GitHub profile/README around Hikari Brandan, the same portfolio URL, accurate role/remote location and real project links. Do not claim employment or experience that is not factual. External profiles have not been edited.
5. Add accurate “Built by Hikari Brandan” attribution links from controlled product sites and repository READMEs back to the portfolio/relevant notes. Their existing sites are unchanged in this pass.
6. Check the actual deployment’s canonical redirects, contact endpoint, preview X-Robots-Tag and 404 status for `https://hikari-brandan.vercel.app`.

A separate About/ProfilePage or HTML résumé remains an optional editorial expansion. The initial homepage, Person entity, PDF and permanent evidence pages already provide the necessary identity and verification paths; neither expansion is required now.

Official references checked: [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots), [Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers), [Anthropic crawler policy](https://privacy.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json), [Vercel preview indexing](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines).
