# Content and asset provenance

Sources were inspected on 1 October 2026. This document records provenance and known boundaries; it does not certify compatibility or claim a completed browser QA run.

## Live product destinations

| Product | Destination | Evidence / boundary |
| --- | --- | --- |
| UGC Camera | [Camera demo](https://www.ugccamera.com/camera-demo?name=UGC%20Camera&type=business), [product website](https://www.ugccamera.com/) | Demo is the live website’s “Try it free” destination. Phone recommended. Private source; no invented GitHub link. Supabase/authentication/backend/Vercel facts come from the creator’s supplied product notes. |
| MenuTap | [Restaurant menu demo](https://www.foodspotmobile.com/t/foodspot-demo/menu) | Live branded menu was observed. Phone recommended. Physical NFC/mobile web description is creator supplied; unverified backend/framework claims omitted. The shared FoodSpot domain is not evidence of a surviving marketplace. |
| iSuite | [Mac app collection](https://isuitemacos-cyan.vercel.app/index.html#apps) | Published app identities, screenshots, public-source links and stacks. |
| The Auto Barber | [Google business profile/reviews](https://share.google/3Cf9TEYFuTnP7Z5TO), [business website](https://www.theautobarber.co/) | Google profile observed at 4.9 across 165 reviews. This does not mean every review is five-star. Revenue and operating history are creator supplied. |

## The five public Mac repositories

| App | Public source | Stack / material limitations |
| --- | --- | --- |
| iVoz | [ivoz-macos](https://github.com/hikaribrandan3-code/ivoz-macos) | Swift, SwiftUI/AppKit, WhisperKit/Core ML, local llama.cpp/Metal cleanup. macOS 14+, Apple Silicon; models download first. Processing time varies and the README records daily-use lag. |
| iOrganize | [iorganize](https://github.com/hikaribrandan3-code/iorganize) | SwiftUI/AppKit, Foundation, CryptoKit SHA-256. Local scans/rules; cleanup is reviewable. Automatic filing/deletion still maturing. Current ZIP staged; public source available. |
| Screen Bridge | [screen-bridge-macos](https://github.com/hikaribrandan3-code/screen-bridge-macos) | React/Vite, Tauri 2, Rust/Axum/WebSockets, macOS graphics/Objective-C bridge. Experimental: latency and compatibility vary; private CGVirtualDisplay is unsupported. Trusted local network only, transport unencrypted; audio needs macOS 14.2+. Current 0.1.1 build staged. |
| iStats | [istats](https://github.com/hikaribrandan3-code/istats) | SwiftUI/AppKit, Swift Charts, Mach/BSD. CPU/memory/network/disk overview; some readings are estimates and charts hold 60 samples. No fan/temperature/battery monitoring. Current 1.0.1 binary staged. |
| iBrain | [ibrian](https://github.com/hikaribrandan3-code/ibrian) | SwiftUI/AppKit, Ollama, URLSession streaming and Keychain. Ollama/models installed separately. Optional OpenAI/Anthropic modes send conversation/system context to the provider and can incur charges. Current 1.0.1 binary staged. |

Only iVoz has a verified release download linked in this portfolio: [v1.1.0 Apple Silicon ZIP](https://github.com/hikaribrandan3-code/ivoz-macos/releases/download/v1.1.0/iVoz-macOS-arm64.zip). It is ad-hoc signed and not notarized. Product websites for other apps are labeled as websites, not download buttons.

## Personal and product assets

- `portrait.png`: the supplied real portrait, originally “ChatGPT Image Oct 1, 2026, 03_08_30 AM.png”. Face is not regenerated; any silhouette mask isolates the existing photo.
- `menutap-sticker.png`: supplied `menutapsticker.png`, used as the recognizable physical NFC object.
- `ugc-table-product.jpeg`: real creator-supplied Tap & Snap tabletop product photograph, originally `IMG_0207.jpeg`.
- `Daiske-Brandan-Resume.pdf`: supplied `Daiske_Brandan_AI_Resume_Updated_MacApps.pdf`. Preserved as supplied; older iVoice naming and historical technical wording remain inside the PDF.
- `autobarber-logo.png`: supplied Auto Barber logo. Original image is small; it is not evidence of a new brand identity.
- `autobarber-workshop.jpg`: real business-owner Google album photograph showing a blue Tesla with front paint protection film/exterior coating in the workshop. [Original photograph](https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T_omc4FyhhJQcJfFGuO1QDQ5WgIvFHuyfErKPnlwgcGACYpq9MD_xtY_jtBfbFlPnF94t06PZWjX2RY_POPE987-AmpojcUfNoBf3dfayMI2XXad_tAUKehZhPapE2YBG0z-UdAQ=s1360-w1360-h1020-rw).

The two review excerpts were read on their primary Google review pages, with the original attribution: [Jeff Smith](https://www.google.com/maps/reviews/data=!4m5!14m4!1m3!1m2!1s113475545431419062931!2s0x5490ffe6d92d4c6b:0xd406f05816bbc715), [Lay Ybañez](https://www.google.com/maps/reviews/data=!4m5!14m4!1m3!1m2!1s100438662356796766727!2s0x5490ffe6d92d4c6b:0xd406f05816bbc715). No invented customer quote is used.

## Real Mac previews

`ivoz-window-real.png` is a complete creator app capture recovered from the earlier project workspace. The other previews are actual app details from the published collection:

- [iVoz dashboard](https://isuitemacos-cyan.vercel.app/assets/real/ivoz-dashboard.png)
- [iOrganize Smart Sanitize](https://isuitemacos-cyan.vercel.app/assets/real/iorganize-sanitize.jpg)
- [Screen Bridge, device name redacted](https://isuitemacos-cyan.vercel.app/assets/real/screen-bridge-redacted.jpg)
- [iStats CPU/memory/process panels](https://isuitemacos-cyan.vercel.app/assets/real/istats-dashboard.jpg)

App icons come from the same published collection: [iVoz](https://isuitemacos-cyan.vercel.app/assets/ivoz-icon.png), [iOrganize](https://isuitemacos-cyan.vercel.app/assets/iorganize-icon.png), [Screen Bridge](https://isuitemacos-cyan.vercel.app/assets/imonitor-icon.png), [iStats](https://isuitemacos-cyan.vercel.app/assets/istats-icon.png), [iBrain](https://isuitemacos-cyan.vercel.app/assets/ibrain-icon.png).

No usable full real iBrain UI screenshot was available. Its laptop preview is a labeled product overview with its real icon. Recovered illustrative iVoz/iBrain marketing files are not presented as working application captures. Homepage UGC/MenuTap phone compositions and FoodSpot discovery cards are previews, not new claims about live UI or marketplace performance.

## Supporting scene photography

These Unsplash images establish the warm café/food setting. They are not personal photographs or evidence of a real customer transaction:

- `cafe.jpg`: [café scene](https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1800&q=85&auto=format&fit=crop).
- `burger.jpg`: [burger scene](https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1400&q=85&auto=format&fit=crop).
- `pizza.jpg`: [pizza scene](https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400&q=85&auto=format&fit=crop).

No scheduling URL was supplied, so contact uses the creator’s email. A separate mobile redesign is intentionally pending.
