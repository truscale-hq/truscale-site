import { maxSpans, checkSpan, formatFtIn, parseFtIn, SPECIES } from './lib/span.js';

const lang = document.documentElement.lang === 'es' ? 'es' : 'en';
const nf = new Intl.NumberFormat(lang === 'es' ? 'es-US' : 'en-US', { maximumFractionDigits: 0 });
const T = {
  en: {
    bending: 'Bending',
    shear: 'Shear',
    deflection: (lim) => `Deflection, L/${lim}`,
    governs: (k) => `Governed by ${k.toLowerCase()}.`,
    gov: 'Governs',
    pass: 'Pass',
    fail: 'Fail',
    passAll: (s) => `${s} passes all three checks.`,
    failAny: (s) => `${s} does not pass. Go up a size or tighten the spacing.`,
    badSpan: 'Enter the span as feet and inches, like 13\'-6".',
    values: (u, sp) => `${sp}. Fb' = ${nf.format(u.Fb)} psi (${nf.format(u.FbRef)} x CF ${u.CF} x Cr ${u.Cr} x CD ${u.CD}), Fv' = ${nf.format(u.Fv)} psi, E = ${nf.format(u.E)} psi. Loads ${u.live} psf live and ${u.dead} psf dead.`,
  },
  es: {
    bending: 'Flexión',
    shear: 'Cortante',
    deflection: (lim) => `Deflexión, L/${lim}`,
    governs: (k) => `Manda la ${k.toLowerCase()}.`,
    gov: 'Manda',
    pass: 'Pasa',
    fail: 'No pasa',
    passAll: (s) => `${s} pasa las tres revisiones.`,
    failAny: (s) => `${s} no pasa. Suba una medida o cierre la separación.`,
    badSpan: 'Escriba el claro en pies y pulgadas, como 13\'-6".',
    values: (u, sp) => `${sp}. Fb' = ${nf.format(u.Fb)} psi (${nf.format(u.FbRef)} x CF ${u.CF} x Cr ${u.Cr} x CD ${u.CD}), Fv' = ${nf.format(u.Fv)} psi, E = ${nf.format(u.E)} psi. Cargas ${u.live} psf viva y ${u.dead} psf muerta.`,
  },
}[lang];

const form = document.getElementById('span-form');
const $ = (id) => document.getElementById(id);

function render() {
  const fd = new FormData(form);
  const opts = {
    species: fd.get('species'),
    size: fd.get('size'),
    spacing: parseFloat(fd.get('spacing')),
    preset: fd.get('preset'),
  };
  const r = maxSpans(opts);
  const labels = { bending: T.bending, shear: T.shear, deflection: T.deflection(r.used.limit) };
  $('out-span').textContent = formatFtIn(r.max);
  $('out-governs').textContent = T.governs({ bending: T.bending, shear: T.shear, deflection: lang === 'es' ? 'Deflexión' : 'Deflection' }[r.governs]);

  const spanText = String(fd.get('span') || '').trim();
  const spanIn = spanText ? parseFtIn(spanText) : NaN;
  let chk = null;
  if (spanText && !Number.isFinite(spanIn)) {
    $('out-check').textContent = T.badSpan;
  } else if (Number.isFinite(spanIn)) {
    chk = checkSpan(opts, spanIn);
    const s = formatFtIn(spanIn);
    $('out-check').textContent = chk.pass ? T.passAll(s) : T.failAny(s);
  } else {
    $('out-check').textContent = '';
  }
  $('th-ratio').style.display = chk ? '' : 'none';

  const body = $('checks-body');
  body.textContent = '';
  for (const k of ['bending', 'shear', 'deflection']) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.textContent = labels[k] + ' ';
    if (k === r.governs) {
      const p = document.createElement('span');
      p.className = 'pill gov';
      p.textContent = T.gov;
      td1.appendChild(p);
    }
    const td2 = document.createElement('td');
    td2.textContent = formatFtIn(r.spans[k]);
    tr.append(td1, td2);
    if (chk) {
      const td3 = document.createElement('td');
      const ok = chk.ratios[k] <= 1;
      const p = document.createElement('span');
      p.className = 'pill ' + (ok ? 'pass' : 'fail');
      p.textContent = `${ok ? T.pass : T.fail} ${Math.round(chk.ratios[k] * 100)}%`;
      td3.appendChild(p);
      tr.appendChild(td3);
    }
    body.appendChild(tr);
  }
  $('out-values').textContent = T.values(r.used, SPECIES[opts.species].name[lang] + ' ' + opts.size);
}

form.addEventListener('input', render);
form.addEventListener('change', render);
form.addEventListener('submit', (e) => e.preventDefault());
render();
