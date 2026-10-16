import { LanguageSwitcher, LocalizedText, localizedHref, localizedText, useLanguage } from "./i18n";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Home, BriefcaseBusiness, UserRound, FileText, Globe2, MessageSquare, Send, Github, Linkedin, Mail, Apple, Code2, Database, Camera, Radio, Lightbulb, Search, Brain, FlaskConical, Bug, Wrench, Sparkles, GraduationCap, UsersRound, ChevronLeft, ChevronRight, MapPin, Cpu, GitBranch, Play, Pause } from "lucide-react";
import { LanguageFlags, WhatsAppIcon } from "./ContactIcons";
import { FooterQuote } from "./FooterQuote";
import GoogleMark from "./GoogleMark";
import { macApps, projectData } from "./projectData";
import { barberReviews, googleReviewsUrl } from "./reviewData";
import { useMotionPreference } from "./motion-preferences";
import BuildNotesLink from "./BuildNotesLink";
import "./mobile-portfolio.css";
import ContentDistribution from "./ContentDistribution";

const A = "/assets/";
const github = "https://github.com/hikaribrandan3-code";
const linkedin = "https://www.linkedin.com/in/daiske-brandan-726656323/";
const whatsapp = "https://wa.me/543513668122";
const resume = "/Hikari_Brandan_Resume.pdf";
const email = "mailto:hikaristudioai@gmail.com";
const suite = "https://isuitemacos-cyan.vercel.app/index.html";
const foodspotDemo = "https://foodspotapp-gold.vercel.app/smash-burger-demo/owner/orders";
const foodspotReceipt = "https://foodspotapp-gold.vercel.app/smash-burger-demo/status";
const menuTapHub = "https://www.foodspotmobile.com/t/foodspot-demo";

function Out({ href, children, className = "", ...props }) {
  return <a href={href} className={className} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" {...props}><LocalizedText>{children}</LocalizedText></a>;
}
function Label({ n, children, status }) {
  return <div className="mp-label"><span>{n} <i>/</i> {children}</span>{status && <span className={`mp-status ${status === "Side Project" ? "mp-status-past" : ""}`}><LocalizedText>{status}</LocalizedText></span>}</div>;
}
function Pills({ items }) {
  return <ul className="mp-pills" aria-label={localizedText("Project technologies")}>{items.map(([Icon, text]) => <li key={text}><Icon size={13} aria-hidden="true" /><LocalizedText>{text}</LocalizedText></li>)}</ul>;
}
function ArrowNote({ children, className = "" }) {
  return <div className={`mp-note ${className}`}><LocalizedText>{children}</LocalizedText><svg viewBox="0 0 60 65" aria-hidden="true"><path d="M48 5Q52 40 13 52m7-13-10 14 17-2" /></svg></div>;
}
function Device({ src, alt, children, className = "" }) {
  return <div className={`mp-device ${className}`}>{src && <img src={`${A}${src}`} alt={alt} loading="lazy" width="390" height="844" />}{children}</div>;
}
function ProjectActions({ href, demo, project, projectHref, onOpen, projectLabel = "View Project" }) {
  return <div className="mp-actions"><Out href={href} className="mp-button mp-yellow"><LocalizedText>{demo}</LocalizedText><ArrowRight size={17} /></Out>{projectHref ? <Out href={projectHref} className="mp-button mp-outline"><LocalizedText>{projectLabel}</LocalizedText></Out> : <BuildNotesLink project={project} className="mp-button mp-outline" onOpen={() => onOpen(project)}><LocalizedText>{projectLabel}</LocalizedText></BuildNotesLink>}</div>;
}

