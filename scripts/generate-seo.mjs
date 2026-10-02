import { readFile, writeFile, mkdir, rm, stat } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { build } from 'vite';
import { projectData, macApps } from '../src/projectData.js';
import { identity, origin, pages } from './seo-data.mjs';

const preview = !!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production';
const absolute = path => `${origin}${path}`;
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
const personId = `${origin}/#hikari-brandan`;
const person = {'@type':'Person', '@id':personId, name:identity.name, jobTitle:identity.jobTitle, description:identity.description, url:`${origin}/`, image:absolute(identity.image), homeLocation:{'@type':'Place',name:'Córdoba, Argentina'}, knowsLanguage:['English','Spanish'], knowsAbout:['Product development','AI-assisted software development','Mobile web UX','Browser cameras','NFC and QR experiences','Product testing and debugging'], sameAs:identity.sameAs};
const website = {'@type':'WebSite', '@id':`${origin}/#website`, url:`${origin}/`, name:identity.name, inLanguage:'en', publisher:{'@id':personId}, about:{'@id':personId}};
function entities(page) {
  const data = projectData[page.key], url = absolute(page.path), productId = `${url}#product`;
  const notes = {'@type':'CreativeWork','@id':`${url}#notes`,url,name:`${page.name} — Build Notes`,description:page.summary,author:{'@id':personId},inLanguage:'en',creativeWorkStatus:'Published',mainEntityOfPage:url};
  if (page.type === 'CreativeWork') {
    if (page.key !== 'mac') return [notes];
    const apps = macApps.map(app => ({'@type':'SoftwareApplication','@id':`${url}#${app.id}`,name:app.name,description:app.description,operatingSystem:'macOS',applicationCategory:'UtilitiesApplication',creator:{'@id':personId},image:absolute(app.icon),softwareRequirements:app.requirements,url:app.links.find(link => link.label === 'Product website')?.href || app.links[0].href}));
    notes.hasPart = apps.map(app => ({'@id':app['@id']}));
    return [notes,...apps];
  }
  notes.about = {'@id':productId};
  const product = {'@type':page.type,'@id':productId,name:page.name,description:page.summary,image:absolute(page.image)};
  if (page.type === 'Organization') {
    product.description = 'Historical Seattle-area automotive restyling business operated by Hikari Brandan.';
    product.sameAs = data.links.map(link => link.href);
  } else {
    Object.assign(product,{url:page.productUrl,operatingSystem:'Web browser',applicationCategory:page.category,creator:{'@id':personId},creativeWorkStatus:data.status});
  }
  return [notes,product];
}
function metadata(page, graph, indexable = true) {
  const url = absolute(page.path), title = esc(page.title), description = esc(page.summary), image = absolute(page.image);
  const imageDimensions = page.imageWidth && page.imageHeight ? `\n<meta property="og:image:secure_url" content="${image}">\n<meta property="og:image:width" content="${page.imageWidth}">\n<meta property="og:image:height" content="${page.imageHeight}">` : '';
  return `<title>${title}</title>\n<meta name="description" content="${description}">\n<link rel="canonical" href="${url}">\n<meta name="robots" content="${preview || !indexable ? 'noindex, follow' : 'index, follow'}">\n<meta property="og:type" content="website">\n<meta property="og:site_name" content="Hikari Brandan">\n<meta property="og:title" content="${title}">\n<meta property="og:description" content="${description}">\n<meta property="og:url" content="${url}">\n<meta property="og:image" content="${image}">${imageDimensions}\n<meta property="og:image:alt" content="${esc(page.imageAlt)}">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="${title}">\n<meta name="twitter:description" content="${description}">\n<meta name="twitter:image" content="${image}">\n<meta name="twitter:image:alt" content="${esc(page.imageAlt)}">\n<script type="application/ld+json">${json({'@context':'https://schema.org','@graph':graph})}</script>`;
}
const links = items => `<div class="pd-links">${items.map(link=>`<a class="pd-link ${link.kind==='demo'?'pd-link-primary':''}" href="${esc(link.href)}"${link.href.startsWith('http')?' target="_blank" rel="noopener noreferrer"':''}>${esc(link.label)}</a>`).join('')}</div>`;
function section(title, copy, index) {
  return `<section class="pd-section"><div class="pd-section-label"><span>${String(index).padStart(2,'0')}</span><h2>${esc(title)}</h2></div><div class="pd-section-copy">${copy}</div></section>`;
}
const list = items => `<ul>${items.map(item=>`<li>${esc(item)}</li>`).join('')}</ul>`;
const related = `<nav class="pd-links" aria-label="More build notes">${pages.map(page=>`<a class="pd-link" href="${page.path}">${esc(page.name)}</a>`).join('')}</nav>`;
function pageBody(page) {
  const data = projectData[page.key];
  let i = 1;
  let body = section('Role & attribution', `<p>${esc(page.role)}</p>`, i++);
  if (data.process) body += section('Development workflow', `<ol>${data.process.map(step=>`<li>${esc(step)}</li>`).join('')}</ol>`, i++);
  body += data.sections.map(item=>section(item.title,(item.paragraphs||[]).map(p=>`<p>${esc(p)}</p>`).join('')+(item.items?list(item.items):''),i++)).join('');
  if (page.debug) body += section('Debugging example',`<p>${esc(page.debug)}</p>`,i++);
  body += section(page.key==='engineering'?'Workflow tools':'Technical areas',list(data.stack),i++);
  if (page.key === 'mac') body += macApps.map(app=>section(app.name,`<p>${esc(app.description)}</p><p>${esc(app.requirements)}</p><h3>Product decisions</h3>${list(app.decisions)}<h3>What I learned</h3><p>${esc(app.learned)}</p><h3>Limitations</h3>${list(app.limitations)}${links(app.links)}`,i++)).join('');
  body += section('Evidence & contact', `${links(data.links||[])}${links([{label:'View résumé',href:'/Hikari_Brandan_Resume.pdf'},{label:'GitHub',href:identity.sameAs[1]},{label:'LinkedIn',href:identity.sameAs[0]},{label:'Email Hikari',href:'mailto:hikaristudioai@gmail.com'}])}`,i++);
  body += section('More build notes',related,i++);
  return `<header class="pd-toolbar"><span>HIKARI / THE WORK BEHIND THE WORK</span><a class="pd-close" href="/#home">Back to portfolio</a></header><main><article class="pd-dialog"><header class="pd-header"><div class="pd-meta"><span>${esc(data.label)}</span><span class="pd-status">${esc(data.status)}</span></div><h1>${esc(page.name)}</h1><p>${esc(page.summary)}</p>${links(data.links||[])}</header><div class="pd-body">${body}</div><footer class="pd-footer"><span>BUILD NOTES BY HIKARI BRANDAN</span><a href="/#contact">Let’s talk</a></footer></article></main>`;
}
const home = {path:'/',title:'Hikari Brandan — AI Product Developer | Shipped Products & Experiments',summary:'Hikari Brandan is an AI Product Developer and product builder based in Córdoba, Argentina. Explore UGC Camera, MenuTap, FoodSpot Mobile, independent macOS apps and real-world business execution.',image:'/assets/hikari-brandan-social-share-v2.jpg',imageAlt:'Hikari Brandan — AI Product Developer portfolio featuring UGC Camera, MenuTap, B2B SaaS, web and mobile product development.',imageWidth:1200,imageHeight:630};
// All data and renderer dependencies are build-only, outside the client entry.
try {
  await build({build:{ssr:'scripts/prerender-entry.jsx',outDir:'.seo-build',emptyOutDir:true},logLevel:'warn'});
  const {renderHome} = await import(pathToFileURL(resolve('.seo-build/prerender-entry.js')));
  let html = await readFile('dist/index.html','utf8');
  // Replace the existing metadata, retaining viewport-scoped font/image preloads.
  html = html.replace(/<title>[\s\S]*?<\/title>/g,'').replace(/<meta\b(?=[^>]*(?:name="(?:description|twitter:[^"]+|robots)"|property="og:[^"]+"))[^>]*>/g,'').replace(/<link\b[^>]*rel="canonical"[^>]*>/g,'');
  html = html.replace('</head>',`${metadata(home,[website,person,...pages.flatMap(entities)])}\n<style>.prerender-mobile{display:none}@media(max-width:767px){.prerender-mobile{display:block}.prerender-desktop{display:none}}</style>\n<noscript><style>#root [style*="opacity:0"]{opacity:1!important}#root .headline-line>span{transform:none!important}.deferred-background{opacity:1!important}.prerender-mobile .mp-product-art{background-image:linear-gradient(0deg,#fffc,transparent 60%),url(/assets/mobile/cafe-background.jpg)}.prerender-mobile .mp-ugc-art{background-image:linear-gradient(0deg,#fffc,transparent 65%),url(/assets/ugc-sugar-crumb.webp)}</style></noscript>\n</head>`);
  html = html.replace('<div id="root"></div>',`<div id="root">${renderHome()}</div>`);
  await writeFile('dist/index.html',html);
  const fontCss = (await readFile('src/styles.css','utf8')).split(':root')[0];
  const drawerCss = await readFile('src/drawer.css','utf8');
  await writeFile('dist/assets/evidence.css',`${fontCss}\n*{box-sizing:border-box}body{margin:0;font-family:Body,Arial,sans-serif;background:#121210;color:#1b1b1b}a{color:inherit}h1,h2,h3,p{margin:0}h1,h2,h3{font-family:Body,Arial,sans-serif}\n${drawerCss}\n.evidence-page .pd-dialog{max-height:none;overflow:visible;width:min(1050px,calc(100% - 48px));margin:32px auto}.pd-header h1{margin:24px 0 21px;font-size:clamp(36px,4.5vw,63px);line-height:1.02;letter-spacing:-.055em}.pd-section-label h2{font-size:14px;line-height:1.4}.pd-section-copy h3{font-size:13px;margin:16px 0 8px}.pd-close{text-decoration:none}a:focus-visible{outline:3px solid #ffe100;outline-offset:4px}@media(max-width:760px){.evidence-page .pd-dialog{width:calc(100% - 24px);margin:12px auto}.pd-header h1{font-size:34px}.pd-toolbar{position:static}}`);
  for (const page of pages) {
    await stat(`public${page.image}`);
    const filename = `dist${page.path}.html`;
    await mkdir(dirname(filename),{recursive:true});
    await writeFile(filename,`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${metadata(page,[website,person,...entities(page)])}<link rel="icon" href="/favicon.svg"><link rel="stylesheet" href="/assets/evidence.css"></head><body class="evidence-page">${pageBody(page)}</body></html>`);
  }
  await writeFile('dist/404.html','<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found — Hikari Brandan</title><meta name="robots" content="noindex, follow"><link rel="stylesheet" href="/assets/evidence.css"></head><body class="evidence-page"><main class="pd-header"><h1>Page not found.</h1><p>This address doesn’t have a portfolio page.</p><a class="pd-link" href="/">Back to portfolio</a></main></body></html>');
  await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\n\n# OAI-SearchBot, PerplexityBot and Claude-SearchBot inherit public access.\n# No change to model-training crawler policy.\nSitemap: ${origin}/sitemap.xml\n`);
  const paths = preview ? [] : ['/',...pages.map(page=>page.path),'/Hikari_Brandan_Resume.pdf'];
  await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path=>`<url><loc>${absolute(path)}</loc></url>`).join('')}</urlset>`);
  console.log(`Generated initial homepage HTML, ${pages.length} permanent notes pages, metadata, entity graph, robots and sitemap (${preview?'preview noindex':'production indexable'}).`);
} finally { await rm('.seo-build',{recursive:true,force:true}); }
