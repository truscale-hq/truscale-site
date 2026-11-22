// Headless Chrome screenshots of every page at 1440x900 and 390x844.
// Serves dist/ on localhost, drives Chrome over the DevTools protocol with the
// WebSocket built into Node 22. No outside network access.
//
//   node scripts/shoot.mjs [outDir]

import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = process.argv[2] || join(ROOT, 'shots');
const PORT = 8765;
const CDP_PORT = 9333;
mkdirSync(OUT, { recursive: true });

const PAGES = ['index', 'features', 'tools', 'deal-calculator', 'house-facing', 'span-check', 'pricing', 'beta', 'about', 'contact', 'privacy', 'terms', '404'];
const ES_PAGES = ['index', 'deal-calculator'];
const VIEWPORTS = [
  { name: '1440x900', width: 1440, height: 900, mobile: false, scale: 1 },
  { name: '390x844', width: 390, height: 844, mobile: true, scale: 2 },
];
const EXTRA = process.env.SHOT_EXTRA === '1';

const server = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1', '--directory', join(ROOT, 'dist')], { stdio: 'ignore' });
const profile = join('/tmp', 'shoot-profile-' + process.pid);
const chrome = spawn('google-chrome', [
  '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
  `--remote-debugging-port=${CDP_PORT}`, `--user-data-dir=${profile}`, '--proxy-server=direct://', '--proxy-bypass-list=*', 'about:blank',
], { stdio: 'ignore' });

async function getWsUrl() {
  for (let i = 0; i < 50; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`);
      const list = await r.json();
      const page = list.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(200);
  }
  throw new Error('Chrome did not start');
}

const ws = new WebSocket(await getWsUrl());
await new Promise((res) => ws.addEventListener('open', res, { once: true }));
let seq = 0;
const pending = new Map();
const listeners = [];
const consoleMsgs = [];
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  } else if (msg.method) {
    if (msg.method === 'Runtime.consoleAPICalled') consoleMsgs.push(msg.params.type + ': ' + msg.params.args.map((a) => a.value).join(' '));
    if (msg.method === 'Runtime.exceptionThrown') consoleMsgs.push('exception: ' + msg.params.exceptionDetails.text + ' ' + (msg.params.exceptionDetails.exception?.description || ''));
    if (msg.method === 'Network.requestWillBeSent') {
      const u = msg.params.request.url;
      if (!u.startsWith(`http://127.0.0.1:${PORT}`) && !u.startsWith('data:')) consoleMsgs.push('EXTERNAL REQUEST: ' + u);
    }
    for (const l of listeners) l(msg);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
const waitFor = (method) => new Promise((res) => {
  const l = (m) => { if (m.method === method) { listeners.splice(listeners.indexOf(l), 1); res(m); } };
  listeners.push(l);
});

await send('Page.enable');
await send('Runtime.enable');
await send('Network.enable');

async function shoot(url, file, vp, setup) {
  await send('Emulation.setDeviceMetricsOverride', { width: vp.width, height: vp.height, deviceScaleFactor: vp.scale, mobile: vp.mobile });
  await send('Emulation.setTouchEmulationEnabled', { enabled: vp.mobile });
  const loaded = waitFor('Page.loadEventFired');
  await send('Page.navigate', { url });
  await loaded;
  await send('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => true)', awaitPromise: true });
  if (setup) await send('Runtime.evaluate', { expression: setup, awaitPromise: true });
  // Load lazy images by scrolling through the page.
  await send('Runtime.evaluate', {
    expression: `(async () => { for (const img of document.images) img.loading = 'eager'; const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 30)); } window.scrollTo(0, 0); await Promise.all([...document.images].map(i => i.complete ? 1 : new Promise(r => { i.onload = i.onerror = r; }))); return true; })()`,
    awaitPromise: true,
  });
  await sleep(250);
  const { result } = await send('Runtime.evaluate', { expression: 'Math.ceil(document.documentElement.scrollHeight)', returnByValue: true });
  const height = result.value;
  // Grow the viewport to the full page so every image is painted.
  await send('Emulation.setDeviceMetricsOverride', { width: vp.width, height, deviceScaleFactor: vp.scale, mobile: vp.mobile });
  await send('Runtime.evaluate', { expression: `Promise.all([...document.images].map(i => i.decode().catch(() => 0))).then(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))`, awaitPromise: true });
  await sleep(300);
  const shot = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: vp.width, height, scale: 1 },
  });
  writeFileSync(join(OUT, file), Buffer.from(shot.data, 'base64'));
  // Overflow check: nothing wider than the viewport.
  const { result: ov } = await send('Runtime.evaluate', { expression: 'document.documentElement.scrollWidth', returnByValue: true });
  if (ov.value > vp.width) consoleMsgs.push(`OVERFLOW ${file}: scrollWidth ${ov.value} > ${vp.width}`);
  return file;
}

const made = [];
const base = `http://127.0.0.1:${PORT}`;
for (const vp of VIEWPORTS) {
  for (const p of PAGES) made.push(await shoot(`${base}/${p}.html`, `en_${p}_${vp.name}.png`, vp));
  for (const p of ES_PAGES) made.push(await shoot(`${base}/es/${p}.html`, `es_${p}_${vp.name}.png`, vp));
}
if (EXTRA) {
  const vp = VIEWPORTS[1];
  made.push(await shoot(`${base}/index.html`, 'extra_menu_open_390x844.png', { ...vp }, `document.querySelector('.menu-btn').click()`));
  made.push(await shoot(`${base}/beta.html`, 'extra_beta_submitted_390x844.png', vp, `(() => { const f = document.getElementById('beta-form'); f.name.value='Test'; f.company.value='Test Co'; f.role.value='builder'; f.city.value='Dallas'; f.email.value='test@example.com'; f.volume.value='1-5'; f.firstUse.value='Takeoffs'; f.requestSubmit(); })()`));
  made.push(await shoot(`${base}/span-check.html`, 'extra_span_with_input_1440x900.png', VIEWPORTS[0], `(() => { const s = document.getElementById('span'); s.value = "13'-6\\""; s.dispatchEvent(new Event('input', { bubbles: true })); })()`));
  made.push(await shoot(`${base}/deal-calculator.html`, 'extra_deal_go_1440x900.png', VIEWPORTS[0], `(() => { const s = document.getElementById('purchase'); s.value = '150,000'; s.dispatchEvent(new Event('input', { bubbles: true })); })()`));
}

ws.close();
chrome.kill();
server.kill();
rmSync(profile, { recursive: true, force: true });
writeFileSync(join(OUT, 'console.log'), consoleMsgs.join('\n') + '\n');
console.log(made.length + ' screenshots in ' + OUT);
if (consoleMsgs.length) console.log('Console and checks:\n' + consoleMsgs.join('\n'));
