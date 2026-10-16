import { LocalizedText, localizedText } from "./i18n";
import { useEffect, useRef, useState } from "react";
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
  const [step, setStep] = useState("ready");
  const [level, setLevel] = useState(0);
  const resources = useRef({});
  const generation = useRef(0);
  const mounted = useRef(true);
  function release() {
    const current = resources.current;
    current.stream?.getTracks().forEach((track) => track.stop());
    if (current.frame) cancelAnimationFrame(current.frame);
    if (current.timer) clearTimeout(current.timer);
    current.context?.close().catch(() => {});
    resources.current = {};
  }
  useEffect(() => {
    mounted.current = true;
    const token = generation;
    function hidden() {
      if (document.hidden) { generation.current++; release(); setStep((s) => s === "listening" || s === "requesting" ? "ready" : s); setLevel(0); }
    }
    document.addEventListener("visibilitychange", hidden);
    return () => { mounted.current = false; token.current++; release(); document.removeEventListener("visibilitychange", hidden); };
  }, []);
  function finish() { generation.current++; release(); setLevel(0); setStep("inserted"); }
  async function listen() {
    if (!navigator.mediaDevices?.getUserMedia) { setStep("unsupported"); return; }
    const attempt = ++generation.current;
    setStep("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!mounted.current || generation.current !== attempt) { stream.getTracks().forEach((track) => track.stop()); return; }
      resources.current.stream = stream;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const context = new AudioContext();
      resources.current.context = context;
      await context.resume();
      if (!mounted.current || generation.current !== attempt) { stream.getTracks().forEach((track) => track.stop()); context.close().catch(() => {}); return; }
      const analyser = context.createAnalyser();
      analyser.fftSize = 256;
      context.createMediaStreamSource(stream).connect(analyser);
      const samples = new Uint8Array(analyser.frequencyBinCount);
      setStep("listening");
      let last = 0;
      function measure(now) {
        if (now - last > 90) {
          analyser.getByteTimeDomainData(samples);
          const rms = Math.sqrt(samples.reduce((sum, value) => sum + ((value - 128) / 128) ** 2, 0) / samples.length);
          setLevel(Math.min(1, rms * 6)); last = now;
        }
        resources.current.frame = requestAnimationFrame(measure);
      }
      resources.current.frame = requestAnimationFrame(measure);
      resources.current.timer = setTimeout(finish, 8000);
    } catch (error) {
      if (mounted.current && generation.current === attempt) { release(); setStep(error.name === "NotAllowedError" ? "denied" : "unavailable"); }
    }
  }
  const listening = step === "listening";
  const busy = listening || step === "requesting";
  const problem = ["denied", "unsupported", "unavailable"].includes(step);
  return <div className={`voice-demo demo-${step}`}>
    <div className="demo-summary"><img src="/assets/ivoz-icon.png" alt="" /><span><strong><LocalizedText>Talk. It types.</LocalizedText></strong><small><LocalizedText>iVoz · local dictation</LocalizedText></small></span></div>
    <div className="voice-demo-flow"><span className={listening ? "flow-active" : ""}><Mic size={13} /> <LocalizedText>Live microphone</LocalizedText></span><ArrowRight size={11} /><span className={step === "inserted" ? "flow-active" : ""}><LocalizedText>Example insertion</LocalizedText></span></div>
    <div className="voice-input">
      <div className="demo-wave live-wave" aria-hidden="true">{Array.from({ length: 19 }, (_, i) => <i key={i} style={{ height: `${4 + level * (12 + ((i * 7) % 23))}px` }} />)}</div>
      <span role="status">{listening ? "Listening to your microphone…" : step === "requesting" ? "Allow microphone access to begin." : step === "denied" ? "Microphone permission was declined." : problem ? "Microphone unavailable in this browser." : "Say a few words. Watch the signal."}</span>
    </div>
    <div className="demo-document"><span><FileText size={12} /> <LocalizedText>A note for the team</LocalizedText></span><p>{step === "inserted" ? "Let’s build something useful." : "Your words land right here."}<i className="demo-caret" aria-hidden="true" /></p>{step === "inserted" && <small><Check size={11} /> <LocalizedText>Example text · native iVoz transcribes locally</LocalizedText></small>}</div>
    <button className="demo-button" disabled={step === "requesting"} onClick={listening ? finish : listen}><Mic size={13} />{listening ? "Stop & preview insertion" : step === "requesting" ? "Waiting for microphone" : "Try your microphone"}</button>
    {problem && <button className="sample-fallback" onClick={finish}><LocalizedText>See the example without a microphone</LocalizedText></button>}
    <small className="simulation-note"><LocalizedText>Live mic check · example text. Audio stays in this tab.</LocalizedText></small>
    <span className="sr-only" role="status">{step === "inserted" ? "Example insertion complete. Let’s build something useful." : busy ? "Microphone demo in progress." : ""}</span>
  </div>;
}

