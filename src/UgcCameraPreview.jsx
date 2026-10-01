import { useEffect, useRef, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useMotionPreference } from "./motion-preferences";

const moments = [
  { image: "ugc-sugar-crumb.webp", location: "SUGAR & CRUMB", alt: "Cupcake café moment from the Tap & Snap carousel", mode: "Tap & Snap" },
  { image: "ugc-nail-room.webp", location: "NAIL ROOM", alt: "Nail salon moment from the Tap & Snap carousel", mode: "Tap & Snap" },
  { image: "ugc-casa-social.webp", location: "CASA SOCIAL", alt: "Friends dining together from the Tap & Snap carousel", mode: "Tap & Snap" },
  { image: "ugc-covaccia.webp", location: "COVACCIA PIZZA", alt: "Pizza delivery moment from the Scan & Snap carousel", mode: "Scan & Snap" },
  { image: "ugc-mangolda.webp", location: "MANGOLDA", alt: "Fruit drink moment from the Scan & Snap carousel", mode: "Scan & Snap" },
  { image: "ugc-donut-house.webp", location: "DONUT HOUSE · BALI", alt: "Donut delivery moment from the Scan & Snap carousel", mode: "Scan & Snap" },
];

export default function UgcCameraPreview({ demoUrl }) {
  const reduce = useMotionPreference();
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [captured, setCaptured] = useState(0);
  const moment = moments[index];
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (reduce || paused || !visible) return;
    const timer = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % moments.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reduce, paused, visible]);
  function change(next) { setIndex((next + moments.length) % moments.length); setCaptured(0); }
  return <div className="ugc-camera-preview" ref={ref}
    onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
    onFocus={() => setPaused(true)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}>
    <div className="camera-view ugc-photo-view">
      {moments.map((item, i) => <img key={item.image} src={`/assets/${item.image}`} alt={i === index ? item.alt : ""} aria-hidden={i !== index} className={i === index ? "is-current" : ""} width="600" height="862" loading="lazy" />)}
      <span className="ugc-preview-mode">{moment.mode} / BRANDED CAMERA</span>
      <span className="location-tag"><MapPin size={12} />{moment.location}</span>
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
        <span className="thumbnail"><img src={`/assets/${moment.image}`} alt="" /></span>
        <button className="shutter" onClick={() => { setCaptured((c) => c + 1); setPaused(true); }} aria-label="Preview a branded photo capture"><span /></button>
        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="camera-demo-icon" aria-label="Open the real UGC Camera demo"><Camera size={21} /></a>
      </div>
      <div className="capture-feedback" aria-live="polite">{captured ? `Captured with ${moment.location}.` : "The location tag stays with the photo."}</div>
    </div>
    <span className="sr-only">Illustrative businesses from the UGC Camera product carousels.</span>
  </div>;
}