function MobileUGC() {
  return <section id="projects" className="mp-section mp-project mp-ugc" aria-labelledby="mp-ugc-title">
    <Label n="01" status="Live Product"><LocalizedText>UGC CAMERA</LocalizedText></Label>
    <h2 id="mp-ugc-title"><LocalizedText>I NOTICED CUSTOMERS</LocalizedText><br /><LocalizedText>WERE ALREADY</LocalizedText><br /><LocalizedText>PHOTOGRAPHING</LocalizedText><br /><em><LocalizedText>THEIR FOOD.</LocalizedText></em></h2>
    <p><LocalizedText>So I gave restaurants their own branded camera — a QR scan or NFC tap opens a camera built for their business to capture and share photos.</LocalizedText></p>
    <div className="mp-product-art mp-ugc-art">
      <Device className="mp-camera-device">
        <div className="mp-photo-preview">
          <img src={`${A}ugc-sugar-crumb.webp`} alt={localizedText("Sugar & Crumb café photo from the UGC Camera Tap & Snap product carousel")} width="768" height="768" loading="lazy" decoding="async" />
          <span className="mp-preview-tag"><MapPin size={15} /><LocalizedText>Sugar &amp; Crumb</LocalizedText></span>
        </div>
      </Device>
      <ArrowNote className="mp-ugc-note"><span><LocalizedText>ORGANIC UGC</LocalizedText></span><br /><span><LocalizedText>CONTENT</LocalizedText></span><br /><span><LocalizedText>IN SECONDS.</LocalizedText></span></ArrowNote>
    </div>
    <ProjectActions href={projectData.ugc.demoUrl} demo="Try the Demo" projectHref="https://www.ugccamera.com/" />
    <p className="mp-project-proof"><LocalizedText>Expanded the touch targets for resizing and rotating stickers on mobile.</LocalizedText></p>
    <Pills items={[[Code2,"Next.js"],[Database,"Supabase"],[Camera,"Camera APIs"]]} />
  </section>;
}

function MobileMenuTap({ onOpen }) {
  return <section id="menutap" className="mp-section mp-project" aria-labelledby="mp-menu-title">
    <Label n="02" status="Live Product"><LocalizedText>MENUTAP</LocalizedText></Label>
    <h2 id="mp-menu-title"><LocalizedText>RESTAURANTS PUT A QR</LocalizedText><br /><LocalizedText>ON EVERY TABLE</LocalizedText><br /><LocalizedText>JUST TO OPEN A MENU.</LocalizedText><br /><span className="mp-insight-line"><LocalizedText>I THOUGHT THAT WAS</LocalizedText><br /><LocalizedText>WASTED REAL ESTATE.</LocalizedText></span></h2>
    <p><LocalizedText>So I turned one NFC tap into the menu, Wi-Fi, Google reviews, games, socials and more.</LocalizedText></p>
    <div className="mp-product-art mp-menu-art">
      <div className="mp-note mp-promo-note mp-menu-note">
        <span><LocalizedText>ONE TAP.</LocalizedText><br /><LocalizedText>EVERYTHING</LocalizedText><br /><mark><LocalizedText>YOUR CUSTOMERS</LocalizedText></mark><br /><LocalizedText>NEED.</LocalizedText></span>
        <span className="mp-menu-features"><em><LocalizedText>MENU.</LocalizedText></em><br /><em><LocalizedText>REVIEWS.</LocalizedText></em><br /><em><LocalizedText>GAMES.</LocalizedText></em><br /><LocalizedText>SOCIALS.</LocalizedText><br /><LocalizedText>AND MORE.</LocalizedText></span>
        <svg viewBox="0 0 60 100" preserveAspectRatio="none" aria-hidden="true"><path d="M7 4Q60 55 23 91m-3-14 3 16 12-10" /></svg>
      </div>
      <Device src="mobile/menutap-menu-real.jpg" alt={localizedText("Actual MenuTap mobile restaurant menu, captured from its live demo")} />
      <img className="mp-menu-sticker" src={`${A}mobile/menutap-sticker.webp`} alt={localizedText("The physical MenuTap NFC tabletop product")} width="400" height="400" loading="lazy" decoding="async" />
    </div>
    <ProjectActions href={menuTapHub} demo="See the Demo" projectHref="https://www.foodspotmobile.com/" projectLabel="View project" />
    <p className="mp-project-proof"><LocalizedText>The live customer menu opens in a browser without a sign-in.</LocalizedText></p>
    <Pills items={[[Code2,"Next.js"],[Radio,"NFC (NTAG213)"],[Database,"Database"]]} />
  </section>;
}

