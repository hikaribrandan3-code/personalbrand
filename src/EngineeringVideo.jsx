import { useState } from "react";
import { useLanguage } from "./i18n";
import "./engineering-video.css";

const films = [
  ["roofing", "Roofing", "Roofing systems and construction", "Techos", "Sistemas y construcción de techos"],
  ["solar", "Solar", "How a home solar system works", "Energía solar", "Cómo funciona un sistema solar residencial"],
  ["hvac", "HVAC", "A closer look at cooling systems", "Climatización", "Una mirada a los sistemas de refrigeración"],
  ["pool", "Pool construction", "The stages of building a pool", "Construcción de piscinas", "Las etapas de construcción de una piscina"],
  ["brick", "Masonry", "Building a brick wall", "Albañilería", "Construcción de una pared de ladrillos"],
];

function Film({ film, spanish, onPlay }) {
  const [playing, setPlaying] = useState(false);
  const [id, title, description, titleEs, descriptionEs] = film;
  const label = spanish ? titleEs : title;
  return <article className="ev-card">
    <div className="ev-media">{playing ? <video controls autoPlay playsInline preload="none" poster={`/assets/engineering/${id}.jpg`} aria-label={label}><source src={`/assets/engineering/${id}.mp4`} type="video/mp4" /></video> : <button type="button" className="ev-play" onClick={() => { setPlaying(true); onPlay(); }} aria-label={`${spanish ? "Reproducir fragmento de" : "Play excerpt: "} ${label}`}><img src={`/assets/engineering/${id}.jpg`} alt="" loading="lazy" width="360" height="640" /><span aria-hidden="true">▶</span></button>}</div>
    <div className="ev-card-copy"><span>{spanish ? "FRAGMENTO · 3D" : "EXCERPT · 3D"}</span><h3>{label}</h3><p>{spanish ? descriptionEs : description}</p></div>
  </article>;
}
export default function EngineeringVideo() {
  const { locale } = useLanguage();
  const spanish = locale?.startsWith("es");
  const [paused, setPaused] = useState(false);
  return <section id="video-production" className="engineering-video" aria-labelledby="ev-title">
    <div className="ev-inner"><div className="ev-intro"><div><span className="ev-kicker">{spanish ? "MARKETING DE VIDEO CON IA" : "AI VIDEO MARKETING"}</span><h2 id="ev-title">{spanish ? <>MARKETING<br /><em>DE VIDEO CON IA.</em></> : <>AI VIDEO<br /><em>MARKETING.</em></>}</h2><p className="ev-subtitle">{spanish ? "Videos educativos y animaciones 3D." : "Educational videos and 3D animations."}</p></div><div><p>{spanish ? "Creo explicaciones visuales que convierten procesos técnicos en historias claras. Estos fragmentos muestran producciones terminadas de ingeniería y construcción." : ""}</p><p>{spanish ? "Mi trabajo combina Three.js, Remotion, Hyperframes y flujos asistidos por IA para producir animaciones 3D y explicaciones educativas." : "Using Three.js, Remotion, Hyperframe, and AI-assisted workflows to produce 3D animations and educational explainers."}</p><p className="ev-manifesto">{spanish ? "Una alternativa más flexible y rentable a las plataformas tradicionales de video con IA, enfocada en retener a la audiencia." : "A more flexible, cost-effective alternative to traditional AI video platforms, with a focus on viewer retention."}</p><a href="#projects">{spanish ? "Explorar proyectos de software ↑" : "Explore software projects ↑"}</a></div></div>
      <div className="ev-carousel-heading"><span>{spanish ? "TRABAJOS SELECCIONADOS" : "SELECTED WORK"}</span><button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? (spanish ? "Reanudar movimiento" : "Resume motion") : (spanish ? "Pausar movimiento" : "Pause motion")}</button></div><div className={`ev-carousel ${paused ? "is-paused" : ""}`}><div className="ev-track">{[0, 1].map(copy => <div className="ev-group" key={copy}>{films.map(film => <Film key={film[0]} film={film} spanish={spanish} onPlay={() => setPaused(true)} />)}</div>)}</div></div><p className="ev-note">{spanish ? "Fragmentos visuales sin audio de videos más extensos." : "Silent visual excerpts from longer videos."}</p>
    </div>
  </section>;
}
