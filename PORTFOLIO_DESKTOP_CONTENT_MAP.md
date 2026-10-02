# Portfolio Desktop Content Map

Audit snapshot: 2026-10-02. This document records the current desktop React implementation in `src/App.jsx`, `src/DesktopNavigation.jsx`, `src/ContactExperience.jsx`, `src/projectData.js`, `src/reviewData.js`, `src/FooterQuote.jsx`, and the rendered portfolio assets. It is documentation only and is not imported by the site. Copy is transcribed as rendered at desktop widths; text that changes with controls is listed as a set of states. Decorative graphics are distinguished from product UI. Drawer copy is included where the page exposes it through “View project”, “The story”, and engineering-note actions.

## 1. Global page order

1. Desktop navigation — `src/DesktopNavigation.jsx` (mobile/tablet legacy header in `src/App.jsx`, hidden at desktop widths).
2. Hero — `Hero` in `src/App.jsx`.
3. UGC Camera — `UGC` in `src/App.jsx`; project number 01.
4. MenuTap — `MenuTap` in `src/App.jsx`; project number 02.
5. FoodSpot Mobile, operations — first chapter of `FoodSpot` in `src/App.jsx`; project number 03.
6. FoodSpot Mobile, UGC receipt — second chapter of `FoodSpot`; same project number and project; ends the project.
7. Mac Apps / iSuite — `MacApps`; project number 04.
8. How I Work — `Process`; section number 05.
9. The Auto Barber — `AutoBarber`; section number 06 and the section whose anchor is `#about`.
10. The Toolbox — `Stack`; section number 07.
11. What I’m Looking For — first part of `Contact`; section number 08.
12. Let’s Talk / contact form and closing — `Contact` plus `ContactExperience`; section number 09.
13. Closing footer — inside `ContactExperience`; a second copyright/back-to-top footer follows inside `Contact`.

There are four projects for desktop progress: UGC Camera, MenuTap, FoodSpot Mobile (both chapters count as one), and Mac Apps / iSuite. How I Work and The Auto Barber are non-project portfolio sections following project 04.

## 2. Desktop navigation

Rendered desktop header (at `min-width:1024px`) is a fixed floating translucent dark rounded bar.

- Brand: “Hikari Brandan” at the top of the page; transitions to “HB” in compact mode. Both link to `#home`.
- “Home” → `#home`.
- “Projects” → `#projects`; when a project is dominant it includes a small progress counter, e.g. `· 01/04`.
- “About” → `#about` (The Auto Barber anchor).
- “Résumé ↗” → `/Daiske-Brandan-Resume.pdf`, opens a new tab.
- Yellow “Let’s talk ↗” → `#contact`.
- The active Home/Projects/About item has a shared animated yellow pill; résumé is an action link and has no active pill.
- Full state is used through the hero. After `scrollY > 130`, the same bar contracts in width and height, tightens spacing, deepens its fill/blur, and changes the signature to HB. Returning to the top reverses this. It remains visible while scrolling.
- Progress is based on the visible area of project sections in DOM order. Current number states are 01/04 through 04/04. FoodSpot’s receipt continuation is combined with its operations chapter. Counter clears outside projects. Number alone rolls subtly. There is no additional changing headline copy.
- Scroll updates are scheduled through `requestAnimationFrame`; active states also update when navigation anchors are clicked. Reduced motion removes/simplifies transitions.
- `scroll-margin-top` is applied to major anchors at desktop sizes so headings clear the fixed bar.

## 3. Hero — exact copy

Eyebrow: `PRODUCT-FOCUSED FULL-STACK DEVELOPER · RAISED IN SEATTLE · BASED IN ARGENTINA`

Headline (each line separately animated; final two lines yellow):

> I BUILD PRODUCTS  
> FROM PROBLEMS  
> OTHER PEOPLE  
> OVERLOOK.

Body: `I use product thinking, AI and code to turn ideas into real products, businesses and tools people actually use.`

Facts: `Product-focused developer` · `Raised in Seattle` · `Based in Argentina`

Buttons: `See my work ↓` → `#projects`; `View résumé ↗` → résumé PDF.

Availability: `Open to fully remote opportunities / English & Español`

Handwritten annotations: `persistent problem solver`; `out-of-the-box thinker`.

Polaroid captions: `VOICE → TEXT`; `iVoz · macOS speech-to-text`; `TAP THE TABLE ↗`; `NFC tabletop · restaurants`.

Checklist card: `✓ IDEAS / ✓ PRODUCTS / ✓ BUSINESSES / and still learning…`

Bottom captions: `REAL PROBLEMS. REAL PRODUCTS.` and `SCROLL TO SEE THE RECEIPTS ↓`.

Visual purpose: portrait of Hikari in a FoodSpot Mobile shirt, café background, actual iVoz window and physical MenuTap artwork establish builder, product work, and restaurant context. Checklist and handwritten notes are decorative/authorial annotations.