const foodspotScreens = [
  { label: "UGC receipt", src: "mobile/foodspot-receipt-poster.jpg", alt: "Actual delivered-order UGC receipt in FoodSpot Mobile", video: true },
  { label: "Menu", src: "foodspot/menu-mobile.jpg", alt: "Actual FoodSpot Mobile menu management screen" },
  { label: "Dashboard", src: "foodspot/dashboard-mobile.jpg", alt: "Actual FoodSpot Mobile restaurant dashboard" },
  { label: "Inventory", src: "foodspot/inventory-mobile.jpg", alt: "Actual FoodSpot Mobile inventory screen" },
];
function ReceiptVideo() {
  const video = useRef(null);
  const reduce = useMotionPreference();
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [manualPlay, setManualPlay] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const wantsPlay = (!reduce || manualPlay) && !paused;
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, { threshold:.1 });
    const preload = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setLoaded(true); preload.disconnect(); }
    }, { rootMargin:"300px" });
    observer.observe(video.current);
    preload.observe(video.current);
    return () => { observer.disconnect(); preload.disconnect(); };
  }, []);
  useEffect(() => {
    const node = video.current;
    const update = () => {
      if (visible && wantsPlay && !document.hidden) node.play().catch(() => setBlocked(true));
      else node.pause();
    };
    update();
    node.addEventListener("loadeddata", update);
    document.addEventListener("visibilitychange", update);
    return () => { node.pause(); node.removeEventListener("loadeddata", update); document.removeEventListener("visibilitychange", update); };
  }, [visible, wantsPlay, loaded]);
  const play = () => {
    setManualPlay(true); setPaused(false); setBlocked(false); setLoaded(true);
    video.current.play().catch(() => setBlocked(true));
  };
  return <div className="mp-receipt-video"><video ref={video} src={loaded ? `${A}mobile/foodspot-receipt-loop.mp4` : undefined} poster={loaded ? `${A}mobile/foodspot-receipt-poster.jpg` : undefined} muted loop playsInline autoPlay={wantsPlay} preload="none" aria-label={localizedText("Eight-second recording of FoodSpot’s delivered receipt and customer photo invitation")} onPlaying={() => setBlocked(false)} />
    <button className="mp-video-toggle" aria-label={wantsPlay && !blocked ? "Pause receipt video" : "Play receipt video"} onClick={wantsPlay && !blocked ? () => setPaused(true) : play}>{wantsPlay && !blocked ? <Pause size={16} /> : <Play size={16} />}</button>
  </div>;
}
function MobileFoodSpot({ onOpen }) {
  const [screen, setScreen] = useState(0);
  return <section id="foodspot" className="mp-section mp-project" aria-labelledby="mp-foodspot-title">
    <Label n="03" status="Side Project"><LocalizedText>FOODSPOT</LocalizedText></Label>
    <h2 id="mp-foodspot-title"><LocalizedText>FOODSPOT’S UGC RECEIPT</LocalizedText><br /><LocalizedText>BECAME A BROWSER</LocalizedText><br /><span className="mp-insight-line"><LocalizedText>CAMERA PRODUCT.</LocalizedText></span></h2>
    <p><LocalizedText>FoodSpot’s post-purchase UGC Receipt inspired a focused browser camera experience that later became UGC Camera.</LocalizedText></p>
    <div className="mp-product-art mp-foodspot-art">
      <Device src={foodspotScreens[screen].video ? undefined : foodspotScreens[screen].src} alt={foodspotScreens[screen].alt}>{foodspotScreens[screen].video && <ReceiptVideo />}</Device>
      <ArrowNote className="mp-promo-note mp-receipt-note"><LocalizedText>THE ORDER ENDS.</LocalizedText><br /><LocalizedText>THE CONTENT STARTS.</LocalizedText><br /><mark><LocalizedText>UGC RECEIPTS.</LocalizedText></mark></ArrowNote>
      <figure className="mp-customer-story" aria-label={localizedText("Illustrative customer Story showing a burger, fries and the Smash Burger business tag")}>
        <img src={`${A}mobile/foodspot-customer-story.webp`} alt={localizedText("Customer holding a Smash Burger and sharing a Story saying Best burger in town")} width="315" height="640" loading="lazy" decoding="async" />
        <div className="mp-story-progress" aria-hidden="true"><span /><span /><span /></div>
        <div className="mp-story-author" aria-hidden="true"><UserRound size={12} /><span><LocalizedText>your.customer</LocalizedText></span><small><LocalizedText>2h</LocalizedText></small><span className="mp-story-close">×</span></div>
        <span className="mp-story-business"><MapPin size={11} aria-hidden="true" /><LocalizedText>Smash Burger</LocalizedText></span>
      </figure>
    </div>
    <div className="mp-screen-picker" aria-label={localizedText("FoodSpot Mobile screens")}>{foodspotScreens.map((item, i) => <button key={item.label} aria-pressed={screen === i} onClick={() => setScreen(i)}><LocalizedText>{item.label}</LocalizedText></button>)}</div>
    <ProjectActions href={screen === 0 ? foodspotReceipt : foodspotDemo} demo={screen === 0 ? "Try the Receipt" : "View Demo"} projectHref={screen === 0 ? foodspotDemo : foodspotReceipt} projectLabel={screen === 0 ? "View restaurant demo" : "View receipt demo"} />
    <p className="mp-project-proof"><LocalizedText>Explore the populated owner demo, then open engineering notes for menu and inventory details.</LocalizedText></p>
    <BuildNotesLink project="foodspot" className="mp-text-action" onOpen={() => onOpen("foodspot")}><LocalizedText>Engineering notes</LocalizedText><ArrowUpRight size={14} /></BuildNotesLink>
    <Pills items={[[Code2,"React"],[Database,"Supabase"],[Camera,"UGC receipt"]]} />
  </section>;
}

