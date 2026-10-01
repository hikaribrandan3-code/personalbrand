const github = "https://github.com/hikaribrandan3-code";

export const macApps = [
  {
    id: "ivoz",
    name: "iVoz",
    eyebrow: "LOCAL VOICE DICTATION",
    tagline: "Hold. Speak. Release. Keep writing.",
    icon: "/assets/ivoz-icon.png",
    image: "/assets/ivoz-window-real.png",
    imageAlt: "The actual iVoz macOS application window",
    imageCaption: "Actual application window",
    description:
      "A global keyboard shortcut records speech, transcribes it locally and inserts text into the active Mac application. Optional local cleanup removes filler words and improves formatting.",
    decisions: [
      "Keep transcription local with WhisperKit and Core ML.",
      "Make dictation fit into existing applications through a global shortcut.",
      "Add vocabulary, snippets, language settings and transcription history for repeat use.",
    ],
    learned:
      "The useful part is the complete capture-to-insertion workflow. Model setup, processing time and daily reliability matter as much as the transcription itself.",
    stack: [
      "Swift",
      "SwiftUI",
      "AppKit",
      "WhisperKit",
      "Core ML",
      "AVFoundation",
      "Core Audio",
      "Accelerate",
      "llama.cpp / Metal",
      "Swift Package Manager",
    ],
    limitations: [
      "Speech models must be downloaded first; longer recordings require processing time.",
      "The published README describes lag developing during daily use. Its cause is not yet diagnosed.",
      "The v1.1.0 Apple Silicon build is ad-hoc signed and is not notarized.",
    ],
    requirements: "macOS 14+ · Apple Silicon",
    links: [
      { label: "View source", href: `${github}/ivoz-macos`, kind: "github" },
      {
        label: "Download v1.1.0 ZIP",
        href: `${github}/ivoz-macos/releases/download/v1.1.0/iVoz-macOS-arm64.zip`,
        kind: "download",
      },
      { label: "Product website", href: "https://ivoz-macos-site.vercel.app/" },
    ],
  },
  {
    id: "iorganize",
    name: "iOrganize",
    eyebrow: "LOCAL FILE ORGANIZATION",
    tagline: "A cleaner Mac, with a human in control.",
    icon: "/assets/iorganize-icon.png",
    image: "/assets/iorganize-sanitize-real.jpg",
    imageAlt:
      "Actual iOrganize Smart Sanitize cleanup candidates and review controls",
    imageCaption: "Actual Smart Sanitize scan",
    description:
      "A personal cleanup and organization utility with Smart Sanitize scans, reviewable candidates, Auto-Flow filing rules, SHA-256 duplicate checks and local activity.",
    decisions: [
      "Use local rules and file scanning; no backend, account or API key.",
      "Keep cleanup candidates reviewable before acting.",
      "Use SHA-256 to compare file content when checking duplicates.",
    ],
    learned:
      "File automation needs dependable controls. A reviewable scan is more useful than an ambitious cleanup promise that cannot be trusted.",
    stack: [
      "Swift",
      "SwiftUI",
      "AppKit",
      "Foundation",
      "CryptoKit",
      "Core Services",
    ],
    limitations: [
      "Manual scanning and review are the most dependable path.",
      "Automatic filing and deletion are still maturing and have not been consistently reliable.",
      "The latest ZIP is staged for smoke testing; the public source is the available build path.",
    ],
    requirements: "macOS 14+ · Local processing",
    links: [
      { label: "View source", href: `${github}/iorganize`, kind: "github" },
      { label: "Product website", href: "https://iorganize-eight.vercel.app/" },
    ],
  },
  {
    id: "screenbridge",
    name: "Screen Bridge",
    eyebrow: "EXPERIMENTAL",
    tagline: "An extra display, across the room.",
    icon: "/assets/screen-bridge-icon.png",
    image: "/assets/screen-bridge-real.jpg",
    imageAlt: "Actual Screen Bridge display streaming interface",
    imageCaption: "Actual application preview · device name redacted",
    description:
      "An experimental Mac-to-device display project. It creates a virtual Mac display and streams it to a compatible browser on the local network, with QR pairing and browser input relay.",
    decisions: [
      "Use a browser as the receiving surface to reduce device setup.",
      "Connect a Tauri desktop shell with Rust networking and macOS graphics APIs.",
      "Explore virtual display creation through an Objective-C bridge and CGVirtualDisplay.",
    ],
    learned:
      "Getting pixels to another device is only the beginning. Latency, synchronization, compatibility and unsupported system APIs determine whether an experiment is ready for daily use.",
    stack: [
      "Tauri 2",
      "React",
      "Vite",
      "Rust",
      "Tokio",
      "Axum",
      "WebSockets",
      "mDNS",
      "QR pairing",
      "Core Graphics",
      "Objective-C bridge",
      "CGVirtualDisplay",
      "Core Audio",
    ],
    limitations: [
      "Experimental: streams can lag and compatibility varies.",
      "CGVirtualDisplay is a private, unsupported Apple API.",
      "The local connection is unencrypted and is intended for trusted networks.",
      "Audio capture requires macOS 14.2+. Current 0.1.1 source is staged for creator testing.",
    ],
    requirements: "Experimental · Trusted local network",
    links: [
      {
        label: "View source",
        href: `${github}/screen-bridge-macos`,
        kind: "github",
      },
      {
        label: "Project website",
        href: "https://screen-bridge-macos.vercel.app/",
      },
    ],
  },
  {
    id: "istats",
    name: "iStats",
    eyebrow: "LOCAL SYSTEM MONITOR",
    tagline: "A quick look at what your Mac is doing.",
    icon: "/assets/istats-icon.png",
    image: "/assets/istats-dashboard-real.jpg",
    imageAlt:
      "Actual iStats dashboard with CPU, memory, network and disk metrics",
    imageCaption: "Actual system dashboard",
    description:
      "A lightweight system dashboard for CPU, memory, network, disk and top processes, with short rolling charts. It runs locally without an external backend.",
    decisions: [
      "Use Mach and BSD system APIs for local metrics.",
      "Keep the interface compact and glanceable.",
      "Show recent trends with Swift Charts instead of building a complex monitoring suite.",
    ],
    learned:
      "A small utility benefits from a clear boundary. A useful overview does not need to become a replacement for every system diagnostic tool.",
    stack: [
      "Swift",
      "SwiftUI",
      "AppKit",
      "Swift Charts",
      "Mach APIs",
      "BSD system APIs",
    ],
    limitations: [
      "Memory categories are estimates; charts retain 60 recent samples.",
      "It is a compact overview, not an Activity Monitor replacement.",
      "Temperature, fan and battery monitoring are not included.",
      "The 1.0.1 Apple Silicon binary is staged for smoke testing.",
    ],
    requirements: "Local metrics · No external backend",
    links: [
      { label: "View source", href: `${github}/istats`, kind: "github" },
      { label: "Product website", href: "https://istats-flame.vercel.app/" },
    ],
  },
  {
    id: "ibrain",
    name: "iBrain",
    eyebrow: "LOCAL BY DEFAULT",
    tagline: "Local models. Optional cloud providers.",
    icon: "/assets/ibrain-icon.png",
    description:
      "A native AI chat app with Ollama model selection, streaming responses, conversation search and history, custom instructions, and optional OpenAI or Anthropic providers.",
    decisions: [
      "Connect to the user’s local Ollama service rather than bundling a model runtime.",
      "Keep conversations available through local history and search.",
      "Store optional provider keys in the macOS Keychain.",
    ],
    learned:
      "Local and cloud modes need explicit boundaries. Setup, model availability and which context leaves the machine are part of the product experience.",
    stack: [
      "Swift",
      "SwiftUI",
      "AppKit",
      "Swift Package Manager",
      "Ollama localhost",
      "URLSession",
      "HTTPS / streaming APIs",
      "macOS Keychain",
      "Security framework",
    ],
    limitations: [
      "Ollama and its models are separate installations and are not bundled.",
      "Cloud mode requires the user’s provider API key and can incur provider charges.",
      "Cloud mode sends relevant conversation history and system context to the selected provider.",
      "The latest 1.0.1 binary is staged for smoke testing; public source is available.",
    ],
    requirements: "macOS 14+ · Ollama installed separately",
    links: [{ label: "View source", href: `${github}/ibrian`, kind: "github" }],
  },
];

