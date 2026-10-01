import { ArrowUpRight } from "lucide-react";

import { barberReviews } from "./reviewData";

export default function ReviewWall() {
  return (
    <div className="review-wall" aria-label="Sourced customer reviews">
      <div className="review-wall-caption">
        <span>REAL CUSTOMERS. REAL WORDS.</span>
        <small>Two sourced excerpts · 165 reviews on the Google profile</small>
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
                  <span className="tiny-label">GOOGLE REVIEW</span>
                  <blockquote>“{r.quote}”</blockquote>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={copy ? -1 : undefined}
                  >
                    {r.name} <ArrowUpRight size={12} />
                  </a>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