Content purpose: product-focused full-stack developer, Seattle/Argentina background, opportunity availability, and an interest in overlooked product problems.

## 4. Project 01 — UGC Camera

**Label/status:** `01 / UGC CAMERA` · `Live product` · domain link `ugccamera.com`.

### Entry copy (desktop)
Headline:

> CUSTOMERS  
> TAKE THE PHOTO.  
> YOUR BRAND GETS  
> LEFT BEHIND.

`LEFT BEHIND.` is yellow.

Description (line breaks are visual): `Customers are already photographing their food. / So I built restaurants their own branded camera — / one NFC tap or QR scan opens the camera, adds / the business to the photo, and makes it ready to share.`

CTAs: `Try the demo ↗` (UGC Camera business camera demo); `View project` (opens UGC project drawer); `Open on your phone ↗` (opens CameraHandoff with the demo URL).

Product labels: `TAP & SNAP` / `NFC tabletop`; `SCAN & SNAP` / `QR / delivery & packaging`; `SHIPPED` / `EN · ES · PT-BR`.

Annotation: `the location stays with the photo.` The interactive phone itself has the separate annotation `native location tag. part of the photo.`

### Problem / solution / differentiator
The entry copy says customers already take food photos and proposes a branded camera that adds the business to the photo. The drawer expands the problem: `Customers already photograph food, products and experiences. Businesses want to participate in that moment, but extra steps make people less likely to use it.`

Drawer “What I built”: `TAP & SNAP uses a physical NFC tabletop camera. SCAN & SNAP uses QR entry for delivery, takeout, packaging and e-commerce. Both open the branded browser camera.`

Drawer “Key decision”: `No required account, app installation, email or phone number. Familiar camera controls make the next action obvious; reducing friction is part of the product.`

Drawer “What I learned”: `Instead of maximizing data collection before delivering value, I optimized for the probability that someone would actually use the camera.`

Drawer “What survived”: `The post-delivery photo prompt from FoodSpot became the seed for a smaller, more differentiated product. The implementation is private; the live experience is linked here.`

A differentiated positioning is explicitly described in these texts as branded, low-friction camera entry and a location/business identity that stays with a customer photo.

### Flow and features explicitly shown
`TAP & SNAP` (physical NFC tabletop) and `SCAN & SNAP` (QR for delivery, takeout, packaging and e-commerce) each open the branded browser camera. UI controls include previous/next photo, a six-item carousel, Tap & Snap / Scan & Snap mode selector, camera action, and links to preview/open the demo. The portfolio also labels shipped languages `EN · ES · PT-BR`.

Drawer stack: `Supabase`; `Business authentication / backend`; `Vercel`; `QR / NFC entry`; `Browser camera`.

### Visuals / interaction
Dark food photography background. Central iPhone-style camera preview is an interactive `UgcCameraPreview` showing food carousel imagery and a translucent branded location tag; some carousel photographs/businesses are illustrative. A right-side “Behind the build” card lists the stack. Tilt/vertical phone movement follows scroll; reduced motion disables it. The phone has photo previous/next controls, mode checkboxes, preview camera action, and external demo link. Drawer opens by View project or Engineering notes. Open on your phone opens a handoff panel.

### Drawer CTAs and internal order
1. Intro: `The customer was already taking the photo.` Status `Live product`. Intro: `FoodSpot’s post-purchase camera idea became a focused product: tap or scan, open a branded browser camera, take a photo and share.`
2. Problem.
3. What I built.
4. Key decision.
5. What I learned.
6. What survived.
7. Stack.
8. Links `Try the camera demo` and `Visit UGC Camera`; drawer footer `Let’s talk about yours` → email.

## 5. Project 02 — MenuTap

**Label/status:** `02 / MENUTAP` · `Live product` · domain `foodspotmobile.com`.

### Entry copy
Headline:

> THEN I WONDERED WHY  
> RESTAURANT TABLES  
> WERE STILL  
> JUST… TABLES.

Description: `So I built MenuTap — a simple NFC tap that brings your menu, Wi-Fi, reviews, games and more to one tap.`

CTAs: `See the demo ↗` → FoodSpotMobile MenuTap restaurant menu; `View project` → MenuTap drawer. Supporting line: `Best experienced on your phone`.

Phone welcome text: `Make yourself at home.` Brand treatment: `FOODSPOT` / `RESTAURANTE & BAR`.

Phone actions, in order:
- `View Our Menu` — `Food, drinks & more`
- `Connect to Wi-Fi` — `Stay connected`
- `Review us on Google` — `A little love goes a long way`
- `Play a Game` — `While you wait`
- `Follow Us` — `Keep in touch`

Phone footer: `a little tap. a better table.` Annotation: `one physical tap. a whole digital world.`

Right card: `Behind the build`; `NFC / NTAG213`; `Web experience`; `Restaurant menu`; `Wi-Fi access`; `Review entry`; `Games + socials`; CTA `Engineering notes` opens MenuTap drawer.

