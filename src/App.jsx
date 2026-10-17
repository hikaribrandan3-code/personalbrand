import { LocalizedText, localizedHref, localizedText, useLanguage } from "./i18n";
import { useMotionPreference } from "./motion-preferences";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  MapPin,
  Apple,
  Globe2,
  BriefcaseBusiness,
  Crown,
  Camera,
  Wifi,
  Utensils,
  Star,
  Gamepad2,
  Instagram,
  Mic,
  Folder,
  Monitor,
  Activity,
  Brain,
  Lightbulb,
  Search,
  FileText,
  FlaskConical,
  Bug,
  Wrench,
  Send,
  Check,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Smartphone,
  Database,
  Fingerprint,
  Radio,
  Code2,
  Command,
  ChevronRight,
  CheckCircle2,
  Volume2,
  Signal,
  Battery,
  Sparkles,
  UsersRound,
} from "lucide-react";
import ContactExperience, {
  LanguageFlags,
  WhatsAppIcon,
} from "./ContactExperience";
import MacDemo from "./MacDemos";
import DesktopNavigation from "./DesktopNavigation";
import UgcCameraPreview from "./UgcCameraPreview";
import { FooterQuote } from "./FooterQuote";
import { DeferredBackground, DesktopReceiptVideo } from "./DeferredMedia";
import BuildNotesLink from "./BuildNotesLink";
import { openNotes, projectPaths } from "./projectPaths";
import CameraHandoff from "./CameraHandoff";
import ReviewWall from "./ReviewWall";
import GoogleMark from "./GoogleMark";
import ContentDistribution from "./ContentDistribution";
import { barberReviews, googleReviewsUrl } from "./reviewData";
const ProjectDrawer = lazy(() => import("./ProjectDrawer"));
const MobilePortfolio = lazy(() => import("./MobilePortfolio"));
const A = "/assets/";
const links = {
  ugc: "https://www.ugccamera.com/camera-demo?name=UGC%20Camera&type=business",
  menutap: "https://www.foodspotmobile.com/t/foodspot-demo/menu",
  suite: "https://isuitemacos-cyan.vercel.app/index.html",
  github: "https://github.com/hikaribrandan3-code",
  linkedin: "https://www.linkedin.com/in/daiske-brandan-726656323/",
  email: "mailto:hikaristudioai@gmail.com",
};
const spring = { stiffness: 160, damping: 24 };
const apps = [
  {
    name: "iVoz",
    sub: "Voice → text",
    icon: "ivoz-icon.png",
    image: "desktop/ivoz-window-real.webp",
    description:
      "Hold a shortcut. Speak. Release. Local dictation, with optional text cleanup.",
    repo: "ivoz-macos",
    tag: "LOCAL DICTATION",
    note: "Models download first; processing time depends on the recording.",
  },
  {
    name: "iOrganize",
    sub: "A little less chaos",
    icon: "iorganize-icon.png",
    image: "desktop/iorganize-sanitize-real.webp",
    description:
      "Review cleanup candidates, find duplicates, and organize your Mac with local rules.",
    repo: "iorganize",
    tag: "YOUR FILES. YOUR CONTROL.",
    note: "A personal utility with review controls, rather than a promise of perfect automation.",
  },
  {
    name: "Screen Bridge",
    sub: "Another screen. Same network.",
    icon: "screen-bridge-icon.png",
    image: "desktop/screen-bridge-real.webp",
    description:
      "An experimental virtual Mac display streamed to a compatible device over your local network.",
    repo: "screen-bridge-macos",
    tag: "EXPERIMENTAL",
    note: "Compatibility and latency vary. Trusted networks only; the stream is not encrypted.",
  },
  {
    name: "iStats",
    sub: "Know your Mac",
    icon: "istats-icon.png",
    image: "desktop/istats-dashboard-real.webp",
    description:
      "A lightweight view of CPU, memory, network, disk and the processes behind them.",
    repo: "istats",
    tag: "SMALL FOOTPRINT. USEFUL SIGNAL.",
    note: "A focused system monitor, with short rolling charts.",
  },
  {
    name: "iBrain",
    sub: "Think locally",
    icon: "ibrain-icon.png",
    image: null,
    description:
      "Local AI chat through Ollama, with optional OpenAI and Anthropic providers.",
    repo: "ibrian",
    tag: "LOCAL BY DEFAULT",
    note: "Ollama and models install separately. Cloud providers require your API key.",
  },
];

