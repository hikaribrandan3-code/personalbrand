import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Box,
  Check,
  FileText,
  Github,
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Plane,
  Send,
  Sun,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useMotionPreference } from "./motion-preferences";

const email = "hikaristudioai@gmail.com";
const whatsapp = "https://wa.me/543513668122";
const socials = [
  [
    Linkedin,
    "LinkedIn",
    "https://www.linkedin.com/in/daiske-brandan-726656323/",
  ],
  [Github, "GitHub", "https://github.com/hikaribrandan3-code"],
  [FileText, "View résumé", "/Daiske-Brandan-Resume.pdf"],
];

export function WhatsAppIcon({ size = 22 }) {
  return (
    <svg
      className="whatsapp-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.5 11.8a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m8.8 7.4 1.4 2.6-1.1 1.2c.8 1.6 1.9 2.7 3.6 3.5l1.2-1.2 2.5 1.4c-.2 1.3-1.1 2-2.3 1.9-3.5-.4-6.9-3.8-7.2-7.2-.1-1.2.6-2.1 1.9-2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Flag({ country }) {
  const us = country === "us";
  return (
    <svg
      className="country-flag"
      viewBox="0 0 30 20"
      role="img"
      aria-label={us ? "United States flag" : "Argentina flag"}
    >
      <rect width="30" height="20" rx="2" fill="white" />
      {us ? (
        <>
          {Array.from({ length: 7 }, (_, i) => (
            <rect
              key={i}
              y={i * 3.08}
              width="30"
              height="1.55"
              fill="#bd3346"
            />
          ))}
          <rect width="13" height="10.8" fill="#244572" />
          {Array.from({ length: 20 }, (_, i) => (
            <circle
              key={i}
              cx={1.6 + (i % 5) * 2.35}
              cy={1.6 + Math.floor(i / 5) * 2.5}
              r=".45"
              fill="white"
            />
          ))}
        </>
      ) : (
        <>
          <path d="M0 0h30v6.67H0zM0 13.33h30V20H0z" fill="#79bde8" />
          <circle cx="15" cy="10" r="1.65" fill="#f5b836" />
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={i}
              d="M15 7.2v1"
              stroke="#e5a11f"
              strokeWidth=".6"
              transform={`rotate(${i * 30} 15 10)`}
            />
          ))}
        </>
      )}
    </svg>
  );
}

export function LanguageFlags() {
  return (
    <span className="language-flags">
      <span>
        <Flag country="us" /> English
      </span>
      <span>
        <Flag country="ar" /> Español
      </span>
    </span>
  );
}

