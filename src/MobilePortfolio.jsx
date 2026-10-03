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
  return <a href={href} className={className} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" {...props}>{children}</a>;
}
function Label({ n, children, status }) {
  return <div className="mp-label"><span>{n} <i>/</i> {children}</span>{status && <span className={`mp-status ${status === "Side Project" ? "mp-status-past" : ""}`}>{status}</span>}</div>;
}
function Pills({ items }) {
  return <ul className="mp-pills" aria-label="Project technologies">{items.map(([Icon, text]) => <li key={text}><Icon size={13} aria-hidden="true" />{text}</li>)}</ul>;
}
function ArrowNote({ children, className = "" }) {
  return <div className={`mp-note ${className}`}>{children}<svg viewBox="0 0 60 65" aria-hidden="true"><path d="M48 5Q52 40 13 52m7-13-10 14 17-2" /></svg></div>;
}
function Device({ src, alt, children, className = "" }) {
  return <div className={`mp-device ${className}`}>{src && <img src={`${A}${src}`} alt={alt} loading="lazy" width="390" height="844" />}{children}</div>;
}
function ProjectActions({ href, demo, project, projectHref, onOpen, projectLabel = "View Project" }) {
  return <div className="mp-actions"><Out href={href} className="mp-button mp-yellow">{demo}<ArrowRight size={17} /></Out>{projectHref ? <Out href={projectHref} className="mp-button mp-outline">{projectLabel}</Out> : <BuildNotesLink project={project} className="mp-button mp-outline" onOpen={() => onOpen(project)}>{projectLabel}</BuildNotesLink>}</div>;
}

function MobileUGC() {
  return <section id="projects" className="mp-section mp-project mp-ugc" aria-labelledby="mp-ugc-title">
    <Label n="01" status="Live Product">UGC CAMERA</Label>
    <h2 id="mp-ugc-title">I NOTICED CUSTOMERS<br />WERE ALREADY<br />PHOTOGRAPHING<br /><em>THEIR FOOD.</em></h2>
    <p>So I gave restaurants their own branded camera — a QR scan or NFC tap opens a camera built for their business to capture and share photos.</p>
    <div className="mp-product-art mp-ugc-art">
      <Device className="mp-camera-device">
        <div className="mp-photo-preview">
          <img src={`${A}ugc-sugar-crumb.webp`} alt="Sugar & Crumb café photo from the UGC Camera Tap & Snap product carousel" width="768" height="768" loading="lazy" decoding="async" />
          <span className="mp-preview-tag"><MapPin size={15} />Sugar & Crumb</span>
        </div>
      </Device>
      <ArrowNote className="mp-ugc-note"><span>ORGANIC UGC</span><br /><span>CONTENT</span><br /><span>IN SECONDS.</span></ArrowNote>
    </div>
    <ProjectActions href={projectData.ugc.demoUrl} demo="Try the Demo" projectHref="https://hikari-brandan.vercel.app/projects/ugc-camera" />
    <p className="mp-project-proof">Expanded the touch targets for resizing and rotating stickers on mobile.</p>
    <Pills items={[[Code2,"Next.js"],[Database,"Supabase"],[Camera,"Camera APIs"]]} />
  </section>;
}

