import { useEffect, useRef } from "react";
import { ArrowUpRight, Smartphone, X } from "lucide-react";

export default function CameraHandoff({ onClose, url }) {
  const dialog = useRef(null);
  useEffect(() => {
    const opener = document.activeElement;
    const el = dialog.current;
    el.showModal();
    return () => {
      el.close();
      opener?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="camera-handoff"
      aria-labelledby="camera-handoff-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialog.current) {
          const r = dialog.current.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <button
        className="handoff-close"
        aria-label="Close phone handoff"
        onClick={onClose}
      >
        <X size={19} />
      </button>
      <Smartphone size={24} />
      <span className="tiny-label">TAP / SCAN → CAMERA → PHOTO → SHARE</span>
      <h2 id="camera-handoff-title">Take it for a spin.</h2>
      <p>
        Scan with your phone to try the actual branded camera. No account or app
        installation needed.
      </p>
      <img
        src="/assets/ugc-demo-qr.svg"
        width="180"
        height="180"
        alt="QR code linking to the live UGC Camera demo"
      />
      <a href={url} target="_blank" rel="noopener noreferrer">
        Or open on this device <ArrowUpRight size={14} />
      </a>
      <small>Camera permission is requested by the live demo.</small>
    </dialog>
  );
}
