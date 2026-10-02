import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Home, BriefcaseBusiness, UserRound, FileText, Globe2, MessageSquare, Send, Github, Linkedin, Mail, Apple, Code2, Database, Camera, Radio, Lightbulb, Search, Brain, FlaskConical, Bug, Wrench, Sparkles, GraduationCap, UsersRound, ChevronLeft, ChevronRight, MapPin, Cpu, GitBranch } from "lucide-react";
import { GlobeJourney, LanguageFlags, WhatsAppIcon } from "./ContactExperience";
import { FooterQuote } from "./FooterQuote";
import GoogleMark from "./GoogleMark";
import { macApps, projectData } from "./projectData";
import { barberReviews, googleReviewsUrl } from "./reviewData";
import { useMotionControls, useMotionPreference } from "./motion-preferences";
import "./mobile-portfolio.css";

const A = "/assets/";
const github = "https://github.com/hikaribrandan3-code";
const linkedin = "https://www.linkedin.com/in/daiske-brandan-726656323/";
const whatsapp = "https://wa.me/543513668122";
const resume = "/Daiske-Brandan-Resume.pdf";
const email = "mailto:hikaristudioai@gmail.com";
const suite = "https://isuitemacos-cyan.vercel.app/index.html";
const foodspotDemo = "https://foodspotapp-gold.vercel.app/smash-burger-demo/owner/orders";

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
function ProjectActions({ href, demo, project, onOpen }) {
  return <div className="mp-actions"><Out href={href} className="mp-button mp-yellow">{demo}<ArrowRight size={17} /></Out><button className="mp-button mp-outline" onClick={() => onOpen(project)}>View Project</button></div>;
}

function CameraApplication() {
  const frame = useRef(null);
  const [scale, setScale] = useState(.4);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setScale(Math.min(entry.contentRect.width / 390, entry.contentRect.height / 844)));
    observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);
  return <div className="mp-live-frame" ref={frame}><iframe className="mp-live-camera" style={{transform:`translate(-50%, -50%) scale(${scale})`}} src={projectData.ugc.demoUrl} title="Real UGC Camera application" allow="camera; autoplay; fullscreen" /></div>;
}

function MobileUGC({ onOpen }) {
  const [live, setLive] = useState(false);
  const camera = useRef(null);
  useEffect(() => {
    if (!live) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setLive(false);
    });
    observer.observe(camera.current);
    const stop = () => { if (document.hidden) setLive(false); };
    document.addEventListener("visibilitychange", stop);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", stop); };
  }, [live]);
  return <section id="projects" className="mp-section mp-project mp-ugc" aria-labelledby="mp-ugc-title">
    <Label n="01" status="Live Product">UGC CAMERA</Label>
    <h2 id="mp-ugc-title">I NOTICED CUSTOMERS<br />WERE ALREADY<br />PHOTOGRAPHING<br /><em>THEIR FOOD.</em></h2>
    <p>So I gave restaurants their own branded camera — a simple QR or NFC tap that opens a beautiful browser camera to capture and share photos.</p>
    <div ref={camera} className="mp-product-art mp-ugc-art">
      <Device className="mp-camera-device">
        {live ? <CameraApplication /> : <button className="mp-photo-preview" onClick={() => setLive(true)} aria-label="Load the real UGC Camera inside the phone">
          <img src={`${A}ugc-sugar-crumb.webp`} alt="Sugar & Crumb café photo from the UGC Camera Tap & Snap product carousel" width="768" height="768" loading="lazy" />
          <span className="mp-preview-tag"><MapPin size={15} />Sugar & Crumb</span>
          <span className="mp-photo-caption">TAP & SNAP<br /><b>BRANDED PHOTO PREVIEW</b></span>
          <span className="mp-camera-launch"><Camera size={23} />Open the live camera<ArrowUpRight size={15} /></span>
        </button>}
      </Device>
      <ArrowNote>AN EXPLORATION<br />IN MOBILE-FIRST<br />FOOD COMMERCE<br />AND POST-PURCHASE<br />ENGAGEMENT.</ArrowNote>
    </div>
    {live && <button className="mp-text-action" onClick={() => setLive(false)}>Close live camera · return to the preview</button>}
    <ProjectActions href={projectData.ugc.demoUrl} demo="Try the Demo" project="ugc" onOpen={onOpen} />
    <Pills items={[[Code2,"Next.js"],[Database,"Supabase"],[Camera,"Camera APIs"]]} />
  </section>;
}

