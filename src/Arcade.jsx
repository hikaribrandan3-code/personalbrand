import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Gamepad2,
  MapPin,
  Utensils,
  Wifi,
  Star,
  Instagram,
  ChevronRight,
  Trophy,
} from "lucide-react";

function SnackGame({ onBack }) {
  const [mode, setMode] = useState("ready");
  const [time, setTime] = useState(20);
  const [score, setScore] = useState(0);
  const [cell, setCell] = useState(4);
  const snack = useRef(null);
  const running = mode === "playing" && time > 0;

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      if (!document.hidden) setTime((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [running]);

  function start() {
    setTime(20);
    setScore(0);
    setCell(4);
    setMode("playing");
    requestAnimationFrame(() => snack.current?.focus());
  }
  function catchSnack() {
    if (mode !== "playing" || time === 0) return;
    setScore((s) => s + 1);
    // Move to a different slot while keeping the same focused button.
    setCell((c) => (c + 1 + Math.floor(Math.random() * 8)) % 9);
  }
  const ended = time === 0;
  return (
    <div className="snack-game">
      <button className="game-back" onClick={onBack}>
        <ArrowLeft size={12} /> Back to table
      </button>
      <span className="game-eyebrow">THE TABLE ARCADE</span>
      <h3>Snack break.</h3>
      <p>Catch a little joy while you wait.</p>
      <div className="game-score">
        <span>
          <Trophy size={13} /> {score} snacks
        </span>
        <span>{time}s</span>
      </div>
      <div className="snack-board">
        {Array.from({ length: 9 }, (_, i) => (
          <i key={i} aria-hidden="true" />
        ))}
        {mode === "playing" && !ended ? (
          <button
            ref={snack}
            className="snack-target"
            onClick={catchSnack}
            aria-label="Catch the snack"
            style={{ "--col": cell % 3, "--row": Math.floor(cell / 3) }}
          >
            <span aria-hidden="true">🍔</span>
          </button>
        ) : (
          <div className="game-overlay">
            <Gamepad2 size={27} />
            <strong>
              {ended
                ? `${score} little wins.`
                : mode === "paused"
                  ? "Take your time."
                  : "20 seconds. One tiny game."}
            </strong>
            <span>
              {ended
                ? "A better table, one tap at a time."
                : mode === "paused"
                  ? "Your snack break is paused."
                  : "Tap the burger. Space or Enter works too."}
            </span>
            <button
              onClick={
                mode === "paused" && !ended
                  ? () => {
                      setMode("playing");
                      requestAnimationFrame(() => snack.current?.focus());
                    }
                  : start
              }
            >
              {ended
                ? "Play again"
                : mode === "paused"
                  ? "Resume"
                  : "Let’s play"}{" "}
              <ArrowUpRight size={12} />
            </button>
          </div>
        )}
      </div>
      {mode === "playing" && !ended && (
        <button className="game-pause" onClick={() => setMode("paused")}>
          Pause game
        </button>
      )}
      <span className="game-end-status" role="status">
        {ended ? `Round complete. ${score} snacks caught.` : ""}
      </span>
      <small className="game-preview-label">Interactive portfolio demo</small>
    </div>
  );
}

export function Joystick({ onPlay, active }) {
  return (
    <button
      className={`arcade-stick ${active ? "is-playing" : ""}`}
      onClick={onPlay}
      aria-label="Play the MenuTap mini arcade game"
    >
      <span className="arcade-label">MENUTAP / PLAY</span>
      <span className="arcade-base" aria-hidden="true">
        <span className="stick-socket">
          <span className="stick-shaft">
            <span className="stick-ball" />
          </span>
        </span>
        <span className="arcade-button arcade-button-a" />
        <span className="arcade-button arcade-button-b" />
        <span className="arcade-screw screw-one" />
        <span className="arcade-screw screw-two" />
      </span>
      <span className="arcade-hint">A tiny game. A real interaction.</span>
    </button>
  );
}

export function MenuTapDemo({ playing, onPlay, onBack, menuUrl }) {
  if (playing) return <SnackGame onBack={onBack} />;
  const actions = [
    [Utensils, "View Our Menu", "Food, drinks & more", "#ff8c36"],
    [Wifi, "Connect to Wi-Fi", "Stay connected", "#159dff"],
    [Star, "Review us on Google", "A little love goes a long way", "#c19200"],
    [Gamepad2, "Play a Game", "A 20-second snack break", "#994cff"],
    [Instagram, "Follow Us", "Keep in touch", "#ec4b82"],
  ];
  return (
    <>
      <div className="restaurant-brand">
        <MapPin size={21} />
        <strong>
          FOOD<span>SPOT</span>
        </strong>
        <small>RESTAURANTE & BAR</small>
      </div>
      <div className="menu-welcome">Make yourself at home.</div>
      <div className="menu-actions">
        {actions.map(([Icon, title, sub, color], i) => {
          const content = (
            <>
              <span
                className="menu-action-icon"
                style={{ color, background: `${color}14` }}
              >
                <Icon size={22} />
              </span>
              <span>
                <strong>{title}</strong>
                <small>{sub}</small>
              </span>
              {(i === 0 || i === 3) && <ChevronRight size={14} />}
            </>
          );
          if (i === 3)
            return (
              <button
                key={title}
                className="menu-action game-entry"
                onClick={onPlay}
              >
                {content}
              </button>
            );
          if (i === 0)
            return (
              <a
                key={title}
                className="menu-action"
                href={menuUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            );
          return (
            <div key={title} className="menu-action menu-action-preview">
              {content}
            </div>
          );
        })}
      </div>
      <span className="powered-by">a little tap. a better table.</span>
    </>
  );
}
