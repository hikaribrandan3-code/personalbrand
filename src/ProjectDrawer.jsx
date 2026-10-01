import { useMotionPreference } from "./motion-preferences";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Download, Github, Smartphone, X } from "lucide-react";
import { projectData } from "./projectData";
import "./drawer.css";

function ProjectLinks({ links = [] }) {
  return links.length > 0 ? (
    <div className="pd-links">
      {links.map((link) => {
        const Icon =
          link.kind === "github"
            ? Github
            : link.kind === "download"
              ? Download
              : ArrowUpRight;
        return (
          <a
            className={`pd-link ${link.kind === "demo" ? "pd-link-primary" : ""}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            key={link.href}
          >
            {link.label}
            <Icon size={16} aria-hidden="true" />
          </a>
        );
      })}
    </div>
  ) : null;
}

function Stack({ items }) {
  return (
    <ul className="pd-stack" aria-label="Tools and technologies">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function AppExplorer({ apps, reducedMotion }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef([]);
  const baseId = useId();
  const app = apps[selectedIndex];

  function onTabKeyDown(event, index) {
    let next;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % apps.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index + apps.length - 1) % apps.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = apps.length - 1;
    else return;
    event.preventDefault();
    setSelectedIndex(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="pd-app-explorer" aria-labelledby={`${baseId}-heading`}>
      <div className="pd-section-kicker">THE COLLECTION / OPEN THE DETAILS</div>
      <h3 id={`${baseId}-heading`}>Five apps. Five different questions.</h3>
      <div className="pd-tabs" role="tablist" aria-label="Mac applications">
        {apps.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            id={`${baseId}-tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={index === selectedIndex}
            aria-controls={`${baseId}-panel-${item.id}`}
            tabIndex={index === selectedIndex ? 0 : -1}
            onClick={() => setSelectedIndex(index)}
            onKeyDown={(event) => onTabKeyDown(event, index)}
          >
            <img src={item.icon} alt="" width="30" height="30" />
            {item.name}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          className="pd-app-panel"
          key={app.id}
          id={`${baseId}-panel-${app.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${app.id}`}
          tabIndex={0}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.16 }}
        >
          <div className="pd-app-title">
            <span>{app.eyebrow}</span>
            <h4>{app.tagline}</h4>
            <p>{app.description}</p>
          </div>
          {app.image ? (
            <figure className="pd-app-figure">
              <img src={app.image} alt={app.imageAlt} loading="lazy" />
              <figcaption>{app.imageCaption}</figcaption>
            </figure>
          ) : (
            <div className="pd-app-identity">
              <img src={app.icon} alt="" width="70" height="70" />
              <span>iBrain</span>
              <p>Local Ollama chat + optional cloud providers</p>
            </div>
          )}
          <div className="pd-app-notes">
            <div>
              <h5>Decisions</h5>
              <ul>
                {app.decisions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h5>What I learned</h5>
              <p>{app.learned}</p>
            </div>
            <div className="pd-app-boundaries">
              <h5>Known limitations</h5>
              <ul>
                {app.limitations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <span className="pd-requirements">{app.requirements}</span>
            </div>
          </div>
          <h5 className="pd-stack-label">Stack</h5>
          <Stack items={app.stack} />
          <ProjectLinks links={app.links} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default function ProjectDrawer({ project, onClose }) {
  const details =
    projectData[typeof project === "string" ? project : project?.slug];
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const reducedMotion = useMotionPreference();
  const id = useId();
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!details) return undefined;
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0)
      body.style.paddingRight = `${parseFloat(window.getComputedStyle(body).paddingRight) + scrollbarWidth}px`;
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });

    function onKeyDown(event) {
      if (event.key !== "Tab") return;
      const focusable = [
        ...dialog.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ].filter(
        (node) => node.getClientRects().length > 0 && !node.closest("[inert]"),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first) {
        event.preventDefault();
        dialog.focus();
      } else if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === dialog)
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    dialog.addEventListener("keydown", onKeyDown);
    return () => {
      dialog.removeEventListener("keydown", onKeyDown);
      if (dialog.open) dialog.close();
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      if (
        previouslyFocused instanceof HTMLElement &&
        previouslyFocused.isConnected
      )
        previouslyFocused.focus({ preventScroll: true });
    };
  }, [details]);

  if (!details) return null;

  function closeOnBackdrop(event) {
    if (event.target !== dialogRef.current) return;
    const rect = dialogRef.current.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      onCloseRef.current?.();
  }

  return createPortal(
    <motion.dialog
      ref={dialogRef}
      className="pd-dialog"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-intro`}
      onCancel={(event) => {
        event.preventDefault();
        onCloseRef.current?.();
      }}
      onClick={closeOnBackdrop}
      initial={{
        opacity: 0,
        y: reducedMotion ? 0 : 20,
        scale: reducedMotion ? 1 : 0.985,
      }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
      transition={{
        duration: reducedMotion ? 0 : 0.23,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="pd-shell">
        <div className="pd-toolbar">
          <span>DAISKE / THE WORK BEHIND THE WORK</span>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            aria-label="Close project details"
            onClick={() => onCloseRef.current?.()}
          >
            <span>Close</span>
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <header className="pd-header">
          <div className="pd-meta">
            <span>{details.label}</span>
            <span className="pd-status">{details.status}</span>
          </div>
          <h2 id={`${id}-title`}>{details.title}</h2>
          <p id={`${id}-intro`}>{details.intro}</p>
          <ProjectLinks links={details.links} />
          {details.mobileRecommended && (
            <p className="pd-mobile-note">
              <Smartphone size={15} aria-hidden="true" />
              Best experienced on your phone.
            </p>
          )}
        </header>
        {details.process && (
          <ol className="pd-process" aria-label="My development workflow">
            {details.process.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
        )}
        <div className="pd-body">
          {details.sections.map((section, index) => (
            <section className="pd-section" key={section.title}>
              <div className="pd-section-label">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{section.title}</h3>
              </div>
              <div className="pd-section-copy">
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items && (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
          <section className="pd-section pd-section-stack">
            <div className="pd-section-label">
              <span>05</span>
              <h3>{project === "engineering" ? "Workflow tools" : "Stack"}</h3>
            </div>
            <div className="pd-section-copy">
              <Stack items={details.stack} />
            </div>
          </section>
          {details.apps && (
            <AppExplorer apps={details.apps} reducedMotion={reducedMotion} />
          )}
        </div>
        <footer className="pd-footer">
          <span>GOOD PRODUCTS START WITH GOOD QUESTIONS.</span>
          <a href="mailto:hikaristudioai@gmail.com">
            Let’s talk about yours
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </footer>
      </div>
    </motion.dialog>,
    document.body,
  );
}