### Problem / idea / differentiator
Drawer Problem: `Menus, Wi-Fi, reviews and social actions are often scattered across signs and conversations. A restaurant table could offer a simpler entry point.`

What I built: `MenuTap connects an NFC object to a branded restaurant experience: menu, Wi-Fi, Google reviews, games and socials in one place.`

Key decision: `Reuse the restaurant functionality and product knowledge from FoodSpot, then simplify how people access it. The physical object makes the first action understandable.`

What I learned: `Earlier experiments become more valuable when their useful parts are repackaged behind a simpler interaction. One tap can do more than open a camera.`

What survived: `Menus, games and restaurant UX from FoodSpot; the physical NFC entry from Tap & Snap. The tiny snack game here is an interactive portfolio demo; the linked menu is the live product.`

### Visuals / interactions / drawer order
Physical MenuTap sticker/plaque artwork rotates with scroll motion next to a stylized portfolio phone (this phone is portfolio-built UI, not a live capture). Orbit and connection-line decoration accompany it. The phone shows menu, Wi-Fi, Google reviews, games and socials as rows; rows are a visual presentation, not each wired to individual destinations on this portfolio. Reduced motion disables transforms.

Drawer order: intro `One small object. A more useful table.`; Problem; What I built; Key decision; What I learned; What survived; Stack `NFC / NTAG213`, `Mobile web UI`, `Physical product design`; CTA `Try the restaurant menu`. Drawer footer email CTA.

## 6. Project 03 — FoodSpot Mobile (two sections)

**Label/status:** `03 / FOODSPOT MOBILE` · `Past B2B SaaS · Live demo`.

### Section 1: Product / operations
Headline:

> RESTAURANT  
> SOFTWARE.  
> WITH A LIFE  
> AFTER THE SALE.

`AFTER THE SALE.` is yellow.

Supporting copy: `B2B restaurant software for running the business and engaging its customers — from dashboard and menu management to inventory.`

Buttons: `Explore the demo ↗` → live Smash Burger demo owner Orders (`/smash-burger-demo/owner/orders`); `The story ↗` → FoodSpot drawer.

Small line: `Real mobile UI · populated demo`.

Center large tilted phone contains real FoodSpot mobile captures, selectable buttons `Dashboard`, `Menu`, `Inventory`. Side card copy: `PRODUCT / OPERATIONS`; `Run the restaurant.`; `Dashboard. Menu. Inventory. One mobile workspace.` Two real thumbnails labelled `Menu management` and `Inventory tracking`; selecting either changes the main phone selection.

The real captures are `public/assets/foodspot/dashboard-mobile.jpg`, `menu-mobile.jpg`, and `inventory-mobile.jpg` from the live populated Smash Burger demo. They show mobile dashboard analytics, menu/category/product editor, and stock/inventory items. These are captured product UI, not generated/decorative screenshots.

### Section 2: UGC receipt / differentiator
Eyebrow: `FOODSPOT MOBILE / THE DIFFERENTIATOR`.

Headline:

> THE UGC RECEIPT.  
> TURN EVERY ORDER  
> INTO ORGANIC  
> CONTENT.

The latter three lines are yellow.

Supporting copy: `FoodSpot Mobile introduced a new post-purchase surface: the UGC Receipt — a digital receipt that invites customers to photograph their order and create branded, organic content immediately after delivery.`

Flow, with icons and arrows: `ORDER / DELIVERED` → `UGC / RECEIPT` → `TAKE / A PHOTO` → `ORGANIC / CONTENT`.

CTA: `Try the live receipt ↗` → live delivered receipt at `/smash-burger-demo/status`.

Center phone shows the real 7.73-second screen recording `ugc-receipt-mobile.mp4`, poster `receipt-mobile.jpg`. It autoplays muted, loops, plays inline and hides native controls unless reduced motion is requested (then controls are shown). Recording shows delivered receipt → animated “Selfie time?” photo prompt → dismissal. This clip demonstrates the receipt/invitation stage; it does not record completion of an actual device camera capture/share.

Right column: `CUSTOMER ENGAGEMENT`; real light-mode capture `events-mobile.jpg` showing Events/referrals/event UI; caption `Events, rewards & reasons to return.`

### Drawer / sequence
“The story” opens FoodSpot drawer. Intro: `A restaurant transaction can start a story.` Status repeats `Past B2B SaaS · Live demo`. Intro copy: `B2B restaurant software connecting operations, customer engagement and organic content. The core idea was a UGC receipt that continues the experience after purchase.`