function OrganizeDemo() {
  const [reviewed, setReviewed] = useState(false);
  return (
    <div className="utility-demo">
      <div className="demo-summary">
        <Folder />
        <span>
          <strong><LocalizedText>A little less chaos.</LocalizedText></strong>
          <small><LocalizedText>iOrganize · review before acting</LocalizedText></small>
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
        <LocalizedText>Sample files · your Mac stays yours</LocalizedText>
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
          <strong><LocalizedText>Another screen.</LocalizedText></strong>
          <small><LocalizedText>Screen Bridge · local network</LocalizedText></small>
        </span>
      </div>
      <div className={`bridge-demo ${connected ? "is-connected" : ""}`}>
        <span>
          <Monitor size={45} />
          <small><LocalizedText>Mac</LocalizedText></small>
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
        <LocalizedText>Simulated connection · experimental app</LocalizedText>
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
          <strong><LocalizedText>Know your Mac.</LocalizedText></strong>
          <small><LocalizedText>iStats · useful signal</LocalizedText></small>
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
        <LocalizedText>Illustrative data · no access to your device</LocalizedText>
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
          <strong><LocalizedText>A little room to think.</LocalizedText></strong>
          <small><LocalizedText>iBrain · local Ollama / optional cloud</LocalizedText></small>
        </span>
      </div>
      <div className="sample-chat">
        <p className="chat-user"><LocalizedText>Help me break an idea into smaller steps.</LocalizedText></p>
        {response ? (
          <p className="chat-response">
            <LocalizedText>Start with one problem.</LocalizedText>
            <br />
            <LocalizedText>Build the smallest useful version.</LocalizedText>
            <br />
            <LocalizedText>Test it. Learn. Build again.</LocalizedText>
          </p>
        ) : (
          <p className="chat-placeholder"><LocalizedText>Your model. Your conversation.</LocalizedText></p>
        )}
      </div>
      <button className="demo-button" onClick={() => setResponse(!response)}>
        <Send size={12} />
        {response ? "Reset conversation" : "See a sample conversation"}
      </button>
      <small className="simulation-note">
        <LocalizedText>Scripted preview · no AI request</LocalizedText>
      </small>
    </div>
  );
}

function PreviewTransition({ image, name, children }) {
  const reduce = useMotionPreference();
  const ref = useRef(null);
  const [showDemo, setShowDemo] = useState(!image);
  useEffect(() => {
    if (!image) return;
    let timer;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      timer = setTimeout(() => setShowDemo(true), 3500);
      observer.disconnect();
    }, { threshold: 0.45 });
    observer.observe(ref.current);
    return () => { observer.disconnect(); clearTimeout(timer); };
  }, [image]);
  return <div ref={ref} className={`mac-preview-transition ${showDemo ? "show-demo" : "show-screenshot"} ${reduce ? "no-fade" : ""}`}>
    {showDemo && children}
    {image && <div className="mac-original-preview" aria-hidden={showDemo}>
      <img src={image} alt={`Actual ${name} application interface`} loading="lazy" decoding="async" />
      <button disabled={showDemo} tabIndex={showDemo ? -1 : undefined} onClick={() => setShowDemo(true)}><LocalizedText>Actual app → try the preview</LocalizedText> <ArrowRight size={11} /></button>
    </div>}
  </div>;
}

export default function MacDemo({ active, image, name }) {
  const demos = [<VoiceDemo />, <OrganizeDemo />, <BridgeDemo />, <StatsDemo />, <BrainDemo />];
  return <PreviewTransition key={active} image={image} name={name}>{demos[active]}</PreviewTransition>;
}