function MobileMenuTap({ onOpen }) {
  return <section id="menutap" className="mp-section mp-project" aria-labelledby="mp-menu-title">
    <Label n="02" status="Live Product">MENUTAP</Label>
    <h2 id="mp-menu-title">THEN I WONDERED<br />WHY RESTAURANT<br />TABLES WERE<br />STILL JUST ... TABLES.</h2>
    <p>So I built MenuTap — a simple NFC tap that brings your menu, Wi-Fi, reviews, games and more to one tap.</p>
    <div className="mp-product-art mp-menu-art">
      <ArrowNote>ONE TAP.<br />EVERYTHING<br />YOUR CUSTOMERS<br />NEED.</ArrowNote>
      <Device src="mobile/menutap-menu-real.jpg" alt="Actual MenuTap mobile restaurant menu, captured from its live demo" />
      <img className="mp-menu-sticker" src={`${A}menutap-sticker.png`} alt="The physical MenuTap NFC tabletop product" width="400" height="400" loading="lazy" />
    </div>
    <ProjectActions href={projectData.menutap.demoUrl} demo="See the Demo" project="menutap" onOpen={onOpen} />
    <Pills items={[[Code2,"Next.js"],[Radio,"NFC (NTAG213)"],[Database,"Database"]]} />
  </section>;
}

const foodspotScreens = [
  { label: "Menu", src: "foodspot/menu-mobile.jpg", alt: "Actual FoodSpot Mobile menu management screen" },
  { label: "Dashboard", src: "foodspot/dashboard-mobile.jpg", alt: "Actual FoodSpot Mobile restaurant dashboard" },
  { label: "Inventory", src: "foodspot/inventory-mobile.jpg", alt: "Actual FoodSpot Mobile inventory screen" },
  { label: "UGC receipt", src: "foodspot/receipt-mobile.jpg", alt: "Actual delivered-order UGC receipt in FoodSpot Mobile" },
];
function MobileFoodSpot({ onOpen }) {
  const [screen, setScreen] = useState(0);
  return <section id="foodspot" className="mp-section mp-project" aria-labelledby="mp-foodspot-title">
    <Label n="03" status="Side Project">FOODSPOT</Label>
    <h2 id="mp-foodspot-title">BEFORE EITHER OF<br />THOSE, I TRIED<br />REBUILDING LOCAL<br />FOOD COMMERCE.</h2>
    <p>It didn’t become the business, but it taught me enough to build the next two.</p>
    <div className="mp-product-art mp-foodspot-art">
      <Device src={foodspotScreens[screen].src} alt={foodspotScreens[screen].alt} />
      <ArrowNote>AN EXPLORATION<br />IN MOBILE-FIRST<br />FOOD COMMERCE<br />AND POST-PURCHASE<br />ENGAGEMENT.</ArrowNote>
    </div>
    <div className="mp-screen-picker" aria-label="FoodSpot Mobile screens">{foodspotScreens.map((item, i) => <button key={item.label} aria-pressed={screen === i} onClick={() => setScreen(i)}>{item.label}</button>)}</div>
    <ProjectActions href={foodspotDemo} demo="View Demo" project="foodspot" onOpen={onOpen} />
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
    <div className="mp-app-grid" aria-label="Choose a Mac app">{macApps.map((item, i) => <button key={item.id} aria-pressed={index === i} onClick={() => setIndex(i)}><img src={item.icon} alt="" width="56" height="56" loading="lazy" /><b>{item.name.replace("Screen Bridge", "ScreenBridge")}</b><span>{appSubs[i]}</span></button>)}</div>
    <div className="mp-macbook">
      <div className="mp-mac-screen" aria-live="polite">{app.image ? <img src={app.image} alt={app.imageAlt} width="900" height="600" loading="lazy" /> : <div className="mp-ibrain"><img src={app.icon} alt="" width="48" height="48" /><h3>{app.name}</h3><p>{app.tagline}</p><Out href={app.links[0].href}>Explore the source<ArrowUpRight size={14} /></Out></div>}</div>
      <div className="mp-mac-base" aria-hidden="true" />
    </div>
    <p className="mp-mac-caption">{app.name.replace("Screen Bridge", "ScreenBridge")} · {app.image ? "Actual application window" : "Local AI • source available"}</p>
    <Out href={suite} className="mp-button mp-yellow mp-full">Explore All Mac Apps<ArrowRight size={17} /></Out>
    <Pills items={[[Apple,"Swift"],[Sparkles,"SwiftUI"],[Cpu,"macOS APIs"]]} />
    <button className="mp-text-action" onClick={() => onOpen("mac")}>Open source. Built for Apple Silicon.<ArrowUpRight size={14} /></button>
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
    <button className="mp-text-action" onClick={() => onOpen("engineering")}>My engineering notes<ArrowUpRight size={14} /></button>
  </section>;
}