Drawer sequence:
1. Problem: `Restaurant software manages menus, inventory and transactions, but the customer relationship often stops when the order is complete. I wanted the restaurant experience to continue after purchase.`
2. What I built: `Restaurant dashboards, menu management and inventory, alongside rewards, events and customer-facing ordering. The portfolio shows the real mobile UI using the populated Smash Burger demo.`
3. The UGC receipt: `When an order is delivered, its receipt becomes a photo invitation. An animated character prompts the customer to open the branded camera and turn a completed transaction into an opportunity for organic content.`
4. What I learned: `A larger product isn’t always a better product. The most valuable outcome was recognizing which ideas deserved to survive outside the original MVP.`
5. What survived: `A food character prompting a post-delivery photo became UGC Camera’s seed. Menus, games and restaurant knowledge became useful again behind MenuTap’s simpler entry point.`
6. Stack: `Product design`; `Restaurant commerce`; `Mercado Pago / cash flows`.
7. Links: `Explore the product demo`; `Try the UGC receipt`; drawer footer `Let’s talk about yours`.

FoodSpot ends after its UGC receipt section. It is distinct from MenuTap, whose separate physical NFC/table experience is project 02.

## 7. Project 04 — Mac Apps / iSuite

**Label/status:** `04 / MAC APPS / iSUITE` · `Live products`.

Headline:

> I DIDN’T WANT  
> ANOTHER SUBSCRIPTION.  
> SO I BUILT MY OWN.

Third line uses yellow emphasis/highlight. Copy: `Small, native macOS productivity apps built to solve problems in my own workflow.` Support: `Open source. Built for Apple Silicon.` Compatibility note: `M2 or newer is a great fit. Check each app’s requirements. Independent builds aren’t Apple-notarized, so macOS may show a first-launch warning.` CTA `Explore the apps ↗` → iSuite website.

Product-area labels: `BUILT FOR THE WAY I WORK`; Apple icon + `macOS productivity apps`; handwritten `go on. pick an app` with a curved arrow pointing down-left to the interactive dock.

Actual laptop-style mockup holds changing app UI; dock and app selector select five apps. App labels and current descriptions:
- **iVoz** — `LOCAL DICTATION`; `Hold a shortcut. Speak. Release. Local dictation, with optional text cleanup.` Note: `Models download first; processing time depends on the recording.`
- **iOrganize** — `YOUR FILES. YOUR CONTROL.`; `Review cleanup candidates, find duplicates, and organize your Mac with local rules.` Note: `A personal utility with review controls, rather than a promise of perfect automation.`
- **Screen Bridge** — `EXPERIMENTAL`; `An experimental virtual Mac display streamed to a compatible device over your local network.` Note: `Compatibility and latency vary. Trusted networks only; the stream is not encrypted.`
- **iStats** — `SMALL FOOTPRINT. USEFUL SIGNAL.`; `A lightweight view of CPU, memory, network, disk and the processes behind them.` Note: `A focused system monitor, with short rolling charts.`
- **iBrain** — `LOCAL BY DEFAULT`; `Local AI chat through Ollama, with optional OpenAI and Anthropic providers.` Note: `Ollama and models install separately. Cloud providers require your API key.`

Under laptop: `MacBook Pro`. Selector names: `iVoz`, `iOrganize`, `Screen Bridge` with `EXPERIMENTAL`, `iStats`, `iBrain`. Each selection animates the app window and updates caption. Pointer movement tilts laptop; lid has a scroll-linked opening motion. Actual iVoz, iOrganize, Screen Bridge and iStats images appear where available; iBrain has no static product screenshot (`image: null`) and shows its interactive demo.

Caption includes app-specific description above, then app-specific label/name; links `Engineering notes` (opens Mac drawer) and `Source` (app GitHub repository).

Drawer intro `Small problems deserve useful software, too.`; `Five Mac projects exploring dictation, file organization, display streaming, system monitoring and AI chat. Their scope and limitations are part of the story.` Sections: Problem; Decisions; What I learned; Limitations; app explorer; stack; `Explore the iSuite website`; drawer footer email CTA. Each app explorer includes app-specific description, decisions, lessons, known limitations, requirements, stack and source/download/product links where defined. See `src/projectData.js` for the exact app-specific detail entries.

## 8. How I Work

**Label:** `05 / HOW I WORK`.

Headline:

> AI IS MY LEVERAGE.  
> NOT MY SUBSTITUTE  
> FOR THINKING.

Copy: `I use AI to work faster, explore more ideas, and get to working products. The interesting part is what happens after the prompt.`

Annotation: `AI makes producing code cheap. Knowing what to build, recognizing when it’s wrong, and turning it into something useful isn’t.`

Nine clickable process steps in order, each numbered 01–09 and joined by arrows:
1. `Problem` — `Start with a real frustration. What would a better experience look like?`
2. `Research` — `Understand the people, existing tools, and constraints before choosing a solution.`
3. `Think` — `Make the product decisions. AI can help explore; the judgment stays mine.`
4. `PRD` — `Turn the idea into clear requirements, user flows, and a scope that can ship.`
5. `Build with AI` — `Direct coding agents with context and requirements. Review what they produce.`
6. `Test` — `Check the actual experience, including on real devices where the product needs them.`
7. `Break it` — `Try the awkward cases. Slow connections, bad input, and things outside the happy path.`
8. `Audit & fix` — `Inspect the implementation, debug the failures, and verify the changes.`
9. `Ship it` — `Put it into people’s hands. Learn from what happens next.`

