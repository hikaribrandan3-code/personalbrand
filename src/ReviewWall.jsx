import { LocalizedText, localizedText } from "./i18n";
import { ArrowUpRight } from "lucide-react";

import { barberReviews } from "./reviewData";
import GoogleMark from "./GoogleMark";

export default function ReviewWall() {
  return (
    <div className="review-wall" aria-label={localizedText("Sourced customer reviews")}>
      <div className="review-wall-caption">
        <span><LocalizedText>REAL CUSTOMERS. REAL WORDS.</LocalizedText></span>
        <small><LocalizedText>Selected customer excerpts · 165 reviews on Google</LocalizedText></small>
      </div>
      <div className="review-track">
        <div className="review-track-inner">
          {[0, 1].map((copy) => (
            <div
              className="review-track-group"
              key={copy}
              aria-hidden={copy ? true : undefined}
            >
              {barberReviews.map((r) => (
                <article key={r.name}>
                  <header className="google-review-header">
                    <span className="review-avatar" aria-hidden="true">{r.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}</span>
                    <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={copy ? -1 : undefined}
                  >
                    <strong><LocalizedText>{r.name}</LocalizedText></strong><small><LocalizedText>Google review</LocalizedText></small>
                    </a>
                    <GoogleMark size={20} />
                  </header>
                  {r.rating && <span className="google-review-stars" aria-label={`${r.rating} out of 5 stars`}>★★★★★</span>}
                  <blockquote>“{r.quote}{r.excerpt ? "…" : ""}”</blockquote>
                  <a className="google-review-read" href={r.href} target="_blank" rel="noopener noreferrer" tabIndex={copy ? -1 : undefined}><LocalizedText>Read on Google</LocalizedText> <ArrowUpRight size={12} /></a>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