function MobileBarber() {
  const [review, setReview] = useState(0);
  const item = barberReviews[review];
  return <section className="mp-barber" aria-labelledby="mp-barber-title">
    <img className="mp-barber-bg" src={`${A}autobarber-workshop.jpg`} alt="" width="1200" height="900" loading="lazy" />
    <div className="mp-barber-content"><Label n="06" status="Past business">THE AUTO BARBER</Label>
      <h2 id="mp-barber-title">BEFORE I BUILT SOFTWARE,<br />I BUILT A BUSINESS.</h2>
      <p>Automotive restyling. Real customers, real operations, and learning what it takes to deliver work people trust.</p>
      <img className="mp-barber-logo" src={`${A}autobarber-logo.png`} alt="The Auto Barber" width="240" height="240" loading="lazy" />
      <div className="mp-business-facts"><span>Six-figure revenue</span><span>165+ Google reviews</span></div>
      <div className="mp-review"><div className="mp-review-head"><GoogleMark size={25} /><span><b>4.9</b><span className="mp-stars" aria-label="Five stars">★★★★★</span></span></div><blockquote>“{item.quote}{item.excerpt ? "…" : ""}”</blockquote><Out href={item.href}>{item.name}<ArrowUpRight size={13} /></Out><div className="mp-review-controls"><button aria-label="Previous customer review" onClick={() => setReview((review + barberReviews.length - 1) % barberReviews.length)}><ChevronLeft size={18} /></button><span aria-live="polite">{review + 1} / {barberReviews.length}</span><button aria-label="Next customer review" onClick={() => setReview((review + 1) % barberReviews.length)}><ChevronRight size={18} /></button></div></div>
      <Out href={googleReviewsUrl} className="mp-button mp-yellow mp-full">See all Google reviews<ArrowUpRight size={16} /></Out>
      <span className="mp-small-note">The full story is coming. I’m writing it next.</span>
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
  return <section className="mp-section mp-opportunities"><Label n="08">WHAT I’M LOOKING FOR</Label><h3>I’m looking for a<br /><em>junior developer role.</em></h3><p>I’m looking for a small, ambitious team where I can work close to the product and customers, build quickly, learn from experienced engineers, and take ownership of real problems.</p><div className="mp-role-cards">{[[Code2,"Junior developer","Real products. Real problems."],[Globe2,"Fully remote","Worldwide. English & Español."],[GraduationCap,"Open to learn & grow","With experienced engineers."],[UsersRound,"What I bring","Product thinking and execution."]].map(([Icon,title,text]) => <div key={title}><Icon size={21} aria-hidden="true" /><b>{title}</b><span>{text}</span></div>)}</div></section>;
}