const appSubs = ["Dictation", "Downloads", "Screen sharing", "Activity monitor", "Local AI"];
function MobileMac({ onOpen }) {
  const [index, setIndex] = useState(0);
  const app = macApps[index];
  return <section id="mac-apps" className="mp-section mp-mac" aria-labelledby="mp-mac-title">
    <Label n="04" status="Live Products"><LocalizedText>MAC APPS</LocalizedText></Label>
    <h2 id="mp-mac-title"><LocalizedText>AND SOMETIMES</LocalizedText><br /><LocalizedText>THE PROBLEM IS</LocalizedText><br /><LocalizedText>JUST MINE.</LocalizedText></h2>
    <p><LocalizedText>Small but useful macOS apps that solve real problems.</LocalizedText></p>
    <div className="mp-app-grid" aria-label={localizedText("Choose a Mac app")}>{macApps.map((item, i) => <button key={item.id} aria-pressed={index === i} onClick={() => setIndex(i)}><img src={item.icon} alt="" width="56" height="56" loading="lazy" decoding="async" /><b>{item.name.replace("Screen Bridge", "ScreenBridge")}</b><span>{appSubs[i]}</span></button>)}</div>
    <div className="mp-macbook">
      <div className="mp-mac-screen" aria-live="polite">{app.image ? <img src={app.id === "ivoz" ? `${A}mobile/ivoz-window-real.webp` : app.image} alt={app.imageAlt} width="900" height="600" loading="lazy" decoding="async" /> : <div className="mp-ibrain"><img src={app.icon} alt="" width="48" height="48" /><h3><LocalizedText>{app.name}</LocalizedText></h3><p><LocalizedText>{app.tagline}</LocalizedText></p><Out href={app.links[0].href}><LocalizedText>Explore the source</LocalizedText><ArrowUpRight size={14} /></Out></div>}</div>
      <div className="mp-mac-base" aria-hidden="true" />
    </div>
    <p className="mp-mac-caption">{app.name.replace("Screen Bridge", "ScreenBridge")} · {app.image ? "Actual application window" : "Local AI • source available"}</p>
    {app.id === "ivoz" && <p className="mp-project-proof"><LocalizedText>Retested shortcut and microphone-permission behavior across repeated launches.</LocalizedText></p>}
    <Out href={suite} className="mp-button mp-yellow mp-full"><LocalizedText>Explore All Mac Apps</LocalizedText><ArrowRight size={17} /></Out>
    <Pills items={[[Apple,"Swift"],[Sparkles,"SwiftUI"],[Cpu,"macOS APIs"]]} />
    <BuildNotesLink project="mac" className="mp-text-action" onOpen={() => onOpen("mac")}><LocalizedText>Open source. Built for Apple Silicon.</LocalizedText><ArrowUpRight size={14} /></BuildNotesLink>
  </section>;
}

