import { facing, normalizeBearing, headingFromEvent, sunNote, NAMES, SHORT, POINTS } from './lib/facing.js';

const lang = document.documentElement.lang === 'es' ? 'es' : 'en';
const T = {
  en: {
    deg: (d) => `${d} degrees`,
    asking: 'Asking for compass access.',
    denied: 'Compass access was not allowed. Type the bearing or use the dial instead.',
    unsupported: 'This browser does not share a compass heading. Type the bearing or use the dial.',
    waiting: 'Hold the phone flat and point the top at the street.',
    live: (d) => `Compass: ${d} degrees. Tap the button again to stop.`,
    stopped: 'Compass stopped. The last reading is kept.',
    stop: 'Stop compass',
    start: 'Use my phone compass',
    insecure: 'The phone compass needs the page to load over https.',
  },
  es: {
    deg: (d) => `${d} grados`,
    asking: 'Pidiendo acceso a la brújula.',
    denied: 'No se permitió el acceso a la brújula. Escriba los grados o use el dial.',
    unsupported: 'Este navegador no comparte la dirección de la brújula. Escriba los grados o use el dial.',
    waiting: 'Sostenga el teléfono plano y apunte la parte de arriba hacia la calle.',
    live: (d) => `Brújula: ${d} grados. Toque el botón otra vez para detener.`,
    stopped: 'Brújula detenida. Se guarda la última lectura.',
    stop: 'Detener brújula',
    start: 'Usar la brújula',
    insecure: 'La brújula del teléfono necesita que la página cargue por https.',
  },
}[lang];

const dial = document.getElementById('dial');
const needle = document.getElementById('dial-needle');
const input = document.getElementById('bearing');
const btn = document.getElementById('use-compass');
const status = document.getElementById('compass-status');
const NS = 'http://www.w3.org/2000/svg';

// Ticks every 15 degrees and the 8 point labels.
const ticks = document.getElementById('dial-ticks');
for (let a = 0; a < 360; a += 15) {
  const major = a % 45 === 0;
  const r1 = major ? 122 : 132;
  const rad = ((a - 90) * Math.PI) / 180;
  const l = document.createElementNS(NS, 'line');
  l.setAttribute('x1', 160 + r1 * Math.cos(rad));
  l.setAttribute('y1', 160 + r1 * Math.sin(rad));
  l.setAttribute('x2', 160 + 146 * Math.cos(rad));
  l.setAttribute('y2', 160 + 146 * Math.sin(rad));
  l.setAttribute('stroke', '#1B1D1F');
  l.setAttribute('stroke-width', major ? 2.5 : 1);
  ticks.appendChild(l);
}
const labels = document.getElementById('dial-labels');
POINTS.forEach((p, i) => {
  const rad = ((i * 45 - 90) * Math.PI) / 180;
  const t = document.createElementNS(NS, 'text');
  const r = 100;
  t.setAttribute('x', 160 + r * Math.cos(rad));
  t.setAttribute('y', 160 + r * Math.sin(rad) + 7);
  t.setAttribute('font-size', p.length === 1 ? 22 : 15);
  t.textContent = SHORT[lang][p];
  labels.appendChild(t);
});

let bearing = 180;

function render(b, { fromInput = false } = {}) {
  bearing = Math.round(normalizeBearing(b)) % 360;
  const f = facing(bearing);
  needle.setAttribute('transform', `rotate(${bearing} 160 160)`);
  dial.setAttribute('aria-valuenow', String(bearing));
  dial.setAttribute('aria-valuetext', `${T.deg(bearing)}, ${NAMES[lang][f.front]}`);
  if (!fromInput) input.value = String(bearing);
  document.getElementById('out-front').textContent = NAMES[lang][f.front];
  document.getElementById('out-back').textContent = NAMES[lang][f.back];
  const note = sunNote(f.back, lang);
  const lead = lang === 'es' ? `Patio al ${NAMES.es[f.back].toLowerCase()}. ` : `Backyard faces ${NAMES.en[f.back].toLowerCase()}. `;
  document.getElementById('out-note').textContent = lead + note;
}

input.addEventListener('input', () => {
  const n = parseFloat(input.value);
  if (Number.isFinite(n)) render(n, { fromInput: true });
});
input.addEventListener('change', () => render(parseFloat(input.value) || 0));

// Dial: pointer drag and keyboard.
function angleFromPointer(e) {
  const r = dial.getBoundingClientRect();
  const x = e.clientX - (r.left + r.width / 2);
  const y = e.clientY - (r.top + r.height / 2);
  return (Math.atan2(y, x) * 180) / Math.PI + 90;
}
let dragging = false;
dial.addEventListener('pointerdown', (e) => {
  dragging = true;
  dial.setPointerCapture(e.pointerId);
  stopCompass();
  render(angleFromPointer(e));
});
dial.addEventListener('pointermove', (e) => { if (dragging) render(angleFromPointer(e)); });
dial.addEventListener('pointerup', () => { dragging = false; });
dial.addEventListener('pointercancel', () => { dragging = false; });
dial.addEventListener('keydown', (e) => {
  const step = e.shiftKey ? 15 : 1;
  const map = { ArrowRight: step, ArrowUp: step, ArrowLeft: -step, ArrowDown: -step, PageUp: 45, PageDown: -45 };
  if (e.key in map) { e.preventDefault(); stopCompass(); render(bearing + map[e.key]); }
  else if (e.key === 'Home') { e.preventDefault(); stopCompass(); render(0); }
  else if (e.key === 'End') { e.preventDefault(); stopCompass(); render(359); }
});

// Phone compass. Starts only when the user asks, and asks for permission
// where the browser requires it (iOS).
let listening = false;
let gotReading = false;
let evName = null;
function onOrientation(e) {
  const h = headingFromEvent(e);
  if (h == null) return;
  gotReading = true;
  render(h);
  status.textContent = T.live(Math.round(h) % 360);
}
function stopCompass(msg) {
  if (!listening) return;
  window.removeEventListener(evName, onOrientation);
  listening = false;
  btn.textContent = T.start;
  if (msg !== false) status.textContent = T.stopped;
}
btn.addEventListener('click', async () => {
  if (listening) { stopCompass(); return; }
  if (!window.isSecureContext) { status.textContent = T.insecure; return; }
  const DOE = window.DeviceOrientationEvent;
  if (!DOE) { status.textContent = T.unsupported; return; }
  if (typeof DOE.requestPermission === 'function') {
    status.textContent = T.asking;
    try {
      const res = await DOE.requestPermission();
      if (res !== 'granted') { status.textContent = T.denied; return; }
    } catch {
      status.textContent = T.denied;
      return;
    }
  }
  evName = 'ondeviceorientationabsolute' in window ? 'deviceorientationabsolute' : 'deviceorientation';
  window.addEventListener(evName, onOrientation);
  listening = true;
  gotReading = false;
  btn.textContent = T.stop;
  status.textContent = T.waiting;
  setTimeout(() => {
    if (listening && !gotReading) { stopCompass(false); status.textContent = T.unsupported; }
  }, 4000);
});

render(parseFloat(input.value) || 180);
