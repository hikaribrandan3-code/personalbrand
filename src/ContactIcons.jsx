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