Prompt annotation: `The prompt isn’t the product.` CTA: `My engineering notes ↗` opens engineering drawer.

### Real examples / debug receipts
Intro: `REAL EXAMPLES`; `HOW I DEBUG.`; `I don’t guess where it broke. I reproduce, inspect, trace, find the cause and fix it.` Tools: `Chrome DevTools`; `Safari Web Inspector`; `Vercel Logs`; `Supabase Edge Function Logs`.

1. `UGC Camera` — `Sticker touch targets were too small.` Copy: `Dragging and deleting worked, but resizing and rotating stickers felt too precise on mobile. I compared the interaction directly with Instagram’s sticker controls and realized our interactive touch area was smaller. The touch target was expanded without unnecessarily making the visible control larger, making the interaction easier to use on a phone.` Accompanying image: Salad Spot branded-camera photo.
2. `Authentication` — `Login looked successful — then something downstream failed.` Copy: `When authentication appeared to complete but the app stalled or returned an error, I started with the callback URL and browser console. If the frontend didn’t explain enough, I traced the problem through Supabase Edge Function logs and database access. In some cases, RLS/data access was blocking the expected operation.` Visual process: `URL state → Console → Edge Function logs → RLS/data access → Retest`.
3. `iVoz (macOS)` — `Hotkeys and permissions weren’t behaving correctly.` Copy: `Some keyboard shortcuts weren’t being recognized consistently, and microphone permission could be requested again after relaunching the app. I tested different hotkeys and repeated launch/permission scenarios on macOS until the shortcut handling and permission flow behaved reliably.` Accompanying image: actual iVoz macOS application window.

Engineering drawer workflow copy includes: `The project notes separate supplied workflow context from verified project detail.`; `Write requirements and direct coding agents with a defined outcome.`; `Inspect the implementation, test the experience and deliberately look for failure cases.`; `Debug, audit and verify changes before shipping; keep known limitations visible.`; `The UGC Camera and MenuTap story grew from an earlier, broader FoodSpot exploration. The Mac projects also show why fast implementation needs a feedback loop: dictation can lag, file automation needs review and display streaming remains experimental.`; `I want to keep improving this judgment alongside stronger engineers, close to both the product and its customers.`; `These are authored summaries of my supplied workflow and project notes. They are not a test log or a claim that every project has the same verification history.`; `AI tools listed here are development tools. They are runtime dependencies only when a product explicitly integrates a provider, as iBrain can.`

## 9. The Auto Barber / About

**Label/status:** `06 / THE AUTO BARBER` · `Past business`.

Headline: `BEFORE I BUILT SOFTWARE, / I BUILT A BUSINESS.`

Copy: `The Auto Barber — Seattle-area / automotive restyling.`

Facts: `Six-figure revenue`; `165+ Google reviews`; `Real customers. Real problems. Real solutions.`

CTA: `See all Google reviews ↗` → Google Maps business/reviews page. Note: `The full story is coming. I’m writing it next.`

Visual: Auto Barber logo, business/photo background, handwritten `same builder. different tools.` Right Google-themed panel with Google mark, `★★★★★`, `4.9 / 165 GOOGLE REVIEWS`, rotating review excerpt/author, five selector dots, `Read all 165 Google reviews ↗`, and review wall.

Review excerpts can rotate among:
- Jeff Smith: `Couldn’t have been happier with the service and quality with the Auto Barber.`
- Lay Ybañez: `Very kind, easy going and very knowledgable.`
- Khoa Nguyen: `Hikari is a fantastic guy that not only took care of what I needed but went above and beyond…`
- Manu GP: `Super detailed oriented and customer obsessed. 100% recommended! …`
- Gerrit Maritz: `Their work speaks for itself! …`

The author links point to individual Google review URLs for Jeff and Lay, and the Google Maps listing for the others. Review wall repeats the excerpts and has `Read on Google` links.

Drawer expansion from the portfolio data: intro `Before software, there were real customers.` Copy: `I operated a Seattle-area automotive restyling and service business: six-figure revenue, 165+ Google reviews, and the everyday work of earning customer trust.` Problem: `Customers wanted automotive work they could trust, with clear communication and a dependable experience from the first inquiry to the finished job.` Decisions: `Own the full customer journey: sales, marketing, service and follow-through.`; `Build operational habits around the work, not just the result.`; `Take responsibility for hiring, training and customer experience as the business grew.` Learning: `A good idea becomes a business through delivery. Listening to customers, communicating clearly and improving how work gets done are habits I bring into product development.` Limitations: `Revenue reflects supplied business history. The review count is the total number of Google reviews, not a claim that every review is five-star.`; `The Google listing is linked directly. No customer quotes have been invented for this portfolio.`