export function GlobeJourney() {
  const reduce = useMotionPreference();
  const [flight, setFlight] = useState(0);
  return (
    <div className="globe-journey">
      <div className="globe-shadow" aria-hidden="true" />
      <img
        className="journey-earth"
        src="/assets/journey-globe.webp"
        width="1000"
        height="1000"
        alt="Earth with North and South America facing forward"
        loading="lazy"
      />
      <svg className="journey-clouds" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <clipPath id="earthCloudClip">
            <circle cx="50" cy="49" r="44" />
          </clipPath>
          <filter id="cloudSoftness">
            <feGaussianBlur stdDeviation=".8" />
          </filter>
        </defs>
        <g clipPath="url(#earthCloudClip)">
          <g className="cloud-drift" filter="url(#cloudSoftness)" fill="white">
            <path
              opacity=".32"
              d="M7 47c5-4 6-6 11-6s5-5 9-4c-1 3-5 7-8 8s-8 6-12 2Zm65-15c5-3 9-6 14-4l8 5-4 5c-6-5-9-2-18-6Z"
            />
            <path
              opacity=".3"
              d="M7 57c6-3 10-3 15 0s5 0 9-1l3 3c-3 3-10 4-15 1S12 63 7 62Zm67 8c5-4 14-4 20-1v7c-9-6-12-1-20-2Z"
            />
            <path
              opacity=".43"
              d="M15 79c12-2 17 0 26 6s20 2 31-2l5 3c-14 6-25 9-38 2s-18-5-24-4Z"
            />
            <path
              opacity=".24"
              d="M16 21c4-2 8-3 12-1l-1 3c-6-2-7 1-11 0Zm28 16c5-2 10 0 12 3l-2 2c-2-1-6-3-10-2Z"
            />
          </g>
        </g>
      </svg>
      <svg className="journey-route" viewBox="0 0 100 100" aria-hidden="true">
        <path
          d="M33 23 C40 34 52 36 58 51 S65 68 62 76"
          stroke="#f9fbf3"
          strokeWidth=".5"
          strokeDasharray="1.2 1.15"
          fill="none"
        />
        <circle className="pin-ring" cx="33" cy="23" r="2.2" />
        <circle className="pin-ring" cx="62" cy="76" r="2.2" />
        <g
          key={flight}
          className="route-aircraft"
          transform={reduce ? "translate(58 51) rotate(58)" : undefined}
        >
          {!reduce && (
            <animateMotion
              dur="18s"
              repeatCount="indefinite"
              path="M33 23 C40 34 52 36 58 51 S65 68 62 76"
              rotate="auto"
              keyPoints="0;0;1;1"
              keyTimes="0;.15;.65;1"
              calcMode="linear"
            />
          )}
          <path
            d="m3.5 0-2.8-.65-2-2.4H-2l1.1 2.4-2.1.1-.8-.8h-.7l.4 1.35-.4 1.35h.7l.8-.8 2.1.1L-2 3.05h.7l2-2.4Z"
            fill="#fff"
            stroke="#dae5e7"
            strokeWidth=".12"
          />
        </g>
      </svg>
      <div className="journey-pin seattle-pin">
        <MapPin size={27} fill="white" />
        <span>SEATTLE, WA</span>
      </div>
      <div className="journey-pin cordoba-pin">
        <MapPin size={27} fill="white" />
        <span>CÓRDOBA, AR</span>
      </div>
      <div className="journey-annotation raised-note">
        Raised here.
        <svg viewBox="0 0 60 40" aria-hidden="true">
          <path d="M5 4q3 25 38 26m-7-7 9 7-11 3" />
        </svg>
      </div>
      <div className="journey-annotation building-note">
        <svg viewBox="0 0 60 40" aria-hidden="true">
          <path d="M42 34Q13 33 12 10m-6 7 6-9 6 8" />
        </svg>
        Building from here.
      </div>
      <button
        className="route-replay"
        onClick={() => setFlight((f) => f + 1)}
        aria-label="Replay the flight from Seattle to Córdoba"
      >
        <Plane size={13} /> Seattle → Córdoba
      </button>
    </div>
  );
}

function Postage() {
  return (
    <div className="postage" aria-hidden="true">
      <div className="cancellation">
        <Plane size={32} />
        <svg viewBox="0 0 100 35">
          <path d="M0 8q12-10 25 0t25 0t25 0t25 0M0 16q12-10 25 0t25 0t25 0t25 0M0 24q12-10 25 0t25 0t25 0t25 0" />
        </svg>
      </div>
      <div className="mountain-stamp">
        <div>
          <span>
            HIKARI <b>2026</b>
          </span>
          <svg viewBox="0 0 120 100">
            <defs>
              <linearGradient id="stampSky" x2="0" y2="1">
                <stop stopColor="#b9d7ea" />
                <stop offset="1" stopColor="#e9efdf" />
              </linearGradient>
            </defs>
            <path fill="url(#stampSky)" d="M0 0h120v100H0z" />
            <path fill="#526b7d" d="m0 70 37-46 14 20L76 12l44 58v30H0Z" />
            <path fill="#f3f0e7" d="m62 31 14-19 18 24-12-5-7 7-5-13-8 6Z" />
            <path fill="#708b88" d="m0 80 27-31 25 36L75 51l45 35v14H0Z" />
            <path
              fill="#385f59"
              d="M0 79 16 63l7 22 10-7 17 22H0m70 21 11-26 13 26Z"
            />
            <path fill="#a7c9d7" d="m50 100 13-24 8 24Z" />
          </svg>
          <small>BUILD · LEARN · SHIP</small>
        </div>
      </div>
    </div>
  );
}

