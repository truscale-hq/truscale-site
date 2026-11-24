// Static build. Node 18+ with no dependencies, plus python3 with Pillow for
// the screenshot prep step.
//
//   node scripts/build.mjs            full build to dist/
//   SKIP_IMAGES=1 node scripts/build.mjs   reuse dist/img from the last build

import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { layout, esc } from '../src/layout.mjs';
import { PAGES } from '../src/pages/index.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const config = JSON.parse(readFileSync(join(ROOT, 'site.config.json'), 'utf8'));
const B = config.brandName;

const keepImages = process.env.SKIP_IMAGES === '1' && existsSync(join(DIST, 'img')) && existsSync(join(ROOT, '.img-manifest.json'));
let savedImg = null;
if (keepImages) {
  savedImg = join(ROOT, '.img-cache');
  rmSync(savedImg, { recursive: true, force: true });
  cpSync(join(DIST, 'img'), savedImg, { recursive: true });
}
rmSync(DIST, { recursive: true, force: true });
mkdirSync(join(DIST, 'es'), { recursive: true });

// Static assets
cpSync(join(ROOT, 'src', 'assets'), join(DIST, 'assets'), { recursive: true });
cpSync(join(ROOT, 'src', 'fonts'), join(DIST, 'assets', 'fonts'), { recursive: true });

// Sample-data demo of the app, served at /demo/ (built from the app repo with sample data).
if (existsSync(join(ROOT, 'site-demo', 'index.html'))) {
  cpSync(join(ROOT, 'site-demo'), join(DIST, 'demo'), { recursive: true });
}

// Screenshots and the Open Graph image
const IMG = join(DIST, 'img');
const manifestPath = join(IMG, 'manifest.json');
const committedImg = join(ROOT, 'site-img');
if (!savedImg && existsSync(join(committedImg, 'manifest.json'))) {
  // Hosted builds (Render) use the prepared, name-free images committed in site-img/.
  cpSync(committedImg, IMG, { recursive: true });
} else if (savedImg) {
  cpSync(savedImg, IMG, { recursive: true });
  rmSync(savedImg, { recursive: true, force: true });
  cpSync(join(ROOT, '.img-manifest.json'), manifestPath);
} else {
  mkdirSync(IMG, { recursive: true });
  execFileSync('python3', [join(ROOT, 'scripts', 'prep_images.py'), IMG, manifestPath], { stdio: 'inherit' });
}
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

// Favicon: first letter of the brand, type only.
writeFileSync(
  join(DIST, 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="10" fill="#1B1D1F"/><text x="32" y="46" text-anchor="middle" font-family="Inter Tight, Inter, Arial, sans-serif" font-weight="800" font-size="42" fill="#F2C21B">${esc(B.charAt(0))}</text></svg>\n`,
);

function makeCtx(lang) {
  const root = lang === 'es' ? '../' : '';
  const L = (en, es) => (lang === 'es' ? es : en);
  const shot = (name, alt, opts = {}) => {
    const m = manifest[name];
    if (!m) throw new Error('Missing image ' + name);
    const src = `${root}img/${name}.webp`;
    const srcset = m.small ? ` srcset="${root}img/${name}-720.webp 720w, ${src} ${m.w}w" sizes="${opts.sizes || '(max-width: 960px) 100vw, 60vw'}"` : '';
    const loading = opts.eager ? ' fetchpriority="high"' : ' loading="lazy"';
    return `<img src="${src}"${srcset} width="${m.w}" height="${m.h}" alt="${esc(alt)}"${loading} decoding="async">`;
  };
  const frame = (name, alt, caption, opts = {}) =>
    `<figure class="frame"><div class="bar" aria-hidden="true"><i></i><i></i><i></i></div>${shot(name, alt, opts)}</figure>${caption ? `<p class="small muted" style="margin-top:10px">${caption}</p>` : ''}`;
  return { lang, root, L, B, config, shot, frame, esc };
}

const written = [];
for (const lang of ['en', 'es']) {
  const ctx = makeCtx(lang);
  for (const page of PAGES) {
    const body = page.body(ctx);
    const html = layout(ctx, page, body);
    const file = page.slug === 'index' ? 'index.html' : `${page.slug}.html`;
    const out = lang === 'es' ? join(DIST, 'es', file) : join(DIST, file);
    writeFileSync(out, html);
    written.push(out);
  }
}

// Drop screenshots no page uses.
{
  const html = written.map((f) => readFileSync(f, 'utf8')).join('\n');
  for (const f of readdirSync(IMG)) {
    if (f === 'og.png' || f === 'manifest.json') continue;
    if (!html.includes(`img/${f}`)) rmSync(join(IMG, f));
  }
}

// sitemap.xml and robots.txt
const site = config.siteUrl.replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);
const urls = PAGES.filter((p) => !p.noindex).map((p) => {
  const f = p.slug === 'index' ? '' : `${p.slug}.html`;
  const en = `${site}/${f}`;
  const es = `${site}/es/${f}`;
  const alt = `<xhtml:link rel="alternate" hreflang="en" href="${en}"/><xhtml:link rel="alternate" hreflang="es" href="${es}"/>`;
  return `  <url><loc>${en}</loc><lastmod>${today}</lastmod>${alt}</url>\n  <url><loc>${es}</loc><lastmod>${today}</lastmod>${alt}</url>`;
});
writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
);
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);

// Remove the manifest from the published output after use.
rmSync(manifestPath, { force: true });
writeFileSync(join(ROOT, '.img-manifest.json'), JSON.stringify(manifest, null, 1));

// Guards: no dashes the conventions forbid, no names that must not appear,
// no external URLs loaded at runtime.
const BANNED = [
  [/[–—]/, 'en or em dash'],
  [/alpha heating/i, 'company name'],
  [/\bnatalie\b|\bortiz\b/i, 'personal name'],
  [/vivian/i, 'real street address'],
  [/plandesk/i, 'internal code name'],
  [/→/, 'arrow glyph'],
];
function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}
const problems = [];
for (const f of walk(DIST)) {
  if (!/\.(html|css|js|xml|txt|svg)$/.test(f)) continue;
  const text = readFileSync(f, 'utf8');
  const inDemo = f.includes(join(DIST, 'demo'));
  for (const [re, label] of BANNED) {
    if (inDemo && label === 'arrow glyph') continue; // keyboard-help arrows inside the app demo
    if (re.test(text)) problems.push(`${f}: ${label}`);
  }
  if (/\.html$/.test(f)) {
    const ext = text.match(/(?:src|href)="https?:\/\/[^"]+"/g) || [];
    const bad = ext.filter((m) => !m.startsWith(`href="${site}`));
    if (bad.length) problems.push(`${f}: external URL ${bad.join(', ')}`);
  }
}
for (const f of walk(join(ROOT, 'src'))) {
  if (!/\.(mjs|js|css)$/.test(f)) continue;
  const text = readFileSync(f, 'utf8');
  if (/[–—]/.test(text)) problems.push(`${f}: en or em dash in source`);
}
if (problems.length) {
  console.error('Build checks failed:\n' + problems.join('\n'));
  process.exit(1);
}
console.log(`Built ${written.length} pages to ${DIST}`);
