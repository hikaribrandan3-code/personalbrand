# Desktop polish verification — 2026-10-02

Local production build: http://127.0.0.1:5200/

## Changes

- Existing desktop navbar hides after 24 px of sustained downward movement below the top region, returns after 16 px upward movement, and stays visible near the top. Uses its existing passive listener / requestAnimationFrame measurement. Hidden navigation is inert and removed from the accessibility tree. Appearance, compact dimensions, active indicators, destinations, and mobile navigation are preserved.
- Existing desktop imagery uses WebP derivatives sized for its actual presentation; hero Polaroids use separate 450 px files. Same fonts are delivered as full WOFF2 files with breakpoint-scoped preloads.
- Below-fold project backgrounds initialize within 600 px of the viewport. UGC carousel loads the active photo and nearby alternatives instead of all six immediately. Desktop receipt video attaches its source near the viewport and plays only while visible; it pauses offscreen or when the document is hidden.
- Desktop decorative CSS loops pause offscreen. Images decode asynchronously below the fold. Mac dock icons reserve their square dimensions before loading.
- Added the missing MenuTap anchor. Generalized desktop direct-anchor restoration after its lazy bundle mounts, replacing the FoodSpot-only workaround.

## Measured local cold loads

1440 × 900, production builds on separate fresh localhost origins, same computer / browser. Temporary PerformanceObserver instrumentation ran only in copied build directories, not in the shipped app. Resource totals exclude the probe.

| Measurement | Before | After |
| --- | ---: | ---: |
| Initial transferred resources | 8,018,692 bytes | 1,004,056 bytes |
| First contentful paint | 132 ms | 104 ms |
| Largest contentful paint | 500 ms | 488 ms |
| Initial layout shift | 0 | 0 |
| Receipt video transfer at startup | 227,724 bytes | 0 |
| Font file bodies, all four | 435,292 bytes | 177,332 bytes |

Initial transfer fell 87.5%; font bodies fell 59.3%. Local timing samples are not a network-throttled Lighthouse benchmark or a guarantee of real-user timing. The final cold sample recorded one 56 ms startup long task; the baseline recorded none. No conclusion about CPU improvements is drawn from a single run.

Mobile entry JavaScript remains byte-identical in raw size: 256,556 bytes, build gzip 81.18 kB. A separate cold mobile origin measured 445,871 transferred bytes, zero initial layout shift, and no receipt video startup transfer. Mobile uses only its optimized font paths and retains its existing deferred video behavior.

## Regression checks

- Desktop widths: 1280, 1366, 1440, 1512, 1728, 1920; transition widths: 768, 1000, 1024. No horizontal overflow, missing loaded image, or heading outside the viewport.
- At 1440, all 21 heading rectangles and copy matched the pre-pass baseline exactly.
- Navbar: down hides, 8 px upward movement stays hidden, sustained upward movement returns, back-to-top restores the normal state. No new animation dependency.
- Home / Projects / About / Let's Talk / back-to-top destinations, normal section navigation, direct loads and refreshes of project/contact anchors, and back/forward navigation checked.
- UGC carousel, capture preview, MenuTap/UGC/FoodSpot story drawers, FoodSpot Inventory selection, Mac app selection, Mac engineering notes, process step selection, general engineering notes, review selector, globe replay, contact topics and required-field validation checked.
- Receipt video loaded and played in view, then paused when navigating to Mac apps. Mobile receipt video also loaded on approach and played in view.
- Link markup has no bare # destinations or broken internal fragment targets. External project, GitHub, LinkedIn, WhatsApp handoff and résumé destinations were opened. Google Maps destination opened, but its review content was not independently verified. No messages were sent and camera/microphone permissions were not exercised.
- Contact handler checked with mocked transport: method rejection, invalid fields, successful provider response and provider failure. Actual delivery was not tested. Local Vite preview does not host the production email function.
- Existing English/Spanish flags remain language labels; this pass does not add translation controls.
- Mobile widths 320, 375, 390, 430, 767: bottom navigation, Projects/About navigation, refresh, project media and no horizontal overflow checked. Existing mobile artwork/video and layout preserved. No Motion toggle reintroduced.
- Browser verification used the Codex in-app Chromium browser, not physical Safari/Chrome devices.
- npm run check, npm run build and git diff --check passed.

No push or deployment performed for this pass.
