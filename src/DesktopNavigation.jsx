import { LanguageSwitcher, LocalizedText, localizedHref, localizedText, useLanguage } from "./i18n";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useMotionPreference } from "./motion-preferences";

export default function DesktopNavigation() {
  const reduced = useMotionPreference();
  const { locale } = useLanguage();
  const [state, setState] = useState({ compact: false, hidden: false, active: "home", project: null, total: 0 });
  const previous = useRef("");
  useEffect(() => {
    let frame = 0;
    const desktop = window.matchMedia("(min-width: 1024px)");
    let lastY = window.scrollY, direction = 0, travel = 0, hidden = false;
    // FoodSpot's two chapters are one project; the other entries follow DOM order.
    const projects = [...document.querySelectorAll("main > .project-section:not(.foodspot-differentiator), main > .mac-section")];
    const measure = () => {
      frame = 0;
      if (!desktop.matches) return;
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - lastY;
      lastY = currentY;
      if (currentY <= 48) { hidden = false; direction = 0; travel = 0; }
      else if (Math.abs(delta) >= 1) {
        const nextDirection = Math.sign(delta);
        travel = nextDirection === direction ? travel + Math.abs(delta) : Math.abs(delta);
        direction = nextDirection;
        if (direction > 0 && currentY > 80 && travel >= 24) hidden = true;
        if (direction < 0 && travel >= 16) hidden = false;
      }
      const height = window.innerHeight;
      let best = 0, index = null;
      projects.forEach((element, i) => {
        const bounds = element.getBoundingClientRect();
        const continuation = element.id === "foodspot" ? document.getElementById("foodspot-receipt") : null;
        const bottom = continuation ? continuation.getBoundingClientRect().bottom : bounds.bottom;
        const visible = Math.max(0, Math.min(bottom, height * .8) - Math.max(bounds.top, 100));
        if (visible > best) { best = visible; index = i; }
      });
      const about = document.getElementById("about")?.getBoundingClientRect();
      const contact = document.getElementById("contact")?.getBoundingClientRect();
      const pastProjects = projects[0]?.getBoundingClientRect().top < height * .5;
      const active = about?.top < height * .5 || contact?.top < height * .5 ? "about" : pastProjects ? "projects" : "home";
      const next = { compact: currentY > 130, hidden, active, project: active === "projects" && best > 80 ? index : null, total: projects.length };
      const key = JSON.stringify(next);
      if (key !== previous.current) { previous.current = key; setState(next); }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);
  const duration = reduced ? 0 : .35;
  return <header className={`desktop-navigation ${state.compact ? "is-compact" : ""} ${state.hidden ? "is-hidden" : ""}`} inert={state.hidden ? true : undefined} aria-hidden={state.hidden || undefined}>
    <a className="desktop-signature" href="#home" aria-label={localizedText("Hikari Brandan, back to home")}>
      <span className="desktop-signature-full"><LocalizedText>Hikari Brandan</LocalizedText></span><span className="desktop-signature-short" aria-hidden="true"><LocalizedText>HB</LocalizedText></span>
    </a>
    <nav aria-label={localizedText("Desktop main navigation")}>
      {[ ["home", "Home"], ["projects", "Projects"] ].map(([id, name]) => <a href={`#${id}`} key={id} className={state.active === id ? "selected" : ""} aria-current={state.active === id ? "location" : undefined}>
        {state.active === id && <motion.span className="desktop-active-pill" layoutId="desktop-navigation-pill" transition={{ duration, ease: [.22, 1, .36, 1] }} />}
        <span className="desktop-link-label"><LocalizedText>{name}</LocalizedText></span>
        {id === "projects" && state.project !== null && <span className="desktop-project-counter" aria-label={`Project ${state.project + 1} of ${state.total}`}>
          <span aria-hidden="true">·</span><span className="desktop-counter-mask"><AnimatePresence mode="popLayout" initial={false}><motion.span key={state.project} initial={{ y: reduced ? 0 : 10, opacity: reduced ? 1 : 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: reduced ? 0 : -10, opacity: 0 }} transition={{ duration: reduced ? 0 : .18 }}>{String(state.project + 1).padStart(2, "0")}</motion.span></AnimatePresence></span><span>/{String(state.total).padStart(2, "0")}</span>
        </span>}
      </a>)}
      <a href={localizedHref("/ugc-for-ai-startups", locale)} aria-label={localizedText("UGC videos for AI and software startups")}><LocalizedText>UGC</LocalizedText></a>
      <a href="/Hikari_Brandan_Resume.pdf" target="_blank" rel="noopener noreferrer"><LocalizedText>Résumé</LocalizedText> <ArrowUpRight size={13} /></a>
    </nav>
    <div className="desktop-navigation-actions">
      <LanguageSwitcher />
      <a className="desktop-contact" href="#contact"><LocalizedText>Let’s talk</LocalizedText> <ArrowUpRight size={16} /></a>
    </div>
  </header>;
}