## 10. Toolbox

**Label:** `07 / THE TOOLBOX`. Heading: `Tools I work with / to build, ship and learn.` Decorative three-cube illustration.

Groups and exact entries:
- `PRODUCT / WEB`: React; TypeScript; JavaScript; Vite.
- `NATIVE macOS`: Swift; SwiftUI; AppKit; Rust / Tauri.
- `BACKEND / DATA`: Supabase; PostgreSQL; Local APIs.
- `AI WORKFLOW`: ChatGPT / Codex; Claude; Kimi K3; Gemini; Perplexity.
- `BUILD / SHIP`: Git / GitHub; Vercel; Swift Package Manager.

## 11. What I’m Looking For

**Label:** `08 / WHAT I’M LOOKING FOR`.

Headline: `A SMALL TEAM. / REAL PROBLEMS. / ROOM TO GROW.`

Heading: `Product-minded. Customer-tested. / Still becoming a better engineer.`

Body: `I’m looking for a small, ambitious team where I can work close to the product and customers, build quickly, learn from stronger engineers, and take ownership of real problems.`

Role tags: `Product development`; `Junior full-stack`; `AI implementation`; `Technical product support`.

Facts: `Fully remote / Worldwide`; `Native English & Spanish / Communication`; `Open to learn & grow / New challenges`.

Visual: handwritten `IDEAS IN PROGRESS.` points to glowing bulb image.

## 12. Contact / final CTA

Section header: `09 / LET’S TALK`; `ESC`; `Close`; `×`; `Back to top ↗`.

Lead copy: `you’ve seen the receipts.`; `LET’S BUILD / SOMETHING.`

Supporting copy: `I don’t need to be the smartest engineer in the room. / I want to be in a room where I keep becoming a better one.`

Contact form panel:
- `Open to opportunities`
- `SEND A MESSAGE`
- `Let’s start / a conversation.`
- `Tell me a bit about what you have in mind / and I’ll get back to you soon.`
- Fields `Your name` (placeholder `Alex Johnson`); `Your email` (placeholder `alex@company.com`); topic selector `What’s this about?` choices `A role`, `A product`, `Collaboration`, `Something else`; `Your message` (placeholder `Tell me about the project, role, or idea…`; counter `0 / 500`).
- Button `Send to Hikari →`; pending state `Sending…`; success `Message sent` and `On its way to Hikari. Thanks for reaching out. I’ll get back to you soon.`; retry/error copy varies with server response.
- `I usually reply within 1–2 days.`; `WhatsApp ↗`.

Left facts: `Fully remote / Worldwide`; `Native languages` + flags/languages English and Español; `Open to / Opportunities`.

Globe visual: Seattle and Córdoba pins `SEATTLE, WA`, `CÓRDOBA, AR`; annotations `Raised here.` and `Building from here.`; button `Seattle → Córdoba` replays airplane path. Route loops on an SVG motion path unless reduced motion is enabled.

Form uses the configured email API route; WhatsApp link opens a prefilled WhatsApp draft. Email address and phone number also appear in the footer area below.

## 13. Footer

The closing footer inside ContactExperience contains:
- Signature link `Hikari Brandan` → `#home`.
- Supporting line `SEATTLE ROOTS. ARGENTINA BASE.`
- Center quote: `“I can do all things through Christ which strengtheneth me.”`; citation `Philippians 4:13 · KJV`.
- Icon links: LinkedIn, GitHub, Résumé, WhatsApp.
- `© 2026 HIKARI BRANDAN`; `BUILT TO SOLVE REAL PROBLEMS.`
- US and Argentina flags with `English` and `Español` language controls.
- `Motion on` / `Motion off` toggle (system reduced-motion preference can force off).

A following footer within `Contact` repeats a motion toggle; signature `Hikari Brandan` with crown; same Philippians quote; `© [current year] HIKARI BRANDAN`; `Back to top ↗`.

Contact details also present: `hikaristudioai@gmail.com`; `+54 351 366 8122`; social destinations LinkedIn, GitHub, résumé and WhatsApp.

## 14. Global repeated language (major visible uses)

Counts below are approximate textual occurrences in prominent copy, headings, captions and controls, not every source-code occurrence or hidden accessibility string.