const steps = [
  [Lightbulb,"Problem","I notice something that’s broken or inefficient.","#fff0bf"],
  [Search,"Research","I learn what’s possible and what already exists.","#e0efff"],
  [Brain,"Think","I form my own approach.","#f1dafa"],
  [FileText,"PRD","I write a small plan.","#d9f6ec"],
  [Code2,"Build","I build with AI and code.","#e3eff3"],
  [FlaskConical,"Test","I test with real use cases.","#dcecff"],
  [Bug,"Break it","I try to break it.","#ffe2de"],
  [Wrench,"Audit & Fix","I review what went wrong and improve it.","#e6ebe9"],
  [Send,"Ship it","I release it and keep learning.","#d5f5e5"],
];
function MobileProcess({ onOpen }) {
  return <section id="about" className="mp-section mp-process" aria-labelledby="mp-process-title">
    <Label n="05"><LocalizedText>HOW I WORK</LocalizedText></Label>
    <h2 id="mp-process-title"><LocalizedText>AI IS MY LEVERAGE.</LocalizedText><br /><LocalizedText>NOT MY SUBSTITUTE</LocalizedText><br /><LocalizedText>FOR THINKING.</LocalizedText></h2>
    <p><LocalizedText>I use AI to move faster, explore more ideas, and get to working products. The interesting part is what happens after the prompt.</LocalizedText></p>
    <ol className="mp-steps">{steps.map(([Icon,title,description,color]) => <li key={title}><span className="mp-step-icon" style={{background:color}}><Icon size={23} aria-hidden="true" /></span><b><LocalizedText>{title}</LocalizedText></b><span><LocalizedText>{description}</LocalizedText></span></li>)}</ol>
    <div className="mp-hand-end"><LocalizedText>THE PROMPT ISN’T THE PRODUCT.</LocalizedText></div>
    <BuildNotesLink project="engineering" className="mp-text-action" onOpen={() => onOpen("engineering")}><LocalizedText>My engineering notes</LocalizedText><ArrowUpRight size={14} /></BuildNotesLink>
  </section>;
}

function MobileBarber() {
  const [review, setReview] = useState(0);
  const item = barberReviews[review];
  return <section className="mp-barber" aria-labelledby="mp-barber-title">
    <img className="mp-barber-bg" src={`${A}mobile/autobarber-workshop.webp`} alt="" width="1200" height="900" loading="lazy" decoding="async" />
    <div className="mp-barber-content"><Label n="06" status="Past business"><LocalizedText>THE AUTO BARBER</LocalizedText></Label>
      <h2 id="mp-barber-title"><LocalizedText>BEFORE I BUILT</LocalizedText><br /><LocalizedText>SOFTWARE,</LocalizedText><br /><LocalizedText>I BUILT A BUSINESS.</LocalizedText></h2>
      <p><LocalizedText>Automotive restyling. Real customers, real operations, and learning what it takes to deliver work people trust.</LocalizedText></p>
      <figure className="mp-barber-portrait"><img src={`${A}mobile/autobarber-portrait.jpg`} alt={localizedText("Hikari in the Auto Barber shop, wearing the branded apron and holding a detailing towel with a gloved hand")} width="900" height="900" loading="lazy" decoding="async" /></figure>
      <div className="mp-business-facts" aria-label={localizedText("Auto Barber business results")}><div><b><LocalizedText>6-FIGURE</LocalizedText></b><span><LocalizedText>REVENUE</LocalizedText></span></div><div><b>165+</b><span><LocalizedText>GOOGLE REVIEWS</LocalizedText></span></div><div><b>4.9</b><span className="mp-stars" aria-label={localizedText("Five stars")}>★★★★★</span></div></div>
      <div className="mp-review"><div className="mp-review-head"><GoogleMark size={25} /><span><b>4.9</b><span className="mp-stars" aria-label={localizedText("Five stars")}>★★★★★</span></span></div><blockquote>“{item.quote}{item.excerpt ? "…" : ""}”</blockquote><Out href={item.href}><LocalizedText>{item.name}</LocalizedText><ArrowUpRight size={13} /></Out><div className="mp-review-controls"><button aria-label="Previous customer review" onClick={() => setReview((review + barberReviews.length - 1) % barberReviews.length)}><ChevronLeft size={18} /></button><span aria-live="polite">{review + 1} / {barberReviews.length}</span><button aria-label="Next customer review" onClick={() => setReview((review + 1) % barberReviews.length)}><ChevronRight size={18} /></button></div></div>
      <Out href={googleReviewsUrl} className="mp-button mp-yellow mp-full"><LocalizedText>See all Google reviews</LocalizedText><ArrowUpRight size={16} /></Out>
      <Out href="https://hikari-brandan.vercel.app/projects/the-auto-barber" className="mp-small-note mp-story-link"><LocalizedText>Read the Auto Barber story</LocalizedText><ArrowUpRight size={14} /></Out>
    </div>
  </section>;
}