export const projectData = {
  ugc: {
    label: "01 / UGC CAMERA",
    status: "Live product",
    title: "The customer was already taking the photo.",
    intro:
      "I turned that existing behavior into a branded camera experience for restaurants: scan a QR code or tap NFC, open the browser camera, capture and share.",
    demoUrl:
      "https://www.ugccamera.com/camera-demo?name=UGC%20Camera&type=business",
    mobileRecommended: true,
    sections: [
      {
        title: "Problem",
        paragraphs: [
          "Customers were already photographing their food. The opportunity was to make a restaurant’s identity part of that moment without asking someone to install another app.",
        ],
      },
      {
        title: "Decisions",
        items: [
          "Use QR and NFC as the entry point to a browser camera.",
          "Keep the location treatment attached to the photo experience, like a native tag in the top-left corner.",
          "Make the capture and share journey the focus, supported by restaurant branding.",
        ],
      },
      {
        title: "What I learned",
        paragraphs: [
          "A behavior that already exists is a useful place to start. The product question was how to remove friction and make that moment valuable to both the customer and the restaurant.",
        ],
      },
      {
        title: "Limitations",
        paragraphs: [
          "Browser camera use depends on device support, permission and camera availability. The demo is best experienced on a phone.",
          "The implementation is private. I share the product experience and builder-supplied stack details here; no public source repository is linked.",
        ],
      },
    ],
    stack: [
      "Supabase",
      "Authentication",
      "Database / backend services",
      "Vercel",
      "QR / NFC entry",
      "Browser camera",
    ],
    links: [
      {
        label: "Try the camera demo",
        href: "https://www.ugccamera.com/camera-demo?name=UGC%20Camera&type=business",
        kind: "demo",
      },
      { label: "Visit UGC Camera", href: "https://www.ugccamera.com/" },
    ],
  },
  menutap: {
    label: "02 / MENUTAP",
    status: "Physical + digital product",
    title: "One small object. A more useful table.",
    intro:
      "MenuTap connects a physical NFC object with a restaurant’s mobile experience: menu, Wi-Fi, Google reviews, games and social actions in one place.",
    demoUrl: "https://www.foodspotmobile.com/t/foodspot-demo/menu",
    mobileRecommended: true,
    sections: [
      {
        title: "Problem",
        paragraphs: [
          "A restaurant table can be the starting point for more than ordering. Menus, connectivity, reviews and social links are often scattered across different signs and conversations.",
        ],
      },
      {
        title: "Decisions",
        items: [
          "Make the physical tap point recognizable and easy to understand.",
          "Give each restaurant a branded mobile destination with clear, task-based actions.",
          "Include games as an optional part of the experience while keeping the menu and restaurant actions central.",
        ],
      },
      {
        title: "What I learned",
        paragraphs: [
          "Physical and digital design have to meet at the same moment. The NFC object explains what to do; the experience it opens has to make the next action obvious.",
        ],
      },
      {
        title: "Limitations",
        paragraphs: [
          "The current demo runs on foodspotmobile.com. That shared host does not make MenuTap the FoodSpot marketplace.",
          "NFC behavior depends on the device. Try the linked restaurant menu on your phone for the clearest view of the current demo.",
        ],
      },
    ],
    stack: ["NFC / NTAG213", "Mobile web UI", "Physical product design"],
    links: [
      {
        label: "Try the restaurant menu",
        href: "https://www.foodspotmobile.com/t/foodspot-demo/menu",
        kind: "demo",
      },
    ],
  },
  foodspot: {
    label: "03 / FOODSPOT MOBILE",
    status: "Earlier exploration",
    title: "The project that led to the next two.",
    intro:
      "An exploration of local food discovery and commerce. It did not become the business, but it helped shape the product thinking behind UGC Camera and MenuTap.",
    sections: [
      {
        title: "Problem",
        paragraphs: [
          "I wanted to explore how people discover nearby food and how restaurants connect with customers around that experience.",
        ],
      },
      {
        title: "Decisions",
        items: [
          "Explore food discovery through a mobile interface.",
          "Consider the restaurant relationship beyond the initial purchase.",
          "Carry the useful questions forward into more focused restaurant products.",
        ],
      },
      {
        title: "What I learned",
        paragraphs: [
          "The outcome of an early project can be a better problem definition. UGC Camera and MenuTap focus on specific restaurant moments instead of trying to rebuild the entire marketplace.",
        ],
      },
      {
        title: "Limitations",
        paragraphs: [
          "FoodSpot is presented as an earlier product exploration. I am not claiming marketplace traction, revenue or a successful launch.",
          "The current foodspotmobile.com demo represents MenuTap. It is not presented here as a surviving FoodSpot marketplace demo.",
        ],
      },
    ],
    stack: ["Mobile product design", "Food discovery / commerce exploration"],
    links: [],
  },
  mac: {
    label: "04 / MAC APPS",
    status: "iSuite / personal utilities",
    title: "Small problems deserve useful software, too.",
    intro:
      "Five Mac projects exploring dictation, file organization, display streaming, system monitoring and AI chat. Their scope and limitations are part of the story.",
    sections: [
      {
        title: "Problem",
        paragraphs: [
          "Some of the problems I build for are my own: repeating a typing task, untangling files, watching system activity or making another device useful.",
        ],
      },
      {
        title: "Decisions",
        items: [
          "Keep each application centered on one practical task.",
          "Use native macOS interfaces for the Swift utilities and a Tauri / React shell for Screen Bridge.",
          "Prefer local processing where the product supports it, with explicit boundaries for optional cloud use.",
        ],
      },
      {
        title: "What I learned",
        paragraphs: [
          "Personal use is a useful feedback loop. It exposes processing delays, unreliable automation, setup friction and compatibility issues that a polished screenshot cannot show.",
        ],
      },
      {
        title: "Limitations",
        paragraphs: [
          "These applications have different levels of maturity. Screen Bridge is experimental, and several current binaries are staged for smoke testing.",
          "The app notes below distinguish public source, verified release downloads and known limitations.",
        ],
      },
    ],
    stack: [
      "Swift / SwiftUI",
      "AppKit",
      "React / Tauri",
      "Rust",
      "macOS APIs",
      "Local processing",
    ],
    apps: macApps,
    links: [
      {
        label: "Explore the iSuite website",
        href: "https://isuitemacos-cyan.vercel.app/index.html#apps",
      },
    ],
  },
  autobarber: {
    label: "06 / THE AUTO BARBER",
    status: "Past business",
    title: "Before software, there were real customers.",
    intro:
      "I operated a Seattle-area automotive restyling and service business: six-figure revenue, 165+ Google reviews, and the everyday work of earning customer trust.",
    sections: [
      {
        title: "Problem",
        paragraphs: [
          "Customers wanted automotive work they could trust, with clear communication and a dependable experience from the first inquiry to the finished job.",
        ],
      },
      {
        title: "Decisions",
        items: [
          "Own the full customer journey: sales, marketing, service and follow-through.",
          "Build operational habits around the work, not just the result.",
          "Take responsibility for hiring, training and customer experience as the business grew.",
        ],
      },
      {
        title: "What I learned",
        paragraphs: [
          "A good idea becomes a business through delivery. Listening to customers, communicating clearly and improving how work gets done are habits I bring into product development.",
        ],
      },
      {
        title: "Limitations",
        paragraphs: [
          "Revenue reflects supplied business history. The review count is the total number of Google reviews, not a claim that every review is five-star.",
          "The Google listing is linked directly. No customer quotes have been invented for this portfolio.",
        ],
      },
    ],
    stack: [
      "Sales",
      "Marketing",
      "Customer experience",
      "Operations",
      "Hiring / training",
    ],
    links: [
      {
        label: "View Google reviews",
        href: "https://share.google/3Cf9TEYFuTnP7Z5TO",
      },
    ],
  },
  engineering: {
    label: "05 / ENGINEERING NOTES",
    status: "How I work",
    title: "The prompt isn’t the product.",
    intro:
      "AI helps me explore and build quickly. Defining the right problem, noticing when the result is wrong and turning it into useful software remain my responsibility.",
    process: [
      "Problem",
      "Research",
      "Think",
      "PRD",
      "Build with AI",
      "Test",
      "Break it",
      "Audit & fix",
      "Ship",
    ],
    sections: [
      {
        title: "Problem",
        paragraphs: [
          "Producing more code does not answer whether the product should exist or whether it works for the person using it. My workflow starts with the problem and the customer context.",
        ],
      },
      {
        title: "Decisions",
        items: [
          "Research the task, constraints and existing behavior before choosing an implementation.",
          "Write requirements and direct coding agents with a defined outcome.",
          "Inspect the implementation, test the experience and deliberately look for failure cases.",
          "Debug, audit and verify changes before shipping; keep known limitations visible.",
        ],
      },
      {
        title: "What I learned",
        paragraphs: [
          "The UGC Camera and MenuTap story grew from an earlier, broader FoodSpot exploration. The Mac projects also show why fast implementation needs a feedback loop: dictation can lag, file automation needs review and display streaming remains experimental.",
          "I want to keep improving this judgment alongside stronger engineers, close to both the product and its customers.",
        ],
      },
      {
        title: "Limitations",
        paragraphs: [
          "These are authored summaries of my supplied workflow and project notes. They are not a test log or a claim that every project has the same verification history.",
          "AI tools listed here are development tools. They are runtime dependencies only when a product explicitly integrates a provider, as iBrain can.",
        ],
      },
    ],
    stack: [
      "ChatGPT / Codex",
      "Claude",
      "Gemini",
      "Perplexity",
      "Git / GitHub",
      "Real-device feedback",
    ],
    links: [{ label: "Browse public source", href: github, kind: "github" }],
  },
};