function PostcardForm() {
  const [topic, setTopic] = useState("A role");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [draft, setDraft] = useState(false);
  const topics = [
    [BriefcaseBusiness, "A role"],
    [Box, "A product"],
    [UsersRound, "Collaboration"],
    [MoreHorizontal, "Something else"],
  ];
  const body = `Hi Hikari,\n\n${message}\n\n${name}\n${address}\nAbout: ${topic}`;
  const mailto = `mailto:${email}?subject=${encodeURIComponent(`${topic} — ${name || "Let’s talk"}`)}&body=${encodeURIComponent(body)}`;
  const whatsappDraft = `${whatsapp}?text=${encodeURIComponent(body)}`;
  function submit(e) {
    e.preventDefault();
    setDraft(true);
  }
  return (
    <form className="postcard-form" onSubmit={submit}>
      <div className="postcard-header">
        <span className="tiny-label">SEND A MESSAGE</span>
        <h3>
          Let’s start
          <br />a conversation.
        </h3>
        <p>
          Tell me a bit about what you have in mind
          <br />
          and I’ll get back to you soon.
        </p>
        <Postage />
      </div>
      <div className="postcard-fields">
        <label className="postcard-field">
          <UserRound size={19} />
          <span>
            Your name
            <input
              name="name"
              autoComplete="name"
              required
              maxLength={80}
              placeholder="Alex Johnson"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setDraft(false);
              }}
            />
          </span>
        </label>
        <label className="postcard-field">
          <Mail size={19} />
          <span>
            Your email
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="alex@company.com"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setDraft(false);
              }}
            />
          </span>
        </label>
      </div>
      <fieldset className="postcard-topics">
        <legend>What’s this about?</legend>
        <div>
          {topics.map(([Icon, label]) => (
            <label key={label} className={topic === label ? "is-selected" : ""}>
              <input
                type="radio"
                name="topic"
                value={label}
                checked={topic === label}
                onChange={() => {
                  setTopic(label);
                  setDraft(false);
                }}
              />
              <Icon size={17} />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="postcard-message">
        <FileText size={19} />
        <span>
          Your message
          <textarea
            name="message"
            rows={4}
            required
            minLength={10}
            maxLength={500}
            placeholder="Tell me about the project, role, or idea…"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setDraft(false);
            }}
          />
          <small aria-hidden="true">{message.length} / 500</small>
        </span>
      </label>
      <button className="postcard-send" type="submit">
        <Send size={19} /> Prepare email draft <ArrowRight size={18} />
      </button>
      <div className="postcard-delivery">
        <span>
          <i /> I usually reply within 1–2 days.
        </span>
        <a href={whatsappDraft} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={17} /> WhatsApp <ArrowUpRight size={12} />
        </a>
      </div>
      <p className="delivery-note">
        Prepare a draft, then send it from your email app.
      </p>
      {draft && (
        <div className="draft-ready" role="status">
          <Check size={16} />
          <div>
            <strong>Your draft is ready.</strong>
            <p>
              Open it in your email app, or{" "}
              <a href={whatsappDraft} target="_blank" rel="noopener noreferrer">
                continue on WhatsApp
              </a>
              .
            </p>
            <a href={mailto}>
              Open email draft <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      )}
    </form>
  );
}

export default function ContactExperience({ motionToggle }) {
  return (
    <section
      className="closing-section desktop-closing"
      aria-label="Let’s talk"
    >
      <div className="closing-panel wrap">
        <header className="closing-header">
          <span>
            09 <i>/</i> LET’S TALK
          </span>
          <a href="#home">
            Back to top <ArrowUpRight size={14} />
          </a>
        </header>
        <div className="closing-content">
          <div className="closing-intro">
            <span className="open-badge">
              <i /> Open to opportunities
            </span>
            <h2>
              Let’s build
              <br />
              something
              <br />
              <em>meaningful.</em>
            </h2>
            <p>
              I’m always open to new opportunities, collaborations and
              interesting problems to solve. Whether it’s a product, a role, or
              just an idea — let’s talk.
            </p>
            <div className="closing-facts">
              <div>
                <span className="closing-fact-icon">
                  <Globe2 />
                </span>
                <span>
                  <strong>Fully remote</strong>
                  <small>Worldwide</small>
                </span>
              </div>
              <div>
                <span className="closing-fact-icon">
                  <MessageSquare />
                </span>
                <span>
                  <strong>Native languages</strong>
                  <LanguageFlags />
                </span>
              </div>
              <div>
                <span className="closing-fact-icon">
                  <Sun />
                </span>
                <span>
                  <strong>Open to</strong>
                  <small>Opportunities</small>
                </span>
              </div>
            </div>
          </div>
          <GlobeJourney />
          <PostcardForm />
        </div>
        <footer className="closing-footer">
          <div className="closing-signature">
            <a href="#home">Hikari Brandan</a>
            <small>SEATTLE ROOTS. ARGENTINA BASE. WORLDWIDE MINDSET.</small>
          </div>
          <div className="closing-actions">
            {socials.map(([Icon, label, href]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                aria-label={label}
                title={label}
              >
                <Icon size={21} />
              </a>
            ))}
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Hikari on WhatsApp"
              title="WhatsApp"
            >
              <WhatsAppIcon />
            </a>
          </div>
          <div className="closing-copyright">
            © 2026 HIKARI BRANDAN
            <br />
            BUILT TO SOLVE REAL PROBLEMS.
          </div>
        </footer>
        <div className="closing-bottom">
          <LanguageFlags />
          {motionToggle}
        </div>
      </div>
    </section>
  );
}