- **build / built** — hero/annotation, MenuTap, FoodSpot drawer, Mac headline, How I Work, Auto Barber, contact, footer.
- **product / products** — hero, project labels and copy, FoodSpot, Mac Apps, Process, Toolbox, opportunity section.
- **problem / problems** — hero, UGC and MenuTap drawers, Mac copy, process/debug, opportunity and closing.
- **restaurant** — MenuTap, both FoodSpot sections, UGC Camera copy, Auto Barber and business context.
- **customer(s)** — UGC Camera, FoodSpot, Auto Barber, How I Work and opportunity copy.
- **photo / camera** — UGC Camera, FoodSpot receipt, MenuTap derivation and hero “receipts” language.
- **real** — hero, UGC/foodspot real UI labels, debug examples, customer proof, opportunity copy.
- **work / workflow** — hero, Mac Apps, Process, Auto Barber, contact.
- **learn / learning** — hero note, Mac Apps, process, toolbox, opportunity copy.
- **organic content / UGC** — FoodSpot receipt, UGC Camera and related drawers.
- **local** — Mac Apps and multiple individual app labels/descriptions.

## 15. Factual claims, numbers, metrics and potentially verifiable statements

This inventory transcribes claims as shown; it does not verify them. UI counts and project numbering are noted separately from product/business performance claims.

### Hero / availability
- `PRODUCT-FOCUSED FULL-STACK DEVELOPER` — professional descriptor.
- `RAISED IN SEATTLE`; `BASED IN ARGENTINA` — location statements.
- `Open to fully remote opportunities` — availability.
- `English & Español` — language statement.
- `I use product thinking, AI and code to turn ideas into real products, businesses and tools people actually use.` — work/use claim.
- `NFC tabletop · restaurants` — physical product/context claim.

### UGC Camera
- `Live product`; `ugccamera.com`.
- Customers photograph food; NFC tap/QR scan opens a camera; business identity is added to a photo; output is ready to share.
- `TAP & SNAP` uses physical NFC; `SCAN & SNAP` uses QR for delivery/packaging (drawer additionally says takeout, e-commerce); both open a branded browser camera.
- `No required account, app installation, email or phone number.`
- `Familiar camera controls`; `EN · ES · PT-BR`.
- Stack labels `Supabase`, `Business authentication / backend`, `Vercel`, `QR / NFC entry`, `Browser camera`.

### MenuTap
- `Live product`; `foodspotmobile.com`.
- One NFC tap brings menu, Wi-Fi, reviews, games and more together; phone presents five action rows.
- `NFC / NTAG213`; `Web experience`; `Review entry`; `Games + socials`.
- Drawer says linked live menu is the live product and the snack game is an interactive portfolio demo.

### FoodSpot Mobile
- `Past B2B SaaS · Live demo`.
- `B2B restaurant software`; dashboard/menu/inventory; customer engagement.
- UI footage/captures sourced from populated Smash Burger demo, and the status experience is a delivered order receipt.
- UGC Receipt is described as inviting a customer to photograph their order after delivery; animated character invites customer to branded camera.
- Stack: `Mercado Pago / cash flows` (drawer).
- Four displayed journey stages: order delivered, UGC receipt, photo, organic content.

### Mac Apps / iSuite
- `Live products`; `Open source. Built for Apple Silicon.`; `M2 or newer is a great fit.`
- `macOS 14+ · Apple Silicon` (iVoz); `macOS 14+ · Local processing` (iOrganize); Screen Bridge labeled experimental/trusted local network; `Local metrics · No external backend` (iStats); `macOS 14+ · Ollama installed separately` (iBrain).
- iVoz: local dictation/transcription, WhisperKit/Core ML; model download and processing caveat; v1.1.0 ad-hoc signed/not notarized in drawer.
- iOrganize: local rules, Smart Sanitize, SHA-256 duplicate checking; automation limitations described in drawer.
- Screen Bridge: virtual display/browser streaming, QR pairing/input relay, private unsupported `CGVirtualDisplay` API, unencrypted trusted-local-network limitation; audio capture macOS 14.2+; 0.1.1 source staged for creator testing (drawer).
- iStats: CPU, memory, network, disk and top processes; 60 recent samples; temperature/fan/battery not included; 1.0.1 binary staged for smoke testing (drawer).
- iBrain: Ollama local service, optional OpenAI/Anthropic cloud providers, Keychain storage; cloud sends relevant conversation history and system context and may incur charges; latest 1.0.1 binary staged for smoke testing (drawer).
- `Independent builds aren’t Apple-notarized, so macOS may show a first-launch warning.`

### How I Work / debugging
- Nine numbered workflow steps (01–09).
- Specific stated debugging cases and claims: UGC touch-target size was expanded; authentication traced via callback, console, Edge Function logs, RLS/data access; iVoz hotkey and microphone permission scenarios were tested on macOS.
- Tools named: Chrome DevTools, Safari Web Inspector, Vercel Logs, Supabase Edge Function Logs.

### Auto Barber
- `Past business`; Seattle-area automotive restyling/service business.
- `Six-figure revenue`; `165+ Google reviews`; dynamic panel `4.9 / 165 GOOGLE REVIEWS`.
- Drawer explains review count is total Google reviews, not a five-star-every-review claim; this is not independently checked here.
- Five named review excerpts and Google Maps links; no claim verification performed.

