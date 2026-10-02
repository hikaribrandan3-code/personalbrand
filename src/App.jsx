import { useMotionPreference, useMotionControls } from "./motion-preferences";
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
import CameraHandoff from "./CameraHandoff";
import ReviewWall from "./ReviewWall";
import GoogleMark from "./GoogleMark";
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
    image: "ivoz-window-real.png",
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
    image: "iorganize-sanitize-real.jpg",
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
    image: "screen-bridge-real.jpg",
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
    image: "istats-dashboard-real.jpg",
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
function CTA({ href, onClick, children, secondary = false, className = "" }) {
  const reduce = useMotionPreference();
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
  return href ? (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
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
      <span>{n}</span>
      <span className="label-divider">/</span>
      <span>{children}</span>
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
function TechCard({ items, onOpen, label = "Behind the build" }) {
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
            <span>{name}</span>
          </div>
        ))}
      </div>
      <button className="notes-link" onClick={onOpen}>
        Engineering notes <ArrowUpRight size={15} />
      </button>
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
            PRODUCT-FOCUSED FULL-STACK DEVELOPER <span>·</span> RAISED IN SEATTLE <span>·</span>{" "}
            BASED IN ARGENTINA
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
                  {line}
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
            I use product thinking, AI and code to turn ideas into{" "}
            <em>real products, businesses and tools people actually use.</em>
          </motion.p>
          <div className="hero-facts">
            <span>
              <BriefcaseBusiness />
              Product-focused developer
            </span>
            <span>
              <MapPin />
              Raised in Seattle
            </span>
            <span>
              <Globe2 />
              Based in Argentina
            </span>
          </div>
          <div className="hero-cta">
            <CTA href="#projects">
              See my work <ArrowDown size={16} />
            </CTA>
            <CTA href="/Daiske-Brandan-Resume.pdf" secondary>
              View résumé <ArrowUpRight size={16} />
            </CTA>
          </div>
          <div className="availability">
            <span className="live-dot" />
            Open to fully remote opportunities{" "}
            <span className="availability-divider">/</span> English & Español
          </div>
        </div>
        <motion.div className="portrait-stage" style={{ y }}>
          <img
            className="portrait"
            src={`${A}portrait.png`}
            alt="Hikari Brandan wearing his FoodSpot Mobile shirt"
            width="960"
            height="960"
            fetchPriority="high"
          />
          <span className="portrait-floor" />
        </motion.div>
        <div className="annotation portrait-note">
          <span>
            persistent
            <br />
            problem solver
          </span>
          <Doodle />
        </div>
        <div className="annotation thinker-note">
          <span>
            out-of-the-box
            <br />
            thinker
          </span>
          <Doodle />
        </div>
        <motion.div className="hero-collage" style={{ y: collageY }}>
          <motion.div
            className="polaroid polaroid-mac"
            whileHover={reduce ? {} : { rotate: 0, y: -5 }}
          >
            <img src={`${A}ivoz-window-real.png`} alt="Real iVoz app window" />
            <span>VOICE → TEXT</span>
            <small>iVoz · macOS speech-to-text</small>
          </motion.div>
          <motion.div
            className="polaroid polaroid-tap"
            whileHover={reduce ? {} : { rotate: 0, y: -5 }}
          >
            <img
              src={`${A}menutap-sticker.png`}
              alt="The physical MenuTap NFC sticker"
            />
            <span>TAP THE TABLE ↗</span>
            <small>NFC tabletop · restaurants</small>
          </motion.div>
          <motion.div
            className="scribble-card"
            whileHover={reduce ? {} : { rotate: 0 }}
          >
            <Crown />
            <span>
              ✓ IDEAS
              <br />✓ PRODUCTS
              <br />✓ BUSINESSES
              <br />
              <em>
                and still
                <br />
                learning…
              </em>
            </span>
          </motion.div>
        </motion.div>
        <div className="hero-bottom">
          <span>REAL PROBLEMS. REAL PRODUCTS.</span>
          <span>
            SCROLL TO SEE THE RECEIPTS <ArrowDown size={13} />
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
      <div className="food-backdrop" />
      <div className="wrap project-grid">
        <Reveal className="project-copy">
          <Label n="01" badge="Live product" website="https://www.ugccamera.com/">
            UGC CAMERA
          </Label>
          <h2 className="ugc-desktop-story">
            CUSTOMERS
            <br />
            TAKE THE PHOTO.
            <br />
            YOUR BRAND GETS
            <br />
            <span className="yellow">LEFT BEHIND.</span>
          </h2>
          <h2 className="ugc-mobile-story">
            I NOTICED CUSTOMERS
            <br />
            WERE ALREADY
            <br />
            PHOTOGRAPHING
            <br />
            <span className="yellow">THEIR FOOD.</span>
          </h2>
          <p className="ugc-desktop-story">
            Customers are already photographing their food.
            <br />
            So I built restaurants their own branded camera —
            <br />
            one NFC tap or QR scan opens the camera, adds
            <br />
            the business to the photo, and makes it ready to share.
          </p>
          <p className="ugc-mobile-story">
            So I gave restaurants their own branded camera — a simple QR or NFC
            tap that opens a beautiful browser camera to capture and share
            photos.
          </p>
          <div className="project-actions">
            <CTA href={links.ugc}>
              Try the demo <ArrowUpRight size={16} />
            </CTA>
            <CTA onClick={() => onOpen("ugc")} secondary>
              View project
            </CTA>
          </div>
          <button
            className="phone-handoff-link"
            onClick={() => setHandoff(true)}
          >
            <Smartphone size={14} /> Open on your phone{" "}
            <ArrowUpRight size={12} />
          </button>
          <div className="ugc-entry-modes">
            <span>
              TAP & SNAP <small>NFC tabletop</small>
            </span>
            <span>
              SCAN & SNAP <small>QR / delivery & packaging</small>
            </span>
            <span className="ugc-shipped-proof">
              SHIPPED <small>EN · ES · PT-BR</small>
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
            <span className="ugc-desktop-story">the location stays<br />with the photo.</span>
            <span className="ugc-mobile-story">native location tag.<br />part of the photo.</span>
            <Doodle />
          </div>
          <span className="scene-counter">CAMERA, BUT MAKE IT YOURS.</span>
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
          onOpen={() => onOpen("ugc")}
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
    <section className="project-section light menutap-section" ref={ref}>
      <div className="wrap project-grid">
        <Reveal className="project-copy">
          <Label n="02" badge="Live product" website="https://www.foodspotmobile.com/">
            MENUTAP
          </Label>
          <h2>
            THEN I WONDERED WHY
            <br />
            RESTAURANT TABLES
            <br />
            WERE STILL
            <br />
            JUST… TABLES.
          </h2>
          <p>
            So I built MenuTap — a simple NFC tap that brings your menu, Wi-Fi,
            reviews, games and more to one tap.
          </p>
          <div className="project-actions">
            <CTA href={links.menutap}>
              See the demo <ArrowUpRight size={16} />
            </CTA>
            <CTA onClick={() => onOpen("menutap")} secondary>
              View project
            </CTA>
          </div>
          <span className="mobile-hint">
            <Smartphone size={14} />
            Best experienced on your phone
          </span>
        </Reveal>
        <div className="device-stage tap-stage">
          <div className="tap-orbit" />
          <motion.div
            className="physical-sticker"
            style={{ rotate: stickerRotate }}
          >
            <img
              src={`${A}menutap-sticker.png`}
              alt="Actual MenuTap physical NFC artwork: menu, Wi-Fi, reviews, games and socials in one tap"
              loading="lazy"
              width="1254"
              height="1254"
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
                  FOOD<span>SPOT</span>
                </strong>
                <small>RESTAURANTE & BAR</small>
              </div>
              <div className="menu-welcome">Make yourself at home.</div>
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
                      <strong>{title}</strong>
                      <small>{sub}</small>
                    </span>
                    <ChevronRight size={14} />
                  </div>
                ))}
              </div>
              <span className="powered-by">a little tap. a better table.</span>
            </Phone>
          </motion.div>
          <div className="annotation tap-note">
            one physical tap.
            <br />a whole digital world.
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
          onOpen={() => onOpen("menutap")}
        />
      </div>
    </section>
  );
}
function FoodSpot({ onOpen }) {
  const reduce = useMotionPreference();
  const [activeScreen, setActiveScreen] = useState(0);
  const receiptVideo = useRef(null);
  const sectionRef = useRef(null);
  const screens = [
    { name: "Dashboard", file: "dashboard-mobile.jpg", alt: "Real FoodSpot mobile restaurant dashboard" },
    { name: "Menu", file: "menu-mobile.jpg", alt: "Real FoodSpot mobile menu management" },
    { name: "Inventory", file: "inventory-mobile.jpg", alt: "Real FoodSpot mobile inventory and stock counts" },
  ];
  useEffect(() => {
    if (window.location.hash === "#foodspot")
      sectionRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
    if (window.location.hash === "#foodspot-receipt")
      document.getElementById("foodspot-receipt")?.scrollIntoView({ behavior: "instant", block: "start" });
  }, []);
  useEffect(() => {
    if (reduce) receiptVideo.current?.pause();
  }, [reduce]);
  return (
    <>
      <section id="foodspot" ref={sectionRef} className="project-section dark foodspot-section">
        <div className="pizza-backdrop" />
        <div className="wrap project-grid">
          <Reveal className="project-copy">
            <Label n="03" badge="Past B2B SaaS · Live demo" subdued>FOODSPOT MOBILE</Label>
            <h2>RESTAURANT<br />SOFTWARE.<br />WITH A LIFE<br /><span className="yellow">AFTER THE SALE.</span></h2>
            <p>B2B restaurant software for running the business and engaging its customers — from dashboard and menu management to inventory.</p>
            <div className="project-actions">
              <CTA href="https://foodspotapp-gold.vercel.app/smash-burger-demo/owner/orders">Explore the demo <ArrowUpRight size={16} /></CTA>
              <CTA secondary onClick={() => onOpen("foodspot")}>The story <ArrowUpRight size={16} /></CTA>
            </div>
            <div className="evolution"><span>Real mobile UI · populated demo</span></div>
          </Reveal>
          <div className="device-stage foodspot-stage foodspot-capture-stage">
            <motion.div initial={reduce ? false : { rotate: -12, y: 35 }} whileInView={{ rotate: -6, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", bounce: 0.15, duration: 0.8 }}>
              <Phone className="foodspot-phone foodspot-real-phone" label={`Real FoodSpot Mobile ${screens[activeScreen].name} interface`}>
                <img key={screens[activeScreen].file} className="foodspot-real-screen" src={`${A}foodspot/${screens[activeScreen].file}`} alt={screens[activeScreen].alt} width="390" height="832" loading="lazy" />
              </Phone>
            </motion.div>
            <div className="foodspot-screen-tabs" role="group" aria-label="Explore FoodSpot mobile operations">
              {screens.map((item, index) => <button key={item.name} type="button" aria-pressed={activeScreen === index} onClick={() => setActiveScreen(index)}>{item.name}</button>)}
            </div>
          </div>
          <Reveal className="lesson-card foodspot-evidence-card">
            <span className="tiny-label">PRODUCT / OPERATIONS</span>
            <h3>Run the<br />restaurant.</h3>
            <p>Dashboard. Menu. Inventory.<br />One mobile workspace.</p>
            <div className="foodspot-supporting-shots">
              {[1, 2].map(index => <button key={screens[index].name} type="button" onClick={() => setActiveScreen(index)} aria-label={`View real mobile ${screens[index].name} screen`}>
                <img src={`${A}foodspot/${screens[index].file}`} alt={screens[index].alt} width="390" height="832" loading="lazy" /><span>{index === 1 ? "Menu management" : "Inventory tracking"}</span>
              </button>)}
            </div>
          </Reveal>
        </div>
      </section>
      <section id="foodspot-receipt" className="project-section dark foodspot-section foodspot-differentiator" aria-label="FoodSpot Mobile UGC receipt">
        <div className="wrap project-grid">
          <Reveal className="project-copy">
            <span className="tiny-label">FOODSPOT MOBILE / THE DIFFERENTIATOR</span>
            <h2>THE UGC RECEIPT.<br /><span className="yellow">TURN EVERY ORDER<br />INTO ORGANIC<br />CONTENT.</span></h2>
            <p>FoodSpot Mobile introduced a new post-purchase surface: the UGC Receipt — a digital receipt that invites customers to photograph their order and create branded, organic content immediately after delivery.</p>
            <div className="foodspot-receipt-flow" aria-label="Order delivered, UGC receipt, take a photo, organic content">
              {[[Utensils, "ORDER", "DELIVERED"], [FileText, "UGC", "RECEIPT"], [Camera, "TAKE", "A PHOTO"], [Activity, "ORGANIC", "CONTENT"]].map(([Icon, first, second], index) => <div className="foodspot-flow-step" key={first}>
                {index > 0 && <ArrowRight className="foodspot-flow-arrow" size={18} aria-hidden="true" />}
                <span className="foodspot-flow-icon"><Icon size={23} aria-hidden="true" /></span><span>{first}<br />{second}</span>
              </div>)}
            </div>
            <CTA href="https://foodspotapp-gold.vercel.app/smash-burger-demo/status">Try the live receipt <ArrowUpRight size={16} /></CTA>
          </Reveal>
          <div className="device-stage foodspot-stage">
            <Phone className="foodspot-phone foodspot-real-phone" label="Real FoodSpot Mobile UGC receipt interaction">
              <video ref={receiptVideo} className="foodspot-real-screen" src={`${A}foodspot/ugc-receipt-mobile.mp4`} poster={`${A}foodspot/receipt-mobile.jpg`} width="390" height="832" autoPlay={!reduce} muted loop playsInline controls={reduce} preload="metadata" aria-label="Delivered receipt and animated customer photo invitation" />
            </Phone>
          </div>
          <Reveal className="foodspot-engagement">
            <span className="tiny-label">CUSTOMER ENGAGEMENT</span>
            <img src={`${A}foodspot/events-mobile.jpg`} alt="Real FoodSpot mobile Events screen in light mode" width="390" height="832" loading="lazy" />
            <span>Events, rewards & reasons to return.</span>
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
              MAC APPS / iSUITE
            </Label>
            <h2>
              I DIDN’T WANT
              <br />
              ANOTHER SUBSCRIPTION.
              <br />
              <span>SO I BUILT MY OWN.</span>
            </h2>
            <p>
              Small, native macOS productivity apps built to solve problems in
              my own workflow.
              <span className="mac-open-source"><Github size={14} /> Open source. Built for Apple Silicon.</span>
              <small className="mac-compatibility">M2 or newer is a great fit. Check each app’s requirements. Independent builds aren’t Apple-notarized, so macOS may show a first-launch warning.</small>
            </p>
            <CTA href={links.suite}>
              Explore the apps <ArrowUpRight size={16} />
            </CTA>
          </Reveal>
          <div className="mac-main">
            <div className="mac-kicker">
              <span>
                <Command size={13} />
                BUILT FOR THE WAY I WORK
              </span>
              <span className="mac-platform"><Apple size={17} aria-hidden="true" /> macOS productivity apps</span>
              <span className="annotation">go on. pick an app</span>
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
                    <b>{app.name}</b>
                    <span>File</span>
                    <span>View</span>
                    <span>Window</span>
                    <span className="mac-menu-right">Thu 9:41 AM</span>
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
                          <span>{app.name}</span>
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
                          <img src={`${A}${a.icon}`} alt="" loading="lazy" />
                          <i className={active === i ? "on" : ""} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="laptop-chin">MacBook Pro</div>
              </motion.div>
              <div className="laptop-base">
                <div className="laptop-notch" />
              </div>
              <div className="laptop-shadow" />
            </motion.div>
            <div
              className="app-selector"
              role="group"
              aria-label="Select a Mac app preview"
            >
              {apps.map((a, i) => (
                <button
                  key={a.name}
                  className={active === i ? "active" : ""}
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                >
                  <img src={`${A}${a.icon}`} alt="" loading="lazy" />
                  <strong>{a.name}</strong>
                  <small>{a.sub}</small>
                  {i === 2 ? (
                    <span className="experimental-tag">EXPERIMENTAL</span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="app-caption" aria-live="polite">
          <div>
            <span className="tiny-label">{app.tag}</span>
            <h3>{app.name}</h3>
          </div>
          <p>
            {app.description}
            <small>{app.note}</small>
          </p>
          <div className="app-links">
            <button onClick={() => onOpen("mac")}>
              Engineering notes <ArrowUpRight size={14} />
            </button>
            <External
              href={`https://github.com/hikaribrandan3-code/${app.repo}`}
            >
              <Github size={14} />
              Source
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
    image: `${A}ugc-salad-spot.png`,
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
    image: `${A}ivoz-window-real.png`,
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
            <Label n="05">HOW I WORK</Label>
            <h2>
              AI IS MY LEVERAGE.
              <br />
              NOT MY SUBSTITUTE
              <br />
              FOR THINKING.
            </h2>
          </Reveal>
          <p>
            I use AI to work faster, explore more ideas, and get to working
            products.{" "}
            <strong>
              The interesting part is what happens after the prompt.
            </strong>
          </p>
          <div className="process-side annotation">
            AI makes producing code cheap.
            <br />
            Knowing what to build, recognizing
            <br />
            when it’s wrong, and turning it into
            <br />
            something useful isn’t.
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
              <span>{name}</span>
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
            The prompt isn’t the product.
            <svg viewBox="0 0 220 12" aria-hidden="true">
              <path
                d="M3 7Q110 0 217 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </span>
          <CTA onClick={() => onOpen("engineering")}>
            My engineering notes <ArrowUpRight size={16} />
          </CTA>
        </div>
        <div className="debug-receipts" aria-label="Real examples of how I debug">
          <div className="debug-intro">
            <span className="debug-eyebrow">REAL EXAMPLES</span>
            <h3>HOW I <span>DEBUG.</span></h3>
            <p>I don’t guess where it broke.<br />I reproduce, inspect, trace,<br />find the cause and fix it.</p>
            <div className="debug-tools" aria-label="Debugging tools">
              {debugTools.map(([Icon, name]) => (
                <span key={name}><Icon size={14} aria-hidden="true" />{name}</span>
              ))}
            </div>
          </div>
          {debugExamples.map((example, index) => (
            <article className="debug-card" key={example.product}>
              <div className="debug-card-label"><b>0{index + 1}</b><span>{example.product}</span></div>
              {example.image ? (
                <div className="debug-card-visual">
                  <img src={example.image} alt={example.alt} loading="lazy" />
                </div>
              ) : (
                <div className="debug-flow" aria-label="Callback URL, console, Edge Function logs, RLS or data access, retest">
                  {example.flow.map((step, i) => <span key={step}>{step}{i < example.flow.length - 1 && <ArrowRight size={11} aria-hidden="true" />}</span>)}
                </div>
              )}
              <h4>{example.title}</h4>
              <p>{example.copy}</p>
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
      <div className="business-backdrop" />
      <div className="wrap business-grid">
        <Reveal>
          <Label n="06" badge="Past business" subdued>
            THE AUTO BARBER
          </Label>
          <h2>
            BEFORE I BUILT SOFTWARE,
            <br />I BUILT A BUSINESS.
          </h2>
          <p>
            The Auto Barber — Seattle-area
            <br />
            automotive restyling.
          </p>
          <div className="business-facts">
            <span>
              <CheckCircle2 />
              Six-figure revenue
            </span>
            <span>
              <CheckCircle2 />
              165+ Google reviews
            </span>
            <span>
              <CheckCircle2 />
              Real customers. Real problems. Real solutions.
            </span>
          </div>
          <CTA href={googleReviewsUrl}>
            See all Google reviews <ArrowUpRight size={16} />
          </CTA>
          <span className="business-story-note">The full story is coming. I’m writing it next.</span>
        </Reveal>
        <div className="business-visual">
          <img
            src={`${A}autobarber-logo.png`}
            alt="The Auto Barber logo"
            loading="lazy"
          />
          <span className="annotation">
            same builder.
            <br />
            different tools.
          </span>
        </div>
        <Reveal className="business-proof">
          <div className="google-mark"><GoogleMark size={27} /></div>
          <span className="review-stars">★★★★★</span>
          <div className="review-card" aria-live="polite">
            <span className="review-aggregate">4.9 / 165 GOOGLE REVIEWS</span>
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
            Read all 165 Google reviews <ArrowUpRight size={15} />
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
          <Label n="07">THE TOOLBOX</Label>
          <h3>
            Tools I work with
            <br />
            <span>to build, ship and learn.</span>
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
              <span>{t.label}</span>
              {t.items.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function MotionToggle() {
  const { disabled, toggle, systemReduced } = useMotionControls();
  return (
    <button
      className="motion-toggle"
      onClick={toggle}
      aria-pressed={disabled || systemReduced}
      title={
        systemReduced
          ? "Your device requests reduced motion"
          : "Toggle website motion"
      }
    >
      Motion {disabled || systemReduced ? "off" : "on"}{" "}
      <span aria-hidden="true">{disabled || systemReduced ? "○" : "●"}</span>
    </button>
  );
}

function Contact() {
  return (
    <>
      <section className="opportunity-section light">
        <div className="wrap opportunity-grid">
          <div>
            <Label n="08">WHAT I’M LOOKING FOR</Label>
            <h2>
              A SMALL TEAM.
              <br />
              REAL PROBLEMS.
              <br />
              <span>ROOM TO GROW.</span>
            </h2>
          </div>
          <div className="opportunity-copy">
            <div className="ideas-bulb" aria-hidden="true">
              <span className="annotation">
                IDEAS
                <br />
                IN PROGRESS.
                <Doodle />
              </span>
              <span className="bulb-glow" />
              <img
                src="/assets/ideas-bulb.webp"
                alt=""
                width="433"
                height="650"
                loading="lazy"
              />
            </div>
            <h3>
              Product-minded. Customer-tested.
              <br />
              Still becoming a better engineer.
            </h3>
            <p>
              I’m looking for a small, ambitious team where I can work close to
              the product and customers, build quickly, learn from stronger
              engineers, and take ownership of real problems.
            </p>
            <div className="role-tags">
              <span>
                <Database size={15} /> Product development
              </span>
              <span>
                <UsersRound size={15} /> Junior full-stack
              </span>
              <span>
                <Sparkles size={15} /> AI implementation
              </span>
              <span>
                <Wrench size={15} /> Technical product support
              </span>
            </div>
            <div className="opportunity-facts">
              <span>
                <Globe2 />
                <span>
                  Fully remote<small>Worldwide</small>
                </span>
              </span>
              <span>
                <Volume2 />
                <span>
                  Native English & Spanish<small>Communication</small>
                </span>
              </span>
              <span>
                <Lightbulb />
                <span>
                  Open to learn & grow<small>New challenges</small>
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
      <div id="contact">
        <ContactExperience motionToggle={<MotionToggle />} />
        <section className="contact-section mobile-closing">
          <div className="contact-orbit" aria-hidden="true" />
          <div className="wrap contact-inner">
            <div className="contact-intro">
              <Label n="09">LET’S TALK</Label>
              <div className="annotation">you’ve seen the receipts.</div>
              <h2>
                LET’S BUILD
                <br />
                <span>SOMETHING.</span>
                <ArrowUpRight />
              </h2>
              <p>
                I don’t need to be the smartest engineer in the room.
                <br />I want to be in a room where I keep becoming a better one.
              </p>
            </div>
            <div className="contact-links">
              <External href={links.email} className="contact-primary">
                <Mail />
                <span>
                  Let’s start a conversation
                  <small>hikaristudioai@gmail.com</small>
                </span>
                <ArrowUpRight />
              </External>
              <div className="contact-social">
                <External href={links.linkedin}>
                  <Linkedin />
                  LinkedIn
                  <ArrowUpRight />
                </External>
                <External href={links.github}>
                  <Github />
                  GitHub
                  <ArrowUpRight />
                </External>
                <External href="/Daiske-Brandan-Resume.pdf">
                  <FileText />
                  Résumé
                  <ArrowUpRight />
                </External>
              </div>
              <External
                href="https://wa.me/543513668122"
                className="mobile-whatsapp"
              >
                <WhatsAppIcon size={18} /> WhatsApp <ArrowUpRight size={13} />
              </External>
              <LanguageFlags />
              <a className="phone-link" href="tel:+543513668122">
                +54 351 366 8122 <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
          <footer className="wrap">
            <MotionToggle />
            <a href="#home" className="brand footer-brand">
              Hikari Brandan
              <Crown />
            </a>
            <FooterQuote />
            <span>© {new Date().getFullYear()} HIKARI BRANDAN</span>
            <a href="#home">
              Back to top <ArrowUpRight size={14} />
            </a>
          </footer>
        </section>
      </div>
    </>
  );
}
function App() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  const [project, setProject] = useState(null),
    [active, setActive] = useState("home");
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
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
    <a className="skip-link" href="#projects">Skip to projects</a>
    <Suspense fallback={<div role="status" style={{ padding:32, color:"#f7f6f1", minHeight:"100vh" }}>Opening the portfolio…</div>}>
      <MobilePortfolio onOpen={setProject} />
    </Suspense>
    {project && <Suspense fallback={<div className="drawer-loading" role="status">Opening the story…</div>}><ProjectDrawer project={project} onClose={() => setProject(null)} /></Suspense>}
  </>;
  return (
    <>
      <a className="skip-link" href="#projects">
        Skip to projects
      </a>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />
      <DesktopNavigation />
      <header className="site-header">
        <div className="wrap nav-inner">
          <a className="brand" href="#home" aria-label="Hikari Brandan, back to home">
            Hikari Brandan
            <Crown />
          </a>
          <nav aria-label="Main navigation">
            <a className={active === "home" ? "active" : ""} href="#home">
              Home
            </a>
            <a
              className={active === "projects" ? "active" : ""}
              href="#projects"
            >
              Projects
            </a>
            <a className={active === "about" ? "active" : ""} href="#about">
              About
            </a>
            <External href="/Daiske-Brandan-Resume.pdf">
              Résumé <ArrowUpRight size={12} />
            </External>
          </nav>
          <CTA href="#contact">
            Let’s talk <ArrowUpRight size={15} />
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
        <Stack />
        <Contact />
      </main>
      {project ? (
        <Suspense
          fallback={
            <div className="drawer-loading" role="status">
              Opening the story…
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
