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

## Live deployment verification

- Retained production site: [personalbrand-murex.vercel.app](https://personalbrand-murex.vercel.app), Vercel project `personalbrand` in the `hikaristudioai-8443` account.
- Live browser inspection reported no warning or error log entries during the checked flows.
- All five Mac project-dialog tabs showed the corresponding headline and correct public source repository.
- Escape closed the live dialog and restored focus to its opener.
- Temporary duplicate project `personalbrand-dtxl` was deleted after explicit user confirmation. Vercel returned `projectDeleted=personalbrand-dtxl`; `personalbrand` was retained.

The development server briefly logged a hot-reload error while CSS was being rewritten. The live runtime check above completed without warning/error logs.

## Sharing metadata and scope

Canonical, Open Graph image/URL and Twitter card metadata are configured around the retained production URL `https://personalbrand-murex.vercel.app`.

## Final desktop polish pass

- Production build, ESLint and `git diff --check` passed. No dependency changes.
- Browser widths 1920, 1440, 1280, 1024, 900, 768, 390 and 375: no horizontal overflow. The independent mobile contact layout remains in use at 700px and below.
- Arcade: keyboard scoring, pause, 20-second round completion, replay and back controls checked. Timers pause when the tab is hidden and clean up on unmount.
- All five Mac simulations exercised: dictation sequence, folder review, sample connection, metric tabs and scripted assistant response.
- All six project dialogs: keyboard focus remains inside, Escape closes and opener focus returns. QR dialog Escape and focus restoration checked.
- Manual motion control stops cloud drift, review strip and flight animation. CSS system reduced-motion guards reviewed; OS preference was not changed.
- Contact validation blocks empty and invalid inputs. Valid input produces correctly encoded email and WhatsApp draft links. No message is sent by the site. External email-app launch was blocked by browser policy during QA and was not retried.
- Live UGC Camera demo reached Ready with enabled camera controls and no warning/error logs. Final portfolio production preview also reported no warning/error logs.
- New Earth and glass-bulb assets were generated using the built-in image tool, then optimized to transparent WebP. Original portrait and screenshot assets remain intact.
