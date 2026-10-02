# Hikari Brandan — product portfolio

[Live portfolio](https://hikari-brandan.vercel.app/) · [Build notes](https://hikari-brandan.vercel.app/build-notes)

A responsive portfolio for my product work across B2B SaaS, web and mobile, branded camera experiences, physical-to-digital products, and independent macOS apps. I built the site to let a visitor see the product story first, then open permanent evidence pages for implementation details and limitations.

## What I built

- Responsive desktop and mobile presentations with interactive product previews and project navigation.
- Evidence pages for [UGC Camera](https://hikari-brandan.vercel.app/projects/ugc-camera), [MenuTap](https://hikari-brandan.vercel.app/projects/menutap), [FoodSpot Mobile](https://hikari-brandan.vercel.app/projects/foodspot-mobile), [macOS apps](https://hikari-brandan.vercel.app/projects/macos-app-suite), and [The Auto Barber](https://hikari-brandan.vercel.app/projects/the-auto-barber).
- A server-side contact endpoint, résumé link, and generated SEO metadata, sitemap, and structured data.

## Technical approach

The site uses React 19, Vite, Motion, and CSS. `src/` contains the portfolio UI; `public/` holds optimized media and standalone public assets; `scripts/generate-seo.mjs` generates permanent evidence-page HTML and indexing assets during the production build. `api/` contains the contact endpoint. The mobile presentation defers below-the-fold media so the opening view stays responsive.

The main design and engineering challenge was fitting several distinct products into one coherent portfolio without flattening their status or making the page too heavy. Each evidence page explains what was built and links to source only where a suitable public repository exists. Product demos and illustrative UI are identified in the relevant project notes.

## Run and verify

```sh
npm ci
npm run dev
npm run check
npm run build
npm run check:seo
```

The production site is deployed at [hikari-brandan.vercel.app](https://hikari-brandan.vercel.app/). Some source repositories, including UGC Camera, MenuTap, and FoodSpot Mobile, remain private; this portfolio provides their public evidence. The macOS projects have different levels of maturity, and Screen Bridge is experimental.