const toolGroups = [
  [Code2,"Product / web",["React","TypeScript","JavaScript","Vite"]],
  [Apple,"Native macOS",["Swift","SwiftUI","AppKit","Rust / Tauri"]],
  [Database,"Backend / data",["Supabase","PostgreSQL","Local APIs"]],
  [Brain,"AI workflow",["ChatGPT / Codex","Claude","Kimi K3","Gemini","Perplexity"]],
  [GitBranch,"Build / ship",["Git / GitHub","Vercel","Swift Package Manager"]],
];
function MobileStack() {
  return <section className="mp-section mp-stack"><Label n="07"><LocalizedText>THE TOOLBOX</LocalizedText></Label><h3><LocalizedText>Tools I work with</LocalizedText><br /><span><LocalizedText>to build, ship and learn.</LocalizedText></span></h3><div className="mp-tool-groups">{toolGroups.map(([Icon,title,items]) => <div key={title}><h4><Icon size={17} aria-hidden="true" /><LocalizedText>{title}</LocalizedText></h4><ul>{items.map(tool => <li key={tool}><LocalizedText>{tool}</LocalizedText></li>)}</ul></div>)}</div></section>;
}
function MobileOpportunities() {
  return <section className="mp-section mp-opportunities"><Label n="08"><LocalizedText>WHAT I’M LOOKING FOR</LocalizedText></Label><h3><LocalizedText>I’M LOOKING FOR A</LocalizedText><br /><em><LocalizedText>DEVELOPER ROLE.</LocalizedText></em></h3><p><LocalizedText>I’m looking for a small, ambitious team where I can work close to the product and customers, build quickly, learn from experienced engineers, and take ownership of real problems.</LocalizedText></p><div className="mp-role-cards">{[[Code2,"Developer","Real products. Real problems."],[Globe2,"Fully remote","Worldwide. English & Español."],[GraduationCap,"Open to learn & grow","With experienced engineers."],[UsersRound,"What I bring","Product thinking and execution."]].map(([Icon,title,text]) => <div key={title}><Icon size={21} aria-hidden="true" /><b><LocalizedText>{title}</LocalizedText></b><span><LocalizedText>{text}</LocalizedText></span></div>)}</div></section>;
}

function MobileContact() {
  return <section id="contact" className="mp-section mp-contact"><Label n="09"><LocalizedText>LET’S TALK</LocalizedText></Label><h3><LocalizedText>You’ve seen the receipts.</LocalizedText><br /><em><LocalizedText>Let’s talk.</LocalizedText></em></h3><ArrowNote><LocalizedText>Real projects.</LocalizedText><br /><LocalizedText>Real progress.</LocalizedText><br /><LocalizedText>Let’s build</LocalizedText><br /><LocalizedText>what’s next.</LocalizedText></ArrowNote><Out href={`${email}?subject=Let%E2%80%99s%20book%20a%20call`} className="mp-button mp-yellow mp-full"><LocalizedText>Book a Call</LocalizedText><ArrowRight size={18} /></Out><p className="mp-call-note"><LocalizedText>Email me to arrange a time.</LocalizedText></p><div className="mp-contact-actions"><Out href={email}><Mail size={18} /><LocalizedText>Email Me</LocalizedText><ArrowUpRight size={13} /></Out><Out href={linkedin}><Linkedin size={18} /><LocalizedText>LinkedIn</LocalizedText><ArrowUpRight size={13} /></Out><Out href={github}><Github size={18} /><LocalizedText>GitHub</LocalizedText><ArrowUpRight size={13} /></Out><Out href={whatsapp}><WhatsAppIcon size={19} /><LocalizedText>WhatsApp</LocalizedText><ArrowUpRight size={13} /></Out></div></section>;
}
function MobileFooter() {
  return <footer className="mp-footer"><FooterQuote /><a href="#home" className="mp-signature"><LocalizedText>Hikari Brandan</LocalizedText></a><p className="mp-footer-roots"><LocalizedText>SEATTLE ROOTS. ARGENTINA BASE.</LocalizedText></p><div className="mp-socials"><Out href={linkedin} aria-label={localizedText("LinkedIn")}><Linkedin /></Out><Out href={github} aria-label={localizedText("GitHub")}><Github /></Out><Out href={resume} aria-label={localizedText("View résumé")}><FileText /></Out><Out href={whatsapp} aria-label={localizedText("WhatsApp")}><WhatsAppIcon size={24} /></Out></div><LanguageFlags /><p className="mp-copyright">© {new Date().getFullYear()} HIKARI BRANDAN<br /><LocalizedText>BUILT TO SOLVE REAL PROBLEMS.</LocalizedText></p></footer>;
}