function MobileMenuTap({ onOpen }) {
  return <section id="menutap" className="mp-section mp-project" aria-labelledby="mp-menu-title">
    <Label n="02" status="Live Product">MENUTAP</Label>
    <h2 id="mp-menu-title">RESTAURANTS PUT A QR<br />ON EVERY TABLE<br />JUST TO OPEN A MENU.<br /><span className="mp-insight-line">I THOUGHT THAT WAS<br />WASTED REAL ESTATE.</span></h2>
    <p>So I turned one NFC tap into the menu, Wi-Fi, Google reviews, games, socials and more.</p>
    <div className="mp-product-art mp-menu-art">
      <div className="mp-note mp-promo-note mp-menu-note">
        <span>ONE TAP.<br />EVERYTHING<br /><mark>YOUR CUSTOMERS</mark><br />NEED.</span>
        <span className="mp-menu-features"><em>MENU.</em><br /><em>REVIEWS.</em><br /><em>GAMES.</em><br />SOCIALS.<br />AND MORE.</span>
        <svg viewBox="0 0 60 100" preserveAspectRatio="none" aria-hidden="true"><path d="M7 4Q60 55 23 91m-3-14 3 16 12-10" /></svg>
      </div>
      <Device src="mobile/menutap-menu-real.jpg" alt="Actual MenuTap mobile restaurant menu, captured from its live demo" />
      <img className="mp-menu-sticker" src={`${A}mobile/menutap-sticker.webp`} alt="The physical MenuTap NFC tabletop product" width="400" height="400" loading="lazy" decoding="async" />
    </div>
    <ProjectActions href={menuTapHub} demo="See the Demo" project="menutap" onOpen={onOpen} projectLabel="Build Notes" />
    <p className="mp-project-proof">The live customer menu opens in a browser without a sign-in.</p>
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
  return <div className="mp-receipt-video"><video ref={video} src={loaded ? `${A}mobile/foodspot-receipt-loop.mp4` : undefined} poster={loaded ? `${A}mobile/foodspot-receipt-poster.jpg` : undefined} muted loop playsInline autoPlay={wantsPlay} preload="none" aria-label="Eight-second recording of FoodSpot’s delivered receipt and customer photo invitation" onPlaying={() => setBlocked(false)} />
    <button className="mp-video-toggle" aria-label={wantsPlay && !blocked ? "Pause receipt video" : "Play receipt video"} onClick={wantsPlay && !blocked ? () => setPaused(true) : play}>{wantsPlay && !blocked ? <Pause size={16} /> : <Play size={16} />}</button>
  </div>;
}
function MobileFoodSpot({ onOpen }) {
  const [screen, setScreen] = useState(0);
  return <section id="foodspot" className="mp-section mp-project" aria-labelledby="mp-foodspot-title">
    <Label n="03" status="Side Project">FOODSPOT</Label>
    <h2 id="mp-foodspot-title">FOODSPOT’S UGC RECEIPT<br />BECAME A BROWSER<br /><span className="mp-insight-line">CAMERA PRODUCT.</span></h2>
    <p>FoodSpot’s post-purchase UGC Receipt inspired a focused browser camera experience that later became UGC Camera.</p>
    <div className="mp-product-art mp-foodspot-art">
      <Device src={foodspotScreens[screen].video ? undefined : foodspotScreens[screen].src} alt={foodspotScreens[screen].alt}>{foodspotScreens[screen].video && <ReceiptVideo />}</Device>
      <ArrowNote className="mp-promo-note mp-receipt-note">THE ORDER ENDS.<br />THE CONTENT STARTS.<br /><mark>UGC RECEIPTS.</mark></ArrowNote>
      <figure className="mp-customer-story" aria-label="Illustrative customer Story showing a burger, fries and the Smash Burger business tag">
        <img src={`${A}mobile/foodspot-customer-story.webp`} alt="Customer holding a Smash Burger and sharing a Story saying Best burger in town" width="315" height="640" loading="lazy" decoding="async" />
        <div className="mp-story-progress" aria-hidden="true"><span /><span /><span /></div>
        <div className="mp-story-author" aria-hidden="true"><UserRound size={12} /><span>your.customer</span><small>2h</small><span className="mp-story-close">×</span></div>
        <span className="mp-story-business"><MapPin size={11} aria-hidden="true" />Smash Burger</span>
      </figure>
    </div>
    <div className="mp-screen-picker" aria-label="FoodSpot Mobile screens">{foodspotScreens.map((item, i) => <button key={item.label} aria-pressed={screen === i} onClick={() => setScreen(i)}>{item.label}</button>)}</div>
    <ProjectActions href={screen === 0 ? foodspotReceipt : foodspotDemo} demo={screen === 0 ? "Try the Receipt" : "View Demo"} project="foodspot" onOpen={onOpen} projectLabel="Build Notes" />
    <p className="mp-project-proof">The populated owner demo shows order management; project notes document menu and inventory screens.</p>
    <Pills items={[[Code2,"React"],[Database,"Supabase"],[Camera,"UGC receipt"]]} />
  </section>;
}

