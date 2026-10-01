import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Folder,
  FileText,
  Mic,
  Monitor,
  Smartphone,
  Sparkles,
  Activity,
  Send,
} from "lucide-react";
import { useMotionPreference } from "./motion-preferences";

function VoiceDemo() {
  const reduce = useMotionPreference();
  const [step, setStep] = useState("ready");
  useEffect(() => {
    const next = { listening: "transcribing", transcribing: "inserted" };
    if (!next[step]) return;
    const timer = setTimeout(
      () => setStep(next[step]),
      reduce ? 400 : step === "listening" ? 1800 : 1300,
    );
    return () => clearTimeout(timer);
  }, [step, reduce]);
  const busy = step === "listening" || step === "transcribing";
  return (
    <div className={`voice-demo demo-${step}`}>
      <div className="demo-summary">
        <img src="/assets/ivoz-icon.png" alt="" />
        <span>
          <strong>Talk. It types.</strong>
          <small>iVoz · local dictation</small>
        </span>
      </div>
      <div className="voice-demo-flow">
        <span className={busy ? "flow-active" : ""}>
          <Mic size={13} /> Speak
        </span>
        <ArrowRight size={11} />
        <span className={step === "transcribing" ? "flow-active" : ""}>
          Transcribe
        </span>
        <ArrowRight size={11} />
        <span className={step === "inserted" ? "flow-active" : ""}>Insert</span>
      </div>
      <div className="voice-input">
        <div className="demo-wave" aria-hidden="true">
          {Array.from({ length: 19 }, (_, i) => (
            <i
              key={i}
              style={{
                "--bar": `${8 + ((i * 7) % 23)}px`,
                "--delay": `${i * -0.09}s`,
              }}
            />
          ))}
        </div>
        <span>
          {step === "listening"
            ? "Listening…"
            : step === "transcribing"
              ? "Turning speech into text…"
              : "“Let’s build something useful.”"}
        </span>
      </div>
      <div className="demo-document">
        <span>
          <FileText size={12} /> A note for the team
        </span>
        <p>
          {step === "inserted"
            ? "Let’s build something useful."
            : "Your words land right here."}
          <i className="demo-caret" aria-hidden="true" />
        </p>
        {step === "inserted" && (
          <small>
            <Check size={11} /> Inserted into your document
          </small>
        )}
      </div>
      <button
        className="demo-button"
        disabled={busy}
        onClick={() => setStep("listening")}
      >
        <Mic size={13} />
        {busy
          ? "Demo in progress"
          : step === "inserted"
            ? "Try it again"
            : "Try the voice demo"}
      </button>
      <small className="simulation-note">
        Simulated flow · no microphone needed
      </small>
      <span className="sr-only" role="status">
        {step === "inserted"
          ? "Demo complete. Let’s build something useful. Inserted into your document."
          : ""}
      </span>
    </div>
  );
}

function OrganizeDemo() {
  const [reviewed, setReviewed] = useState(false);
  return (
    <div className="utility-demo">
      <div className="demo-summary">
        <Folder />
        <span>
          <strong>A little less chaos.</strong>
          <small>iOrganize · review before acting</small>
        </span>
      </div>
      <div className="demo-file-list">
        {["Project brief.pdf", "Camera concept.png", "Meeting notes.txt"].map(
          (name, i) => (
            <div key={name}>
              <FileText size={15} />
              <span>
                {name}
                <small>
                  {reviewed
                    ? [
                        "Documents / Projects",
                        "Pictures / Concepts",
                        "Documents / Notes",
                      ][i]
                    : "Downloads"}
                </small>
              </span>
              {reviewed && <Check size={13} />}
            </div>
          ),
        )}
      </div>
      <button className="demo-button" onClick={() => setReviewed(!reviewed)}>
        {reviewed ? "Reset preview" : "Review suggested folders"}
        <ArrowRight size={12} />
      </button>
      <small className="simulation-note">
        Sample files · your Mac stays yours
      </small>
    </div>
  );
}

function BridgeDemo() {
  const [connected, setConnected] = useState(false);
  return (
    <div className="utility-demo">
      <div className="demo-summary">
        <Monitor />
        <span>
          <strong>Another screen.</strong>
          <small>Screen Bridge · local network</small>
        </span>
      </div>
      <div className={`bridge-demo ${connected ? "is-connected" : ""}`}>
        <span>
          <Monitor size={45} />
          <small>Mac</small>
        </span>
        <i />
        <span>
          <Smartphone size={39} />
          <small>{connected ? "Connected display" : "Your device"}</small>
        </span>
      </div>
      <p className="demo-help">
        {connected
          ? "The sample window now spans both screens."
          : "See how a second device becomes a display."}
      </p>
      <button className="demo-button" onClick={() => setConnected(!connected)}>
        {connected ? "Disconnect preview" : "Connect sample display"}
        <ArrowRight size={12} />
      </button>
      <small className="simulation-note">
        Simulated connection · experimental app
      </small>
    </div>
  );
}

function StatsDemo() {
  const [metric, setMetric] = useState("CPU");
  return (
    <div className="utility-demo">
      <div className="demo-summary">
        <Activity />
        <span>
          <strong>Know your Mac.</strong>
          <small>iStats · useful signal</small>
        </span>
      </div>
      <div className="stats-tabs">
        {["CPU", "Memory", "Network"].map((label) => (
          <button
            key={label}
            aria-pressed={metric === label}
            onClick={() => setMetric(label)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="sample-chart">
        {Array.from({ length: 24 }, (_, i) => (
          <i
            key={`${metric}-${i}`}
            style={{
              height: `${15 + ((i * (metric === "CPU" ? 17 : metric === "Memory" ? 7 : 29)) % 72)}%`,
            }}
          />
        ))}
      </div>
      <div className="metric-summary">
        <strong>
          {metric === "CPU"
            ? "24%"
            : metric === "Memory"
              ? "8.2 GB"
              : "1.8 MB/s"}
        </strong>
        <span>{metric} · sample reading</span>
      </div>
      <small className="simulation-note">
        Illustrative data · no access to your device
      </small>
    </div>
  );
}

function BrainDemo() {
  const [response, setResponse] = useState(false);
  return (
    <div className="utility-demo brain-demo">
      <div className="demo-summary">
        <Sparkles />
        <span>
          <strong>A little room to think.</strong>
          <small>iBrain · local Ollama / optional cloud</small>
        </span>
      </div>
      <div className="sample-chat">
        <p className="chat-user">Help me break an idea into smaller steps.</p>
        {response ? (
          <p className="chat-response">
            Start with one problem.
            <br />
            Build the smallest useful version.
            <br />
            Test it. Learn. Build again.
          </p>
        ) : (
          <p className="chat-placeholder">Your model. Your conversation.</p>
        )}
      </div>
      <button className="demo-button" onClick={() => setResponse(!response)}>
        <Send size={12} />
        {response ? "Reset conversation" : "See a sample conversation"}
      </button>
      <small className="simulation-note">
        Scripted preview · no AI request
      </small>
    </div>
  );
}

export default function MacDemo({ active }) {
  return [
    <VoiceDemo />,
    <OrganizeDemo />,
    <BridgeDemo />,
    <StatsDemo />,
    <BrainDemo />,
  ][active];
}
