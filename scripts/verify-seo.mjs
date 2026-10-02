import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { origin, pages } from './seo-data.mjs';

const preview = !!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production';
const paths = ['/', ...pages.map(page => page.path)];
for (const path of paths) {
  const html = await readFile(path === '/' ? 'dist/index.html' : `dist${path}.html`, 'utf8');
  assert.equal((html.match(/<title>/g) || []).length, 1, `${path}: unique title`);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `${path}: unique canonical`);
  assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`), `${path}: self canonical`);
  for (const name of ['description', 'og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt']) {
    assert.match(html, new RegExp(`<meta (?:name|property)="${name}" content="[^"]+"`), `${path}: ${name}`);
  }
  assert.ok(html.includes(`name="robots" content="${preview ? 'noindex' : 'index'}, follow"`), `${path}: indexing policy`);
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  assert.equal(graphs.length, 1, `${path}: one entity graph`);
  const graph = JSON.parse(graphs[0][1])['@graph'];
  const ids = new Set(graph.map(entity => entity['@id']));
  assert.equal(ids.size, graph.length, `${path}: unique entity identifiers`);
  function checkRelationships(value) {
    if (Array.isArray(value)) return value.forEach(checkRelationships);
    if (!value || typeof value !== 'object') return;
    if (Object.keys(value).length === 1 && value['@id']) assert.ok(ids.has(value['@id']), `${path}: resolved entity ${value['@id']}`);
    Object.values(value).forEach(checkRelationships);
  }
  checkRelationships(graph);
  const person = graph.find(entity => entity['@type'] === 'Person');
  assert.equal(person['@id'], `${origin}/#hikari-brandan`, `${path}: stable person`);
  assert.equal(person.name, 'Hikari Brandan');
  assert.ok(!person.worksFor && !person.founder, `${path}: no invented employment or founder relationship`);
  if (path === '/') {
    assert.ok(!html.includes('<div id="root"></div>'), 'Initial portfolio HTML must contain content');
    const headline = html.match(/<h1[^>]*>.*?<\/h1>/s)[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    assert.equal(headline, 'I BUILD PRODUCTS FROM PROBLEMS OTHER PEOPLE OVERLOOK.');
  } else {
    assert.equal((html.match(/<h1>/g) || []).length, 1, `${path}: one primary heading`);
    assert.ok(!html.includes('type="module"'), `${path}: evidence needs no client JavaScript`);
    for (const related of pages) assert.ok(html.includes(`href="${related.path}"`), `${path}: linked evidence ${related.path}`);
  }
}
for (const page of pages) await access(`dist${page.image}`);
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.deepEqual(urls, preview ? [] : [...paths, '/Hikari_Brandan_Resume.pdf'].map(path => `${origin}${path}`));
assert.ok(!sitemap.includes('lastmod'), 'No fabricated modification timestamps');
const robots = await readFile('dist/robots.txt', 'utf8');
assert.ok(robots.includes('User-agent: *\nAllow: /'));
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
const routeFor = path => config.routes.find(route => new RegExp(route.src).test(path));
assert.equal(routeFor('/api/contact').headers['X-Robots-Tag'], 'noindex, nofollow');
for (const path of ['/missing-page', '/admin', '/auth/callback', '/projects/menutap/unknown']) assert.equal(routeFor(path).status, 404, `${path}: real 404`);
assert.equal(routeFor('/projects/menutap/').status, 308);
assert.equal(routeFor('/projects/menutap.html').status, 308);
console.log(`Verified ${paths.length} HTML pages, entity relationships, metadata, sitemap, crawler policy and route boundaries (${preview ? 'preview' : 'production'}).`);