const appSubs = ["Dictation", "Downloads", "Screen sharing", "Activity monitor", "Local AI"];
function MobileMac({ onOpen }) {
  const [index, setIndex] = useState(0);
  const app = macApps[index];
  return <section id="mac-apps" className="mp-section mp-mac" aria-labelledby="mp-mac-title">
    <Label n="04" status="Live Products">MAC APPS</Label>
    <h2 id="mp-mac-title">AND SOMETIMES<br />THE PROBLEM IS<br />JUST MINE.</h2>
    <p>Small but useful macOS apps that solve real problems.</p>
    <div className="mp-app-grid" aria-label="Choose a Mac app">{macApps.map((item, i) => <button key={item.id} aria-pressed={index === i} onClick={() => setIndex(i)}><img src={item.icon} alt="" width="56" height="56" loading="lazy" decoding="async" /><b>{item.name.replace("Screen Bridge", "ScreenBridge")}</b><span>{appSubs[i]}</span></button>)}</div>
    <div className="mp-macbook">
      <div className="mp-mac-screen" aria-live="polite">{app.image ? <img src={app.id === "ivoz" ? `${A}mobile/ivoz-window-real.webp` : app.image} alt={app.imageAlt} width="900" height="600" loading="lazy" decoding="async" /> : <div className="mp-ibrain"><img src={app.icon} alt="" width="48" height="48" /><h3>{app.name}</h3><p>{app.tagline}</p><Out href={app.links[0].href}>Explore the source<ArrowUpRight size={14} /></Out></div>}</div>
      <div className="mp-mac-base" aria-hidden="true" />
    </div>
    <p className="mp-mac-caption">{app.name.replace("Screen Bridge", "ScreenBridge")} · {app.image ? "Actual application window" : "Local AI • source available"}</p>
    {app.id === "ivoz" && <p className="mp-project-proof">Retested shortcut and microphone-permission behavior across repeated launches.</p>}
    <Out href={suite} className="mp-button mp-yellow mp-full">Explore All Mac Apps<ArrowRight size={17} /></Out>
    <Pills items={[[Apple,"Swift"],[Sparkles,"SwiftUI"],[Cpu,"macOS APIs"]]} />
    <BuildNotesLink project="mac" className="mp-text-action" onOpen={() => onOpen("mac")}>Open source. Built for Apple Silicon.<ArrowUpRight size={14} /></BuildNotesLink>
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
    <Label n="05">HOW I WORK</Label>
    <h2 id="mp-process-title">AI IS MY LEVERAGE.<br />NOT MY SUBSTITUTE<br />FOR THINKING.</h2>
    <p>I use AI to move faster, explore more ideas, and get to working products. The interesting part is what happens after the prompt.</p>
    <ol className="mp-steps">{steps.map(([Icon,title,description,color]) => <li key={title}><span className="mp-step-icon" style={{background:color}}><Icon size={23} aria-hidden="true" /></span><b>{title}</b><span>{description}</span></li>)}</ol>
    <div className="mp-hand-end">THE PROMPT ISN’T THE PRODUCT.</div>
    <BuildNotesLink project="engineering" className="mp-text-action" onOpen={() => onOpen("engineering")}>My engineering notes<ArrowUpRight size={14} /></BuildNotesLink>
  </section>;
}

