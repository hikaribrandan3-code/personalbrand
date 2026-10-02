import { useEffect, useRef, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useMotionPreference } from "./motion-preferences";

const desktopMoments = [
  { image: "desktop/ugc-salad-spot.webp", location: "SALAD SPOT", locationLabel: "Salad Spot", alt: "Fresh composed salad at Salad Spot, shown in the branded camera", mode: "Tap & Snap" },
  { image: "ugc-nail-room.webp", location: "NAIL ROOM", alt: "Nail salon moment from the Tap & Snap carousel", mode: "Tap & Snap" },
  { image: "ugc-casa-social.webp", location: "CASA SOCIAL", alt: "Friends dining together from the Tap & Snap carousel", mode: "Tap & Snap" },
  { image: "ugc-covaccia.webp", location: "COVACCIA PIZZA", alt: "Pizza delivery moment from the Scan & Snap carousel", mode: "Scan & Snap" },
  { image: "ugc-mangolda.webp", location: "MANGOLDA", alt: "Fruit drink moment from the Scan & Snap carousel", mode: "Scan & Snap" },
  { image: "ugc-donut-house.webp", location: "DONUT HOUSE · BALI", alt: "Donut delivery moment from the Scan & Snap carousel", mode: "Scan & Snap" },
];
const mobileMoments = [
  { image: "ugc-sugar-crumb.webp", location: "SUGAR & CRUMB", locationLabel: "Sugar & Crumb", alt: "Cupcake café moment from the Tap & Snap carousel", mode: "Tap & Snap" },
  ...desktopMoments.slice(1),
];

export default function UgcCameraPreview({ demoUrl }) {
  const reduce = useMotionPreference();
  const ref = useRef(null);
  const [isDesktop, setIsDesktop] = useState(() => typeof window === "undefined" || window.matchMedia("(min-width: 1001px)").matches);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [captured, setCaptured] = useState(0);
  const moments = isDesktop ? desktopMoments : mobileMoments;
  const momentCount = moments.length;
  const moment = moments[index];
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1001px)");
    const update = () => { setIsDesktop(media.matches); setIndex(0); };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (reduce || paused || !visible) return;
    const timer = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % momentCount);
    }, 6000);
    return () => clearInterval(timer);
  }, [momentCount, reduce, paused, visible]);
  function change(next) { setIndex((next + moments.length) % moments.length); setCaptured(0); }
  return <div className="ugc-camera-preview" ref={ref}
    onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
    onFocus={() => setPaused(true)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}>
    <div className="camera-view ugc-photo-view">
      {moments.map((item, i) => <img key={item.image} src={i === index || (visible && (i === (index + 1) % momentCount || i === (index + momentCount - 1) % momentCount)) ? `/assets/${item.image}` : undefined} alt={i === index ? item.alt : ""} aria-hidden={i !== index} className={i === index ? "is-current" : ""} width="600" height="862" loading="lazy" decoding="async" />)}
      <span className="ugc-preview-mode">{moment.mode} / BRANDED CAMERA</span>
      <span className="location-tag" aria-label={`${moment.locationLabel || moment.location} location tag`}><MapPin size={14} aria-hidden="true" />{moment.locationLabel || moment.location}</span>
      <span className="viewfinder corner-tl" /><span className="viewfinder corner-tr" />
      <span className="viewfinder corner-bl" /><span className="viewfinder corner-br" />
      <div className="camera-caption">YOUR MOMENT.<br /><strong>YOUR BRAND GOES WITH IT.</strong></div>
      {captured > 0 && <span key={captured} className="ugc-capture-flash" aria-hidden="true" />}
      <div className="ugc-photo-pagination">
        <button onClick={() => change(index - 1)} aria-label="Previous UGC photo"><ChevronLeft size={12} /></button>
        <span>{index + 1} / {moments.length}</span>
        <button onClick={() => change(index + 1)} aria-label="Next UGC photo"><ChevronRight size={12} /></button>
      </div>
    </div>
    <div className="camera-controls">
      <div className="ugc-mode-tabs" aria-label="Choose a UGC Camera product">
        {["Tap & Snap", "Scan & Snap"].map((mode, i) => <button key={mode} aria-pressed={moment.mode === mode} onClick={() => change(i * 3)}>{mode}</button>)}
      </div>
      <div className="capture-row">
        <span className="thumbnail"><img src={`/assets/${moment.image}`} alt="" width="32" height="32" loading="lazy" decoding="async" /></span>
        <button className="shutter" onClick={() => { setCaptured((c) => c + 1); setPaused(true); }} aria-label="Preview a branded photo capture"><span /></button>
        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="camera-demo-icon" aria-label="Open the real UGC Camera demo"><Camera size={21} /></a>
      </div>
      <div className="capture-feedback" aria-live="polite">{captured ? `Captured with ${moment.location}.` : isDesktop ? "Your brand stays with the photo." : "The location tag stays with the photo."}</div>
    </div>
    <span className="sr-only">Illustrative businesses from the UGC Camera product carousels.</span>
  </div>;
}
