import { useEffect, useRef, useState } from "react";
import { useMotionPreference } from "./motion-preferences";

export function DeferredBackground({ className }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("media-ready");
        observer.disconnect();
      }
    }, { rootMargin: "600px" });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`${className} deferred-background`} aria-hidden="true" />;
}

export function DesktopReceiptVideo() {
  const reduce = useMotionPreference();
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const video = ref.current;
    const near = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReady(true); near.disconnect(); }
    }, { rootMargin: "600px" });
    near.observe(video);
    let visible = false;
    const sync = () => {
      if (visible && ready && !reduce && !document.hidden) video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .1 });
    observer.observe(video);
    video.addEventListener("loadeddata", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      near.disconnect(); observer.disconnect(); video.pause();
      video.removeEventListener("loadeddata", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ready, reduce]);
  return <video ref={ref} className="foodspot-real-screen"
    src={ready ? "/assets/foodspot/ugc-receipt-mobile.mp4" : undefined}
    poster={ready ? "/assets/foodspot/receipt-mobile.jpg" : undefined}
    width="390" height="832" muted loop playsInline controls={reduce} preload="none"
    aria-hidden={!ready || undefined}
    aria-label="Delivered receipt and animated customer photo invitation" />;
}
