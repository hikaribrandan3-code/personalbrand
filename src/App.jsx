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
} from "lucide-react";
const ProjectDrawer = lazy(() => import("./ProjectDrawer"));
const A = "/assets/";
const links = {
  ugc: "https://www.ugccamera.com/camera-demo?name=UGC%20Camera&type=business",
  menutap: "https://www.foodspotmobile.com/t/foodspot-demo/menu",
  suite: "https://isuitemacos-cyan.vercel.app/index.html#apps",
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
function Label({ n, children, badge, subdued }) {
  return (
    <div className="section-label">
      <span>{n}</span>
      <span className="label-divider">/</span>
      <span>{children}</span>
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
            AI PRODUCT DEVELOPER <span>·</span> RAISED IN SEATTLE <span>·</span>{" "}
            BASED IN ARGENTINA
          </motion.div>
          <h1>
            {[
              "I BUILD THINGS",
              "OTHER PEOPLE",
              "WOULDN’T THINK",
              "TO BUILD.",
            ].map((line, i) => (
              <span
                className={`headline-line ${i === 1 ? "yellow-line" : ""}`}
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
              25 years old
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
            alt="Daiske Brandan wearing his FoodSpot Mobile shirt"
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
            <span>small idea. real app.</span>
          </motion.div>
          <motion.div
            className="polaroid polaroid-tap"
            whileHover={reduce ? {} : { rotate: 0, y: -5 }}
          >
            <img
              src={`${A}menutap-sticker.png`}
              alt="The physical MenuTap NFC sticker"
            />
            <span>offline meets online ↗</span>
          </motion.div>
          <motion.div
            className="scribble-card"
            whileHover={reduce ? {} : { rotate: 0 }}
          >
            <Crown />
            <span>
              ✓ IDEAS
              <br />✓ PRODUCTS
              <br />✓ REAL USERS
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
    [captured, setCaptured] = useState(0);
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
  function capture() {
    setCaptured((count) => count + 1);
  }
  return (
    <section
      className="project-section dark ugc-section"
      id="projects"
      ref={ref}
    >
      <div className="food-backdrop" />
      <div className="wrap project-grid">
        <Reveal className="project-copy">
          <Label n="01" badge="Live product">
            UGC CAMERA
          </Label>
          <h2>
            I NOTICED CUSTOMERS
            <br />
            WERE ALREADY
            <br />
            PHOTOGRAPHING
            <br />
            <span className="yellow">THEIR FOOD.</span>
          </h2>
          <p>
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
          <span className="mobile-hint">
            <Smartphone size={14} />
            Best experienced on your phone
          </span>
        </Reveal>
        <div className="device-stage camera-stage">
          <motion.div className="phone-motion" style={{ y, rotate }}>
            <Phone
              className="camera-phone"
              label="Interactive preview of the UGC restaurant camera"
            >
              <div className="camera-view">
                <img
                  src={`${A}burger.jpg`}
                  alt="Burger in a restaurant camera viewfinder"
                  loading="lazy"
                  width="1000"
                  height="800"
                />
                <span className="location-tag">
                  <MapPin size={12} />
                  Pico Studio <Crown size={11} />
                </span>
                <span className="viewfinder corner-tl" />
                <span className="viewfinder corner-tr" />
                <span className="viewfinder corner-bl" />
                <span className="viewfinder corner-br" />
                <div className="camera-caption">
                  GOOD FOOD.
                  <br />
                  <strong>YOUR POINT OF VIEW.</strong>
                </div>
                <AnimatePresence>
                  {captured && (
                    <motion.div
                      key={captured}
                    className="capture-flash"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </AnimatePresence>
              </div>
              <div className="camera-controls">
                <span>PHOTO</span>
                <span className="selected">FOOD</span>
                <span>SQUARE</span>
                <div className="capture-row">
                  <span className="thumbnail">
                    <img
                      src={`${A}burger.jpg`}
                      alt="Captured food thumbnail"
                      loading="lazy"
                    />
                  </span>
                  <button
                    className="shutter"
                    onClick={capture}
                    aria-label="Preview a photo capture"
                  >
                    <span />
                  </button>
                  <External
                    href={links.ugc}
                    className="camera-demo-icon"
                    aria-label="Open the real UGC Camera demo"
                  >
                    <Camera size={21} />
                  </External>
                </div>
                <div className="capture-feedback" aria-live="polite">
                  {captured ? (
                    <External href={links.ugc}>
                      Nice shot. Try the real camera <ArrowUpRight size={10} />
                    </External>
                  ) : (
                    "Tap the shutter for a little preview"
                  )}
                </div>
              </div>
            </Phone>
          </motion.div>
          <div className="annotation camera-note">
            native location tag.
            <br />
            part of the photo.
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
          <Label n="02" badge="Live product">
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
  return (
    <section className="project-section dark foodspot-section">
      <div className="pizza-backdrop" />
      <div className="wrap project-grid">
        <Reveal className="project-copy">
          <Label n="03" badge="Side project" subdued>
            FOODSPOT MOBILE
          </Label>
          <h2>
            BEFORE EITHER OF THOSE,
            <br />I TRIED REBUILDING
            <br />
            HOW LOCAL FOOD
            <br />
            COMMERCE COULD WORK.
          </h2>
          <p>
            It didn’t become the business, but it taught me enough to build the
            next two.
          </p>
          <div className="project-actions">
            <CTA onClick={() => onOpen("foodspot")}>
              The project story <ArrowUpRight size={16} />
            </CTA>
          </div>
          <div className="evolution">
            <span>FoodSpot</span>
            <ArrowRight size={13} />
            <span>UGC Camera + MenuTap</span>
          </div>
        </Reveal>
        <div className="device-stage foodspot-stage">
          <motion.div
            initial={reduce ? false : { rotate: -12, y: 35 }}
            whileInView={{ rotate: -6, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.8 }}
          >
            <Phone
              className="foodspot-phone"
              label="Representative FoodSpot food discovery interface"
            >
              <div className="foodspot-header">
                <MapPin />
                <strong>FoodSpot</strong>
                <small>Find your next favorite.</small>
              </div>
              <div className="foodspot-search">
                <Search size={13} />
                What are you craving?
              </div>
              <div className="foodspot-categories">
                <span className="active">Burgers</span>
                <span>Pizza</span>
                <span>Cafés</span>
              </div>
              <strong className="foodspot-near">
                A little closer. A lot tastier.
              </strong>
              <div className="foodspot-list">
                <div>
                  <img
                    src={`${A}burger.jpg`}
                    alt="Burger discovery card"
                    loading="lazy"
                  />
                  <span>Burgers & good company</span>
                  <small>Neighborhood favorites</small>
                </div>
                <div>
                  <img
                    src={`${A}pizza.jpg`}
                    alt="Pizza discovery card"
                    loading="lazy"
                  />
                  <span>Just one more slice</span>
                  <small>Around the corner</small>
                </div>
              </div>
              <div className="foodspot-footer">
                <MapPin />
                <Search />
                <Star />
              </div>
            </Phone>
          </motion.div>
          <div className="annotation foodspot-note">
            the first idea didn’t
            <br />
            have to be the last one.
            <Doodle />
          </div>
          <span className="scene-counter">PRODUCT EVOLUTION, IN PUBLIC.</span>
        </div>
        <Reveal className="lesson-card">
          <span className="tiny-label">THE TAKEAWAY</span>
          <h3>
            Build.
            <br />
            Listen.
            <br />
            Rethink.
          </h3>
          <p>
            A marketplace idea became the starting point for two more focused
            restaurant products.
          </p>
          <button className="notes-link" onClick={() => onOpen("foodspot")}>
            What I learned <ArrowUpRight size={15} />
          </button>
        </Reveal>
      </div>
    </section>
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
              AND SOMETIMES
              <br />
              THE PROBLEM IS
              <br />
              <span>JUST MINE.</span>
            </h2>
            <p>
              Small but useful macOS apps
              <br />
              that solve real problems.
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
              <span className="annotation">go on. pick an app ↘</span>
            </div>
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
                        {app.image ? (
                          <img
                            src={`${A}${app.image}`}
                            alt={`Actual ${app.name} application screenshot${active === 0 ? "" : " (detail view)"}`}
                            loading="lazy"
                          />
                        ) : (
                          <div className="brain-preview">
                            <img
                              src={`${A}ibrain-icon.png`}
                              alt="iBrain app icon"
                            />
                            <h3>
                              Your ideas.
                              <br />
                              Your models.
                            </h3>
                            <span>LOCAL OLLAMA · OPTIONAL CLOUD</span>
                            <small>Product overview</small>
                          </div>
                        )}
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
      </div>
    </section>
  );
}
function AutoBarber({ onOpen }) {
  const [review, setReview] = useState(0);
  const reviews = [
    {
      name: "Jeff Smith",
      quote:
        "Couldn’t have been happier with the service and quality with the Auto Barber.",
      href: "https://www.google.com/maps/reviews/data=!4m5!14m4!1m3!1m2!1s113475545431419062931!2s0x5490ffe6d92d4c6b:0xd406f05816bbc715",
    },
    {
      name: "Lay Ybañez",
      quote: "Very kind, easy going and very knowledgable.",
      href: "https://www.google.com/maps/reviews/data=!4m5!14m4!1m3!1m2!1s100438662356796766727!2s0x5490ffe6d92d4c6b:0xd406f05816bbc715",
    },
  ];
  return (
    <section className="business-section dark" id="about">
      <div className="business-backdrop" />
      <div className="wrap business-grid">
        <Reveal>
          <Label n="06" badge="Past business" subdued>
            AUTO BARBER
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
          <CTA onClick={() => onOpen("autobarber")}>
            Read the full story <ArrowUpRight size={16} />
          </CTA>
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
          <div className="google-mark">G</div>
          <span className="review-stars">★★★★★</span>
          <div className="review-card" aria-live="polite">
            <span className="review-aggregate">4.9 / 165 GOOGLE REVIEWS</span>
            <blockquote>“{reviews[review].quote}”</blockquote>
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
          <External href="https://share.google/3Cf9TEYFuTnP7Z5TO">
            Read the real Google reviews <ArrowUpRight size={15} />
          </External>
        </Reveal>
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
    items: ["ChatGPT / Codex", "Claude", "Gemini", "Perplexity"],
  },
  {
    label: "BUILD / SHIP",
    items: ["Git / GitHub", "Vercel", "VS Code", "Swift Package Manager"],
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
        </div>
        <div className="tool-groups">
          {tools.map((t) => (
            <div className="tool-group" key={t.label}>
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
  const {disabled,toggle,systemReduced}=useMotionControls();
  return <button className="motion-toggle" onClick={toggle} aria-pressed={disabled} title={systemReduced ? 'Your device requests reduced motion' : 'Toggle website motion'}>Motion {disabled || systemReduced ? 'off' : 'on'} <span aria-hidden="true">{disabled || systemReduced ? '○' : '●'}</span></button>;
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
              <span>Product development</span>
              <span>Junior full-stack</span>
              <span>AI implementation</span>
              <span>Technical product support</span>
            </div>
            <div className="opportunity-facts">
              <span>
                <Globe2 />
                Fully remote
              </span>
              <span>
                <Volume2 />
                Native English & Spanish
              </span>
              <span>
                <Lightbulb />
                Open to learn & grow
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-section" id="contact">
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
            <a className="phone-link" href="tel:+543513668122">
              +54 351 366 8122 <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <footer className="wrap">
            <MotionToggle />
          <a href="#home" className="brand footer-brand">
            Daiske
            <Crown />
          </a>
          <span>SEATTLE ROOTS. ARGENTINA BASE. WORLDWIDE MINDSET.</span>
          <span>© {new Date().getFullYear()} DAISKE BRANDAN</span>
          <a href="#home">
            Back to top <ArrowUpRight size={14} />
          </a>
        </footer>
      </section>
    </>
  );
}
function App() {
  const [project, setProject] = useState(null),
    [active, setActive] = useState("home");
  const { scrollYProgress } = useScroll();
  useEffect(() => {
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
  }, []);
  return (
    <>
      <a className="skip-link" href="#projects">
        Skip to projects
      </a>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />
      <header className="site-header">
        <div className="wrap nav-inner">
          <a className="brand" href="#home" aria-label="Daiske, back to home">
            Daiske
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
