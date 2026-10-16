import { readFile, writeFile, mkdir, rm, stat } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { build } from 'vite';
import { projectData, macApps } from '../src/projectData.js';
import { identity, origin, pages } from './seo-data.mjs';
import { languages, messages } from '../src/messages.js';

const preview = !!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production';
const absolute = path => `${origin}${path}`;
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
const text = (locale, value) => messages[locale]?.[String(value).trim().replace(/\s+/g,' ')] ?? value;
const localePrefix = locale => locale === 'en' ? '' : locale === 'es' ? '/es' : '/pt-br';
function localizedPath(locale, path) {
  const [pathname, fragment = ''] = path.split('#');
  const base = pathname.replace(/^\/(?:es|pt-br)(?=\/|$)/i,'') || '/';
  return `${localePrefix(locale)}${base === '/' && locale !== 'en' ? '/' : base}${fragment ? `#${fragment}` : ''}`;
}
const languageTag = locale => locale === 'pt-BR' ? 'pt-BR' : locale;
function languageLinks(locale, path) {
  return `<nav class="evidence-language" aria-label="${esc(text(locale,'Choose language'))}">${languages.map(language=>`<a href="${localizedPath(language.code,path)}" lang="${languageTag(language.code)}"${language.code===locale?' aria-current="page"':''}>${language.shortName}</a>`).join('')}</nav>`;
}
function ugcLanguageControl(locale, path) {
  const icon = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>';
  const options = languages.map(language=>`<a href="${localizedPath(language.code,path)}" lang="${languageTag(language.code)}"${language.code===locale?' aria-current="page"':''}><b>${language.shortName}</b><span>${language.nativeName}</span></a>`).join('');
  return `<details class="ugc-language"><summary aria-label="${esc(text(locale,'Choose language'))}">${icon}</summary><div class="ugc-language-menu">${options}</div></details>`;
}
function localizeMarkup(markup, locale) {
  const substitutions = new Map();
  for (const [source,target] of Object.entries(messages[locale] || {})) {
    if (source === target) continue;
    substitutions.set(source,target);
    substitutions.set(esc(source),esc(target));
  }
  const alternatives = [...substitutions.keys()].sort((a,b)=>b.length-a.length).map(value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
  return markup.replace(new RegExp(alternatives.join('|'),'g'),match=>substitutions.get(match) ?? match);
}
const personId = `${origin}/#hikari-brandan`;
const person = {'@type':'Person', '@id':personId, name:identity.name, jobTitle:identity.jobTitle, description:identity.description, url:`${origin}/`, image:absolute(identity.image), homeLocation:{'@type':'Place',name:'Córdoba, Argentina'}, knowsLanguage:['English','Spanish'], knowsAbout:['Product development','AI-assisted software development','Mobile web UX','Browser cameras','NFC and QR experiences','Product testing and debugging'], sameAs:identity.sameAs};
function website(locale) { const url=absolute(localizedPath(locale,'/')); return {'@type':'WebSite','@id':`${url}#website`,url,name:identity.name,inLanguage:languageTag(locale),publisher:{'@id':personId},about:{'@id':personId}}; }
function entities(page, locale) {
  const data = projectData[page.key], url = absolute(localizedPath(locale,page.path)), productId = `${url}#product`;
  const notes = {'@type':'CreativeWork','@id':`${url}#notes`,url,name:`${text(locale,page.name)} — ${text(locale,'Build Notes')}`,description:text(locale,page.summary),author:{'@id':personId},inLanguage:languageTag(locale),creativeWorkStatus:'Published',mainEntityOfPage:url};
  if (page.type === 'CreativeWork') {
    if (page.key !== 'mac') return [notes];
    const apps = macApps.map(app => ({'@type':'SoftwareApplication','@id':`${url}#${app.id}`,name:app.name,description:text(locale,app.description),operatingSystem:'macOS',applicationCategory:'UtilitiesApplication',creator:{'@id':personId},image:absolute(app.icon),softwareRequirements:text(locale,app.requirements),url:app.links.find(link => link.label === 'Product website')?.href || app.links[0].href}));
    notes.hasPart = apps.map(app => ({'@id':app['@id']}));
    return [notes,...apps];
  }
  notes.about = {'@id':productId};
  const product = {'@type':page.type,'@id':productId,name:text(locale,page.name),description:text(locale,page.summary),image:absolute(page.image)};
  if (page.type === 'Organization') {
    product.description = 'Historical Seattle-area automotive restyling business operated by Hikari Brandan.';
    product.sameAs = data.links.map(link => link.href);
  } else {
    Object.assign(product,{url:page.productUrl,operatingSystem:'Web browser',applicationCategory:page.category,creator:{'@id':personId},creativeWorkStatus:data.status});
  }
  return [notes,product];
}
function metadata(page, graph, indexable = true, locale = 'en') {
  const route = localizedPath(locale,page.path), url = absolute(route), title = esc(text(locale,page.title)), description = esc(text(locale,page.summary)), image = absolute(page.image);
  const imageDimensions = page.imageWidth && page.imageHeight ? `\n<meta property="og:image:secure_url" content="${image}">\n<meta property="og:image:width" content="${page.imageWidth}">\n<meta property="og:image:height" content="${page.imageHeight}">` : '';
  const alternates = languages.map(language=>`<link rel="alternate" hreflang="${languageTag(language.code)}" href="${absolute(localizedPath(language.code,page.path))}">`).join('\n');
  return `<title>${title}</title>\n<meta name="description" content="${description}">\n<link rel="canonical" href="${url}">\n${alternates}\n<meta name="robots" content="${preview || !indexable ? 'noindex, follow' : 'index, follow'}">\n<meta property="og:type" content="website">\n<meta property="og:site_name" content="Hikari Brandan">\n<meta property="og:title" content="${title}">\n<meta property="og:description" content="${description}">\n<meta property="og:url" content="${url}">\n<meta property="og:locale" content="${locale === 'pt-BR' ? 'pt_BR' : locale === 'es' ? 'es_AR' : 'en_US'}">\n<meta property="og:image" content="${image}">${imageDimensions}\n<meta property="og:image:alt" content="${esc(text(locale,page.imageAlt))}">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="${title}">\n<meta name="twitter:description" content="${description}">\n<meta name="twitter:image" content="${image}">\n<meta name="twitter:image:alt" content="${esc(text(locale,page.imageAlt))}">\n<script type="application/ld+json">${json({'@context':'https://schema.org','@graph':graph})}</script>`;
}
const links = (items, locale) => `<div class="pd-links">${items.map(link=>`<a class="pd-link ${link.kind==='demo'?'pd-link-primary':''}" href="${esc(link.href)}"${link.href.startsWith('http')?' target="_blank" rel="noopener noreferrer"':''}>${esc(text(locale,link.label))}</a>`).join('')}</div>`;
function section(title, copy, index, locale) {
  return `<section class="pd-section"><div class="pd-section-label"><span>${String(index).padStart(2,'0')}</span><h2>${esc(text(locale,title))}</h2></div><div class="pd-section-copy">${copy}</div></section>`;
}
const list = (items, locale) => `<ul>${items.map(item=>`<li>${esc(text(locale,item))}</li>`).join('')}</ul>`;
function pageBody(page, locale) {
  const data = projectData[page.key];
  let i = 1;
  let body = section('Role & attribution', `<p>${esc(text(locale,page.role))}</p>`, i++, locale);
  if (data.process) body += section('Development workflow', `<ol>${data.process.map(step=>`<li>${esc(text(locale,step))}</li>`).join('')}</ol>`, i++, locale);
  body += data.sections.map(item=>section(item.title,(item.paragraphs||[]).map(p=>`<p>${esc(text(locale,p))}</p>`).join('')+(item.items?list(item.items,locale):''),i++,locale)).join('');
  if (page.debug) body += section('Debugging example',`<p>${esc(text(locale,page.debug))}</p>`,i++,locale);
  body += section(page.key==='engineering'?'Workflow tools':'Technical areas',list(data.stack,locale),i++,locale);
  if (page.key === 'mac') body += macApps.map(app=>section(app.name,`<p>${esc(text(locale,app.description))}</p><p>${esc(text(locale,app.requirements))}</p><h3>${esc(text(locale,'Product decisions'))}</h3>${list(app.decisions,locale)}<h3>${esc(text(locale,'What I learned'))}</h3><p>${esc(text(locale,app.learned))}</p><h3>${esc(text(locale,'Limitations'))}</h3>${list(app.limitations,locale)}${links(app.links,locale)}`,i++,locale)).join('');
  body += section('Evidence & contact', `${links(data.links||[],locale)}${links([{label:'View résumé',href:'/Hikari_Brandan_Resume.pdf'},{label:'GitHub',href:identity.sameAs[1]},{label:'LinkedIn',href:identity.sameAs[0]},{label:'Email Hikari',href:'mailto:hikaristudioai@gmail.com'}],locale)}`,i++,locale);
  const related = `<nav class="pd-links" aria-label="${esc(text(locale,'More build notes'))}">${pages.map(item=>`<a class="pd-link" href="${localizedPath(locale,item.path)}">${esc(text(locale,item.name))}</a>`).join('')}</nav>`;
  body += section('More build notes',related,i++,locale);
  return `${languageLinks(locale,page.path)}<header class="pd-toolbar"><span>HIKARI / ${esc(text(locale,'THE WORK BEHIND THE WORK'))}</span><a class="pd-close" href="${localizedPath(locale,'/#home')}">${esc(text(locale,'Back to portfolio'))}</a></header><main><article class="pd-dialog"><header class="pd-header"><div class="pd-meta"><span>${esc(text(locale,data.label))}</span><span class="pd-status">${esc(text(locale,data.status))}</span></div><h1>${esc(text(locale,page.name))}</h1><p>${esc(text(locale,page.summary))}</p>${links(data.links||[],locale)}</header><div class="pd-body">${body}</div><footer class="pd-footer"><span>${esc(text(locale,'BUILD NOTES BY HIKARI BRANDAN'))}</span><a href="${localizedPath(locale,'/#contact')}">${esc(text(locale,'Let’s talk'))}</a></footer></article></main>`;
}
const home = {path:'/',title:'Hikari Brandan — AI Product Developer | Shipped Products & Experiments',summary:'Hikari Brandan is an AI Product Developer and product builder based in Córdoba, Argentina. Explore UGC Camera, MenuTap, FoodSpot Mobile, independent macOS apps and real-world business execution.',image:'/assets/hikari-brandan-social-share-v2.jpg',imageAlt:'Hikari Brandan — AI Product Developer portfolio featuring UGC Camera, MenuTap, B2B SaaS, web and mobile product development.',imageWidth:1200,imageHeight:630};
// All data and renderer dependencies are build-only, outside the client entry.
try {
  await build({build:{ssr:'scripts/prerender-entry.jsx',outDir:'.seo-build',emptyOutDir:true},logLevel:'warn'});
  const {renderHome} = await import(pathToFileURL(resolve('.seo-build/prerender-entry.js')));
  const template = await readFile('dist/index.html','utf8');
  const baseTemplate = template.replace(/<title>[\s\S]*?<\/title>/g,'').replace(/<meta\b(?=[^>]*(?:name="(?:description|twitter:[^"]+|robots)"|property="og:[^"]+"))[^>]*>/g,'').replace(/<link\b[^>]*rel="canonical"[^>]*>/g,'');
  const home = {path:'/',title:'Hikari Brandan — AI Product Developer | Shipped Products & Experiments',summary:'Hikari Brandan is an AI Product Developer and product builder based in Córdoba, Argentina. Explore UGC Camera, MenuTap, FoodSpot Mobile, independent macOS apps and real-world business execution.',image:'/assets/hikari-brandan-social-share-v2.jpg',imageAlt:'Hikari Brandan — AI Product Developer portfolio featuring UGC Camera, MenuTap, B2B SaaS, web and mobile product development.',imageWidth:1200,imageHeight:630};
  const rootStyles = `<style>.prerender-mobile{display:none}@media(max-width:767px){.prerender-mobile{display:block}.prerender-desktop{display:none}}</style>\n<noscript><style>#root [style*="opacity:0"]{opacity:1!important}#root .headline-line>span{transform:none!important}.deferred-background{opacity:1!important}.prerender-mobile .mp-product-art{background-image:linear-gradient(0deg,#fffc,transparent 60%),url(/assets/mobile/cafe-background.jpg)}.prerender-mobile .mp-ugc-art{background-image:linear-gradient(0deg,#fffc,transparent 65%),url(/assets/ugc-sugar-crumb.webp)}</style></noscript>`;
  const originalLocale = globalThis.__PORTFOLIO_LOCALE;
  for (const locale of languages.map(language=>language.code)) {
    globalThis.__PORTFOLIO_LOCALE = locale;
    let html = baseTemplate.replace(/<html lang="[^"]+"/,'<html lang="'+languageTag(locale)+'"');
    const graph = [website(locale),person,...pages.flatMap(page=>entities(page,locale))];
    html = html.replace('</head>',`${metadata(home,graph,true,locale)}\n${rootStyles}\n</head>`);
    html = html.replace('<div id="root"></div>',`<div id="root">${renderHome()}</div>`);
    const output = locale === 'en' ? 'dist/index.html' : `dist${localePrefix(locale)}/index.html`;
    await mkdir(dirname(output),{recursive:true});
    await writeFile(output,html);
  }
  globalThis.__PORTFOLIO_LOCALE = originalLocale;

  const fontCss = (await readFile('src/styles.css','utf8')).split(':root')[0];
  const drawerCss = await readFile('src/drawer.css','utf8');
  await writeFile('dist/assets/evidence.css',`${fontCss}\n*{box-sizing:border-box}body{margin:0;font-family:Body,Arial,sans-serif;background:#121210;color:#1b1b1b}a{color:inherit}h1,h2,h3,p{margin:0}h1,h2,h3{font-family:Body,Arial,sans-serif}\n${drawerCss}\n.evidence-page .pd-dialog{max-height:none;overflow:visible;width:min(1050px,calc(100% - 48px));margin:32px auto}.pd-header h1{margin:24px 0 21px;font-size:clamp(36px,4.5vw,63px);line-height:1.02;letter-spacing:-.055em}.pd-section-label h2{font-size:14px;line-height:1.4}.pd-section-copy h3{font-size:13px;margin:16px 0 8px}.pd-close{text-decoration:none}.evidence-language{display:flex;justify-content:flex-end;gap:8px;width:min(1050px,calc(100% - 48px));margin:18px auto 0}.evidence-language a{padding:8px 12px;border:1px solid #ffffff38;border-radius:20px;color:#fff;text-decoration:none;font-size:12px}.evidence-language a[aria-current]{color:#171710;background:#ffe100;border-color:#ffe100}a:focus-visible{outline:3px solid #ffe100;outline-offset:4px}@media(max-width:760px){.evidence-page .pd-dialog{width:calc(100% - 24px);margin:12px auto}.pd-header h1{font-size:34px}.pd-toolbar{position:static}.evidence-language{width:calc(100% - 24px)}}`);

  for (const page of pages) {
    await stat(`public${page.image}`);
    for (const locale of languages.map(language=>language.code)) {
      const path = localizedPath(locale,page.path);
      const filename = `dist${path}.html`;
      await mkdir(dirname(filename),{recursive:true});
      const pageGraph = [website(locale),person,...entities(page,locale)];
      const markup = `<!doctype html><html lang="${languageTag(locale)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${metadata(page,pageGraph,true,locale)}<link rel="icon" href="/favicon.svg"><link rel="stylesheet" href="/assets/evidence.css"></head><body class="evidence-page">${pageBody(page,locale)}</body></html>`;
      await writeFile(filename,markup);
    }
  }

  const ugcSource = await readFile('public/ugc-for-ai-startups.html','utf8');
  for (const locale of languages.map(language=>language.code)) {
    const path = '/ugc-for-ai-startups';
    let markup = localizeMarkup(ugcSource,locale).replace('<html lang="en">',`<html lang="${languageTag(locale)}">`);
    markup = markup.replace(/<link rel="canonical" href="[^"]+">/,`<link rel="canonical" href="${absolute(localizedPath(locale,path))}">`);
    markup = markup.replace(/<meta property="og:url" content="[^"]+">/,`<meta property="og:url" content="${absolute(localizedPath(locale,path))}">`);
    const alternates = languages.map(language=>`<link rel="alternate" hreflang="${languageTag(language.code)}" href="${absolute(localizedPath(language.code,path))}">`).join('');
    markup = markup.replace('</head>',`${alternates}\n</head>`);
    markup = markup.replace(/href="(\/(?:#|$|ugc-for-ai-startups(?:\.html)?(?:$|\?)))/g,(whole,href)=>`href="${localizedPath(locale,href.slice(0,href.indexOf('?')<0?undefined:href.indexOf('?')))}${href.includes('?')?href.slice(href.indexOf('?')):''}"`);
    markup = markup.replace(/<details class="ugc-language">[\s\S]*?<\/details>/,ugcLanguageControl(locale,path));
    const destination = `dist${localizedPath(locale,path)}.html`;
    await mkdir(dirname(destination),{recursive:true});
    await writeFile(destination,markup);
  }

  await writeFile('dist/404.html','<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found — Hikari Brandan</title><meta name="robots" content="noindex, follow"><link rel="stylesheet" href="/assets/evidence.css"></head><body class="evidence-page"><main class="pd-header"><h1>Page not found.</h1><p>This address doesn’t have a portfolio page.</p><a class="pd-link" href="/">Back to portfolio</a></main></body></html>');
  await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\n\n# OAI-SearchBot, PerplexityBot and Claude-SearchBot inherit public access.\n# No change to model-training crawler policy.\nSitemap: ${origin}/sitemap.xml\n`);
  const paths = preview ? [] : [
    ...languages.flatMap(language=>['/',...pages.map(page=>page.path),'/ugc-for-ai-startups'].map(path=>localizedPath(language.code,path))),
    '/Hikari_Brandan_Resume.pdf'
  ];
  await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path=>`<url><loc>${absolute(path)}</loc></url>`).join('')}</urlset>`);
  console.log(`Generated ${languages.length} language routes, localized evidence and UGC pages, metadata, entity graph, robots and sitemap (${preview?'preview noindex':'production indexable'}).`);

} finally { await rm('.seo-build',{recursive:true,force:true}); }
