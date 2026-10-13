import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { ArrowUpRight, Check, FileText, Eye, Play, Users, Heart, MessageCircle, Share2, Bookmark, Repeat2 } from 'lucide-react';
import { useMotionPreference } from './motion-preferences';
import analytics from './data/analytics.json';
import './content-distribution.css';

const icons = { 'Reel views': Play, 'Video Views': Play, Viewers: Users, Reels: Play, Shares: Share2, Saves: Bookmark, Likes: Heart, Comments: MessageCircle, Reposts: Repeat2, 'Profile Views': Eye };
const instagramSummary = analytics.instagram['90'];
const tiktokSummary = analytics.tiktok['60'];
const combinedViews = instagramSummary.metrics['Reel views'] + tiktokSummary.metrics['Video Views'];
const countryFlags = { Argentina: '🇦🇷', 'United States': '🇺🇸', India: '🇮🇳', Chile: '🇨🇱', Mexico: '🇲🇽' };
const profiles = { instagram: 'https://www.instagram.com/builtbyhikari.ai/', tiktok: 'https://www.tiktok.com/@builtbyhikari.ai' };
const format = n => n >= 10000 ? `${(n / 1000).toFixed(n % 1000 ? 1 : 0)}K` : n >= 1000 ? `${(n / 1000).toFixed(1)}K` : Math.round(n).toLocaleString('en-US');
const date = s => new Date(`${s}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
function PlatformIcon({ platform, size = 24 }) {
  const gradientId = useId();
  if (platform === 'instagram') return <svg width={size} height={size} viewBox="0 0 24 24" className="cd-instagram" aria-hidden="true"><defs><linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0"><stop stopColor="#ffcb52" /><stop offset=".35" stopColor="#f64c48" /><stop offset=".7" stopColor="#c42bba" /><stop offset="1" stopColor="#6755d9" /></linearGradient></defs><rect width="24" height="24" rx="6" fill={`url(#${gradientId})`} /><rect x="4.7" y="4.7" width="14.6" height="14.6" rx="4.4" fill="none" stroke="white" strokeWidth="1.8" /><circle cx="12" cy="12" r="3.5" fill="none" stroke="white" strokeWidth="1.8" /><circle cx="17" cy="7" r="1.1" fill="white" /></svg>;
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.7 1h-4v14.8a3.2 3.2 0 1 1-2.8-3.2V8.5a7.3 7.3 0 1 0 6.8 7.3V8.1a10 10 0 0 0 5.3 1.6V5.6A5.5 5.5 0 0 1 16.7 1Z" /></svg>;
}
function Count({ value, visible }) {
  const reduced = useMotionPreference();
  const node = useRef(null), current = useRef(0);
  useEffect(() => {
    if (!visible) return;
    const from = current.current;
    let frame;
    const start = performance.now();
    const tick = now => {
      const t = reduced ? 1 : Math.min((now - start) / 950, 1);
      current.current = from + (value - from) * (1 - (1 - t) ** 3);
      if (node.current) node.current.textContent = format(current.current);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, visible, reduced]);
  return <strong aria-label={value.toLocaleString('en-US')}><span ref={node} aria-hidden="true">{reduced ? format(value) : '0'}</span></strong>;
}
function Proof({ href, children, download }) {
  return <a href={href} className="cd-proof" target={download ? undefined : '_blank'} rel="noopener noreferrer" download={download}><FileText size={16} />{children}<ArrowUpRight size={15} /></a>;
}
function Distribution({ title, rows, note }) {
  return <div className="cd-distribution"><h4>{title}</h4>{rows.map(([label, value]) => <div key={label} className={label === 'United States' ? 'cd-us' : ''}><div className="cd-bar-label"><span className="cd-country-name">{countryFlags[label] && <span className="cd-country-flag" aria-hidden="true">{countryFlags[label]}</span>}{label}</span><span>{value.toFixed(1)}%</span></div><div className="cd-track"><span style={{ width: `${value}%` }} /></div></div>)}{note && <p className="cd-hand">{note}</p>}</div>;
}
function DailyChart({ series, reduced }) {
  const [selected, setSelected] = useState(null);
  const peak = series.reduce((a, b) => b.views > a.views ? b : a);
  const active = selected === null ? peak : series[selected];
  return <div className="cd-chart"><div className="cd-card-title"><h3>Views over time</h3><span>Daily video views</span></div><div className="cd-chart-detail" aria-live="polite"><span>{date(active.date)}</span><strong>{active.views.toLocaleString('en-US')} views</strong><small>{active.likes.toLocaleString('en-US')} likes · {active.shares} shares</small></div><div className="cd-plot" role="group" aria-label={`60 daily observations. Peak: ${date(peak.date)}, ${peak.views} video views. Use arrow keys to explore.`} onMouseLeave={() => setSelected(null)}>{series.map((point, i) => <button key={point.date} tabIndex={i === (selected ?? series.indexOf(peak)) ? 0 : -1} aria-label={`${date(point.date)}: ${point.views} views, ${point.likes} likes, ${point.shares} shares`} onFocus={() => setSelected(i)} onMouseEnter={() => setSelected(i)} onClick={() => setSelected(i)} onKeyDown={event => { if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return; event.preventDefault(); const next = Math.max(0, Math.min(series.length - 1, i + (event.key === 'ArrowRight' ? 1 : -1))); setSelected(next); event.currentTarget.parentElement.children[next].focus(); }} className={point === active ? 'selected' : ''}><motion.span initial={reduced ? false : { scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: reduced ? 0 : .45, delay: reduced ? 0 : i * .004 }} style={{ height: `${Math.max(point.views / peak.views * 100, 1)}%` }} /></button>)}</div><label className="cd-chart-scrubber"><span>Explore daily views</span><input type="range" min="0" max={series.length - 1} value={selected ?? series.indexOf(peak)} onChange={event => setSelected(Number(event.target.value))} aria-label="Explore daily TikTok views" aria-valuetext={`${date(active.date)}: ${active.views.toLocaleString('en-US')} views`} /></label><div className="cd-axis">{[0, 19, 38, series.length - 1].map(i => <span key={i}>{new Date(`${series[i].date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>)}</div><p className="cd-hand cd-spike">↖ {new Date(`${peak.date}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}. This one took off.</p></div>;
}
export default function ContentDistribution() {
  const [platform, setPlatform] = useState('instagram');
  const [ranges, setRanges] = useState({ instagram: '90', tiktok: '60' });
  const [audience, setAudience] = useState('countries');
  const [showFullAudience, setShowFullAudience] = useState(false);
  const reduced = useMotionPreference();
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: .15 });
  const range = ranges[platform], data = analytics[platform][range];
  const demo = data.demographics;
  const audienceProof = instagramSummary.demographics;
  const metrics = Object.entries(data.metrics);
  const majorLabels = platform === 'instagram'
    ? ['Reel views', 'Viewers', 'Shares', 'Saves']
    : ['Video Views', 'Profile Views', 'Shares', 'Likes'];
  const majorMetrics = majorLabels.map(label => metrics.find(([name]) => name === label)).filter(Boolean);
  const secondaryMetrics = metrics.filter(([label]) => !majorLabels.includes(label));
  return <section className="content-distribution light" id="content" aria-labelledby="cd-heading">
    <div className="wrap"><div className="cd-topline"><span>FROM PRODUCT TO PEOPLE</span><span>BUILD → TEST → EXPLAIN → DISTRIBUTE</span></div>
    <div className="cd-layout"><motion.div className="cd-editorial" initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <p className="cd-eyebrow">CONTENT + DISTRIBUTION</p><h2 id="cd-heading">I TURN PRODUCTS<br />INTO CONTENT<br /><mark>PEOPLE WATCH.</mark></h2>
      <p className="cd-intro">I don’t just talk about products. I use them, test them, find the interesting part, and turn the experience into short-form content people actually want to watch.</p>
      <ul>{['AI product testing', 'Startup UGC + product demos', 'English + Spanish content'].map(text => <li key={text}><span><Check size={15} /></span>{text}</li>)}</ul>
      <p className="cd-mobile-note cd-hand">Real numbers from<br />my actual accounts. ↙</p><div className="cd-product-note"><span className="cd-hand">If the product is good,<br />I find the story.</span><svg width="80" height="55" viewBox="0 0 80 55" fill="none" aria-hidden="true"><path d="M4 9c4 33 45 40 68 12m-18 2 20-5-3 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
      <a className="cd-content-link" href={profiles[platform]} target="_blank" rel="noopener noreferrer"><PlatformIcon platform={platform} size={18} /> Watch my content <ArrowUpRight size={16} /></a>
    </motion.div>
    <div className="cd-dashboard"><div className="cd-toolbar"><div className="cd-platforms" role="group" aria-label="Analytics platform">{['instagram', 'tiktok'].map(p => <button key={p} aria-pressed={p === platform} onClick={() => setPlatform(p)}><PlatformIcon platform={p} /><span>{p === 'instagram' ? 'Instagram' : 'TikTok'}</span></button>)}</div><span className="cd-hand cd-toggle-note">two platforms. real receipts. ↙</span></div>
    <div className="cd-report-panel" ref={ref}><div className="cd-account"><div className="cd-account-name"><span className="cd-avatar"><PlatformIcon platform={platform} size={27} /></span><div><strong>@builtbyhikari.ai</strong><small>{platform === 'instagram' ? 'Instagram · Exported from Edits' : 'TikTok · Exported analytics'}</small></div></div><div className="cd-range" role="group" aria-label="Reporting window">{Object.keys(analytics[platform]).map(r => <button key={r} aria-pressed={r === range} onClick={() => setRanges(old => ({ ...old, [platform]: r }))}>{r}D</button>)}</div></div>
    <div className="cd-period" aria-live="polite"><span>{date(data.startDate)} – {date(data.endDate)}</span><span>{data.days}-day report{platform === 'instagram' ? ` · ${data.followers} followers` : ''}</span></div>
    <div className="cd-metrics cd-desktop-metrics" aria-label="Key account metrics">{majorMetrics.map(([label, value], index) => { const Icon = icons[label] || Eye; return <div className={`cd-metric ${index === 0 ? 'cd-major' : 'cd-key-metric'}`} title={`${label}: ${value.toLocaleString('en-US')}${data.rounded.includes(label) ? ' (rounded in source)' : ''}`} key={label}><Icon size={18} /><Count value={value} visible={visible} /><span>{label}</span></div>; })}</div>
    <div className="cd-metrics cd-mobile-metrics" aria-label="Account metrics">{metrics.map(([label, value], index) => { const Icon = icons[label] || Eye; return <div className={`cd-metric ${index === 0 ? 'cd-major' : ''}`} title={`${label}: ${value.toLocaleString('en-US')}${data.rounded.includes(label) ? ' (rounded in source)' : ''}`} key={label}><Icon size={19} /><Count value={value} visible={visible} /><span>{label}</span></div>; })}</div>
    {secondaryMetrics.length > 0 && <div className="cd-secondary-metrics" aria-label="Additional account metrics">{secondaryMetrics.map(([label, value]) => { const Icon = icons[label] || Eye; return <span className="cd-secondary-stat" key={label}><Icon size={14} /><span>{label}</span><strong title={`${label}: ${value.toLocaleString('en-US')}${data.rounded.includes(label) ? ' (rounded in source)' : ''}`}>{format(value)}</strong></span>; })}</div>}
    <AnimatePresence mode="wait"><motion.div key={`${platform}-${range}`} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: reduced ? 0 : .2 }}>
    {data.timeSeries ? <DailyChart series={data.timeSeries} reduced={reduced} /> : <div className="cd-engagement cd-mobile-engagement"><div><h3>What people did next</h3><p>Shares, saves, comments & reposts</p></div><div className="cd-engagement-bars">{['Shares', 'Saves', 'Comments', 'Reposts'].map(label => <div key={label}><span>{label}</span><div className="cd-track"><span style={{ width: `${data.metrics[label] / Math.max(...['Shares', 'Saves', 'Comments', 'Reposts'].map(k => data.metrics[k])) * 100}%` }} /></div><strong>{data.metrics[label]}</strong></div>)}</div></div>}
    {demo && <div className="cd-audience"><div className="cd-card-title"><h3>Who’s following along</h3><span>Follower demographics · {data.days}D</span></div><div className="cd-audience-grid"><div className="cd-gender"><h4>Gender</h4><div className="cd-donut" style={{ background: `conic-gradient(#4c9ce8 0 ${demo.gender[0][1]}%, #f08bb8 ${demo.gender[0][1]}% 100%)` }} role="img" aria-label={demo.gender.map(([label, value]) => `${value} percent ${label}`).join(', ')}><span>{data.followers}<small>followers</small></span></div>{demo.gender.map(([label, n]) => <p key={label}><i className={label === 'Women' ? 'light' : ''} /><strong>{n}%</strong> {label}</p>)}</div><div><div className="cd-audience-tabs" role="group" aria-label="Audience breakdown">{['countries', 'age', 'cities'].map(a => <button key={a} aria-pressed={audience === a} onClick={() => setAudience(a)}>{a === 'age' ? 'Age' : `Top ${a}`}</button>)}</div><Distribution title={audience === 'age' ? 'Age range' : `Top ${audience}`} rows={demo[audience]} note={audience === 'countries' ? 'U.S. is my #2 audience. ↗' : undefined} /></div></div></div>}
    <p className="cd-data-note">{platform === 'instagram' ? 'K values are rounded as shown in the PDF. Insights aggregate Reels and posts unless stated. No daily series was supplied.' : 'Exact daily totals from Overview.csv. Viewer exports use a different window and contain a missing value; no unique-audience total is claimed.'}</p>
    <div className="cd-proofs"><Proof href={data.source} download={platform === 'tiktok'}>{platform === 'instagram' ? `View ${range}-day report` : 'Download TikTok data'}</Proof>{data.viewerSource && <Proof href={data.viewerSource} download>Viewer export</Proof>}<span className="cd-hand">yes, you can check it. ↖</span></div>
    </motion.div></AnimatePresence></div></div></div>
    <section className="cd-audience-proof" aria-labelledby="cd-audience-proof-title"><div className="cd-audience-proof-heading"><div><span className="cd-audience-kicker">INSTAGRAM · 90-DAY AUDIENCE</span><h3 id="cd-audience-proof-title">Who’s watching?</h3></div><span className="cd-us-proof"><strong>18.6%</strong><span>United States<br /><b>#2 country</b></span></span></div><div className="cd-audience-highlights"><div><span>Gender split</span><strong><i className="cd-men-dot" />{audienceProof.gender[0][1]}% men <i className="cd-women-dot" />{audienceProof.gender[1][1]}% women</strong></div><div><span>Largest age group</span><strong>{audienceProof.age.reduce((best, row) => row[1] > best[1] ? row : best)[0]} <b>{audienceProof.age.reduce((best, row) => row[1] > best[1] ? row : best)[1]}%</b></strong></div><button className="cd-audience-toggle" aria-expanded={showFullAudience} aria-controls="cd-full-audience" onClick={() => setShowFullAudience(open => !open)}>{showFullAudience ? 'Hide full audience' : 'View full audience'}<span aria-hidden="true">{showFullAudience ? '−' : '+'}</span></button></div><div className="cd-full-audience" id="cd-full-audience" hidden={!showFullAudience}><div className="cd-audience-grid"><div className="cd-gender"><h4>Gender</h4><div className="cd-donut" style={{ background: `conic-gradient(#4c9ce8 0 ${audienceProof.gender[0][1]}%, #f08bb8 ${audienceProof.gender[0][1]}% 100%)` }} role="img" aria-label={audienceProof.gender.map(([label, value]) => `${value} percent ${label}`).join(', ')}><span>{instagramSummary.followers}<small>followers</small></span></div>{audienceProof.gender.map(([label, n]) => <p key={label}><i className={label === 'Women' ? 'light' : ''} /><strong>{n}%</strong> {label}</p>)}</div><div><div className="cd-audience-tabs" role="group" aria-label="Audience breakdown">{['countries', 'age', 'cities'].map(a => <button key={a} aria-pressed={audience === a} onClick={() => setAudience(a)}>{a === 'age' ? 'Age' : `Top ${a}`}</button>)}</div><Distribution title={audience === 'age' ? 'Age range' : `Top ${audience}`} rows={audienceProof[audience]} note={audience === 'countries' ? 'U.S. is my #2 audience. ↗' : undefined} /></div></div></div></section>
    <div className="cd-summary"><div className="cd-summary-number"><span><Eye size={27} /></span><div><strong>{Math.floor(combinedViews / 1000)}K+</strong><small>SHORT-FORM VIEWS</small></div></div><div><strong>Real product experiments. Real content. Real distribution.</strong><p>Instagram: {format(instagramSummary.metrics['Reel views'])} / {instagramSummary.days} days + TikTok: {tiktokSummary.metrics['Video Views'].toLocaleString('en-US')} / {tiktokSummary.days} days</p><small>Across two supplied reporting windows. Instagram total is rounded.</small></div><a href={profiles[platform]} target="_blank" rel="noopener noreferrer">View my content <ArrowUpRight size={17} /></a></div>
    <div className="cd-cta"><h3>BUILDING SOMETHING<br />WORTH TESTING?</h3><p>I work with AI and software startups on product testing, demos, and short-form UGC built from actual product use.</p><a className="cta" href="#contact">Let’s work together <ArrowUpRight size={17} /></a><a className="cd-mobile-watch" href={profiles[platform]} target="_blank" rel="noopener noreferrer"><Play size={17} /> View my content <ArrowUpRight size={17} /></a></div>
    </div></section>;
}
