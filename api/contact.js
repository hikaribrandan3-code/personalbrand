import { createHash } from "node:crypto";

const topics = new Set(["A role", "A product", "Collaboration", "Something else"]);
const attempts = new Map();
const windowMs = 10 * 60 * 1000;
const emailPattern = /^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+$/;

export default async function contact(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Use the contact form to send a message." });
  }
  const origin = req.headers.origin;
  const allowed = new Set(["https://personalbrand-murex.vercel.app", process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`, process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]);
  if (origin && !allowed.has(origin)) return res.status(403).json({ error: "Please send your message from the portfolio." });
  if (!req.headers["content-type"]?.startsWith("application/json")) return res.status(415).json({ error: "Invalid message format." });
  let body;
  try {
    const raw = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    if (!raw || raw.length > 8192) throw new Error("Body size");
    body = typeof req.body === "string" ? JSON.parse(raw) : req.body;
  } catch { return res.status(400).json({ error: "Please check your message and try again." }); }
  if (!body || typeof body !== "object" || body.website) return res.status(400).json({ error: "Please check your message and try again." });
  const { name, email, message, topic, requestId } = body;
  if (typeof name !== "string" || !name.trim() || name.length > 80 || /[\r\n\x00-\x1f]/.test(name)
    || typeof email !== "string" || email.length > 254 || !emailPattern.test(email)
    || typeof message !== "string" || message.trim().length < 10 || message.length > 500
    || !topics.has(topic) || typeof requestId !== "string" || !/^[a-f0-9-]{36}$/i.test(requestId)) {
    return res.status(400).json({ error: "Please enter your name, a valid email, and a message of 10–500 characters." });
  }
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "hikaristudioai@gmail.com";
  if (!key || !from) return res.status(503).json({ error: "Email is temporarily unavailable. You can reach Hikari on WhatsApp or by email below." });
  // Best-effort per-instance protection; Resend idempotency also protects retries.
  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0];
  const client = createHash("sha256").update(ip).digest("hex");
  const now = Date.now();
  for (const [id, value] of attempts) if (now - value.start > windowMs) attempts.delete(id);
  const entry = attempts.get(client) || { start: now, count: 0 };
  if (entry.count >= 5) { res.setHeader("Retry-After", "600"); return res.status(429).json({ error: "A few messages have already been sent. Please try again in 10 minutes, or use WhatsApp." }); }
  if (attempts.size > 2000) attempts.clear();
  entry.count++; attempts.set(client, entry);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": `portfolio-${requestId}` },
      signal: AbortSignal.timeout(12000),
      body: JSON.stringify({ from, to: [to], reply_to: email.trim(), subject: `${topic} — ${name.trim()}`, text: `New portfolio message\n\nFrom: ${name.trim()}\nEmail: ${email.trim()}\nAbout: ${topic}\n\n${message.trim()}` }),
    });
    const result = await response.json();
    if (!response.ok || !result.id) return res.status(502).json({ error: "Your message couldn’t be sent. Please retry, or use email or WhatsApp below." });
    return res.status(200).json({ sent: true });
  } catch {
    return res.status(502).json({ error: "Sending took too long. Your message is still here—please retry or use WhatsApp." });
  }
}