function MobileContact() {
  return <section id="contact" className="mp-section mp-contact"><Label n="09">LET’S TALK</Label><h3>You’ve seen the receipts.<br /><em>Let’s talk.</em></h3><ArrowNote>Real projects.<br />Real progress.<br />Let’s build<br />what’s next.</ArrowNote><Out href={`${email}?subject=Let%E2%80%99s%20book%20a%20call`} className="mp-button mp-yellow mp-full">Book a Call<ArrowRight size={18} /></Out><p className="mp-call-note">Email me to arrange a time.</p><div className="mp-contact-actions"><Out href={email}><Mail size={18} />Email Me<ArrowUpRight size={13} /></Out><Out href={linkedin}><Linkedin size={18} />LinkedIn<ArrowUpRight size={13} /></Out><Out href={github}><Github size={18} />GitHub<ArrowUpRight size={13} /></Out><Out href={whatsapp}><WhatsAppIcon size={19} />WhatsApp<ArrowUpRight size={13} /></Out></div></section>;
}
function MobileFooter() {
  const { reduced, systemReduced, toggle } = useMotionControls();
  return <footer className="mp-footer"><FooterQuote /><a href="#home" className="mp-signature">Hikari Brandan</a><p className="mp-footer-roots">SEATTLE ROOTS. ARGENTINA BASE.</p><div className="mp-socials"><Out href={linkedin} aria-label="LinkedIn"><Linkedin /></Out><Out href={github} aria-label="GitHub"><Github /></Out><Out href={resume} aria-label="View résumé"><FileText /></Out><Out href={whatsapp} aria-label="WhatsApp"><WhatsAppIcon size={24} /></Out></div><LanguageFlags /><p className="mp-copyright">© {new Date().getFullYear()} HIKARI BRANDAN<br />BUILT TO SOLVE REAL PROBLEMS.</p><button className="mp-motion-toggle" aria-pressed={reduced} disabled={systemReduced} onClick={toggle}>{systemReduced ? "Reduced motion · system preference" : `Motion ${reduced ? "off" : "on"}`}<span /></button></footer>;
}

export default function MobilePortfolio({ onOpen }) {
  const root = useRef(null);
  const [active, setActive] = useState("home");
  const [compact, setCompact] = useState(false);
  const reduce = useMotionPreference();
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
    <header className={`mp-header ${compact ? "mp-compact" : ""}`}><a href="#home" className="mp-mark" aria-label="Hikari Brandan, home">HB</a><a href="#contact" className="mp-header-cta">Let’s talk<ArrowUpRight size={16} /></a></header>
    <main className="mp-paper">
      <section id="home" className="mp-intro" aria-labelledby="mp-intro-title"><span className="mp-available"><span />Open to opportunities</span><h1 id="mp-intro-title">Let’s build<br />something<br /><em>meaningful.</em></h1><p>I’m always open to new opportunities, collaborations and interesting problems to solve. Whether it’s a product, a role, or just an idea — let’s talk.</p><div className="mp-identity"><div><span className="mp-identity-icon"><Globe2 size={28} /></span><span><b>Fully remote</b><span>Worldwide</span></span></div><div><span className="mp-identity-icon"><MessageSquare size={27} /></span><span><b>Native languages</b><LanguageFlags /></span></div></div><div className="mp-globe"><GlobeJourney /></div><div className="mp-message-card"><span>SEND A MESSAGE</span><h3>Let’s start<br />a conversation.</h3><p>Tell me a bit about what you have in mind and I’ll get back to you soon.</p><a href="#contact" className="mp-button mp-black mp-full"><Send size={20} />Send to Hikari<ArrowUpRight size={16} /></a></div></section>
      <MobileUGC onOpen={onOpen} /><MobileMenuTap onOpen={onOpen} /><MobileFoodSpot onOpen={onOpen} /><MobileMac onOpen={onOpen} /><MobileProcess onOpen={onOpen} /><MobileBarber /><MobileStack /><MobileOpportunities /><MobileContact /><MobileFooter />
    </main>
    <nav className="mp-bottom-nav" aria-label="Mobile navigation">{[[Home,"home","Home"],[BriefcaseBusiness,"projects","Projects"],[UserRound,"about","About"]].map(([Icon,id,label]) => <a href={`#${id}`} key={id} aria-current={active === id ? "location" : undefined} className={active === id ? "mp-active" : ""}><Icon size={22} aria-hidden="true" /><span>{label}</span></a>)}<Out href={resume}><FileText size={22} aria-hidden="true" /><span>Résumé</span></Out></nav>
  </div>;
}