function MobileBarber() {
  const [review, setReview] = useState(0);
  const item = barberReviews[review];
  return <section className="mp-barber" aria-labelledby="mp-barber-title">
    <img className="mp-barber-bg" src={`${A}mobile/autobarber-workshop.webp`} alt="" width="1200" height="900" loading="lazy" decoding="async" />
    <div className="mp-barber-content"><Label n="06" status="Past business">THE AUTO BARBER</Label>
      <h2 id="mp-barber-title">BEFORE I BUILT<br />SOFTWARE,<br />I BUILT A BUSINESS.</h2>
      <p>Automotive restyling. Real customers, real operations, and learning what it takes to deliver work people trust.</p>
      <figure className="mp-barber-portrait"><img src={`${A}mobile/autobarber-portrait.jpg`} alt="Hikari in the Auto Barber shop, wearing the branded apron and holding a detailing towel with a gloved hand" width="900" height="900" loading="lazy" decoding="async" /></figure>
      <div className="mp-business-facts" aria-label="Auto Barber business results"><div><b>6-FIGURE</b><span>REVENUE</span></div><div><b>165+</b><span>GOOGLE REVIEWS</span></div><div><b>4.9</b><span className="mp-stars" aria-label="Five stars">★★★★★</span></div></div>
      <div className="mp-review"><div className="mp-review-head"><GoogleMark size={25} /><span><b>4.9</b><span className="mp-stars" aria-label="Five stars">★★★★★</span></span></div><blockquote>“{item.quote}{item.excerpt ? "…" : ""}”</blockquote><Out href={item.href}>{item.name}<ArrowUpRight size={13} /></Out><div className="mp-review-controls"><button aria-label="Previous customer review" onClick={() => setReview((review + barberReviews.length - 1) % barberReviews.length)}><ChevronLeft size={18} /></button><span aria-live="polite">{review + 1} / {barberReviews.length}</span><button aria-label="Next customer review" onClick={() => setReview((review + 1) % barberReviews.length)}><ChevronRight size={18} /></button></div></div>
      <Out href={googleReviewsUrl} className="mp-button mp-yellow mp-full">See all Google reviews<ArrowUpRight size={16} /></Out>
      <Out href="https://hikari-brandan.vercel.app/projects/the-auto-barber" className="mp-small-note mp-story-link">Read the Auto Barber story<ArrowUpRight size={14} /></Out>
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
  return <section className="mp-section mp-stack"><Label n="07">THE TOOLBOX</Label><h3>Tools I work with<br /><span>to build, ship and learn.</span></h3><div className="mp-tool-groups">{toolGroups.map(([Icon,title,items]) => <div key={title}><h4><Icon size={17} aria-hidden="true" />{title}</h4><ul>{items.map(tool => <li key={tool}>{tool}</li>)}</ul></div>)}</div></section>;
}
function MobileOpportunities() {
  return <section className="mp-section mp-opportunities"><Label n="08">WHAT I’M LOOKING FOR</Label><h3>I’M LOOKING FOR A<br /><em>DEVELOPER ROLE.</em></h3><p>I’m looking for a small, ambitious team where I can work close to the product and customers, build quickly, learn from experienced engineers, and take ownership of real problems.</p><div className="mp-role-cards">{[[Code2,"Developer","Real products. Real problems."],[Globe2,"Fully remote","Worldwide. English & Español."],[GraduationCap,"Open to learn & grow","With experienced engineers."],[UsersRound,"What I bring","Product thinking and execution."]].map(([Icon,title,text]) => <div key={title}><Icon size={21} aria-hidden="true" /><b>{title}</b><span>{text}</span></div>)}</div></section>;
}