function External({ href, children, className = "", ...props }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
function CTA({ href, onClick, notesProject, children, secondary = false, className = "" }) {
  const reduce = useMotionPreference();
  const { locale } = useLanguage();
  const x = useSpring(0, spring),
    y = useSpring(0, spring);
  function move(e) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.08);
    y.set((e.clientY - r.top - r.height / 2) * 0.12);
  }
  const props = {
    className: `cta ${secondary ? "secondary" : ""} ${className}`,
    onPointerMove: move,
    onPointerLeave: () => {
      x.set(0);
      y.set(0);
    },
    style: { x, y },
  };
  const destination = localizedHref(notesProject ? projectPaths[notesProject] : href, locale);
  return destination ? (
    <motion.a
      href={destination}
      target={destination.startsWith("http") ? "_blank" : undefined}
      rel={destination.startsWith("http") ? "noopener noreferrer" : undefined}
      onClick={notesProject ? (event) => openNotes(event, onClick) : undefined}
      {...props}
    >
      {children}
    </motion.a>
  ) : (
    <motion.button onClick={onClick} {...props}>
      {children}
    </motion.button>
  );
}
function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useMotionPreference();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
function Label({ n, children, badge, subdued, website }) {
  return (
    <div className="section-label">
      <span><LocalizedText>{n}</LocalizedText></span>
      <span className="label-divider">/</span>
      <span><LocalizedText>{children}</LocalizedText></span>
      {website && <External className="project-domain" href={website}>
        {new URL(website).hostname.replace("www.", "")} <ArrowUpRight size={12} />
      </External>}
      {badge && (
        <span className={`badge ${subdued ? "muted" : ""}`}>
          <i />
          {badge}
        </span>
      )}
    </div>
  );
}
function Doodle({ className = "" }) {
  const reduce = useMotionPreference();
  return (
    <svg
      className={`doodle ${className}`}
      viewBox="0 0 100 70"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M7 6C4 42 48 55 78 46M62 34l18 12-18 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.25 }}
      />
    </svg>
  );
}
function TechCard({ items, onOpen, project, label = "Behind the build" }) {
  return (
    <Reveal className="tech-card" delay={0.1}>
      <div className="tech-title">
        {label}
        <Code2 size={15} />
      </div>
      <div className="tech-items">
        {items.map(([Icon, name]) => (
          <div key={name}>
            <Icon size={19} />
            <span><LocalizedText>{name}</LocalizedText></span>
          </div>
        ))}
      </div>
      <BuildNotesLink className="notes-link" project={project} onOpen={onOpen}>
        <LocalizedText>Engineering notes</LocalizedText> <ArrowUpRight size={15} />
      </BuildNotesLink>
    </Reveal>
  );
}
function Phone({ children, className = "", label }) {
  return (
    <div className={`phone ${className}`} role="group" aria-label={label}>
      <div className="phone-screen">
        <div className="phone-status">
          <span>9:41</span>
          <span>
            <Signal size={11} />
            <Wifi size={11} />
            <Battery size={14} />
          </span>
        </div>
        <div className="dynamic-island" />
        {children}
        <div className="home-indicator" />
      </div>
      <div className="phone-volume" />
    </div>
  );
}
function Hero() {
  const ref = useRef(null),
    reduce = useMotionPreference();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const collageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  return (
    <section className="hero" id="home" ref={ref}>
      <div className="hero-backdrop" />
      <div className="hero-grain" />
      <div className="hero-inner wrap">
        <div className="hero-copy">
          <motion.div
            className="hero-eyebrow"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <LocalizedText>PRODUCT-FOCUSED FULL-STACK DEVELOPER</LocalizedText> <span>·</span> <LocalizedText>RAISED IN SEATTLE</LocalizedText> <span>·</span>{" "}
            <LocalizedText>BASED IN ARGENTINA</LocalizedText>
          </motion.div>
          <h1>
            {[
              "I BUILD PRODUCTS",
              "FROM PROBLEMS",
              "OTHER PEOPLE",
              "OVERLOOK.",
            ].map((line, i) => (
              <span
                className={`headline-line ${i >= 2 ? "yellow-line" : ""}`}
                key={line}
              >
                <motion.span
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.08 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <LocalizedText>{line}</LocalizedText>
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="hero-description"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
          >
            <LocalizedText>I use product thinking, AI and code to turn ideas into</LocalizedText>{" "}
            <em><LocalizedText>real products, businesses and tools people actually use.</LocalizedText></em>
          </motion.p>
          <div className="hero-facts">
            <span>
              <BriefcaseBusiness />
              <LocalizedText>Product-focused developer</LocalizedText>
            </span>
            <span>
              <MapPin />
              <LocalizedText>Raised in Seattle</LocalizedText>
            </span>
            <span>
              <Globe2 />
              <LocalizedText>Based in Argentina</LocalizedText>
            </span>
          </div>
          <div className="hero-cta">
            <CTA href="#projects">
              <LocalizedText>See my work</LocalizedText> <ArrowDown size={16} />
            </CTA>
            <CTA href="/Hikari_Brandan_Resume.pdf" secondary>
              <LocalizedText>View résumé</LocalizedText> <ArrowUpRight size={16} />
            </CTA>
          </div>
          <div className="availability">
            <span className="live-dot" />
            <LocalizedText>Open to fully remote opportunities</LocalizedText>{" "}
            <span className="availability-divider">/</span> <LocalizedText>English &amp; Español</LocalizedText>
          </div>
        </div>
        <motion.div className="portrait-stage" style={{ y }}>
          <img
            className="portrait"
            src={`${A}desktop/portrait.webp`}
            alt={localizedText("Hikari Brandan wearing his FoodSpot Mobile shirt")}
            width="960"
            height="960"
            fetchPriority="high"
          />
          <span className="portrait-floor" />
        </motion.div>
        <div className="annotation portrait-note">
          <span>
            <LocalizedText>persistent</LocalizedText>
            <br />
            <LocalizedText>problem solver</LocalizedText>
          </span>
          <Doodle />
        </div>
        <div className="annotation thinker-note">
          <span>
            <LocalizedText>out-of-the-box</LocalizedText>
            <br />
            <LocalizedText>thinker</LocalizedText>
          </span>
          <Doodle />
        </div>
        <motion.div className="hero-collage" style={{ y: collageY }}>
          <motion.div
            className="polaroid polaroid-mac"
            whileHover={reduce ? {} : { rotate: 0, y: -5 }}
          >
            <img src={`${A}desktop/ivoz-window-real-polaroid.webp`} alt={localizedText("Real iVoz app window")} width="450" height="312" />
            <span><LocalizedText>VOICE → TEXT</LocalizedText></span>
            <small><LocalizedText>iVoz · macOS speech-to-text</LocalizedText></small>
          </motion.div>
          <motion.div
            className="polaroid polaroid-tap"
            whileHover={reduce ? {} : { rotate: 0, y: -5 }}
          >
            <img
              src={`${A}desktop/menutap-sticker-polaroid.webp`}
              width="450" height="450"
              alt={localizedText("The physical MenuTap NFC sticker")}
            />
            <span><LocalizedText>TAP THE TABLE ↗</LocalizedText></span>
            <small><LocalizedText>NFC tabletop · restaurants</LocalizedText></small>
          </motion.div>
          <motion.div
            className="scribble-card"
            whileHover={reduce ? {} : { rotate: 0 }}
          >
            <Crown />
            <span>
              <LocalizedText>✓ IDEAS</LocalizedText>
              <br /><LocalizedText>✓ PRODUCTS</LocalizedText>
              <br /><LocalizedText>✓ BUSINESSES</LocalizedText>
              <br />
              <em>
                <LocalizedText>and still</LocalizedText>
                <br />
                <LocalizedText>learning…</LocalizedText>
              </em>
            </span>
          </motion.div>
        </motion.div>
        <div className="hero-bottom">
          <span><LocalizedText>REAL PROBLEMS. REAL PRODUCTS.</LocalizedText></span>
          <span>
            <LocalizedText>SCROLL TO SEE THE RECEIPTS</LocalizedText> <ArrowDown size={13} />
          </span>
        </div>
      </div>
    </section>
  );
}
function UGC({ onOpen }) {
  const ref = useRef(null),
    reduce = useMotionPreference(),
    [handoff, setHandoff] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? 0 : 45, reduce ? 0 : -45],
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? 0 : -8, reduce ? 0 : 3],
  );
  return (
    <section
      className="project-section dark ugc-section"
      id="projects"
      ref={ref}
    >
      <DeferredBackground className="food-backdrop" />
      <div className="wrap project-grid">
        <Reveal className="project-copy">
          <Label n="01" badge="Live product" website="https://www.ugccamera.com/">
            <LocalizedText>UGC CAMERA</LocalizedText>
          </Label>
          <h2 className="ugc-desktop-story">
            <LocalizedText>CUSTOMERS</LocalizedText>
            <br />
            <LocalizedText>TAKE THE PHOTO.</LocalizedText>
            <br />
            <LocalizedText>YOUR BRAND GETS</LocalizedText>
            <br />
            <span className="yellow"><LocalizedText>LEFT BEHIND.</LocalizedText></span>
          </h2>
          <h2 className="ugc-mobile-story">
            <LocalizedText>I NOTICED CUSTOMERS</LocalizedText>
            <br />
            <LocalizedText>WERE ALREADY</LocalizedText>
            <br />
            <LocalizedText>PHOTOGRAPHING</LocalizedText>
            <br />
            <span className="yellow"><LocalizedText>THEIR FOOD.</LocalizedText></span>
          </h2>
          <p className="ugc-desktop-story">
            <LocalizedText>Customers are already photographing their food.</LocalizedText>
            <br />
            <LocalizedText>So I built restaurants their own branded camera —</LocalizedText>
            <br />
            <LocalizedText>one NFC tap or QR scan opens the camera, adds</LocalizedText>
            <br />
            <LocalizedText>the business to the photo, and makes it ready to share.</LocalizedText>
          </p>
          <p className="ugc-mobile-story">
            <LocalizedText>So I gave restaurants their own branded camera — a simple QR or NFC tap that opens a beautiful browser camera to capture and share photos.</LocalizedText>
          </p>
          <div className="project-actions">
            <CTA href={links.ugc}>
              <LocalizedText>Try the demo</LocalizedText> <ArrowUpRight size={16} />
            </CTA>
            <CTA href="https://www.ugccamera.com/" secondary>
              <LocalizedText>View project</LocalizedText>
            </CTA>
          </div>
          <p className="project-proof"><LocalizedText>Expanded the touch targets for resizing and rotating stickers on mobile.</LocalizedText></p>
          <button
            className="phone-handoff-link"
            onClick={() => setHandoff(true)}
          >
            <Smartphone size={14} /> Open on your phone{" "}
            <ArrowUpRight size={12} />
          </button>
          <div className="ugc-entry-modes">
            <span>
              <LocalizedText>TAP &amp; SNAP</LocalizedText> <small><LocalizedText>NFC tabletop</LocalizedText></small>
            </span>
            <span>
              <LocalizedText>SCAN &amp; SNAP</LocalizedText> <small><LocalizedText>QR / delivery &amp; packaging</LocalizedText></small>
            </span>
            <span className="ugc-shipped-proof">
              <LocalizedText>SHIPPED</LocalizedText> <small><LocalizedText>EN · ES · PT-BR</LocalizedText></small>
            </span>
          </div>
        </Reveal>
        <div className="device-stage camera-stage">
          <motion.div className="phone-motion" style={{ y, rotate }}>
            <Phone
              className="camera-phone"
              label="Interactive preview of the UGC restaurant camera"
            >
              <UgcCameraPreview demoUrl={links.ugc} />
            </Phone>
          </motion.div>
          <div className="annotation camera-note">
            <span className="ugc-desktop-story"><LocalizedText>the location stays</LocalizedText><br /><LocalizedText>with the photo.</LocalizedText></span>
            <span className="ugc-mobile-story"><LocalizedText>native location tag.</LocalizedText><br /><LocalizedText>part of the photo.</LocalizedText></span>
            <Doodle />
          </div>
          <span className="scene-counter"><LocalizedText>CAMERA, BUT MAKE IT YOURS.</LocalizedText></span>
        </div>
        <TechCard
          items={[
            [Database, "Supabase"],
            [Fingerprint, "Authentication"],
            [Radio, "NFC + QR entry"],
            [Camera, "Browser camera"],
            [Globe2, "Vercel"],
            [Code2, "Backend services"],
          ]}
          project="ugc" onOpen={() => onOpen("ugc")}
        />
      </div>
      {handoff && (
        <CameraHandoff onClose={() => setHandoff(false)} url={links.ugc} />
      )}
    </section>
  );
}
function MenuTap({ onOpen }) {
  const ref = useRef(null),
    reduce = useMotionPreference();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const stickerRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? 0 : -14, reduce ? 0 : -4],
  );
  const phoneY = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? 0 : 50, reduce ? 0 : -30],
  );
  const actions = [
    [Utensils, "View Our Menu", "Food, drinks & more", "#ff8c36"],
    [Wifi, "Connect to Wi-Fi", "Stay connected", "#159dff"],
    [Star, "Review us on Google", "A little love goes a long way", "#f7bf19"],
    [Gamepad2, "Play a Game", "While you wait", "#994cff"],
    [Instagram, "Follow Us", "Keep in touch", "#ec4b82"],
  ];
  return (
    <section id="menutap" className="project-section light menutap-section" ref={ref}>
      <div className="wrap project-grid">
        <Reveal className="project-copy">
          <Label n="02" badge="Live product" website="https://www.foodspotmobile.com/">
            <LocalizedText>MENUTAP</LocalizedText>
          </Label>
          <h2>
            <LocalizedText>THEN I WONDERED WHY</LocalizedText>
            <br />
            <LocalizedText>RESTAURANT TABLES</LocalizedText>
            <br />
            <LocalizedText>WERE STILL</LocalizedText>
            <br />
            <LocalizedText>JUST… TABLES.</LocalizedText>
          </h2>
          <p>
            <LocalizedText>So I built MenuTap — a simple NFC tap that brings your menu, Wi-Fi, reviews, games and more to one tap.</LocalizedText>
          </p>
          <div className="project-actions">
            <CTA href={links.menutap}>
              <LocalizedText>See the demo</LocalizedText> <ArrowUpRight size={16} />
            </CTA>
            <CTA href="https://www.foodspotmobile.com/" secondary>
              <LocalizedText>View project</LocalizedText>
            </CTA>
          </div>
          <p className="project-proof"><LocalizedText>The live customer menu opens in a browser without a sign-in.</LocalizedText></p>
          <span className="mobile-hint">
            <Smartphone size={14} />
            <LocalizedText>Best experienced on your phone</LocalizedText>
          </span>
        </Reveal>
        <div className="device-stage tap-stage">
          <div className="tap-orbit" />
          <motion.div
            className="physical-sticker"
            style={{ rotate: stickerRotate }}
          >
            <img
              src={`${A}desktop/menutap-sticker.webp`}
              alt={localizedText("Actual MenuTap physical NFC artwork: menu, Wi-Fi, reviews, games and socials in one tap")}
              loading="lazy" decoding="async"
              width="1000"
              height="1000"
            />
          </motion.div>
          <div className="tap-connection" aria-hidden="true">
            <span />
            <span />
            <span />
            <ArrowRight />
          </div>
          <motion.div className="tap-phone-motion" style={{ y: phoneY }}>
            <Phone
              className="menu-phone"
              label="MenuTap restaurant experience preview"
            >
              <div className="restaurant-brand">
                <MapPin size={21} />
                <strong>
                  <LocalizedText>FOOD</LocalizedText><span><LocalizedText>SPOT</LocalizedText></span>
                </strong>
                <small><LocalizedText>RESTAURANTE &amp; BAR</LocalizedText></small>
              </div>
              <div className="menu-welcome"><LocalizedText>Make yourself at home.</LocalizedText></div>
              <div className="menu-actions">
                {actions.map(([Icon, title, sub, color]) => (
                  <div key={title} className="menu-action">
                    <span
                      className="menu-action-icon"
                      style={{ color, background: `${color}14` }}
                    >
                      <Icon size={22} />
                    </span>
                    <span>
                      <strong><LocalizedText>{title}</LocalizedText></strong>
                      <small><LocalizedText>{sub}</LocalizedText></small>
                    </span>
                    <ChevronRight size={14} />
                  </div>
                ))}
              </div>
              <span className="powered-by"><LocalizedText>a little tap. a better table.</LocalizedText></span>
            </Phone>
          </motion.div>
          <div className="annotation tap-note">
            <LocalizedText>one physical tap.</LocalizedText>
            <br /><LocalizedText>a whole digital world.</LocalizedText>
            <Doodle />
          </div>
        </div>
        <TechCard
          items={[
            [Radio, "NFC / NTAG213"],
            [Smartphone, "Web experience"],
            [Utensils, "Restaurant menu"],
            [Wifi, "Wi-Fi access"],
            [Star, "Review entry"],
            [Gamepad2, "Games + socials"],
          ]}
          project="menutap" onOpen={() => onOpen("menutap")}
        />
      </div>
    </section>
  );
}
function FoodSpot({ onOpen }) {
  const reduce = useMotionPreference();
  const [activeScreen, setActiveScreen] = useState(0);
  const screens = [
    { name: "Dashboard", file: "dashboard-mobile.jpg", alt: "Real FoodSpot mobile restaurant dashboard" },
    { name: "Menu", file: "menu-mobile.jpg", alt: "Real FoodSpot mobile menu management" },
    { name: "Inventory", file: "inventory-mobile.jpg", alt: "Real FoodSpot mobile inventory and stock counts" },
  ];
  return (
    <>
      <section id="foodspot" className="project-section dark foodspot-section">
        <DeferredBackground className="pizza-backdrop" />
        <div className="wrap project-grid">
          <Reveal className="project-copy">
            <Label n="03" badge="Past B2B SaaS · Live demo" subdued><LocalizedText>FOODSPOT MOBILE</LocalizedText></Label>
            <h2><LocalizedText>RESTAURANT</LocalizedText><br /><LocalizedText>SOFTWARE.</LocalizedText><br /><LocalizedText>WITH A LIFE</LocalizedText><br /><span className="yellow"><LocalizedText>AFTER THE SALE.</LocalizedText></span></h2>
            <p><LocalizedText>B2B restaurant software for running the business and engaging its customers — from dashboard and menu management to inventory.</LocalizedText></p>
            <div className="project-actions">
              <CTA href="https://foodspotapp-gold.vercel.app/smash-burger-demo/owner/orders"><LocalizedText>Explore the demo</LocalizedText> <ArrowUpRight size={16} /></CTA>
              <CTA href="https://foodspotapp-gold.vercel.app/smash-burger-demo/status" secondary><LocalizedText>Try the live receipt</LocalizedText> <ArrowUpRight size={16} /></CTA>
            </div>
            <p className="project-proof"><LocalizedText>Explore the populated owner demo, then open engineering notes for menu and inventory details.</LocalizedText></p>
            <BuildNotesLink className="notes-link foodspot-notes-link" project="foodspot" onOpen={() => onOpen("foodspot")}><LocalizedText>Engineering notes</LocalizedText> <ArrowUpRight size={15} /></BuildNotesLink>
            <div className="evolution"><span><LocalizedText>Real mobile UI · populated demo</LocalizedText></span></div>
          </Reveal>
          <div className="device-stage foodspot-stage foodspot-capture-stage">
            <motion.div initial={reduce ? false : { rotate: -12, y: 35 }} whileInView={{ rotate: -6, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", bounce: 0.15, duration: 0.8 }}>
              <Phone className="foodspot-phone foodspot-real-phone" label={`Real FoodSpot Mobile ${screens[activeScreen].name} interface`}>
                <img key={screens[activeScreen].file} className="foodspot-real-screen" src={`${A}foodspot/${screens[activeScreen].file}`} alt={screens[activeScreen].alt} width="390" height="832" loading="lazy" decoding="async" />
              </Phone>
            </motion.div>
            <div className="foodspot-screen-tabs" role="group" aria-label={localizedText("Explore FoodSpot mobile operations")}>
              {screens.map((item, index) => <button key={item.name} type="button" aria-pressed={activeScreen === index} onClick={() => setActiveScreen(index)}><LocalizedText>{item.name}</LocalizedText></button>)}
            </div>
          </div>
          <Reveal className="lesson-card foodspot-evidence-card">
            <span className="tiny-label"><LocalizedText>PRODUCT / OPERATIONS</LocalizedText></span>
            <h3><LocalizedText>Run the</LocalizedText><br /><LocalizedText>restaurant.</LocalizedText></h3>
            <p><LocalizedText>Dashboard. Menu. Inventory.</LocalizedText><br /><LocalizedText>One mobile workspace.</LocalizedText></p>
            <div className="foodspot-supporting-shots">
              {[1, 2].map(index => <button key={screens[index].name} type="button" onClick={() => setActiveScreen(index)} aria-label={`View real mobile ${screens[index].name} screen`}>
                <img src={`${A}foodspot/${screens[index].file}`} alt={screens[index].alt} width="390" height="832" loading="lazy" decoding="async" /><span>{index === 1 ? "Menu management" : "Inventory tracking"}</span>
              </button>)}
            </div>
          </Reveal>
        </div>
      </section>
      <section id="foodspot-receipt" className="project-section dark foodspot-section foodspot-differentiator" aria-label={localizedText("FoodSpot Mobile UGC receipt")}>
        <div className="wrap project-grid">
          <Reveal className="project-copy">
            <span className="tiny-label"><LocalizedText>FOODSPOT MOBILE / THE DIFFERENTIATOR</LocalizedText></span>
            <h2><LocalizedText>THE UGC RECEIPT.</LocalizedText><br /><span className="yellow"><LocalizedText>TURN EVERY ORDER</LocalizedText><br /><LocalizedText>INTO ORGANIC</LocalizedText><br /><LocalizedText>CONTENT.</LocalizedText></span></h2>
            <p><LocalizedText>FoodSpot Mobile introduced a new post-purchase surface: the UGC Receipt — a digital receipt that invites customers to photograph their order and create branded, organic content immediately after delivery.</LocalizedText></p>
            <div className="foodspot-receipt-flow" aria-label={localizedText("Order delivered, UGC receipt, take a photo, organic content")}>
              {[[Utensils, "ORDER", "DELIVERED"], [FileText, "UGC", "RECEIPT"], [Camera, "TAKE", "A PHOTO"], [Activity, "ORGANIC", "CONTENT"]].map(([Icon, first, second], index) => <div className="foodspot-flow-step" key={first}>
                {index > 0 && <ArrowRight className="foodspot-flow-arrow" size={18} aria-hidden="true" />}
                <span className="foodspot-flow-icon"><Icon size={23} aria-hidden="true" /></span><span><LocalizedText>{first}</LocalizedText><br /><LocalizedText>{second}</LocalizedText></span>
              </div>)}
            </div>
            <CTA href="https://foodspotapp-gold.vercel.app/smash-burger-demo/status"><LocalizedText>Try the live receipt</LocalizedText> <ArrowUpRight size={16} /></CTA>
          </Reveal>
          <div className="device-stage foodspot-stage">
            <Phone className="foodspot-phone foodspot-real-phone" label="Real FoodSpot Mobile UGC receipt interaction">
              <DesktopReceiptVideo />
            </Phone>
          </div>
          <Reveal className="foodspot-engagement">
            <span className="tiny-label"><LocalizedText>CUSTOMER ENGAGEMENT</LocalizedText></span>
            <img src={`${A}foodspot/events-mobile.jpg`} alt={localizedText("Real FoodSpot mobile Events screen in light mode")} width="390" height="832" loading="lazy" decoding="async" />
            <span><LocalizedText>Events, rewards &amp; reasons to return.</LocalizedText></span>
          </Reveal>
        </div>
      </section>
    </>
  );
}
function MacApps({ onOpen }) {
  const [active, setActive] = useState(0),
    ref = useRef(null),
    reduce = useMotionPreference();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const lid = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [reduce ? 0 : 34, 0, 0],
  );
  const ry = useSpring(0, spring),
    rx = useSpring(0, spring);
  function tilt(e) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left - r.width / 2) / r.width) * 6);
    rx.set((-(e.clientY - r.top - r.height / 2) / r.height) * 4);
  }
  const app = apps[active];
  return (
    <section className="mac-section light" id="mac-apps" ref={ref}>
      <div className="wrap">
        <div className="mac-heading">
          <Reveal>
            <Label n="04" badge="Live products">
              <LocalizedText>MAC APPS / iSUITE</LocalizedText>
            </Label>
            <h2>
              <LocalizedText>I DIDN’T WANT</LocalizedText>
              <br />
              <LocalizedText>ANOTHER SUBSCRIPTION.</LocalizedText>
              <br />
              <span><LocalizedText>SO I BUILT MY OWN.</LocalizedText></span>
            </h2>
            <p>
              <LocalizedText>Small, native macOS productivity apps built to solve problems in my own workflow.</LocalizedText>
              <span className="mac-open-source"><Github size={14} /> <LocalizedText>Open source. Built for Apple Silicon.</LocalizedText></span>
              <small className="mac-compatibility"><LocalizedText>M2 or newer is a great fit. Check each app’s requirements. Independent builds aren’t Apple-notarized, so macOS may show a first-launch warning.</LocalizedText></small>
            </p>
            <CTA href={links.suite}>
              <LocalizedText>Explore the apps</LocalizedText> <ArrowUpRight size={16} />
            </CTA>
          </Reveal>
          <div className="mac-main">
            <div className="mac-kicker">
              <span>
                <Command size={13} />
                <LocalizedText>BUILT FOR THE WAY I WORK</LocalizedText>
              </span>
              <span className="mac-platform"><Apple size={17} aria-hidden="true" /> <LocalizedText>macOS productivity apps</LocalizedText></span>
              <span className="annotation"><LocalizedText>go on. pick an app</LocalizedText></span>
            </div>
            <svg className="mac-picker-arrow" viewBox="0 0 1000 585" fill="none" aria-hidden="true">
              <path d="M995 8C990 180 885 420 510 570" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <path d="m570 531-61 39 51 13" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <motion.div
              className="laptop-stage"
              style={{ rotateY: ry, rotateX: rx }}
              onPointerMove={tilt}
              onPointerLeave={() => {
                ry.set(0);
                rx.set(0);
              }}
            >
              <motion.div className="laptop-lid" style={{ rotateX: lid }}>
                <div className="laptop-camera" />
                <div className="laptop-display">
                  <div className="mac-menubar">
                    <Command size={9} />
                    <b><LocalizedText>{app.name}</LocalizedText></b>
                    <span><LocalizedText>File</LocalizedText></span>
                    <span><LocalizedText>View</LocalizedText></span>
                    <span><LocalizedText>Window</LocalizedText></span>
                    <span className="mac-menu-right"><LocalizedText>Thu 9:41 AM</LocalizedText></span>
                  </div>
                  <div className="mac-desktop">
                    <div className="desktop-glow" />
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        className={`app-window app-window-${active}`}
                        key={app.name}
                        initial={
                          reduce ? false : { opacity: 0, scale: 0.95, y: 10 }
                        }
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.22 }}
                      >
                        <div className="window-top">
                          <span className="window-dots">
                            <i />
                            <i />
                            <i />
                          </span>
                          <span><LocalizedText>{app.name}</LocalizedText></span>
                          <span />
                        </div>
                        <MacDemo active={active} image={app.image ? `${A}${app.image}` : null} name={app.name} />
                      </motion.div>
                    </AnimatePresence>
                    <div className="mac-dock">
                      {apps.map((a, i) => (
                        <button
                          key={a.name}
                          aria-label={`Show ${a.name} on the laptop`}
                          aria-pressed={active === i}
                          onClick={() => setActive(i)}
                        >
                          <img src={`${A}${a.icon}`} alt="" width="64" height="64" loading="lazy" decoding="async" />
                          <i className={active === i ? "on" : ""} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="laptop-chin"><LocalizedText>MacBook Pro</LocalizedText></div>
              </motion.div>
              <div className="laptop-base">
                <div className="laptop-notch" />
              </div>
              <div className="laptop-shadow" />
            </motion.div>
            <div
              className="app-selector"
              role="group"
              aria-label={localizedText("Select a Mac app preview")}
            >
              {apps.map((a, i) => (
                <button
                  key={a.name}
                  className={active === i ? "active" : ""}
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                >
                  <img src={`${A}${a.icon}`} alt="" width="64" height="64" loading="lazy" decoding="async" />
                  <strong><LocalizedText>{a.name}</LocalizedText></strong>
                  <small><LocalizedText>{a.sub}</LocalizedText></small>
                  {i === 2 ? (
                    <span className="experimental-tag"><LocalizedText>EXPERIMENTAL</LocalizedText></span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="app-caption" aria-live="polite">
          <div>
            <span className="tiny-label"><LocalizedText>{app.tag}</LocalizedText></span>
            <h3><LocalizedText>{app.name}</LocalizedText></h3>
          </div>
          <p>
            {app.description}
            <small><LocalizedText>{app.note}</LocalizedText></small>
            {app.id === "ivoz" && <small><LocalizedText>Retested shortcut and microphone-permission behavior across repeated launches.</LocalizedText></small>}
          </p>
          <div className="app-links">
            <BuildNotesLink project="mac" onOpen={() => onOpen("mac")}>
              <LocalizedText>Engineering notes</LocalizedText> <ArrowUpRight size={14} />
            </BuildNotesLink>
            <External
              href={`https://github.com/hikaribrandan3-code/${app.repo}`}
            >
              <Github size={14} />
              <LocalizedText>Source</LocalizedText>
            </External>
          </div>
        </div>
      </div>
    </section>
  );
}
const steps = [
  {
    name: "Problem",
    Icon: Lightbulb,
    color: "#ffbd00",
    text: "Start with a real frustration. What would a better experience look like?",
  },
  {
    name: "Research",
    Icon: Search,
    color: "#128bff",
    text: "Understand the people, existing tools, and constraints before choosing a solution.",
  },
  {
    name: "Think",
    Icon: Brain,
    color: "#9968ed",
    text: "Make the product decisions. AI can help explore; the judgment stays mine.",
  },
  {
    name: "PRD",
    Icon: FileText,
    color: "#27a68b",
    text: "Turn the idea into clear requirements, user flows, and a scope that can ship.",
  },
  {
    name: "Build with AI",
    Icon: Sparkles,
    color: "#3f9c6d",
    text: "Direct coding agents with context and requirements. Review what they produce.",
  },
  {
    name: "Test",
    Icon: FlaskConical,
    color: "#28ace8",
    text: "Check the actual experience, including on real devices where the product needs them.",
  },
  {
    name: "Break it",
    Icon: Bug,
    color: "#f2734c",
    text: "Try the awkward cases. Slow connections, bad input, and things outside the happy path.",
  },
  {
    name: "Audit & fix",
    Icon: Wrench,
    color: "#4e596c",
    text: "Inspect the implementation, debug the failures, and verify the changes.",
  },
  {
    name: "Ship it",
    Icon: Send,
    color: "#151515",
    text: "Put it into people’s hands. Learn from what happens next.",
  },
];
const debugTools = [
  [Code2, "Chrome DevTools"],
  [Globe2, "Safari Web Inspector"],
  [Activity, "Vercel Logs"],
  [Database, "Supabase Edge Function Logs"],
];
const debugExamples = [
  {
    product: "UGC Camera",
    title: "Sticker touch targets were too small.",
    copy: "Dragging and deleting worked, but resizing and rotating stickers felt too precise on mobile. I compared the interaction directly with Instagram’s sticker controls and realized our interactive touch area was smaller. The touch target was expanded without unnecessarily making the visible control larger, making the interaction easier to use on a phone.",
    image: `${A}desktop/ugc-salad-spot.webp`,
    alt: "Salad Spot branded-camera photo from UGC Camera",
  },
  {
    product: "Authentication",
    title: "Login looked successful — then something downstream failed.",
    copy: "When authentication appeared to complete but the app stalled or returned an error, I started with the callback URL and browser console. If the frontend didn’t explain enough, I traced the problem through Supabase Edge Function logs and database access. In some cases, RLS/data access was blocking the expected operation.",
    flow: ["URL state", "Console", "Edge Function logs", "RLS/data access", "Retest"],
  },
  {
    product: "iVoz (macOS)",
    title: "Hotkeys and permissions weren’t behaving correctly.",
    copy: "Some keyboard shortcuts weren’t being recognized consistently, and microphone permission could be requested again after relaunching the app. I tested different hotkeys and repeated launch/permission scenarios on macOS until the shortcut handling and permission flow behaved reliably.",
    image: `${A}desktop/ivoz-window-real.webp`,
    alt: "Actual iVoz macOS application window",
  },
];
function Process({ onOpen }) {
  const [active, setActive] = useState(0);
  return (
    <section className="process-section light" id="how-i-work">
      <div className="wrap">
        <div className="process-header">
          <Reveal>
            <Label n="05"><LocalizedText>HOW I WORK</LocalizedText></Label>
            <h2>
              <LocalizedText>AI IS MY LEVERAGE.</LocalizedText>
              <br />
              <LocalizedText>NOT MY SUBSTITUTE</LocalizedText>
              <br />
              <LocalizedText>FOR THINKING.</LocalizedText>
            </h2>
          </Reveal>
          <p>
            I use AI to work faster, explore more ideas, and get to working
            products.{" "}
            <strong>
              <LocalizedText>The interesting part is what happens after the prompt.</LocalizedText>
            </strong>
          </p>
          <div className="process-side annotation">
            <LocalizedText>AI makes producing code cheap.</LocalizedText>
            <br />
            <LocalizedText>Knowing what to build, recognizing</LocalizedText>
            <br />
            <LocalizedText>when it’s wrong, and turning it into</LocalizedText>
            <br />
            <LocalizedText>something useful isn’t.</LocalizedText>
          </div>
        </div>
        <div className="process-track">
          {steps.map(({ name, Icon, color }, i) => (
            <motion.button
              key={name}
              className={`process-step ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
              initial={{ opacity: 0.6 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              aria-pressed={active === i}
            >
              <span
                className="process-circle"
                style={{ "--step-color": color }}
              >
                <Icon size={25} />
              </span>
              <span><LocalizedText>{name}</LocalizedText></span>
              {i !== 8 ? <ArrowRight className="step-arrow" size={15} /> : null}
              <small>0{i + 1}</small>
            </motion.button>
          ))}
        </div>
        <div className="process-bottom">
          <div className="process-detail" aria-live="polite">
            <span>{steps[active].name}</span>
            <p>{steps[active].text}</p>
          </div>
          <span className="annotation prompt-note">
            <LocalizedText>The prompt isn’t the product.</LocalizedText>
            <svg viewBox="0 0 220 12" aria-hidden="true">
              <path
                d="M3 7Q110 0 217 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </span>
          <CTA notesProject="engineering" onClick={() => onOpen("engineering")}>
            <LocalizedText>My engineering notes</LocalizedText> <ArrowUpRight size={16} />
          </CTA>
        </div>
        <div className="debug-receipts" aria-label={localizedText("Real examples of how I debug")}>
          <div className="debug-intro">
            <span className="debug-eyebrow"><LocalizedText>REAL EXAMPLES</LocalizedText></span>
            <h3><LocalizedText>HOW I</LocalizedText> <span><LocalizedText>DEBUG.</LocalizedText></span></h3>
            <p><LocalizedText>I don’t guess where it broke.</LocalizedText><br /><LocalizedText>I reproduce, inspect, trace,</LocalizedText><br /><LocalizedText>find the cause and fix it.</LocalizedText></p>
            <div className="debug-tools" aria-label={localizedText("Debugging tools")}>
              {debugTools.map(([Icon, name]) => (
                <span key={name}><Icon size={14} aria-hidden="true" /><LocalizedText>{name}</LocalizedText></span>
              ))}
            </div>
          </div>
          {debugExamples.map((example, index) => (
            <article className="debug-card" key={example.product}>
              <div className="debug-card-label"><b>0{index + 1}</b><span><LocalizedText>{example.product}</LocalizedText></span></div>
              {example.image ? (
                <div className="debug-card-visual">
                  <img src={example.image} alt={example.alt} loading="lazy" decoding="async" />
                </div>
              ) : (
                <div className="debug-flow" aria-label={localizedText("Callback URL, console, Edge Function logs, RLS or data access, retest")}>
                  {example.flow.map((step, i) => <span key={step}>{step}{i < example.flow.length - 1 && <ArrowRight size={11} aria-hidden="true" />}</span>)}
                </div>
              )}
              <h4><LocalizedText>{example.title}</LocalizedText></h4>
              <p><LocalizedText>{example.copy}</LocalizedText></p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function AutoBarber() {
  const [review, setReview] = useState(0);
  const reviews = barberReviews;
  return (
    <section className="business-section dark" id="about">
      <DeferredBackground className="business-backdrop" />
      <div className="wrap business-grid">
        <Reveal>
          <Label n="06" badge="Past business" subdued>
            <LocalizedText>THE AUTO BARBER</LocalizedText>
          </Label>
          <h2>
            <LocalizedText>BEFORE I BUILT SOFTWARE,</LocalizedText>
            <br /><LocalizedText>I BUILT A BUSINESS.</LocalizedText>
          </h2>
          <p>
            <LocalizedText>The Auto Barber — Seattle-area</LocalizedText>
            <br />
            <LocalizedText>automotive restyling.</LocalizedText>
          </p>
          <div className="business-facts">
            <span>
              <CheckCircle2 />
              <LocalizedText>Six-figure revenue</LocalizedText>
            </span>
            <span>
              <CheckCircle2 />
              <LocalizedText>165+ Google reviews</LocalizedText>
            </span>
            <span>
              <CheckCircle2 />
              <LocalizedText>Real customers. Real problems. Real solutions.</LocalizedText>
            </span>
          </div>
          <CTA href={googleReviewsUrl}>
            <LocalizedText>See all Google reviews</LocalizedText> <ArrowUpRight size={16} />
          </CTA>
          <External href="https://hikari-brandan.vercel.app/projects/the-auto-barber" className="business-story-note">
            <LocalizedText>Read the Auto Barber story</LocalizedText> <ArrowUpRight size={13} />
          </External>
        </Reveal>
        <div className="business-visual">
          <img
            src={`${A}autobarber-logo.png`}
            width="92" height="92"
            alt={localizedText("The Auto Barber logo")}
            loading="lazy" decoding="async"
          />
          <span className="annotation">
            <LocalizedText>same builder.</LocalizedText>
            <br />
            <LocalizedText>different tools.</LocalizedText>
          </span>
        </div>
        <Reveal className="business-proof">
          <div className="google-mark"><GoogleMark size={27} /></div>
          <span className="review-stars">★★★★★</span>
          <div className="review-card" aria-live="polite">
            <span className="review-aggregate"><LocalizedText>4.9 / 165 GOOGLE REVIEWS</LocalizedText></span>
            <blockquote>“{reviews[review].quote}{reviews[review].excerpt ? "…" : ""}”</blockquote>
            <External href={reviews[review].href} className="review-author">
              {reviews[review].name} <ArrowUpRight size={12} />
            </External>
          </div>
          <div className="review-controls">
            {reviews.map((r, i) => (
              <button
                key={r.name}
                onClick={() => setReview(i)}
                aria-label={`Read ${r.name}’s review`}
                aria-pressed={review === i}
                className={review === i ? "active" : ""}
              />
            ))}
          </div>
          <External href={googleReviewsUrl}>
            <LocalizedText>Read all 165 Google reviews</LocalizedText> <ArrowUpRight size={15} />
          </External>
        </Reveal>
        <ReviewWall />
      </div>
    </section>
  );
}
const tools = [
  {
    label: "PRODUCT / WEB",
    items: ["React", "TypeScript", "JavaScript", "Vite"],
  },
  {
    label: "NATIVE macOS",
    items: ["Swift", "SwiftUI", "AppKit", "Rust / Tauri"],
  },
  { label: "BACKEND / DATA", items: ["Supabase", "PostgreSQL", "Local APIs"] },
  {
    label: "AI WORKFLOW",
    items: ["ChatGPT / Codex", "Claude", "Kimi K3", "Gemini", "Perplexity"],
  },
  {
    label: "BUILD / SHIP",
    items: ["Git / GitHub", "Vercel", "Swift Package Manager"],
  },
];
function Stack() {
  return (
    <section className="stack-section light">
      <div className="wrap stack-layout">
        <div>
          <Label n="07"><LocalizedText>THE TOOLBOX</LocalizedText></Label>
          <h3>
            <LocalizedText>Tools I work with</LocalizedText>
            <br />
            <span><LocalizedText>to build, ship and learn.</LocalizedText></span>
          </h3>
          <div className="tool-cubes" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="tool-groups">
          {tools.map((t) => (
            <div className="tool-group" key={t.label}>
              <div
                className={`tool-icon tool-icon-${tools.indexOf(t)}`}
                aria-hidden="true"
              >
                {
                  [
                    <Globe2 />,
                    <Command />,
                    <Database />,
                    <Sparkles />,
                    <Github />,
                  ][tools.indexOf(t)]
                }
              </div>
              <span><LocalizedText>{t.label}</LocalizedText></span>
              {t.items.map((item) => (
                <p key={item}><LocalizedText>{item}</LocalizedText></p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Contact() {
  return (
    <>
      <section className="opportunity-section light">
        <div className="wrap opportunity-grid">
          <div>
            <Label n="08"><LocalizedText>WHAT I’M LOOKING FOR</LocalizedText></Label>
            <h2>
              <LocalizedText>A SMALL TEAM.</LocalizedText>
              <br />
              <LocalizedText>REAL PROBLEMS.</LocalizedText>
              <br />
              <span><LocalizedText>ROOM TO GROW.</LocalizedText></span>
            </h2>
          </div>
          <div className="opportunity-copy">
            <div className="ideas-bulb" aria-hidden="true">
              <span className="annotation">
                <LocalizedText>IDEAS</LocalizedText>
                <br />
                <LocalizedText>IN PROGRESS.</LocalizedText>
                <Doodle />
              </span>
              <span className="bulb-glow" />
              <img
                src="/assets/ideas-bulb.webp"
                alt=""
                width="433"
                height="650"
                loading="lazy" decoding="async"
              />
            </div>
            <h3>
              <LocalizedText>Product-minded. Customer-tested.</LocalizedText>
              <br />
              <LocalizedText>Still becoming a better engineer.</LocalizedText>
            </h3>
            <p>
              <LocalizedText>I’m looking for a small, ambitious team where I can work close to the product and customers, build quickly, learn from stronger engineers, and take ownership of real problems.</LocalizedText>
            </p>
            <div className="role-tags">
              <span>
                <Database size={15} /> <LocalizedText>Product development</LocalizedText>
              </span>
              <span>
                <UsersRound size={15} /> <LocalizedText>Junior full-stack</LocalizedText>
              </span>
              <span>
                <Sparkles size={15} /> <LocalizedText>AI implementation</LocalizedText>
              </span>
              <span>
                <Wrench size={15} /> <LocalizedText>Technical product support</LocalizedText>
              </span>
            </div>
            <div className="opportunity-facts">
              <span>
                <Globe2 />
                <span>
                  <LocalizedText>Fully remote</LocalizedText><small><LocalizedText>Worldwide</LocalizedText></small>
                </span>
              </span>
              <span>
                <Volume2 />
                <span>
                  <LocalizedText>Native English &amp; Spanish</LocalizedText><small><LocalizedText>Communication</LocalizedText></small>
                </span>
              </span>
              <span>
                <Lightbulb />
                <span>
                  <LocalizedText>Open to learn &amp; grow</LocalizedText><small><LocalizedText>New challenges</LocalizedText></small>
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
      <div id="contact">
        <ContactExperience />
        <section className="contact-section mobile-closing">
          <div className="contact-orbit" aria-hidden="true" />
          <div className="wrap contact-inner">
            <div className="contact-intro">
              <Label n="09"><LocalizedText>LET’S TALK</LocalizedText></Label>
              <div className="annotation"><LocalizedText>you’ve seen the receipts.</LocalizedText></div>
              <h2>
                <LocalizedText>LET’S BUILD</LocalizedText>
                <br />
                <span><LocalizedText>SOMETHING.</LocalizedText></span>
                <ArrowUpRight />
              </h2>
              <p>
                <LocalizedText>I don’t need to be the smartest engineer in the room.</LocalizedText>
                <br /><LocalizedText>I want to be in a room where I keep becoming a better one.</LocalizedText>
              </p>
            </div>
            <div className="contact-links">
              <External href={links.email} className="contact-primary">
                <Mail />
                <span>
                  <LocalizedText>Let’s start a conversation</LocalizedText>
                  <small><LocalizedText>hikaristudioai@gmail.com</LocalizedText></small>
                </span>
                <ArrowUpRight />
              </External>
              <div className="contact-social">
                <External href={links.linkedin}>
                  <Linkedin />
                  <LocalizedText>LinkedIn</LocalizedText>
                  <ArrowUpRight />
                </External>
                <External href={links.github}>
                  <Github />
                  <LocalizedText>GitHub</LocalizedText>
                  <ArrowUpRight />
                </External>
                <External href="/Hikari_Brandan_Resume.pdf">
                  <FileText />
                  <LocalizedText>Résumé</LocalizedText>
                  <ArrowUpRight />
                </External>
              </div>
              <External
                href="https://wa.me/543513668122"
                className="mobile-whatsapp"
              >
                <WhatsAppIcon size={18} /> <LocalizedText>WhatsApp</LocalizedText> <ArrowUpRight size={13} />
              </External>
              <LanguageFlags />
              <a className="phone-link" href="tel:+543513668122">
                +54 351 366 8122 <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
          <footer className="wrap">
            <a href="#home" className="brand footer-brand">
              <LocalizedText>Hikari Brandan</LocalizedText>
              <Crown />
            </a>
            <FooterQuote />
            <span>© {new Date().getFullYear()} HIKARI BRANDAN</span>
            <a href="#home">
              <LocalizedText>Back to top</LocalizedText> <ArrowUpRight size={14} />
            </a>
          </footer>
        </section>
      </div>
    </>
  );
}
function App() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches);
  const [project, setProject] = useState(null),
    [active, setActive] = useState("home");
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    if (isMobile || !window.location.hash) return;
    // The desktop bundle mounts after the browser's initial anchor lookup.
    const frame = requestAnimationFrame(() => {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [isMobile]);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (isMobile) return;
    const targets = [...document.querySelectorAll(".review-track-inner, .cloud-drift, .bulb-glow, .product-dna path")];
    const visible = new Set();
    const sync = () => targets.forEach(element => {
      element.style.animationPlayState = visible.has(element) && !document.hidden ? "running" : "paused";
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target));
      sync();
    });
    targets.forEach(element => { element.style.animationPlayState = "paused"; observer.observe(element); });
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); targets.forEach(element => element.style.removeProperty("animation-play-state")); };
  }, [isMobile]);
  useEffect(() => {
    if (isMobile) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    for (const id of ["home", "projects", "about", "contact"]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [isMobile]);
  if (isMobile) return <>
    <a className="skip-link" href="#projects"><LocalizedText>Skip to projects</LocalizedText></a>
    <Suspense fallback={<div role="status" style={{ padding:32, color:"#f7f6f1", minHeight:"100vh" }}><LocalizedText>Opening the portfolio…</LocalizedText></div>}>
      <MobilePortfolio onOpen={setProject} />
    </Suspense>
    {project && <Suspense fallback={<div className="drawer-loading" role="status"><LocalizedText>Opening the story…</LocalizedText></div>}><ProjectDrawer project={project} onClose={() => setProject(null)} /></Suspense>}
  </>;
  return (
    <>
      <a className="skip-link" href="#projects">
        <LocalizedText>Skip to projects</LocalizedText>
      </a>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />
      <DesktopNavigation />
      <header className="site-header">
        <div className="wrap nav-inner">
          <a className="brand" href="#home" aria-label={localizedText("Hikari Brandan, back to home")}>
            <LocalizedText>Hikari Brandan</LocalizedText>
            <Crown />
          </a>
          <nav aria-label={localizedText("Main navigation")}>
            <a className={active === "home" ? "active" : ""} href="#home">
              <LocalizedText>Home</LocalizedText>
            </a>
            <a
              className={active === "projects" ? "active" : ""}
              href="#projects"
            >
              <LocalizedText>Projects</LocalizedText>
            </a>
            <a className={active === "about" ? "active" : ""} href="#about">
              <LocalizedText>About</LocalizedText>
            </a>
            <a href={projectPaths.ugcServices}><LocalizedText>UGC</LocalizedText></a>
            <External href="/Hikari_Brandan_Resume.pdf">
              <LocalizedText>Résumé</LocalizedText> <ArrowUpRight size={12} />
            </External>
          </nav>
          <CTA href="#contact">
            <LocalizedText>Let’s talk</LocalizedText> <ArrowUpRight size={15} />
          </CTA>
        </div>
      </header>
      <main>
        <Hero />
        <UGC onOpen={setProject} />
        <MenuTap onOpen={setProject} />
        <FoodSpot onOpen={setProject} />
        <MacApps onOpen={setProject} />
        <Process onOpen={setProject} />
        <AutoBarber onOpen={setProject} />
        <ContentDistribution />
        <Stack />
        <Contact />
      </main>
      {project ? (
        <Suspense
          fallback={
            <div className="drawer-loading" role="status">
              <LocalizedText>Opening the story…</LocalizedText>
            </div>
          }
        >
          <ProjectDrawer project={project} onClose={() => setProject(null)} />
        </Suspense>
      ) : null}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id="portraitClip" clipPathUnits="objectBoundingBox">
            <path d="M.163 .296 C.149 .251 .147 .198 .154 .163 C.16 .113 .194 .079 .239 .059 C.296 .033 .347 .033 .396 .045 C.451 .058 .482 .103 .488 .143 C.494 .177 .493 .202 .492 .227 C.52 .223 .523 .253 .519 .281 C.516 .303 .505 .32 .495 .329 L.496 .377 C.51 .408 .553 .421 .605 .44 C.746 .479 .825 .516 .885 .579 C.94 .647 .975 .714 1 .785 L1 1 L.179 1 L.163 .933 L.149 .843 C.103 .835 .084 .806 .091 .766 L.107 .678 C.124 .611 .161 .552 .215 .513 L.26 .487 C.222 .462 .197 .433 .184 .405 C.171 .369 .166 .335 .163 .296 Z" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
}
export default App;
