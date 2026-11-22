// Joist and rafter span quick check from first principles (NDS allowable
// stress design, simply supported, uniform load). Pure functions, no DOM.
//
// Quick reference, not a design. A Texas licensed PE must design the structure.
//
// Checks:
//   Bending:     M = wL^2/8 <= Fb' S        Fb' = Fb x CF x Cr x CD
//   Shear:       V = wL/2   <= Fv' (2A/3)    Fv' = Fv x CD
//   Deflection:  5 w_live L^4 / (384 E I) <= L / limit
// Deflection uses live load only. Rafter spans are horizontal projection.

// Dressed sizes in inches.
export const SIZES = {
  '2x4': { b: 1.5, d: 3.5 },
  '2x6': { b: 1.5, d: 5.5 },
  '2x8': { b: 1.5, d: 7.25 },
  '2x10': { b: 1.5, d: 9.25 },
  '2x12': { b: 1.5, d: 11.25 },
};

// Reference design values, psi. Southern Pine values are the size-specific
// values in NDS Supplement Table 4B (2013 and later), which already include
// size effects (CF = 1.0). Douglas Fir-Larch values are NDS Supplement Table 4A
// base values, with the size factor CF applied below.
export const SPECIES = {
  'sp-2': {
    name: { en: 'Southern Pine No. 2', es: 'Pino del sur No. 2' },
    E: 1400000,
    Fv: 175,
    Fb: { '2x4': 1100, '2x6': 1000, '2x8': 925, '2x10': 800, '2x12': 750 },
    CF: { '2x4': 1, '2x6': 1, '2x8': 1, '2x10': 1, '2x12': 1 },
  },
  'dfl-1': {
    name: { en: 'Douglas Fir-Larch No. 1', es: 'Douglas Fir-Larch No. 1' },
    E: 1700000,
    Fv: 180,
    Fb: { '2x4': 1000, '2x6': 1000, '2x8': 1000, '2x10': 1000, '2x12': 1000 },
    CF: { '2x4': 1.5, '2x6': 1.3, '2x8': 1.2, '2x10': 1.1, '2x12': 1.0 },
  },
  'dfl-2': {
    name: { en: 'Douglas Fir-Larch No. 2', es: 'Douglas Fir-Larch No. 2' },
    E: 1600000,
    Fv: 180,
    Fb: { '2x4': 900, '2x6': 900, '2x8': 900, '2x10': 900, '2x12': 900 },
    CF: { '2x4': 1.5, '2x6': 1.3, '2x8': 1.2, '2x10': 1.1, '2x12': 1.0 },
  },
};

// Load presets. CD is the load duration factor for the governing combination.
export const PRESETS = {
  'floor-40': { kind: 'floor', live: 40, dead: 10, limit: 360, CD: 1.0 },
  'floor-30': { kind: 'floor', live: 30, dead: 10, limit: 360, CD: 1.0 },
  'floor-40-tile': { kind: 'floor', live: 40, dead: 20, limit: 360, CD: 1.0 },
  'roof-20-10': { kind: 'rafter', live: 20, dead: 10, limit: 240, CD: 1.25 },
  'roof-20-15': { kind: 'rafter', live: 20, dead: 15, limit: 240, CD: 1.25 },
};

export const SPACINGS = [12, 16, 19.2, 24];
export const REPETITIVE_MEMBER = 1.15;

export function section(size) {
  const s = SIZES[size];
  if (!s) throw new Error('Unknown size ' + size);
  return {
    A: s.b * s.d,
    S: (s.b * s.d * s.d) / 6,
    I: (s.b * s.d ** 3) / 12,
  };
}

// Returns allowable spans in inches for each check and the governing one.
export function maxSpans({ species = 'sp-2', size = '2x8', spacing = 16, live, dead, limit, CD, preset }) {
  const p = preset ? PRESETS[preset] : null;
  const LL = live ?? p?.live;
  const DL = dead ?? p?.dead;
  const lim = limit ?? p?.limit;
  const cd = CD ?? p?.CD ?? 1.0;
  const sp = SPECIES[species];
  if (!sp) throw new Error('Unknown species ' + species);
  const { A, S, I } = section(size);

  const wTotal = ((LL + DL) * spacing) / 144; // lb per inch of span
  const wLive = (LL * spacing) / 144;

  const Fb = sp.Fb[size] * sp.CF[size] * REPETITIVE_MEMBER * cd;
  const Fv = sp.Fv * cd;
  const E = sp.E;

  const bending = Math.sqrt((8 * Fb * S) / wTotal);
  const shear = (2 * Fv * ((2 * A) / 3)) / wTotal;
  const deflection = Math.cbrt((384 * E * I) / (5 * lim * wLive));

  const spans = { bending, shear, deflection };
  let governs = 'bending';
  for (const k of Object.keys(spans)) if (spans[k] < spans[governs]) governs = k;

  return {
    spans,
    governs,
    max: spans[governs],
    used: { Fb, Fv, E, FbRef: sp.Fb[size], FvRef: sp.Fv, CD: cd, Cr: REPETITIVE_MEMBER, CF: sp.CF[size], wTotal, wLive, limit: lim, live: LL, dead: DL },
  };
}

// Check a given span (inches). Ratio over 1.0 fails.
export function checkSpan(opts, spanIn) {
  const r = maxSpans(opts);
  const ratios = {};
  for (const k of Object.keys(r.spans)) {
    // Demand over capacity for each check at the entered span.
    const L = spanIn;
    const cap = r.spans[k];
    ratios[k] = k === 'bending' ? (L / cap) ** 2 : k === 'shear' ? L / cap : (L / cap) ** 3;
  }
  const pass = Object.values(ratios).every((x) => x <= 1);
  return { ...r, ratios, pass };
}

// 157.25 in -> 13'-1". Rounds down to the inch, which is conservative.
export function formatFtIn(inches) {
  const whole = Math.floor(inches + 1e-9);
  const ft = Math.floor(whole / 12);
  const inch = whole - ft * 12;
  return `${ft}'-${inch}"`;
}

export function parseFtIn(text) {
  if (text == null) return NaN;
  const s = String(text).trim();
  if (!s) return NaN;
  const m = s.match(/^(\d+(?:\.\d+)?)\s*(?:'|ft)?\s*-?\s*(?:(\d+(?:\.\d+)?)\s*(?:"|in)?)?$/i);
  if (!m) return NaN;
  const ft = parseFloat(m[1]);
  const inch = m[2] ? parseFloat(m[2]) : 0;
  if (!/['f]/i.test(s) && !m[2]) return ft * 12; // bare number means feet
  return ft * 12 + inch;
}