function MobileContact() {
  return <section id="contact" className="mp-section mp-contact"><Label n="09">LET’S TALK</Label><h3>You’ve seen the receipts.<br /><em>Let’s talk.</em></h3><ArrowNote>Real projects.<br />Real progress.<br />Let’s build<br />what’s next.</ArrowNote><Out href={`${email}?subject=Let%E2%80%99s%20book%20a%20call`} className="mp-button mp-yellow mp-full">Book a Call<ArrowRight size={18} /></Out><p className="mp-call-note">Email me to arrange a time.</p><div className="mp-contact-actions"><Out href={email}><Mail size={18} />Email Me<ArrowUpRight size={13} /></Out><Out href={linkedin}><Linkedin size={18} />LinkedIn<ArrowUpRight size={13} /></Out><Out href={github}><Github size={18} />GitHub<ArrowUpRight size={13} /></Out><Out href={whatsapp}><WhatsAppIcon size={19} />WhatsApp<ArrowUpRight size={13} /></Out></div></section>;
}
function MobileFooter() {
  return <footer className="mp-footer"><FooterQuote /><a href="#home" className="mp-signature">Hikari Brandan</a><p className="mp-footer-roots">SEATTLE ROOTS. ARGENTINA BASE.</p><div className="mp-socials"><Out href={linkedin} aria-label="LinkedIn"><Linkedin /></Out><Out href={github} aria-label="GitHub"><Github /></Out><Out href={resume} aria-label="View résumé"><FileText /></Out><Out href={whatsapp} aria-label="WhatsApp"><WhatsAppIcon size={24} /></Out></div><LanguageFlags /><p className="mp-copyright">© {new Date().getFullYear()} HIKARI BRANDAN<br />BUILT TO SOLVE REAL PROBLEMS.</p></footer>;
}

export default function MobilePortfolio({ onOpen }) {
  const root = useRef(null);
  const [active, setActive] = useState("home");
  const [compact, setCompact] = useState(false);
  const reduce = useMotionPreference();
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
    <header className={`mp-header ${compact ? "mp-compact" : ""}`}><a href="#home" className="mp-mark" aria-label="Hikari Brandan, home">Hikari Brandan</a><Out href="https://api.whatsapp.com/send?phone=543513668122" className="mp-header-cta" aria-label="Contact Hikari on WhatsApp Business">Let’s talk<ArrowUpRight size={16} /></Out></header>
    <main className="mp-paper">
      <section id="home" className="mp-intro" aria-labelledby="mp-intro-title"><span className="mp-available"><span />Open to opportunities</span><h1 id="mp-intro-title">Let’s build<br />something<br /><em>meaningful.</em></h1><p>I’m Hikari, a Product Developer. I turn real problems into useful products with product thinking, AI and code.</p><div className="mp-identity"><div><span className="mp-identity-icon"><Globe2 size={28} /></span><span><b>Fully remote</b><span>Worldwide</span></span></div><div><span className="mp-identity-icon"><MessageSquare size={27} /></span><span><b>Native languages</b><LanguageFlags /></span></div></div><figure className="mp-personal-portrait"><img src={`${A}mobile/hikari-roots-portrait.jpg`} alt="Hikari Brandan, raised in Seattle, Washington, and building from Córdoba, Argentina" width="840" height="918" fetchPriority="high" decoding="async" /></figure></section>
      <MobileUGC /><MobileMenuTap onOpen={onOpen} /><MobileFoodSpot onOpen={onOpen} /><MobileMac onOpen={onOpen} /><MobileProcess onOpen={onOpen} /><MobileBarber /><MobileStack /><MobileOpportunities /><MobileContact /><MobileFooter />
    </main>
    <nav className="mp-bottom-nav" aria-label="Mobile navigation">{[[Home,"home","Home"],[BriefcaseBusiness,"projects","Projects"],[UserRound,"about","About"]].map(([Icon,id,label]) => <a href={`#${id}`} key={id} aria-current={active === id ? "location" : undefined} className={active === id ? "mp-active" : ""}><Icon size={22} aria-hidden="true" /><span>{label}</span></a>)}<Out href={resume}><FileText size={22} aria-hidden="true" /><span>Résumé</span></Out></nav>
  </div>;
}
