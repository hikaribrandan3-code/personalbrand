import { ArrowDownRight, ArrowUpRight, Check, Instagram, Play } from "lucide-react";
import { LocalizedText } from "./i18n";
import "./montaj-creator.css";

const footage = [
  { src: "/assets/mobile/menutap-menu-real.jpg", label: "0:12", alt: "Restaurant menu on a phone" },
  { src: "/assets/ugc-sugar-crumb.webp", label: "0:08", alt: "Bakery footage with a product display" },
  { src: "/assets/mobile/menutap-sticker.webp", label: "0:15", alt: "MenuTap table sticker" },
];

const timeline = [
  "/assets/mobile/menutap-menu-real.jpg",
  "/assets/ugc-sugar-crumb.webp",
  "/assets/mobile/menutap-sticker.webp",
  "/assets/ugc-casa-social.webp",
  "/assets/ugc-mangolda.webp",
  "/assets/ugc-donut-house.webp",
  "/assets/ugc-covaccia.webp",
];

function MontajMark() {
  return <span className="mc-mark" aria-hidden="true"><i /><i /><i /></span>;
}

export default function MontajCreatorSection() {
  return (
    <section className="montaj-creator" aria-labelledby="montaj-creator-title">
      <div className="mc-shell">
        <div className="mc-editorial">
          <div className="mc-brand-pill"><MontajMark /><strong>Montaj</strong><span><LocalizedText>CREATOR · AI VIDEO</LocalizedText></span></div>
          <h2 id="montaj-creator-title"><LocalizedText>I make startup content with AI in the</LocalizedText><br /><span className="mc-underlined"><LocalizedText>editing room.</LocalizedText></span></h2>
          <p className="mc-intro"><LocalizedText>I use Montaj to turn product demos, founder footage and raw ideas into short-form content for tech startups.</LocalizedText></p>
          <ul className="mc-benefits">
            {["Startup UGC + product demos", "AI-assisted editing + motion", "English + Spanish content"].map((item) => <li key={item}><span><Check size={17} strokeWidth={2.6} /></span><LocalizedText>{item}</LocalizedText></li>)}
          </ul>
          <div className="mc-note"><span><LocalizedText>Real footage. Real products.</LocalizedText><br /><LocalizedText>Edited with AI.</LocalizedText></span><svg viewBox="0 0 100 50" aria-hidden="true"><path d="M4 8c20 36 57 38 87 8m-25 2 27-12-7 26" /></svg></div>
          <a className="mc-instagram" href="https://www.instagram.com/builtbyhikari.ai/" target="_blank" rel="noreferrer"><Instagram size={24} /><span><LocalizedText>See what I’m making</LocalizedText></span><ArrowUpRight size={21} /></a>
          <p className="mc-topics"><LocalizedText>Demos · Founder stories · Launch content</LocalizedText></p>
        </div>

        <div className="mc-footage" aria-label="Raw footage examples">
          <p className="mc-hand mc-raw-note"><LocalizedText>my footage</LocalizedText><br /><LocalizedText>(raw clips)</LocalizedText></p>
          <svg className="mc-raw-arrow" viewBox="0 0 54 74" aria-hidden="true"><path d="M13 3c8 26 19 42 35 57m-18-3 20 7-1-21" /></svg>
          {footage.map((clip) => <div className="mc-raw-card" key={clip.src}><img src={clip.src} alt={clip.alt} loading="lazy" /><span className="mc-clip-time"><Play size={12} fill="currentColor" />{clip.label}</span></div>)}
        </div>

        <div className="mc-workflow">
          <div className="mc-prompt"> <p><LocalizedText>make this into a viral reel. add captions, zoom in fast cuts, show the app and games.</LocalizedText></p><span><ArrowUpRight size={24} /></span></div>
          <p className="mc-hand mc-direction"><LocalizedText>I direct it.</LocalizedText><br /><LocalizedText>Montaj speeds up the rest.</LocalizedText></p>
          <svg className="mc-direction-arrow" viewBox="0 0 76 72" aria-hidden="true"><path d="M68 4C56 29 39 49 8 62m23-1L6 65l7-21" /></svg>
          <div className="mc-ui-frame" aria-label="Montaj video editing workspace preview">
            <img src="/assets/desktop/montaj-reference.png" alt="Montaj editing workspace showing video formats and a creator preview" loading="lazy" />
            <span className="mc-private-mask" aria-label="Personal email hidden" />
          </div>
          <div className="mc-final-note mc-hand"><LocalizedText>final cut</LocalizedText><br /><LocalizedText>(short-form ready)</LocalizedText></div>
          <svg className="mc-final-arrow" viewBox="0 0 73 73" aria-hidden="true"><path d="M8 66C7 37 24 18 63 7M47 7l20-3-5 22" /></svg>
          <div className="mc-timeline" aria-label="Final short-form video timeline">
            <div className="mc-timeline-images">{timeline.map((src, i) => <img key={src} src={src} alt="" loading="lazy" style={{ objectPosition: `${40 + (i % 3) * 10}% 50%` }} />)}</div>
            <span className="mc-timecode">0:28</span>
          </div>
        </div>
      </div>
    </section>
  );
}
