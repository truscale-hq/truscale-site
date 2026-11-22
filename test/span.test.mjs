import test from 'node:test';
import assert from 'node:assert/strict';
import { maxSpans, checkSpan, formatFtIn, parseFtIn, section } from '../src/assets/js/lib/span.js';

const floor40 = { spacing: 16, live: 40, dead: 10, limit: 360, CD: 1.0 };

test('section properties for a 2x8', () => {
  const s = section('2x8');
  assert.equal(s.A, 10.875);
  assert.ok(Math.abs(s.S - 13.1406) < 1e-3);
  assert.ok(Math.abs(s.I - 47.6348) < 1e-3);
});

// Reference case from the brief: 2x8 and 2x10 at 16 in o.c., 40 psf live,
// 10 psf dead, L/360. These are the published span table values for
// Douglas Fir-Larch No. 1 (E = 1,700,000 psi, Fb = 1,000 psi base).
test('DF-L No. 1 2x8 at 16 in, 40/10, L/360 is 13\'-1" (deflection governs)', () => {
  const r = maxSpans({ species: 'dfl-1', size: '2x8', ...floor40 });
  assert.equal(formatFtIn(r.max), '13\'-1"');
  assert.equal(r.governs, 'deflection');
  assert.ok(Math.abs(r.max - 157.25) < 0.1, `got ${r.max}`);
});

test('DF-L No. 1 2x10 at 16 in, 40/10, L/360 is 16\'-5" (bending governs)', () => {
  const r = maxSpans({ species: 'dfl-1', size: '2x10', ...floor40 });
  assert.equal(formatFtIn(r.max), '16\'-5"');
  assert.equal(r.governs, 'bending');
  assert.ok(Math.abs(r.max - 197.4) < 0.1, `got ${r.max}`);
});

// Southern Pine No. 2 (the default) with the 2013 and later design values.
// Hand calculation:
//   2x8:  Fb' = 925 x 1.15 = 1063.75 psi, S = 13.1406, w = 50 x 16 / 144 = 5.556 lb/in
//         L = sqrt(8 x 1063.75 x 13.1406 / 5.556) = 141.88 in = 11'-9"
//   2x10: Fb' = 800 x 1.15 = 920 psi, S = 21.3906
//         L = sqrt(8 x 920 x 21.3906 / 5.556) = 168.34 in = 14'-0"
test('Southern Pine No. 2 2x8 at 16 in, 40/10, L/360 is 11\'-9" (bending governs)', () => {
  const r = maxSpans({ species: 'sp-2', size: '2x8', ...floor40 });
  assert.equal(r.governs, 'bending');
  assert.ok(Math.abs(r.max - 141.88) < 0.05, `got ${r.max}`);
  assert.equal(formatFtIn(r.max), '11\'-9"');
});

test('Southern Pine No. 2 2x10 at 16 in, 40/10, L/360 is 14\'-0"', () => {
  const r = maxSpans({ species: 'sp-2', size: '2x10', ...floor40 });
  assert.ok(Math.abs(r.max - 168.34) < 0.05, `got ${r.max}`);
  assert.equal(formatFtIn(r.max), '14\'-0"');
});

test('deflection span matches 5wL^4/384EI = L/360 directly', () => {
  const r = maxSpans({ species: 'sp-2', size: '2x8', ...floor40 });
  const L = r.spans.deflection;
  const w = (40 * 16) / 144;
  const delta = (5 * w * L ** 4) / (384 * 1400000 * section('2x8').I);
  assert.ok(Math.abs(delta - L / 360) < 1e-6);
});

test('shear rarely governs residential joists', () => {
  const r = maxSpans({ species: 'sp-2', size: '2x12', ...floor40 });
  assert.ok(r.spans.shear > r.spans.bending);
});

test('presets: rafters use L/240 and CD 1.25', () => {
  const r = maxSpans({ species: 'sp-2', size: '2x8', spacing: 24, preset: 'roof-20-10' });
  assert.equal(r.used.limit, 240);
  assert.equal(r.used.CD, 1.25);
  assert.ok(r.max > 0);
});

test('wider spacing gives shorter spans', () => {
  const a = maxSpans({ species: 'sp-2', size: '2x10', ...floor40, spacing: 12 });
  const b = maxSpans({ species: 'sp-2', size: '2x10', ...floor40, spacing: 24 });
  assert.ok(a.max > b.max);
});

test('checkSpan passes at the max span and fails just past it', () => {
  const opts = { species: 'dfl-1', size: '2x8', ...floor40 };
  const r = maxSpans(opts);
  assert.equal(checkSpan(opts, r.max - 0.01).pass, true);
  assert.equal(checkSpan(opts, r.max + 0.5).pass, false);
});

test('formatting and parsing feet and inches', () => {
  assert.equal(formatFtIn(157.25), '13\'-1"');
  assert.equal(formatFtIn(168), '14\'-0"');
  assert.equal(parseFtIn('13\'-1"'), 157);
  assert.equal(parseFtIn('13 1'), 157);
  assert.equal(parseFtIn('14'), 168);
  assert.equal(parseFtIn("12'"), 144);
  assert.ok(Number.isNaN(parseFtIn('abc')));
});
