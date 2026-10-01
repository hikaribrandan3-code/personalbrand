# Desktop validation — October 1, 2026

- `npm run build`: passed (Vite production build).
- `npm run check`: passed (ESLint + React Hooks checks).
- Dependency installation audit: zero reported vulnerabilities.
- Browser layout checks at 1440, 1512, 1728 and 1920 pixels: no document horizontal overflow; header and project stack panels stay within the viewport.
- All five laptop preview controls select the corresponding app and actual GitHub repository.
- Camera shutter preview updates its feedback; real camera icon and demo CTA share the verified camera-demo destination.
- Native project dialog: opening focus, Tab wrapping, Escape dismissal, body scroll restoration and focus restoration verified.
- Manual reduced-motion control: document scroll becomes immediate; portrait and laptop transforms are disabled. System preference integration and CSS reduced-motion guards are implemented and reviewed; the OS setting itself was not changed.
- All internal anchor destinations exist; all new-tab external links carry `noopener noreferrer`.
- HTTP checks returned 200 for both real demos, the iSuite site, all five repositories, the iVoz release download, all linked individual app sites and the Google business share URL.
- Supplied résumé serves successfully as `application/pdf`.
- Original portrait and shipped portrait have matching SHA-256 hashes. The separate SVG mask changes the visible silhouette without rewriting the photo.

The local development server briefly logged a hot-reload error while CSS was being rewritten. Final production-build browser logs are checked separately. No Lighthouse score is claimed. The independent mobile design pass is pending.
