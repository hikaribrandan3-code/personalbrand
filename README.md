# Daiske Brandan — product developer portfolio

A desktop portfolio built with React, Vite and Motion. It follows the supplied black, white and yellow art direction, with a real portrait, project stories, handwritten details, interactive device previews and an animated Mac app collection.

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

Build and lint results should be recorded after running these commands; this README does not assert a completed QA run.

## Content boundaries

- UGC Camera and MenuTap demos recommend a phone. Their homepage devices are interactive/reconstructed previews; the linked products are the live experiences.
- UGC Camera source is private. No public repository is invented for it or MenuTap.
- FoodSpot is an earlier exploration, with no claim of marketplace traction.
- The five Mac applications have different maturity levels. Screen Bridge is experimental; several current binaries remain staged. Only the verified iVoz v1.1.0 release download is linked.
- AI workflow tools are separated from product runtime dependencies. iBrain explicitly distinguishes local Ollama from optional cloud providers.
- The supplied résumé retains older iVoice naming. Email is the primary contact route because no scheduling URL was supplied.
- This pass targets desktop. A separate approved mobile UI remains pending.

## Manual desktop QA

- [ ] Inspect 1440, 1512, 1728 and 1920px widths for typography, device proportions, overlaps, image loading and horizontal overflow.
- [ ] Select every Mac app from both selectors; confirm preview, caption and source link agree.
- [ ] Trigger the UGC shutter preview repeatedly; confirm feedback and the real camera-demo link.
- [ ] Open every project/engineering dialog; use Tab, Shift+Tab and Escape, then check focus returns to its opener.
- [ ] Test MenuTap’s live-menu CTA, all external product/source links, iVoz ZIP, résumé, email and telephone links.
- [ ] Switch between the two real Auto Barber reviews and verify their attribution links.
- [ ] Enable reduced motion; confirm the complete story stays readable and controls remain usable.
- [ ] Inspect browser console/runtime errors and keyboard-visible focus states.

The portfolio repository target is [hikaribrandan3-code/personalbrand](https://github.com/hikaribrandan3-code/personalbrand).