### Contact / footer
- `Fully remote / Worldwide`.
- `Native English & Spanish` in opportunity section; contact uses English and Español.
- `I usually reply within 1–2 days.`
- Geographic pins Seattle, WA and Córdoba, AR; `SEATTLE ROOTS. ARGENTINA BASE.`
- Visible public contact email and phone as listed above.
- Calendar/current-year copyright displays `© 2026` in this snapshot.

### Structural counters / user interface numbers
- Four project sections displayed in desktop nav progress (`01/04`–`04/04`); FoodSpot’s two visual chapters count as one.
- UGC Camera carousel displays six slides (current slide varies).
- Mac app selector has five apps.
- Process steps numbered 01–09.
- Review module says 165 reviews, rating 4.9; Auto Barber fact says 165+ Google reviews.
- UGC receipt recording duration is approximately 7.73 seconds (media metadata, not rendered copy).
- Message limit is 500 characters; UI counter begins `0 / 500`.

## 16. Machine-readable story map

```text
PAGE
├── DESKTOP NAVIGATION
│   ├── Brand: Hikari Brandan → HB when compact
│   ├── Links: Home / Projects (01–04 while in projects) / About / Résumé
│   └── CTA: Let’s talk
├── HERO
│   ├── Eyebrow: Product-focused full-stack developer · Seattle · Argentina
│   ├── Headline: I BUILD PRODUCTS FROM PROBLEMS OTHER PEOPLE OVERLOOK.
│   ├── Supporting idea: Product thinking, AI and code turn ideas into products, businesses and tools
│   └── CTA: See my work / View résumé
├── PROJECT 01 — UGC CAMERA
│   ├── Problem: customers already take photos; extra steps inhibit business participation
│   ├── Product: branded browser camera via NFC Tap & Snap or QR Scan & Snap
│   ├── Differentiator: business/location identity accompanies ready-to-share photo; low-friction entry
│   ├── Key visual: interactive branded camera phone with food photo carousel
│   ├── Main interaction: photo carousel, Tap/Scan selector, camera preview, handoff
│   └── CTA: Try the demo / View project
├── PROJECT 02 — MENUTAP
│   ├── Problem: restaurant actions scattered across signs and conversations
│   ├── Product: branded restaurant experience behind one physical NFC tap
│   ├── Differentiator: menu, Wi-Fi, reviews, games and socials from one entry point
│   ├── Key visual: physical NFC artwork + stylized restaurant phone
│   ├── Main interaction: portfolio snack-game details; live menu linked separately
│   └── CTA: See the demo / View project
├── PROJECT 03 — FOODSPOT MOBILE
│   ├── Problem: restaurant software and customer relationship often end at completed order
│   ├── Product: B2B operations, menu, inventory and customer engagement
│   ├── Differentiator: UGC Receipt converts delivery receipt into photo/content invitation
│   ├── Key visual: real mobile dashboard/menu/inventory, receipt video, Events capture
│   ├── Main interaction: three-screen selector; muted looping receipt recording
│   └── CTA: Explore the demo / The story / Try the live receipt
├── PROJECT 04 — MAC APPS / iSUITE
│   ├── Problem: small workflow and system problems in the builder’s own work
│   ├── Product: iVoz, iOrganize, Screen Bridge, iStats, iBrain
│   ├── Differentiator: focused Mac utilities; open source; mostly local workflows
│   ├── Key visual: interactive MacBook/application mockup and selectable dock
│   ├── Main interaction: select app to change laptop UI and product detail
│   └── CTA: Explore the apps / Engineering notes / Source
├── HOW I WORK
│   ├── Method: problem → research → think → PRD → AI build → test → break → audit/fix → ship
│   ├── Proof: three debug stories and tool names
│   └── CTA: My engineering notes
├── ABOUT — THE AUTO BARBER
│   ├── Story: before software, operated Seattle-area automotive restyling business
│   ├── Proof: six-figure revenue; 165+ Google reviews; 4.9 / 165 review display
│   ├── Visual: business logo/background + rotating Google review excerpts
│   └── CTA: See all Google reviews
├── THE TOOLBOX
│   └── Product/Web; Native macOS; Backend/Data; AI Workflow; Build/Ship
├── WHAT I’M LOOKING FOR
│   ├── Headline: A small team. Real problems. Room to grow.
│   ├── Roles: product development, junior full-stack, AI implementation, technical product support
│   └── Remote, language and growth preferences
├── CONTACT
│   ├── Headline: Let’s build something.
│   ├── Form: name, email, topic, message → send to Hikari
│   ├── Visual: Seattle → Córdoba globe route and plane
│   └── Alternatives: WhatsApp, email, LinkedIn, GitHub, résumé, phone
└── FOOTER
    ├── Hikari Brandan; Seattle/Argentina line; Philippians 4:13 quote
    ├── LinkedIn / GitHub / résumé / WhatsApp; flags/languages; motion toggle
    └── Copyright and back-to-top
```
