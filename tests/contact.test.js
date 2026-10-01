import test from "node:test";
import assert from "node:assert/strict";
import contact from "../api/contact.js";

const valid = { name: "Portfolio visitor", email: "visitor@example.com", topic: "A role", message: "I would like to discuss a role.", requestId: "7f679068-3ea9-47b2-8757-b1e017b74425", website: "" };
let ip = 0;
async function send(body = valid, overrides = {}) {
  const req = { method: "POST", body, headers: { origin: "https://personalbrand-murex.vercel.app", "content-type": "application/json", "x-forwarded-for": `test-${++ip}` }, ...overrides };
  const res = { headers: {}, setHeader(k,v) { this.headers[k] = v; }, status(n) { this.code = n; return this; }, json(value) { this.body = value; return this; } };
  await contact(req,res); return res;
}

test("contact validates input, sends to the configured inbox, and never reports provider failure as success", async (t) => {
  const originalFetch = globalThis.fetch;
  const saved = Object.fromEntries(["RESEND_API_KEY", "CONTACT_FROM_EMAIL", "CONTACT_TO_EMAIL"].map(k => [k, process.env[k]]));
  t.after(() => { globalThis.fetch = originalFetch; for (const [k,v] of Object.entries(saved)) { if (v === undefined) delete process.env[k]; else process.env[k] = v; } });
  process.env.RESEND_API_KEY = "test-only";
  process.env.CONTACT_FROM_EMAIL = "sender@example.com";
  process.env.CONTACT_TO_EMAIL = "owner@example.com";
  let calls = [];
  globalThis.fetch = async (...args) => { calls.push(args); return { ok: true, json: async () => ({ id: "accepted" }) }; };
  for (const body of [{...valid, email:"bad"}, {...valid, message:"short"}, {...valid, website:"spam"}, {...valid, name:"header\ninjection"}, null]) assert.equal((await send(body)).code,400);
  assert.equal((await send(valid,{method:"GET"})).code,405);
  assert.equal((await send(valid,{headers:{origin:"https://other.example", "content-type":"application/json"}})).code,403);
  assert.equal(calls.length,0);
  delete process.env.RESEND_API_KEY;
  assert.equal((await send()).code,503); assert.equal(calls.length,0);
  process.env.RESEND_API_KEY = "test-only";
  const accepted = await send({...valid,to:"attacker@example.com"});
  assert.deepEqual(accepted.body,{sent:true});
  const payload = JSON.parse(calls[0][1].body);
  assert.deepEqual(payload.to,["owner@example.com"]);
  assert.equal(payload.reply_to,valid.email);
  assert.equal(calls[0][1].headers["Idempotency-Key"],`portfolio-${valid.requestId}`);
  globalThis.fetch = async () => ({ok:false,json:async()=>({message:"provider rejected"})});
  assert.equal((await send()).code,502);
  globalThis.fetch = async () => ({ok:true,json:async()=>({})});
  assert.equal((await send()).code,502);
  globalThis.fetch = async () => { throw new Error("timeout"); };
  assert.equal((await send()).code,502);
  globalThis.fetch = async () => ({ok:true,json:async()=>({id:"accepted"})});
  const headers = {origin:"https://personalbrand-murex.vercel.app", "content-type":"application/json", "x-forwarded-for":"repeat-test"};
  for(let i=0;i<5;i++) assert.equal((await send(valid,{headers})).code,200);
  assert.equal((await send(valid,{headers})).code,429);
});
