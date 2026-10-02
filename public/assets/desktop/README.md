# Desktop delivery assets

Desktop-only derivatives of the existing portfolio assets. Original art and approved mobile assets remain unchanged.

- Portrait: 960 × 960 WebP, quality 90, used with the original portrait mask.
- Hero iVoz / MenuTap Polaroids: 450 px wide WebP, quality 88.
- Actual Mac windows: 1120–1600 px wide WebP, quality 88.
- MenuTap NFC artwork: 1000 × 1000 WebP, quality 88.
- UGC Salad Spot: original 1774 × 887 composition, WebP quality 85. Shared by its backdrop, camera, and debugging card.
- Café, pizza, Auto Barber backgrounds: original dimensions retained, WebP quality 82–84. Below-fold project backgrounds initialize within 600 px of the viewport.
- Fonts: full WOFF2 copies of the same original Display, Hand, Body and Body Bold fonts used by mobile. Desktop preloads are scoped to widths above 767 px.

No new runtime dependency. Image derivatives were encoded with the already installed Sharp tool. The FoodSpot receipt video keeps its original source and dimensions, defers its source until near the viewport, and pauses when offscreen or the document is hidden.