export default function MobilePortfolio({ onOpen }) {
  const root = useRef(null);
  const { locale } = useLanguage();
  const [active, setActive] = useState("home");
  const [compact, setCompact] = useState(false);
  const reduce = useMotionPreference();
  useEffect(() => {
    if (!window.location.hash) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("mp-background-ready");
        observer.unobserve(entry.target);
      }
    }), { rootMargin: "600px" });
    root.current.querySelectorAll(".mp-product-art").forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const boundary = window.innerHeight * .3;
        const about = document.getElementById("about");
        const projects = document.getElementById("projects");
        setActive(about?.getBoundingClientRect().top <= boundary ? "about" : projects?.getBoundingClientRect().top <= boundary ? "projects" : "home");
        setCompact(window.scrollY > 60);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive:true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  useEffect(() => {
    if (reduce) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("mp-revealed"); observer.unobserve(entry.target); }
    }), { threshold:.05 });
    root.current.querySelectorAll(".mp-product-art, .mp-macbook, .mp-role-cards").forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [reduce]);
  return <div ref={root} className={`mobile-portfolio ${reduce ? "mp-reduced" : ""}`}>
    <header className={`mp-header ${compact ? "mp-compact" : ""}`}><a href="#home" className="mp-mark" aria-label={localizedText("Hikari Brandan, home")}><LocalizedText>Hikari Brandan</LocalizedText></a><div className="mp-header-actions"><LanguageSwitcher className="mp-language-switcher" iconOnly /></div></header>
    <main className="mp-paper">
      <section id="home" className="mp-intro" aria-labelledby="mp-intro-title"><span className="mp-available"><span /><LocalizedText>Open to opportunities</LocalizedText></span><h1 id="mp-intro-title"><LocalizedText>Let’s build</LocalizedText><br /><LocalizedText>something</LocalizedText><br /><em><LocalizedText>meaningful.</LocalizedText></em></h1><p><LocalizedText>I’m Hikari, a Product Developer. I turn real problems into useful products with product thinking, AI and code.</LocalizedText></p><div className="mp-identity"><div><span className="mp-identity-icon"><Globe2 size={28} /></span><span><b><LocalizedText>Fully remote</LocalizedText></b><span><LocalizedText>Worldwide</LocalizedText></span></span></div><div><span className="mp-identity-icon"><MessageSquare size={27} /></span><span><b><LocalizedText>Native languages</LocalizedText></b><LanguageFlags /></span></div></div><figure className="mp-personal-portrait"><img src={`${A}mobile/hikari-roots-portrait.jpg`} alt={localizedText("Hikari Brandan, raised in Seattle, Washington, and building from Córdoba, Argentina")} width="840" height="918" fetchPriority="high" decoding="async" /></figure></section>
      <MobileUGC /><MobileMenuTap onOpen={onOpen} /><MobileFoodSpot onOpen={onOpen} /><MobileMac onOpen={onOpen} /><MobileProcess onOpen={onOpen} /><MobileBarber /><ContentDistribution /><MobileStack /><MobileOpportunities /><MobileContact /><MobileFooter />
    </main>
    <nav className="mp-bottom-nav" aria-label={localizedText("Mobile navigation")}>{[[Home,"home","Home"],[BriefcaseBusiness,"projects","Projects"],[UserRound,"about","About"]].map(([Icon,id,label]) => <a href={`#${id}`} key={id} aria-current={active === id ? "location" : undefined} className={active === id ? "mp-active" : ""}><Icon size={22} aria-hidden="true" /><span><LocalizedText>{label}</LocalizedText></span></a>)}<Out href={resume}><FileText size={22} aria-hidden="true" /><span><LocalizedText>Résumé</LocalizedText></span></Out></nav>
  </div>;
}
