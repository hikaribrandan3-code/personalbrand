# Hikari Brandan — product developer portfolio

Live at [personalbrand-murex.vercel.app](https://personalbrand-murex.vercel.app). A desktop portfolio built with React, Vite and Motion. It follows the supplied black, white and yellow art direction, with a real portrait, project stories, handwritten details, interactive device previews and an animated Mac app collection.

The homepage introduces UGC Camera, MenuTap, FoodSpot, five Mac apps, the development workflow and The Auto Barber. Project dialogs provide deeper notes without leaving the story. Public source and downloads are linked only where established; provenance and limitations are documented in [docs/asset-sources.md](docs/asset-sources.md).

## Run locally

```sh
npm ci
npm run dev
```

```sh
npm run build   # production files in dist/
npm run check   # ESLint
npm run preview
```

## Verification

`npm run build` and `npm run check` passed; the dependency audit reported zero vulnerabilities. Desktop checks at 1440, 1512, 1728 and 1920px found no horizontal overflow. App switching, shutter feedback, dialog keyboard/focus behavior, reduced-motion controls, links and résumé serving were checked. The live site produced no browser warning/error logs during inspected flows; all five Mac dialog tabs showed the correct headlines/repos, and Escape restored opener focus.

The retained Vercel project is `personalbrand`; the temporary duplicate was deleted after explicit user confirmation. Canonical/Open Graph metadata uses the absolute production URL. See [docs/validation.md](docs/validation.md) for the recorded results and limits.

## Content boundaries

- UGC Camera links to the live browser demo and offers an optional phone QR handoff. MenuTap retains its simple restaurant preview alongside its live menu link. UGC cycles six actual product-carousel photos with matching illustrative business tags.
- UGC Camera source is private. No public repository is invented for it or MenuTap.
- FoodSpot is an earlier exploration, with no claim of marketplace traction.
- The five Mac applications have different maturity levels. Screen Bridge is experimental; several current binaries remain staged. Only the verified iVoz v1.1.0 release download is linked.
- AI workflow tools are separated from product runtime dependencies. iBrain explicitly distinguishes local Ollama from optional cloud providers.
- The supplied résumé retains its original name and older iVoice naming. The desktop contact form sends through a server-side Resend endpoint; success appears only after provider acceptance. Email and WhatsApp remain available. See [contact setup](docs/contact-setup.md).
- This polish pass targets desktop and preserves the independent mobile closing layout. Mac previews first show the existing app screenshots, then fade into clearly labeled simulations. The iVoz mic check processes audio only in the current browser tab.

## Manual regression checklist

- [ ] Inspect 1440, 1512, 1728 and 1920px widths for typography, device proportions, overlaps, image loading and horizontal overflow.
- [ ] Select every Mac app from both selectors; confirm preview, caption and source link agree.
- [ ] Trigger the UGC shutter preview repeatedly; confirm feedback and the real camera-demo link.
- [ ] Open every project/engineering dialog; use Tab, Shift+Tab and Escape, then check focus returns to its opener.
- [ ] Test MenuTap’s live-menu CTA, all external product/source links, iVoz ZIP, résumé, email and telephone links.
- [ ] Inspect the five sourced Auto Barber review excerpts, their attribution links and motion pause behavior.
- [ ] Enable reduced motion; confirm the complete story stays readable and controls remain usable.
- [ ] Inspect browser console/runtime errors and keyboard-visible focus states.

The portfolio repository is [hikaribrandan3-code/personalbrand](https://github.com/hikaribrandan3-code/personalbrand).
